(function () {

  $("#btnupdate_alert").hide();
  $("#nondeleterecord").hide();
  $("#deleted_alert").hide();






  showalertdata = function () {


    $("#nondeleterecord").hide();
    $("#deleted_alert").hide();
    $("#non_deleted_alert").show();
    $("#deleterecord").show();
  }


  // alert("");

 
  var tag = '';

  $("#save_alert").click(function (e) {
    e.preventDefault();
    tag = "save";
    $("#form-alert").submit();
  });

  $('#btnupdate_alert').click(function (event) {
    event.preventDefault();
    tag = 'UPDATE';
    $('#form-alert').submit();
  });
  $('#resetuser').click(function (event) {
    

    $("#s_alert_msg_desc").val("");
    $('#save_alert').show();
    $('#btnupdate_alert').hide();
    // $('#s_alert_msg_desc').val( null) );
    // $("#s_alert_msg_desc").val(null);
    document.getElementById("max-length-element").innerText = 200;


  });

  $("#form-alert").on("submit", function (e) {
    try {
      

      // alert("in function")

      if (tag == 'save') {
        //  alert("save")

        
        var date = new Date();
        var d_created_date = date.getTime();

        data = {
          s_alert_name: $("#s_alert_name").val(),
          n_alert_code: $("#n_alert_code").val(),
          s_alert_msg_desc: $("#s_alert_msg_desc").val(),
          s_user_name: localStorage.getItem("email"),
          d_created_date: d_created_date
        };
        var url = '/vser-server/insert_alert';

      } else if (tag == 'UPDATE') {
        

        // alert("update")
        var date = new Date();
        var d_modified_date = date.getTime();

        

        data = {
          s_alert_name: $("#s_alert_name").val(),
          n_alert_code: $("#n_alert_code").val(),
          n_alert_id: $("#n_alert_id").val(),

          s_alert_msg_desc: $("#s_alert_msg_desc").val(),
          s_user_name: localStorage.getItem("email"),
          d_modified_date: d_modified_date,

        };
        var url = '/vser-server/update_alert';

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
          // $("#resetuser").click();
          // $("#btnupdate_alert").hide();
          // $("#save_alert").show();
          get_alert_Data();

          $("#s_type").val("");
          $("#s_alert_msg_desc").val("");
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

  get_alert_Data=function () {
    try {
      // alert("getuserdata");

      
      var data = {
        loginuser: localStorage.getItem('emailid'),
        n_status: 0
      };
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_alert_Data",
        data: data,
        beforeSend: function (xhr) {
          $("#resetuser").click();
          $("#btnupdate_alert").hide();
          $("#save_alert").show();
          $('#name').val("");
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          
          console.log(result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#alert_data')) {
            $('#alert_data').DataTable().destroy();
          }


          var tdata = result.data
          $('#alert_data').DataTable({
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
                'data': 's_alert_name'
              },
              {
                'data': 'n_alert_code'
              },
              {
                'data': 's_alert_msg_desc'
              },
              {

                'render': function (data, type, row, meta) {
                  return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"  onclick="get_alert_detail(' + row.n_alert_id+ ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="deletealert_rec('+row.n_alert_id +')" style="margin-left:8px"><span class="glyphicon glyphicon-trash"></span></button>';

                  // var a = `<button  type='button' class='btn btn-info  btn-sm' data-toggle='modal' data-target='# ' onclick='get_alert_detail(${row.n_alert_id})'><span class='glyphicon glyphicon-pencil'></span></button>
                  //     <button type='button' class='btn btn-info  btn-sm' onclick='deletealert_rec(${row.n_alert_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
                  // return '<span class="btn btn-info glyphicon glyphicon-cog" data-toggle="tooltip" title ="' + a + '"></span>';



                }
              },


            ],
          });
        },
        error: function (error) {
          console.log(error);
        },
        complete: function (res) {
          

          // $('.glyphicon-cog').tooltip({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>", html: true, placement: "top"}); 
          $('[data-toggle="tooltip"]').tooltip({
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






  get_alert_detail = function (id) {
    // alert(id);

    try {
      var data = {
        // emailid: localStorage.getItem("email"), 
        n_alert_id: id
      };
      $.ajax({
        url: '/vser-server/get_alert_detail',
        type: 'POST',
        crossDomain: true,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
          $("#loader").addClass("is-active");
          document.getElementById("loader").setAttribute("data-text", "Loading...");
        },
        success: function (result) {
          
          $(".open").click();
          $("#save_alert").hide();

          $("#btnupdate_alert").show();

          


          // getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);

          $("#s_alert_name").val(result.data.s_alert_name);
          $("#n_alert_code").val(result.data.n_alert_code);

          $("#s_type").val(result.data.s_type);
          $("#s_alert_msg_desc").val(result.data.s_alert_msg_desc);
          $("#n_alert_id").val(result.data.n_alert_id);


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




  deletealert_rec = function (id) {
    // alert(id);

    try {
      // if (confirm("Do you really want to delete record ?")) 
      // {
      //   var data = {
      //     // emailid: localStorage.getItem("email"), 
      //     n_alert_id: id
      //   };
      // } else 
      // {
      //   return false;
      // }

      var data = {
        // emailid: localStorage.getItem("email"), 
        n_alert_id: id
      };
      $.ajax({
        url: '/vser-server/deletealert_rec',
        type: 'POST',
        crossDomain: true,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
          $("#loader").addClass("is-active");
          document.getElementById("loader").setAttribute("data-text", "Loading...");
        },
        success: function (result) {



          get_alert_Data();


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


  view_deleted_alert = function () {

    try {

      $("#nondeleterecord").show();
      $("#deleted_alert").show();
      $("#non_deleted_alert").hide();
      $("#deleterecord").hide();

      
      var data = {
        loginuser: localStorage.getItem('emailid'),
        n_status: 1
      };
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_deleted_alert_Data",
        data: data,
        beforeSend: function (xhr) {

          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          
          console.log(result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#notdeleted_alert_data')) {
            $('#notdeleted_alert_data').DataTable().destroy();
          }


          var tdata = result.data
          $('#notdeleted_alert_data').DataTable({
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
                'data': 's_alert_name'
              },
              {
                'data': 'n_alert_code'
              },
              {
                'data': 's_alert_msg_desc'
              },



            ],
          });
        },
        error: function (error) {
          console.log(error);
        },
        complete: function (res) {
          

          // $('.glyphicon-cog').tooltip({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>", html: true, placement: "top"}); 
          $('[data-toggle="tooltip"]').tooltip({
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





  get_alert_Data();
})();
