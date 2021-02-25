var express = require("express");
var mysql = require('mysql');
var router = express.Router();

router.get("/", function (req, res, next) {

  var con = mysql.createConnection({
    insecureAuth: true, // handle this
    host: "localhost",
    user: "root",
    password: "1337724",
    database: "eventsdb"
  });

  con.connect();

  if (req.query.action == "delete") {
    con.query("SELECT Events FROM Profiles WHERE Id=" + req.query.ID, function (err, result, fields) {
      var evIds = result[0].Events.split(',');

      const index = evIds.indexOf(req.query.eventID);
      if (index > -1) {
        evIds.splice(index, 1);
      }

      if (evIds.length > 0)
        evIds.join();
      else
        evIds = "";

      con.query("UPDATE Profiles SET Events = '" + evIds + "' WHERE Id ='" + req.query.ID + "';", function (err, result, fields) {
        res.send();
      });
    });
  }

  if (req.query.action == "create") {
    con.query('insert into Event (Title,Description,SDescription,isActive,Managers,nextDate) values (' + req.query.title + ',' + req.query.description + ',' + req.query.sdescription + ',' + req.query.isactive + ',' + req.query.managers + ',' + req.query.nextdate + ')', function (err, result, fields) {
    });
    con.query("SELECT LAST_INSERT_ID();", function (err, result, fields) {
      
      con.query("upda", function (err, result, fields) {
      
      });
    });
  }





});

module.exports = router;