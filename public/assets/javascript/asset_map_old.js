$(document).ready(function () {
    

    get_Asset_Map_Data();
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
        
        try {
            if (tag == 'SAVE') {
                var date = new Date();
                var d_created_date = date.getTime();
                var data = {

                    n_u_id: $('#n_u_id').val(),

                    n_rake_id: $('#n_rake_id').val(),
                    n_asset_id: $('#n_asset_id').val(),
                    n_status_no: $('#n_status_no').val(),
                    d_assign_date: $('#d_assign_date').val(),
                    s_created_by: localStorage.getItem('email'),
                    d_created_date: d_created_date,

                };
                var url = '/vser-server/Save_Asset_Map_Data';
            } else if (tag == 'UPDATE') {
                
                var date = new Date();
                var d_modified_date = date.getTime();
                var data = {
                    n_u_id: $('#n_u_id').val(),

                    n_rake_id: $('#n_rake_id').val(),
                    n_asset_id: $('#n_asset_id').val(),
                    n_status_no: $('#n_status_no').val(),
                    d_assign_date: $('#d_assign_date').val(),
                    s_modified_by: localStorage.getItem('email'),
                    n_asset_mapping_id: $('#n_asset_mapping_id').val(),
                    d_modified_date: d_modified_date,
                };
                var url = '/vser-server/update_Asset_Map_Data';
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
                    //  $("#loader").removeClass("is-active");
                }
            });
        } catch (error) {
            alert(error);
        }
    });
    // get_Rack_Data();

    function get_Asset_Map_Data() {
        try {
            

            $.ajax({
                type: 'POST',
                url: "/vser-server/get_Asset_Map_Data",
                crossDomain: true,
                beforeSend: function (xhr) {
                    //$("#reset").click();
                    // xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
                },
                success: function (result) {

                    console.log(result);
                    var data = result.data;
                    // getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    // setTimeout(() => 2000);


                    if ($.fn.dataTable.isDataTable('#asset_map_table')) {
                        $('#asset_map_table').DataTable().destroy();
                    }
                    var i = 0;
                    $('#asset_map_table').DataTable({
                        "data": data,

                        "order": [0, 'desc'],
                        "scrollX": true,
                        "aoColumns": [

                            { "data": "tag" },
                            { "data": "rakename" },
                            { "data": "asset" },
                            { "data": "status" },
                            // { "data": "d_assign_date" },
                            {
                                "data": "d_assign_date",
                                render: function (data, type, row) {
                                    var date = data.split('T')[0];

                                    return '<span>' + date + '</span>';

                                }
                            },

                            {
                                'render': function (data, type, row, meta) {
                                    return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"  data-target="#asset_map_model"   onclick="get_Asset_Map_Data_byid(' + row.n_asset_mapping_id + ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="Delete_Asset_Map_Data(' + row.n_asset_mapping_id + ')"  style="margin-left:8px"><span class="glyphicon glyphicon-trash"></span></button>';
                                }

                            },

                        ]
                    });
                },
                error: function (error) {
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

                }
            });

        } catch (error) {
            alert(error);
        }
    }

    get_Asset_Map_Data_byid = function (id) {
        

        try {



            $.ajax({
                url: '/vser-server/get_Asset_Map_Data_byid',
                type: 'POST',
                crossDomain: true,
                data: { n_asset_mapping_id: id },
                beforeSend: function (xhr) {
                    //  BrandDiv();

                    $('#reset').click();
                    $("#save_asset_map").hide();
                    $("#update_asset_map").show();
                    get_Rake_name();
                    get_n_u_id();
                },
                success: function (result) {
                   

                    // localStorage.setItem("myidentity", `auth2 ${result.token}`);

                    var data = result.data;
                    var d_assign_date = data.d_assign_date.split('T')[0];



                    $("#n_asset_mapping_id").val(data.n_asset_mapping_id);
                    $("#n_u_id").val(data.n_u_id);
                    $("#n_rake_id").val(data.n_rake_id);
                    get_n_u_id(data.n_rake_id,data.n_u_id);
                    $("#n_asset_id").val(data.n_asset_id),
                        $("#n_status_no").val(data.n_status_no),
                        $("#d_assign_date").val(d_assign_date),


                        getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    setTimeout(() => 2000);
                }
            });

        } catch (error) {
            getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

        }
    };

    Delete_Asset_Map_Data = function (id) {
        
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
    };
    refresh = function () {

        $("#n_u_id").val("");
        $("#n_rake_id").val("");

        $("#n_asset_id").val(""),
            $("#n_status_no").val(""),
            $("#d_assign_date").val(""),


            $('#save_asset_map').show();
        $('#update_asset_map').hide();

    }
    // get_Rake_name();
    get_n_u_id= function (rake,u_tag) {
        try {
            
            // alert("state");
            if (rake == undefined) {
                var data = { "n_rake_id": $("#n_rake_id").val() }
            }
            else {
                var data = { "n_rake_id":rake }
            }

            $.ajax({
                type: 'POST',
                url: '/vser-server/get_n_u_id',
                data: data,
                beforeSend: function () {


                },
                success: function (result) {

                    var statedrp = '';

                    statedrp += '<option label="--select tag-" ></option>';
                    for (var i = 0; i < result.data.length; i++) {
                        statedrp += '<option value="' + result.data[i].n_u_id + '">' + result.data[i].s_tag_id + '</option>';
                    }
                    $('#n_u_id').html(statedrp);

                    if (u_tag != undefined) {
                        $('#n_rake_id').val(rake);
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
    get_Rake_name = function () {

        
        try {


            $.ajax({
                url: '/vser-server/get_Rake_Data',
                type: 'POST',
                crossDomain: true,
                // data: data,
                success: function (result) {
                    debugger
                    var rake = '';
                    rake += '<option label="--select Rake Name-- " disabled></option>';
                    for (var i = 0; i < result.data.length; i++) {
                        rake += '<option value="' + result.data[i].n_rake_id + '">' + result.data[i].s_rake_name + '</option>';
                    }
                    $('#n_rake_id').html(rake);


                }
            });

        } catch (error) {
            getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

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
    get_status = function () {

        
        try {
            var s_status='asset-mapping'
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
    
    get_Rake_name();
    get_status();
    get_asset_desc();

});

