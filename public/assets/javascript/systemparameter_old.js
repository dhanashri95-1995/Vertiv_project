function setItemId(){
  // alert("")
  debugger
  
  $("#n_system_param_id1").val($("#n_system_param_id1").val());
  $("#s_login_id").val(localStorage.getItem("email"));
  // $("#s_filename").val('');
  document.getElementById('img_iframe').onload();

  var date = new Date();
  var d_created_date = date.getTime();

  //document.querySelector("body").append('<div class="modal-backdrop fade show modal-stack" style="z-index: 1059;"></div>');



}


document.getElementById('img_iframe').onload = function() {
  try {
      // alert("hello");
      

      var data={
          s_created_by:localStorage.getItem("email"),
          n_system_param_id:$("#n_system_param_id").val()
      };
        
      $.ajax({
        type: 'POST',
        url: '/vser-server/getImage_data',
        data: data,
        beforeSend: function(xhr) {
        /*   $('#resetForm').click();
          $('#saveForm').show();
          $('#uploadForm').hide(); */
          xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
        },
        success: function(results) 
        {
            var imghtml = '';
            console.log(results);
            var data1=results.data;

            if(data1.length>0){
              data1.forEach((element,i) => {
                if(element.hasOwnProperty('n_img_id')){
                  var id=element.n_img_id;
                  var key=1;
                }else{
                  var id=element.n_system_param_id;
                  var key=0;
                }
                // imghtml +='<div class="img-gal test"><div class="card"> <img class="img-thumbnail img-fluid img-size"  src="'+element.s_path+'" alt="'+element.s_og_name+'"> <a class="remImage" onclick="deleteImg('+id+','+key+')"><span class="imoon-close" style="width:20px;height:20px;"></span> </a></div></div>';

              imghtml +='<div class="img-gal test"><div class="card"> <img class="img-thumbnail img-fluid img-size"  src="'+element.s_path+' " alt="'+element.s_og_name+'"> <a class="remImage" onclick="deleteImg('+id+','+key+')"><img src="/assets/img/cross.svg" class="fas" style="width:20px;height:20px;position: relative;bottom: 126px;right: -7px;"> </a></div></div>';
            //  '+element.s_new_name+'
            });
          }
          // $("#imggal").html(imghtml);
           
          $("#imggal_main").html(imghtml);
        },
        error: function(error) {
          console.log(error);
        },
      });
    } catch (error) {
      //alert(error);
    }
    

  
}
function deleteImg(id,key)
{
  // alert(id);
  // alert(key);


  try {
  var data={
    id:id,
    key:key,
    s_created_by:localStorage.getItem("email"),

  };
  $.ajax({
      type: 'POST',
      url: '/vser-server/deleteImg',
      data: data,
      beforeSend: function(xhr) {
      /*   $('#resetForm').click();
        $('#saveForm').show();
        $('#uploadForm').hide(); */
        xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
      },
      success: function(results) 
      {
          var imghtml = '';
          //console.log(results);
          document.getElementById('img_iframe').onload();
      },
      error: function(error) {
        console.log(error);
      },
    });
  } catch (error) {
    alert(error);
  }
  

}

(function () {
  
  $("#update_system_Prameter").hide();
// alert("");

  getsystemParameterData();
  var tag = '';

    $("#save_system_Prameter").click(function (e) {
        e.preventDefault();  
        tag = "save"; 
        $("#form-systemParameter").submit();
    });

    $('#update_system_Prameter').click(function (event) {
      event.preventDefault();
      tag = 'UPDATE';
      $('#form-systemParameter').submit();
  });
    
    $("#form-systemParameter").on("submit", function (e) {
        try {   
          

          // alert("in function")

         if(tag=='save')
         {          
          //  alert("save")

           

          data={
            s_email_setting: $("#s_email_setting").val(),
            s_captha_setting: $("#s_captha_setting").val(),
            s_database_connection_setting: $("#s_database_connection_setting").val(),
            s_company_name: $("#s_company_name").val(),
            s_user_name:localStorage.getItem("email"),


        };
        var url = '/vser-server/insert_systemParameter';

         }
         else if(tag=='UPDATE')
         {
           

          // alert("update")

           

          data={
        
            n_system_param_id: $("#n_system_param_id").val(),
            s_email_setting: $("#s_email_setting").val(),
            s_captha_setting: $("#s_captha_setting").val(),
            s_database_connection_setting: $("#s_database_connection_setting").val(),
            s_company_name: $("#s_company_name").val(),
            s_user_name:localStorage.getItem("email"),
        };
        var url = '/vser-server/update_systemParameter';

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
                    
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    $(".close").click();
                    $(".reset").click();

                    $("#update_system_Prameter").hide();
                    $("#save_system_Prameter").show();
                    getsystemParameterData();

                    $("#s_type").val("");
                    $("#s_alert_msg_desc").val("");
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
    
    function getsystemParameterData() {
      try {
       // alert("getuserdata");

        
        var data = {
          loginuser: localStorage.getItem('emailid'),
        };
        $.ajax({
          type: 'POST',
          url: "/vser-server/getsystemParameterData",
          data: data,
          beforeSend: function(xhr) {
    
            // $('#name').val("");

            $("#s_email_setting").val("");  
            $("#s_captha_setting").val("");  
            $("#s_database_connection_setting").val("");  
            $("#s_company_name").val("");  
            $("#imggal").html("");
            $("#imggal_main").html("");




            xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
          },
          success: function(result) {
            
            console.log(result);
            var i = 0;
            if ($.fn.dataTable.isDataTable('#get_systemParameterData')) {
              $('#get_systemParameterData').DataTable().destroy();
            }
        
        
            var tdata=result.data
            $('#get_systemParameterData').DataTable({
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
                { 'data': 's_email_setting' },
                { 'data': 's_captha_setting' },
                { 'data': 's_database_connection_setting' },
                { 'data': 's_company_name' },
                {
                  "render": function (data, type, row, meta) 
                  {
                           return '  <button class=" glyphicon-pencil" data-toggle="modal" data-target="#cust-modal"  onclick="get_systemparameter_detail(' + row.n_system_param_id + ')"><i class="icofont icofont-edit"></i></button> <button type="button" class="glyphicon-trash" onclick="deletesystemParameter(' + row.n_system_param_id + ')" ><i class="icofont icofont-trash"></i></button>';
                  
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
    
    get_systemparameter_detail=function(id)
    {
      // alert(id);

        try{
            var data={
                // emailid: localStorage.getItem("email"), 
                n_system_param_id:id
            }; 
            $.ajax({ 
                url: '/vser-server/get_systemparameter_detail',
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
                  $("#save_system_Prameter").hide();

                  $("#update_system_Prameter").show();




                    // getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    $("#s_email_setting").val(result.data.s_email_setting);  
                    $("#s_captha_setting").val(result.data.s_captha_setting);  
                    $("#s_database_connection_setting").val(result.data.s_database_connection_setting);  
                    $("#s_company_name").val(result.data.s_company_name);  
                    $("#n_system_param_id").val(result.data.n_system_param_id);  
                    $("#n_system_param_id1").val(result.data.n_system_param_id);

                    // $("#n_alert_id").val(result.data.n_alert_id); 
                    document.getElementById('img_iframe').onload();

                     

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




    deletesystemParameter=function(id)
    {
      // alert(id);

        try{
            var data={
                // emailid: localStorage.getItem("email"), 
                n_system_param_id
                 :id
            }; 
            $.ajax({ 
                url: '/vser-server/deletesystemParameter',
                type: 'POST',
                crossDomain: true,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                      $("#loader").addClass("is-active");
                     document.getElementById("loader").setAttribute("data-text", "Loading...");
                },
                success: function (result) {  
                  
               

                  getsystemParameterData();


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

