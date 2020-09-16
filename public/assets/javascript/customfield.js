
(function () 
{

  $("#btnupdate_custom").hide();
  $("#deleted_field_data").hide();


  showcustomdata=function()
  {

    $("#deleted_field_data").hide();

    $("#userlisttbl").show();
  }

  

  
  divopennclose = function () {


    

    $("#content_form").show();
    $("#data_tab ").hide();
    $("#update_alert_transaction").hide();
    $("#save_alert_transaction").show();
  }

  divopennclose_ = function () {
    


    $("#content_form").hide();
    $("#data_tab ").show();

  }



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

      if (tag == 'save') {
        //  alert("save")

        
        var date = new Date();
        var d_created_date = date.getTime();

        data = {
          s_tbl_name: $("#s_tbl_name").val(),
          s_field_nam: $("#s_field_nam").val(),
          s_field_type: $("#s_field_type").val(),
          d_created_date: d_created_date,
          s_placeholder: $("#s_placeholder").val(),
          s_default_val: $("#s_default_val").val(),
          // s_field_nam: $("#s_field_nam").val(),


          s_user_name: localStorage.getItem("email")
        };
        var url = '/vser-server/Add_field';

      } else if (tag == 'UPDATE') {
        

        // alert("update")

        
        var date = new Date();
        var d_modified_date = date.getTime();

        data = {
          s_tbl_name: $("#s_tbl_name").val(),
          s_field_nam: $("#s_field_nam").val(),
          s_field_type: $("#s_field_type").val(),
          s_placeholder: $("#s_placeholder").val(),
          s_default_val: $("#s_default_val").val(),
          n_customfield_id: $("#n_customfield_id").val(),
          s_modified_by: localStorage.getItem("email"),
          d_modified_date: d_modified_date
        };
        var url = '/vser-server/update_field';

      } else {
        return alert('Something Wrong !!!!');
      }
      

      var str = document.getElementById("s_field_nam").value;
      var res = str.split(" ");
      if (res.length >= 2) {
        alert("please insert singal word");
      } else {

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
            get_field_Data();


          },
          error: function (err) {
            
            getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
          },
          complete: function (response) {
            $("#loader").removeClass("is-active");
          }
        });
      }
    } catch (error) {
      alert(error);
    }
  });

  get_field_Data =function () {
    try {
      // alert("getuserdata");

      
      var data = {
        loginuser: localStorage.getItem('emailid'),
        n_status: 0
      };
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_field_Data",
        data: data,
        beforeSend: function (xhr) {
          $("#resetuser").click();
          // $('#name').val("");
          $("#s_tbl_name").val(""),
            $("#s_field_nam").val(""),
            $("#s_field_type").val(""),
            $("#save_custom").show();

          $("#btnupdate_custom").hide();

          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          // getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);

          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);

          
          console.log(result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#field_data')) {
            $('#field_data').DataTable().destroy();
          }


          var tdata = result.data
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
               {


                'render': function (data, type, row, meta) {

                  // return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"  onclick="get_field_detail(' + row.n_customfield_id+ ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="deletefield_rec('+row.n_customfield_id +')" style="margin-left:8px"><span class="glyphicon glyphicon-trash"></span></button>';


                  // var a = `<button  type='button' class='btn btn-info  btn-sm' data-toggle='modal' data-target='# ' onclick='get_field_detail(${row.n_customfield_id})'><span class='glyphicon glyphicon-pencil'></span></button>
                  //     <button type='button' class='btn btn-info  btn-sm' onclick='deletefield_rec(${row.n_customfield_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
                  // return '<span class="btn btn-info glyphicon glyphicon-cog" data-toggle="popover" title ="' + a + '"></span>';

                  var a = ` <span class='mybtns'><button  type='button' class='btn btn-info  btn-sm' data-toggle='modal' data-target='# ' onclick='get_field_detail(${row.n_customfield_id})'><span class='glyphicon glyphicon-pencil'></span></button>
                  <button type='button' class='btn btn-info  btn-sm' onclick='deletefield_rec(${row.n_customfield_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button></span>`;
        return '<span class="btn btn-info glyphicon glyphicon-cog settingbtn"  >'+a+'</span>';

                }

              },
              {
                'data': 's_tbl_name'
              },
              {
                'data': 's_field_nam'
              },
              {
                'data': 's_field_type'
              },

             


            ],
          });
        },
        error: function (error) {
          console.log(error);
        },

        complete: function (res) {
          

          // $('.glyphicon-cog').popover({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>", html: true, placement: "top"}); 
          $('[data-toggle="popover"]').popover({
            html: true,
            placement: "top",
            trigger: "click"
          });
          // ,trigger: "click"

        }
      });
    } catch (error) {
      alert(error);
    }
  };

  get_field_detail = function (id) {
    // alert(id);

    try {
      var data = {
        // emailid: localStorage.getItem("email"), 
        n_customfield_id: id
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
          divopennclose();
          $("#btnupdate_custom").show();

          


          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          $("#s_tbl_name").val(result.data.s_tbl_name);
          $("#s_field_nam").val(result.data.s_field_nam);
          $("#s_field_type").val(result.data.s_field_type);
          $("#s_placeholder").val(result.data.s_placeholder);
          $("#s_default_val").val(result.data.s_default_val);
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
    } catch (err) {
      alert(err);
    }
  };


  deletefield_rec = function (id) {
    // alert(id);

    try {

      // if (confirm("Do you really want to delete record ?")) 
      // {
      //   var data = {
       
      //     n_customfield_id: id
      //   };
      // }
      // else 
      // {
      //   return false;
      // }

      var data = {
       
        n_customfield_id: id
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
    } catch (err) {
      alert(err);
    }
  };

  view_deleterecord = function () {
    try {

      
      var data = {
        loginuser: localStorage.getItem('emailid'),
        n_status: 1
      };
      $.ajax({
        type: 'POST',
        url: "/vser-server/get_fieldDeleted_Data",
        data: data,
        beforeSend: function (xhr) 
        {

          $("#deleted_field_data").show();

          $("#userlisttbl").hide();
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          

       

          console.log(result);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#fieldelete_data')) 
          {
            $('#fieldelete_data').DataTable().destroy();
          }


          var tdata = result.data
          $('#fieldelete_data').DataTable({
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
              {
                'data': 's_tbl_name'
              },
              {
                'data': 's_field_nam'
              },
              {
                'data': 's_field_type'
              },




            ],
          });
        },
        error: function (error) {
          console.log(error);
        },

        complete: function (res) {
          

          // $('.glyphicon-cog').popover({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>", html: true, placement: "top"}); 
          $('[data-toggle="popover"]').popover({
            html: true,
            placement: "top",
            trigger: "click"
          });
          // ,trigger: "click"

        }
      });
    } catch (error) {
      alert(error);
    }

  };

  get_field_Data();



})();
