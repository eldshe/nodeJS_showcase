var express = require("express");
var mysql = require('mysql');
var router = express.Router();

router.get("/", function(req, res, next) {
    
var con = mysql.createConnection({
  insecureAuth : true, // handle this
  host: "localhost",
  user: "root",
  password: "1337724",  
  database:"eventsdb"
});

con.connect();

 con.query( "SELECT Events FROM Profiles WHERE Id=" + req.query.ID , function (err, result, fields) {      
    var evIds = result[0].Events.split(','); 
    
    var indexOrigin = req.query.indexOrigin;
    var indexDestiny = req.query.indexDestiny;
    
    var dragged = evIds[indexOrigin];
    evIds.splice(indexOrigin,1);
    evIds.splice(indexDestiny,0,dragged);    

    var orderedIdsString = evIds.join();

    con.query("UPDATE Profiles SET Events = '"+ orderedIdsString +"' WHERE Id ='" + req.query.ID + "';" , function (err, result, fields) {              
        }); 
    }); 


   
});

module.exports = router;