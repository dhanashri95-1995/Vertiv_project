

(function () {



  
  $('#savestate').click(function (event) {
    get_state_Data();
    $("#panel1").hide();
    $("#panel").show();
  
  });

  var url_params = getAllUrlParams(window.location)
  // window.location
  
  console.log(url_params)
  var idd=url_params;
  var idofurl=idd["id"]

  $("#updatestate").hide();

  var tag = '';
  $('#savestate').click(function (event) {
      event.preventDefault();
      tag = 'SAVE';
      $('#state_form').submit();
  });

  $('#updatestate').click(function (event) {
      event.preventDefault();
      tag = 'UPDATE';
      $('#state_form').submit();
  });

  $('#reset').click(function (event) {
      $('#savestate').show();
      $('#updatestate').hide();
  });

  // onSubmit starts from here...
  $('#state_form').on('submit', function (event) {
      
      try {
          if (tag == 'SAVE') {

var date = new Date();
d_created_date = date.getTime();
              var data = {

                 
                  s_state_name:$("#s_state_name").val(),
                  n_country_id:$("#n_country_id").val(),
                  d_created_date:d_created_date,
                  s_created_by: localStorage.getItem('email'),

              };
              var url = '/vser-server/check_state_record';
          } else if (tag == 'UPDATE') {
              
              var date = new Date();
          var d_modified_date = date.getTime();
         

              var data = {
                  s_state_name:$("#s_state_name").val(),
                  d_modified_date:d_modified_date,
                  n_country_id:$("#n_country_id").val(),
                  s_modified_by: localStorage.getItem('email'),
                  n_state_id: $('#n_state_id').val(),
              };
              var url = '/vser-server/update_state_Data';
          } else {
              return alert('Something Wrong !!!!');
          }
          
          $.ajax({
              type: 'POST',
              url: url,
              crossDomain: true,
              data: data,
              beforeSend: function () {
                  $('#reset').click();
                  // localStorage.setItem("myidentity", `auth2 ${result.token}`);
              },
              success: function (result) {
                $('#reset').click();
                get_state_Data();

                  $('close').click();
                  localStorage.setItem("myidentity", `auth2 ${result.token}`);
                  getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                  setTimeout(() => { }, 2000);
                    
                 
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


  get_state_Data=function()
   {
    try {
      
    
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_state_Data",
        // data: data,
        beforeSend: function() {
  
        },
        success: function(result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          
          console.log(result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#state_table')) {
            $('#state_table').DataTable().destroy();
          }
        
          $('#state_table').DataTable({
            'data': result.data,
            //  "scrollX":true,
            'aoColumns': [
          
             // { 'data': 's_state_name' },
             {
              'render': function (data, type, row, meta) {
              //  var a= `<button type='button' class='btn btn-default light btn-sm' data-toggle='modal' data-target='#myModalfordcloc' onclick='getstateById(${row.n_state_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn btn-default light btn-sm' onclick='deletestateById(${row.n_state_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
                return `<button type='button' class='btn active btn-info btn-sm pull-center' data-toggle='modal' data-target='#myModalfordcloc' onclick='getstateById(${row.n_state_id})'><span class='glyphicon glyphicon-pencil' data-toggle="tooltip1" title ="Click On Edit"></span></button><button type='button' class='btn active btn-info btn-sm pull-center' onclick='deletestateById(${row.n_state_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash' data-toggle="tooltip1" title ="Click On Delete"></span></button>`;
               
              },
            },

             {
              'render': function (data, type, row, meta) {

                return '<span class="" data-toggle="tooltip1" title ="Country Name">'+row.country+'</span>';
                

              },
            },
              {
                'render': function (data, type, row, meta) {
  
                  return '<span class="" data-toggle="tooltip1" title ="State Name">'+row.s_state_name+'</span>';
                  
  
                },
              },
           //   { 'data': 'country' },
            
  
            // {
            //   'render': function (data, type, row, meta) {
            //     return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"  onclick="getstateById(' + row.n_state_id + ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="deletestateById(' + row.n_state_id + ')"style="margin-left:8px"><span class="glyphicon glyphicon-trash"></span></button>';
            //   }
            // },
            
            


            ],
          });
        },
        error: function (error) {
          console.log(error);
        },
        complete:function (res) {
          // $('.glyphicon-cog').tooltip({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>", html: true, placement: "bottom"}); 
          $('[data-toggle="popover"]').popover({html: true, placement: "top",trigger: "click"});
          $('[data-toggle="tooltip1"]').tooltip({html: true, placement: "top"});
          $("#panel1").hide();

        }
      });
    } catch (error) {
      alert(error);
    }
  }


     deletestateById=function(n_state_id){
       
      try {
        if (confirm("Do you really want to Delete the record ?If you deleted this record then it will affected to dependant record of this data ?")) {
         
          var data = {
            n_state_id: n_state_id,
          };
       
          $.ajax({
            type: 'POST',
            url: "/vser-server/deletestateById",
           
            data: data,
            beforeSend: function() {
              $('#reset').click();
             
            },
            success: function(result) {
              get_state_Data();
              getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                      setTimeout(() => {
                         
                      }, 2000)
                     
            },
            error: function(error) {
              console.log(error);
            },
          });
        } else {
          return false;
      }
        } catch (error) 
        {
          alert(error);
        }      
  }
  
   getstateById=function(n_state_id){
      
      try {
        var data = {
          n_state_id: n_state_id,
        }
        $.ajax({
          type: 'POST',
          url: "/vser-server/get_state_Databyid",
          data: data,
          beforeSend: function() {
          
    
          $('#reset').click();
          $('#savestate').hide();
          $("#updatestate").show();
          },
          success: function(result) {
              
      
            var data = result.data[0];
            $('#s_state_name').val(result.data.s_state_name);
          $("#n_country_id").val(result.data.n_country_id),
            $('#n_state_id').val(result.data.n_state_id);
    
      
    
          },
          error: function(error) {
            console.log(error);
          },
        });
      } catch (error) {
        alert(error);
      }
  
    }
    get_Country_Name = function () {
      
      try {
        if( window.location.hash.split("/state?")[1]!=undefined){
          var n_country_id= window.location.hash.split("/state?")[1]
                  var data={
                    n_country_id:n_country_id
                  }
                  }

          $.ajax({
              url: '/vser-server/get_Country_Data',
              type: 'POST',
              crossDomain: true,
              data: data,
              success: function (result) {
                  debugger
                  var country = '';
                
                    
                    // var iddd=window.location.hash.split("/state?")[1];
                    // $('#n_role_id').val(iddd);
                  
                    // $('#n_role_id').val(iddd);
                    var country = '';
                    // country+="<select class='fstdropdown-select form-control form-control-sm' id='n_role_id1' > <option value='" +  result.data[0].s_country_id + "'>" + result.data[0].s_country_name
                    // + "</option></select>";
                    country += '<option label="--Select Country --"></option>';
                    for (var i = 0; i < result.data.length; i++) {
                      country += '<option value="' + result.data[i].n_country_id + '">' + result.data[i].s_country_name + '</option>';
                    }
                    $('#n_country_id').html(country);
                    // setFstDropdown();
                    // $('#roleid').val(iddd);
    
                 
                    // idofurl
                    if (idofurl != undefined) {
                      $('#n_country_id').val(idofurl);
                     
                  }
            }
          });

      } catch (error) {

      }
  };


  if(idofurl!=undefined){
    get_Country_Name(idofurl);
  }else{
    get_Country_Name();
  }
  get_state_Data();

})(); 

