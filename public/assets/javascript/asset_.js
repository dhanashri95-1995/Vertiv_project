$(document).ready(function () {
    // alert("k")
    get_Asset_Data();

    $("#updateAsset").hide();

    var tag = '';
    $('#saveAsset').click(function (event) {
        event.preventDefault();
        tag = 'SAVE';

        $('#asset_form').submit();
    });

    $('#updateAsset').click(function (event) {
        event.preventDefault();
        tag = 'UPDATE';
        $('#asset_form').submit();
    });

    $('#reset').click(function (event) {
        $('#saveAsset').show();
        $('#updateAsset').hide();
    });

    // onSubmit starts from here...
    $('#asset_form').on('submit', function (event) {

        try {
            if (tag == 'SAVE') {
                var date = new Date();
                var d_created_date = date.getTime();
                var data = {

                    s_asset_uid: $('#s_asset_uid').val(),
                    s_asset_name: $('#s_asset_name').val(),
                    s_u_size: $('#s_u_size').val(),
                    s_asset_brand: $('#s_asset_brand').val(),
                    s_asset_cateogry: $('#s_asset_cateogry').val(),
                    s_asset_model: $('#s_asset_model').val(),
                    s_asset_module_id: $('#s_asset_module_id').val(),
                    s_asset_u_loc: $('#s_asset_u_loc').val(),
                    s_asset_current: $('#s_asset_current').val(),
                    s_asset_rated_power: $('#s_asset_rated_power').val(),
                    s_asset_power: $('#s_asset_power').val(),
                    s_asset_weight: $('#s_asset_weight').val(),
                    s_asset_principal: $('#s_asset_principal').val(),
                    s_contact_way: $('#s_contact_way').val(),
                    d_first_time: $('#d_first_time').val(),
                    d_last_time: $('#d_last_time').val(),
                    s_purchase_price: $('#s_purchase_price').val(),
                    s_retirement_price: $('#s_retirement_price').val(),
                    d_last_repair_time: $('#d_last_repair_time').val(),
                    s_repair_cycle: $('#s_repair_cycle').val(),
                    s_repair_company: $('#s_repair_company').val(),
                    s_repair_principal: $('#s_repair_principal').val(),
                    s_repair_contact_way: $('#s_repair_contact_way').val(),
                    s_ip_address: $('#s_ip_address').val(),
                    s_note: $('#s_note').val(),
                    s_created_by: localStorage.getItem('email'),
                    d_created_date: d_created_date,

                };
                var url = '/vser-server/Save_Asset_Data';
            } else if (tag == 'UPDATE') {
                
                var date = new Date();
                var d_modified_date = date.getTime();
                var data = {

                    s_asset_uid: $('#s_asset_uid').val(),
                    s_asset_name: $('#s_asset_name').val(),
                    s_u_size: $('#s_u_size').val(),
                    s_asset_brand: $('#s_asset_brand').val(),
                    s_asset_cateogry: $('#s_asset_cateogry').val(),
                    s_asset_model: $('#s_asset_model').val(),
                    s_asset_module_id: $('#s_asset_module_id').val(),
                    s_asset_u_loc: $('#s_asset_u_loc').val(),
                    s_asset_current: $('#s_asset_current').val(),
                    s_asset_rated_power: $('#s_asset_rated_power').val(),
                    s_asset_power: $('#s_asset_power').val(),
                    s_asset_weight: $('#s_asset_weight').val(),
                    s_asset_principal: $('#s_asset_principal').val(),
                    s_contact_way: $('#s_contact_way').val(),
                    d_first_time: $('#d_first_time').val(),
                    d_last_time: $('#d_last_time').val(),
                    s_purchase_price: $('#s_purchase_price').val(),
                    s_retirement_price: $('#s_retirement_price').val(),
                    d_last_repair_time: $('#d_last_repair_time').val(),
                    s_repair_cycle: $('#s_repair_cycle').val(),
                    s_repair_company: $('#s_repair_company').val(),
                    s_repair_principal: $('#s_repair_principal').val(),
                    s_repair_contact_way: $('#s_repair_contact_way').val(),
                    s_ip_address: $('#s_ip_address').val(),
                    s_note: $('#s_note').val(),
                    s_modified_by: localStorage.getItem('email'),
                    d_modified_date: d_modified_date,
                    n_asset_id: $('#n_asset_id').val(),
                };
                var url = '/vser-server/update_Asset_Data';
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
                    $("#assett_form").hide();
                    $("#assetlist").show();
                    $("#close").click();

                    localStorage.setItem("myidentity", `auth2 ${result.token}`);
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    setTimeout(() => 2000);

                    get_Asset_Data();
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

    function get_Asset_Data() {

        try {
            $.ajax({
                type: 'POST',
                url: "/vser-server/get_Asset_Data",
                crossDomain: true,
                beforeSend: function () {

                },
                success: function (result) {

                    console.log(result);
                    var data = result.data;
                    // getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    // setTimeout(() => 2000);


                    if ($.fn.dataTable.isDataTable('#asset_table')) {
                        $('#asset_table').DataTable().destroy();
                    }
                    var i = 0;
                    $('#asset_table').DataTable({
                        "data": data,
                        // destroy: true,
                        "order": [0, 'desc'],
                        // "scrollX": true,
                        "aoColumns": [
                            
                            { "data": "s_asset_uid" },
                            { "data": "s_asset_name" },
                            { "data": "s_asset_brand" },
                            { "data": "s_asset_module_id" },
                            { "data": "s_purchase_price" },
                            { "data": "s_ip_address" }, 
                            {
                                'render': function (data, type, row, meta) {
                                 var a= `<button type='button' class='btn active btn-info btn-sm' data-toggle='modal' data-target='#asset_model' onclick='get_Asset_Data_byid(${row.n_asset_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm' onclick='Delete_Asset_Data(${row.n_asset_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
                                  return '<span class="btn btn-info glyphicon glyphicon-cog" data-toggle="popover"  data-content="'+a+'"></span>';
                                 
                                },   
                        

                            },

                        ]
                    });
                },
                complete:function (res) {
                    $("#loader").removeClass("is-active");
                    
                    $('[data-toggle="popover"]').popover({html: true, placement: "top",trigger: "click"});
          
                  },
                error: function (error) {
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

                }
            });

        } catch (error) {
            alert(error);
        }
    }

    get_Asset_Data_byid = function (id) {

        try {
            $("#saveAsset").hide();
            $("#updateAsset").show();

            $.ajax({
                url: '/vser-server/get_Asset_Data_byid',
                type: 'POST',
                crossDomain: true,
                data: { n_asset_id: id },
                success: function (result) {
                    debugger

                    $("#assett_form").show();
                    $("#assetlist").hide();
                    localStorage.setItem("myidentity", `auth2 ${result.token}`);

                    var data = result.data;
                    var d_first_time = data.d_first_time.split('T')[0];
                    var d_last_time = data.d_last_time.split('T')[0];



                    

                    
                    $("#n_asset_id").val(data.n_asset_id);
                   
    $('#s_asset_uid').val(data.s_asset_uid);
   $('#s_asset_name').val(data.s_asset_name);
    $('#s_u_size').val(data.s_u_size);
   $('#s_asset_brand').val(data.s_asset_brand);
    $('#s_asset_cateogry').val(data.s_asset_cateogry);
   $('#s_asset_model').val(data. s_asset_model);
    $('#s_asset_module_id').val(data.s_asset_module_id);
   $('#s_asset_u_loc').val(data. s_asset_u_loc);
    $('#s_asset_current').val(data.s_asset_current);
  $('#s_asset_rated_power').val(data.s_asset_rated_power);
  $('#s_asset_power').val(data.s_asset_power);
   $('#s_asset_weight').val(data.s_asset_weight);
   $('#s_asset_principal').val(data.s_asset_principal);
   $('#s_contact_way').val(data.s_contact_way);
    $('#d_first_time').val(d_first_time);
    $('#d_last_time').val(d_last_time);
    $('#s_purchase_price').val(data.s_purchase_price);
    $('#s_retirement_price').val(data.s_retirement_price);
    $('#d_last_repair_time').val(data.d_last_repair_time);
    $('#s_repair_cycle').val(data.s_repair_cycle);
    $('#s_repair_company').val(data.s_repair_company);
    $('#s_repair_principal').val(data.s_repair_principal);
    $('#s_repair_contact_way').val(data.s_repair_contact_way);
    $('#s_ip_address').val(data.s_ip_address);
    $('#s_note').val(data.s_note);
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    setTimeout(() => 2000);
                }
            });

        } catch (error) {
            getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

        }
    };

    Delete_Asset_Data = function (id) {
        try {
            $.ajax({
                url: '/vser-server/Delete_Asset_Data',
                type: 'POST',
                crossDomain: true,
                data: { n_asset_id: id },
                success: function (result) {
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    get_Asset_Data();
                },
                error: function (err) {
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

                }
            });
        } catch (err) {

        }
    };
    refresh = function () {
        $("#s_asset_name").val("");
        $("#s_asset_desc").val("");
        $("#s_manufacturer").val(""),
            $("#s_warranty_expiry_date").val("");
        $("#s_warranty_date").val("");
        $("#s_status").val("");
        $("#s_asset_qr_code").val("");
        $('#saveAsset').show();
        $('#updateAsset').hide();
        $('#reset').click();

    }

    get_status = function (stats) {

        
        try {


            var s_status = 'asset'
            var data = {
                s_status: s_status
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
                    $('#s_status').html(sts);
                    if (stats != undefined) {
                        $('#s_status').html(stats);
                    }
                }
            });

        } catch (error) {
            getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

        }
    };
    get_status();
    $("#assett_form").hide();
    divopennclose = function () {
        refresh();
        $("#s_status").val("");
        
        $("#assett_form").show();
        $("#assetlist").hide();
    }


    divopennclose_ = function () {
        
        // refresh();
        $("#assett_form").hide();
        $("#assetlist").show();
    }

});


