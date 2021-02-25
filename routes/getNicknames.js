var express = require("express");
var mysql = require('mysql');
var router = express.Router();

router.get("/", function (req, res, next) {
    var id = req.query.id;
    var ids = "";

    var con = mysql.createConnection({
        insecureAuth: true, // handle this
        host: "localhost",
        user: "root",
        password: "1337724",
        database: "eventsdb"
    });

    con.connect();

    con.query("SELECT Nickname , Id FROM profiles WHERE NOT (Id = '" + id + "')", function (err, result, fields) {
        res.send(result);
    });
});

module.exports = router;