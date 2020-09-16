(function () {
  
  $("#btnupdate_custom").hide();

  get_field_Data();
  var tag = '';

    $("#save_custom").click(function (e) {
        e.preventDefault();  
        tag = "save"; 
        $("#form-custom ").submit();
    });

    $('#btnupdate_custom').click(function (event) {
      event.preventDefault();
      tag = 'UPDATE';
      $('#form-custom ').submit();
  });
    
    $("#form-custom ").on("submit", function (e) {
        try {   
          

          // alert("in function")

         if(tag=='save')
         {          
          //  alert("save")
          

           

          data={
            s_tbl_name: $("#s_tbl_name").val(),
            s_field_nam: $("#s_field_nam").val(),
            s_field_type: $("#s_field_type").val(),
            // s_field_nam: $("#s_field_nam").val(),


            s_user_name:localStorage.getItem("email")
        };
        var url = '/vser-server/Add_field';

         }
         else if(tag=='UPDATE')
         {
           

          // alert("update")

           

          data={
            s_tbl_name: $("#s_tbl_name").val(),
            s_field_nam: $("#s_field_nam").val(),
            s_field_type: $("#s_field_type").val(),

             n_customfield_id: $("#n_customfield_id").val(),
            s_user_name:localStorage.getItem("email")
        };
        var url = '/vser-server/update_field';

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
                    
                    $("#resetuser").click();
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    
                    get_field_Data();

                 
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
    
    function get_field_Data() {
      try {
        // alert("getuserdata");

        
        var data = {
          loginuser: localStorage.getItem('emailid'),
        };
        $.ajax({
          type: 'POST',
          url: "/vser-server/get_field_Data",
          data: data,
          beforeSend: function(xhr) {
    
            // $('#name').val("");
            $("#s_tbl_name").val(""),
            $("#s_field_nam").val(""),
             $("#s_field_type").val(""),
             $("#save_custom").show();

             $("#btnupdate_custom").hide();
            
            xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
          },
          success: function(result) {
            
            console.log(result);
            var i = 0;
            if ($.fn.dataTable.isDataTable('#field_data')) {
              $('#field_data').DataTable().destroy();
            }
        
        
            var tdata=result.data
            $('#field_data').DataTable({
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
                { 'data': 's_tbl_name' },
                { 'data': 's_field_nam' },
                { 'data': 's_field_type' },

                {
                  
                  
                    'render': function (data, type, row, meta) {
                        return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"  onclick="get_field_detail(' + row.n_customfield_id+ ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="deletefield_rec('+row.n_customfield_id +')" style="margin-left:8px"><span class="glyphicon glyphicon-trash"></span></button>';
                    } 
                 
              },

              
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
    
    get_field_detail=function(id)
    {
      // alert(id);

        try{
            var data={
                // emailid: localStorage.getItem("email"), 
                n_customfield_id:id
            }; 
            $.ajax({ 
                url: '/vser-server/get_field_detail',
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
                  $("#save_custom").hide();

                  $("#btnupdate_custom").show();




                    // getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    $("#s_tbl_name").val(result.data.s_tbl_name);  
                    $("#s_field_nam").val(result.data.s_field_nam);  
                    $("#s_field_type").val(result.data.s_field_type);  
                    $("#n_customfield_id").val(result.data.n_customfield_id);  


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


    deletefield_rec=function(id)
    {
      // alert(id);

        try{
            var data={
                // emailid: localStorage.getItem("email"), 
                // n_alert_id:id
                n_customfield_id:id
            }; 
            $.ajax({ 
                url: '/vser-server/deletefield_rec',
                type: 'POST',
                crossDomain: true,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                      $("#loader").addClass("is-active");
                     document.getElementById("loader").setAttribute("data-text", "Loading...");
                },
                success: function (result) {  
                  
               

                  get_field_Data();


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

