(function () {
  
  // alert("role");
  get_role_Data();
  $("#updateRack").hide();

  var tag = '';
  $('#saverole').click(function (event) {
      event.preventDefault();
      tag = 'SAVE';
      $('#form-role').submit();
  });

  $('#updaterole').click(function (event) {
      event.preventDefault();
      tag = 'UPDATE';
      $('#form-role').submit();
  });

  $('#resetrole').click(function (event) {
      $('#saverole').show();
      $('#updaterole').hide();
  });

  // onSubmit starts from here...
  $('#form-role').on('submit', function (event) {
      
      try {
          if (tag == 'SAVE') {

var date = new Date();
var d_created_date = date.getTime();
              var data = {

                  // s_rake_name: $('#s_rake_name').val(),
                  // n_datacenter_id: $('#n_datacenter_id').val(),
                  // s_asset_code: $('#s_asset_code').val(),
                  // n_status: $('#n_status').val(),

                  // s_floor_loc: $('#s_floor_loc').val(),
                  // n_room_no: $('#n_room_no').val(),
                  // s_rake_model: $('#s_rake_model').val(),
                  s_role_name:$("#s_role_name").val(),
                  d_created_date:d_created_date,
                  s_created_by: localStorage.getItem('email'),

              };
              var url = '/vser-server/check_role_record';
          } else if (tag == 'UPDATE') {
              
              var date = new Date();
              var d_modified_date = date.getTime();
              var data = {
                  s_role_name:$("#s_role_name").val(),

                  d_modified_date:d_modified_date,
                  s_modified_by: localStorage.getItem('email'),
                  n_role_id: $('#n_role_id').val(),
              };
              var url = '/vser-server/update_role_Data';
          } else {
              return alert('Something Wrong !!!!');
          }
          
          $.ajax({
              type: 'POST',
              url: url,
              crossDomain: true,
              data: data,
              beforeSend: function () {
                  $('reset').click();
                  // localStorage.setItem("myidentity", `auth2 ${result.token}`);
              },
              success: function (result) {
                $('#resetrole').click();
                  $('close').click();
                  $("#s_role_name").val('');
                  $('#saverole').show();
                  $('#updaterole').hide();
                  localStorage.setItem("myidentity", `auth2 ${result.token}`);
                  getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                  setTimeout(() => {
                     
                  }, 2000);
              },
              error: function (err) {
                  getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
              },
              complete: function (response) {
                get_role_Data();
                  //  $("#loader").removeClass("is-active");
              }
          });
      } catch (error) {
          alert(error);
      }
  });
  // get_Rack_Data();

 

  function get_role_Data() {
      try {
        
      //   var data = {
      //     loginuser: localStorage.getItem('emailid'),
      //   };
        $.ajax({
          type: 'POST',
          url: "/vser-server/get_role_Data",
          // data: data,
          beforeSend: function(xhr) {
    
          //   xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
          },
          success: function(result) {
            
            console.log(result);
            var i = 0;
            if ($.fn.dataTable.isDataTable('#rolemaster')) {
              $('#rolemaster').DataTable().destroy();
            }
          //   var tdata=result.data
            $('#rolemaster').DataTable({
              'data': result.data,
               "scrollX":true,
              'aoColumns': [
               /*  {
                  'render': function() 
                  {
                    i++;
                    return i;
                  },
                }, */
                { 'data': 's_role_name' },
              //   { 'data': 's_created_by' },
               { 'render': function(data, type, row, meta) {
                  return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"   onclick="getroleById(' + row.n_role_id + ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="deleteroleById(' + row.n_role_id + ')"  style="margin-left:7px"><span class="glyphicon glyphicon-trash"></span></button>';
                }
              }
              
              ],
            });
          },
          error: function(error) {
            console.log(error);
          },
        });
      } catch (error) {
        alert(error);
      }
    }


 
     deleteroleById=function(n_role_id){
      try {
          var data = {
            n_role_id: n_role_id,
          };
          $.ajax({
            type: 'POST',
            url: "/vser-server/deleteroleById",
           
            data: data,
            beforeSend: function(xhr) {
              $('#reset').click();
              xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
            },
            success: function(result) {
              get_role_Data();
              getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                      setTimeout(() => {
                         
                      }, 2000)
                     
            },
            error: function(error) {
              console.log(error);
            },
          });
        } catch (error) 
        {
          alert(error);
        }      
  }
  
   getroleById=function(n_role_id){
      
      try {
        var data = {
          n_role_id: n_role_id,
        }
        $.ajax({
          type: 'POST',
          url: "/vser-server/get_role_Databyid",
          data: data,
          beforeSend: function(xhr) {
          //  BrandDiv();
    
            $('#reset').click();
            $('#saverole').hide();
            $('#updaterole').show();
            xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
          },
          success: function(result) {
              
      
            var data = result.data[0];
            $('#s_role_name').val(data.s_role_name);
      
            $('#n_role_id').val(data.n_role_id);
    
      
    
          },
          error: function(error) {
            console.log(error);
          },
        });
      } catch (error) {
        alert(error);
      }
  
    }
})();

