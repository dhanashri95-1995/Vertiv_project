
var dbqyeryexecute = require("./../../utils/dbqyeryexecute"); // this is for Query execution phase
var legalSqlc = require("./legalSqlc.js");
var config = require("./../../config/config"); // this is for Query execution phase with COnnection
var con = config.connection;

var log4js = require('log4js');
var log = log4js.getLogger("app");
//    var legalEmail = require("./legalEmailService");   // This is emailing .js
var jwtauth = require("./legalVerifyToken")

module.exports = {
    get_user_detail: function (req, res) {
        var sqls = legalSqlc.get_user_detail(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows[0] });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows[0] });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    update_my_profile: function (req, res) {
        var sqls = legalSqlc.update_my_profile(req, res);
        jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
            if (req.token_status == 'Verify') { 
                dbqyeryexecute.connect_pool(sqls, con).then(record => {
                    res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Profile Updated Successfully" });
                })
                    .catch(err => {
                        res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                    });
            }else if(req.token_status == 'TokenExpired'){  
                res.status(500).json({ "status": 500, "mess": "Token Expired !", "mess_body": "Please verify with us."});
            }else if(req.token_status == 'InvalidToken'){
                res.status(500).json({ "status": 500, "mess": "Invalid Token !", "mess_body": "Please verify with us."});
            }
        })
    },
  
    check_user_record: function (req, res) {
        var sqls = legalSqlc.check_user_record(req, res);
        // if(record.rowCount!=0){
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            if(record.rowCount!=0){
                log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Record Already Available", data: record.rows[0] });
                res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Record Already Available", data: record.rows[0] });
            }else{
                var sqls = legalSqlc.save_user_record(req, res);
                dbqyeryexecute.connect_pool(sqls, con).then(record => {
                log.info({ "status": 200, "mess": "Record Saved !", "mess_body": "Record Added Successfully", data: record.rows[0] });
                res.status(200).json({ "status": 200, "mess": "Record Saved !", "mess_body": "Record Added Successfully", data: record.rows[0] });
            })
        }
           
        }) .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
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




    check_user_recorqd: function (req, res) {
        var sqls = legalSqlc.check_user_record(req, res);
        jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
        // dbqyeryexecute.connect_pool(sqls, con).then(record => {
        // dbqyeryexecute.executeSelect(pslmsSqlc.check_user_record(req, res), con).then(data => {
                // res.status(200).json(data)
                if(record.rowCount>0){


                    res.status(200).json({ status: 200, successMessage: "Email Id Alredy exists in the sysytem !!" });
                    res.status(200).json(data)
                }
                else{
                    // res.status(200).json(data);
                    dbqyeryexecute.executeSelect(pslmsSqlc.save__user_record(req, res), con).then(data => {
                        res.status(200).json(data)
                    })
                    // .catch(err => {
                    //     console.log("Json Error : " + err)
                    //     res.status(500).json(err);
                    // });
                }
            })
            .catch(err => {
                console.log("Json Error : " + err)
                res.status(500).json(err);
            });
    },
   


    
    get_user_Data: function (req, res) {
        var sqls = legalSqlc.get_user_Data(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },


    

    get_user_Databyid: function (req, res) {
        var sqls = legalSqlc.get_user_Databyid(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    
    
    update_user_Data: function (req, res) {
        var sqls = legalSqlc.update_user_Data(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
           
            res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Profile Updated Successfully" });
        })
            .catch(err => {
                res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    
    deleteUserById: function (req, res) {
        var sqls = legalSqlc.deleteUserById(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
           
            res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Deleted Successfully" });
        })
            .catch(err => {
                res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
// ********************************************ROLE master****************************************************
  
    save_role_record: function (req, res) {
        var sqls = legalSqlc.save_role_record(req, res);
        jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
            if (req.token_status == 'Verify') { 
                dbqyeryexecute.connect_pool(sqls, con).then(record => {
                    res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "User Added Successfully" });
                })
                    .catch(err => {
                        res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                    });
            }else if(req.token_status == 'TokenExpired'){  
                res.status(500).json({ "status": 500, "mess": "Token Expired !", "mess_body": "Please verify with us."});
            }else if(req.token_status == 'InvalidToken'){
                res.status(500).json({ "status": 500, "mess": "Invalid Token !", "mess_body": "Please verify with us."});
            }
        })
    },

    check_role_record: function (req, res) {
        var sqls = legalSqlc.check_role_record(req, res);
       
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            if(record.rowCount>0){
                log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Record Already Available", data: record.rows[0] });
                res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Record Already Available", data: record.rows[0] });
            }else{
                var sqls = legalSqlc.save_role_record(req, res);
                dbqyeryexecute.connect_pool(sqls, con).then(record => {
                log.info({ "status": 200, "mess": "Record Saved !", "mess_body": "Record Added Successfully", data: record.rows[0] });
                res.status(200).json({ "status": 200, "mess": "Record Saved !", "mess_body": "Record Added Successfully", data: record.rows[0] });
            })
        }
           
        }) .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
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
    
    get_role_Data: function (req, res) {
        var sqls = legalSqlc.get_role_Data(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },


    get_role_Databyid: function (req, res) {
        var sqls = legalSqlc.get_role_Databyid(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    update_role_Data: function (req, res) {
        var sqls = legalSqlc.update_role_Data(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
           
            res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Profile Updated Successfully" });
        })
            .catch(err => {
                res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    deleteroleById: function (req, res) {
        var sqls = legalSqlc.deleteroleById(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
           
            res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Deleted Successfully" });
        })
            .catch(err => {
                res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
//    *********************************************USER ROLE MAPPING************************************************
    
    save_user_role_record: function (req, res) {
        var sqls = legalSqlc.save_user_role_record(req, res);
        jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
            if (req.token_status == 'Verify') { 
                dbqyeryexecute.connect_pool(sqls, con).then(record => {
                    res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Added Successfully" });
                })
                    .catch(err => {
                        res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                    });
            }else if(req.token_status == 'TokenExpired'){  
                res.status(500).json({ "status": 500, "mess": "Token Expired !", "mess_body": "Please verify with us."});
            }else if(req.token_status == 'InvalidToken'){
                res.status(500).json({ "status": 500, "mess": "Invalid Token !", "mess_body": "Please verify with us."});
            }
        })
    },

    
    get_role_Data: function (req, res) {
        var sqls = legalSqlc.get_role_Data(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },


    get_role_Databyid: function (req, res) {
        var sqls = legalSqlc.get_role_Databyid(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    update_user_role_Data: function (req, res) {
        var sqls = legalSqlc.update_user_role_Data(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
           
            res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Updated Successfully" });
        })
            .catch(err => {
                res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    deleteroleById: function (req, res) {
        var sqls = legalSqlc.deleteroleById(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
           
            res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Deleted Successfully" });
        })
            .catch(err => {
                res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    get_user_role_Data: function (req, res) {
        var sqls = legalSqlc.get_user_role_Data(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    getuserroleById: function (req, res) {
        var sqls = legalSqlc.getuserroleById(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    deleteuserroleById: function (req, res) {
        var sqls = legalSqlc.deleteuserroleById(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
           
            res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Deleted Successfully" });
        })
            .catch(err => {
                res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },


//    ***********************************************STATUS MASTER*********************************************************
  
 save_status_record: function (req, res) {
    var sqls = legalSqlc.save_status_record(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
        if (req.token_status == 'Verify') { 
            dbqyeryexecute.connect_pool(sqls, con).then(record => {
                res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Status Added Successfully" });
            })
                .catch(err => {
                    res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                });
        }else if(req.token_status == 'TokenExpired'){  
            res.status(500).json({ "status": 500, "mess": "Token Expired !", "mess_body": "Please verify with us."});
        }else if(req.token_status == 'InvalidToken'){
            res.status(500).json({ "status": 500, "mess": "Invalid Token !", "mess_body": "Please verify with us."});
        }
    })
},


get_status_Data: function (req, res) {
    var sqls = legalSqlc.get_status_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},


get_status_Databyid: function (req, res) {
    var sqls = legalSqlc.get_status_Databyid(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},
update_status_Data: function (req, res) {
    var sqls = legalSqlc.update_status_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
       
        res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Profile Updated Successfully" });
    })
        .catch(err => {
            res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},
deletestatusById: function (req, res) {
    var sqls = legalSqlc.deletestatusById(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
       
        res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Deleted Successfully" });
    })
        .catch(err => {
            res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},


    // ************************************RAKE MASTER BY AFRIN*****************************************
    Save_Rake_Data: function (req, res) {
        var sqls = legalSqlc. Save_Rake_Data(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Added !", "mess_body": "Rack Data Successfully Added", data: record.rows[0] });
            res.status(200).json({ "status": 200, "mess": "Record Added!", "mess_body": "Rack Data Successfully Added.", data: record.rows[0] });
           ;
        })
            .catch(err => {
            log.error({ "status": 500, "mess": "Record not Added !", "mess_body": "Server side Error", data: err });
            res.status(500).json({ "code": 500, "status": 500, "mess": "Error !", "mess_body": "Server side Error." })
                
            });
    },
    get_Rake_Data: function (req, res) {
        var sqls = legalSqlc.get_Rake_Data(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Get Successfully", data: record.rows });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Get Successfully", data: record.rows });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    get_Rake_Data_byid: function (req, res) {
        var sqls = legalSqlc.get_Rake_Data_byid(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Got Successfully", data: record.rows[0] });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Get Successfully", data: record.rows[0] });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    update_Rake_Data: function (req, res) {
        var sqls = legalSqlc.update_Rake_Data(req, res);
      
            
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Rrcord Updated !", "mess_body": "Rake Data Updated Successfully", data: record.rows[0] });
            res.status(200).json({ "status": 200, "mess": "Rrcord Updated !", "mess_body": "Rake Updated   Successfully", data: record.rows[0] });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Updated  !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(500).json({ "status": 500, "mess": "Record not Updated  !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
            
        
    },
    Delete_Rake_Data: function (req, res) {
        var sqls = legalSqlc.Delete_Rake_Data(req, res);
      
            
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Rrcord Deleted !", "mess_body": "Rake Data  Deleted Successfully", data: record.rows[0] });
            res.status(200).json({ "status": 200, "mess": "Rrcord  Deleted  !", "mess_body": "Rake  Deleted   Successfully", data: record.rows[0] });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not  Deleted  !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(500).json({ "status": 500, "mess": "Record not  Deleted  !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
            
        
    },
    get_data_center: function (req, res) {
        var sqls = legalSqlc.get_data_center(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Get Successfully", data: record.rows });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Get Successfully", data: record.rows });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    get_data_center_room: function (req, res) {
        var sqls = legalSqlc.get_data_center_room(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Get Successfully", data: record.rows });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Get Successfully", data: record.rows });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    


     // ************************************RACKU MASTER*****************************************
     Save_RackU_Data: function (req, res) {
        var sqls = legalSqlc. Save_RackU_Data(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Added !", "mess_body": "RackU Data Successfully Added", data: record.rows[0] });
            res.status(200).json({ "status": 200, "mess": "Record Added!", "mess_body": "RackU Data Successfully Added.", data: record.rows[0] });
           ;
        })
            .catch(err => {
            log.error({ "status": 500, "mess": "Record not Added !", "mess_body": "Server side Error", data: err });
            res.status(500).json({ "code": 500, "status": 500, "mess": "Error !", "mess_body": "Server side Error." })
                
            });
    },
    get_RackU_Data: function (req, res) {
        var sqls = legalSqlc.get_RackU_Data(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "RackU Data  Successfully", data: record.rows });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "RackU Data Get Successfully", data: record.rows });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(500).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    get_RackU_Data_byid: function (req, res) {
        var sqls = legalSqlc.get_RackU_Data_byid(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "RackU Data Got Successfully", data: record.rows[0] });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data  Successfully", data: record.rows[0] });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    update_RackU_Data: function (req, res) {
        var sqls = legalSqlc.update_RackU_Data(req, res);
      
            
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Rrcord Updated !", "mess_body": "RackU Data Updated Successfully", data: record.rows[0] });
            res.status(200).json({ "status": 200, "mess": "Rrcord Updated !", "mess_body": "RackU Updated Successfully", data: record.rows[0] });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Updated  !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(500).json({ "status": 500, "mess": "Record not Updated  !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
            
        
    },
    Delete_RackU_Data: function (req, res) {
        var sqls = legalSqlc.Delete_RackU_Data(req, res);
      
            
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Rrcord Deleted !", "mess_body": "RackU Data  Deleted Successfully", data: record.rows[0] });
            res.status(200).json({ "status": 200, "mess": "Rrcord  Deleted  !", "mess_body": "RackU  Deleted   Successfully" });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not  Deleted  !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(500).json({ "status": 500, "mess": "Record not  Deleted  !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
            
        
    },
    get_Rake_name: function (req, res) {
        var sqls = legalSqlc.get_Rake_name(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Rake name  Successfully", data: record.rows });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Rake name  Get Successfully", data: record.rows });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(500).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },

     // ************************************ASSET MASTER*****************************************
     Save_Asset_Data: function (req, res) {
        var sqls = legalSqlc. Save_Asset_Data(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Added !", "mess_body": "Asset Data Successfully Added", data: record.rows[0] });
            res.status(200).json({ "status": 200, "mess": "Record Added!", "mess_body": "Asset Data Successfully Added.", data: record.rows[0] });
           ;
        })
            .catch(err => {
            log.error({ "status": 500, "mess": "Record not Added !", "mess_body": "Server side Error", data: err });
            res.status(500).json({ "code": 500, "status": 500, "mess": "Error !", "mess_body": "Server side Error." })
                
            });
    },
    get_Asset_Data: function (req, res) {
        var sqls = legalSqlc.get_Asset_Data(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "AssetData  Successfully", data: record.rows });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Asset Data Get Successfully", data: record.rows });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(500).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    get_Asset_Data_byid: function (req, res) {
        var sqls = legalSqlc.get_Asset_Data_byid(req, res);
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Asset Data Got Successfully", data: record.rows[0] });
            res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Asset Data  Successfully", data: record.rows[0] });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
    },
    update_Asset_Data: function (req, res) {
        var sqls = legalSqlc.update_Asset_Data(req, res);
      
            
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Rrcord Updated !", "mess_body": "Asset Data Updated Successfully", data: record.rows[0] });
            res.status(200).json({ "status": 200, "mess": "Rrcord Updated !", "mess_body": "Asset Updated Successfully", data: record.rows[0] });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not Updated  !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(500).json({ "status": 500, "mess": "Record not Updated  !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
            
        
    },
    Delete_Asset_Data: function (req, res) {
        var sqls = legalSqlc.Delete_Asset_Data(req, res);
      
            
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            log.info({ "status": 200, "mess": "Rrcord Deleted !", "mess_body": "Asset Data  Deleted Successfully", data: record.rows[0] });
            res.status(200).json({ "status": 200, "mess": "Rrcord  Deleted  !", "mess_body": "Asset  Deleted   Successfully" });
        })
            .catch(err => {
                log.error({ "status": 500, "mess": "Record not  Deleted  !", "mess_body": "Somthing went Wrong.", data: err });
                res.status(500).json({ "status": 500, "mess": "Record not  Deleted  !", "mess_body": "Somthing went Wrong.", data: err.message });
            });
            
        
    },
        // ************************************ASSET MAPPING*****************************************
        Save_Asset_Map_Data: function (req, res) {
            var sqls = legalSqlc. Save_Asset_Map_Data(req, res);
            dbqyeryexecute.connect_pool(sqls, con).then(record => {
                log.info({ "status": 200, "mess": "Record Added !", "mess_body": "Asset Map Data Successfully Added", data: record.rows[0] });
                res.status(200).json({ "status": 200, "mess": "Record Added!", "mess_body": "Asset Map Data Successfully Added.", data: record.rows[0] });
               ;
            })
                .catch(err => {
                log.error({ "status": 500, "mess": "Record not Added !", "mess_body": "Server side Error", data: err });
                res.status(500).json({ "code": 500, "status": 500, "mess": "Error !", "mess_body": "Server side Error." })
                    
                });
        },
        get_Asset_Map_Data: function (req, res) {
            var sqls = legalSqlc.get_Asset_Map_Data(req, res);
            dbqyeryexecute.connect_pool(sqls, con).then(record => {
                log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Asset Map Data  Successfully", data: record.rows });
                res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Asset Map Data Get Successfully", data: record.rows });
            })
                .catch(err => {
                    log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                    res.status(500).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
                });
        },
        get_Asset_Map_Data_byid: function (req, res) {
            var sqls = legalSqlc.get_Asset_Map_Data_byid(req, res);
            dbqyeryexecute.connect_pool(sqls, con).then(record => {
                log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Asset Map RackU Data Got Successfully", data: record.rows[0] });
                res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Asset Map Data  Successfully", data: record.rows[0] });
            })
                .catch(err => {
                    log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                    res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
                });
        },
        update_Asset_Map_Data: function (req, res) {
            var sqls = legalSqlc.update_Asset_Map_Data(req, res);
          
                
            dbqyeryexecute.connect_pool(sqls, con).then(record => {
                log.info({ "status": 200, "mess": "Rrcord Updated !", "mess_body": "Asset Map Data Updated Successfully", data: record.rows[0] });
                res.status(200).json({ "status": 200, "mess": "Rrcord Updated !", "mess_body": "Asset Map Updated Successfully", data: record.rows[0] });
            })
                .catch(err => {
                    log.error({ "status": 500, "mess": "Record not Updated  !", "mess_body": "Somthing went Wrong.", data: err });
                    res.status(500).json({ "status": 500, "mess": "Record not Updated  !", "mess_body": "Somthing went Wrong.", data: err.message });
                });
                
            
        },
        Delete_Asset_Map_Data: function (req, res) {
            var sqls = legalSqlc.Delete_Asset_Map_Data(req, res);
          
                
            dbqyeryexecute.connect_pool(sqls, con).then(record => {
                log.info({ "status": 200, "mess": "Rrcord Deleted !", "mess_body": "Asset Map Data  Deleted Successfully", data: record.rows[0] });
                res.status(200).json({ "status": 200, "mess": "Rrcord  Deleted  !", "mess_body": "Asset Map  Deleted   Successfully" });
            })
                .catch(err => {
                    log.error({ "status": 500, "mess": "Record not  Deleted  !", "mess_body": "Somthing went Wrong.", data: err });
                    res.status(500).json({ "status": 500, "mess": "Record not  Deleted  !", "mess_body": "Somthing went Wrong.", data: err.message });
                });
                
            
        },
        get_Tag_name: function (req, res) {
            var sqls = legalSqlc.get_Tag_name(req, res);
            dbqyeryexecute.connect_pool(sqls, con).then(record => {
                log.info({ "status": 200, "mess": "Record Found !", "mess_body": "RackU Data  Successfully", data: record.rows });
                res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "RackU Data Get Successfully", data: record.rows });
            })
                .catch(err => {
                    log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                    res.status(500).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
                });
        },
    
        get_rake: function (req, res) {
            var sqls = legalSqlc.get_rake(req, res);
            dbqyeryexecute.connect_pool(sqls, con).then(record => {
                log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Got Successfully", data: record.rows });
                res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Get Successfully", data: record.rows});
            })
                .catch(err => {
                    log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                    res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
                });
            },
            get_asset_desc: function (req, res) {
                var sqls = legalSqlc.get_asset_desc(req, res);
                dbqyeryexecute.connect_pool(sqls, con).then(record => {
                    log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Got Successfully", data: record.rows });
                    res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Get Successfully", data: record.rows});
                })
                    .catch(err => {
                        log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                        res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
                    });
                },
                get_n_u_id: function (req, res) {
                    var sqls = legalSqlc.get_n_u_id(req, res);
                    dbqyeryexecute.connect_pool(sqls, con).then(record => {
                        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Got Successfully", data: record.rows });
                        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Get Successfully", data: record.rows});
                    })
                        .catch(err => {
                            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
                        });
                    },
                get_status: function (req, res) {
                    var sqls = legalSqlc.get_status(req, res);
                    dbqyeryexecute.connect_pool(sqls, con).then(record => {
                        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Got Successfully", data: record.rows });
                        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Rake Data Get Successfully", data: record.rows});
                    })
                        .catch(err => {
                            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
                            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
                        });
                    },
// *****************************************AFRIN'S CODE END HERE***********************************************************




// ****************************************************ASMITA*****************************************************

//---------------------------------------------country master----------------------------------------//

save_country_record: function (req, res) {
    var sqls = legalSqlc.save_country_record(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
        if (req.token_status == 'Verify') { 
            dbqyeryexecute.connect_pool(sqls, con).then(record => {
                res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "User Added Successfully" });
            })
                .catch(err => {
                    res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                });
        }else if(req.token_status == 'TokenExpired'){  
            res.status(500).json({ "status": 500, "mess": "Token Expired !", "mess_body": "Please verify with us."});
        }else if(req.token_status == 'InvalidToken'){
            res.status(500).json({ "status": 500, "mess": "Invalid Token !", "mess_body": "Please verify with us."});
        }
    })
},

get_country_Data: function (req, res) {
    var sqls = legalSqlc.get_country_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},


get_country_Databyid: function (req, res) {
    var sqls = legalSqlc.get_country_Databyid(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},
update_country_Data: function (req, res) {
    var sqls = legalSqlc.update_country_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
       
        res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Profile Updated Successfully" });
    })
        .catch(err => {
            res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},
deletecountryById: function (req, res) {
    var sqls = legalSqlc.deletecountryById(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
       
        res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Deleted Successfully" });
    })
        .catch(err => {
            res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},


//---------------------------------------------state master---------------------------------///



save_state_record: function (req, res) {
    var sqls = legalSqlc.save_state_record(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
        if (req.token_status == 'Verify') { 
            dbqyeryexecute.connect_pool(sqls, con).then(record => {
                res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "User Added Successfully" });
            })
                .catch(err => {
                    res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                });
        }else if(req.token_status == 'TokenExpired'){  
            res.status(500).json({ "status": 500, "mess": "Token Expired !", "mess_body": "Please verify with us."});
        }else if(req.token_status == 'InvalidToken'){
            res.status(500).json({ "status": 500, "mess": "Invalid Token !", "mess_body": "Please verify with us."});
        }
    })
},

get_state_Data: function (req, res) {
    var sqls = legalSqlc.get_state_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},

get_floor_loc: function (req, res) {
    var sqls = legalSqlc. get_floor_loc(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},

get_state_Databyid: function (req, res) {
    var sqls = legalSqlc.get_state_Databyid(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},
update_state_Data: function (req, res) {
    var sqls = legalSqlc.update_state_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
       
        res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Profile Updated Successfully" });
    })
        .catch(err => {
            res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},
deletestateById: function (req, res) {
    var sqls = legalSqlc.deletestateById(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
       
        res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Deleted Successfully" });
    })
        .catch(err => {
            res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},


get_State_id: function (req, res) {
    var sqls = legalSqlc.get_state_id(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},

///-------------------------------------------------datacenter door-----------------------------------------//


save_datacenter_door_record: function (req, res) {
    var sqls = legalSqlc.save_datacenter_door_record(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
        if (req.token_status == 'Verify') { 
            dbqyeryexecute.connect_pool(sqls, con).then(record => {
                res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "User Added Successfully" });
            })
                .catch(err => {
                    res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                });
        }else if(req.token_status == 'TokenExpired'){  
            res.status(500).json({ "status": 500, "mess": "Token Expired !", "mess_body": "Please verify with us."});
        }else if(req.token_status == 'InvalidToken'){
            res.status(500).json({ "status": 500, "mess": "Invalid Token !", "mess_body": "Please verify with us."});
        }
    })
},

get_datacenter_door_Data: function (req, res) {
    var sqls = legalSqlc.get_datacenter_door_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},


get_datacenter_door_ById: function (req, res) {
    var sqls = legalSqlc.get_datacenter_door_ById(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},
update_datacenter_door_Data: function (req, res) {
    var sqls = legalSqlc.update_datacenter_door_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
       
        res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Profile Updated Successfully" });
    })
        .catch(err => {
            res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},
delete_datacenter_door_ById: function (req, res) {
    var sqls = legalSqlc.delete_datacenter_door_ById(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
       
        res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Deleted Successfully" });
    })
        .catch(err => {
            res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},




///--------------------------------------------------datacenter room---------------------------------------//

save_datacenter_room_record: function (req, res) {
    var sqls = legalSqlc.save_datacenter_room_record(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
        if (req.token_status == 'Verify') { 
            dbqyeryexecute.connect_pool(sqls, con).then(record => {
                res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "User Added Successfully" });
            })
                .catch(err => {
                    res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                });
        }else if(req.token_status == 'TokenExpired'){  
            res.status(500).json({ "status": 500, "mess": "Token Expired !", "mess_body": "Please verify with us."});
        }else if(req.token_status == 'InvalidToken'){
            res.status(500).json({ "status": 500, "mess": "Invalid Token !", "mess_body": "Please verify with us."});
        }
    })
},

get_datacenter_room_Data: function (req, res) {
    var sqls = legalSqlc.get_datacenter_room_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},


get_datacenter_room_ById: function (req, res) {
    var sqls = legalSqlc.get_datacenter_room_ById(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},
update_datacenter_room_Data: function (req, res) {
    var sqls = legalSqlc.update_datacenter_room_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
       
        res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Profile Updated Successfully" });
    })
        .catch(err => {
            res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},
delete_datacenter_room_ById: function (req, res) {
    var sqls = legalSqlc.delete_datacenter_room_ById(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
       
        res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Deleted Successfully" });
    })
        .catch(err => {
            res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},



///-------------------------------datacenter location --------------------------------------//

save_datacenter_location_record: function (req, res) {
    var sqls = legalSqlc.save_datacenter_location_record(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
        if (req.token_status == 'Verify') { 
            dbqyeryexecute.connect_pool(sqls, con).then(record => {
                res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "User Added Successfully" });
            })
                .catch(err => {
                    res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
                });
        }else if(req.token_status == 'TokenExpired'){  
            res.status(500).json({ "status": 500, "mess": "Token Expired !", "mess_body": "Please verify with us."});
        }else if(req.token_status == 'InvalidToken'){
            res.status(500).json({ "status": 500, "mess": "Invalid Token !", "mess_body": "Please verify with us."});
        }
    })
},

get_datacenter_location_Data: function (req, res) {
    var sqls = legalSqlc.get_datacenter_location_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},
get_State_ID: function (req, res) {
    var sqls = legalSqlc.get_State_ID(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},
get_datacenter_location_Databyid: function (req, res) {
    var sqls = legalSqlc.get_datacenter_location_Databyid(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
        res.status(200).json({ "status": 200, "mess": "Record Found !", "mess_body": "Welcome into ULAMS", data: record.rows });
    })
        .catch(err => {
            log.error({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},
update_datacenter_location_Data: function (req, res) {
    var sqls = legalSqlc.update_datacenter_location_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
       
        res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Profile Updated Successfully" });
    })
        .catch(err => {
            res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},
delete_datacenter_location_ById: function (req, res) {
    var sqls = legalSqlc.delete_datacenter_location_ById(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
       
        res.status(200).json({ "status": 200, "mess": "Updated !", "mess_body": "Record Deleted Successfully" });
    })
        .catch(err => {
            res.status(500).json({ "status": 500, "mess": "Not Updated !", "mess_body": "Somthing went Wrong.", data: err.message });
            res.status(404).json({ "status": 500, "mess": "Record not Found !", "mess_body": "Somthing went Wrong.", data: err.message });
        });
},

///////////////////////////////////////////////////////////////////////////////////////////

// ******************************************GANESH***************************************
// alert 
insert_alert: function (req, res) {
    var sqls = legalSqlc.insert_alert(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
      if (req.token_status == 'Verify') {
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            res.status(200).json({
              "status": 200,
              "mess": "Inserted !",
              "mess_body": "alert inserted Successfully"
            });
          })
          .catch(err => {
            res.status(500).json({
              "status": 500,
              "mess": "Not Inserted !",
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
  get_alert_Data: function (req, res) {
    var sqls = legalSqlc.get_alert_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Welcome into ULAMS",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Welcome into ULAMS",
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
  get_alert_detail: function (req, res) {
    var sqls = legalSqlc.get_alert_detail(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Alert Data Fetched Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Alert Data Fetched Successfully",
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
  update_alert: function (req, res) {
    var sqls = legalSqlc.update_alert(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
      if (req.token_status == 'Verify') {
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            res.status(200).json({
              "status": 200,
              "mess": "Updated !",
              "mess_body": "Alert Updated Successfully"
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
  deletealert_rec: function (req, res) {
    var sqls = legalSqlc.deletealert_rec(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
      if (req.token_status == 'Verify') {
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            res.status(200).json({
              "status": 200,
              "mess": "Deleted !",
              "mess_body": "Deleted Successfully"
            });
          })
          .catch(err => {
            res.status(500).json({
              "status": 500,
              "mess": "Not Inserted !",
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
  // custom filed
  Add_field: function (req, res) {
    var sqls = legalSqlc.Add_field(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
      if (req.token_status == 'Verify') {
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            res.status(200).json({
              "status": 200,
              "mess": "Inserted !",
              "mess_body": "filed created Successfully"
            });
          })
          .catch(err => {
            res.status(500).json({
              "status": 500,
              "mess": "Not Inserted !",
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
  get_field_Data: function (req, res) {
    var sqls = legalSqlc.get_field_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "all record fetch successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "all record fetch successfully",
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
  get_field_detail: function (req, res) {
    var sqls = legalSqlc.get_field_detail(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Fetched Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Fetched Successfully",
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
  update_field: function (req, res) {
    var sqls = legalSqlc.update_field(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
      if (req.token_status == 'Verify') {
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            res.status(200).json({
              "status": 200,
              "mess": "Updated !",
              "mess_body": " Updated Successfully"
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
  deletefield_rec: function (req, res) {
    var sqls = legalSqlc.deletefield_rec(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
      if (req.token_status == 'Verify') {
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            res.status(200).json({
              "status": 200,
              "mess": "Deleted !",
              "mess_body": "Deleted Successfully"
            });
          })
          .catch(err => {
            res.status(500).json({
              "status": 500,
              "mess": "Not Inserted !",
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

  //alert transaction

  getAllalert: function (req, res) {
    var sqls = legalSqlc.getAllalert(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "All Record Fetch succesfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "All Record Fetch succesfully",
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

  get_racku: function (req, res) {
    var sqls = legalSqlc.get_racku(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Fetch Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Fetch Successfully",
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
  get_asset: function (req, res) {
    var sqls = legalSqlc.get_asset(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Fetch Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Fetch Successfully",
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

  insert_alerttransaction: function (req, res) {
    var sqls = legalSqlc.insert_alerttransaction(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
      if (req.token_status == 'Verify') {
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            res.status(200).json({
              "status": 200,
              "mess": "Inserted !",
              "mess_body": " inserted Successfully"
            });
          })
          .catch(err => {
            res.status(500).json({
              "status": 500,
              "mess": "Not Inserted !",
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
   get_alerttransaction_Data: function (req, res) {
    var sqls = legalSqlc.get_alerttransaction_Data(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Fetch Successfully",
          data: record.rows
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Record Fetch Successfully",
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

  edit_alerttransaction: function (req, res) {
    var sqls = legalSqlc.edit_alerttransaction(req, res);
    dbqyeryexecute.connect_pool(sqls, con).then(record => {
        log.info({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": " Data Fetched Successfully",
          data: record.rows[0]
        });
        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": " Data Fetched Successfully",
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
    var sqls = legalSqlc.update_alerttransaction(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
      if (req.token_status == 'Verify') {
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            res.status(200).json({
              "status": 200,
              "mess": "Updated !",
              "mess_body": " Updated Successfully"
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
  deletealerttransaction: function (req, res) {
    var sqls = legalSqlc.deletealerttransaction(req, res);
    jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
      if (req.token_status == 'Verify') {
        dbqyeryexecute.connect_pool(sqls, con).then(record => {
            res.status(200).json({
              "status": 200,
              "mess": "Deleted !",
              "mess_body": "Deleted Successfully"
            });
          })
          .catch(err => {
            res.status(500).json({
              "status": 500,
              "mess": "Not Inserted !",
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
  

// ************************************ SYSTEM PARAMETER***************************************************
getImage_data: function (req, res) {
  var sqls = legalSqlc.getImage_data(req, res);
  dbqyeryexecute.connect_pool(sqls, con).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Fetch Successfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "Record Fetch Successfully",
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
deleteImg: function (req, res) {
  var sqls = legalSqlc.deleteImg(req, res);
  jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
    if (req.token_status == 'Verify') {
      dbqyeryexecute.connect_pool(sqls, con).then(record => {
          res.status(200).json({
            "status": 200,
            "mess": "Deleted !",
            "mess_body": "Deleted Successfully"
          });
        })
        .catch(err => {
          res.status(500).json({
            "status": 500,
            "mess": "Not Inserted !",
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
insert_systemParameter: function (req, res) {
  var sqls = legalSqlc.insert_systemParameter(req, res);
  jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
    if (req.token_status == 'Verify') {
      dbqyeryexecute.connect_pool(sqls, con).then(record => {
          res.status(200).json({
            "status": 200,
            "mess": "Inserted !",
            "mess_body": " inserted Successfully"
          });
        })
        .catch(err => {
          res.status(500).json({
            "status": 500,
            "mess": "Not Inserted !",
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
update_systemParameter: function (req, res) {
  var sqls = legalSqlc.update_systemParameter(req, res);
  jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
    if (req.token_status == 'Verify') {
      dbqyeryexecute.connect_pool(sqls, con).then(record => {
          res.status(200).json({
            "status": 200,
            "mess": "Updated !",
            "mess_body": " Updated Successfully"
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

getsystemParameterData: function (req, res) {
  var sqls = legalSqlc.getsystemParameterData(req, res);
  dbqyeryexecute.connect_pool(sqls, con).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "All Record Fetch succesfully",
        data: record.rows
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": "All Record Fetch succesfully",
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
  var sqls = legalSqlc.deletesystemParameter(req, res);
  jwtauth.jwtVrify(jwtauth.verifyToken(req, res), res, req, function (err, data) {
    if (req.token_status == 'Verify') {
      dbqyeryexecute.connect_pool(sqls, con).then(record => {
          res.status(200).json({
            "status": 200,
            "mess": "Deleted !",
            "mess_body": "Deleted Successfully"
          });
        })
        .catch(err => {
          res.status(500).json({
            "status": 500,
            "mess": "Not Inserted !",
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
get_systemparameter_detail: function (req, res) {
  var sqls = legalSqlc.get_systemparameter_detail(req, res);
  dbqyeryexecute.connect_pool(sqls, con).then(record => {
      log.info({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": " Data Fetched Successfully",
        data: record.rows[0]
      });
      res.status(200).json({
        "status": 200,
        "mess": "Record Found !",
        "mess_body": " Data Fetched Successfully",
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







  
}
