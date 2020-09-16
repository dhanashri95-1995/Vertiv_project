(function () {

  $("#update_alert_transaction").hide();
  get_alerttransaction_Data();
  get_alert();
 
  get_racku();


  // alert("");
  


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
        //  alert("save")

        

        data = {
          s_alert_desc: $("#s_alert_desc").val(),
          n_asset_id: $("#n_asset_id").val(),
          n_alert_id: $("#n_alert_id").val(),
          n_u_id: $("#n_u_id").val(),
          d_date: $("#d_date").val(),
          s_notify_user: $("#s_notify_user").val(),
          n_email: $("#n_email").val(),
          s_user_name: localStorage.getItem("email"),
          d_created_date:d_created_date,
        };
        var url = '/vser-server/insert_alerttransaction';

      } else if (tag == 'UPDATE') {
        

        // alert("update")

        

        data = {
          s_alert_desc: $("#s_alert_desc").val(),
          n_asset_id: $("#n_asset_id").val(),
          n_alert_id: $("#n_alert_id").val(),
          n_u_id: $("#n_u_id").val(),
          d_date: $("#d_date").val(),
          s_notify_user: $("#s_notify_user").val(),
          n_email: $("#n_email").val(),
          s_user_name: localStorage.getItem("email"),
          s_user_name: localStorage.getItem("email"),
          n_alert_trans_id: $("#n_alert_trans_id").val(),
          d_modified_date:d_modified_date,


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


  function get_alert() {
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
          stateDrp += '<option label="--select Maker --"></option>';
          for (var i = 0; i < results.data.length; i++) {
            stateDrp += '<option value="' + results.data[i].n_alert_id + '">' + results.data[i].s_alert_msg_desc + '</option>';
          }
          $('#n_alert_id').html(stateDrp);
        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  };



  function get_racku() {
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
          stateDrp += '<option label="--select Maker --"></option>';
          for (var i = 0; i < results.data.length; i++) {
            stateDrp += '<option value="' + results.data[i].n_u_id + '">' + results.data[i].s_tag_id + '</option>';
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


  get_asset_desc = function () {

    
    try {
        $.ajax({
            url: '/vser-server/get_Asset_Data',
            type: 'POST',
            crossDomain: true,
            // data: data,
            success: function (result) {
                debugger
                var asstdesc = '';
                asstdesc += '<option label="--select tag Name--"></option>';
                for (var i = 0; i < result.data.length; i++) {
                    asstdesc += '<option value="' + result.data[i].n_asset_id + '">' + result.data[i].s_asset_desc + '</option>';
                }
                $('#n_asset_id').html(asstdesc);

            }
        });

    } catch (error) {
        getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

    }
};

  function get_alerttransaction_Data() {
    try {
      // alert("getuserdata");

      
      var data = {
        loginuser: localStorage.getItem('emailid'),
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
                'data': 's_alert_desc'
              },

              // { 'data': 'n_alert_id' },

              {
                'data': 'asset'
              },

              {
                'data': 'tag'
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
                'data': 'alert'
              },

              {
                'data': 's_notify_user'
              },

              {
                'render': function (data, type, row, meta) {
                    return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"  data-target="#cust-modal"    onclick="edit_alerttransaction(' + row.n_alert_trans_id + ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="deletealerttransaction(' + row.n_alert_trans_id + ')"  style="margin-left:8px"><span class="glyphicon glyphicon-trash"></span></button>';
                }

            },
          
            


            ],
          });
        },
        error: function (error) {
          console.log(error);
        },
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
          
          $(".open").click();
          $("#save_alert_transaction").hide();

          $("#update_alert_transaction").show();

          

          var date = result.data.d_date.split('T')[0];


          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
           
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

  get_asset_desc();
})();
