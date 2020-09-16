(function () {
  debugger;


  $("#updateRack").hide();

  var tag = '';
  $('#savestatus').click(function (event) {
    event.preventDefault();
    tag = 'SAVE';
    $('#form-status').submit();
  });

  $('#updatestatus').click(function (event) {
    event.preventDefault();
    tag = 'UPDATE';
    $('#form-status').submit();
  });

  $('#resetstatus').click(function (event) {
    $('#savestatus').show();
    $('#updatestatus').hide();
  });

  // onSubmit starts from here...
  $('#form-status').on('submit', function (event) {
    debugger;
    try {
      if (tag == 'SAVE') {
        debugger;
        var date = new Date();
        var d_created_date = date.getTime();
        // var ststs = document.getElementById("s_status_type").value
        // var res = ststs.toLowerCase();
        var data = {


          s_status_desc: $("#s_status_desc").val(),
          s_status_name: $("#s_status_name").val(),
          s_status_type:  $("#s_status_type").val(),
          s_status_colorcode: $("#s_status_colorcode").val(),
          d_created_date: d_created_date,
          s_created_by: localStorage.getItem('email'),

        };
        var url = '/vser-server/check_statusrecord_record';
      } else if (tag == 'UPDATE') {
        debugger;

        var date = new Date();
        var d_modified_date = date.getTime();
        // var ststs = document.getElementById("s_status_type").value
        // var res = ststs.toLowerCase()
        var data = {
          s_status_desc: $("#s_status_desc").val(),
          s_status_name: $("#s_status_name").val(),
          s_status_type:$("#s_status_type").val(),
          s_status_colorcode: $("#s_status_colorcode").val(),
          d_modified_date: d_modified_date,
          s_modified_by: localStorage.getItem('email'),
          n_status_no: $('#n_status_no').val(),
        };
        var url = '/vser-server/update_status_Data';
      } else {
        return alert('Something Wrong !!!!');
      }
      debugger;
      $.ajax({
        type: 'POST',
        url: url,
        crossDomain: true,
        data: data,
        beforeSend: function () {

        },
        success: function (result) {
          debugger;
          get_status_Data();
          $('#resetstatus').click();
          $('#savestatus').show();
          $('#updatestatus').hide();
          $("#s_status_desc").val('');
          localStorage.setItem("myidentity", `auth2 ${result.token}`);
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          setTimeout(() => {

          }, 2000);
        },
        error: function (err) {
          if (err.message == "")
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


  get_status_Data = function () {
  {
    $("#allstatusdata").show();
		$("#deletedstatus").hide();
    try {
      debugger;
      //   var data = {
      //     loginuser: localStorage.getItem('emailid'),
      //   };
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_status_Data",
        // data: data,
        beforeSend: function (xhr) {

          //   xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
        },
        success: function (result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          debugger;
          console.log(status, result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#statusmaster')) {
            $('#statusmaster').DataTable().destroy();
          }
          //   var tdata=result.data
          $('#statusmaster').DataTable({
            'data': result.data,
            //  "scrollX":true,
            'aoColumns': [
              /*  {
                 'render': function() 
                 {
                   i++;
                   return i;
                 },
               }, */
               { 
                'render': function(data, type, row, meta) {
               //   var a= '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"   onclick="getstatusById(' + row.n_status_no + ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="deletestatusById(' + row.n_status_no + ')" style="margin-left:7px"><span class="glyphicon glyphicon-trash"></span></button> ';return '<span class="btn btn-info glyphicon glyphicon-cog" id="example" data-toggle="popover" title ="'+a+'"></span>';
               // }
               return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"   onclick="getstatusById(' + row.n_status_no + ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="deletestatusById(' + row.n_status_no + ')"  style="margin-left:7px"><span class="glyphicon glyphicon-trash"></span></button>';
             }
           },
              { 'data': 's_status_name' },
              // { 'data': 's_status_desc' },
              { 'data': 's_status_type' },
              // { 'data': 's_status_colorcode' },
              {
                'render': function (data, type, row, meta) {
                  return '<input type="color" id="s_status_colorcode" name="s_status_colorcode" value="' + row.s_status_colorcode + '">';
                }
              },

                // { 'data': 's_created_by' },
              

              // {
              //   'render': function (data, type, row, meta) {
              //     var a = `<button type='button' class='btn active btn-info btn-sm'  data-toggle='modal' data-target='#myModalfordcloc' onclick='getstatusById(${row.n_status_no})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm'  onclick='deletestatusById(${row.n_status_no})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
              //     return '<span class="btn btn-info glyphicon glyphicon-cog" id="example" data-toggle="popover" title ="' + a + '"></span>';
              //   },
              // }







            ],
          });
        },
        complete: function (res) {
          // $('.glyphicon-cog').tooltip({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>", html: true, placement: "bottom"}); 
          // $('[data-toggle="tooltip"]').tooltip({html: true, placement: "top",trigger: "hover"});
          $('[data-toggle="popover"]').popover({ html: true, placement: "top", trigger: "click" });


          // $('[rel="tooltip"]').on('click', function () {
          //     $(this).tooltip('hide')
          // })
        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  }
}


  get_deleted_status_Data = function (idofdelete) {
    // $("#allstatusdata").hide();
		// $("#deletedstatus").show();
    try {
      debugger;
        var data = {
          idofdelete:idofdelete
        };
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_status_Data",
        data: data,
        beforeSend: function (xhr) {

          //   xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
        },
        success: function (result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          debugger;
          console.log(status, result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#statusmasterdelete')) {
            $('#statusmasterdelete').DataTable().destroy();
          }
          //   var tdata=result.data
          $('#statusmasterdelete').DataTable({
            'data': result.data,
            //  "scrollX":true,
            'aoColumns': [
              /*  {
                 'render': function() 
                 {
                   i++;
                   return i;
                 },
               }, */
              { 'data': 's_status_name' },
              // { 'data': 's_status_desc' },
              { 'data': 's_status_type' },
              // { 'data': 's_status_colorcode' },
              {
                'render': function (data, type, row, meta) {
                  return '<input type="color" id="s_status_colorcode" name="s_status_colorcode" value="' + row.s_status_colorcode + '">';
                }
              },

                // { 'data': 's_created_by' },
               

              // {
              //   'render': function (data, type, row, meta) {
              //     var a = `<button type='button' class='btn active btn-info btn-sm'  data-toggle='modal' data-target='#myModalfordcloc' onclick='getstatusById(${row.n_status_no})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm'  onclick='deletestatusById(${row.n_status_no})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
              //     return '<span class="btn btn-info glyphicon glyphicon-cog" id="example" data-toggle="popover" title ="' + a + '"></span>';
              //   },
              // }







            ],
          });
        },
        complete: function (res) {
          // $('.glyphicon-cog').tooltip({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>", html: true, placement: "bottom"}); 
          // $('[data-toggle="tooltip"]').tooltip({html: true, placement: "top",trigger: "hover"});
          $('[data-toggle="popover"]').popover({ html: true, placement: "top", trigger: "click" });


          // $('[rel="tooltip"]').on('click', function () {
          //     $(this).tooltip('hide')
          // })
        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  }

  deletestatusById = function (n_status_no) {
    try {
      if (confirm("Do you really want to delete the record ?")) {
      var data = {
        n_status_no: n_status_no,
      };
      $.ajax({
        type: 'POST',
        url: "/vser-server/deletestatusById",

        data: data,
        beforeSend: function (xhr) {
          $('#reset').click();
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          get_status_Data();
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          setTimeout(() => {

          }, 2000)

        },
        error: function (error) {
          console.log(error);
        },
      });
    }else{
      return false
    }
    } catch (error) {
      alert(error);
    }
  }

  getstatusById = function (n_status_no) {
    debugger;
    try {
      var data = {
        n_status_no: n_status_no,
      }
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_status_Databyid",
        data: data,
        beforeSend: function (xhr) {
          //  BrandDiv();

          $('#reset').click();
          $('#savestatus').hide();
          $('#updatestatus').show();
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          debugger;

          var data = result.data[0];
          $('#s_status_desc').val(data.s_status_desc);
          $("#s_status_name").val(data.s_status_name);
          $("#s_status_type").val(data.s_status_type);
          $("#s_status_colorcode").val(data.s_status_colorcode);
          $('#n_status_no').val(data.n_status_no);



        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }

  }

  refresh = function () {
    // $('#s_status_desc').text('');
    $('#max-length-element').val('');
  }
  get_status_Data();
})();