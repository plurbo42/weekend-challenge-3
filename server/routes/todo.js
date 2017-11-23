var express = require('express');
var router = express.Router();

var pool = require('../modules/pool')

router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM todo_item ORDER BY duedate desc;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('query failed ', errorMakingQuery)
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    });
});


router.get('/incomplete', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT COUNT(itemid) FROM todo_item WHERE iscomplete = false;', function (errorMakingQuery, result) {
                done();
                console.log(result.rows, 'is the result yo')
                if (errorMakingQuery) {
                    console.log('query failed ', errorMakingQuery)
                    res.sendStatus(500);
                } else {
                    res.send(result.rows[0]);
                }
            })
        }
    });
});





module.exports = router;