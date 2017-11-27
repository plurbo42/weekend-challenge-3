var express = require('express');
var router = express.Router();

var pool = require('../modules/pool')

router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT 
                            itemid,
                            detail, 
                            COALESCE(itemtype, '') AS itemtype, 
                            COALESCE(priority, '') AS priority, 
                            COALESCE(EXTRACT(MONTH FROM startdate) || '-' || EXTRACT(DAY FROM startdate) || '-' || EXTRACT(YEAR FROM startdate), '') AS startdate,  
                            COALESCE(EXTRACT(MONTH FROM duedate) || '-' || EXTRACT(DAY FROM duedate) || '-' || EXTRACT(YEAR FROM duedate), '') AS duedate, 
                            iscomplete,
                            (NOW() > duedate) AS isoverdue                            
                            FROM todo_item 
                            ORDER BY iscomplete, duedate;`, function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('query failed ', errorMakingQuery)
                    res.sendStatus(500);
                } else {
                    console.log(result.rows)
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
            client.query(`SELECT COUNT(itemid) 
                        FROM todo_item 
                        WHERE iscomplete = false;`, function (errorMakingQuery, result) {
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

router.post('/', function(req, res) {
    console.log(req.body, 'is the posted array 1')   
    var detail = req.body.detail;
    var itemtype = req.body.type;
    var priority = req.body.priority;
    var startdate = req.body.startdate;
    var duedate = req.body.duedate;
    console.log(req.body, 'is the posted array 2')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if(errorConnectingToDatabase) {
            console.log('error connecting to database ', errorConnectingToDatabase);
            res.sendStatus(500);
        }else{
            client.query(`INSERT INTO todo_item 
                        (detail, itemtype, priority, startdate, duedate, iscomplete) 
                        VALUES ($1, $2, $3, $4, $5, false)`, [detail, itemtype, priority, startdate, duedate], function(errorMakingQuery, result) {
                done();
                if(errorMakingQuery){
                    console.log('query failed ', errorMakingQuery);
                    res.sendStatus(500);
                }else {
                    res.sendStatus(200);
                }
            })
        }
    })
});

router.put('/:id', function(req, res){
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase) {
            console.log('error connecting to database ', errorConnectingToDatabase);
            res.sendStatus(500);
        }else{
            client.query(`UPDATE todo_item 
                        SET iscomplete = true 
                        WHERE itemid = $1`, [req.params.id], function (errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('query failed ', errorMakingQuery);
                    res.sendStatus(500);
                }else{
                    res.sendStatus(200);
                }
            })
        }
    })
});

router.delete('/:id', function(req, res){
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase) {
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        }else{
            client.query(`DELETE FROM todo_item 
                        WHERE itemid = $1`, [req.params.id], function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('query failed', errorMakingQuery);
                    res.sendStatus(500);
                }else{
                    res.sendStatus(200);
                }
            })
        }
    })
});

module.exports = router;