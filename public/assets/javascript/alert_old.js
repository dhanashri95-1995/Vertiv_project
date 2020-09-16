(function () {
  
  $("#btnupdate_alert").hide();
// alert("");

  get_alert_Data();
  var tag = '';

    $("#save_alert").click(function (e) {
        e.preventDefault();  
        tag = "save"; 
        $("#form-alert").submit();
    });

    $('#btnupdate_alert').click(function (event) {
      event.preventDefault();
      tag = 'UPDATE';
      $('#form-alert').submit();
  });
  $('#resetuser').click(function (event) {
    $('#save_alert').show();
    $('#btnupdate_alert').hide();
});

  
    $("#form-alert").on("submit", function (e) {
        try {   
          

          // alert("in function")

         if(tag=='save')
         {          
          //  alert("save")

           

          data={
            s_type: $("#s_type").val(),
            s_alert_msg_desc: $("#s_alert_msg_desc").val(),
            s_user_name:localStorage.getItem("email")
        };
        var url = '/vser-server/insert_alert';

         }
         else if(tag=='UPDATE')
         {
           

          // alert("update")

           

          data={
            s_type: $("#s_type").val(),
            n_alert_id: $("#n_alert_id").val(),

            s_alert_msg_desc: $("#s_alert_msg_desc").val(),
            s_user_name:localStorage.getItem("email")
        };
        var url = '/vser-server/update_alert';

         }
         else {
          return alert('Something Wrong !!!!');
      }
               

          
            $.ajax({
                url: url,
                type: 'POST',
                crossDomain: true,
                data: JSON.stringify(data),
                contentType: "application/json;charset=utf-8",
                beforeSend: function () {
                     $("#loader").addClass("is-active");
                     document.getElementById("loader").setAttribute("data-text", "Loading...");
                },
                success: function (result) {
                  $('#resetuser').click();
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                   
                    get_alert_Data();
                    $('#resetuser').click();
                   
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
    
    function get_alert_Data() {
      try {
       // alert("getuserdata");

        
        var data = {
          loginuser: localStorage.getItem('emailid'),
        };
        $.ajax({
          type: 'POST',
          url: "/vser-server/get_alert_Data",
          data: data,
          beforeSend: function(xhr) {
    
            $('#name').val("");
            xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
          },
          success: function(result) {
            
            console.log(result);
            var i = 0;
            if ($.fn.dataTable.isDataTable('#alert_data')) {
              $('#alert_data').DataTable().destroy();
            }
        
        
            var tdata=result.data
            $('#alert_data').DataTable({
              'data': tdata,
              // "scrollX":true,
              'aoColumns': [
               /*  {
                  'render': function() 
                  {
                    i++;
                    return i;
                  },
                }, */
                { 'data': 's_type' },
                { 'data': 's_alert_msg_desc' },
                {
                  
                    'render': function (data, type, row, meta) {
                        return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"  onclick="get_alert_detail(' + row.n_alert_id+ ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="deletealert_rec('+row.n_alert_id +')" style="margin-left:8px"><span class="glyphicon glyphicon-trash"></span></button>';
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
    };
    
    get_alert_detail=function(id)
    {
      // alert(id);

        try{
            var data={
                // emailid: localStorage.getItem("email"), 
                n_alert_id:id
            }; 
            $.ajax({ 
                url: '/vser-server/get_alert_detail',
                type: 'POST',
                crossDomain: true,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                      $("#loader").addClass("is-active");
                     document.getElementById("loader").setAttribute("data-text", "Loading...");
                },
                success: function (result) {  
                  
                  $(".open").click();
                  $("#save_alert").hide();

                  $("#btnupdate_alert").show();




                    // getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    $("#s_type").val(result.data.s_type);  
                    $("#s_alert_msg_desc").val(result.data.s_alert_msg_desc);  
                    $("#n_alert_id").val(result.data.n_alert_id);  
                     

                },
                error: function (err) {  
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
                },
                complete: function (response) {
                     $("#loader").removeClass("is-active");
                     tag = ""; 
                }
            });
        }catch(err){
            alert(err);
        }
    };




    deletealert_rec=function(id)
    {
      // alert(id);

        try{
            var data={
                // emailid: localStorage.getItem("email"), 
                n_alert_id:id
            }; 
            $.ajax({ 
                url: '/vser-server/deletealert_rec',
                type: 'POST',
                crossDomain: true,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                      $("#loader").addClass("is-active");
                     document.getElementById("loader").setAttribute("data-text", "Loading...");
                },
                success: function (result) {  
                  
               

                  get_alert_Data();


                     getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                  
                     

                },
                error: function (err) {  
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
                },
                complete: function (response) {
                     $("#loader").removeClass("is-active");
                     tag = ""; 
                }
            });
        }catch(err){
            alert(err);
        }
    };

})();

