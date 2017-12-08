var router = require('express').Router();
var path = require('path');
var pool = require('../modules/pool.js');

//on View Members Load

//Request for view members
router.get('/view', function (req, res) {
  console.log('in Get for view members');
  // check if logged in
  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        res.sendStatus(500);
      } else {
        client.query('SELECT * FROM members', function (queryErr, resultObj) {
          done();
          if (queryErr) {
            res.sendStatus(500);
          } else {
            res.send(resultObj.rows);
          }
        });
      }
    })
  } else {
    console.log('not logged in');
    res.send(false);
  }
});//end view members Get call

module.exports = router;