$(document).ready(function () {
    $("#updateRack").hide();
    var tag = '';
    $('#saveRack').click(function (event) {
        event.preventDefault();
        tag = 'SAVE';
        $('#form-rack').submit();
    });
    $('#updateRack').click(function (event) {
        event.preventDefault();
        tag = 'UPDATE';
        $('#form-rack').submit();
    });
    $('#reset').click(function (event) {
        $('#saveRack').show();
        $('#updateRack').hide();
    });
    // onSubmit starts from here...
    $('#form-rack').on('submit', function (event) {
        debugger;
        try {
            if (tag == 'SAVE') {
               
                var data = {
                    n_datacenter_id: $('#n_datacenter_id').val(),
                    n_door_id: $('#n_door_id').val(),
                    n_room_id: $('#n_room_id').val(),
                    s_rack_name: $('#s_rack_name').val(),
                    s_racku_no: $('#s_racku_no').val(),
                    s_rack_code: $('#s_rack_code').val(),
                    n_rack_status: $('#n_rack_status').val(),
                    s_rack_model: $('#s_rack_model').val(),
                    s_created_by: localStorage.getItem('email'),


                };
                var url = '/vser-server/Save_Rack_Data';
            } else if (tag == 'UPDATE') {
                debugger;
             
                var data = {
                    n_datacenter_id: $('#n_datacenter_id').val(),
                    n_door_id: $('#n_door_id').val(),
                    n_room_id: $('#n_room_id').val(),
                    s_rack_name: $('#s_rack_name').val(),
                    s_racku_no: $('#s_racku_no').val(),
                    s_rack_code: $('#s_rack_code').val(),
                    n_rack_status: $('#n_rack_status').val(),
                    s_rack_model: $('#s_rack_model').val(),
                    s_modified_by: localStorage.getItem('email'),

                    n_rack_id: $('#n_rack_id').val(),
                };
                var url = '/vser-server/update_Rack_Data';
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
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);

                },
                error: function (err) {
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
                },
                complete: function (response) {
                    $("#loader").removeClass("is-active");
                    get_Rack_Data();
                }
            });
        } catch (error) {
            alert(error);
        }
    });
    // get_Rack_Data();

    get_Rack_Data = function () {
        debugger;
        try {
            $.ajax({
                type: 'POST',
                url: "/vser-server/get_Rack_Data",
                crossDomain: true,
                beforeSend: function (xhr) {
                    $("#delete_rack_panel").hide();
                    $("#get_rack_panel").show();
                    $("#loader").addClass("is-active");
                    document.getElementById("loader").setAttribute("data-text", "Loading...");
                    xhr.setRequestHeader("authorization", localStorage.getItem("myidentity"));
                },
                success: function (result) {
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    console.log(result);
                    var data = result.data;
                    if ($.fn.dataTable.isDataTable('#rack_table')) {
                        $('#rack_table').DataTable().destroy();
                    }
                    var i = 0;
                    $('#rack_table').DataTable({
                        "data": data,
                        // destroy: true,
                        "order": [0, 'desc'],
                        // "scrollX": true,
                        "aoColumns": [


                            // {

                            //     "data": "datacentername",
                            //     'render': function (data, type, row, meta) {
                            //      var a= data;
                            //       return '<span data-toggle="tooltip"  title="datacenter name">'+a+'</span>';

                            //     },
                            // },
                            {
                                'render': function (data, type, row, meta) {
                                    var a = `<span class='mybtns'><button type='button' class='btn active btn-info btn-sm' data-toggle='modal' data-target='#rack_model' onclick='get_Rack_Data_byid(${row.n_rack_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm' onclick='Delete_Rack_Data(${row.n_rack_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button></span>`;
                                    return '<span class="btn btn-info glyphicon glyphicon-cog settingbtn">'+a+'</span>';

                                },

                            },
                            { "data": "datacentername" },
                            { "data": "floor" },
                            { "data": "room" },
                            { "data": "rackname" },
                            { "data": "s_racku_no" },
                            { "data": "s_rack_code" },
                          
                            {
                                "render": function (data, type, row, meta) {
                                    debugger;
                                    var status = row.status.split("::")[0]
                                    return '<span>' + status + '</span>';

                                }

                            },
                            // {
                            //     "render": function (data, type, row, meta) {
                            //         debugger;
                            //         var statusname = row.status.split("::")[0]
                            //         var statuscolor = row.status.split("::")[1]
                            //         // return '<td><i class="fa fa-circle" aria-hidden="true" style="color:'+statuscolor+'"></i> '+statusname+'</td>';
                            //         return ' <span style="height: 20px;width: 100px;background-color: ' + statuscolor + ';border-radius:10px;color:white;padding:4px">' + statusname + '</span>';

                            //     }

                            // },
                            { "data": "s_rack_model" },

                        ]
                    });
                },
                complete: function (res) {
                    $("#loader").removeClass("is-active");
                    // $('[data-toggle="tooltip"]').tooltip({html: true, placement: "top",trigger: "hover"}); 
                    // $('[data-toggle="popover"]').popover({ html: true, placement: "top", trigger: "click" });

                },
                error: function (err) {
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
                }
            });
        } catch (error) {
            alert(error);
        }
    }
    get_Deleted_Rack_Data= function(){
    
        debugger;
        try {
            $.ajax({
                type: 'POST',
                url: "/vser-server/get_Deleted_Rack_Data",
                crossDomain: true,
                beforeSend: function (xhr) {
                    $("#delete_rack_panel").show();
                    $("#get_rack_panel").hide();
                    $("#loader").addClass("is-active");
                    document.getElementById("loader").setAttribute("data-text", "Loading...");
                    xhr.setRequestHeader("authorization", localStorage.getItem("myidentity"));
                },
                success: function (result) {
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    console.log(result);
                    var data = result.data;
                    if ($.fn.dataTable.isDataTable('#Deleted_rack_table')) {
                        $('#Deleted_rack_table').DataTable().destroy();
                    }
                    var i = 0;
                    $('#Deleted_rack_table').DataTable({
                        "data": data,
                        // destroy: true,
                        "order": [0, 'desc'],
                        // "scrollX": true,
                        "aoColumns": [


                            // {

                            //     "data": "datacentername",
                            //     'render': function (data, type, row, meta) {
                            //      var a= data;
                            //       return '<span data-toggle="tooltip"  title="datacenter name">'+a+'</span>';

                            //     },
                            // },
                         
                            { "data": "datacentername" },
                            { "data": "floor" },
                            { "data": "room" },
                            { "data": "rackname" },
                            { "data": "s_racku_no" },
                            { "data": "s_rack_code" },
                            {
                                "render": function (data, type, row, meta) {
                                    debugger;
                                    var status = row.status.split("::")[0]
                                    return '<span>' + status + '</span>';

                                }

                            },
                            // {
                            //     "render": function (data, type, row, meta) {
                            //         debugger;
                            //         var statusname = row.status.split("::")[0]
                            //         var statuscolor = row.status.split("::")[1]
                            //         // return '<td><i class="fa fa-circle" aria-hidden="true" style="color:'+statuscolor+'"></i> '+statusname+'</td>';
                            //         return ' <span style="height: 20px;width: 100px;background-color: ' + statuscolor + ';border-radius:10px;color:white;padding:4px">' + statusname + '</span>';

                            //     }

                            // },
                            { "data": "s_rack_model" },

                        ]
                    });
                },
                complete: function (res) {
                    $("#loader").removeClass("is-active");
                    // $('[data-toggle="tooltip"]').tooltip({html: true, placement: "top",trigger: "hover"}); 
                    $('[data-toggle="popover"]').popover({ html: true, placement: "top", trigger: "click" });

                },
                error: function (err) {
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
                }
            });
        } catch (error) {
            alert(error);
        }   
    }
    get_Rack_Data_byid = function (id) {

        try {
            $.ajax({
                url: '/vser-server/get_Rack_Data_byid',
                type: 'POST',
                crossDomain: true,
                data: { n_rack_id: id },

                beforeSend: function () {
                    $("#content_form").show();
                    $("#racklisttbl").hide();
                    $("#saveRack").hide();
                    $("#updateRack").show();
                 

                },
                success: function (result) {
                    var data = result.data;
                    $("#n_rack_id").val(data.n_rack_id);
                    $("#n_datacenter_id").val(data.n_datacenter_id),
                        get_floor_loc(data.n_datacenter_id, data.n_door_id);
                    get_data_center_room(data.n_door_id, data.n_room_id);
                    $("#s_rack_name").val(data.s_rack_name);

                    $("#s_rack_code").val(data.s_rack_code);
                    $("#n_rack_status").val(data.n_rack_status);

                    $("#s_racku_no").val(data.s_racku_no);
                    $("#s_rack_model").val(data.s_rack_model);
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);

                },
                error: function (err) {
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
                }
            });

        } catch (error) {

        }
    };

    Delete_Rack_Data = function (id) {
        debugger;
        var Delete_rack = confirm("Do You Want To Delete This Record??")
        if (Delete_rack  == true) {
            try {
                $.ajax({
                    url: '/vser-server/Delete_Rack_Data',
                    type: 'POST',
                    crossDomain: true,
                    data: { n_rack_id: id },
                    success: function (result) {
                        getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                        get_Rack_Data();
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
        $('#reset').click();


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
                        data_center += '<option value="' + result.data[i].n_datacenter_id + '">' + result.data[i].s_datacenter_desc + '<b>(' + result.data[i].country + ',' + result.data[i].state + ')</b></option>';
                    }
                    $('#n_datacenter_id').html(data_center);


                }
            });

        } catch (error) {

        }
    };
    get_floor_loc = function (DC, door) {
        try {
            if (DC == undefined) {
                var data = { "n_datacenter_id": $("#n_datacenter_id").val() }
            }
            else {
                var data = { "n_datacenter_id": DC }
            }

            $.ajax({
                type: 'POST',
                url: '/vser-server/get_floor_loc',
                data: data,
                beforeSend: function () {


                },
                success: function (result) {

                    var statedrp = '';

                    statedrp += '<option label="--select floor-"></option>';
                    for (var i = 0; i < result.data.length; i++) {
                        statedrp += '<option value="' + result.data[i].n_door_id + '">' + result.data[i].s_floor_loc + '</option>';
                    }
                    $('#n_door_id').html(statedrp);

                    if (door != undefined) {
                        $('#n_datacenter_id').val(DC);
                        $('#n_door_id').val(door)
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
    get_status = function () {
        var s_status = 'rack'
        var data = {
            s_status: s_status
        }
        try {
            $.ajax({
                url: '/vser-server/get_status_Datatype',
                type: 'POST',
                crossDomain: true,
                data: data,
                success: function (result) {
                    // alert("k");
                    debugger;
                    var sts = '';
                    sts += '<option label="--select Status-- " ></option>';
                    for (var i = 0; i < result.data.length; i++) {
                        sts += '<option value="' + result.data[i].n_status_no + '">' + result.data[i].s_status_name + '</option>';
                    }
                    $('#n_rack_status').html(sts);
                }
            });

        } catch (error) {
            getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

        }
    };

    get_status();

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
    rackopenclose = function () {

        $("#content_form").show();
        $("#racklisttbl").hide();
    }
    rackopenclose_ = function () {

        $("#content_form").hide();
        $("#racklisttbl").show();
    }
    get_Rack_Data();
    get_data_center();
    // get_data_center_room();
});