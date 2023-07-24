const mysql = require("mysql");
let mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
})

let connection = mysqlConnection.connect((err)=>{
    if(err){
        console.log("Error is DB connection: " + JSON.stringify(err,undefined,2));
    }
    else {
        console.log("Db connection is successful");
    }
});
module.exports = mysqlConnection;