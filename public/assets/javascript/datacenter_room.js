(function () {
  
  

  $('#deleterecord').click(function (event) {
    deleteroomrecord();
    $("#panel").hide();
    $("#panel1").show();
  
  });

  $('#saveroom').click(function (event) {
    get_datacenter_room_Data();
    $("#panel1").hide();
    $("#panel").show();
  
  });

  $('#refreshrecord').click(function (event) {
    get_datacenter_room_Data();
    $("#panel1").hide();
    $("#panel").show();
  
  });


  var url_params = getAllUrlParams(window.location)
  // window.location
  
  console.log(url_params)
  var idd=url_params;
  var idofroom=url_params.dcid
  var idofdc=url_params.roomid 
  // var idofdc=url_params.dcid
  // var idofroom=url_params.roomid 
  
  nulldata = function () {
    $("#n_room_no").val(''),
      $("#n_room_id").val('');
      $("#s_desc").val('');
      $("#n_door_id").val('');
      $("#n_datacenter_id").val('');

  };
 // get_datacenter_room_Data();
  $("#updateroom").hide();

  var tag = '';
  $('#saveroom').click(function (event) {
      event.preventDefault();
      tag = 'SAVE';
      $('#form-room').submit();
  });

  $('#updateroom').click(function (event) {
      event.preventDefault();
      tag = 'UPDATE';
      $('#form-room').submit();
  });

  $('#reset').click(function (event) {
      $('#saveroom').show();
      $('#updateroom').hide();
  });

  // onSubmit starts from here...
  $('#form-room').on('submit', function (event) {
      
      try {
          if (tag == 'SAVE') {

var date = new Date();
      d_created_date = date.getTime();
              var data = {
                n_room_no:$("#n_room_no").val(),
                  s_desc:$("#s_desc").val(),
                  n_door_id:$("#n_door_id").val(),
                  n_datacenter_id:$("#n_datacenter_id").val(),
                  d_created_date:d_created_date,
                  s_created_by: localStorage.getItem('email'),

              };
              var url = '/vser-server/check_room_record';
              // var url = '/vser-server/save_datacenter_room_record';
          } else if (tag == 'UPDATE') {
              
              var date = new Date();
              var d_modified_date = date.getTime();
              var data = {
                n_room_no:$("#n_room_no").val(),
                  s_desc:$("#s_desc").val(),
                  n_door_id:$("#n_door_id").val(),
                  n_datacenter_id:$("#n_datacenter_id").val(),
                  d_modified_date:d_modified_date,
               
                  s_modified_by: localStorage.getItem('email'),
                  n_room_id: $('#n_room_id').val(),
              };
              var url = '/vser-server/update_datacenter_room_Data';
          } else {
              return alert('Something Wrong !!!!');
          }
          
          $.ajax({
              type: 'POST',
              url: url,
              crossDomain: true,
              data: data,
              beforeSend: function () {
                  $('#reset').click();
                  // localStorage.setItem("myidentity", `auth2 ${result.token}`);
              },
              success: function (result) {
                
                // $('#reset').click();
                //   get_datacenter_room_Data();

                //   nulldata();
                //   // $('#close').click();
                //   localStorage.setItem("myidentity", `auth2 ${result.token}`);
                //   getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                //   setTimeout(() => {
                //       //window.location = "/main";
                //   }, 2000);
                if(result.mess_body!="Room Number Already Available")
                {
                 
                  $("#dcroom_form").hide();
                  $("#roomlist").show();
                  get_datacenter_room_Data();
                  $('#reset').click();
                  $('#close').click();
                  nulldata();
                  $('#reset').click();
                  $('close').click();
                  // $('#close').click();
                  localStorage.setItem("myidentity", `auth2 ${result.token}`);
                  getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);

                }
                else{
                  $("#dcroom_form").show();
                  $("#roomlist").hide();
                  localStorage.setItem("myidentity", `auth2 ${result.token}`);
                  getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);

                }
              },
              error: function (err) {
                  getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
              },
              complete: function (response) {
                  //  $("#loader").removeClass("is-active");
              }
          });
      } catch (error) {
          alert(error);
      }
  });
  // get_Rack_Data();

  get_datacenter_room_Data = function ()
   {
   
    try {
      $("#alldataofroom").show();
      $("#deletedataofroom").hide();
      
    //   var data = {
    //     loginuser: localStorage.getItem('emailid'),
    //   };
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_datacenter_room_Data",
        // data: data,
        beforeSend: function(xhr) {
  
        //   xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
        },
        success: function(result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          
          console.log(result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#roommaster')) {
            $('#roommaster').DataTable().destroy();
          }
       
          $('#roommaster').DataTable({
            'data': result.data,
            //  "scrollX":true,
            'aoColumns': [
             // { 'data': 'n_room_no'},

             {
              'render': function (data, type, row, meta) {
              //  var a= `<button type='button' class='btn btn-default light btn-sm' data-toggle='modal' data-target='#myModalfordcloc' onclick='get_datacenterroom_ById(${row.n_room_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn btn-default light btn-sm' onclick='delete_datacenter_room_ById(${row.n_room_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
              //   return '<span class="btn btn-info glyphicon glyphicon-cog" data-toggle="tooltip" title ="'+a+'" ></span>';
               
              var a= `<span class='mybtns'><button type='button' class='btn active btn-info btn-sm' data-toggle='modal' data-target='#rack_model' onclick='get_datacenterroom_ById(${row.n_room_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm' onclick='delete_datacenter_room_ById(${row.n_room_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button></span>`;
              return '<span class="btn btn-info glyphicon glyphicon-cog settingbtn">'+a+'</span>';
              },
            },
              {
                'render': function (data, type, row, meta) {
  
                  return '<span class="" data-toggle="tooltip1" title ="Room No">'+row.n_room_no+'</span>';
                  
  
                },
              },
           
              // { 'data': 's_desc' },
           //   { 'data': 'floor'},
              {
                'render': function (data, type, row, meta) {
  
                  return '<span class="" data-toggle="tooltip1" title ="Floor Location">'+row.floor+'</span>';
                  
  
                },
              },
            //  { 'data': 'datacentername' },
              {
                'render': function (data, type, row, meta) {
  
                  return '<span class="" data-toggle="tooltip1" title ="Datacenter Name">'+row.datacentername+'</span>';
                  
  
                },
              }
        
            //  {
            //     'render': function (data, type, row, meta) {
            //       return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal" data-target="#myModalforrole" onclick="get_datacenterroom_ById(' + row.n_room_id + ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="delete_datacenter_room_ById(' + row.n_room_id + ')"style="margin-left:8px"><span class="glyphicon glyphicon-trash"></span></button>';
            //     },
            // }

            
            
            ],
          });
        },
        error: function (error) {
          console.log(error);
        },
        complete:function (res) {
          // $('.glyphicon-cog').tooltip({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>", html: true, placement: "bottom"}); 
          $('[data-toggle="tooltip"]').tooltip({html: true, placement: "top",trigger: "click"});
          $('[data-toggle="tooltip1"]').tooltip({html: true, placement: "top"});
          $("#panel1").hide();

        }
      });
    } catch (error) {
      alert(error);
    }
  }




  deleteroomrecord = function ()
  {
    try {
      
    //   var data = {
    //     loginuser: localStorage.getItem('emailid'),
    //   };
      $.ajax({
        type: 'POST',
        url: "/vser-server/deleteroomrecord",
        // data: data,
        beforeSend: function(xhr) {
  
        //   xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
        },
        success: function(result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          
          console.log(result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#roommaster1')) {
            $('#roommaster1').DataTable().destroy();
          }
       
          $('#roommaster1').DataTable({
            'data': result.data,
            //  "scrollX":true,
            'aoColumns': [
             // { 'data': 'n_room_no'},
              {
                'render': function (data, type, row, meta) {
  
                  return '<span class="" data-toggle="tooltip1" title ="Room No">'+row.n_room_no+'</span>';
                  
  
                },
              },
           
              // { 'data': 's_desc' },
           //   { 'data': 'floor'},
              {
                'render': function (data, type, row, meta) {
  
                  return '<span class="" data-toggle="tooltip1" title ="Floor Location">'+row.floor+'</span>';
                  
  
                },
              },
            //  { 'data': 'datacentername' },
              {
                'render': function (data, type, row, meta) {
  
                  return '<span class="" data-toggle="tooltip1" title ="Datacenter Name">'+row.datacentername+'</span>';
                  
  
                },
              },
        
            //  {
            //     'render': function (data, type, row, meta) {
            //       return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal" data-target="#myModalforrole" onclick="get_datacenterroom_ById(' + row.n_room_id + ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="delete_datacenter_room_ById(' + row.n_room_id + ')"style="margin-left:8px"><span class="glyphicon glyphicon-trash"></span></button>';
            //     },
            // }

            // {
            //   'render': function (data, type, row, meta) {
            //    var a= `<button type='button' class='btn btn-default light btn-sm' data-toggle='modal' data-target='#myModalfordcloc' onclick='get_datacenterroom_ById(${row.n_room_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn btn-default light btn-sm' onclick='delete_datacenter_room_ById(${row.n_room_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
            //     return '<span class="btn btn-info glyphicon glyphicon-cog" data-toggle="tooltip" title ="'+a+'" ></span>';
               
            //   },
            // }
            
            ],
          });
        },
        error: function (error) {
          console.log(error);
        },
        complete:function (res) {
          // $('.glyphicon-cog').tooltip({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>", html: true, placement: "bottom"}); 
          $('[data-toggle="tooltip"]').tooltip({html: true, placement: "top",trigger: "click"});
          $('[data-toggle="tooltip1"]').tooltip({html: true, placement: "top"});

        }
      });
    } catch (error) {
      alert(error);
    }
  }

 
     delete_datacenter_room_ById=function(n_room_id){
      try {
        if (confirm("Do you really want to Delete the Record ?")) {
      
          var data = {
              n_room_id: n_room_id,
          };
        } else {
          return false;
      }
          $.ajax({
            type: 'POST',
            url: "/vser-server/delete_datacenter_room_ById",
           
            data: data,
            beforeSend: function(xhr) {
              $('#reset').click();
              xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
            },
            success: function(result) {
              $('#resetroom').click();
              get_datacenter_room_Data();
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
  
   get_datacenterroom_ById=function(n_room_id){
      
      try {
        var data = {
          n_room_id: n_room_id,
        }
        $.ajax({
          type: 'POST',
          url: "/vser-server/get_datacenter_room_ById",
          data: data,
          beforeSend: function(xhr) {
          //  BrandDiv();
    
          $('#reset').click();
          $('#saveroom').hide();
          $("#updateroom").show();
          get_data_center();
          get_floor_loc();
            xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
          },
          success: function(result) {
              

              $("#dcroom_form").show();
              $("#roomlist").hide();

            var data = result.data[0];
           
            $('#n_room_no').val(result.data.n_room_no);
            $('#s_desc').val(result.data.s_desc);
            $('#n_door_id').val(result.data.n_door_id);
            $('#n_datacenter_id').val(result.data.n_datacenter_id);
            get_floor_loc(result.data.n_datacenter_id,result.data.n_door_id);
            

            $('#n_room_id').val(result.data.n_room_id);
    
      
    
          },
          error: function(error) {
            console.log(error);
          },
        });
      } catch (error) {
        alert(error);
      }
  
    }


    get_data_center = function () {

      
      try {
      // var idofdc=idofdc
  
        $.ajax({
          url: '/vser-server/get_datacenter_location_Data',
          type: 'POST',
          crossDomain: true,
          // data: data,
          success: function (result) {
            debugger
            var data_center = '';
            data_center += '<option label="--select Datacenter Name--" ></option>';
            for (var i = 0; i < result.data.length; i++) {
              data_center += '<option value="' + result.data[i].n_datacenter_id + '">' + result.data[i].s_datacenter_name + '</option>';
            }
            $('#n_datacenter_id').html(data_center);
  
            if (idofdc != undefined) {
              $('#n_datacenter_id').val(idofdc);
             
          }
          }
        });
  
      } catch (error) {
        getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
  
      }
    };
   

    get_floor_loc= function(DC,floor) {
      try {
        
        if(DC == undefined)
        {
           var data={"n_datacenter_id":$("#n_datacenter_id").val()}
        }
        else
        {
           var data={"n_datacenter_id":DC}
        }
  
        $.ajax({
          type: 'POST',
          url: '/vser-server/get_floor_loc',
          data: data,
          beforeSend: function() {
          
           
          },
          success: function(result) 
          {
           
            var statedrp = '';
         
            statedrp += '<option label="--select floor-"></option>';
            for (var i = 0; i < result.data.length; i++) {
              statedrp += '<option value="' + result.data[i].n_door_id + '">' + result.data[i].s_floor_loc + '</option>';
            }
            $('#n_door_id').html(statedrp);
  
              if(floor != undefined)
              {
                $('#n_datacenter_id').val(DC);
                $('#n_door_id').val(floor)
            } 
//               if(idofroom!=undefined)
// { $('#n_door_id').val(idofroom)

// }     
          },
          error: function(error) {
            console.log(error);
          },
        });
      } catch (error) {
        alert(error);
      }
    };

    
    if(idofdc!=undefined ){
      
      
      $("#dcroom_form").show();
      $("#roomlist").hide();
      get_data_center(idofdc);
     
      // get_floor_loc();
      get_floor_loc(idofdc,idofroom);
      // get_data_center(idofurl);
    }else{
      get_data_center();
      $("#dcroom_form").hide();
      // get_Country_Name();
    }
    // $("#dcroom_form").hide();

    divopennclose=function(){
      // refresh();
      
      $("#dcroom_form").show();
      $("#roomlist").hide();
    }
  
    // $("#dcroom_form").hide();



// divopennclose_= function(){
//   
//   // refresh();
//   $("#dcroom_form").show();
//   $("#roomlist").hide();
// }

return_ = function(){
  
  // refresh();
  $("#dcroom_form").hide();
  $("#roomlist").show();
}
get_datacenter_room_Data();
get_data_center();
})();

