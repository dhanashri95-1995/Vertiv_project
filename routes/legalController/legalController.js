var dbqyeryexecute = require("./../../utils/dbqyeryexecute"); // this is for Query execution phase
var legalSqlc = require("./legalSqlc.js");
var config = require("./../../config/config"); // this is for Query execution phase with COnnection
var con = config.connection;

var log4js = require('log4js');
var log = log4js.getLogger("app");
   var legalEmail = require("./legalEmailService");   // This is emailing .js
var jwtauth = require("./legalVerifyToken")

module.exports = {
  get_user_detail: function (req, res) {
    // var sqls = legalSqlc.get_user_detail(req, res);
    // dbqyeryexecute.connect_pool(sqls, con).then(record => {

    var Obj = legalSqlc.get_user_detail(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Welcome into ULAMS",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Welcome into ULAMS",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  update_my_profile: function (req, res) {
    // var sqls = legalSqlc.update_my_profile(req, res);
    var Obj = legalSqlc.update_my_profile(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {

      if (req.token_status == 'Verify') {
        dbqyeryexecute.nodeServerBridge(Obj).then(record => {
            res.status(200).json({
              "status": 200,
              "mess": "Updated !",
              "mess_body": "Profile Updated Successfully"
            });
          })
          // .catch(err => {
          //     log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
          //     res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
          //     // res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
          // });
          .catch(err => {
            log.error({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: err
            });
            res.status(404).json({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: err.message
            });
          });
      } else if (req.token_status == 'TokenExpired') {
        res.status(500).json({
          "status": 500,
          "mess": "Token Expired !",
          "mess_body": "Please verify with us."
        });
      } else if (req.token_status == 'InvalidToken') {
        res.status(500).json({
          "status": 500,
          "mess": "Invalid Token !",
          "mess_body": "Please verify with us."
        });
      }
    })
  },
  //user master

  
  // ########################################## DHANASHREE ##################################$$$$$$$$$$    // ************************************USER MASTER*****************************************

  save_user_record: function (req, res) {
    var obj1 = legalSqlc.save_user_record(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {
      var obj2 = legalSqlc.selectmaxuser(req, res);
      dbqyeryexecute.nodeServerBridge(obj2).then(record => {
      legalEmail.mail_to_user_pass(record);
     
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
     });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },

  get_user_Data: function (req, res) {
    var obj1 = legalSqlc.get_user_Data(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },

  get_user_Databyid: function (req, res) {
    // var Obj = legalSqlc.get_user_Databyid(req, res);
    // // var sqls = legalSqlc.get_user_Databyid(req, res);
    // dbqyeryexecute.nodeServerBridge(obj).then(record => {
    var Obj = legalSqlc.get_user_Databyid(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },


  // update_user_Data: function (req, res) {
  //     var Obj = legalSqlc.update_user_Data(req, res);
  //     dbqyeryexecute.nodeServerBridge(Obj).then(record => {
  //     // var sqls = legalSqlc.update_user_Data(req, res);
  //     // dbqyeryexecute.connect_pool(sqls, con).then(record => {
  //         log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Record Updated Successfully", data: record.rows });
  //         res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Updated Successfully" });
  //     })
  //         .catch(err => {
  //             res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
  //             res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
  //         });
  // },

  update_user_Data: function (req, res) {
    var obj = legalSqlc.update_user_Data(req, res);
    dbqyeryexecute.nodeServerBridge(obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },

  deleteUserById: function (req, res) {
    var Obj = legalSqlc.deleteUserById(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        // var sqls = legalSqlc.deleteUserById(req, res);
        // dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Deleted Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Updated !",
          "mess_body": "Record Deleted Successfully"
        });
      })
      .catch(err => {
        res.status(500).json({
          "status": 500,
          "mess": "Not Updated !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  get_check_email: function (req, res) {
    var Obj = legalSqlc.get_check_email(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {


        // var sqls = legalSqlc.get_check_email(req, res);

        // dbqyeryexecute.connect_pool(sqls, con).then(record => {
        if (record.rowCount != 0) {
          log.info({
            "status": 200,
            "mess": "Record Found !",
            "mess_body": "Email ID Alredy Exists",
            data: record.rows[0]
          });
          res.status(200).json({
            "status": 200,
            "mess": "Record Found !",
            "mess_body": "Email ID Alredy Exists",
            data: record.rows[0]
          });
        }
        // else {
        //     // var sqls = legalSqlc.save_user_record(req, res);
        //     dbqyeryexecute.connect_pool(sqls, con).then(record => {

        //         log.info({ "status": 200, "mess": "Record Saved !", "mess_body": "Record Added Successfully", data: record.rows[0] });
        //         res.status(200).json({ "status": 200, "mess": "Record Saved !", "mess_body": "Record Added Successfully", data: record.rows[0] });
        //     })
        // }
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  // ************************************ROLE MASTER*****************************************

  save_role_record: function (req, res) {
    var sqls = legalSqlc.save_role_record(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
      // jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
      // if (req.token_status == 'Verify') { 
      dbqyeryexecute.connect_pool(sqls, con).then(record => {
          res.status(200).json({
            "status": 200,
            "mess": "Updated !",
            "mess_body": "Record  Added Successfully"
          });
        })
        .catch(err => {
          res.status(500).json({
            "status": 500,
            "mess": "Not Updated !",
            "mess_body": "Somthing went Wrong.",
            data: err.message
          });
        });
      // }else if(req.token_status == 'TokenExpired'){  
      //     res.status(500).json({ "status": 500, "mess": "Token Expired !", "mess_body": "Please verify with us."});
      // }else if(req.token_status == 'InvalidToken'){
      //     res.status(500).json({ "status": 500, "mess": "Invalid Token !", "mess_body": "Please verify with us."});
      // }
    })
  },

  check_role_record: function (req, res) {
    // var sqls = legalSqlc.check_role_record(req, res);

    // dbqyeryexecute.connect_pool(sqls, con).then(record => {

    var obj1 = legalSqlc.check_role_record(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {
      if (record.rowCount > 0) {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
      } else {
        var obj2 = legalSqlc.save_role_record(req, res);
        dbqyeryexecute.nodeServerBridge(obj2).then(record => {
            // var sqls = legalSqlc.save_role_record(req, res);
            // dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({
              "status": 200,
              "mess": "Record Saved !",
              "mess_body": "Record Added Successfully",
              data: record.rows[0]
            });
            res.status(200).json({
              "status": 200,
              "mess": "Record Saved !",
              "mess_body": "Record Added Successfully",
              data: record.rows[0]
            });
          })
          .catch(err => {
            if (err.code == "22001") {
              log.error({
                "status": 400,
                "mess": "Error!",
                "mess_body": "Data Too long.",
                data: err
              });
              res.status(404).json({
                "status": 400,
                "mess": "Error!",
                "mess_body": "Data Too long.",
                data: err.message
              });
            } else {
              log.error({
                "status": 500,
                "mess": "Record not Found !",
                "mess_body": "Somthing went Wrong.",
                data: err
              });
              res.status(404).json({
                "status": 500,
                "mess": "Record not Found !",
                "mess_body": "Somthing went Wrong.",
                data: err.message
              });
            }

          });
      }

    }).catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
    // }else{
    //     var sqls = legalSqlc.save_user_record(req, res);
    //     dbqyeryexecute.connect_pool(sqls, con).then(record => {
    //     log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows[0] });
    //         res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows[0] });
    //     })
    //     .catch(err => {
    //         log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
    //         res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
    //     });

    // }

  },


  // get_role_Data: function (req, res) {
  //     var sqls = legalSqlc.get_role_Data(req, res);
  //     dbqyeryexecute.connect_pool(sqls, con).then(record => {
  //         log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Role Data Get Successfully", data: record.rows });
  //         res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Role Data Get Successfully", data: record.rows });
  //     })
  //         .catch(err => {
  //             log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
  //             res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
  //         });
  // },


  get_role_Databyid: function (req, res) {
    // var sqls = legalSqlc.get_role_Databyid(req, res);
    // dbqyeryexecute.connect_pool(sqls, con).then(record => {
    var Obj = legalSqlc.get_role_Databyid(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  // update_role_Data: function (req, res) {
  //     // var sqls = legalSqlc.update_role_Data(req, res);
  //     // dbqyeryexecute.connect_pool(sqls, con).then(record => {

  //         var Obj = legalSqlc.update_role_Data(req, res);
  //         dbqyeryexecute.nodeServerBridge(Obj).then(record => {
  //         log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Record Updated Successfully", data: record.rows });
  //         res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Updated Successfully" });
  //     })
  //         .catch(err => {
  //             res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
  //             res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
  //         });
  // },
  update_role_Data: function (req, res) {
    var obj = legalSqlc.update_role_Data(req, res);
    dbqyeryexecute.nodeServerBridge(obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },

  // deleteroleById: function (req, res) {
  //     // var sqls = legalSqlc.deleteroleById(req, res);
  //     // dbqyeryexecute.connect_pool(sqls, con).then(record => {

  //         var Obj = legalSqlc.deleteroleById(req, res);
  //         dbqyeryexecute.nodeServerBridge(Obj).then(record => {
  //         log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Record Deleted  Successfully", data: record.rows });
  //         res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Deleted  Successfully" });
  //     })
  //         .catch(err => {
  //             res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
  //             res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
  //         });
  // },
  deleteroleById: function (req, res) {
    var Obj = legalSqlc.deleteroleById(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Deleted !",
          "mess_body": "Record  Deleted Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord  Deleted  !",
          "mess_body": "Record  Deleted   Successfully"
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },
  // ************************************ROLE MAPPING MASTER*****************************************


  //working for
  save_user_role_record: function (req, res) {
    // var sqls = legalSqlc.check_userrole_record(req, res);
    // // if(record.rowCount!=0){
    // dbqyeryexecute.connect_pool(sqls, con).then(record => {

    var obj1 = legalSqlc.check_userrole_record(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {
      if (record.rowCount > 0) {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
      } else {
        var obj2 = legalSqlc.save_user_role_record(req, res);
        dbqyeryexecute.nodeServerBridge(obj2).then(record => {
          var obj3 = legalSqlc.update_user_role_record(req, res);
          dbqyeryexecute.nodeServerBridge(obj3).then(record => {
            // var sqls = legalSqlc.save_user_role_record(req, res);
            // dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({
              "status": 200,
              "mess": "Record Saved !",
              "mess_body": "Record Added Successfully",
              data: record.rows
            });
            res.status(200).json({
              "status": 200,
              "mess": "Record Saved !",
              "mess_body": "Record Added Successfully",
              data: record.rows
            });
          })
        })
      }

    }).catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
  },

  get_role_Data: function (req, res) {
    var obj1 = legalSqlc.get_role_Data(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {
        // var sqls = legalSqlc.get_role_Data(req, res);
        // dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },


  // get_role_Databyid: function (req, res) {
  //     var sqls = legalSqlc.get_role_Databyid(req, res);
  //     dbqyeryexecute.connect_pool(sqls, con).then(record => {
  //         log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Data Get successfully", data: record.rows });
  //         res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Data Get successfully", data: record.rows });
  //     })
  //         .catch(err => {
  //             log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
  //             res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
  //         });
  // },
  // update_user_role_Data: function (req, res) {
  //     var sqls = legalSqlc.update_user_role_Data(req, res);
  //     dbqyeryexecute.connect_pool(sqls, con).then(record => {

  //         res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Updated Successfully" });
  //     })
  //         .catch(err => {
  //             res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
  //             res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
  //         });
  // },
  update_user_role_Data: function (req, res) {
    var obj = legalSqlc.update_user_role_Data(req, res);
    dbqyeryexecute.nodeServerBridge(obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },
  // deleteroleById: function (req, res) {
  //     var sqls = legalSqlc.deleteroleById(req, res);
  //     dbqyeryexecute.connect_pool(sqls, con).then(record => {

  //         res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Deleted Successfully" });
  //     })
  //         .catch(err => {
  //             res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
  //             res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
  //         });
  // },
  get_user_role_Data: function (req, res) {
    // var sqls = legalSqlc.get_user_role_Data(req, res);
    // dbqyeryexecute.connect_pool(sqls, con).then(record => {

    var obj1 = legalSqlc.get_user_role_Data(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  // getuserroleById: function (req, res) {
  //     var sqls = legalSqlc.getuserroleById(req, res);
  //     dbqyeryexecute.connect_pool(sqls, con).then(record => {
  //         log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get Successfully", data: record.rows });
  //         res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get Successfully", data: record.rows });
  //     })
  //         .catch(err => {
  //             log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
  //             res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
  //         });
  // },
  getuserroleById: function (req, res) {
    var Obj = legalSqlc.getuserroleById(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  deleteuserroleById: function (req, res) {
    // var sqls = legalSqlc.deleteuserroleById(req, res);
    // dbqyeryexecute.connect_pool(sqls, con).then(record => {
    var Obj = legalSqlc.deleteuserroleById(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Deleted Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Updated !",
          "mess_body": "Record Deleted Successfully"
        });
      })
      .catch(err => {
        res.status(500).json({
          "status": 500,
          "mess": "Not Updated !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },


  // ************************************STATUS MASTER*****************************************
  insert_alert: function (req, res) {
    var sqls = legalSqlc.check_alert(req, res);
    // if(record.rowCount!=0){
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
      if (record.rowCount != 0) {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
      } else {
        var sqls = legalSqlc.insert_alert(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {

          log.info({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows[0]
          });
          res.status(200).json({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows[0]
          });
        })
      }

    }).catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });


  },
  check_statusrecord_record: function (req, res) {


    //     var obj1 = legalSqlc.save_status_record(req, res);
    //     dbqyeryexecute.nodeServerBridge(obj1).then(record => {
    //     res.status(200).json({ "status": 200, "mess": "Record Saved !", "mess_body": "Record Added Successfully" });
    // }) .catch(err => {
    //         if (err.code == "22001") {
    //             log.error({ "status": 400, "mess": "Error!", "mess_body": "Data Too long.", data: err.message });
    //             res.status(404).json({ "status": 400, "mess": "Error!", "mess_body": "Data Too long.", data: err.message });
    //         } else {
    //             log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
    //             res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
    //         }

    //         // res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
    //     });
    var obj1 = legalSqlc.check_statusrecord_record(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {
      if (record.rowCount > 0) {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
      } else {
        var obj2 = legalSqlc.save_status_record(req, res);
        dbqyeryexecute.nodeServerBridge(obj2).then(record => {

          // var sqls = legalSqlc.save_user_role_record(req, res);
          // dbqyeryexecute.connect_pool(sqls, con).then(record => {
          log.info({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows
          });
          res.status(200).json({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows
          });

        })
      }

    }).catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });

  },


  get_status_Data: function (req, res) {
    // var sqls = legalSqlc.get_status_Data(req, res);
    // dbqyeryexecute.connect_pool(sqls, con).then(record => {


    var obj1 = legalSqlc.get_status_Data(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },


  get_status_Databyid: function (req, res) {
    var Obj = legalSqlc.get_status_Databyid(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        // var sqls = legalSqlc.get_status_Databyid(req, res);
        // dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  // update_status_Data: function (req, res) {
  //     var sqls = legalSqlc.update_status_Data(req, res);
  //     dbqyeryexecute.connect_pool(sqls, con).then(record => {
  //         log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Record Updated Successfully", data: record.rows });
  //         res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Updated Successfully" });
  //     })
  //         .catch(err => {
  //             res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
  //             res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
  //         });
  // },
  update_status_Data: function (req, res) {
    var obj = legalSqlc.update_status_Data(req, res);
    dbqyeryexecute.nodeServerBridge(obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },
  deletestatusById: function (req, res) {
    // var sqls = legalSqlc.deletestatusById(req, res);
    // dbqyeryexecute.connect_pool(sqls, con).then(record => {
    var Obj = legalSqlc.deletestatusById(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        res.status(200).json({
          "status": 200,
          "mess": "Updated !",
          "mess_body": "Record Deleted Successfully"
        });
      })
      .catch(err => {
        res.status(500).json({
          "status": 500,
          "mess": "Not Updated !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  get_status_Datatype: function (req, res) {
    // var sqls = legalSqlc.get_status_Datatype(req, res);
    // dbqyeryexecute.connect_pool(sqls, con).then(record => {

    var Obj = legalSqlc.get_status_Datatype(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })


      .catch(err => {
        res.status(500).json({
          "status": 500,
          "mess": "Not Updated !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },


  //    ##################################### DHANASHREE ##################################################



  //    ##################################### AFRIN ##################################################

 
// ****RACK MASTER*****


Save_Rack_Data: function (req, res) {
  var obj1 = legalSqlc.check_Rack(req, res);
  dbqyeryexecute.nodeServerBridge(obj1).then(record => {

    if (record.rowCount > 0) {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Already Available",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Already Available",
        data: record.rows[0]
      });
    } else {
      var obj2 = legalSqlc.Save_Rack_Data(req, res);
      dbqyeryexecute.nodeServerBridge(obj2).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Saved !",
          "mess_body": "Record Added Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Saved !",
          "mess_body": "Record Added Successfully",
          data: record.rows[0]
        });
      }).catch(err => {
        if (err.code == "22001") {
          log.error({
            "status": 400,
            "mess": "Error!",
            "mess_body": "Data Too long.",
            data: err.message
          });
          res.status(404).json({
            "status": 400,
            "mess": "Error!",
            "mess_body": "Data Too long.",
            data: err.message
          });
        } else {
          log.error({
            "status": 500,
            "mess": "Record not Found !",
            "mess_body": "Somthing went Wrong.",
            data: err.message
          });
          res.status(404).json({
            "status": 500,
            "mess": "Record not Found !",
            "mess_body": "Somthing went Wrong.",
            data: err.message
          });
        }
      })
    }

  }).catch(err => {
    log.error({
      "status": 500,
      "mess": "Record not Found !",
      "mess_body": "Somthing went Wrong.",
      data: err
    });
    res.status(404).json({
      "status": 500,
      "mess": "Record not Found !",
      "mess_body": "Somthing went Wrong.",
      data: err.message
    });
  });

},

get_Rack_Data: function (req, res) {
  var obj = legalSqlc.get_Rack_Data(req, res);
  dbqyeryexecute.nodeServerBridge(obj).then(record => {

      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Data Get Successfully",
        data: record.rows
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},

get_Rack_Data_byid: function (req, res) {
  var Obj = legalSqlc.get_Rack_Data_byid(req, res);
  dbqyeryexecute.nodeServerBridge(Obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get  Successfully",
        data: record.rows[0]
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},
get_Deleted_Rack_Data: function (req, res) {
  var obj = legalSqlc.get_Deleted_Rack_Data(req, res);
  dbqyeryexecute.nodeServerBridge(obj).then(record => {

      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Deleted Data Get Successfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Deleted Data Get Successfully",
        data: record.rows
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},
update_Rack_Data: function (req, res) {
  var obj = legalSqlc.update_Rack_Data(req, res);
  dbqyeryexecute.nodeServerBridge(obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Rrcord Updated !",
        "mess_body": "Record Updated Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Rrcord Updated !",
        "mess_body": "Record Updated Successfully",
        data: record.rows[0]
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Updated  !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(500).json({
        "status": 500,
        "mess": "Record not Updated  !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });


},
Delete_Rack_Data: function (req, res) {
  var obj1 = legalSqlc.Delete_Rack_Data(req, res);
  dbqyeryexecute.nodeServerBridge(obj1).then(record => {
    var obj2 = legalSqlc.Update_Racku_Data(req, res);
    dbqyeryexecute.nodeServerBridge(obj2).then(record => {
      log.info({
        "status": 200,
        "mess": "Rrcord Deleted !",
        "mess_body": "Record  Deleted Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Rrcord  Deleted  !",
        "mess_body": "Record  Deleted   Successfully",
        data: record.rows[0]
      });
    }).catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    })

  }).catch(err => {
    log.error({
      "status": 500,
      "mess": "Record not  Deleted  !",
      "mess_body": "Somthing went Wrong.",
      data: err
    });
    res.status(500).json({
      "status": 500,
      "mess": "Record not  Deleted  !",
      "mess_body": "Somthing went Wrong.",
      data: err.message
    });
  });

},

get_data_center_room: function (req, res) {

  var obj = legalSqlc.get_data_center_room(req, res);
  dbqyeryexecute.nodeServerBridge(obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},

get_floor_loc: function (req, res) {

  var obj = legalSqlc.get_floor_loc(req, res);
  dbqyeryexecute.nodeServerBridge(obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Succesfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Succesfully",
        data: record.rows
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Server Side Error.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Server Side Error.",
        data: err.message
      });
    });
},
// Delete_Rake_Data: function (req, res) {
//     var obj = legalSqlc.Delete_Rake_Data(req, res);
//     dbqyeryexecute.nodeServerBridge(obj).then(record => {
//         log.info({ "status": 200, "mess": "Rrcord Deleted !", "mess_body": "Record  Deleted Successfully", data: record.rows[0] });
//         res.status(200).json({ "status": 200, "mess": "Rrcord  Deleted  !", "mess_body": "Record  Deleted   Successfully", data: record.rows[0] });
//     })
//         .catch(err => {
//             log.error({ "status": 500, "mess": "Record not  Deleted  !", "mess_body": "Somthing went Wrong.", data: err });
//             res.status(500).json({ "status": 500, "mess": "Record not  Deleted  !", "mess_body": "Somthing went Wrong.", data: err.message });
//         });
// },
// get_data_center: function (req, res) {
//     var sqls = legalSqlc.get_data_center(req, res);
//     dbqyeryexecute.connect_pool(sqls, con).then(record => {
//         log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get Successfully", data: record.rows });
//         res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get Successfully", data: record.rows });
//     })
//         .catch(err => {
//             log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
//             res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
//         });
// },
// ****RACKU MASTER*****

get_RackU_Data: function (req, res) {
  var obj = legalSqlc.get_RackU_Data(req, res);
  dbqyeryexecute.nodeServerBridge(obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record  Successfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(500).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},

get_RackU_Data_byid: function (req, res) {
  var Obj = legalSqlc.get_RackU_Data_byid(req, res);
  dbqyeryexecute.nodeServerBridge(Obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get  Successfully",
        data: record.rows[0]
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},
get_Deleted_RackU_Data: function (req, res) {
  var obj = legalSqlc.get_Deleted_RackU_Data(req, res);
  dbqyeryexecute.nodeServerBridge(obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": " Deleted Record Get Successfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Deleted Record Get Successfully",
        data: record.rows
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(500).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},

update_RackU_Data: function (req, res) {
  var obj = legalSqlc.update_RackU_Data(req, res);
  dbqyeryexecute.nodeServerBridge(obj).then(record => {

      log.info({
        "status": 200,
        "mess": "Rrcord Updated !",
        "mess_body": "Record Updated Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Rrcord Updated !",
        "mess_body": "Record Updated Successfully",
        data: record.rows[0]
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Updated  !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(500).json({
        "status": 500,
        "mess": "Record not Updated  !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });


},
Delete_RackU_Data: function (req, res) {
  var Obj = legalSqlc.Delete_RackU_Data(req, res);
  dbqyeryexecute.nodeServerBridge(Obj).then(record => {
    var obj1 = legalSqlc.select_racku_data(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {
      var obj2 = legalSqlc.update_racku_afterdelete(req, res);
      var racku = record.rows[0].racku
      dbqyeryexecute.nodeServerBridge(obj2).then(record => {
        var obj3 = legalSqlc.update_rackuno_data(req, res,racku);
        dbqyeryexecute.nodeServerBridge(obj3).then(record => {
          log.info({
            "status": 200,
            "mess": "Record Deleted !",
            "mess_body": "Record  Deleted Successfully",
            data: record.rows[0]
          });
          res.status(200).json({
            "status": 200,
            "mess": "Record  Deleted  !",
            "mess_body": "Record  Deleted   Successfully"
          });
        })
          .catch(err => {
            log.error({
              "status": 500,
              "mess": "Record not  Deleted  !",
              "mess_body": "Somthing went Wrong.",
              data: err
            });
            res.status(500).json({
              "status": 500,
              "mess": "Record not  Deleted  !",
              "mess_body": "Somthing went Wrong.",
              data: err.message
            });
          });
      })
        .catch(err => {
          log.error({ "status": 500, 
          "mess": "Record not  Deleted  !",
           "mess_body": "Somthing went Wrong.", 
           data: err });
          res.status(500).json({ "status": 500, 
          "mess": "Record not  Deleted  !", 
          "mess_body": "Somthing went Wrong.",
           data: err.message });
        });

    });
  })
    .catch(err => {
      res.status(500).json({ "status": 500,
       "mess": "Not Updated !", 
       "mess_body": "Somthing went Wrong.",
        data: err.message });
      // res.status(404).json({ "status": 500,
      //  "mess": "Record not Found !", 
      //  "mess_body": "Somthing went Wrong.", 
      //  data: err.message });
    });
},
Save_Asset_Data: function (req, res) {
  var obj1 = legalSqlc.check_Asset(req, res);
  dbqyeryexecute.nodeServerBridge(obj1).then(record => {
    if (record.rowCount > 0) {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Already Available",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Already Available",
        data: record.rows[0]
      });
    } else {
      var obj2 = legalSqlc.Save_Asset_Data(req, res);
      dbqyeryexecute.nodeServerBridge(obj2).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Saved !",
          "mess_body": "Record Added Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Saved !",
          "mess_body": "Record Added Successfully",
          data: record.rows[0]
        });
      }).catch(err => {
        if (err.code == "22001") {
          log.error({
            "status": 400,
            "mess": "Error!",
            "mess_body": "Data Too long.",
            data: err.message
          });
          res.status(400).json({
            "status": 400,
            "mess": "Error!",
            "mess_body": "Data Too long.",
            data: err.message
          });
        } else {
          log.error({
            "status": 500,
            "mess": "Record not Found !",
            "mess_body": "Somthing went Wrong.",
            data: err.message
          });
          res.status(404).json({
            "status": 500,
            "mess": "Record not Found !",
            "mess_body": "Somthing went Wrong.",
            data: err.message
          });
        }
      })
    }

  }).catch(err => {
    log.error({
      "status": 500,
      "mess": "Record not Found !",
      "mess_body": "Somthing went Wrong.",
      data: err
    });
    res.status(404).json({
      "status": 500,
      "mess": "Record not Found !",
      "mess_body": "Somthing went Wrong.",
      data: err.message
    });
  });

},
get_Asset_Data: function (req, res) {

  var obj1 = legalSqlc.get_Asset_Data(req, res);
  dbqyeryexecute.nodeServerBridge(obj1).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get  Successfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(500).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},
get_Asset_Data_byid: function (req, res) {
  var Obj = legalSqlc.get_Asset_Data_byid(req, res);
  dbqyeryexecute.nodeServerBridge(Obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get  Successfully",
        data: record.rows[0]
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},
get_Deleted_Asset_Data: function (req, res) {

  var obj1 = legalSqlc.get_Deleted_Asset_Data(req, res);
  dbqyeryexecute.nodeServerBridge(obj1).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Deleted Record Get  Successfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Deleted Record Get  Successfully",
        data: record.rows
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(500).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},
update_Asset_Data: function (req, res) {
  var obj = legalSqlc.update_Asset_Data(req, res);
  dbqyeryexecute.nodeServerBridge(obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Rrcord Updated !",
        "mess_body": "Record Updated Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Rrcord Updated !",
        "mess_body": "Record Updated Successfully",
        data: record.rows[0]
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Updated  !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(500).json({
        "status": 500,
        "mess": "Record not Updated  !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });


},

Delete_Asset_Data: function (req, res) {
  var Obj = legalSqlc.Delete_Asset_Data(req, res);
  dbqyeryexecute.nodeServerBridge(Obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Rrcord Deleted !",
        "mess_body": "Record  Deleted Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Rrcord  Deleted  !",
        "mess_body": "Record  Deleted   Successfully"
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not  Deleted  !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(500).json({
        "status": 500,
        "mess": "Record not  Deleted  !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},

uploadfile: function (req, csv, created_by, res) {
  var data = csv;
  var notfound = [];
  //  for(i=0; i<=csv.length;i++) {

  data.forEach((el, i) => {
    var sqls = legalSqlc.getid(req, el, res);
    // if(record.rowCount!=0){
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
      if (record.rowCount != 0) {
        var sqls = legalSqlc.insert_csv_data(el, record.rows[0], created_by, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
          if (i == data.length - 1 && notfound.length == 0) {
            log.info({
              "status": 200,
              "mess": "Record Saved !",
              "mess_body": "Record Added Successfully",
              data: record.rows[0]
            });
            console.log("Record Added Successfully");
            res.status(200).json({
              "status": 200,
              "mess": "Record Saved !",
              "mess_body": "=Record Added Successfully",
              data: record.rows[0]
            });

          } else if (i == data.length - 1 && notfound.length != 0) {
            log.info({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: notfound
            });
            res.status(404).json({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: notfound
            });
            console.log(notfound);
            console.log("not found")

          } else {
            log.info({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: notfound
            });
            res.status(404).json({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: notfound
            });

            console.log(notfound);
            console.log("not found")


          }
        })

      } else {

        var row = i + 2;
        data[i]["row"] = row;
        notfound.push(data[i]);
        console.log(data[i]);
        if (notfound.length == data.length) {
          log.info({
            "status": 500,
            "mess": "Record not Found !",
            "mess_body": "Somthing went Wrong.",
            data: notfound
          });
          res.status(404).json({
            "status": 500,
            "mess": "Record not Found !",
            "mess_body": "Somthing went Wrong.",
            data: notfound
          });
          console.log(notfound);
          console.log("not found")

        }
      }

    })

  });

},
// ****ASSET MAPPING*****
Save_Asset_Map_Data: function (req, res) {
  var obj1 = legalSqlc.check_Asset_Map(req, res);
  dbqyeryexecute.nodeServerBridge(obj1).then(record => {
    if (record.rowCount > 0) {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Already Available",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Already Available",
        data: record.rows[0]
      });
    } else {
      var obj2 = legalSqlc.Save_Asset_Map_Data(req, res);
      dbqyeryexecute.nodeServerBridge(obj2).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Saved !",
          "mess_body": "Record Added Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Saved !",
          "mess_body": "Record Added Successfully",
          data: record.rows[0]
        });
      }).catch(err => {
        if (err.code == "22001") {
          log.error({
            "status": 400,
            "mess": "Error!",
            "mess_body": "Data Too long.",
            data: err.message
          });
          res.status(400).json({
            "status": 400,
            "mess": "Error!",
            "mess_body": "Data Too long.",
            data: err.message
          });
        } else {
          log.error({
            "status": 500,
            "mess": "Record not Found !",
            "mess_body": "Somthing went Wrong.",
            data: err.message
          });
          res.status(404).json({
            "status": 500,
            "mess": "Record not Found !",
            "mess_body": "Somthing went Wrong.",
            data: err.message
          });
        }
      })
    }

  }).catch(err => {
    log.error({
      "status": 500,
      "mess": "Record not Found !",
      "mess_body": "Somthing went Wrong.",
      data: err
    });
    res.status(404).json({
      "status": 500,
      "mess": "Record not Found !",
      "mess_body": "Somthing went Wrong.",
      data: err.message
    });
  });

},
get_Asset_Map_Data: function (req, res) {
  var Obj = legalSqlc.get_Asset_Map_Data(req, res);
  dbqyeryexecute.nodeServerBridge(Obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get  Successfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record  Get Successfully",
        data: record.rows
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(500).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},
get_Asset_Map_Data_byid: function (req, res) {
  var Obj = legalSqlc.get_Asset_Map_Data_byid(req, res);
  dbqyeryexecute.nodeServerBridge(Obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows[0]
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},
get_Deleted_Asset_Map_Data: function (req, res) {
  var Obj = legalSqlc.get_Deleted_Asset_Map_Data(req, res);
  dbqyeryexecute.nodeServerBridge(Obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Deleted Record Get  Successfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Deleted Record Get  Successfully",
        data: record.rows
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(500).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},
update_Asset_Map_Data: function (req, res) {
  var Obj = legalSqlc.update_Asset_Map_Data(req, res);
  dbqyeryexecute.nodeServerBridge(Obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Rrcord Updated !",
        "mess_body": "Record Updated Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Rrcord Updated !",
        "mess_body": "Record Updated Successfully",
        data: record.rows[0]
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Updated  !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(500).json({
        "status": 500,
        "mess": "Record not Updated  !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });


},
Delete_Asset_Map_Data: function (req, res) {
  var Obj = legalSqlc.Delete_Asset_Map_Data(req, res);
  dbqyeryexecute.nodeServerBridge(Obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Rrcord Deleted !",
        "mess_body": "Record  Deleted Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Rrcord  Deleted  !",
        "mess_body": "Record  Deleted Successfully"
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not  Deleted  !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(500).json({
        "status": 500,
        "mess": "Record not  Deleted  !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });


},
get_rack: function (req, res) {
  var Obj = legalSqlc.get_rack(req, res);
  dbqyeryexecute.nodeServerBridge(Obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},
get_n_u_id: function (req, res) {
  var Obj = legalSqlc.get_n_u_id(req, res);
  dbqyeryexecute.nodeServerBridge(Obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},
get_asset_desc: function (req, res) {

  var Obj = legalSqlc.get_asset_desc(req, res);
  dbqyeryexecute.nodeServerBridge(Obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},
get_status: function (req, res) {

  var Obj = legalSqlc.get_status(req, res);
  dbqyeryexecute.nodeServerBridge(Obj).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Get Successfully",
        data: record.rows
      });
    })
    .catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });
},
//    ##################################### AFRIN ##################################################





  
  //    ##################################### AFRIN ##################################################
  //    ##################################### ASMITA ##################################################

  // ***************************************COUNTRY***********************************

  save_country_record: function (req, res) {



    var obj1 = legalSqlc.check_country_record(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {
      if (record.rowCount > 0) {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
      } else {
        var obj2 = legalSqlc.save_country_record(req, res);
        dbqyeryexecute.nodeServerBridge(obj2).then(record => {
          log.info({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows[0]
          });
          res.status(200).json({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows[0]
          });
        }).catch(err => {
          if (err.code == "22001") {
            log.error({
              "status": 400,
              "mess": "Error!",
              "mess_body": "Data Too long.",
              data: err.message
            });
            res.status(400).json({
              "status": 400,
              "mess": "Error!",
              "mess_body": "Data Too long.",
              data: err.message
            });
          } else {
            log.error({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: err.message
            });
            res.status(404).json({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: err.message
            });
          }
        })
      }

    }).catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });



  },



  get_country_Data: function (req, res) {


    // var sqls = legalSqlc.get_country_Data(req, res);
    // dbqyeryexecute.connect_pool(sqls).then(record => {
    //     log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get  Successfully", data: record.rows });
    //     res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get Successfully", data: record.rows });
    // })
    //     .catch(err => {
    //         log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
    //         res.status(500).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
    //     });

    var Obj = legalSqlc.get_country_Data(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });



  },


  get_country_Databyid: function (req, res) {



    var Obj = legalSqlc.get_country_Databyid(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });

  },
  update_country_Data: function (req, res) {


    var obj = legalSqlc.update_country_Data(req, res);
    dbqyeryexecute.nodeServerBridge(obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });



  },
  deletecountryById: function (req, res) {


    var Obj = legalSqlc.deletecountryById(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Deleted !",
          "mess_body": "Record  Deleted Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord  Deleted  !",
          "mess_body": "Record  Deleted   Successfully"
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });




  },


  // ***************************************STATE MASTER***********************************



  save_state_record: function (req, res) {


    var obj1 = legalSqlc.check_state_record(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {
      if (record.rowCount > 0) {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
      } else {
        var obj2 = legalSqlc.save_state_record(req, res);
        dbqyeryexecute.nodeServerBridge(obj2).then(record => {
          log.info({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows[0]
          });
          res.status(200).json({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows[0]
          });
        }).catch(err => {
          if (err.code == "22001") {
            log.error({
              "status": 400,
              "mess": "Error!",
              "mess_body": "Data Too long.",
              data: err.message
            });
            res.status(400).json({
              "status": 400,
              "mess": "Error!",
              "mess_body": "Data Too long.",
              data: err.message
            });
          } else {
            log.error({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: err.message
            });
            res.status(404).json({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: err.message
            });
          }
        })
      }

    }).catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });


  },


  get_state_Data: function (req, res) {


    // var sqls = legalSqlc.get_state_Data(req, res);
    // dbqyeryexecute.connect_pool(sqls).then(record => {
    //     log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get  Successfully", data: record.rows });
    //     res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get Successfully", data: record.rows });
    // })
    //     .catch(err => {
    //         log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
    //         res.status(500).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
    //     });
    var Obj = legalSqlc.get_state_Data(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });




  },


  get_state_Databyid: function (req, res) {



    var Obj = legalSqlc.get_state_Databyid(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });

  },
  update_state_Data: function (req, res) {


    var obj = legalSqlc.update_state_Data(req, res);
    dbqyeryexecute.nodeServerBridge(obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },
  deletestateById: function (req, res) {


    var Obj = legalSqlc.deletestateById(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Deleted !",
          "mess_body": "Record  Deleted Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord  Deleted  !",
          "mess_body": "Record  Deleted   Successfully"
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  // get_floor_loc: function (req, res) {
  //     var sqls = legalSqlc.get_floor_loc(req, res);
  //     dbqyeryexecute.connect_pool(sqls, con).then(record => {
  //         log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get Succesfully", data: record.rows });
  //         res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get Succesfully", data: record.rows });
  //     })
  //         .catch(err => {
  //             log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Server Side Error.", data: err });
  //             res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Server Side Error.", data: err.message });
  //         });
  // },
  get_state_id: function (req, res) {
    var sqls = legalSqlc.get_state_id(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": " Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Server Side Error.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Server Side Error.",
          data: err.message
        });
      });
  },



  // ***************************************DATA CENTER DOOR***********************************


  save_datacenter_door_record: function (req, res) {
    var obj2 = legalSqlc.save_datacenter_door_record(req, res);
    dbqyeryexecute.nodeServerBridge(obj2).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Saved !",
        "mess_body": "Record Added Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Saved !",
        "mess_body": "Record Added Successfully",
        data: record.rows[0]
      });
    }).catch(err => {
      if (err.code == "22001") {
        log.error({
          "status": 400,
          "mess": "Error!",
          "mess_body": "Data Too long.",
          data: err.message
        });
        res.status(400).json({
          "status": 400,
          "mess": "Error!",
          "mess_body": "Data Too long.",
          data: err.message
        });
      } else {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      }


    }).catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });



  },

  get_datacenter_door_Data: function (req, res) {


    // var sqls = legalSqlc.get_datacenter_door_Data(req, res);
    // dbqyeryexecute.connect_pool(sqls).then(record => {
    //     log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get  Successfully", data: record.rows });
    //     res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get Successfully", data: record.rows });
    // })
    //     .catch(err => {
    //         log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
    //         res.status(500).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
    //     });

    var Obj = legalSqlc.get_datacenter_door_Data(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },


  get_datacenter_door_ById: function (req, res) {


    var Obj = legalSqlc.get_datacenter_door_ById(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  get_location_details: function (req, res) {
    var sqls = legalSqlc.get_location_details(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  update_datacenter_door_Data: function (req, res) {



    var obj = legalSqlc.update_datacenter_door_Data(req, res);
    dbqyeryexecute.nodeServerBridge(obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });

  },

  deletedoorrecord: function (req, res) {

    var Obj = legalSqlc.deletedoorrecord(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },


  delete_datacenter_door_ById: function (req, res) {
    // var sqls = legalSqlc.delete_datacenter_door_ById(req, res);
    // dbqyeryexecute.connect_pool(sqls, con).then(record => {

      var Obj = legalSqlc.delete_datacenter_door_ById(req, res);

      dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        var obj1 = legalSqlc.select_datacenter_data(req, res);
      dbqyeryexecute.nodeServerBridge(obj1).then(record => {
        var obj2 = legalSqlc.update_door_afterdelete(req, res,record.rows[0].floor);
     var floor=record.rows[0].floor
        dbqyeryexecute.nodeServerBridge(obj2).then(record => {
          
            var obj3 = legalSqlc.update_floorno_data(req, res,floor);
            dbqyeryexecute.nodeServerBridge(obj3).then(record => {
                    log.info({ "status": 200, "mess": "Record Deleted !", "mess_body": "Record  Deleted Successfully", data: record.rows[0] });
                    res.status(200).json({ "status": 200, "mess": "Record  Deleted  !", "mess_body": "Record  Deleted   Successfully" });
                })
                    .catch(err => {
                        log.error({ "status": 500, "mess": "Record not  Deleted  !", "mess_body": "Somthing went Wrong.", data: err });
                        res.status(500).json({ "status": 500, "mess": "Record not  Deleted  !", "mess_body": "Somthing went Wrong.", data: err.message });
                    });
            })
                .catch(err => {
                    log.error({ "status": 500, "mess": "Record not  Deleted  !", "mess_body": "Somthing went Wrong.", data: err });
                    res.status(500).json({ "status": 500, "mess": "Record not  Deleted  !", "mess_body": "Somthing went Wrong.", data: err.message });
                });
     
    });
  })
        .catch(err => {
            res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
            // res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},





  // ***************************************DATA CENTER ROOM************************************



  save_datacenter_room_record: function (req, res) {



    var obj1 = legalSqlc.check_room_record(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {
      if (record.rowCount > 0) {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
      } else {
        var obj2 = legalSqlc.save_datacenter_room_record(req, res);
        dbqyeryexecute.nodeServerBridge(obj2).then(record => {
          log.info({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows[0]
          });
          res.status(200).json({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows[0]
          });
        }).catch(err => {
          if (err.code == "22001") {
            log.error({
              "status": 400,
              "mess": "Error!",
              "mess_body": "Data Too long.",
              data: err.message
            });
            res.status(400).json({
              "status": 400,
              "mess": "Error!",
              "mess_body": "Data Too long.",
              data: err.message
            });
          } else {
            log.error({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: err.message
            });
            res.status(404).json({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: err.message
            });
          }
        })
      }

    }).catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });




  },

  get_datacenter_room_Data: function (req, res) {

    var Obj = legalSqlc.get_datacenter_room_Data(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });




    // var sqls = legalSqlc.get_datacenter_room_Data(req, res);
    // dbqyeryexecute.connect_pool(sqls).then(record => {
    //     log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get  Successfully", data: record.rows });
    //     res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get Successfully", data: record.rows });
    // })
    //     .catch(err => {
    //         log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
    //         res.status(500).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
    //     });


  },


  get_datacenter_room_ById: function (req, res) {


    var Obj = legalSqlc.get_datacenter_room_ById(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },
  update_datacenter_room_Data: function (req, res) {




    var obj = legalSqlc.update_datacenter_room_Data(req, res);
    dbqyeryexecute.nodeServerBridge(obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },

  deleteroomrecord: function (req, res) {

    var Obj = legalSqlc.deleteroomrecord(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },





  delete_datacenter_room_ById: function (req, res) {




    var Obj = legalSqlc.delete_datacenter_room_ById(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Deleted !",
          "mess_body": "Record  Deleted Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord  Deleted  !",
          "mess_body": "Record  Deleted   Successfully"
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },



  // ***************************************DATA CENTER LOCATION************************************

  save_datacenter_location_record: function (req, res) {

    var obj2 = legalSqlc.save_datacenter_location_record(req, res);
    dbqyeryexecute.nodeServerBridge(obj2).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Saved !",
        "mess_body": "Record Added Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Saved !",
        "mess_body": "Record Added Successfully",
        data: record.rows[0]
      });
    }).catch(err => {
      if (err.code == "22001") {
        log.error({
          "status": 400,
          "mess": "Error!",
          "mess_body": "Data Too long.",
          data: err.message
        });
        res.status(400).json({
          "status": 400,
          "mess": "Error!",
          "mess_body": "Data Too long.",
          data: err.message
        });
      } else {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      }
      //})
      // }

    }).catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });





  },

  get_datacenter_location_Data: function (req, res) {



    // var sqls = legalSqlc.get_datacenter_location_Data(req, res);
    // dbqyeryexecute.connect_pool(sqls).then(record => {
    //     log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get  Successfully", data: record.rows });
    //     res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Record Get Successfully", data: record.rows });
    // })
    //     .catch(err => {
    //         log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
    //         res.status(500).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
    //     });

    var Obj = legalSqlc.get_datacenter_location_Data(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });

  },


  get_datacenter_location_Databyid: function (req, res) {



    var Obj = legalSqlc.get_datacenter_location_Databyid(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });

  },
  update_datacenter_location_Data: function (req, res) {


    var obj = legalSqlc.update_datacenter_location_Data(req, res);
    dbqyeryexecute.nodeServerBridge(obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });

  },


  deletelocationrecord: function (req, res) {


    var Obj = legalSqlc.deletelocationrecord(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });

  },




  delete_datacenter_location_ById: function (req, res) {

    var Obj = legalSqlc.delete_datacenter_location_ById(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Deleted !",
          "mess_body": "Record  Deleted Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord  Deleted  !",
          "mess_body": "Record  Deleted   Successfully"
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },


  // ##################################### ASMITA #########################################





  // ##################################### GANESH #########################################

  // *****************************************_ALERT MASTER*************************************
  insert_alert: function (req, res) {
    var obj1 = legalSqlc.check_alert(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {
      if (record.rowCount > 0) {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
      } else {
        var obj2 = legalSqlc.insert_alert(req, res);
        dbqyeryexecute.nodeServerBridge(obj2).then(record => {
          log.info({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows[0]
          });
          res.status(200).json({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows[0]
          });
        }).catch(err => {
          if (err.code == "22001") {
            log.error({
              "status": 400,
              "mess": "Error!",
              "mess_body": "Data Too long.",
              data: err.message
            });
            res.status(400).json({
              "status": 400,
              "mess": "Error!",
              "mess_body": "Data Too long.",
              data: err.message
            });
          } else {
            log.error({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: err.message
            });
            res.status(404).json({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: err.message
            });
          }
        })
      }

    }).catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });

  },


  update_alert: function (req, res) {
    var obj = legalSqlc.update_alert(req, res);
    dbqyeryexecute.nodeServerBridge(obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },

  get_alert_Data: function (req, res) {
    var sqls = legalSqlc.get_alert_Data(req, res);
    dbqyeryexecute.connect_pool(sqls).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },

  get_alert_detail: function (req, res) {
    var Obj = legalSqlc.get_alert_detail(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },

  deletealert_rec: function (req, res) {
    var Obj = legalSqlc.deletealert_rec(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Deleted !",
          "mess_body": "Record  Deleted Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord  Deleted  !",
          "mess_body": "Record  Deleted   Successfully"
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },

  get_deleted_alert_Data: function (req, res) {
    var Obj = legalSqlc.get_deleted_alert_Data(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },


  // *****************************************CUSTOM FIELLDS************************************
  GetSystemDeletedData: function (req, res) {
    var Obj = legalSqlc.GetSystemDeletedData(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successustomfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  get_fieldDeleted_Data: function (req, res) {
    var Obj = legalSqlc.get_fieldDeleted_Data(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
    },
  deletefield_rec: function (req, res) {
    var Obj = legalSqlc.deletefield_rec(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Deleted !",
          "mess_body": "Record  Deleted Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord  Deleted  !",
          "mess_body": "Record  Deleted   Successfully"
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },
  Add_field: function (req, res) {
    var obj1 = legalSqlc.check_fields(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {
      if (record.rowCount > 0) {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
      } else {
        var obj2 = legalSqlc.Add_field(req, res);
        dbqyeryexecute.nodeServerBridge(obj2).then(record => {
          log.info({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows[0]
          });
          res.status(200).json({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows[0]
          });
        }).catch(err => {
          if (err.code == "22001") {
            log.error({
              "status": 400,
              "mess": "Error!",
              "mess_body": "Data Too long.",
              data: err.message
            });
            res.status(400).json({
              "status": 400,
              "mess": "Error!",
              "mess_body": "Data Too long.",
              data: err.message
            });
          } else {
            log.error({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: err.message
            });
            res.status(404).json({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: err.message
            });
          }
        })
      }

    }).catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });

  },

  get_field_detail: function (req, res) {
    var Obj = legalSqlc.get_field_detail(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },

  get_field_Data: function (req, res) {
    // var sqls = legalSqlc.get_field_Data(req, res);
    // dbqyeryexecute.connect_pool(sqls).then(record => {
      var obj1 = legalSqlc.get_field_Data(req, res);
      dbqyeryexecute.nodeServerBridge(obj1).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },

  update_field: function (req, res) {
    var obj = legalSqlc.update_field(req, res);
    dbqyeryexecute.nodeServerBridge(obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },
  deletefield_rec: function (req, res) {
    var Obj = legalSqlc.deletefield_rec(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Deleted !",
          "mess_body": "Record  Deleted Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord  Deleted  !",
          "mess_body": "Record  Deleted   Successfully"
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },

  // *****************************************ALERT TRANSACTION************************************
  deleted_data: function (req, res) {
    var Obj = legalSqlc.deleted_data(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },

  getAllalert: function (req, res) {
    var sqls = legalSqlc.getAllalert(req, res);
    dbqyeryexecute.connect_pool(sqls).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },

  get_asset: function (req, res) {
    var sqls = legalSqlc.get_asset(req, res);
    dbqyeryexecute.connect_pool(sqls).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },

  get_alerttransaction_Data: function (req, res) {
    // var sqls = legalSqlc.get_alerttransaction_Data(req, res);
    // dbqyeryexecute.connect_pool(sqls).then(record => {
      var obj1 = legalSqlc.get_alerttransaction_Data(req, res);
      dbqyeryexecute.nodeServerBridge(obj1).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  insert_alerttransaction: function (req, res) {
    var obj1 = legalSqlc.check_alerttransaction(req, res);
    dbqyeryexecute.nodeServerBridge(obj1).then(record => {

      
      if (record.rowCount > 0) {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Already Available",
          data: record.rows[0]
        });
      } else {
        var obj2 = legalSqlc.insert_alerttransaction(req, res);
        dbqyeryexecute.nodeServerBridge(obj2).then(record => {
          log.info({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows[0]
          });
          res.status(200).json({
            "status": 200,
            "mess": "Record Saved !",
            "mess_body": "Record Added Successfully",
            data: record.rows[0]
          });
        }).catch(err => {
          if (err.code == "22001") {
            log.error({
              "status": 400,
              "mess": "Error!",
              "mess_body": "Data Too long.",
              data: err.message
            });
            res.status(400).json({
              "status": 400,
              "mess": "Error!",
              "mess_body": "Data Too long.",
              data: err.message
            });
          } else {
            log.error({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: err.message
            });
            res.status(404).json({
              "status": 500,
              "mess": "Record not Found !",
              "mess_body": "Somthing went Wrong.",
              data: err.message
            });
          }
        })
      }

    }).catch(err => {
      log.error({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err
      });
      res.status(404).json({
        "status": 500,
        "mess": "Record not Found !",
        "mess_body": "Somthing went Wrong.",
        data: err.message
      });
    });

  },

  edit_alerttransaction: function (req, res) {
    var Obj = legalSqlc.edit_alerttransaction(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  update_alerttransaction: function (req, res) {
    var obj = legalSqlc.update_alerttransaction(req, res);
    dbqyeryexecute.nodeServerBridge(obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },

  deletealerttransaction: function (req, res) {
    var Obj = legalSqlc.deletealerttransaction(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Deleted !",
          "mess_body": "Record  Deleted Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord  Deleted  !",
          "mess_body": "Record  Deleted   Successfully"
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },
  // ************************************ SYSTEM PARAMETER***************************************************
  getImage_data: function (req, res) {
    var Obj = legalSqlc.getImage_data(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows,
        });
        // console.log(data);

        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows
        });
        // console.log(data);

      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },

  deleteImg: function (req, res) {
    var Obj = legalSqlc.deleteImg(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Deleted !",
          "mess_body": "Record  Deleted Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord  Deleted  !",
          "mess_body": "Record  Deleted   Successfully"
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },

  insert_systemParameter: function (req, res) {


    var obj2 = legalSqlc.insert_systemParameter(req, res);
    dbqyeryexecute.nodeServerBridge(obj2).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Saved !",
        "mess_body": "Record Added Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Saved !",
        "mess_body": "Record Added Successfully",
        data: record.rows[0]
      });
    }).catch(err => {
      if (err.code == "22001") {
        log.error({
          "status": 400,
          "mess": "Error!",
          "mess_body": "Data Too long.",
          data: err.message
        });
        res.status(400).json({
          "status": 400,
          "mess": "Error!",
          "mess_body": "Data Too long.",
          data: err.message
        });
      } else {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      }
    })




  },

  get_systemparameter_detail: function (req, res) {
    var Obj = legalSqlc.get_systemparameter_detail(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },
  update_systemParameter: function (req, res) {
    var obj = legalSqlc.update_systemParameter(req, res);
    dbqyeryexecute.nodeServerBridge(obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord Updated !",
          "mess_body": "Record Updated Successfully",
          data: record.rows[0]
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not Updated  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },


  getsystemParameterData: function (req, res) {
    var Obj = legalSqlc.getsystemParameterData(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Get  Successustomfully",
          data: record.rows
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(404).json({
          "status": 500,
          "mess": "Record not Found !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });
  },

  deletesystemParameter: function (req, res) {
    var Obj = legalSqlc.deletesystemParameter(req, res);
    dbqyeryexecute.nodeServerBridge(Obj).then(record => {
        log.info({
          "status": 200,
          "mess": "Rrcord Deleted !",
          "mess_body": "Record  Deleted Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Rrcord  Deleted  !",
          "mess_body": "Record  Deleted   Successfully"
        });
      })
      .catch(err => {
        log.error({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err
        });
        res.status(500).json({
          "status": 500,
          "mess": "Record not  Deleted  !",
          "mess_body": "Somthing went Wrong.",
          data: err.message
        });
      });


  },

  //    ############################################ GANESH ##################################################
}