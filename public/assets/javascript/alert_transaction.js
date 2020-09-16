(function () {

  $("#update_alert_transaction").hide();
  $("#Deleted_data ").hide();



  divopennclose = function () {


    

    $("#content_form").show();
    $("#alert_transdata ").hide();
    $("#update_alert_transaction").hide();
    $("#save_alert_transaction").show();
  }

  divopennclose_ = function () {
    


    $("#content_form").hide();
    $("#alert_transdata ").show();
    document.getElementById("max-length-element").innerText = 200;

  }

  
  show_data = function () {


    

    $("#userlisttbl").show();
    $("#Deleted_data ").hide();
    $("#update_alert_transaction").hide();
    $("#save_alert_transaction").show();
  }


  


  var tag = '';

  $("#save_alert_transaction").click(function (e) {
    

    e.preventDefault();
    tag = "save";
    $("#form-alert_transaction").submit();
  });

  $('#update_alert_transaction').click(function (event) {
    

    event.preventDefault();
    tag = 'UPDATE';
    $('#form-alert_transaction').submit();
  });

  $("#form-alert_transaction").on("submit", function (e) {
    try {
      

      // alert("in function")

      if (tag == 'save') {
        // alert("save")

        
        var date = new Date();
        var d_created_date = date.getTime();

        data = {
          s_alert_desc: $("#s_alert_desc").val(),
          n_asset_id: $("#n_asset_id").val(),
          n_alert_id: $("#n_alert_id").val(),
          n_u_id: $("#n_u_id").val(),
          d_date: $("#d_date").val(),
          s_notify_user: $("#s_notify_user").val(),
          n_email: $("#n_email").val(),
          s_user_name: localStorage.getItem("email"),
          d_created_date: d_created_date,
          n_status:0,
        };
        var url = '/vser-server/insert_alerttransaction';

      } else if (tag == 'UPDATE') {
        

        // alert("update")

        
        var date = new Date();
        var d_modified_date = date.getTime();

        data = {
          s_alert_desc: $("#s_alert_desc").val(),
          n_asset_id: $("#n_asset_id").val(),
          n_alert_id: $("#n_alert_id").val(),
          n_u_id: $("#n_u_id").val(),
          d_date: $("#d_date").val(),
          s_notify_user: $("#s_notify_user").val(),
          n_email: $("#n_email").val(),
          s_user_name: localStorage.getItem("email"),
          n_alert_trans_id: $("#n_alert_trans_id").val(),
          d_modified_date: d_modified_date
          // $("#n_alert_trans_id").val(result.data.n_alert_trans_id);


        };
        var url = '/vser-server/update_alerttransaction';

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
          $(".close").click();
          divopennclose_();

          $("#update_alert_transaction").hide();
          $("#save_alert_transaction").show();

          get_alerttransaction_Data();

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


  get_alert= function () {
    try {
      // alert("");
      

      $.ajax({
        type: 'POST',
        url: '/vser-server/getAllalert',
        //data: data,
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
          /*   $('#saveForm').show();
            $('#uploadForm').hide(); */
        },
        success: function (results) {
          var stateDrp = '';
          // $("#N_MAKER_ID").text("");
          stateDrp += '<option label="--Select Alert --"></option>';
          // stateDrp += ' <select class="fstdropdown-select form-control form-control-sm "  required>'
          //  stateDrp += '<option >select alert1111</option>';

          for (var i = 0; i < results.data.length; i++) {
            stateDrp += '<option value="' + results.data[i].n_alert_id + '">' + results.data[i].s_alert_msg_desc + '</option>';
          }
          $('#n_alert_id').html(stateDrp);
          // stateDrp += '<select>'
          // setFstDropdown();
        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  };

  get_racku=function () {
    try {
      // alert("");
      

      $.ajax({
        type: 'POST',
        url: '/vser-server/get_RackU_Data',
        //data: data,
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
          /*   $('#saveForm').show();
            $('#uploadForm').hide(); */
        },
        success: function (results) {
          var stateDrp = '';
          // $("#N_MAKER_ID").text("");
          stateDrp += '<option label="--Select Rake --"></option>';
          for (var i = 0; i < results.data.length; i++) {
            stateDrp += '<option value="' + results.data[i].n_u_id + '">' + results.data[i].s_racku_no + '</option>';
          }
          $('#n_u_id').html(stateDrp);
        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  };


  get_asset=function () {
    try {
      // alert("");
      

      $.ajax({
        type: 'POST',
        url: '/vser-server/get_asset',
        //data: data,
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
          /*   $('#saveForm').show();
            $('#uploadForm').hide(); */
        },
        success: function (results) {
          var stateDrp = '';
          
          // $("#N_MAKER_ID").text("");
          stateDrp += '<option label="--Select Asset --"></option>';
          // stateDrp += ' <select class="fstdropdown-select form-control form-control-sm "  required>'
          // stateDrp += '<option >select alert</option>';
          for (var i = 0; i < results.data.length; i++) {
            stateDrp += '<option value="' + results.data[i].n_asset_id + '">' + results.data[i].s_asset_name+ '</option>';
          }
          $('#n_asset_id').html(stateDrp);
          // stateDrp += '<select>'

          // setFstDropdown();
        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  };

  get_alerttransaction_Data=function () 
  {
    try {
      // alert("getuserdata");

      
      var data = {
        loginuser: localStorage.getItem('emailid'),
        n_status:0
      };
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_alerttransaction_Data",
        data: data,
        beforeSend: function (xhr) {

          // $('#name').val("");

          $("#s_alert_desc").val("");
          $("#n_asset_id").val("");
          $("#n_alert_id").val("");
          $("#n_u_id").val("");
          $("#d_date").val("");
          $("#s_notify_user").val("");
          $("#n_email").val("");

          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          
          console.log(result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#alerttransaction_data')) {
            $('#alerttransaction_data').DataTable().destroy();
          }


          var tdata = result.data
          // var date = result.data.d_date.split('T')[0];

          $('#alerttransaction_data').DataTable({
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
                // "render": function (data, type, row, meta) {
                //   return '  <button class=" glyphicon-pencil" data-toggle="modal" data-target="#cust-modal"  onclick="edit_alerttransaction(' + row.n_alert_trans_id + ')"><i class="icofont icofont-edit"></i></button> <button type="button" class="glyphicon-trash" onclick="deletealerttransaction(' + row.n_alert_trans_id + ')" ><i class="icofont icofont-trash"></i></button>';

                // }


                "render": function (data, type, row, meta) {

                  // return '  <button type="button" class="btn active btn-info btn-sm"  data-toggle="modal" data-target="#cust-modal"  onclick="edit_alerttransaction(' + row.n_alert_trans_id + ')"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn active btn-info btn-sm" onclick="deletealerttransaction(' + row.n_alert_trans_id + ')" ><span class="glyphicon glyphicon-trash"></span></button>';


                  // var a = `<button  type='button' class='btn btn-info  btn-sm' data-toggle='modal' data-target='# ' onclick='edit_alerttransaction(${row.n_alert_trans_id})'><span class='glyphicon glyphicon-pencil'></span></button>
                  //     <button type='button' class='btn btn-info  btn-sm' onclick='deletealerttransaction(${row.n_alert_trans_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
                  // return '<span class="btn btn-info glyphicon glyphicon-cog" data-toggle="tooltip" title ="' + a + '"></span>';

                  var a = ` <span class='mybtns'><button  type='button' class='btn btn-info  btn-sm' onclick='edit_alerttransaction(${row.n_alert_trans_id})'><span class='glyphicon glyphicon-pencil'></span></button>
                  <button type='button' class='btn btn-info  btn-sm' onclick='deletealerttransaction(${row.n_alert_trans_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button></span>`;
        return '<span class="btn btn-info glyphicon glyphicon-cog settingbtn"  >'+a+'</span>';


                }


                //   'render': function (data, type, row, meta) {
                //     return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"  onclick="get_alert_detail(' + row.n_alert_id+ ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="deletealert_rec('+row.n_alert_id +')" style="margin-left:8px"><span class="glyphicon glyphicon-trash"></span></button>';
                // }
              },
              {
                'data': 's_alert_desc'
              },

              // { 'data': 'n_alert_id' },

              {
                'data': 'asset'
              },

              // {
              //   'data': 'tag'
              // },
              {
                'data': 'alert'
              },

              // { 'data': 'date' },

              {
                "render": function (row, meta, data, type) {
                  var date = data.d_date.split('T')[0];

                  return date;
                }
              },

              {
                'data': 'n_email'
              },



              {
                'data': 's_notify_user'
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

  edit_alerttransaction = function (id) {
    // alert(id);

    try {
      var data = {
        // emailid: localStorage.getItem("email"), 
        n_alert_trans_id: id
      };
      $.ajax({
        url: '/vser-server/edit_alerttransaction',
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
          // divopennclose_();


          $("#save_alert_transaction").hide();

          $("#update_alert_transaction").show();

          

          var date = result.data.d_date.split('T')[0];


          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          // $("#s_type").val(result.data.s_type);  
          $("#s_notify_user").val(result.data.s_notify_user);
          $("#n_alert_id").val(result.data.n_alert_id);
          $("#n_asset_id").val(result.data.n_asset_id);
          $("#n_email").val(result.data.n_email);
          $("#d_date").val(date);
          $("#n_u_id").val(result.data.n_u_id);
          $("#s_alert_desc").val(result.data.s_alert_desc);
          $("#n_alert_trans_id").val(result.data.n_alert_trans_id);


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

  deletealerttransaction = function (id) {
    // alert(id);
    

    try {
      // if (confirm("Do you really want to delete record ?")) 
      // {
      //   var data = {
      //     // emailid: localStorage.getItem("email"), 
      //     n_alert_trans_id: id
      //   };
      // }
      // else 
      // {
      //   return false;
      // }

      var data = {
        // emailid: localStorage.getItem("email"), 
        n_alert_trans_id: id
      };
      $.ajax({
        url: '/vser-server/deletealerttransaction',
        type: 'POST',
        crossDomain: true,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
          $("#loader").addClass("is-active");
          document.getElementById("loader").setAttribute("data-text", "Loading...");
        },
        success: function (result) {

          get_alerttransaction_Data();

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


  view_deleted_rec=function()
  {
    try {
      // alert("view_deleted_rec");


      $("#userlisttbl").hide();
    $("#Deleted_data ").show();

      
      var data = {
        loginuser: localStorage.getItem('emailid'),
        n_status:1
      };
      $.ajax({
        type: 'POST',
        url: "/vser-server/deleted_data",
        data: data,
        beforeSend: function (xhr) 
        {

      
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) 
        {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          
          console.log(result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#deleted_data')) 
          {
            $('#deleted_data').DataTable().destroy();
          }


          var tdata = result.data
          // var date = result.data.d_date.split('T')[0];

          $('#deleted_data').DataTable({
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
                'data': 's_alert_desc'
              },

              // { 'data': 'n_alert_id' },

              {
                'data': 'asset'
              },

              // {
              //   'data': 'tag'
              // },
              {
                'data': 'alert'
              },

              // { 'data': 'date' },

              {
                "render": function (row, meta, data, type) {
                  var date = data.d_date.split('T')[0];

                  return date;
                }
              },

              {
                'data': 'n_email'
              },



              {
                'data': 's_notify_user'
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
  }



  get_alert();
  get_asset();
  get_racku();
  get_alerttransaction_Data();


})();