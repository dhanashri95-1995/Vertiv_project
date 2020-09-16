$(document).ready(function () {

    get_RackU_Data();
    $("#updateRackU").hide();

    var tag = '';
    $('#saveRackU').click(function (event) {
        event.preventDefault();
        tag = 'SAVE';
        $('#rackU_form').submit();
    });

    $('#updateRackU').click(function (event) {
        event.preventDefault();
        tag = 'UPDATE';
        $('#rackU_form').submit();
    });

    $('#reset').click(function (event) {
        $('#saveRackU').show();
        $('#updateRackU').hide();
    });

    // onSubmit starts from here...
    $('#rackU_form').on('submit', function (event) {
        
        try {
            if (tag == 'SAVE') {
                var date = new Date();
                var d_created_date = date.getTime();
                var data = {

                    s_tag_id: $('#s_tag_id').val(),

                    n_rake_id: $('#n_rake_id').val(),
                    n_status: $('#n_status').val(),
                    s_created_by: localStorage.getItem('email'),
                    d_created_date:d_created_date,

                };
                var url = '/vser-server/Save_RackU_Data';
            } else if (tag == 'UPDATE') {
                
                var date = new Date();
                var d_modified_date = date.getTime();
                var data = {
                    s_tag_id: $('#s_tag_id').val(),
                    n_status: $('#n_status').val(),
                    n_rake_id: $('#n_rake_id').val(),

                    s_modified_by: localStorage.getItem('email'),
                    d_modified_date:d_modified_date,
                    n_u_id: $('#n_u_id').val(),
                };
                var url = '/vser-server/update_RackU_Data';
            } else {
                return alert('Something Wrong !!!!');
            }
            
            $.ajax({
                type: 'POST',
                url: url,
                crossDomain: true,
                data: data,
                beforeSend: function () {
                    // $('reset').click();
                },
                success: function (result) {
                    $('#reset').click();
                    $("#close").click();

                    localStorage.setItem("myidentity", `auth2 ${result.token}`);
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    setTimeout(() => 2000);

                    get_RackU_Data();
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

    function get_RackU_Data() {
        try {
            

            $.ajax({
                type: 'POST',
                url: "/vser-server/get_RackU_Data",
                crossDomain: true,
                beforeSend: function () {
                   
                },
                success: function (result) {

                    console.log(result);
                    var data = result.data;
                    // getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    // setTimeout(() => 2000);


                    if ($.fn.dataTable.isDataTable('#rackU_table')) {
                        $('#rackU_table').DataTable().destroy();
                    }
                    var i = 0;
                    $('#rackU_table').DataTable({
                        "data": data,

                        "order": [0, 'desc'],
                        "scrollX": true,
                        "aoColumns": [
                            { "data": "s_tag_id" },
                            { "data": "status" },
                            { "data": "rakename" },
                         
                            {
                                'render': function (data, type, row, meta) {
                                    return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"  data-target="#rackU_model"   onclick="get_RackU_Data_byid(' + row.n_u_id + ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="Delete_RackU_Data(' + row.n_u_id + ')" style="margin-left:8px"><span class="glyphicon glyphicon-trash"></span></button>';
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

    get_RackU_Data_byid = function (id) {
        debugger

        try {
          

            $.ajax({
                url: '/vser-server/get_RackU_Data_byid',
                type: 'POST',
                crossDomain: true,
                data: { n_u_id: id },
                beforeSend: function (xhr) {
                    $("#saveRackU").hide();
                    $("#updateRackU").show();
                },
                success: function (result) {
                    // get_Rake_name();

                    localStorage.setItem("myidentity", `auth2 ${result.token}`);

                    var data = result.data;


                    $("#n_u_id").val(data.n_u_id);
                    $("#s_tag_id").val(data.s_tag_id);
                    $("#n_status").val(data.n_status),
                    $("#n_rake_id").val(data.n_rake_id);

                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    setTimeout(() => 2000);
                }
            });

        } catch (error) {
            getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

        }
    };

    Delete_RackU_Data = function (id) {
        
        try {
            $.ajax({
                url: '/vser-server/Delete_RackU_Data',
                type: 'POST',
                crossDomain: true,
                data: { n_u_id: id },
                success: function (result) {
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    get_RackU_Data();
                },
                error: function (err) {
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

                }
            });
        } catch (err) {

        }
    };
    refresh = function () {
// alert("ffuye");
$('#reset').click();
        $("#s_tag_id").val("");
        $("#n_status").val("");
        $("#n_rake_id").val(""),
        $('#saveRackU').show();
        $('#updateRackU').hide();
        

    }
    // get_Rake_name();
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
    get_status = function () {

        
        try {


            var s_status='racku'
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
                    sts += '<option label="--select Status-- " disabled></option>';
                    for (var i = 0; i < result.data.length; i++) {
                        sts += '<option value="' + result.data[i].n_status_no + '">' + result.data[i].s_status_name + '</option>';
                    }
                    $('#n_status').html(sts);

                }
            });

        } catch (error) {
            getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

        }
    };
    get_status();
    get_Rake_name();
});

