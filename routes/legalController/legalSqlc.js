var dbValidation = require("./../../utils/dbValidation.js"); // this is contain all Validation part

module.exports = {
  // get_user_detail: function (req, res) {
  //     var queryString = `select * from tbl_login_master where s_email = $$${req.body.emailid}$$ and n_active = '1'`;
  //     return queryString;
  // },
  get_user_detail: function (req, res) {
    var obj = {};
    obj.queryString = "select * from tbl_user where s_email=$1 and n_active = '1'";
    obj.arr = [req.body.emailid];
    return obj;
    // var queryString = `select * from tbl_user where s_email = $$${req.body.emailid}$$ and n_active = '1'`;
    // return queryString;
  },

  update_my_profile: function (req, res) {

    var obj = {};
    var data = req.body;
    if (data.tag === "UPDATE") {
      var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
      obj.queryString = `update tbl_user set s_first_name=$1,s_last_name=$2,s_address=$3,n_con_number=$4,s_about_me=$5  where s_user_id=$6`;

      obj.arr = [data.s_first_name, data.s_last_name, data.s_address, data.n_con_number, data.s_about_me, data.n_user_id]
      return obj;
    } else if (data.tag === "CHANGEPASSWORD") {
      var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
      obj.queryString = `update tbl_user set s_pass=$1 where s_user_id=$2`;

      obj.arr = [data.s_confirmation, data.n_user_id]
      return obj;
    }

    // }

  },
  selectmaxuser: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `SELECT * FROM tbl_user WHERE s_user_id = (SELECT MAX (s_user_id) FROM tbl_user);  `;
      // obj.arr = [];
    return obj;
  },

  save_user_record: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `insert into tbl_user(s_first_name,s_last_name,s_email,d_join_date,s_designation,s_company_name,s_department,s_address,n_con_number,s_about_me,n_active,s_created_by,d_created_date,n_status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14); `;
      obj.arr = [data.s_first_name, data.s_last_name, 
         data.s_email, data.d_join_date, data.s_designation, data.s_company_name, data.s_department,  data.s_address, data.n_con_number, data.s_about_me, 1, data.s_created_by, d_created_date, '0'];
    return obj;
  },


  get_check_email: function (req, res) {
    // var queryString = "select * from tbl_user where s_email='"+req.body.s_email+"'";
    // return queryString;

    var obj = {};
    obj.queryString = "select * from tbl_user where s_email=$1";
    obj.arr = [req.body.s_email];
    return obj;
  },

  check_user_record: function (req, res) {
    var obj = {};
    obj.queryString = "select *,getusername(s_user_id) as username from tbl_user where s_user_name=$1";
    obj.arr = [req.body.s_user_name];
    return obj;

  },

  get_user_Data: function (req, res) {
    var obj = {};
    var roleNu = dbValidation.role(req.body.user_role);
    obj.queryString = `select * from tbl_user where 1=$1 `;
    obj.queryString += req.body.idofdeletedata == '1'  ? ` and n_status = 1` : ` and n_status = 0`
    obj.arr = [roleNu];
    return obj;
  },

  get_user_Databyid: function (req, res) {
    var obj = {};
    obj.queryString = `select * from tbl_user where s_user_id=$1`;
    obj.arr = [req.body.s_user_id];
    return obj;
  },

  update_user_Data: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_user set s_first_name=$1,s_last_name=$2,s_email=$3,d_join_date=$4,s_designation=$5,s_company_name=$6,s_department=$7,s_address=$8,n_con_number=$9,s_about_me=$10,s_modified_by=$11 ,d_modified_date=$12,n_active=$13  where s_user_id=$14`;
    obj.arr = [data.s_first_name, data.s_last_name,  data.s_email, data.d_join_date, data.s_designation, data.s_company_name, data.s_department, data.s_address, data.n_con_number, data.s_about_me, data.s_modified_by, d_modified_date, data.n_active, data.s_user_id]
    return obj;
  },

  deleteUserById: function (req, res) {

    var obj = {};
    obj.queryString = `update tbl_user set n_status='1' where s_user_id=$1`;
    obj.arr = [req.body.s_user_id];
    return obj;

    // var queryString =`update tbl_user set n_status='1' where s_user_id = $$${req.body.s_user_id}$$`;
    // return queryString;
  },

  // ************************************ROLE MASTER*****************************************
  save_role_record: function (req, res) {
    // var queryString = "insert into tbl_role_master(s_role_name,s_created_by,d_created_date,n_status) values('"+req.body.s_role_name+"','"+req.body.s_created_by+"','"+req.body.d_created_date+"',0)";

    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `insert into tbl_role_master(s_role_name,s_created_by,d_created_date,n_status) values($1,$2,$3,$4)`;

    obj.arr = [data.s_role_name, data.s_created_by, d_created_date,
      '0'
    ];
    return obj;
    // return queryString;
  },
  check_role_record: function (req, res) {
    var obj = {};
    obj.queryString = "select * from tbl_role_master where s_role_name=$1";
    obj.arr = [req.body.s_role_name];
    return obj;
    // var queryString = "select * from tbl_role_master where s_role_name='"+req.body.s_role_name+"'";
    // return queryString;
  },
  get_role_Data: function (req, res) {
    // if(req.body.n_role_id!=undefined){
    //   var queryString = "select *,getrolename(n_role_id) as rolename,s_role_name from tbl_role_master where n_role_id='"+req.body.n_role_id+"' where n_status!='1'";
    // }else{
    //   var queryString = "select *,getrolename(n_role_id) as rolename,s_role_name from tbl_role_master where n_status!='1'";
    // }
    // return queryString;
    if (req.body.n_role_id != undefined) {
      var obj = {};
      obj.queryString = `select *getrolename(n_role_id) as rolename,s_role_name from tbl_role_master from tbl_role_master where n_role_id=$1 and n_status!=$1`;
      obj.arr = [req.body.n_role_id, '1'];

      return obj;
    } else {
      var obj = {};
      obj.queryString = "select *,getrolename(n_role_id) as rolename,s_role_name from tbl_role_master where n_status!=$1";
      obj.arr = ['1'];

      return obj;
    }
  },
  get_role_Databyid: function (req, res) {
    // var queryString = `select * from tbl_role_master where n_role_id = $$${req.body.n_role_id}$$ `;
    // return queryString;
    var obj = {};
    obj.queryString = `select * from tbl_role_master where n_role_id=$1`;
    obj.arr = [req.body.n_role_id];
    return obj;
  },
  update_role_Data: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_role_master set s_role_name=$1,s_modified_by=$2,d_modified_date=$3 where n_role_id=$4`;

    obj.arr = [data.s_role_name, data.s_modified_by, d_modified_date,
      data.n_role_id
    ]
    return obj;
    // var queryString =`update tbl_role_master set s_role_name=$$${req.body.s_role_name}$$,s_modified_by=$$${req.body.s_modified_by}$$,d_modified_date=$$${req.body.d_modified_date}$$,n_status='0'  where n_role_id = $$${req.body.n_role_id}$$`;
    // return queryString;
  },

  deleteroleById: function (req, res) {
    var obj = {};
    var data = req.body;
    // var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `delete from  tbl_role_master  where n_role_id=$1`;

    obj.arr = [data.n_role_id]
    return obj;


    // var queryString =`update tbl_role_master set n_status='1'  where n_role_id = $$${req.body.n_role_id}$$`;
    // return queryString;
  },


  // ************************************USER MAPPING*********************************

  //    save_user_role_record: function (req, res) {
  //   var queryString = "insert into tbl_user_role_mapping(s_user_id,n_role_id,s_created_by,d_created_date) values('"+req.body.s_user_id+"','"+req.body.n_role_id+"','"+req.body.s_created_by+"','"+req.body.d_created_date+"')";P
  //   return queryString;
  // },

  save_user_role_record: function (req, res) {
    // var queryString = "insert into tbl_user_role_mapping(s_user_id,n_role_id,s_created_by,d_created_date,n_status) values('"+req.body.s_user_id+"','"+req.body.n_role_id+"','"+req.body.s_created_by+"','"+req.body.d_created_date+"',0);update tbl_user set s_role='"+req.body.n_role_id+"'  where s_user_id='"+req.body.s_user_id+"'";
    // return queryString;
    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `insert into tbl_user_role_mapping(s_user_id,n_role_id,s_created_by,d_created_date,n_status) values($1,$2,$3,$4,$5)`;

    obj.arr = [data.s_user_id, data.n_role_id, data.s_created_by, d_created_date, '0'];
    return obj;
  },
  update_user_role_record: function (req, res) {

    var obj = {};
    var data = req.body;
    // var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_user set s_role=$1  where s_user_id=$2; `;
    // update tbl_user set s_role=$1 where  s_user_id = $1

    obj.arr = [data.n_role_id, data.s_user_id]
    return obj;
  },
  check_userrole_record: function (req, res) {
    // var queryString = "select * from tbl_user_role_mapping where s_user_id='"+req.body.s_user_id+"' and n_role_id='"+req.body.n_role_id+"'";
    // return queryString;
    var obj = {};
    obj.queryString = "select * from tbl_user_role_mapping where s_user_id=$1 and n_role_id=$2";
    obj.arr = [req.body.s_user_id, req.body.n_role_id];
    return obj;
  },
  update_user_role_Data: function (req, res) {



    // var queryString =`update tbl_user_role_mapping set n_role_id=$$${req.body.n_role_id}$$,s_user_id=$$${req.body.s_user_id}$$,s_modified_by=$$${req.body.s_modified_by}$$,d_modified_date=$$${req.body.d_modified_date}$$   where s_userrole_id = $$${req.body.s_userrole_id}$$;update tbl_user set s_role=$$${req.body.n_role_id}$$ where  s_user_id = $$${req.body.s_user_id}$$`;
    // return queryString;
    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_user_role_mapping set n_role_id=$1,s_user_id=$2,s_modified_by=$3,d_modified_date=$4  where s_userrole_id=$5; `;
    // update tbl_user set s_role=$1 where  s_user_id = $1

    obj.arr = [data.n_role_id, data.s_user_id,
      data.d_modified_by, d_modified_date, data.s_userrole_id
    ]
    return obj;
  },

  // update_user_role_Data: function (req, res) {


  //   var queryString =`update tbl_user_role_mapping set n_role_id=$$${req.body.n_role_id}$$,s_user_id=$$${req.body.s_user_id}$$,s_modified_by=$$${req.body.s_modified_by}$$,d_modified_date=$$${req.body.d_modified_date}$$  where s_userrole_id = $$${req.body.s_userrole_id}$$`;
  //   return queryString;
  // },
  get_user_role_Data: function (req, res) {
    // var queryString = "select * ,getusername(s_user_id) as username,getrolename(n_role_id) as rolename from tbl_user_role_mapping  where n_status!='1' ";
    // //
    // return queryString;
    var obj = {};
    obj.queryString = `select * , getfullname(s_user_id) as username,getrolename(n_role_id) as rolename from tbl_user_role_mapping where n_status!=$1`;
    obj.arr = ['1'];
    return obj;
  },
  getuserroleById: function (req, res) {
    // var queryString = `select * from tbl_user_role_mapping where s_userrole_id = $$${req.body.s_userrole_id}$$ `;
    // return queryString;
    var obj = {};
    obj.queryString = `select * from tbl_user_role_mapping where s_userrole_id=$1`;
    obj.arr = [req.body.s_userrole_id];
    return obj;
  },

  deleteuserroleById: function (req, res) {

    // var queryString =`update tbl_user_role_mapping set n_status='1'  where s_userrole_id = $$${req.body.s_userrole_id}$$`;
    // return queryString;
    var obj = {};
    var data = req.body;
    // var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `delete from  tbl_user_role_mapping  where s_userrole_id=$1`;

    obj.arr = [data.s_userrole_id]
    return obj;
  },


  // ************************************STATUS MASTER*****************************************
  check_statusrecord_record: function (req, res) {
    // var queryString = "select * from tbl_user_role_mapping where s_user_id='"+req.body.s_user_id+"' and n_role_id='"+req.body.n_role_id+"'";
    // return queryString;
    var obj = {};
    obj.queryString = "select * from tbl_status_master where s_status_name=$1 and s_status_type=$2";
    obj.arr = [req.body.s_status_name, req.body.s_status_type];
    return obj;
  },
  save_status_record: function (req, res) {
    // var queryString = "insert into tbl_status_master(s_status_desc,s_status_name,s_status_type,s_status_colorcode,s_created_by,d_created_date,n_status) values('"+req.body.s_status_desc+"','"+req.body.s_status_name+"','"+req.body.s_status_type+"','"+req.body.s_status_colorcode+"','"+req.body.s_created_by+"','"+req.body.d_created_date+"',0)";
    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `insert into tbl_status_master(s_status_desc,s_status_name,s_status_type,s_status_colorcode,s_created_by,d_created_date,n_status) values($1,$2,$3,$4,$5,$6,$7)`;

    obj.arr = [data.s_status_desc, data.s_status_name,
      data.s_status_type, data.s_status_colorcode, data.s_created_by, d_created_date, '0'
    ];
    return obj;

  },
  get_status_Data: function (req, res) {
    if(req.body.idofdelete!=undefined){
      var obj = {};
      obj.queryString = `select *,INITCAP(s_status_desc) AS s_status_desc from tbl_status_master where n_status=$1`;
      obj.arr = ['1'];
      return obj;
    }else{
      var obj = {};
      obj.queryString = `select *,INITCAP(s_status_desc) AS s_status_desc from tbl_status_master where n_status!=$1`;
      obj.arr = ['1'];
      return obj;
    }
   
  // var queryString = "select *, INITCAP(s_status_desc) AS s_status_desc from tbl_status_master where n_status!='1'";
  //   return queryString;
  },
  get_status_Datatype: function (req, res) {
    var obj = {};
    obj.queryString = `select *,INITCAP(s_status_desc) AS s_status_desc from tbl_status_master where s_status_type=$1`;
    obj.arr = [req.body.s_status];
    return obj;
  },
  get_status_Databyid: function (req, res) {
    // var queryString = `select * from tbl_status_master where n_status_no = $$${req.body.n_status_no}$$ `;
    // return queryString;
    var obj = {};
    obj.queryString = `select * from tbl_status_master where n_status_no =$1`;
    obj.arr = [req.body.n_status_no];
    return obj;
  },
  update_status_Data: function (req, res) {

    // var queryString =`update tbl_status_master set s_status_desc=$$${req.body.s_status_desc}$$,s_status_name=$$${req.body.s_status_name}$$,s_status_type=$$${req.body.s_status_type}$$,s_status_colorcode=$$${req.body.s_status_colorcode}$$,s_modified_by=$$${req.body.s_modified_by}$$,d_modified_date=$$${req.body.d_modified_date}$$ ,n_status='0' where n_status_no = $$${req.body.n_status_no}$$`;
    // return queryString;
    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_status_master set s_status_desc=$1,s_status_name=$2,s_status_type=$3,s_status_colorcode=$4,s_modified_by=$5,d_modified_date=$6,n_status=$7  where n_status_no=$8`;

    obj.arr = [data.s_status_desc, data.s_status_name, data.s_status_type,
      data.s_status_colorcode, data.s_modified_by, d_modified_date, '0', data.n_status_no
    ]
    return obj;
  },

  deletestatusById: function (req, res) {



    // var queryString =`update tbl_status_master set n_status='1'  where n_status_no = $$${req.body.n_status_no}$$`;
    // return queryString;
    var obj = {};
    var data = req.body;
    // var d_modified_date = dbValidation.newDatetimeInInteger(new Date());

    obj.queryString = `delete from  tbl_status_master where  n_status_no=$1`;

    obj.arr = [data.n_status_no]
    return obj;
  },
  // ########################################## AFRIN ##################################$$$$$$$$$$   
  // ########################################## AFRIN ##################################$$$$$$$$$$   


  check_Rack: function (req, res) {
    var obj = {};
    obj.queryString = "select * from tbl_Rack_master where s_Rack_name=$1 or s_racK_code=$2";
    obj.arr = [req.body.s_rack_name, req.body.s_rack_code];
    return obj;

  },
  Save_Rack_Data: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    if (data.s_racku_no <= 48) {
      obj.queryString = `insert into tbl_rack_master(s_rack_name,s_racku_no,n_datacenter_id,s_rack_code,n_rack_status,n_door_id,n_room_id,s_rack_model,n_status,s_created_by,d_created_date) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`;
      obj.arr = [data.s_rack_name, data.s_racku_no, data.n_datacenter_id, data.s_rack_code, data.n_rack_status, data.n_door_id, data.n_room_id, data.s_rack_model, '0', data.s_created_by, d_created_date];
      return obj;
    }
  },
  get_Rack_Data: function (req, res) {
    var obj = {};
    obj.queryString = `select *,getdatacentename(n_datacenter_id) as datacentername,getroom(n_room_id) as room,getrackname(n_rack_id) as rackname,getfloor(n_door_id) as floor,getstatus(n_rack_status) as status from tbl_rack_master where n_status=$1 or n_status=$2`;
    obj.arr = [0,2];
    return obj;
  },
  get_Rack_Data_byid: function (req, res) {
    var obj = {};
    obj.queryString = `select * from tbl_rack_master where n_rack_id=$1`;
    obj.arr = [req.body.n_rack_id];
    return obj;
  },
  get_Deleted_Rack_Data: function (req, res) {
    var obj = {};
    obj.queryString = `select *,getdatacentename(n_datacenter_id) as datacentername,getroom(n_room_id) as room,getrackname(n_rack_id) as rackname,getfloor(n_door_id) as floor,getstatus(n_rack_status) as status from tbl_rack_master where n_status=$1`;
    obj.arr = [1];
    return obj;
  },
  update_Rack_Data: function (req, res) {
    var obj = {};
    var data = req.body;
    if (data.s_racku_no <= 48) {
      var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
      obj.queryString = `update tbl_rack_master set s_rack_name=$1,s_racku_no=$2,n_datacenter_id=$3,s_rack_code=$4,n_rack_status=$5,n_door_id=$6,n_room_id=$7,s_rack_model=$8,s_modified_by=$9,d_modified_date=$10,n_status=$11 where n_rack_id=$12;`

      obj.arr = [data.s_rack_name, data.s_racku_no, data.n_datacenter_id, data.s_rack_code, data.n_rack_status, data.n_door_id, data.n_room_id, data.s_rack_model, data.s_modified_by, d_modified_date,'2',data.n_rack_id];
      return obj;
    }
  },
  Delete_Rack_Data: function (req, res) {
    var obj = {};
    var data = req.body;
    obj.queryString = `update tbl_rack_master set n_status=$1 where n_rack_id=$2;`

    obj.arr = ['1', data.n_rack_id];
    return obj;
  },
  Update_Racku_Data: function (req, res) {
    var obj = {};
    var data = req.body;
    obj.queryString = `update tbl_racku_master set n_status=$1 where n_rack_id=$2;`
    obj.arr = ['1', data.n_rack_id];
    return obj;
  },

  get_data_center_room: function (req, res) {
    var obj = {};
    var data = req.body;
    obj.queryString = `select * from tbl_datacenter_room where n_door_id=$1;`
    obj.arr = [data.n_door_id];
    return obj;

  },

  deleteroomrecord: function (req, res) {

    var obj = {};
    obj.queryString = `select *,getdatacentename(n_datacenter_id) as datacentername,getfloor(n_door_id) as floor from tbl_datacenter_room where n_status=$1`;
    obj.arr = ['1'];
    return obj;


  },


  get_floor_loc: function (req, res) {
    var obj = {};
    var data = req.body;
    obj.queryString = `select * from tbl_datacenter_door where n_datacenter_id=$1;`
    obj.arr = [data.n_datacenter_id];
    return obj;

  },
  // get_data_center: function (req, res) {

  //   var queryString = `select *,getdatacentename(n_datacenter_id) as datacentername from tbl_datacenter_location`;
  //   return queryString;
  // },
  // *RACKU MASTER **

  get_RackU_Data: function (req, res) {
    var obj = {};
    obj.queryString = ` select * ,getrackname(n_rack_id) as rackname, getstatus(n_racku_status) as status  from tbl_racku_master  where n_status=$1 order by n_u_id asc`;
    obj.arr = [0];
    return obj;
  },


  get_RackU_Data_byid: function (req, res) {
    var obj = {};
    obj.queryString = `select * ,getrackname(n_rack_id) as rackname from tbl_racku_master where n_u_id=$1`;
    obj.arr = [req.body.n_u_id];
    return obj;
  },
  get_Deleted_RackU_Data: function (req, res) {
    var obj = {};
    obj.queryString = ` select * ,getrackname(n_rack_id) as rackname, getstatus(n_racku_status) as status  from tbl_racku_master  where n_status=$1 order by n_u_id asc`;
    obj.arr = [1];
    return obj;
  },
  update_RackU_Data: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_racku_master set n_racku_status=$1,s_modified_by=$2,d_modified_date=$3 where n_u_id=$4;`
    obj.arr = [data.n_racku_status, data.s_modified_by, d_modified_date, data.n_u_id];
    return obj;
  },
  // Delete_RackU_Data: function (req, res) {
  //   var obj = {};
  //   var data = req.body;
  //   obj.queryString = `update tbl_racku_master set n_status=$1 where n_u_id=$2;`
  //   obj.arr = ['1', data.n_u_id];
  //   return obj;
  // },
  Delete_RackU_Data: function (req, res) {
    var obj = {};
    var data = req.body;
    obj.queryString = `update tbl_racku_master set n_status=$1 where n_u_id=$2`;
    obj.arr = ['1', data.n_u_id];
    return obj;
  },
  update_racku_afterdelete: function (req, res) 
  {
    var obj = {};
    var data = req.body;
    obj.queryString = `update tbl_rack_master set n_status=$1 where n_rack_id=$2;`;
    obj.arr = ['0', data.n_rack_id];
    return obj;

  },
  update_rackuno_data: function (req, res,id) {
    var rackuno=id;
    var racku=rackuno-1;
    var obj = {};
      //   // var queryString = `update tbl_rack_master set s_racku_no=$$${remaining_racku}$$ where n_rack_id=${req.body.n_rack_id};`

    // obj.queryString = `update tbl_datacenter_location set s_floor_loc=$1 where n_datacenter_id=$2`;
      obj.queryString = `update tbl_rack_master set s_racku_no=$1 where n_rack_id=$2`;
    obj.arr = [racku,req.body.n_rack_id];
    return obj;
  },
  update_floorno_data: function (req, res,id) {
    var rackuno=id; 
    var obj = {};
    // obj.queryString = `update tbl_datacenter_location set s_floor_loc=$1 where n_datacenter_id=$2`;
      obj.queryString = `update tbl_rack_master set s_racku_no=$1 where n_rack_id=$2`;
    obj.arr = [rackuno,req.body.n_rack_id];
    return obj;
  },
  select_racku_data: function (req, res) {
    var obj = {};
    var data = req.body;
    obj.queryString = `SELECT s_racku_no as racku FROM tbl_rack_master WHERE n_rack_id=$1 and n_status=$2 or n_status=$3`;
    obj.arr = [data.n_rack_id,'0','2'];
    return obj;
  },
  // select_racku_data: function (req, res) {
  //   var obj = {};
  //   var data = req.body;
  //   obj.queryString = `SELECT count(s_racku_no) as racku FROM tbl_rack_master WHERE n_rack_id=$1and n_status=$2`;
  //   obj.arr = [data.n_rack_id,'0'];
  //   // var queryString = `SELECT s_racku_no as racku FROM tbl_rack_master WHERE n_rack_id=${req.body.n_rack_id};`
  //   return obj;
  // },
 
  // update_rackuno_data: function (req, res, id) {
  //   var rackuno = id;
  //   var remaining_racku = rackuno - 1;
  //   var obj = {};
  //   var data = req.body;
  //   // obj.queryString  = `update tbl_rack_master set s_racku_no=$1 where n_rack_id=$2;`
  //   obj.queryString = `update tbl_rack_master set n_status=$1, s_racku_no=$2  where n_rack_id=$3;`

  //   obj.arr = ['2', remaining_racku, data.n_rack_id];
  //   // var queryString = `update tbl_rack_master set s_racku_no=$$${remaining_racku}$$ where n_rack_id=${req.body.n_rack_id};`

  //   return obj;
  // },

  // *ASSET  MASTER **
  check_Asset: function (req, res) {
    var obj = {};
    obj.queryString = "select * from tbl_asset_master where s_asset_name=$1";
    obj.arr = [req.body.s_asset_name];
    return obj;
  },
  Save_Asset_Data: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `insert into tbl_asset_master(s_asset_name,n_asset_no,s_manufacturer_name,s_make,n_model_no,s_device_category,n_serial_number,n_barcode_number,s_owner_name,s_owner_email,n_u_size,n_u_position,d_install_date,n_u_height,s_supplier,s_rated_power, s_rated_current,n_rated_voltage,s_maintenance_cycle,s_contact_person,n_contact_number,d_next_maintenance,s_customized_notes,n_status,s_created_by,d_created_date) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)`;

    obj.arr = [data.s_asset_name, data.n_asset_no, data.s_manufacturer_name,
      data.s_make, data.n_model_no, data.s_device_category, data.n_serial_number, data.n_barcode_number, data.s_owner_name, data.s_owner_email, data.n_u_size, data.n_u_position, data.d_install_date, data.n_u_height, data.s_supplier, data.s_rated_power, data.s_rated_current, data.n_rated_voltage, data.s_maintenance_cycle, data.s_contact_person, data.n_contact_number, data.d_next_maintenance, data.s_customized_notes, '0', data.s_created_by, d_created_date
    ];
    return obj;
  },

  get_Asset_Data: function (req, res) {
    var obj = {};
    obj.queryString = `select * from tbl_asset_master where n_status=$1 `;
    obj.arr = [0];
    return obj;
  },
  get_Asset_Data_byid: function (req, res) {
    var obj = {};
    obj.queryString = `select *from tbl_asset_master where n_asset_id=$1 `;
    obj.arr = [req.body.n_asset_id];
    return obj;
  },
  get_Deleted_Asset_Data: function (req, res) {
    var obj = {};
    obj.queryString = `select * from tbl_asset_master where n_status=$1 `;
    obj.arr = [1];
    return obj;
  },
  update_Asset_Data: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_asset_master set s_asset_name=$1,n_asset_no=$2,s_manufacturer_name=$3,s_make=$4,n_model_no=$5,s_device_category=$6,n_serial_number=$7,n_barcode_number=$8,s_owner_name=$9,s_owner_email=$10,n_u_size=$11,n_u_position=$12,d_install_date=$13,n_u_height=$14,s_supplier=$15,s_rated_power=$16,s_rated_current=$17,n_rated_voltage=$18,s_maintenance_cycle=$19,s_contact_person=$20,n_contact_number=$21,d_next_maintenance=$22,s_customized_notes=$23,s_modified_by=$24,d_modified_date=$25  where n_asset_id=$26`;

    obj.arr = [data.s_asset_name, data.n_asset_no, data.s_manufacturer_name,
      data.s_make, data.n_model_no, data.s_device_category, data.n_serial_number, data.n_barcode_number, data.s_owner_name, data.s_owner_email, data.n_u_size, data.n_u_position, data.d_install_date, data.n_u_height, data.s_supplier, data.s_rated_power, data.s_rated_current, data.n_rated_voltage, data.s_maintenance_cycle, data.s_contact_person, data.n_contact_number, data.d_next_maintenance, data.s_customized_notes, data.s_modified_by, d_modified_date, data.n_asset_id
    ]
    return obj;
  },
  Delete_Asset_Data: function (req, res) {
    var obj = {};
    obj.queryString = `update  tbl_asset_master set n_status=$1 where n_asset_id=$2`;
    obj.arr = ['1', req.body.n_asset_id];
    return obj;
  },


  // *ASSET MAPPING **
  check_Asset_Map: function (req, res) {
    var obj = {};
    obj.queryString = "select * from tbl_asset_mapping where n_datacenter_id=$1 and n_door_id=$2 and n_room_id=$3 and n_rack_id=$4 and n_asset_id=$5 and n_u_id=$6";
    obj.arr = [req.body.n_datacenter_id, req.body.n_door_id, req.body.n_room_id, req.body.n_rack_id, req.body.n_asset_id, req.body.n_u_id];
    return obj;
  },
  Save_Asset_Map_Data: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `insert into tbl_asset_mapping (n_datacenter_id,n_door_id,n_room_id,n_u_id,n_rack_id,n_asset_id,n_status_no,d_assign_date,n_status,s_created_by,d_created_date) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`;
    obj.arr = [data.n_datacenter_id, data.n_door_id, data.n_room_id, data.n_u_id, data.n_rack_id, data.n_asset_id, data.n_status_no, data.d_assign_date, '0', data.s_created_by, d_created_date];
    return obj;
  },
  get_Asset_Map_Data: function (req, res) {
    var obj = {};
    obj.queryString = `select *,getdatacentename(n_datacenter_id) as datacentername,getfloor(n_door_id) as floor,getroom(n_room_id) as room,getrackname(n_rack_id)  as rackname,getstatus(n_status_no) as status , getasset(n_asset_id) as asset,getracku(array[n_u_id]) as racku from tbl_asset_mapping where n_status=$1`;
    obj.arr = [0];
    return obj;
  },
  get_Asset_Map_Data_byid: function (req, res) {
    var obj = {};
    obj.queryString = `select * from tbl_asset_mapping  where n_asset_mapping_id=$1`;
    obj.arr = [req.body.n_asset_mapping_id];

    return obj;
    // var queryString = `select * from tbl_asset_mapping  where n_asset_mapping_id=${req.body.n_asset_mapping_id}`;
    // return queryString;
  },
  get_Deleted_Asset_Map_Data: function (req, res) {
    var obj = {};
    obj.queryString = `select *,getdatacentename(n_datacenter_id) as datacentername,getfloor(n_door_id) as floor,getroom(n_room_id) as room,getrackname(n_rack_id)  as rackname,getstatus(n_status_no) as status , getasset(n_asset_id) as asset,getracku(array[n_u_id]) as racku from tbl_asset_mapping where n_status=$1`;
    obj.arr = [1];
    return obj;
  },
  update_Asset_Map_Data: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_asset_mapping  set n_datacenter_id=$1,n_door_id=$2,n_room_id=$3,n_u_id=$4,n_rack_id=$5,n_asset_id=$6,n_status_no=$7,d_assign_date=$8,s_modified_by=$9,d_modified_date=$10 where n_asset_mapping_id=$11`;

    obj.arr = [data.n_datacenter_id, data.n_door_id, data.n_room_id, data.n_u_id, data.n_rack_id, data.n_asset_id, data.n_status_no, data.d_assign_date, data.s_modified_by, d_modified_date, data.n_asset_mapping_id]
    return obj;

  },
  Delete_Asset_Map_Data: function (req, res) {
    var obj = {};
    obj.queryString = `update  tbl_asset_mapping set n_status=$1 where n_asset_mapping_id=$2`;
    obj.arr = ['1', req.body.n_asset_mapping_id];
    return obj;
  },
  get_rack: function (req, res) {
    var obj = {};
    obj.queryString = `select *,getrackname(n_rack_id) as rackname from tbl_rack_master where n_room_id=$1 and n_status=$2`;
    obj.arr = [req.body.n_room_id, '0'];
    return obj;

  },

  get_n_u_id: function (req, res) {
    var obj = {};
    obj.queryString = `select * from tbl_racku_master where n_rack_id=$1 and n_status=$2 order by n_u_id asc`;
    obj.arr = [req.body.n_rack_id, '0'];
    return obj;
  },
  get_asset_desc: function (req, res) {
    var obj = {};
    obj.queryString = `select * from tbl_asset_master where  n_status=$1`;
    obj.arr = ['0'];
    return obj
  },
  get_status: function (req, res) {
    var queryString = `select * from tbl_status_master`;
    return queryString;
  },

  // ########################################## AFRIN ##################################$$$$$$$$$$    //



  // ########################################## ASMITA ##################################$$$$$$$$$$    


  // ************************************COUNTRY MASTER*****************************************



  save_country_record: function (req, res) {


    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `insert into tbl_country_master(s_country_name,s_created_by,d_created_date) values($1,$2,$3)`;

    obj.arr = [data.s_country_name, data.s_created_by, d_created_date];
    return obj;


  },


  check_country_record: function (req, res) {

    var obj = {};
    obj.queryString = "select * from tbl_country_master where s_country_name=$1";
    obj.arr = [req.body.s_country_name];
    return obj;

  },

  get_country_Data: function (req, res) {

    var obj = {};
    obj.queryString = `select * from tbl_country_master where n_status=$1`;
    obj.arr = ['0'];
    return obj;


    // var queryString = `select * from tbl_country_master where n_status='0'`;
    // return queryString;
  },
  get_country_Databyid: function (req, res) {

    var obj = {};
    obj.queryString = `select * from tbl_country_master where n_country_id=$1`;
    obj.arr = [req.body.n_country_id];
    return obj;

  },
  update_country_Data: function (req, res) {

    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_country_master set s_country_name=$1,s_modified_by=$2,d_modified_date=$3  where n_country_id=$4`;

    obj.arr = [data.s_country_name, data.s_modified_by, d_modified_date, data.n_country_id]
    return obj;


  },

  deletecountryById: function (req, res) {

    var obj = {};
    obj.queryString = ` update tbl_country_master set n_status=1 where n_country_id = $1`;

    obj.arr = [req.body.n_country_id];
    return obj;


  },

  // ************************************STATE MASTER*****************************************


  save_state_record: function (req, res) {

    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `insert into tbl_state_master(s_state_name,n_country_id,s_created_by,d_created_date) 

values($1,$2,$3,$4)`;

    obj.arr = [data.s_state_name, data.n_country_id, data.s_created_by, d_created_date];
    return obj;


  },

  check_state_record: function (req, res) {

    var obj = {};
    obj.queryString = "select * from tbl_state_master where s_state_name=$1";
    obj.arr = [req.body.s_state_name];
    return obj;



  },
  get_state_Data: function (req, res) {
    var obj = {};
    obj.queryString = `select *,getcountry(n_country_id) as country from tbl_state_master where n_status=$1`;
    obj.arr = ['0'];
    return obj;


    // var queryString = `select *,getcountry(n_country_id) as country from tbl_state_master where n_status='0'`;
    // return queryString;
  },

  get_state_Databyid: function (req, res) {

    var obj = {};
    obj.queryString = `select * from tbl_state_master where n_state_id=$1`;
    obj.arr = [req.body.n_state_id];
    return obj;
  },
  update_state_Data: function (req, res) {

    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_state_master set s_state_name=$1,n_country_id=$2,s_modified_by=$3,d_modified_date=$4  where n_state_id=$5`;

    obj.arr = [data.s_state_name, data.n_country_id, data.s_modified_by, d_modified_date, data.n_state_id]
    return obj;

  },
  deletestateById: function (req, res) {

    var obj = {};
    obj.queryString = `update tbl_state_master set n_status=1 where n_state_id=$1`;
    obj.arr = [req.body.n_state_id];
    return obj;

  },



  // ************************************DATA CENTER LOCATION*****************************************
  save_datacenter_location_record: function (req, res) {


    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `insert into tbl_datacenter_location(s_floor_loc,s_datacenter_name,s_datacenter_address,n_datacenter_pincode,s_datacenter_landmark,s_datacenter_desc,n_country_id,n_state_id,s_created_by,d_created_date) 

values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;

    obj.arr = [data.s_floor_loc, data.s_datacenter_name, data.s_datacenter_address, data.n_datacenter_pincode, data.s_datacenter_landmark, data.s_datacenter_desc, data.n_country_id, data.n_state_id, data.s_created_by, d_created_date];
    return obj;


  },
  get_datacenter_location_Data: function (req, res) {
    var obj = {};
    obj.queryString = `select *,getcountry(n_country_id) as country,getstate(n_state_id)  as state from tbl_datacenter_location where n_status=$1`;
    obj.arr = ['0'];
    return obj;

    // var queryString = `select *,getcountry(n_country_id) as country,getstate(n_state_id)  as state from tbl_datacenter_location where n_status='0'`;
    // return queryString;


  },
  get_datacenter_location_Databyid: function (req, res) {


    var obj = {};
    obj.queryString = `select * from tbl_datacenter_location where n_datacenter_id=$1`;
    obj.arr = [req.body.n_datacenter_id];
    return obj;
  },
  update_datacenter_location_Data: function (req, res) {




    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_datacenter_location set s_floor_loc=$1,s_datacenter_desc=$2,n_country_id=$3,n_state_id=$4,s_datacenter_name=$5,s_datacenter_address=$6,n_datacenter_pincode=$7,s_datacenter_landmark=$8,s_modified_by=$9,d_modified_date=$10 ,statusof_trigger=$11 where n_datacenter_id=$12`;
  
  obj.arr = [data.s_floor_loc, data.s_datacenter_desc, data.n_country_id,data.n_state_id,data.s_datacenter_name,data.s_datacenter_address,data.n_datacenter_pincode,data.s_datacenter_landmark,data.s_modified_by,d_modified_date,'2',data.n_datacenter_id]
    return obj;




  },

  delete_datacenter_location_ById: function (req, res) {


    var obj = {};
    obj.queryString = `update tbl_datacenter_location set n_status=1 where n_datacenter_id=$1`;
    obj.arr = [req.body.n_datacenter_id];
    return obj;

  },
  get_state_id: function (req, res) {

    var queryString = `select * from tbl_state_master where n_country_id=${req.body.n_country_id} and n_status='0'`;
    return queryString;
  },



  deletelocationrecord: function (req, res) {
    var obj = {};
    obj.queryString = `select *,getcountry(n_country_id) as country,getstate(n_state_id)  as state from tbl_datacenter_location where n_status=$1`;
    obj.arr = ['1'];
    return obj;

  },


  // ************************************DATA CENTER ROOM*****************************************

  save_datacenter_room_record: function (req, res) {

    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `insert into tbl_datacenter_room(n_room_no,s_desc,n_door_id,n_datacenter_id,s_created_by,d_created_date) 

values($1,$2,$3,$4,$5,$6)`;

    obj.arr = [data.n_room_no, data.s_desc, data.n_door_id, data.n_datacenter_id, data.s_created_by, d_created_date];
    return obj;


  },
  get_datacenter_room_Data: function (req, res) {

    var obj = {};
    obj.queryString = `select *,getdatacentename(n_datacenter_id) as datacentername,getfloor(n_door_id) as floor from tbl_datacenter_room where n_status=$1`;
    obj.arr = ['0'];
    return obj;

    // var queryString = `select *,getdatacentename(n_datacenter_id) as datacentername,getfloor(n_door_id) as floor from tbl_datacenter_room where n_status='0'`;
    // return queryString;


  },
  get_datacenter_room_ById: function (req, res) {


    var obj = {};
    obj.queryString = `select * from tbl_datacenter_room where n_room_id=$1`;
    obj.arr = [req.body.n_room_id];
    return obj;


  },
  update_datacenter_room_Data: function (req, res) {



    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_datacenter_room set n_room_no=$1,s_desc=$2,n_door_id=$3,n_datacenter_id=$4,s_modified_by=$5,d_modified_date=$6  where n_room_id=$7`;

    obj.arr = [data.n_room_no, data.s_desc, data.n_door_id, data.n_datacenter_id, data.s_modified_by, d_modified_date, data.n_room_id]
    return obj;


  },

  delete_datacenter_room_ById: function (req, res) {


    var obj = {};
    obj.queryString = `update tbl_datacenter_room set n_status=1 where n_room_id=$1`;
    obj.arr = [req.body.n_room_id];
    return obj;

  },


  // ************************************DATA CENTER DOOR*****************************************
  check_room_record: function (req, res) {


    var obj = {};
    obj.queryString = "select * from tbl_datacenter_room where n_room_no=$1";
    obj.arr = [req.body.n_room_no];
    return obj;


  },
  get_location_details: function (req, res) {

    var queryString = `select s_datacenter_name,s_datacenter_address,n_datacenter_pincode,s_datacenter_landmark from tbl_datacenter_location where n_datacenter_id=${req.body.n_datacenter_id}`;
    return queryString;
  },
  save_datacenter_door_record: function (req, res) {


    var obj = {};

    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());

    obj.queryString = `insert into tbl_datacenter_door(n_datacenter_id,s_door_sensor_id,s_floor_loc,s_datacenter_location,s_created_by,d_created_date) 

  values($1,$2,$3,$4,$5,$6)`;

    obj.arr = [data.n_datacenter_id, data.s_door_sensor_id, data.s_floor_loc, data.s_datacenter_location, data.s_created_by, d_created_date];
    return obj;


  },
  get_datacenter_door_Data: function (req, res) {
    var obj = {};
    obj.queryString = `select *,getdatacentename(n_datacenter_id) as datacentername,getdatacenterlocation(n_datacenter_id) as datacenter_location from tbl_datacenter_door where n_status=$1`;
    obj.arr = ['0'];
    return obj;

    // var queryString = `select *,getdatacentename(n_datacenter_id) as datacentername,getdatacenterlocation(n_datacenter_id) as datacenter_location from tbl_datacenter_door where n_status='0'`;
    // return queryString;


  },



  deletedoorrecord: function (req, res) {
    var obj = {};
    obj.queryString = `select *,getdatacentename(n_datacenter_id) as datacentername,getdatacenterlocation(n_datacenter_id) as datacenter_location from tbl_datacenter_door where n_status=$1`;
    obj.arr = ['1'];
    return obj;


  },




  get_datacenter_door_ById: function (req, res) {

    var obj = {};
    obj.queryString = `select * from tbl_datacenter_door where n_door_id=$1`;
    obj.arr = [req.body.n_door_id];
    return obj;


  },
  update_datacenter_door_Data: function (req, res) {




    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_datacenter_door set s_datacenter_location=$1,n_datacenter_id=$2,s_door_sensor_id=$3,s_floor_loc=$4,s_modified_by=$5,d_modified_date=$6  where n_door_id=$7`;

    obj.arr = [data.s_datacenter_location, data.n_datacenter_id, data.s_door_sensor_id, data.s_floor_loc, data.s_modified_by, d_modified_date, data.n_door_id]
    return obj;

  },

  delete_datacenter_door_ById: function (req, res) {



    var obj = {};
    obj.queryString = `update tbl_datacenter_door set n_status=1 where n_door_id=$1`;
    obj.arr = [req.body.n_door_id];
    return obj;
  },
  update_door_afterdelete: function (req, res) 
  {
    var obj = {};
    var data = req.body;
   
    obj.queryString = `update tbl_datacenter_location  set statusof_trigger=$1 where n_datacenter_id=$2`;
    obj.arr = ['1',req.body.n_datacenter_id]
    
    return obj;

  },

  select_datacenter_data: function (req, res) {
    var obj = {};
    obj.queryString = `SELECT count(n_door_id) as floor FROM tbl_datacenter_door WHERE n_datacenter_id=$1 and n_status=$2`;
    obj.arr = [req.body.n_datacenter_id,'0'];
    return obj;
  },

  update_floorno_data: function (req, res, id) {
    var floorno = id;
    var obj = {};
    // obj.queryString = `update tbl_datacenter_location set s_floor_loc=$1 where n_datacenter_id=$2`;
      obj.queryString = `update tbl_datacenter_location set s_floor_loc=$1 where n_datacenter_id=$2`;
    obj.arr = [floorno,req.body.n_datacenter_id];
    return obj;
  },


  //##############################################asmita end##########################################################
  // ############################################## GANESH #############################################


  // ************************************ALERT MASTER*****************************************
  check_alert: function (req, res) {
    var obj = {};
    obj.queryString = "select * from tbl_alert_master where n_alert_code=$1";
    obj.arr = [req.body.n_alert_code];
    return obj;
  },
  insert_alert: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `INSERT INTO tbl_alert_master  (n_alert_code,s_alert_name, s_alert_msg_desc, s_created_by,d_created_date,n_status) VALUES ($1,$2,$3,$4,$5,$6);`;
    obj.arr = [data.n_alert_code, data.s_alert_name, data.s_alert_msg_desc,
      data.s_user_name, d_created_date, '0'
    ];
    return obj;

  },

  get_alert_Data: function (req, res) {
    var queryString = `select * from tbl_alert_master where n_status = 0;`;
    return queryString;
  },

  get_alert_detail: function (req, res) {

    var obj = {};
    var data = req.body;
    // var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `select * from tbl_alert_master where n_alert_id=$1`;
    obj.arr = [data.n_alert_id];
    return obj;


  },
  get_deleted_alert_Data: function (req, res) {

    var obj = {};
    var data = req.body;
    // var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `select * from tbl_alert_master where n_status=$1`;
    obj.arr = [data.n_status];
    return obj;


  },


  update_alert: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_alert_master set n_alert_code = $1,s_alert_name = $2,s_alert_msg_desc=$3,s_modified_by=$4,d_modified_date=$5  where n_alert_id=$6`;

    obj.arr = [data.n_alert_code, data.s_alert_name, data.s_alert_msg_desc, data.s_user_name, d_modified_date, data.n_alert_id]
    return obj;
  },


  deletealert_rec: function (req, res) {
    var obj = {};
    obj.queryString = `update tbl_alert_master set  n_status = 1   where n_alert_id=$1`;
    obj.arr = [req.body.n_alert_id];
    return obj;
  },
  // ************************************CUSTOM FILEDS*****************************************
  get_fieldDeleted_Data: function (req, res) {
    var obj = {};
    var data = req.body;

    obj.queryString = `select * from tbl_custom_fields where n_status =$1;`;

    obj.arr = ['0'];
    return obj;

  },
  deletefield_rec: function (req, res) {
    var obj = {};
    obj.queryString = `update tbl_custom_fields set  n_status =1   where n_customfield_id=$1`;
    obj.arr = [req.body.n_customfield_id];
    return obj;
  },
  check_fields: function (req, res) {
    var obj = {};
    obj.queryString = "select * from tbl_custom_fields where s_tbl_name=$1 and s_field_type=$2 and s_field_nam=$3";
    obj.arr = [req.body.s_tbl_name, req.body.s_field_type, req.body.s_field_nam];
    return obj;
  },

  // Add_field: function (req, res) 
  // {
  //   var obj = {};
  //   var data = req.body;
  //   var d_created_date = dbValidation.newDatetimeInInteger(new Date());
  //   obj.queryString = `INSERT INTO tbl_custom_fields  (s_tbl_name, s_field_nam, s_field_type,s_created_by,d_created_date,n_status) VALUES ($1,$2,$3,$4,$5,$6);`;
  //   obj.arr = [data.s_tbl_name, data.s_field_nam, data.s_field_type,data.s_user_name, d_created_date, '0'];
  //   return obj;

  // },

  Add_field: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `INSERT INTO tbl_custom_fields  (s_tbl_name, s_field_nam, s_field_type,s_placeholder,s_default_val,s_created_by,d_created_date,n_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`;
    obj.arr = [data.s_tbl_name, data.s_field_nam, data.s_field_type, data.s_placeholder, data.s_default_val, data.s_user_name, d_created_date, '0'];
    return obj;

  },

  get_field_detail: function (req, res) {

    var obj = {};
    var data = req.body;
    // var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `select * from tbl_custom_fields where n_customfield_id=$1`;
    obj.arr = [data.n_customfield_id];
    return obj;


  },

  get_field_Data: function (req, res) {
    var obj = {};
    var data = req.body;
    // var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `select * from tbl_custom_fields where n_status!=$1`;
    obj.arr = ['1'];
    return obj;
  },
  //   update_field: function (req, res) {
  //     var obj = {};
  //     var data = req.body;
  //     var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
  //     obj.queryString = `update tbl_custom_fields set s_tbl_name = $1,s_field_nam = $2,s_field_type=$3,s_modified_by=$4,d_modified_date=$5  where n_customfield_id=$6`;

  //   obj.arr = [data.s_tbl_name, data.s_field_nam, data.s_field_type,d_modified_date, data.d_modified_date, data.n_customfield_id]
  //   return obj;
  // },
  update_field: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_custom_fields set s_tbl_name = $1,s_field_nam = $2,s_field_type=$3,s_placeholder=$4,s_default_val=$5,s_modified_by=$6,d_modified_date=$7  where n_customfield_id=$8`;

    obj.arr = [data.s_tbl_name, data.s_field_nam, data.s_field_type, data.s_placeholder, data.s_default_val, data.s_modified_by, d_modified_date, data.n_customfield_id]
    return obj;
  },
  deletefield_rec: function (req, res) {
    var obj = {};
    obj.queryString = `update tbl_custom_fields set  n_status = 1   where n_customfield_id=$1`;
    obj.arr = [req.body.n_customfield_id];
    return obj;
  },




  // ************************************ALERT TRANSACTION*****************************************
  getAllalert: function (req, res) {
    var queryString = `select * from tbl_alert_master;`;
    return queryString;
  },
  deleted_data: function (req, res) {
    var obj = {};
    obj.queryString = `select * ,gealertmsg(n_alert_id) as alert,getasset(n_asset_id) as asset from tbl_alert_transaction where n_status=$1;`;
    obj.arr = ["1"];
    return obj;
  },

  get_asset: function (req, res) {
    var queryString = `select * from tbl_asset_master;`;
    return queryString;
  },
  get_alerttransaction_Data: function (req, res) {
    var obj = {};
    obj.queryString = `select * ,gealertmsg(n_alert_id) as alert,getasset(n_asset_id) as asset,getracku(n_u_id)  from tbl_alert_transaction where n_status=$1;`;
    obj.arr = ['0'];
    return obj;
  },
  check_alerttransaction: function (req, res) {
    var obj = {};
    // obj.queryString = "select *,gealertmsg(n_alert_id) as alert,getasset(n_asset_id) as asset, gettag(n_u_id) as tag  from tbl_alert_transaction where n_asset_id= $1 and n_u_id=$2 and n_alert_id=$3";
    obj.queryString = "select * from tbl_alert_transaction where n_asset_id= $1 and n_u_id=$2 and n_alert_id=$3";
    obj.arr = [req.body.n_asset_id, req.body.n_u_id, req.body.n_alert_id];
    return obj;
  },

  insert_alerttransaction: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `INSERT INTO tbl_alert_transaction  (s_alert_desc , n_asset_id ,  n_u_id ,  d_date , n_email , n_alert_id , s_notify_user , s_created_by,d_created_date,n_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`;
    obj.arr = [data.s_alert_desc, data.n_asset_id, data.n_u_id, data.d_date, data.n_email, data.n_alert_id, data.s_notify_user, data.s_user_name, d_created_date, '0'];
    return obj;

  },

  edit_alerttransaction: function (req, res) {

    var obj = {};
    var data = req.body;
    // var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `select * from tbl_alert_transaction where n_alert_trans_id=$1`;
    obj.arr = [data.n_alert_trans_id];
    return obj;


  },
  update_alerttransaction: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_alert_transaction set s_alert_desc = $1,n_asset_id=$2,n_u_id=$3 ,d_date=$4 ,n_email=$5,n_alert_id=$6,s_notify_user=$7,s_modified_by=$8,d_modified_date=$9   where n_alert_trans_id=$10`;

    obj.arr = [data.s_alert_desc, data.n_asset_id, data.n_u_id, data.d_date, data.n_email, data.n_alert_id, data.s_notify_user, data.s_user_name, d_modified_date, data.n_alert_trans_id]
    return obj;
  },

  deletealerttransaction: function (req, res) {
    var obj = {};
    obj.queryString = `update tbl_alert_transaction set  n_status = 1   where n_alert_trans_id=$1`;
    obj.arr = [req.body.n_alert_trans_id];
    return obj;
  },

  // *************************************** SYSTEM PARAMETER***********************************************************

  GetSystemDeletedData: function (req, res) {
    var obj = {};
    var data = req.body;

    obj.queryString = `select * from tbl_system_parameter where n_status=$1;`;

    obj.arr = ['1'];
    return obj;

  },
  getImage_data: function (req, res) {
    var obj = {};
    var data = req.body;
    if (data.n_system_param_id == '' || data.n_system_param_id == undefined) {
      obj.queryString = `select *  from tbl_temp_img where s_created_by=$1`;

      obj.arr = [data.s_created_by];


    } else if (data.n_system_param_id != "") {
      obj.queryString = `select *  from tbl_attachment_master where n_system_param_id=$1`;
      obj.arr = [data.n_system_param_id];

    }

    return obj;
  },

  deleteImg: function (req, res) {
    var obj = {};
    var data = req.body;
    if (req.body.key == 1) {


      obj.queryString = `delete from tbl_temp_img   where n_img_id=$1 and s_created_by= $2; `;

      obj.arr = [data.id, data.s_created_by];

    } else {

      obj.queryString = `delete from tbl_attachment_master   where n_system_param_id=$1 and s_created_by= $2;`;

      obj.arr = [data.id, data.s_created_by];
    }
    return obj;
  },
  insert_systemParameter: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `INSERT INTO tbl_system_parameter  ( s_email_setting ,  s_captha_setting ,  s_database_connection_setting , s_company_name , s_created_by,d_created_date,n_status ) VALUES ($1,$2,$3,$4,$5,$6,$7);`;
    obj.arr = [data.s_email_setting, data.s_captha_setting, data.s_database_connection_setting, data.s_company_name, data.s_user_name, d_created_date, '0'];
    return obj;

  },

  get_systemparameter_detail: function (req, res) {

    var obj = {};
    var data = req.body;
    // var d_created_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `select * from tbl_system_parameter where n_system_param_id=$1`;
    obj.arr = [data.n_system_param_id];
    return obj;


  },

  update_systemParameter: function (req, res) {
    var obj = {};
    var data = req.body;
    var d_modified_date = dbValidation.newDatetimeInInteger(new Date());
    obj.queryString = `update tbl_system_parameter set s_email_setting = $1,s_captha_setting=$2,s_database_connection_setting=$3,s_company_name=$4,d_modified_date=$5,s_modified_by=$6  where n_system_param_id=$7`;

    obj.arr = [data.s_email_setting, data.s_captha_setting, data.s_database_connection_setting, data.s_company_name, d_modified_date, data.s_user_name, data.n_system_param_id]
    return obj;
  },




  getsystemParameterData: function (req, res) {
    var obj = {};
    var data = req.body;

    obj.queryString = `select * from tbl_system_parameter where n_status!=$1;`;

    obj.arr = ['1'];
    return obj;

  },


  deletesystemParameter: function (req, res) {
    var obj = {};
    obj.queryString = `update tbl_system_parameter set n_status ='1'  where n_system_param_id=$1`;
    obj.arr = [req.body.n_system_param_id];
    return obj;
  },

  uploadfile: function (req, res) {
    var data = req[0];

    for (i = 0; i < data.length; i++) {

      var queryString = `insert into tbl_asset_master(n_datacenter_id,n_door_id,n_room_id,s_column,n_u_id,n_rake_id,s_asset_name,n_asset_no,s_manufacturer_name,s_make ,n_model_no,s_device_category,n_serial_number,n_barcode_number,s_owner_name,s_owner_email,n_u_size,n_u_position,d_install_date,n_u_height,s_supplier,s_rated_power,s_rated_current, n_rated_voltage,s_maintenance_cycle,s_contact_person,n_contact_number,d_next_maintenance,s_customized_notes,s_created_by,d_created_date) values(${data[i].DataCenter},${data[i].Floor},${data[i].Room},$$${data[i].Column}$$,${data[i].RackU},${data[i].RakeName},$$${data[i].AssetName}$$,$$${data[i].AssetNo}$$,$$${data[i].Manufacrturer}$$,$$${data[i].Maker}$$ ,$$${data[i].ModelNo}$$,$$${data[i].DeviceCategory}$$,$$${data[i].SerialNo}$$,$$${data[i].BarcodeNo}$$,$$${data[i].OwnerName}$$,$$${data[i].OwnerEmail}$$,$$${data[i].Usize}$$,$$${data[i].Uposition}$$,$$${data[i].InstallDate}$$,$$${data[i].UHeight}$$,$$${data[i].Supplier}$$,$$${data[i].RatedPower}$$,$$${data[i].RatedCurrent}$$,$$${data[i].RatedVoltage}$$,$$${data[i].Maintenancecycle}$$,$$${data[i].ContactPerson}$$,$$${data[i].ContactNumber}$$,$$${data[i].NextMaintenance}$$,$$${data[i].CustomizedNote}$$,$$${data.s_created_by}$$,${data.d_created_date})`;
      return queryString;

    }

  },
}