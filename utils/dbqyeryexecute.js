const { Pool, Client } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/Vertiv_Asset_DB";


module.exports = {


    nodeServerBridge: function (obj) {
        const pool = new Pool({
            connectionString: connectionString,
          });
        return new Promise(function (resolve, reject) {
            pool.query(obj.queryString, obj.arr, function (error, results) {
                try {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                } catch (err) { 
                    reject(err);
                }
            });
            pool.end();
        });
    },
    
    executeSelect: function (query, con) {
        return new Promise(function (resolve, reject) {
            con.query(query, function (error, results) {
                try {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                } catch (err) {
                    console.log("Json Error : " + err)
                    var errMess = '';
                    reject(err);
                }
            })
        });
    },

    connect_pool: function (query) {
        const pool = new Pool({
            connectionString: connectionString,
          });
          
        return new Promise(function (resolve, reject) {
            pool.query(query, function (error, results) {
                try {
                    if (error) {
                        rejecct(error);
                    } else {
                        resolve(results);
                    }
                } catch (err) { 
                    reject(err);
                }
            });
            
            pool.end();
        });
    },
}






// const { Pool, Client } = require('pg');
// const connectionString = process.env.DATABASE_URL || "postgres://postgres:root@localhost:5433/Vertiv_Asset_DB";


// module.exports = {

//     nodeServerBridge: function (obj) {
//         const pool = new Pool({
//             connectionString: connectionString,
//           });
//         return new Promise(function (resolve, reject) {
//             pool.query(obj.queryString, obj.arr, function (error, results) {
//                 try {
//                     if (error) {
//                         reject(error);
//                     } else {
//                         resolve(results);
//                     }
//                 } catch (err) { 
//                     reject(err);
//                 }
//             });
//             pool.end();
//         });
//     },
// }
