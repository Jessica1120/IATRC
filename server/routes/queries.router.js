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
});//end Get Institutions
router.post('/membersBy', function(req,res) {
  var membersBy = req.body;
  console.log('membersBy', membersBy)
  var property = Object.keys(membersBy)
  console.log('property', property);
 
  if(req.isAuthenticated()) {
    pool.connect(function (connectionError, client, done) {
      if (connectionError) {
        console.log(connectionError);
        res.sendStatus(500);
      } else {
        var query = "SELECT member_id, first_name, last_name FROM members WHERE " + property[0] + " = $1"
        console.log('query', query)
        var valueArray = Object.values(membersBy)
        console.log('value', valueArray)
        client.query(query, valueArray, function (queryError, resultObj) {
          done();
          if (queryError) {
            console.log(queryError);
            res.sendStatus(500);
          } else {
            resultObj.rows.unshift(property[0])
            res.send(resultObj.rows)            
            console.log(resultObj.rows)
          }
        })
      } //end connection else
    })//end pool.connect
  }//end Auth if 
    else {
      console.log('not logged in');
      res.send(false);
    }
}) //end membersBy
module.exports = router;