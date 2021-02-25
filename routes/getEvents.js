var express = require("express");
var mysql = require('mysql');
var router = express.Router();

router.get("/", function (req, res, next) {
    var id = req.query.id;
    var ids = "";
    var resos = "";
    var eventsAR = []; // obj = {event[] , eventmanage[] , managersnames[]}

    var con = mysql.createConnection({
        insecureAuth: true, // handle this
        host: "localhost",
        user: "root",
        password: "1337724",
        database: "eventsdb"
    });

    con.connect();

    con.query("SELECT Events FROM profiles WHERE Id=" + id, function (err, result, fields) {
        ids = result[0].Events;
        idsRaw = result[0].Events;
        ids = ids.replace(/,/g, " OR Id=");


        // get events array from event table:
        con.query("SELECT * FROM event WHERE Id=" + ids, function (err, result2, fields) {
            var eventIdStr = idsRaw.split(',');
            var orderedResults = [];
            for (var i = 0; i < eventIdStr.length; i++) {
                for (var y = 0; y < result2.length; y++) {
                    if (JSON.stringify(result2[y]).includes("\"Id\":" + eventIdStr[i] + ",")) {
                        orderedResults.push(result2[y]); break;
                    }
                }
            }

            eventsAR.push(orderedResults);

            // get event-management-settings array from eventmanage table:
            con.query("SELECT * FROM eventmanage WHERE Id=" + ids, function (err, result2, fields) {
                var eventIdStr = idsRaw.split(',');
                var orderedResults = [];
                for (var i = 0; i < eventIdStr.length; i++) {
                    for (var y = 0; y < result2.length; y++) {
                        if (JSON.stringify(result2[y]).includes("\"Id\":" + eventIdStr[i] + ",")) {
                            orderedResults.push(result2[y]); break;
                        }
                    }
                }

                eventsAR.push(orderedResults);

                // get array of manager-names array by event IDs:
                namesAR = [];
                var length = eventsAR[0].length;
                eventsAR[0].map((event, counter) => {
                    var ids = event.Managers;
                    ids = ids.replace(/,/g, " OR Id=");
                    con.query("SELECT Nickname FROM Profiles WHERE Id=" + ids, function (err, result, fields) {
                        var arr = [];
                        for (var i = 0; i < result.length; i++)
                            arr.push(result[i]);

                        namesAR.push(arr);
                        if (length === counter + 1) { //check if the last event mapped
                            eventsAR.push(namesAR);

                            res.send(eventsAR);
                        }
                    });
                });

            });
        });
    });
});

module.exports = router;