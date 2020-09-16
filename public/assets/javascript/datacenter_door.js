(function () {
  

  // $('#deleterecord').click(function (event) {
  //   deletedoorrecord();
  //   $("#panel").hide();
  //   $("#panel1").show();
  
  // });
  // $('#refreshrecord').click(function (event) {
  //   get_datacenter_door_Data();
  //   $("#panel1").hide();
  //   $("#panel").show();
  
  // });


  // $('#savedoor').click(function (event) {
  //   get_datacenter_door_Data();
  //   $("#panel1").hide();
  //   $("#panel").show();
  
  // });

  var url_params = getAllUrlParams(window.location)
  // window.location
  
  console.log(url_params)
  var idd=url_params;
  var idofurl=idd["id"]
  nulldata = function () {

    $("#n_door_id").val('');
    $("#n_datacenter_id").val('');
    $("#s_door_sensor_id").val('');
    $('#resetrole').click();
    $("#s_floor_loc").val('');
    $("#datacenter_location").val('');

    
  };

  $("#updatedoor").hide();

  var tag = '';
  $('#savedoor').click(function (event) {
    event.preventDefault();
    tag = 'SAVE';
    $('#form-floor').submit();
  });

  $('#updatedoor').click(function (event) {
    event.preventDefault();
    tag = 'UPDATE';
    $('#form-floor').submit();
  });

  $('#reset').click(function (event) {
    $('#updatedoor').hide();
    $('#savedoor').show();
  });

  // onSubmit starts from here...
  $('#form-floor').on('submit', function (event) {
    
    try {
      if (tag == 'SAVE') {
        

        var date = new Date();
        d_created_date = date.getTime();
        var data = {
          d_created_date:d_created_date,
          n_datacenter_id: $("#n_datacenter_id").val(),
          s_door_sensor_id: $("#s_door_sensor_id").val(),
          s_floor_loc: $("#s_floor_loc").val(),
          
          s_datacenter_location: $("#s_datacenter_location").val(),

          s_created_by: localStorage.getItem('email'),

        };
      
        var url = '/vser-server/save_datacenter_door_record';
      } else if (tag == 'UPDATE') {
        
        var date = new Date();
        var d_modified_date = date.getTime();
        var data = {
          d_modified_date:d_modified_date,
          n_datacenter_id: $("#n_datacenter_id").val(),
          s_door_sensor_id: $("#s_door_sensor_id").val(),
          s_floor_loc: $("#s_floor_loc").val(),
          s_datacenter_location: $("#s_datacenter_location").val(),

          s_modified_by: localStorage.getItem('email'),
          n_door_id: $('#n_door_id').val(),
        };
        var url = '/vser-server/update_datacenter_door_Data';
      } else {
        return alert('Something Wrong !!!!');
      }
      
      $.ajax({
        type: 'POST',
        url: url,
        crossDomain: true,
        data: data,
        beforeSend: function () {
          $('#resetrole').click();
          // localStorage.setItem("myidentity", `auth2 ${result.token}`);
        },
        success: function (result) {
          
         
          $("#content_form_floor").hide();
          $("#floorlisttbl").show();
          get_datacenter_door_Data();
          $('#close').click();
          nulldata();
          $('#reset').click();
          $('close').click();
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
          //  $("#loader").removeClass("is-active");
        }
      });
    } catch (error) {
      alert(error);
    }
  });
  // get_Rack_Data();

  get_datacenter_door_Data = function() {
    try {
      
      $("#alldataofdoor").show();
      $("#deletedataofdoor").hide();
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_datacenter_door_Data",
        beforeSend: function (xhr) {

        },
        success: function (result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          
          console.log(result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#doormaster')) {
            $('#doormaster').DataTable().destroy();
          }
          //   var tdata=result.data
          $('#doormaster').DataTable({
            'data': result.data,
            // "scrollX": true,
            'aoColumns': [
              {
                'render': function (data, type, row, meta) {
                //  var a= `<button type='button' class='btn btn-default light btn-sm' data-toggle='modal' data-target='#myModalfordcloc' onclick='get_datacenterdoor_ById(${row.n_door_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn btn-default light btn-sm' onclick='delete_datacenter_door_ById(${row.n_door_id},${row.n_datacenter_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
                //   return '<span class="btn btn-info glyphicon glyphicon-cog" data-toggle="tooltip" title ="'+a+'" ></span>';
                var a= `<span class='mybtns'><button type='button' class='btn active btn-info btn-sm' data-toggle='modal' data-target='#rack_model' onclick='get_datacenterdoor_ById(${row.n_door_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm' onclick='delete_datacenter_door_ById(${row.n_door_id},${row.n_datacenter_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button></span>`;
                return '<span class="btn btn-info glyphicon glyphicon-cog settingbtn">'+a+'</span>';
                 
                },
              },
              {
                "render": function(data, type, row, meta) {
                    return ' <a  href="#/door/room?dcID='+row.n_door_id+'&roomID='+row.n_datacenter_id+'"> <button type="button" class="btn active btn-info btn-sm"   style="margin-left:8px"><span class="glyphicon glyphicon-plus" data-toggle="tooltip1" title="Add Room"></span></button></a>';
                }
            },
              

              {
                'render': function (data, type, row, meta) {
  
                  return '<span class="" data-toggle="tooltip1" title ="Datacenter Name">'+row.datacentername+'</span>';
                  
  
                },
              },
              {
                'render': function (data, type, row, meta) {
  
                  return '<span class="" data-toggle="tooltip1" title ="Datacenter Location">'+row.s_datacenter_location+'</span>';
                  
  
                },
              },
              {
                'render': function (data, type, row, meta) {
  
                  return '<span class="" data-toggle="tooltip1" title ="Floor Id">'+row.s_floor_loc+'</span>';
                  
  
                },
              },
             
             
              {
               
                
                  "data": "s_door_sensor_id",
                  render: function (data, type, row) {
                      if(data==null){
                          return '<span>--------</span>';
                      }else
                      {
                          return '<span>' +data+ '</span>';
                      }
                     
                  },
              }
          

             
              

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
          //$("#panel1").hide();

        }
      });
    } catch (error) {
      alert(error);
    }
  }



  deletedoorrecord = function ()
  {
 
    try {
      
      
      $.ajax({
        type: 'POST',
        url: "/vser-server/deletedoorrecord",
        beforeSend: function (xhr) {

        },
        success: function (result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          
          console.log(result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#doormaster1')) {
            $('#doormaster1').DataTable().destroy();
          }
          //   var tdata=result.data
          $('#doormaster1').DataTable({
            'data': result.data,
            // "scrollX": true,
            'aoColumns': [
              

              {
                'render': function (data, type, row, meta) {
  
                  return '<span class="" data-toggle="tooltip1" title ="Datacenter Name">'+row.datacentername+'</span>';
                  
  
                },
              },
             
             
             
              {
                'render': function (data, type, row, meta) {
  
                  return '<span class="" data-toggle="tooltip1" title ="Datacenter Location">'+row.s_datacenter_location+'</span>';
                  
  
                },
              },
              {
                'render': function (data, type, row, meta) {
  
                  return '<span class="" data-toggle="tooltip1" title ="Floor Id">'+row.s_floor_loc+'</span>';
                  
  
                },
              },
              {
               
                
                  "data": "s_door_sensor_id",
                  render: function (data, type, row) {
                      if(data==null){
                          return '<span>--------</span>';
                      }else
                      {
                          return '<span>' +data+ '</span>';
                      }
                     
                  },
              }
            //   {
            //     "render": function(data, type, row, meta) {
            //         return ' <a  href="#/door/room?dcID='+row.n_door_id+'&roomID='+row.n_datacenter_id+'"> <button type="button" class="btn active btn-info btn-sm"   style="margin-left:8px"><span class="glyphicon glyphicon-plus"></span></button></a>';
            //     }
            // },
              

            //   {
            //     'render': function (data, type, row, meta) {
            //      var a= `<button type='button' class='btn btn-default light btn-sm' data-toggle='modal' data-target='#myModalfordcloc' onclick='get_datacenterdoor_ById(${row.n_door_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn btn-default light btn-sm' onclick='delete_datacenter_door_ById(${row.n_door_id},${row.n_datacenter_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
            //       return '<span class="btn btn-info glyphicon glyphicon-cog" data-toggle="tooltip" title ="'+a+'" ></span>';
                 
            //     },
            //   }
              

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








  delete_datacenter_door_ById = function (n_door_id,n_datacenter_id) {
    try {
      if (confirm("Do you really want to Delete the Record ?")) {
                   
      var data = {
        n_door_id: n_door_id,
        n_datacenter_id:n_datacenter_id
      };
    } else {
      return false;
  }
      $.ajax({
        type: 'POST',
        url: "/vser-server/delete_datacenter_door_ById",

        data: data,
        beforeSend: function (xhr) {
          $('#reset').click();
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          get_datacenter_door_Data();
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          setTimeout(() => {

          }, 2000)

        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  }

  get_datacenterdoor_ById = function (n_door_id) {
    
    try {
      var data = {
        n_door_id: n_door_id,
      }
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_datacenter_door_ById",
        data: data,
        beforeSend: function (xhr) {
          //  BrandDiv();

          $('#resetrole').click();
          $('#savedoor').hide();
          $("#updatedoor").show();
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          
          $("#content_form_floor").show();
          $("#floorlisttbl").hide();

          var data = result.data[0];
          $('#n_datacenter_id').val(result.data.n_datacenter_id);
          $('#s_door_sensor_id').val(result.data.s_door_sensor_id);
          $('#s_floor_loc').val(result.data.s_floor_loc);

          $('#n_door_id').val(result.data.n_door_id);
          $('#s_datacenter_location').val(result.data.s_datacenter_location);



        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }

  }




  get_data_center = function () {

    
    try {

      $.ajax({
        url: '/vser-server/get_datacenter_location_Data',
        type: 'POST',
        crossDomain: true,
        // data: data,
        success: function (result) {
          debugger
          var data_center = '';
          data_center += '<option label="--select datacenter Name-- "></option>';
          for (var i = 0; i < result.data.length; i++) {
            data_center += '<option value="' + result.data[i].n_datacenter_id + '">' + result.data[i].s_datacenter_name + '</option>';
          }
          $('#n_datacenter_id').html(data_center);
          if (idofurl != undefined) {
            $('#n_datacenter_id').val(idofurl);
           
        }


        }
      });

    } catch (error) {
      getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

    }
  };




  get_location= function(location,datacenter_name) {
    try {
      
      if(location == undefined)
      {
         var data={"n_datacenter_id":$("#n_datacenter_id").val()}
      }
      else
      {
         var data={"n_datacenter_id":location}
      }
 
      $.ajax({
        type: 'POST',
        url: '/vser-server/get_location_details',
        data: data,
        beforeSend: function() {
        
         
        },
        success: function(result) 
        {
         
          var statedrp = '';
       
          // statedrp += '<option label="--select location--">--select location--</option>';
          // for (var i = 0; i < result.data.length; i++) {
          //    statedrp += '<option value="' + result.data[i].n_datacenter_id + '">' + result.data[i].s_datacenter_address + ''+","+''+result.data[i].s_datacenter_landmark +''+","+''+result.data[i].n_datacenter_pincode+'</option>';
          //  // statedrp += '<option value="' + result.data[i].n_datacenter_id + '">' + result.data[i].s_datacenter_address + ''+result.data[i].s_datacenter_landmark +''+result.data[i].n_datacenter_pincode+'</option>';

          // }
          // $('#s_datacenter_location').html(statedrp);
          for (var i = 0; i < result.data.length; i++) {
            result.data[i].n_datacenter_id ;
            statedrp += 
             result.data[i].s_datacenter_address +','+
             result.data[i].s_datacenter_landmark +','+
             result.data[i].n_datacenter_pincode;
          // statedrp += '<option value="' + result.data[i].n_datacenter_id + '">' + result.data[i].s_datacenter_address + ''+result.data[i].s_datacenter_landmark +''+result.data[i].n_datacenter_pincode+'</option>';

                      


         }
          
          $('#s_datacenter_location').html(statedrp);

            if(datacenter_name != undefined)
            {
              $('#n_datacenter_id').val(location);
              $('#n_datacenter_id').val(datacenter_name)
          } 
 
        },
        error: function(error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  };

  
  divopennclose=function(){
    // refresh();
    
   
    $("#content_form_floor").show();
    $("#floorlisttbl").hide();
  }

  divopennclose_= function(){
    
    // refresh();
    $("#content_form_floor").show();
    $("#floorlisttbl").hide();
  }

  return_ = function(){
    
    // refresh();
    $("#content_form_floor").hide();
    $("#floorlisttbl").show();
  }
  if(idofurl!=undefined){
    $("#content_form_floor").show();
    $("#floorlisttbl").hide();
    get_location(idofurl)
   }else{
    // Alluserdata();
    // Allroledata();
   }


   get_datacenter_door_Data();
   get_location();
   get_data_center();
})();

