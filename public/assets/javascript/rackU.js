
$(document).ready(function () {
    ;
     $("#updateRackU").hide();
     // var tag = '';
     // $('#saveRackU').click(function (event) {
     //     event.preventDefault();
     //     tag = 'SAVE';
     //     $('#rackU_form').submit();
     // });
 
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
         debugger;
         try {
             // if (tag == 'SAVE') {
             //     var date = new Date();
             //     var d_created_date = date.getTime();
             //     var data = {
 
             //         s_racku_no: $('#s_racku_no').val(),
             //         n_rake_id: $('#n_rake_id').val(),
             //         n_status: $('#n_status').val(),
             //         s_created_by: localStorage.getItem('email'),
             //         d_created_date:d_created_date,
 
             //     };
             //     var url = '/vser-server/Save_RackU_Data';
             // } else
              if (tag == 'UPDATE') {
                 debugger;
              
                 var data = {
                    //  s_racku_no: $('#s_racku_no').val(),
                    //  n_racku_status: $('#n_racku_status').val(),
                    //  n_rake_id: $('#n_rake_id').val(),
                     n_racku_status: $('#n_racku_status').val(),
                     s_modified_by: localStorage.getItem('email'),      
                     n_u_id: $('#n_u_id').val(),
                 };
                 var url = '/vser-server/update_RackU_Data';
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
                     xhr.setRequestHeader ("authorization", localStorage.getItem("myidentity"));
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
                     get_RackU_Data();
                 }
             });
         } catch (error) {
             alert(error);
         }
     });
     // get_Rack_Data();
 
   get_RackU_Data =function() {
        
        try {
            debugger;

            $.ajax({
                type: 'POST',
                url: "/vser-server/get_RackU_Data",
                crossDomain: true,
                beforeSend: function (xhr) {
                    $("#delete_racku_panel").hide();
                    $("#get_racku_panel").show();
                    $("#loader").addClass("is-active");
                    document.getElementById("loader").setAttribute("data-text", "Loading...");
                    xhr.setRequestHeader ("authorization", localStorage.getItem("myidentity"));
                },
                success: function (result) {
                    console.log(result);
                    var data = result.data;
            
                    if ($.fn.dataTable.isDataTable('#rackU_table')) {
                        $('#rackU_table').DataTable().destroy();
                    }
                    debugger;
                    var i = 0;
                    $('#rackU_table').DataTable({
                        "data": data,
                        // "order": [0, 'desc'],
                        // "scrollX": true,
                        "aoColumns": [
                            {
                                'render': function (data, type, row, meta) {
        //                             var a = `<span class='mybtns'><button  type='button' class='btn btn-info  btn-sm' onclick='get_RackU_Data_byid(${row.n_u_id})'><span class='glyphicon glyphicon-pencil'></span></button>
        //           <button type='button' class='btn btn-info data-toggle="tooltip"  title="datacenter name" btn-sm' onclick='Delete_RackU_Data(${row.n_u_id},${row.n_rack_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button></span>`;
        // return '<span class="btn btn-info glyphicon glyphicon-cog settingbtn">'+a+'</span>';

                                 var a= `<span class='mybtns'><button type='button' class='btn active btn-info btn-sm' data-toggle='modal' data-target='#rack_model' onclick='get_RackU_Data_byid(${row.n_u_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm' onclick='Delete_RackU_Data(${row.n_u_id},${row.n_rack_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button></span>`;
                                  return '<span class="btn btn-info glyphicon glyphicon-cog settingbtn">'+a+'</span>';
                                 
                                },
                            },
                            // { "data": "s_racku_no" },
                            {
                              
                                render: function (data, type, row) {
                                   
                                        {
                                            var  Rackuno =row.s_racku_no
                                                 return '<span>RU-'+ Rackuno+'</span>';  
                                          }
                                        // return '<span>' +row.status+ '</span>';
                                    
                                }
                                
                            },
                            {
                              "data": "status",
                                render: function (data, type, row) {
                                    if(row.status==null){
                                        return '<span>--------</span>';
                                    }else
                                    {
                                        {
                                          var  status =row.status.split("::")[0]
                                               return '<span>'+status+'</span>';  
                                        }
                                        // return '<span>' +row.status+ '</span>';
                                    }
                                }
                                
                            },
                            { "data": "rackname" },
                         
                        

                        ]
                    });
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);

                },
                complete:function (res) {
                    $("#loader").removeClass("is-active");
                    
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
    get_Deleted_RackU_Data =function() {
        try {
            debugger;

            $.ajax({
                type: 'POST',
                url: "/vser-server/get_Deleted_RackU_Data",
                crossDomain: true,
                beforeSend: function (xhr) {
                    $("#delete_racku_panel").show();
                    $("#get_racku_panel").hide();
                    $("#loader").addClass("is-active");
                    document.getElementById("loader").setAttribute("data-text", "Loading...");
                    xhr.setRequestHeader ("authorization", localStorage.getItem("myidentity"));
                },
                success: function (result) {
                    console.log(result);
                    var data = result.data;
            
                    if ($.fn.dataTable.isDataTable('#Deleted_rackU_table')) {
                        $('#Deleted_rackU_table').DataTable().destroy();
                    }
                    debugger;
                    var i = 0;
                    $('#Deleted_rackU_table').DataTable({
                        "data": data,
                        "order": [0, 'desc'],
                        // "scrollX": true,
                        "aoColumns": [
                        
                            // { "data": RU-+"s_racku_no" },
                            {
                              
                                render: function (data, type, row) {
                                   
                                        {
                                            var  Rackuno =row.s_racku_no
                                                 return '<span>RU-'+ Rackuno+'</span>';  
                                          }
                                        // return '<span>' +row.status+ '</span>';
                                    
                                }
                                
                            },
                        
                            {
                              
                                render: function (data, type, row) {
                                    if(row.status==null){
                                        return '<span>--------</span>';
                                    }else
                                    {
                                        {
                                            var  status =row.status.split("::")[0]
                                                 return '<span>'+status+'</span>';  
                                          }
                                        // return '<span>' +row.status+ '</span>';
                                    }
                                }
                                
                            },
                            { "data": "rackname" },
                         
                        

                        ]
                    });
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);

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
     get_RackU_Data_byid = function (id) {
         debugger
 
         try {
             $.ajax({
                 url: '/vser-server/get_RackU_Data_byid',
                 type: 'POST',
                 crossDomain: true,
                 data: { n_u_id: id },
                 beforeSend: function (xhr) {
                     $("#content_form").show();
                     $("#rackulisttbl").hide();
                     $("#saveRackU").hide();
                     $("#updateRackU").show();
                 },
                 success: function (result) {
                     // get_Rake_name();
                     var data = result.data;
                     var racku='RU' + '-' + data.s_racku_no;
                     $("#n_u_id").val(data.n_u_id);
                    //  $("#s_racku_no").val(data.s_racku_no);
                    $("#s_racku_no").val(racku);
                     $("#n_racku_status").val(data.n_racku_status),
                     $("#n_rack_id").val(data.rackname);
 
                     getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                     setTimeout(() => 2000);
                 }
             });
 
         } catch (error) {
             getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
 
         }
     };
 
     Delete_RackU_Data = function (id,id1) {
         debugger;
         var Delete_rackU = confirm("Do You Want To Delete This Record??")
         if (Delete_rackU  == true) {
         try {
             $.ajax({
                 url: '/vser-server/Delete_RackU_Data',
                 type: 'POST',
                 crossDomain: true,
                 data: { n_u_id: id,n_rack_id:id1 },
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
         }
     };
     get_RackU_Data()
     refresh = function () {
         $('#reset').click();
     }
     get_status = function () {
         debugger;
         var s_status='racku'
         var data={
             s_status:s_status
         }
         try {
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
                     $('#n_racku_status').html(sts);
                 }
             });
 
         } catch (error) {
             getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
 
         }
     };
 get_status();
     // get_Rake_name();
     // get_Rake_name = function () {
 
     //     debugger;
     //     try {
     //         $.ajax({
     //             url: '/vser-server/get_Rake_Data',
     //             type: 'POST',
     //             crossDomain: true,
     //             // data: data,
     //             success: function (result) {
     //                 debugger
     //                 var rake = '';
     //                 rake += '<option label="--select Rake Name-- " disabled></option>';
     //                 for (var i = 0; i < result.data.length; i++) {
     //                     rake += '<option value="' + result.data[i].n_rake_id + '">' + result.data[i].s_rake_name + '</option>';
     //                 }
     //                 $('#n_rake_id').html(rake);
     //             }
     //         });
 
     //     } catch (error) {
     //         getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
 
     //     }
     // };
    
  
     // get_Rake_name();
    
       rackuopenclose_= function(){
        
         $("#content_form").hide();
         $("#rackulisttbl").show();
       }
 });