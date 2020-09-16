(function () {
  var tag = '';
  $("#content").show();
  $("#topbar-dropmenu").hide();
  $("#updateRack").hide();
  $('#saveuser').click(function (event) {
    event.preventDefault();
    tag = 'SAVE';
    $('#form-user').submit();
  });
  $('#updateuser').click(function (event) {
    event.preventDefault();
    tag = 'UPDATE';
    $('#form-user').submit();
  });
  $('#resetuser').click(function (event) {
    $('#saveuser').show();
    $('#updateuser').hide();
  });
  // onSubmit starts from here...
  $('#form-user').on('submit', function (event) {
    try {

      var data = {
        s_first_name: $("#s_first_name").val(),
        s_last_name: $("#s_last_name").val(),
        // s_user_name: $("#s_user_name").val(),
        s_email: $("#s_email").val(),
        d_join_date: $("#d_join_date").val(),
        s_designation: $("#s_designation").val(),
        s_company_name: $("#s_company_name").val(),
        s_department: $("#s_department").val(),
        s_address: $("#s_address").val(),
        n_con_number: $("#n_con_number").val(),
        n_active: $("#n_active").val(),
        s_pass: $("#s_pass").val(),
        s_about_me: $("#s_about_me").val(),
      };
      if (tag == 'SAVE') {
        data.s_created_by = localStorage.getItem('email');
        var url = '/vser-server/save_user_record';
      } else if (tag == 'UPDATE') {
        data.s_modified_by = localStorage.getItem('email'),
        data.s_user_id =  $('#s_user_id').val();
        var url = '/vser-server/update_user_Data';
      } else {
        return alert('Something Wrong !!!!');
      }
     
      $.ajax({
        type: 'POST',
        url: url,
        crossDomain: true,
        data: data,
        beforeSend: function () {},
        success: function (result) {
          debugger;
          $('#close').click();
          $('#resetuser').click();
          $('#saveuser').show();
          $('#updateuser').hide();
          localStorage.setItem("myidentity", `auth2 ${result.token}`);
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result
            .mess_body);
          setTimeout(() => {}, 2000);
          get_user_Data();
        },
        error: function (err) {
          getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess,
            err.responseJSON.mess_body);
        },
        complete: function (response) {
          
        }
      });
    } catch (error) {
      alert(error);
    }
  });

  get_user_Data = function () {
    try {
      // alert("l")
      $("#alldataofuser").show();
      $("#deletedataofuser").hide();
     
      var data = {

        user_role: localStorage.getItem("role"),

      };
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_user_Data",
        data: data,
        beforeSend: function (xhr) {},
        success: function (result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result
            .mess_body);
          console.log(result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#makerTable12')) {
            $('#makerTable12').DataTable().destroy();
          }

          $('#makerTable12').DataTable({
            'data': result.data,
            // "scrollX": true,
            'aoColumns': [
              // { 'data': 's_user_name' },
              // {
              //   'render': function (data, type, row, meta) {
              //     return '<b  title="emailid" style="margin-left: 6px;">' + row.s_user_name + '</b><b';
              //   }
              // },
              {
                // if(data.idofdeletedata='1'){}
                'render': function (data, type, row, meta) {
                  // var a =
                  //   `<button type='button' class='btn active btn-info btn-sm'  data-toggle='modal' data-target='#myModalfordcloc' onclick='getUserById(${row.s_user_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm'  onclick='deleteUserById(${row.s_user_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
                  // return '<span class="btn btn-info glyphicon glyphicon-cog" id="example" data-toggle="popover" title ="' +
                  //   a + '"></span>';
                  var a= `<span class='mybtns'><button type='button' class='btn active btn-info btn-sm' data-toggle='modal' data-target='#rack_model' onclick='getUserById(${row.s_user_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm' onclick='deleteUserById(${row.s_user_id},${row.n_rack_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button></span>`;
                  return '<span class="btn btn-info glyphicon glyphicon-cog settingbtn">'+a+'</span>';
                },
              },
              // {
              //   'data': 's_user_name',
              //   "render": function (data, type, row, meta) {
              //     return '<span data-toggle="tooltip" title="username">' +
              //       row.s_user_name + '</span>';
              //   }
              // },
              // { 'data': 's_email' },

              {
                'render': function (data, type, row, meta) {
                  return '<i class="fa fa-user"></i><b  title="User Name" style="margin-left: 6px;">' +
                    row.s_first_name + ' ' +
                    row.s_last_name +
                    '</b><br><i class="fa fa-envelope" aria-hidden="true"></i><b  title="emailid" style="margin-left: 6px;">' +
                    row.s_email +
                    '</b><br><i class="fa fa-mobile" aria-hidden="true"></i><b style="margin-left: 6px;">' +
                    row.n_con_number + '</b>';
                }
              },
              {
                'render': function (data, type, row, meta) {
                  return '<b  title="Company" style="margin-left: 6px;">' +
                    row.s_company_name +
                    '</b><br><b style="margin-left: 6px;" title="Department Name">' +
                    row.s_department + '</b><br><b style="margin-left: 6px;" title="User Designation">' +
                    row.s_designation + '</b>';
                }
              },
              // { 'data': 'd_dob' },
              // { 'data': 'n_con_number' },
              {
                "render": function (data, type, row, meta) {
                  debugger;
                  if (row.n_active == '1') {
                    var a = '<td><i class="fa fa-circle" aria-hidden="true" style="color:green"></i> Active</td>';
                  } else if (row.n_active == '0') { 
                    var a = '<td><i class="fa fa-circle" aria-hidden="true" style="color:red"></i> Inactive</td>';
                  }
                  return a;
                }
              },
              {
                "render": function (data, type, row, meta) {
                  return ' <a  href="#/user_role/role?ID=' + row
                    .s_user_id +
                    '" title="Setting"> <button type="button" class="btn active btn-info btn-sm" style="border-radius:3px" ><span class="glyphicon glyphicon-plus"></span></button></a>';
                }
              },
            ],
          });



        },
        complete: function (res) {
          $('[data-toggle="popover"]').popover({
            html: true,
            placement: "top",
            trigger: "click"
          });
        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  }
  get_user_Datadelete = function (idofdeletedata) {
    try {
      var data = {
        idofdeletedata: idofdeletedata,
        user_role: localStorage.getItem("role"),
      };
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_user_Data",
        data: data,
        beforeSend: function (xhr) {},
        success: function (result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result
            .mess_body);
          console.log(result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#delettab')) {
            $('#delettab').DataTable().destroy();
          }

          $('#delettab').DataTable({
            'data': result.data,
            // "scrollX": true,
            'aoColumns': [
              // { 'data': 's_user_name' },
              // {
              //   'render': function (data, type, row, meta) {
              //     return '<b  title="emailid" style="margin-left: 6px;">' + row.s_user_name + '</b><b';
              //   }
              // },

              // {
              //   'data': 's_user_name',
              //   "render": function (data, type, row, meta) {
              //     return '<span data-toggle="tooltip" title="username">' +
              //       row.s_user_name + '</span>';
              //   }
              // },
              // { 'data': 's_email' },

              {
                'render': function (data, type, row, meta) {
                  return '<i class="fa fa-user"></i><b  title="emailid" style="margin-left: 6px;">' +
                    row.s_first_name + ' ' +
                    row.s_last_name +
                    '</b><br><i class="fa fa-envelope" aria-hidden="true"></i><b  title="emailid" style="margin-left: 6px;">' +
                    row.s_email +
                    '</b><br><i class="fa fa-mobile" aria-hidden="true"></i><b style="margin-left: 6px;">' +
                    row.n_con_number + '</b>';
                }
              },
              {
                'render': function (data, type, row, meta) {
                  return '<i class="fa fa-envelope" aria-hidden="true"></i><b  title="Company" style="margin-left: 6px;">' +
                    row.s_company_name +
                    '</b><br><i class="fa fa-mobile" aria-hidden="true"></i><b style="margin-left: 6px;" title="Department Name">' +
                    row.s_department + '</b><br><i class="fa fa-mobile" aria-hidden="true"></i><b style="margin-left: 6px;" title="User Designation">' +
                    row.s_designation + '</b>';
                }
              },
              // { 'data': 'd_dob' },
              // { 'data': 'n_con_number' },
              {
                "render": function (data, type, row, meta) {
                  if (row.n_active == '1') {
                    var a = '<td><i class="fa fa-circle" aria-hidden="true" style="color:green"></i> Active</td>';
                  } else {
                    var a = '<td><i class="fa fa-circle" aria-hidden="true" style="color:red"></i> Inactive</td>';
                  }
                  return a;
                  /* return '<button  class="btn btn-xs btn-info" data-toggle="modal" data-target="#myACTModal" id="editRecAct" onclick="orderEditAct(\'' + row.s_project_id + '\');getProjectMaster();" ><i class="ace-icon fa fa-plus bigger-120" aria-hidden="true"></i></button>'  */
                }
              },
              //   { 'data': 's_created_by' },

              // {
              //   'render': function (data, type, row, meta) {
              //     return '  <span class="glyphicon glyphicon-pencil" onclick="getUserById(' + row.s_user_id + ')" style="color:red"></span><span class="glyphicon glyphicon-trash" onclick="deleteUserById(' + row.s_user_id + ')" style="margin-left:8px;color:red"></span>';
              //   }
              // }
              // {
              //   'render': function (data, type, row, meta) {
              //     return '<button type="button" class="btn active btn-info btn-sm"  style="border-radius:3px"  onclick="getUserById(' + row.s_user_id + ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="deleteUserById(' + row.s_user_id + ')" style="margin-left:8px;border-radius:3px"><span class="glyphicon glyphicon-trash"></span></button>';
              //   }
              // }

            ],
          });



        },
        complete: function (res) {

        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  }
  deleteUserById = function (s_user_id) {
    try {
      if (confirm("Do you really want to delete the record ?")) {
        var data = {
          s_user_id: s_user_id,
        };
        $.ajax({
          type: 'POST',
          url: "/vser-server/deleteUserById",
          data: data,
          beforeSend: function (xhr) {
            $('#reset').click();
            xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem(
              "auth2token"));
          },
          success: function (result) {
            get_user_Data();
            getnotify('success', undefined, 1, 'stack_top_right', result.mess, result
              .mess_body);
            setTimeout(() => {}, 2000)
          },
          error: function (error) {
            console.log(error);
          },
        });
      } else {
        return false
      }
    } catch (error) {
      alert(error);
    }
  }
  getUserById = function (s_user_id) {
   
    try {
      var data = {
        s_user_id: s_user_id,
      }
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_user_Databyid",
        data: data,
        beforeSend: function (xhr) {
          //  BrandDiv();
          $("#content_form").show();
          $("#userlisttbl").hide();
          $('#reset').click();
          $('#saveuser').hide();
          $('#updateuser').show();
          // $("#s_email").hide();
          // $("#s_email1").show();
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem(
            "auth2token"));
        },
        success: function (result) {
         
          var data = result.data[0];
          $('#s_first_name').val(data.s_first_name);
          $('#s_last_name').val(data.s_last_name);
          $('#s_designation').val(data.s_designation);
          $('#s_company_name').val(data.s_company_name);
          $('#s_department').val(data.s_department);
          $('#s_address').val(data.s_address);
          $('#s_user_name').val(data.s_user_name);
          $('#s_email').val(data.s_email);
          $('#d_join_date').val(data.d_join_date);
          $('#n_con_number').val(data.n_con_number);
          $('#s_pass').val(data.s_pass);
          $('#s_about_me').val(data.s_about_me);
          $('#s_user_id').val(data.s_user_id);
          $('#n_active').val(data.n_active);
        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  }
  getcheckemail = function () {
   
    try {
      var data = {
        s_email: document.getElementById("s_email").value,
      }
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_check_email",
        data: data,
        beforeSend: function (xhr) {
          //  BrandDiv();
          // $('#reset').click();
          // $('#saveuser').hide();
          // $('#updateuser').show();
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem(
            "auth2token"));
        },
        success: function (result) {
         
          if (result.data != 0) {
            getnotify('success', undefined, 1, 'stack_top_right', result.mess, result
              .mess_body);
            setTimeout(() => {}, 2000);
            $("#s_email").val('');
          }
        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  }
  divopennclose = function () {
    $("#content_form").show();
    $("#userlisttbl").hide();
  }
  divopennclose_ = function () {
    // refresh();
    $("#content_form").hide();
    $("#userlisttbl").show();
  }
  refresh = function () {
    $('#resetuser').click();
    $('#s_about_me').val('');
    $("#s_user_name").val('');
    $("#max-length-element").text('');
    $('#s_email').val('');
    $('#d_dob').val('');
    $('#n_con_number').val('');
    $('#s_pass').val('');
    $('#s_user_id').val('');
  }
  userback = function () {
    $('#close').click();
    $('#resetuser').click();
    refresh();
  }

  get_user_Data();
})();