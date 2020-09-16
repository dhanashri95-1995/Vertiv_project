
(function () {

$('#refreshrecord').click(function (event) {
  get_country_Data();
  $("#panel1").hide();
  $("#panel").show();

});

$('#saveCountry').click(function (event) {
  get_country_Data();
  $("#panel1").hide();
  $("#panel").show();

});

  
  $("#updateCountry").hide();

  var tag = '';
  $('#saveCountry').click(function (event) {
    event.preventDefault();
    tag = 'SAVE';
    $('#form-country').submit();
  });

  $('#updateCountry').click(function (event) {
    event.preventDefault();
    tag = 'UPDATE';
    $('#form-country').submit();
  });

  $('#reset').click(function (event) {
    $('#saveCountry').show();
    $('#updateCountry').hide();
  });

  // onSubmit starts from here...
  $('#form-country').on('submit', function (event) {
    
    try {
      if (tag == 'SAVE') {
         var date = new Date();
        d_created_date = date.getTime();
        var data = {
          s_country_name: $("#s_country_name").val(),
          d_created_date: d_created_date,
          s_created_by: localStorage.getItem('email'),
        };
        var url = '/vser-server/check_country_record';
      } 
      else if (tag == 'UPDATE') {
        
        var date = new Date();
        var d_modified_date = date.getTime();
        var data = {
          s_country_name: $("#s_country_name").val(),
          d_modified_date: d_modified_date,

          s_modified_by: localStorage.getItem('email'),
          n_country_id: $('#n_country_id').val(),
        };
        var url = '/vser-server/update_country_Data';
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
          $('#reset').click();



          localStorage.setItem("myidentity", `auth2 ${result.token}`);
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          setTimeout(() => { }, 2000);
            
         
        },
        error: function (err) {
          getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
        },
        complete: function (response) {
          get_country_Data();
         
        }
      });
    } catch (error) {
      alert(error);
    }
  });
  


  get_country_Data = function () {
 
    try {
      

      $.ajax({
        type: 'POST',
        url: "/vser-server/get_country_Data",
        // data: data,
        beforeSend: function () {

        },
        success: function (result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          
          console.log(result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#country_table')) {
            $('#country_table').DataTable().destroy();
          }

          $('#country_table').DataTable({
            'data': result.data,
            // "scrollX": true,
            'aoColumns': [

            //  { 'data': 's_country_name' },

            {
              'render': function (data, type, row, meta) {
//                var a= `<button type='button' class='btn btn-default light btn-sm'  onclick='getcountryById(${row.n_country_id})'>
//                <span class='glyphicon glyphicon-pencil'></span></button>
// <button type='button' class='btn btn-default light btn-sm' onclick='deletecountryById(${row.n_country_id})'style='margin-left:4px'>
// <span class='glyphicon glyphicon-trash'></span></button>

//`;
                return `<button type='button' class='btn active btn-info btn-sm pull-center'  onclick='getcountryById(${row.n_country_id})'>
                <span class='glyphicon glyphicon-pencil' data-toggle="tooltip1" title ="Click On Edit"></span></button>
 <button type='button' class='btn active btn-info btn-sm pull-center' onclick='deletecountryById(${row.n_country_id})'style='margin-left:4px'>
 <span class='glyphicon glyphicon-trash' data-toggle="tooltip1" title ="Click On Delete"></span></button>`;
               
              },
            },
            {
              "render": function(data, type, row, meta) {
                  return ' <a  href="#/state/state?ID='+row.n_country_id+'"> <button type="button" class="btn active btn-info btn-sm"   style="margin-left:8px"><span class="glyphicon glyphicon-plus" data-toggle="tooltip1" title="Add State"></span></button></a>';
              }
          },
              {
                'render': function (data, type, row, meta) {
  
                  return '<span class="" data-toggle="tooltip1" title ="Country Name">'+row.s_country_name+'</span>';
                  
  
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



  deletecountryById = function (n_country_id) {
    try {
      if (confirm("Do you really want to Delete the record ?If you deleted this record then it will affected to dependant record of this data")) {
         
      var data = {
        n_country_id: n_country_id,
      };
  
      $.ajax({
        type: 'POST',
        url: "/vser-server/deletecountryById",

        data: data,
        beforeSend: function () {
          $('#reset').click();
        },
        success: function (result) {
          get_country_Data();
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
  

  getcountryById = function (n_country_id) {
    
    try {
      var data = {
        n_country_id: n_country_id,
      }
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_country_Databyid",
        data: data,
        beforeSend: function () {


          $('#reset').click();
          $('#saveCountry').hide();
          $("#updateCountry").show();
        },
        success: function (result) {
          

          var data = result.data[0];
          $('#s_country_name').val(result.data.s_country_name);

          $('#n_country_id').val(result.data.n_country_id);
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          setTimeout(() => {

          }, 2000)


        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }

  }
  get_country_Data();
})();




