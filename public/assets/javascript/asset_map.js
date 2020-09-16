$(document).ready(function () {
    $("#update_asset_map").hide();
    var tag = '';
    $('#save_asset_map').click(function (event) {
        event.preventDefault();
        tag = 'SAVE';
        $('#asset_map_form').submit();
    });
    $('#update_asset_map').click(function (event) {
        event.preventDefault();
        tag = 'UPDATE';
        $('#asset_map_form').submit();
    });
    $('#reset').click(function (event) {
        $('#save_asset_map').show();
        $('#update_asset_map').hide();
    });
    // onSubmit starts from here...
    $('#asset_map_form').on('submit', function (event) {
        debugger;
        try {
            if (tag == 'SAVE') {
                var data = {
                    n_datacenter_id: $('#n_datacenter_id').val(),
                    n_door_id: $('#n_door_id').val(),
                    n_room_id: $('#n_room_id').val(),
                    n_u_id: $('#n_u_id').val(),
                    // s_leader:$('#s_leader').val().toString(),
                    n_rack_id: $('#n_rack_id').val(),
                    n_asset_id: $('#n_asset_id').val(),
                    n_status_no: $('#n_status_no').val(),
                    d_assign_date: $('#d_assign_date').val(),
                    s_created_by: localStorage.getItem('email'),
                
                };
                var url = '/vser-server/Save_Asset_Map_Data';
            } else if (tag == 'UPDATE') {
                debugger;
               
                var data = {
                    n_datacenter_id: $('#n_datacenter_id').val(),
                    n_door_id: $('#n_door_id').val(),
                    n_room_id: $('#n_room_id').val(),
                    n_u_id: $('#n_u_id').val(),
                    n_rack_id: $('#n_rack_id').val(),
                    n_asset_id: $('#n_asset_id').val(),
                    n_status_no: $('#n_status_no').val(),
                    d_assign_date: $('#d_assign_date').val(),
                    s_modified_by: localStorage.getItem('email'),
                    n_asset_mapping_id: $('#n_asset_mapping_id').val(),
                   
                };
                var url = '/vser-server/update_Asset_Map_Data';
            } else {
                return alert('Something Wrong !!!!');
            }
            debugger;
            $.ajax({
                type: 'POST',
                url: url,
                crossDomain: true,
                data: data,
                beforeSend: function (xhr) {
                    $("#loader").addClass("is-active");
                    document.getElementById("loader").setAttribute("data-text", "Loading...");
                    xhr.setRequestHeader("authorization", localStorage.getItem("myidentity"));
                },
                success: function (result) {
                    $('#reset').click();
                    $("#close").click();

                    localStorage.setItem("myidentity", `auth2 ${result.token}`);
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    setTimeout(() => 2000);

                    get_Asset_Map_Data();
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
    // get_Rack_Data();

     get_Asset_Map_Data =function() {
        try {
            debugger;
            $.ajax({
                type: 'POST',
                url: "/vser-server/get_Asset_Map_Data",
                crossDomain: true,
                beforeSend: function (xhr) {
                    $("#get_asset_map-panel").show();
                    $("#deleted_asset_map-panel").hide();
                    document.getElementById("loader").setAttribute("data-text", "Loading...");
                    xhr.setRequestHeader("authorization", localStorage.getItem("myidentity"));
                },
                success: function (result) {
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    console.log(result);
                    console.log(result);
                    debugger;
                  
                    var data = result.data;
                    if ($.fn.dataTable.isDataTable('#asset_map_table')) {
                        $('#asset_map_table').DataTable().destroy();
                    }
                    var i = 0;
                
                    
                    $('#asset_map_table').DataTable({
                        "data": data,

                        "order": [0, 'desc'],
                        // "scrollX": true,
                        
                        "aoColumns": [
                            {
                                'render': function (data, type, row, meta) {
                                 var a= `<span class='mybtns'><button type='button' class='btn active btn-info btn-sm' data-toggle='modal' data-target='#asset_map_model' onclick='get_Asset_Map_Data_byid(${row.n_asset_mapping_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm' onclick='Delete_Asset_Map_Data(${row.n_asset_mapping_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button></span>`;
                                  return '<span class="btn btn-info glyphicon glyphicon-cog settingbtn">'+a+'</span>';
                                 
                                },

                            },
                            { "data": "datacentername" },
                            { "data": "floor" },
                            { "data": "room" },
                            { "data": "rackname" },
                            // { "data": "racku" },
                            {
                                "render": function (data, type, row, meta) {
                                
                                   var rackuno=[];
                                   for(i=0;i<row.racku.length;i++){
                                    var Racku='RU-'+row.racku[i];
                                    rackuno.push(Racku);
                                   }
                                    // return ' <span>'+rackuno+'</span>';
                                    return '<span>'+ rackuno+'</span>';  
                                    
                                }
                                
                            },
                             { "data": "asset" },
                            {
                                "render": function (data, type, row, meta) {
                                  
                                   var  status =row.status.split("::")[0]
                                    return ' <span>'+status+'</span>';
                                    
                                }
                                
                            },
                            {   render: function (data, type, row) {
                                var date = row.d_assign_date.split('T')[0];
                                return '<span>' + date + '</span>';
                            }
                    },
                    

                        ]
                    });
                },
                complete:function (res) {
                    $("#loader").removeClass("is-active");
                    // $('.glyphicon-cog').tooltip({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>", html: true, placement: "bottom"}); 
                    // $('[data-toggle="popover"]').popover({html: true, placement: "top",trigger: "click"});
          
                  },
                error: function (err) {
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

                }
            });

        } catch (error) {
            alert(error);
        }
    }
    get_Deleted_Asset_Map_Data =function() {
        try {
            debugger;
            $.ajax({
                type: 'POST',
                url: "/vser-server/get_Deleted_Asset_Map_Data",
                crossDomain: true,
                beforeSend: function (xhr) {
                    $("#get_asset_map-panel").hide();
                    $("#deleted_asset_map-panel").show();
                    document.getElementById("loader").setAttribute("data-text", "Loading...");
                    xhr.setRequestHeader("authorization", localStorage.getItem("myidentity"));
                },
                success: function (result) {
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    console.log(result);
                    console.log(result);
                    debugger;
                  
                    var data = result.data;
                    if ($.fn.dataTable.isDataTable('#deleted_asset_map_table')) {
                        $('#deleted_asset_map_table').DataTable().destroy();
                    }
                    var i = 0;
                    $('#deleted_asset_map_table').DataTable({
                        "data": data,
                        "order": [0, 'desc'],
                        // "scrollX": true,
                        "aoColumns": [
                           
                            { "data": "datacentername" },
                            { "data": "floor" },
                            { "data": "room" },
                            { "data": "rackname" },
                            { "data": "racku" },
                             { "data": "asset" },
                             {
                                "render": function (data, type, row, meta) {
                                  
                                   var  status =row.status.split("::")[0]
                                    return ' <span>'+status+'</span>';
                                    
                                }
                                
                            },
                            {   render: function (data, type, row) {
                                var date = row.d_assign_date.split('T')[0];
                                return '<span>' + date + '</span>';
                            }
                    },
                    

                        ]
                    });
                },
                complete:function (res) {
                    $("#loader").removeClass("is-active");
          
                  },
                error: function (err) {
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

                }
            });

        } catch (error) {
            alert(error);
        }
    }
    get_Asset_Map_Data_byid = function (id) {
        debugger;

        try {
            $.ajax({
                url: '/vser-server/get_Asset_Map_Data_byid',
                type: 'POST',
                crossDomain: true,
                data: { n_asset_mapping_id: id },
                beforeSend: function (xhr) {
                    //  BrandDiv();
                    $("#content_form").show();
                    $("#assetmaplisttbl").hide();
                    $("#save_asset_map").hide();
                    $("#update_asset_map").show();
                   
                },
                success: function (result) {
                   
                    var data = result.data;
                   var d_assign_date = data.d_assign_date.split('T')[0];
                     $("#n_asset_mapping_id").val(data.n_asset_mapping_id);
                    $("#n_datacenter_id").val(data.n_datacenter_id),
                    get_floor_loc(data.n_datacenter_id, data.n_door_id);
                    get_data_center_room(data.n_door_id, data.n_room_id);
                    get_rack(data.n_room_id,data.n_rack_id);
                    get_n_u_id(data.n_rack_id,data.n_u_id);
                    $("#n_asset_id").val(data.n_asset_id),
                    $("#n_status_no").val(data.n_status_no),
                    $("#d_assign_date").val(d_assign_date),
                
                        getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    setTimeout(() => 2000);
                }
            });

        } catch (err) {
            getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

        }
    };

    Delete_Asset_Map_Data = function (id) {
        var Delete_asset_map = confirm("Do You Want To Delete This Record??")
        if (Delete_asset_map   == true) {
        debugger;
        try {
            $.ajax({
                url: '/vser-server/Delete_Asset_Map_Data',
                type: 'POST',
                crossDomain: true,
                data: { n_asset_mapping_id: id },
                success: function (result) {
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    get_Asset_Map_Data();
                },
                error: function (err) {
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

                }
            });
        } catch (err) {
        }
        }
    };
    refresh = function () {
        $("#reset").click();
    }
    
    get_data_center = function () {
        
        debugger;
        try {
            $.ajax({
                url: '/vser-server/get_datacenter_location_Data',
                type: 'POST',
                crossDomain: true,
                // data: data,
                success: function (result) {
                   
                    var data_center = '';
                    data_center += '<option label="--select Data Center Name-- "></option>';
                    for (var i = 0; i < result.data.length; i++) {
                        data_center += '<option value="' + result.data[i].n_datacenter_id + '">' + result.data[i].s_datacenter_desc + '<b>('+result.data[i].country+','+ result.data[i].state+')</b></option>';
                    }
                    $('#n_datacenter_id').html(data_center);


                }
            });

        } catch (error) {

        }
    };

      get_floor_loc= function(DC,floor) {
        try {
          debugger;
         // alert("state");
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
      get_data_center_room = function (door, DCRoom) {
        try {
            debugger;
            // alert("room");
            if (door == undefined) {
                var data = { "n_door_id": $("#n_door_id").val() }
            }
            else {
                var data = { "n_door_id": door }
            }

            $.ajax({
                type: 'POST',
                url: '/vser-server/get_data_center_room',
                data: data,
                beforeSend: function () {


                },
                success: function (result) {
                    var room = '';
                    room += '<option label="--select room--"></option>';
                    for (var i = 0; i < result.data.length; i++) {
                        room += '<option value="' + result.data[i].n_room_id + '">' + result.data[i].n_room_no + '</option>';
                    }
                    $('#n_room_id').html(room);

                    if (DCRoom != undefined) {
                        $('#n_door_id').val(door);
                        $('#n_room_id').val(DCRoom)
                    }

                },
                error: function (error) {
                    console.log(error);
                },
            });
        } catch (error) {
            alert(error);
        }
    };
   
    get_rack= function (room,rack) {
        try {
            debugger;
            // alert("state");
            if (room == undefined) {
                var data = { "n_room_id": $("#n_room_id").val() }
            }
            else {
                var data = { "n_room_id":room}
            }

            $.ajax({
                type: 'POST',
                url: '/vser-server/get_rack',
                data: data,
                beforeSend: function () {
                },
                success: function (result) {
                    var statedrp = '';
                    statedrp += '<option label="--select Rack-" ></option>';
                    for (var i = 0; i < result.data.length; i++) {
                        statedrp += '<option value="' + result.data[i].n_rack_id + '">' + result.data[i].rackname + '</option>';
                    }
                    $('#n_rack_id').html(statedrp);

                    if (rack != undefined) {
                        $('#n_room_id').val(room);
                        $('#n_rack_id').val(rack)
                    }

                },
                error: function (error) {
                    console.log(error);
                },
            });
        } catch (error) {
            alert(error);
        }
    };
    get_n_u_id= function (rack,u_tag) {
        try {
            debugger;
            // alert("state");
            if (rack == undefined) {
                var data = { "n_rack_id": $("#n_rack_id").val() }
            }
            else {
                var data = { "n_rack_id":rack }
            }

            $.ajax({
                type: 'POST',
                url: '/vser-server/get_n_u_id',
                data: data,
                beforeSend: function () {


                },
                success: function (result) {

                    var statedrp = '';

                    statedrp += '<option label="--select Racku-" disabled ></option>';
                    for (var i = 0; i < result.data.length; i++) {
                        statedrp += '<option value="' + result.data[i].n_u_id + '">RU' + '-' + result.data[i].s_racku_no+'</option>';
                        // var racku='RU' + '-' + data.s_racku_no;
                    }
                    $('#n_u_id').html(statedrp);

                    if (u_tag != undefined) {
                        $('#n_rack_id').val(rack);
                        $('#n_u_id').val(u_tag)
                    }

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

        debugger;
        try {
            $.ajax({
                url: '/vser-server/get_Asset_Data',
                type: 'POST',
                crossDomain: true,
                // data: data,
                success: function (result) {
                    debugger
                    var asstdesc = '';
                    asstdesc += '<option label="--select Asset--"></option>';
                    for (var i = 0; i < result.data.length; i++) {
                        asstdesc += '<option value="' + result.data[i].n_asset_id + '">' + result.data[i].s_asset_name + '</option>';
                    }
                    $('#n_asset_id').html(asstdesc);

                }
            });

        } catch (error) {
            getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

        }
    };
    get_status = function () {

        debugger;
        try {
            var s_status='asset'
            var data={
                s_status:s_status
            }
            $.ajax({
                url: '/vser-server/get_status_Datatype',
                type: 'POST',
                crossDomain: true,
                data: data,
                success: function (result) {
                    debugger
                    var sts = '';
                    sts += '<option label="--select Status--"></option>';
                    for (var i = 0; i < result.data.length; i++) {
                        sts += '<option value="' + result.data[i].n_status_no + '">' + result.data[i].s_status_name + '</option>';
                    }
                    $('#n_status_no').html(sts);

                }
            });

        } catch (error) {
            getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

        }
    };
    assetmapopenclose = function(){
            $("#content_form").show();
            $("#assetmaplisttbl").hide();
          }
          assetmapopenclose_= function(){
            $("#content_form").hide();
            $("#assetmaplisttbl").show();
          }
          get_Asset_Map_Data();
          get_data_center();
    get_status();
    get_asset_desc();
    
});