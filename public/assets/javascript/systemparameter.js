$("#content").show();
$("#topbar-dropmenu").hide();
$("#deleted_system_data ").hide();









document.getElementById('img_iframe').onload = function () {
  try {
    // alert("hello");
    

    var data = {
      s_created_by: localStorage.getItem("email"),
      n_system_param_id: $("#n_system_param_id").val()
    };

    $.ajax({
      type: 'POST',
      url: '/vser-server/getImage_data',
      data: data,
      beforeSend: function (xhr) {
        /*   $('#resetForm').click();
          $('#saveForm').show();
          $('#uploadForm').hide(); */
        xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
      },
      success: function (results) {
        var imghtml = '';
        console.log(results);
        var data1 = results.data;

        if (data1.length > 0) {
          $(".close").click();

          data1.forEach((element, i) => {
            if (element.hasOwnProperty('n_img_id')) {
              var id = element.n_img_id;
              var key = 1;
            } else {
              var id = element.n_system_param_id;
              var key = 0;
            }


            //   imghtml +='<div class="img-gal test"><div class="card"> <img class="img-thumbnail img-fluid img-size"  src="'+element.s_path+' " alt="'+element.s_og_name+'"> <a class="remImage" onclick="deleteImg('+id+','+key+')"><img src="/assets/img/cross.svg" class="fas" style="width:20px;height:20px;position: relative;bottom: 126px;right: -7px;"> </a></div></div>';
            // //  '+element.s_new_name+'

            // imghtml +='<div class="img-gal test"><div class="card"> <img class="img-thumbnail img-fluid img-size image"  src="'+element.s_path+' " alt="'+element.s_og_name+'" style="width: 98px;height: 99px;"> <div class="overlay"><a class="remImage" onclick="deleteImg('+id+','+key+')"><img src="/assets/img/cross.svg" class="fas"  style="width:20px;height:20px;top: 2px;right: 5px;"> </a></div></div></div>';
            // // style="width:20px;height:20px;top: 2px;right: 5px;"

            imghtml += '<div class="img-wrap"><span class="close" onclick="deleteImg(' + id + ',' + key + ')">&times;</span><img class="img-thumbnail img-fluid img-size image"  src="' + element.s_path + ' " alt="' + element.s_og_name + '" style="width: 98px;height: 99px;"></div>'
          });
        }
        // $("#imggal").html(imghtml);

        $("#imggal_main").html(imghtml);
      },
      error: function (error) {
        console.log(error);
      },
    });
  } catch (error) {
    //alert(error);
  }



}

function deleteImg(id, key) {
  // alert(id);
  // alert(key);


  try {
    var data = {
      id: id,
      key: key,
      s_created_by: localStorage.getItem("email"),

    };
    $.ajax({
      type: 'POST',
      url: '/vser-server/deleteImg',
      data: data,
      beforeSend: function (xhr) {
        /*   $('#resetForm').click();
          $('#saveForm').show();
          $('#uploadForm').hide(); */
        xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
      },
      success: function (results) {
        var imghtml = '';
        //console.log(results);
        document.getElementById('img_iframe').onload();
      },
      error: function (error) {
        console.log(error);
      },
    });
  } catch (error) {
    alert(error);
  }


}

(function () {

  $("#update_system_Prameter").hide();
  // alert("");

  var tag = '';

  $("#save_system_Prameter").click(function (e) {
    e.preventDefault();
    tag = "save";
    $("#form-systemParameter").submit();
  });

  $('#update_system_Prameter').click(function (event) {
    event.preventDefault();
    tag = 'UPDATE';
    $('#form-systemParameter').submit();
  });

  $('#reset').click(function (event) {
    $('#save_system_Prameter').show();
    $('#update_system_Prameter').hide();
  });


  $("#form-systemParameter").on("submit", function (e) {
    try {
      

      // alert("in function")

      if (tag == 'save') {
        //  alert("save")
        var date = new Date();
        var d_created_date = date.getTime();

        

        data = {
          s_email_setting: $("#s_email_setting").val(),
          s_captha_setting: $("#s_captha_setting").val(),
          s_database_connection_setting: $("#s_database_connection_setting").val(),
          s_company_name: $("#s_company_name").val(),
          s_user_name: localStorage.getItem("email"),
          d_created_date: d_created_date


        };
        var url = '/vser-server/insert_systemParameter';

      } else if (tag == 'UPDATE') {
        

        // alert("update")

        
        var date = new Date();
        var d_modified_date = date.getTime();

        data = {

          n_system_param_id: $("#n_system_param_id").val(),
          s_email_setting: $("#s_email_setting").val(),
          s_captha_setting: $("#s_captha_setting").val(),
          s_database_connection_setting: $("#s_database_connection_setting").val(),
          s_company_name: $("#s_company_name").val(),
          s_user_name: localStorage.getItem("email"),
          d_modified_date: d_modified_date
        };
        var url = '/vser-server/update_systemParameter';

      } else {
        return alert('Something Wrong !!!!');
      }
      


      $.ajax({
        url: url,
        type: 'POST',
        crossDomain: true,
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
          $("#loader").addClass("is-active");
          document.getElementById("loader").setAttribute("data-text", "Loading...");
        },
        success: function (result) {
          
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          // $(".close").click();
          $(".reset").click();

          // $("#update_system_Prameter").hide();
          // $("#save_system_Prameter").show();
          getsystemParameterData();

          // $("#s_type").val("");
          // $("#s_alert_msg_desc").val("");
        },
        error: function (err) {
          
          getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
        },
        complete: function (response) {
          $("#loader").removeClass("is-active");
        }
      });
    } catch (error) {
      alert(error);
    }
  });

  getsystemParameterData = function () {
    try {
      //  alert("getuserdata");

      
      var data = {
        // loginuser: localStorage.getItem('email'),
        n_status:0
      };
      $.ajax({
        type: 'POST',
        url: "/vser-server/getsystemParameterData",
        data: data,
        beforeSend: function (xhr) {

          // $('#name').val("");

          divopennclose_();

          $("#s_email_setting").val("");
          $("#s_captha_setting").val("");
          $("#s_database_connection_setting").val("");
          $("#s_company_name").val("");
          $("#imggal").html("");
          $("#imggal_main").html("");




          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          
          console.log(result);
          var i = 0;

          if ($.fn.dataTable.isDataTable('#get_systemParameterData')) {
            $('#get_systemParameterData').DataTable().destroy();
          }


          var tdata = result.data
          $('#get_systemParameterData').DataTable({
            'data': tdata,
            // "scrollX":true,
            'aoColumns': [
              /*  {
                 'render': function() 
                 {
                   i++;
                   return i;
                 },
               }, */
               {
                "render": function (data, type, row, meta) {
                  //  return '  <button type="button" class="btn active btn-info btn-sm" data-toggle="modal" data-target="#cust-modal"  onclick="get_systemparameter_detail(' + row.n_system_param_id + ')"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn active btn-info btn-sm" onclick="deletesystemParameter(' + row.n_system_param_id + ')" ><span class="glyphicon glyphicon-trash"></span></button>';

                  // var a = `<button  type='button' class='btn btn-info  btn-sm' data-toggle='modal' data-target='# ' onclick='get_systemparameter_detail(${row.n_system_param_id})'><span class='glyphicon glyphicon-pencil'></span></button>
                  //           <button type='button' class='btn btn-info  btn-sm' onclick='deletesystemParameter(${row.n_system_param_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
                  // return '<span class="btn btn-info glyphicon glyphicon-cog" data-toggle="popover" title ="' + a + '"></span>';

                  var a = ` <span class='mybtns'><button  type='button' class='btn btn-info  btn-sm' onclick='get_systemparameter_detail(${row.n_system_param_id})'><span class='glyphicon glyphicon-pencil'></span></button>
                  <button type='button' class='btn btn-info  btn-sm' onclick='deletesystemParameter(${row.n_system_param_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button></span>`;
        return '<span class="btn btn-info glyphicon glyphicon-cog settingbtn"  >'+a+'</span>';

                }
              },
              {
                'data': 's_email_setting'
              },
              {
                'data': 's_captha_setting'
              },
              {
                'data': 's_database_connection_setting'
              },
              {
                'data': 's_company_name'
              },
              


            ],
          });
        },
        error: function (error) {
          console.log(error);
        },

        complete: function (res) {
          

          // $('.glyphicon-cog').popover({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>popover</em></h1>", html: true, placement: "top"}); 
          $('[data-toggle="popover"]').popover({
            html: true,
            placement: "top",
            trigger: "click"
          });
          // ,trigger: "click"

        }
      });
    } catch (error) {
      alert(error);
    }
  };

  view_deleted_rec = function () {
    try {
      // alert("getuserdata");

      
      var data = {
        loginuser: localStorage.getItem('emailid'),
        n_status: 0
      };
      $.ajax({
        type: 'POST',
        url: "/vser-server/GetSystemDeletedData",
        data: data,
        beforeSend: function (xhr) {


          $("#userlisttbl").hide();
          $("#deleted_system_data ").show();


          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          
          console.log(result);
          var i = 0;

          if ($.fn.dataTable.isDataTable('#system_delete_data')) {
            $('#system_delete_data').DataTable().destroy();
          }


          var tdata = result.data
          $('#system_delete_data').DataTable({
            'data': tdata,
            // "scrollX":true,
            'aoColumns': [
              /*  {
                 'render': function() 
                 {
                   i++;
                   return i;
                 },
               }, */
              {
                'data': 's_email_setting'
              },
              {
                'data': 's_captha_setting'
              },
              {
                'data': 's_database_connection_setting'
              },
              {
                'data': 's_company_name'
              },



            ],
          });
        },
        error: function (error) {
          console.log(error);
        },

        complete: function (res) {
          

          // $('.glyphicon-cog').popover({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>popover</em></h1>", html: true, placement: "top"}); 
          $('[data-toggle="popover"]').popover({
            html: true,
            placement: "top",
            trigger: "click"
          });
          // ,trigger: "click"

        }
      });
    } catch (error) {
      alert(error);
    }
  };

  get_systemparameter_detail = function (id) {
    // alert(id);

    try {
      var data = {
        // emailid: localStorage.getItem("email"), 
        n_system_param_id: id
      };
      $.ajax({
        url: '/vser-server/get_systemparameter_detail',
        type: 'POST',
        crossDomain: true,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
          $("#loader").addClass("is-active");
          document.getElementById("loader").setAttribute("data-text", "Loading...");
        },
        success: function (result) {
          
          // $(".open").click();
          divopennclose();

          $("#save_system_Prameter").hide();

          $("#update_system_Prameter").show();

          


          // getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          $("#s_email_setting").val(result.data.s_email_setting);
          $("#s_captha_setting").val(result.data.s_captha_setting);
          $("#s_database_connection_setting").val(result.data.s_database_connection_setting);
          $("#s_company_name").val(result.data.s_company_name);
          $("#n_system_param_id").val(result.data.n_system_param_id);
          $("#n_system_param_id1").val(result.data.n_system_param_id);

          // $("#n_alert_id").val(result.data.n_alert_id); 
          document.getElementById('img_iframe').onload();



        },
        error: function (err) {
          getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
        },
        complete: function (response) {
          $("#loader").removeClass("is-active");
          tag = "";
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  deletesystemParameter = function (id) {
    // alert(id);

    try {

      // if (confirm("Do you really want to delete record ?")) {
      //   var data = {
      //     // emailid: localStorage.getItem("email"), 
      //     n_system_param_id: id,
      //     n_status:0
      //   };
      // } else {
      //   return false;
      // }
      var data = {
        // emailid: localStorage.getItem("email"), 
        n_system_param_id: id,
        n_status:0
      };



      $.ajax({
        url: '/vser-server/deletesystemParameter',
        type: 'POST',
        crossDomain: true,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
          $("#loader").addClass("is-active");
          document.getElementById("loader").setAttribute("data-text", "Loading...");
        },
        success: function (result) {



          getsystemParameterData();


          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);



        },
        error: function (err) {
          getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
        },
        complete: function (response) {
          $("#loader").removeClass("is-active");
          tag = "";
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  divopennclose = function () {


    

    $("#content_form").show();
    $("#data_tab ").hide();
    $("#update_system_Prameter").hide();
    $("#save_system_Prameter").show();

  }


  divopennclose_ = function () {
    


    $("#content_form").hide();
    $("#data_tab ").show();
    document.getElementById("max-length-element1").innerText = 200;
    document.getElementById("max-length-element2").innerText = 200;
    document.getElementById("max-length-element3").innerText = 200;

  }
  show_system_data = function () {


    

    $("#userlisttbl").show();
    $("#deleted_system_data ").hide();
    $("#update_alert_transaction").hide();
    $("#save_alert_transaction").show();
  }

  setItemId = function () {
    // alert("")
    debugger

    $("#n_system_param_id1").val($("#n_system_param_id1").val());
    $("#s_login_id").val(localStorage.getItem("email"));
    // $("#s_filename").val('');
    document.getElementById('img_iframe').onload();

    var date = new Date();
    var d_created_date = date.getTime();

  }

  getsystemParameterData();




})();