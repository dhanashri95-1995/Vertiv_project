


(function () {
  
  



  // $('#deleterecord').click(function (event) {
  //   deletelocationrecord();
  //   $("#panel").hide();
  //   $("#panel1").show();
  
  // });

  // $('#savelocation').click(function (event) {
  //   get_datacenter_location_Data();
  //   $("#panel1").hide();
  //   $("#panel").show();
  
  // });

  // $('#refreshrecord').click(function (event) {
  //   get_datacenter_location_Data();
  //   $("#panel1").hide();
  //   $("#panel").show();
  
  // });


  nulldata = function () {
    $("#s_datacenter_name").val('');
    $("#s_datacenter_address").val('');
    $("#n_datacenter_pincode").val('');
    $("#s_datacenter_landmark").val('');
    $("#s_floor_loc").val('');

    $("#s_datacenter_desc").val('');
    $("#n_country_id").val('');
    $("#n_state_id").val('');
    $('#reset').click();
    $('#savelocation').show();
    $('#updatelocation').hide()

  };

  $("#updatelocation").hide();

  var tag = '';
  $('#savelocation').click(function (event) {
    event.preventDefault();
    tag = 'SAVE';
    $('#form-location').submit();
    //get_datacenter_location_Data();
      $("#panel1").hide();
      $("#panel").show();


  });

  $('#updatelocation').click(function (event) {
    event.preventDefault();
    tag = 'UPDATE';
    $('#form-location').submit();
  });

  $('#reset').click(function (event) {
    $('#savelocation').show();
    $('#updatelocation').hide();
  });

  // onSubmit starts from here...
  $('#form-location').on('submit', function (event) {
    
    try {
      if (tag == 'SAVE') {
        
        var date = new Date();
        d_created_date = date.getTime();
        var data = {
          s_datacenter_name: $("#s_datacenter_name").val(),
          s_datacenter_address: $("#s_datacenter_address").val(),
          n_datacenter_pincode: $("#n_datacenter_pincode").val(),
          s_datacenter_landmark: $("#s_datacenter_landmark").val(),
          s_floor_loc: $("#s_floor_loc").val(),

          s_datacenter_desc: $("#s_datacenter_desc").val(),
          n_country_id: $("#n_country_id").val(),
          n_state_id: $("#n_state_id").val(),
          d_created_date: d_created_date,


          s_created_by: localStorage.getItem('email'),

        };
        var url = '/vser-server/save_datacenter_location_record';
      } else if (tag == 'UPDATE') {
        
        var date = new Date();
        var d_modified_date = date.getTime();
        var data = {

          s_datacenter_name: $("#s_datacenter_name").val(),
          s_datacenter_address: $("#s_datacenter_address").val(),
          n_datacenter_pincode: $("#n_datacenter_pincode").val(),
          s_datacenter_landmark: $("#s_datacenter_landmark").val(),

          s_datacenter_desc: $("#s_datacenter_desc").val(),
          n_country_id: $("#n_country_id").val(),
          n_state_id: $("#n_state_id").val(),
          d_modified_date: d_modified_date,
          s_floor_loc: $("#s_floor_loc").val(),



          s_modified_by: localStorage.getItem('email'),
          n_datacenter_id: $('#n_datacenter_id').val(),
        };
        var url = '/vser-server/update_datacenter_location_Data';
      } else {
        return alert('Something Wrong !!!!');
      }
      
      $.ajax({
        type: 'POST',
        url: url,
        crossDomain: true,
        data: data,
        beforeSend: function () {


        },
        success: function (result) {
          $("#close").click();
          $('#reset').click();
          get_datacenter_location_Data();


          localStorage.setItem("myidentity", `auth2 ${result.token}`);
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          setTimeout(() => { }, 2000);


        },
        error: function (err) {
          getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
        },
        complete: function (response) {

        }
      });
    } catch (error) {
      alert(error);
    }
  });
  
  get_datacenter_location_Data = function (){
  
    try {

      $("#alldataoflocation").show();
      $("#deletedataoflocation").hide();
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_datacenter_location_Data",
        // data: data,
        beforeSend: function () {

        },
        success: function (result) { 
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          console.log(result);

          $("#close").click();
          $('#reset').click();

          var i = 0;
          if ($.fn.dataTable.isDataTable('#locationmaster')) {
            $('#locationmaster').DataTable().destroy();
          }

          $('#locationmaster').DataTable({
            'data': result.data,
            // "scrollX": true,
            'aoColumns': [

              // { 'data': 'country' },
              // { 'data': 'state' },
              // { 'data': 's_datacenter_name' },
            
              // { 'data': 's_datacenter_landmark' },
              
              {
                'render': function (data, type, row, meta) {
                //  var a= `<button type='button' class='btn btn-default light btn-sm' data-toggle='modal' data-target='#myModalfordcloc' onclick='get_datacenterlocation_ById(${row.n_datacenter_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn btn-default light btn-sm' onclick='delete_datacenter_location_ById(${row.n_datacenter_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
                //   return '<span class="btn btn-info glyphicon glyphicon-cog" data-toggle="tooltip" title ="'+a+'" ></span>';
                var a= `<span class='mybtns'><button type='button' class='btn active btn-info btn-sm' data-toggle='modal' data-target='#rack_model' onclick='get_datacenterlocation_ById(${row.n_datacenter_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm' onclick='delete_datacenter_location_ById(${row.n_datacenter_id},${row.n_rack_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button></span>`;
                return '<span class="btn btn-info glyphicon glyphicon-cog settingbtn">'+a+'</span>';
                 
                },
              },
              {
                'render': function (data, type, row, meta) {

                  return '<a href="#/floor/floor?ID='+row.n_datacenter_id+'"><button type="button" class="btn active btn-info btn-sm"   style="margin-left:8px"><span class="glyphicon glyphicon-plus" data-toggle="tooltip1" title="Add Floor"></span></button></a>';
                  

                },
              },


              {
                            'render': function (data, type, row, meta) {
              
                              return '<span class="" data-toggle="tooltip1" title ="Country Name">'+row.country+'</span>';
                              
              
                            },
                          },
                            {
                              'render': function (data, type, row, meta) {
                
                                return '<span class="" data-toggle="tooltip1" title ="State Name">'+row.state+'</span>';
                                
                
                              },
                            },
              
                            {
                              'render': function (data, type, row, meta) {
                
                                return '<span class="" data-toggle="tooltip1" title ="Datacenter Name">'+row.s_datacenter_name+'</span>';
                                
                
                              },
                            },
              
                            {
                              'render': function (data, type, row, meta) {
                
                                return '<span class="" data-toggle="tooltip1" title ="Datacenter Landmark">'+row.s_floor_loc+'</span>';
                                
                
                              },
                            }
                         
              

            
             



            ],
          });
        },
        error: function (error) {
          console.log(error);
        },
        complete:function (res) {
          // $('.glyphicon-cog').tooltip({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>", html: true, placement: "bottom"}); 
          $('[data-toggle="tooltip"]').tooltip({html: true, placement: "top",trigger: "click"});
          $('[data-toggle="tooltip1"]').tooltip({html: true, placement: "top"});
          $("#panel1").hide();
        }
      });
    } catch (error) {
      alert(error);
    }
  }



  deletelocationrecord = function ()
   {
    try {
    
      $.ajax({
        type: 'POST',
        url: "/vser-server/deletelocationrecord",
        // data: data,
        beforeSend: function () {

        },
        success: function (result) { 
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          console.log(result);

          $("#close").click();
          $('#reset').click();

          var i = 0;
          if ($.fn.dataTable.isDataTable('#locationmaster1')) {
            $('#locationmaster1').DataTable().destroy();
          }

          $('#locationmaster1').DataTable({
            'data': result.data,
            // "scrollX": true,
            'aoColumns': [

            
              {
                            'render': function (data, type, row, meta) {
              
                              return '<span class="" data-toggle="tooltip1" title ="Country Name">'+row.country+'</span>';
                              
              
                            },
                          },
                            {
                              'render': function (data, type, row, meta) {
                
                                return '<span class="" data-toggle="tooltip1" title ="State Name">'+row.state+'</span>';
                                
                
                              },
                            },
              
                            {
                              'render': function (data, type, row, meta) {
                
                                return '<span class="" data-toggle="tooltip1" title ="Datacenter Name">'+row.s_datacenter_name+'</span>';
                                
                
                              },
                            },
              
                            {
                              'render': function (data, type, row, meta) {
                
                                return '<span class="" data-toggle="tooltip1" title ="Datacenter Landmark">'+row.s_floor_loc+'</span>';
                                
                
                              },
                            }
                         
              

              // {
              //                 'render': function (data, type, row, meta) {
              
              //                   return '<a href="#/floor/floor?ID='+row.n_datacenter_id+'"><button type="button" class="btn active btn-info btn-sm"   style="margin-left:8px"><span class="glyphicon glyphicon-plus"></span></button></a>';
                                
              
              //                 },
              //               }
              // ,
 
              // {
              //   'render': function (data, type, row, meta) {
              //    var a= `<button type='button' class='btn btn-default light btn-sm' data-toggle='modal' data-target='#myModalfordcloc' onclick='get_datacenterlocation_ById(${row.n_datacenter_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn btn-default light btn-sm' onclick='delete_datacenter_location_ById(${row.n_datacenter_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
              //     return '<span class="btn btn-info glyphicon glyphicon-cog" data-toggle="tooltip" title ="'+a+'" ></span>';
                 
              //   },
              // }
             



            ],
          });
        },
        error: function (error) {
          console.log(error);
        },
        complete:function (res) {
          // $('.glyphicon-cog').tooltip({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>", html: true, placement: "bottom"}); 
          $('[data-toggle="tooltip"]').tooltip({html: true, placement: "top",trigger: "click"});
          $('[data-toggle="tooltip1"]').tooltip({html: true, placement: "top"});

        }
      });
    } catch (error) {
      alert(error);
    }
  }

  deletelocationrecord();





  delete_datacenter_location_ById = function (n_datacenter_id) {
    try {
      if (confirm("Do you really want to Delete the Location ?")) {
         
      var data = {
        n_datacenter_id: n_datacenter_id,
      };
   
      $.ajax({
        type: 'POST',
        url: "/vser-server/delete_datacenter_location_ById",

        data: data,
        beforeSend: function (xhr) {
          $('#reset').click();
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          get_datacenter_location_Data();
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          setTimeout(() => {

          }, 2000)

        },
        error: function (error) {
          console.log(error);
        },
      });
    } else {
      return false;
  }
    } catch (error) {
      alert(error);
    }
  }

  get_datacenterlocation_ById = function (n_datacenter_id) {
    
    try {
      var data = {
        n_datacenter_id: n_datacenter_id,
      }
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_datacenter_location_ById",
        data: data,
        beforeSend: function (xhr) {


          $('#reset').click();
          $('#savelocation').hide();
          $("#updatelocation").show();
          get_country_id();
          get_state_id();
         
        },
        success: function (result) {
          

          $("#dclocation_form").show();
          $("#dclocationlist").hide();
          var data = result.data[0];
          $('#s_datacenter_desc').val(result.data.s_datacenter_desc);
          $('#n_country_id').val(result.data.n_country_id);
          $('#n_state_id').val(result.data.n_state_id);

          get_state_id(result.data.n_country_id,result.data.n_state_id);
          $('#n_datacenter_id').val(result.data.n_datacenter_id);

          $('#s_datacenter_name').val(result.data.s_datacenter_name);
          $('#s_datacenter_address').val(result.data.s_datacenter_address);
          $('#n_datacenter_pincode').val(result.data.n_datacenter_pincode);
          $('#s_datacenter_landmark').val(result.data.s_datacenter_landmark);
          $('#s_floor_loc').val(result.data.s_floor_loc);



        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }

  }



  get_country_id = function () {
    
    try {

      $.ajax({
        type: 'POST',
        url: "/vser-server/get_country_Data",
        // data: data,
        beforeSend: function () {
        },
        success: function (result) {
          

          var data = result.data[0];
          var roledrp = '';
          // $("#N_MAKER_ID").text("");
          roledrp += '<option label="--select Country --"></option>';
          for (var i = 0; i < result.data.length; i++) {
            roledrp += '<option value="' + result.data[i].n_country_id + '">' + result.data[i].s_country_name + '</option>';
          }
          $('#n_country_id').html(roledrp);



        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  }
  get_country_id();

  get_state_id= function(country,state) {
    try {
      
     
      if(country == undefined)
      {
         var data={"n_country_id":$("#n_country_id").val()}
      }
      else
      {
         var data={"n_country_id":country}
      }
 
      $.ajax({
        type: 'POST',
        url: '/vser-server/get_state_id',
        data: data,
        beforeSend: function() {
        
         
        },
        success: function(result) 
        {
         
          var statedrp = '';
       
          statedrp += '<option label="--select state--"></option>';
          for (var i = 0; i < result.data.length; i++) {
            statedrp += '<option value="' + result.data[i].n_state_id + '">' + result.data[i].s_state_name + '</option>';
          }
          $('#n_state_id').html(statedrp);

            if(state != undefined)
            {
              $('#n_country_id').val(country);
              $('#n_state_id').val(state);
          } 
 
        },
        error: function(error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  };

  $("#dclocation_form").hide();
  divopennclose=function(){
    // refresh();
    
    $("#dclocation_form").show();
    $("#dclocationlist").hide();
  }


   divopennclose_= function(){
    
    // refresh();
    $("#dclocation_form").hide();
    $("#dclocationlist").show();  
  }

  get_datacenter_location_Data();

})();
