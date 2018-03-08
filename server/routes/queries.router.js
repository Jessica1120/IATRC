var router = require('express').Router();
var path = require('path');
var pool = require('../modules/pool.js');

router.get('/', function (req, res) {
    console.log('in Get for query');
    // check if logged in
    if (req.isAuthenticated()) {
      pool.connect(function (conErr, client, done) {
        if (conErr) {
          console.log(conErr)
          res.sendStatus(500);
        } else {
          console.log('running query')
          client.query('SELECT institution FROM members ORDER BY institution Asc;', function (queryErr, resultObj) {
            done();
            if (queryErr) {
              console.log('query Error', queryErr)
              res.sendStatus(500);
            } else {
              console.log(resultObj.rows)
              res.send(resultObj.rows);
            }
          });
        }
      })
    } else {
      console.log('not logged in');
      res.send(false);
    }
  });//en
module.exports = router;