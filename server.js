const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const csv = require('csvtojson');
var csvToJson = require('convert-csv-to-json');
var log4js = require('log4js');

const email = require("emailjs");
// const busboy = require('connect-busboy'); 
const Busboy = require('busboy');
var path = require('path');
const app = express();

app.set('views', __dirname + '/public'); // Main Entrance of project     
app.use(express.static(__dirname + "/public")); // Main Entrance of Doctor 
// app.use(express.static(__dirname + "/public/assets")); // Main Entrance of Doctor 
// app.use(express.static(__dirname + "/public/email-templates")); // Main Entrance of Doctor 
// app.use(express.static(__dirname + "/public/landing-page")); // Main Entrance of Doctor 
// app.use(express.static(__dirname + "/public/Trident")); // Main Entrance of Doctor 
// app.use(express.static(__dirname + "/public/vendor")); // Main Entrance of Doctor 
app.use(express.static(__dirname + "/utils")); // Main Entrance of Doctor 


log4js.configure('./config/log4js.json');

app.set('view engine', 'ejs'); //extension of views
// app.use(bodyParser({
//   limit: '50mb'
// }));
app.use(bodyParser.json({
  limit: '10mb'
})); // this is 4 Json Data
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true,
  parameterLimit: 50
}));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'ssshhhhh'
}));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:9003/');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,application-json');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

var config = require('./config/config.js'); //this is server configuration file.
var con = config.connection; // DB conectivity  

// global variable 
var sess;
var sesss;
// var date = Date.now();  // current datetime 
/*******Login Page******/

var log = log4js.getLogger("app");
// routes goes here 
// var project_admin = require('./utils/route_goes_here');
// app.use('/dashboard', project_admin)  
app.use(log4js.connectLogger(log4js.getLogger("http"), {
  level: 'auto'
}));
// Url Routes goes here 

var legalRoutes = require("./routes/legalController/legalRoutes");
app.use('/vser-server', legalRoutes);
// var legalController = require("./routes/legalController/legalController.js");
// var legalsqlc = require("./routes/legalController/legalSqlc.js");

var pg_conn = require("./config/config");
var con = require("./utils/dbqyeryexecute").nodeServerBridge;


app.use(function (req, res, next) {
  const {
    rawHeaders,
    httpVersion,
    method,
    socket,
    url
  } = req;
  const {
    remoteAddress,
    remoteFamily
  } = socket;
  log.info(`Incoming request`,
    JSON.stringify({
      timestamp: Date.now(),
      rawHeaders,
      httpVersion,
      method,
      remoteAddress,
      remoteFamily,
      url
    })
  )
  next();
})
app.get('/', function (req, res) {
  res.sendfile("./public/index.html");
});

var jwt = require('jsonwebtoken');
// var bcrypt = require('bcrypt')
/*for testing deployment */
app.post('/login', function (req, res) {
  var user_name = req.body.username;
  var password = req.body.password;
  var obj = {};
  obj.queryString = "SELECT *,getrolename(roleid) as s_role  FROM login_process   WHERE s_email =$1  and s_pass=$2";
  obj.arr = [user_name, password];
  con(obj).then(data => {
      if (data.rows.length == 0) {
        log.warn({
          "status": 400,
          "mess": "Record Not Found !",
          "mess_body": "You have Entered Wrong Credentials."
        });
        res.status(400).json({
          "status": 400,
          "mess": "Record Not Found !",
          "mess_body": "You have Entered Wrong Credentials."
        });
      } else {
        if (data.rows[0].n_active != '1') {
          log.warn({
            "status": 400,
            "mess": "Deactive Account !",
            "mess_body": "Your account was deactive by Admin."
          });
          res.status(400).json({
            "status": 400,
            "mess": "Deactive Account !",
            "mess_body": "Your account was deactive by Admin."
          });
        } else if (data.rows[0].n_status != '0') {
          log.warn({
            "status": 400,
            "mess": "Delete Account !",
            "mess_body": "Your account was deleted by Admin."
          });
          res.status(400).json({
            "status": 400,
            "mess": "Delete Account !",
            "mess_body": "Your account was deleted by Admin."
          });
        }else{
          getsession(data.rows, req, res);
          var userdata = {
            s_email: data.rows[0].s_email,
            s_pass: data.rows[0].s_pass
          }
          var token = jwt.sign(userdata, "this is mine", {
            expiresIn: '1hr'
          }, {
            algorithm: 'RS256'
          });
          log.info({
            "status": 200,
            "mess": "Record Found !",
            "mess_body": "Credentials Successfully Authenticate."
          });
          res.status(200).json({
            "status": 200,
            "mess": "Record Found !",
            "mess_body": "Credentials Successfully Authenticate.",
            data: data.rows[0],
            token
          });
        }

      }
    })
    .catch(err => {
      console.log(err)
      log.error({
        "status": 500,
        "mess": "Error !",
        "mess_body": "Server side Error.",
        'err': err
      });
      res.status(500).json({
        "code": 500,
        "status": 500,
        "mess": "Error !",
        "mess_body": "Server side Error."
      });
    });
})



function getsession(data, req, res) {
  sess = req.session;
  sess.user_name = req.body.username;
  console.log(sess.user_name);
}



app.get('/main', function (req, res) {
  sess = req.session;
  if (sess.user_name) {
    res.sendfile('./public/main.html');
  } else {
    res.redirect('/login');
  }
})

app.get('/login', function (req, res) {
  sess = req.session;
  if (sess.user_name) {
    res.redirect('/main');
  } else {
    res.sendfile('./public/index.html');
  }
})

app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      log.info({
        "code": 500,
        "status": 500,
        "mess": "Logout !",
        "mess_body": "Logout Successfully.",
        'err': err
      });
      res.redirect('login');
    }
  })
})

/**
 * Upload photos route.
 */

app.post('/my_profile_pic', function (req, res) {
  try {
    var photos = [],
      fieldss = [];
    form = new formidable.IncomingForm();

    form.multiples = false;
    // Upload directory for the images
    form.uploadDir = path.join(__dirname, './public/assets/img/avatars/');

    // Invoked when a file has finished uploading.
    form.on('file', function (name, file) {
      try {
        // Allow only 3 files to be uploaded.
        if (photos.length === 2) {
          fs.unlink(file.path);
          return true;
        }

        var buffer = null,
          type = file.type,
          filename = '';

        // // Read a chunk of the file.
        // buffer = readChunk.sync(file.path, 0, 262);
        // // Get the file type using the buffer read using read-chunk
        // type = fileType(buffer);

        // Check the file type, must be either png,jpg or jpeg
        if (type !== null && (type === "image/png" || type === 'image/jpg' || type === 'image/jpeg')) {
          // Assign new file name
          filename = Date.now() + '-' + file.name;

          // Move the file with the new file name
          fs.rename(file.path, path.join(__dirname, './public/assets/img/avatars/' + filename), function (err, data) {
            if (err) {
              console.log(err);
            } else {
              // Add to the list of photos
              photos.push({
                status: true,
                filename: filename,
                type: type,
                publicPath: '/assets/img/avatars/' + filename,
                n_user_id: fieldss[0].n_user_id,
                s_email_id: fieldss[0].emailid
              });
              photos = photos[0];
              var obj = {};
              obj.queryString = `update tbl_user set n_img_path=$1 where s_user_id=$2 and s_email=$3;`
              obj.arr = [photos.publicPath, photos.n_user_id, photos.s_email_id]
              con(obj).then(data => {
                  res.status(200).json({
                    "status": 200,
                    "mess": "Updated !",
                    "mess_body": `Image Uploaded Successfully.`
                  });
                })
                .catch(err => {
                  res.status(500).json({
                    "code": 500,
                    "status": 500,
                    "mess": "Error !",
                    "mess_body": `Error Uploading file.`
                  });
                });
            }
          });

        } else {
          photos.push({
            status: false,
            filename: file.name,
            message: 'Invalid file type'
          });
          fs.unlink(file.path, function (err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log(`${file.path} deleted Succesfully.`)
            }
          });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    });

    form.on('error', function (err) {
      console.log('Error occurred during processing - ' + err);
    });

    // Invoked when all the fields have been processed.
    form.on('end', function (err, fields, files) {
      console.
      log(`All Process Done here`);
    });
    // Parse the incoming form fields.
    form.parse(req, (err, fields, files) => {
      console.log('fields:', fields);
      fieldss.push(fields);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// ************** GIVEN BY GANESH***************
///////////////server.js code for image uypload

app.post('/uploadImg', function (req, res) {
  try {
    var photos = [],
      fieldss = [];
    form = new formidable.IncomingForm();

    form.multiples = false;
    // Upload directory for the images
    form.uploadDir = path.join(__dirname, './public/assets/img/logos/');

    // Invoked when a file has finished uploading.
    form.on('file', function (name, file) {
      try {
        // Allow only 3 files to be uploaded.
        if (photos.length === 2) {
          fs.unlink(file.path);
          return true;
        }

        var buffer = null,
          type = file.type,
          filename = '';

        // // Read a chunk of the file.
        // buffer = readChunk.sync(file.path, 0, 262);
        // // Get the file type using the buffer read using read-chunk
        // type = fileType(buffer);

        // Check the file type, must be either png,jpg or jpeg
        if (type !== null && (type === "image/png" || type === 'image/jpg' || type === 'image/jpeg')) {
          // Assign new file name
          filename = Date.now() + '-' + file.name;

          // Move the file with the new file name
          fs.rename(file.path, path.join(__dirname, './public/assets/img/logos/' + filename), function (err, data) {
            if (err) {
              console.log(err);
            } else {
              // Add to the list of photos
              photos.push({
                status: true,
                filename: filename,
                type: type,
                s_og_name: file.name,
                publicPath: '/assets/img/logos/' + filename,
                n_user_id: fieldss[0].n_user_id,
                s_email_id: fieldss[0].s_login_id,
                n_system_param_id: fieldss[0].n_system_param_id1,

                s_type: fieldss[0].s_type
              });
              photos = photos[0];
              var date = new Date();
              var d_created_date = date.getTime();

              if (photos.n_system_param_id == "" || photos.n_system_param_id == undefined) {
                var obj = {}
                obj.queryString = `INSERT INTO tbl_temp_img  (s_og_name , s_new_name ,  s_path ,  s_type , s_created_by , d_created_date ) VALUES ($1,$2,$3,$4,$5,$6);`;


                obj.arr = [photos.s_og_name, photos.filename, photos.publicPath, photos.s_type, photos.s_email_id, d_created_date]

              } else if (photos.n_system_param_id != "") {
                var obj = {}

                // fieldss.logoid

                // var sql  = `INSERT INTO tbl_attachment_master  (s_og_name , s_new_name ,  s_path ,  s_type , s_created_by , d_created_date,n_system_param_id ) VALUES ($$${photos.s_og_name}$$, $$${photos.filename}$$,$$${photos.publicPath}$$,$$${photos.s_type}$$, $$${photos.s_email_id}$$,$$${d_created_date}$$,$$${photos.n_system_param_id}$$);`;

                obj.queryString = `INSERT INTO tbl_attachment_master  (s_og_name , s_new_name ,  s_path ,  s_type , s_created_by , d_created_date,n_system_param_id ) VALUES ($1,$2,$3,$4,$5,$6,$7);`;

                obj.arr = [photos.s_og_name, photos.filename, photos.publicPath, photos.s_type, photos.s_email_id, d_created_date, photos.n_system_param_id]



              }


              con(obj).then(data => {
                  res.status(200).json({
                    "status": 200,
                    "mess": "Updated !",
                    "mess_body": `Image Uploading Successfully.`
                  });
                })
                .catch(err => {
                  res.status(500).json({
                    "code": 500,
                    "status": 500,
                    "mess": "Error !",
                    "mess_body": `Error Uploading file.`
                  });
                });
            }
          });

        } else {
          photos.push({
            status: false,
            filename: file.name,
            message: 'Invalid file type'
          });
          fs.unlink(file.path, function (err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log(`${file.path} deleted Succesfully.`)
            }
          });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    });

    form.on('error', function (err) {
      console.log('Error occurred during processing - ' + err);
    });

    // Invoked when all the fields have been processed.
    form.on('end', function (err, fields, files) {
      console.log(`All Process Done here`);
    });
    // Parse the incoming form fields.
    form.parse(req, (err, fields, files) => {
      console.log('fields:', fields);
      fieldss.push(fields);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// *************** GANESH*******************
// *************** Export File*******************
var http = require("http").createServer(app);
// var fileSystem = require("fs");
var fastcsv = require("fast-csv");
app.use("/public/download", express.static(__dirname + "/public/download"));
app.post("/exportData", function (req, res) {
  var obj = {};
  obj.queryString = "SELECT * from tbl_asset_master where n_status=$1"
  obj.arr = ['0'];

  con(obj).then(data => {
      var ws = fs.createWriteStream("public/download/Assetdata.csv");
      fastcsv
        .write(data.rows, {
          headers: true
        })
        .on("finish", function () {

          res.send("<a href='public/download/Assetdata.csv' download='Assetdata.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>");
        })
        .pipe(ws);
      // log.info({ "status": 500, "mess": "Record Not Found !", "mess_body": "You have Entered Wrong Credentials." });
      // res.status(500).json({ "status": 500, "mess": "Record Not Found !", "mess_body": "You have Entered Wrong Credentials." });
    })
    .catch(err => {
      console.log(err)
      log.error({
        "code": 500,
        "status": 500,
        "mess": "Error !",
        "mess_body": "Server side Error.",
        'err': err
      });
      res.status(500).json({
        "code": 500,
        "status": 500,
        "mess": "Error !",
        "mess_body": "Server side Error."
      });
    });


});

// ***************************************CSV File Upload*******************************

app.post('/uploadAsset', function (req, res) {
  try {
    var photos = [],
      fieldss = [];
    form = new formidable.IncomingForm();

    form.multiples = false;
    // Upload directory 
    form.uploadDir = path.join(__dirname, './public/assets/img/avatars/');

    // Invoked when a file has finished uploading.
    form.on('file', function (name, file) {
      try {
        type = file.type,
          filename = '';
        // Check the file type, must be either png,jpg or jpeg
        if (type !== null && type === "application/vnd.ms-excel") {
          // filename = Date.now() + '-' + file.name;
          filename = Date.now() + '-' + name + '.csv';

          // Move the file with the new file name
          fs.rename(file.path, path.join(__dirname, './public/assets/img/avatars/' + filename), function (err, data) {
            if (err) {
              console.log(err);
            } else {
              var fileInputName = './public/assets/img/avatars/' + filename;

              const csvFilePath = fileInputName;

              var arruCsv = [];

              (async () => {
                const jsonObj = await csv().fromFile(csvFilePath)
                console.log(jsonObj);
                arruCsv.push(jsonObj);
                if (arruCsv.length == 0) {
                  return;
                } else {
                  var obj = {};
                  var CSVdata = arruCsv[0]
                  for (i = 0; i < CSVdata.length; i++) {
                    var date = new Date();
                    var d_created_date = date.getTime();

                    obj.queryString = `insert into tbl_asset_master(s_asset_name,n_asset_no,s_manufacturer_name,s_make,n_model_no,s_device_category,n_serial_number,n_barcode_number,s_owner_name,s_owner_email,n_u_size,n_u_position,d_install_date,n_u_height,s_supplier,s_rated_power, s_rated_current,n_rated_voltage,s_maintenance_cycle,s_contact_person,n_contact_number,d_next_maintenance,s_customized_notes,n_status,s_created_by,d_created_date) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)`;

                    obj.arr = [CSVdata[i].AssetName, CSVdata[i].AssetNo, CSVdata[i].Manufacrturer, CSVdata[i].Maker, CSVdata[i].ModelNo, CSVdata[i].DeviceCategory, CSVdata[i].SerialNo, CSVdata[i].BarcodeNo, CSVdata[i].OwnerName, CSVdata[i].OwnerEmail, CSVdata[i].Usize, CSVdata[i].Uposition, CSVdata[i].InstallDate, CSVdata[i].UHeight, CSVdata[i].Supplier, CSVdata[i].RatedPower, CSVdata[i].RatedCurrent, CSVdata[i].RatedVoltage, CSVdata[i].MaintenanceCycle, CSVdata[i].ContactPerson, CSVdata[i].ContactNo, CSVdata[i].NextMaintenance, CSVdata[i].CustomizedNote, '0', fieldss[0].s_created_by, d_created_date];
                    con(obj).then(data => {})
                      .catch(err => {
                        res.status(500).json({
                          "code": 500,
                          "status": 500,
                          "mess": "Error !",
                          "mess_body": `Error Uploading file.`
                        });
                      });
                  }
                  res.status(200).json({
                    "status": 200,
                    "mess": "Updated !",
                    "mess_body": `Image Uploading Successfully.`
                  });
                }
              })();


            }
          });

        } else {
          photos.push({
            status: false,
            filename: file.name,
            message: 'Invalid file type'
          });
          fs.unlink(file.path, function (err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log(`${file.path} deleted Succesfully.`)
            }
          });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    });

    form.on('error', function (err) {
      console.log('Error occurred during processing - ' + err);
    });

    // Invoked when all the fields have been processed.
    form.on('end', function (err, fields, files) {
      console.
      log(`All Process Done here`);
    });
    // Parse the incoming form fields.
    form.parse(req, (err, fields, files) => {
      console.log('fields:', fields);
      fieldss.push(fields);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
// ***************************************CSV File Upload End*******************************

//start server
var server = require('http').createServer(app)

// Start server
var port = process.env.PORT || 9003
server.listen(port, function () {
  log.info('Express server listening on port %d in %s mode', port, app.get('env'));
  console.log('Express server listening on port %d in %s mode', port, app.get('env'))
})