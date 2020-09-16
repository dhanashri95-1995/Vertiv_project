(function () {
  
  // alert("role");
  // get_role_Data ();
  $("#updateR").hide();

  var tag = '';
  $('#saverole').click(function (event) {
      event.preventDefault();
      tag = 'SAVE';
      $('#form-role').submit();
  });

  $('#updateR').click(function (event) {
      event.preventDefault();
      tag = 'UPDATE';
      $('#form-role').submit();
  });

  $('#resetrole').click(function (event) {
      $('#saverole').show();
      $('#updateR').hide();
  });

  // onSubmit starts from here...
  $('#form-role').on('submit', function (event) {
      
      try {
          if (tag == 'SAVE') {

var date = new Date();
var d_created_date = date.getTime();
var role=document.getElementById("s_role_name").value
var s_rolename = role.toUpperCase();
              var data = {
                  s_role_name:s_rolename,
                  d_created_date:d_created_date,
                  s_created_by: localStorage.getItem('email'),

              };
              var url = '/vser-server/check_role_record';
          } else if (tag == 'UPDATE') {
              
              var date = new Date();
              var d_modified_date = date.getTime();
              var role=document.getElementById("s_role_name").value
var s_rolename = role.toUpperCase();
              var data = {
                  s_role_name:s_rolename,

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
              },
              success: function (result) {

                  $('#resetrole').click();
                  $("#s_role_name").val('');
                  // $('#saverole').show();
                  // $('#updateRole').hide();
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

 

  get_role_Data = function () {
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
            
            getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
            console.log(result);
            var i = 0;
            if ($.fn.dataTable.isDataTable('#role_table')) {
              $('#role_table').DataTable().destroy();
            }
          //   var tdata=result.data
            $('#role_table').DataTable({
              'data': result.data,
              //  "scrollX":true,
              'aoColumns': [
                { 'render': function(data, type, row, meta) {
                  return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"   onclick="getroleById(' + row.n_role_id + ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="deleteroleById(' + row.n_role_id + ')"  style="margin-left:7px"><span class="glyphicon glyphicon-trash"></span></button>';
                }
              },
                { 'data': 's_role_name' },
          
              {
                // data-toggle="modal" data-target="#map_model"
                "render": function(data, type, row, meta) {
                    return ' <a href="#/user_role/usermap?ID='+row.n_role_id+'"> <button type="button" class="btn active btn-info btn-sm "  onclick="MapUser(' + row.n_role_id + ',\'' + row.s_role_name + '\')" style="margin-left:8px"><span class="glyphicon glyphicon-plus"></span></button></a>';
                }
            },
              
              // {
              //   'render': function (data, type, row, meta) {
              //    var a= `<button type='button' class='btn active btn-info btn-sm' data-toggle='modal' data-target='#myModalfordcloc' onclick='getroleById(${row.n_role_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm' onclick='deleteroleById(${row.n_role_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
              //     return '<span class="btn btn-info glyphicon glyphicon-cog" data-toggle="popover" title ="'+a+'"></span>';

              //   }
                    
              //      },
                 
                
              
              
              ],
            });
          },
          complete:function (res) {
            // $('.glyphicon-cog').tooltip({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>", html: true, placement: "bottom"}); 
            $('[data-toggle="popover"]').popover({html: true, placement: "top",trigger: "click"});
  
          },
          error: function(error) {
            console.log(error);
          },
        });
      } catch (error) {
        alert(error);
      }
    }


    MapUser =function(id, name) {
      // alert("iduf")
      
      $("#roleid").val(id);
      $("#rolename").text(name);
      Alluserdata();
      get_user_role_Data();
     }
     deleteroleById=function(n_role_id){
      try {
        if (confirm("Do you really want to delete the record ?")) {
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
              $('#resetrole').click();
              $("#s_role_name").val('');
              $('#saverole').show();
              $('#updateR').hide();
              getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                      setTimeout(() => {
                         
                      }, 2000)
                     
            },
            error: function(error) {
              console.log(error);
            },
          });
        }else{
          return false;
        }
        } catch (error) 
        {
          alert(error);
        }      
  }
  
  getroleById=function (n_role_id){
    //  alert("get")
      
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
    
            $('#resetrole').click();
            $('#saverole').hide();
            $('#updateR').show();
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


        get_role_Data ();
    // ************************************user map**********************************

    (function () {

      
      // alert("role");
      // get_user_role_Data();
      $("#updateuserrole").hide();
    
      var tag = '';
      $('#saveuserrole').click(function (event) {
          event.preventDefault();
          tag = 'SAVE';
          $('#form-userrole').submit();
      });
    
      $('#updateuserrole').click(function (event) {
          event.preventDefault();
          tag = 'UPDATE';
          $('#form-userrole').submit();
      });
    
      $('#resetuserrole').click(function (event) {
          $('#saveuserrole').show();
          $('#updateuserrole').hide();
      });
    
      // onSubmit starts from here...
      $('#form-userrole').on('submit', function (event) {
          
          try {
              if (tag == 'SAVE') {
    
    var date = new Date();
    var d_created_date = date.getTime();
                  var data = {
    
                  
                      s_user_id:$("#s_user_id").val(),
                      n_role_id:$("#roleid").val(),
                      d_created_date:d_created_date,
                      s_created_by: localStorage.getItem('email'),
    
                  };
                  var url = '/vser-server/save_user_role_record';
              } else if (tag == 'UPDATE') {
                  
                  var date = new Date();
                  var d_modified_date = date.getTime();
                  var data = {
                    
    
                      s_user_id:$("#s_user_id").val(),
                      n_role_id:$("#roleid").val(),
                      d_modified_date:d_modified_date,
                      s_modified_by: localStorage.getItem('email'),
                      s_userrole_id: $('#s_userrole_id').val(),
                  };
                  var url = '/vser-server/update_user_role_Data';
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
    
                      $('#resetuserrole').click();
                     ;
                      $('#saveuserrole').show();
                      $('#updateuserrole').hide();
                      get_user_role_Data();
                      
                      localStorage.setItem("myidentity", `auth2 ${result.token}`);
                      getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                      setTimeout(() => {
                          // window.location = "/main";
                      }, 2000);
                      
                  },
                  error: function (err) {
                      getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
                  },
                  complete: function (response) {
                    get_user_role_Data();
                      //  $("#loader").removeClass("is-active");
                  }
              });
          } catch (error) {
              alert(error);
          }
      });
      // get_Rack_Data();
    
     
    
      
           get_user_role_Data= function (){
                try {
            
            var data = {
              n_role_id: $("#roleid").val()
          }
            $.ajax({
              type: 'POST',
              url: "/vser-server/get_user_role_Data",
              data: data,
              beforeSend: function(xhr) {
        
              //   xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
              },
              success: function(result) {
                
                console.log("jj",result);
                var i = 0;
                if ($.fn.dataTable.isDataTable('#userroletbl')) {
                  $('#userroletbl').DataTable().destroy();
                }
              //   var tdata=result.data
                $('#userroletbl').DataTable({
                  'data': result.data,
                  //  "scrollX":true,
                  'aoColumns': [
                
                   
                    { 'data': 'username' },
                    { 'data': 'rolename' },
                 
                 
                   { 'render': function(data, type, row, meta) {
                      return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"  onclick="getuserroleById(' + row.s_userrole_id + ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="deleteuserroleById(' + row.s_userrole_id + ')" style="margin-left:7px"><span class="glyphicon glyphicon-trash"></span></button>';
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
    
    
     
        deleteuserroleById=function(s_userrole_id){
          
          try {
              var data = {
                s_userrole_id: s_userrole_id,
              };
              $.ajax({
                type: 'POST',
                url: "/vser-server/deleteuserroleById",
               
                data: data,
                beforeSend: function(xhr) {
                  $('#reset').click();
                  xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
                },
                success: function(result) {
                  get_user_role_Data();
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
      
      getuserroleById=function(s_userrole_id){
          
          try {
            var data = {
              s_userrole_id: s_userrole_id,
            }
            $.ajax({
              type: 'POST',
              url: "/vser-server/getuserroleById",
              data: data,
              beforeSend: function(xhr) {
              //  BrandDiv();
        
                // $('#reset').click();
                $('#saveuserrole').hide();
                $('#updateuserrole').show();
                xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
              },
              success: function(result) {
                  
          
                var data = result.data[0];
                $('#s_user_id').val(data.s_user_id);
          
                $('#n_role').val(data.n_role_id);
                $('#s_userrole_id').val(data.s_userrole_id);
              
                $('#reset').click();
          
        
              },
              error: function(error) {
                console.log(error);
              },
            });
          } catch (error) {
            alert(error);
          }
      
        }
    
       
         Alluserdata=function(){
           
          try {
          
            $.ajax({
              type: 'POST',
              url: "/vser-server/get_user_Data",
              // data: data,
              beforeSend: function(xhr) {
              //  BrandDiv();
        
                $('#reset').click();
                $('#saveuser').hide();
                $('#updateuser').show();
                xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
              },
              success: function(result) {
                  
          
                var data = result.data[0];
                var userdrp = '';
                // $("#N_MAKER_ID").text("");
                userdrp += '<option label="--select User --"></option>';
                for (var i = 0; i < result.data.length; i++) {
                  userdrp += '<option value="' + result.data[i].s_user_id + '">' + result.data[i].username + '</option>';
                }
                $('#s_user_id').html(userdrp);
        
          
        
              },
              error: function(error) {
                console.log(error);
              },
            });
          } catch (error) {
            alert(error);
          }
        }
        // Allroledata=function(){
        //   try {
          
        //     $.ajax({
        //       type: 'POST',
        //       url: "/vser-server/get_role_Data",
        //       // data: data,
        //       beforeSend: function(xhr) {
        //       //  BrandDiv();
        
        //         $('#reset').click();
        //         $('#saveuser').hide();
        //         $('#updateuser').show();
        //         xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
        //       },
        //       success: function(result) {
        //           
          
        //         var data = result.data[0];
        //         var roledrp = '';
        //         // $("#N_MAKER_ID").text("");
        //         roledrp += '<option label="--select Role --"></option>';
        //         for (var i = 0; i < result.data.length; i++) {
        //           roledrp += '<option value="' + result.data[i].n_role_id + '">' + result.data[i].rolename + '</option>';
        //         }
        //         $('#n_role').html(roledrp);
        
          
        
        //       },
        //       error: function(error) {
        //         console.log(error);
        //       },
        //     });
        //   } catch (error) {
        //     alert(error);
        //   }
        // }
        // get_user_role_Data();
      
        //  Allroledata();
        
    })();
    
    
})();

