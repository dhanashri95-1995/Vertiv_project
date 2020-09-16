$(document).ready(function () {
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
        debugger;
        try {
            if (tag == 'SAVE') {
                var data = { 
                   s_asset_name: $('#s_asset_name').val(),
                    n_asset_no: $('#n_asset_no').val(),
                    s_manufacturer_name: $('#s_manufacturer_name').val(),
                    s_make: $('#s_make').val(),
                    n_model_no: $('#n_model_no').val(),
                    s_device_category: $('#s_device_category').val(),
                    n_serial_number: $('#n_serial_number').val(),
                    n_barcode_number: $('#n_barcode_number').val(),
                    s_owner_name: $('#s_owner_name').val(),
                    s_owner_email: $('#s_owner_email').val(),
                    n_u_size: $('#n_u_size').val(),
                    n_u_position: $('#n_u_position').val(),
                    d_install_date: $('#d_install_date').val(),
                    n_u_height: $('#n_u_height').val(),
                    s_supplier: $('#s_supplier').val(),
                    s_rated_power: $('#s_rated_power').val(),
                    s_rated_current: $('#s_rated_current').val(),
                    n_rated_voltage: $('#n_rated_voltage').val(),
                    s_maintenance_cycle: $('#s_maintenance_cycle').val(),
                    s_contact_person: $('#s_contact_person').val(),
                    n_contact_number: $('#n_contact_number').val(),
                    d_next_maintenance: $('#d_next_maintenance').val(),
                    s_customized_notes: $('#s_customized_notes').val(),
                    s_created_by: localStorage.getItem('email'),

                };
                var url = '/vser-server/Save_Asset_Data';
            } else if (tag == 'UPDATE') {
                debugger;
                var data = {
                    s_asset_name: $('#s_asset_name').val(),
                    n_asset_no: $('#n_asset_no').val(),
                    s_manufacturer_name: $('#s_manufacturer_name').val(),
                    s_make: $('#s_make').val(),
                    n_model_no: $('#n_model_no').val(),
                    s_device_category: $('#s_device_category').val(),
                    n_serial_number: $('#n_serial_number').val(),
                    n_barcode_number: $('#n_barcode_number').val(),
                    s_owner_name: $('#s_owner_name').val(),
                    s_owner_email: $('#s_owner_email').val(),
                    n_u_size: $('#n_u_size').val(),
                    n_u_position: $('#n_u_position').val(),
                    d_install_date: $('#d_install_date').val(),
                    n_u_height: $('#n_u_height').val(),
                    s_supplier: $('#s_supplier').val(),
                    s_rated_power: $('#s_rated_power').val(),
                    s_rated_current: $('#s_rated_current').val(),
                    n_rated_voltage: $('#n_rated_voltage').val(),
                    s_maintenance_cycle: $('#s_maintenance_cycle').val(),
                    s_contact_person: $('#s_contact_person').val(),
                    n_contact_number: $('#n_contact_number').val(),
                    d_next_maintenance: $('#d_next_maintenance').val(),
                    s_customized_notes: $('#s_customized_notes').val(),
                    s_modified_by: localStorage.getItem('email'),
                    n_asset_id: $('#n_asset_id').val(),
                };
                var url = '/vser-server/update_Asset_Data';
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
                    $("#assett_form").hide();
                    $("#assetlist").show();
                    $("#close").click();

                    localStorage.setItem("myidentity", `auth2 ${result.token}`);
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    setTimeout(() => 2000);

                    // get_Asset_Data();
                },
                error: function (err) {
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
                },
                complete: function (response) {
                    $("#loader").removeClass("is-active");
                    get_Asset_Data();
                }
            });
        } catch (error) {
            alert(error);
        }
    });

    get_Asset_Data = function () {
debugger;
        try {
            $.ajax({
                type: 'POST',
                url: "/vser-server/get_Asset_Data",
                crossDomain: true,
                beforeSend: function (xhr) {
                    $("#get_asset_panel").show();
                    $("#deleted_asset_panel").hide();
                    $("#loader").addClass("is-active");
                    document.getElementById("loader").setAttribute("data-text", "Loading...");
                    xhr.setRequestHeader("authorization", localStorage.getItem("myidentity"));
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
                            {
                                'render': function (data, type, row, meta) {
                                    var a = `<span class='mybtns'><button type='button' class='btn active btn-info btn-sm' data-toggle='modal' data-target='#asset_model' onclick='get_Asset_Data_byid(${row.n_asset_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm' onclick='Delete_Asset_Data(${row.n_asset_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button></span>`;
                                    return '<span class="btn btn-info glyphicon glyphicon-cog settingbtn">'+a+'</span>';

                                },


                            },
                            { "data": "s_asset_name" },
                            { "data": "n_asset_no" },
                            { "data": "s_manufacturer_name" },
                            { "data": "n_model_no" },
                            { "data": "s_device_category" },



                        ]
                    });
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);

                },
                complete: function (res) {
                    $("#loader").removeClass("is-active");

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
    get_Deleted_Asset_Data= function () {
        debugger;
                try {
                    $.ajax({
                        type: 'POST',
                        url: "/vser-server/get_Deleted_Asset_Data",
                        crossDomain: true,
                        beforeSend: function (xhr) {
                            $("#get_asset_panel").hide();
                            $("#deleted_asset_panel").show();
                            document.getElementById("loader").setAttribute("data-text", "Loading...");
                            xhr.setRequestHeader("authorization", localStorage.getItem("myidentity"));
                        },
                        success: function (result) {
                            console.log(result);
                            var data = result.data;
                            if ($.fn.dataTable.isDataTable('#deleted_asset_table')) {
                                $('#deleted_asset_table').DataTable().destroy();
                            }
                            var i = 0;
                            $('#deleted_asset_table').DataTable({
                                "data": data,
                                // destroy: true,
                                "order": [0, 'desc'],
                                // "scrollX": true,
                                "aoColumns": [
                                    { "data": "s_asset_name" },
                                    { "data": "n_asset_no" },
                                    { "data": "s_manufacturer_name" },
                                    { "data": "n_model_no" },
                                    { "data": "s_device_category" },
        
                                ]
                            });
                            getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
        
                        },
                        complete: function (res) {
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
    get_Asset_Data_byid = function (id) {
        debugger;
        try {
            $("#saveAsset").hide();
            $("#updateAsset").show();
            $.ajax({
                url: '/vser-server/get_Asset_Data_byid',
                type: 'POST',
                crossDomain: true,
                data: { n_asset_id: id },
                beforeSend: function () {
                    $("#assett_form").show();
                    $("#assetlist").hide();;
                },
                success: function (result) {
                    var data = result.data;
                    var d_install_date = data.d_install_date.split('T')[0];
                    var d_next_maintenance = data.d_next_maintenance.split('T')[0];
                    debugger;
                    $("#n_asset_id").val(data.n_asset_id);
                        $('#s_asset_name').val(data.s_asset_name),
                        $('#n_asset_no').val(data.n_asset_no),
                        $('#s_manufacturer_name').val(data.s_manufacturer_name),
                        $('#s_make').val(data.s_make),
                        $('#n_model_no').val(data.n_model_no),
                        $('#s_device_category').val(data.s_device_category),
                        $('#n_serial_number').val(data.n_serial_number),
                        $('#n_barcode_number').val(data.n_barcode_number),
                        $('#s_owner_name').val(data.s_owner_name),
                        $('#s_owner_email').val(data.s_owner_email),
                        $('#n_u_size').val(data.n_u_size),
                        $('#n_u_position').val(data.n_u_position),
                        $('#d_install_date').val(d_install_date),
                        $('#n_u_height').val(data.n_u_height),
                        $('#s_supplier').val(data.s_supplier),
                        $('#s_rated_power').val(data.s_rated_power),
                        $('#s_rated_current').val(data.s_rated_current),
                        $('#n_rated_voltage').val(data.n_rated_voltage),
                        $('#s_maintenance_cycle').val(data.s_maintenance_cycle),
                        $('#s_contact_person').val(data.s_contact_person),
                        $('#n_contact_number').val(data.n_contact_number),
                        $('#d_next_maintenance').val(d_next_maintenance),
                        $('#s_customized_notes').val(data.s_customized_notes),
                        getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    setTimeout(() => 2000);
                }
            });

        } catch (err) {
            getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

        }
    };

    Delete_Asset_Data = function (id) {
        var Delete_asset = confirm("Do You Want To Delete This Record??")
        if (Delete_asset  == true) {
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
        }
    };
    $("#assett_form").hide();
    divopennclose = function () {
        // refresh();
        debugger;
        $("#assett_form").show();
        $("#assetlist").hide();
    }
    divopennclose_ = function () {
        debugger;
        // refresh();
        $("#assett_form").hide();
        $("#assetlist").show();
        get_Asset_Data();
        $("#notfoundtable").hide();
    }
    // **************import file**************

    getcreatedby = function () {
        $('#resetmodal').click();
        $("#asset-file").val("");

        $("#s_created_by").val(localStorage.getItem("email"));
    }
    $("#btnuploadfile").click(function (e) {
        e.preventDefault();
        tag = "";
        $("#my-file").submit();
    });

    $("#my-file").on("submit", function (e) {
        try {
            getCall_active()
        } catch (error) {
            alert(error);
        }
    });

    getCall_active = function () {
        try {
            $("#loader").addClass("is-active");
            document.getElementById("loader").setAttribute("data-text", "Loading...");
        } catch (error) {
            alert(error);
        }
    };

    getCall_deactive = function () {
        debugger;
        try {
            $("#loader").removeClass("is-active");
            var ifram = $("#output_frame1").contents().find("pre").html();
            if (!ifram) {
                return;
            }
            var jsonData = this.JSON.parse(ifram);
            debugger;

            if (jsonData.status == 500) {
                var data = jsonData.data;
                var table = "";

                table += '<div id=notfoundData"><table class="table table-striped table-bordered datatab" style="border: 1px solid black; border-collapse: collapse;" id="notfound">';
                table += '<thead ><tr role="row"><th style="border: 1px solid black; border-collapse: collapse;">Row No.</th><th style="border: 1px solid black; border-collapse: collapse;">DataCenter</th><th style="border: 1px solid black; border-collapse: collapse;">Floor</th><th style="border: 1px solid black; border-collapse: collapse;">Room</th><th style="border: 1px solid black; border-collapse: collapse;">Rake</th><th style="border: 1px solid black; border-collapse: collapse;">Racku</th></tr><thead>';
                for (i = 0; i < data.length; i++) {
                    table += '<tbody><tr><td style="border: 1px solid black; border-collapse: collapse;">' + data[i].row + '</td><td style="border: 1px solid black; border-collapse: collapse;">' + data[i].DataCenter + '</td><td style="border: 1px solid black; border-collapse: collapse;">' + data[i].Floor + '</td><td style="border: 1px solid black; border-collapse: collapse;">' + data[i].Room + '</td><td style="border: 1px solid black; border-collapse: collapse;">' + data[i].RakeName + '</td><td style="border: 1px solid black; border-collapse: collapse;">' + data[i].RackU + '</td></tr></tbody>';

                }
                table += '</table><br><b>Above rows are not imported.Please Correct the data and import again the above rows.</b><br><button type="reset" id="reset" class="btn active btn-warning btn-sm"onclick="divopennclose_()">Back</button></div>';
                document.getElementById("notfoundtable").innerHTML = table;
                $("#assetlist").hide();
                $("#modalclose").click();
                $("#asset-file").val("");
                $("#notfoundData").show();
                sataus = 'notfound';

                getnotify('danger', undefined, 1, 'stack_top_right', jsonData.mess, jsonData.mess_body);
            } else {
                get_Asset_Data();
                $("#assetlist").show();
                $("#notfoundData").hide();
                $("#modalclose").click();
                $("#asset-file").val("");
                sataus = 'success';
                getnotify('success', undefined, 1, 'stack_top_right', "imported SuccessFully", "imported SuccessFully");
            }


        } catch (err) {
            alert(err);
        }
    };
      // **************Export file**************
    $("#btnExport").click(function (e) {
        e.preventDefault();
        tag = "";
        $("#Exportfile").submit();
    });

    $("#Exportfile").on("submit", function (e) {
        try {
            getCall_active()
        } catch (error) {
            alert(error);
        }
    });
    getCall_active1 = function () {
        try {
            $("#loader").addClass("is-active");
            document.getElementById("loader").setAttribute("data-text", "Loading...");
        } catch (error) {
            alert(error);
        }
    };

    getCall_deactive2 = function () {
        debugger;
        try {
            $("#loader").removeClass("is-active");
            $("#Exportclose").click();
            getnotify('success', undefined, 1, 'stack_top_right', "Exported SuccessFully", "Exported SuccessFully");

        } catch (err) {
            alert(err);
        }
    };
 
    get_Asset_Data();
    get_data_center();
});
// download_csv = function () {
//     try {
//         $.ajax({
//             type: 'POST',
//             url: "/vser-server/get_Asset_Data",
//             crossDomain: true,

//             success: function (result) {
//                 console.log(result);
//                 var data = result.data;
//                 var csvdata = [];
//                 data.forEach(function (row) {
//                     var InstallDate = row.d_install_date.split('T')[0];
//                     var MaintenanceDate = row.d_next_maintenance.split('T')[0];
//                     csvdata.push([row.datacentername, row.floor, row.room, row.s_column, row.rakename, row.tag, row.s_asset_name, row.n_asset_no, row.s_manufacturer_name, row.s_make, row.n_model_no, row.s_device_category, row.n_serial_number, row.n_barcode_number, row.s_owner_name, row.s_owner_email, row.n_u_size, row.n_u_position, InstallDate, row.n_u_height, row.s_supplier, row.s_rated_power, row.s_rated_current, row.n_rated_voltage, row.s_maintenance_cycle, row.s_contact_person, row.n_contact_number, MaintenanceDate, row.s_customized_notes]);
//                     console.log(csvdata)

//                 });
//                 var csv = 'DataCenter,Floor,Room,Column,RakeName,RackU,AssetName,AssetNo,Manufacturer,Make,ModelNo,DeviceCategory,SerialNo,BarcodeNo,OwnerName,OwnerEmail,Usize,UPosition,InstallDate,UHeight,Supplier,RatedPower,RatedCurrent,RatedVoltage,MaintenanceCycle,ContactPerson,ContactNo,nextMaintenance,CustomizedNotes\n';
//                 csvdata.forEach(function (row) {
//                     csv += row.join(',');
//                     csv += "\n";
//                 });

//                 console.log(csv);
//                 var hiddenElement = document.createElement('a');
//                 hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
//                 hiddenElement.target = '_blank';
//                 hiddenElement.download = 'Asset Data.csv';
//                 hiddenElement.click();



//             },
//             error: function (error) {
//                 getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);

//             },
//             complete: function (res) {

//                 getnotify('success', undefined, 1, 'stack_top_right', " Exported SuccessFully", " Exported SuccessFully");


//             }

//         });
//     } catch (error) {
//         alert(error);
//     }
// };