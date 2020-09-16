const mysql = require('mysql');
const email = require("emailjs");

const { Pool, Client } = require('pg');
const { SMTP } = require('emailjs/smtp/smtp');
 
module.exports = {
    connection: mysql.createConnection({
        connectionLimit: 100000, //focus it
        host: '127.0.0.1',
        user: 'root',
        password: 'Admin@123',
        database: 'db_bpmn_63',
        multipleStatements: true,
        port: 3306
    }),
    pool : new Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'Vertiv_DB',
        password: 'postgres',
        port: 5432,
      }),

    mailserver : email.server.connect({
        user:    "apponextit@gmail.com", 
	password:"nextacontroller", 
	host:"smtp.gmail.com", 
	port:465,
	ssl: true
    }),
}