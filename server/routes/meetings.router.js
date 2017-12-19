var router = require('express').Router();
var path = require('path');
var pool = require('../modules/pool.js');

//on View Members Load

//Request for view meetings
router.get('/', function (req, res) {
    console.log('in Get for view meetings');
    // check if logged in
    if (req.isAuthenticated()) {
      pool.connect(function (conErr, client, done) {
        if (conErr) {
          res.sendStatus(500);
        } else {
          client.query('SELECT * FROM meetings', function (queryErr, resultObj) {
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
  
//get meeting to Edit
router.get('/get/:id', function (req, res) {
    var meetingToEdit = req.params.id
    console.log('In get for memberToEdit', meetingToEdit);
    if (req.isAuthenticated()) {
      console.log('isAuthentication')
      pool.connect(function (conErr, client, done) {
        console.log('poolconnect')
        if (conErr) {
          res.sendStatus(500);
        } else {
          var valueArray = [meetingToEdit]
          console.log('valueArray', valueArray)
          editQuery = 'SELECT * FROM meetings WHERE id = $1;' 
          client.query(editQuery, valueArray, function (queryErr, resultObj) {
            done();
            if (queryErr) {
              console.log('done 500', queryErr)
              res.sendStatus(500);
            } else {
              res.send(resultObj.rows);
              console.log('resultobj', resultObj.rows)
            }
          }) // end query
        } // end pool else
      }) // end pool connect
    } else {
      // failure best handled on the server. do redirect here.
      console.log('not logged in');
      // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
      res.send(false);
    } //end else
  }); //end get Meeting to Edit get call 

router.get('/getParticipants/:id', function (req, res) {
    var participants = req.params.id
    console.log('In get for participants', participants);
    if (req.isAuthenticated()) {
      console.log('isAuthentication')
      pool.connect(function (conErr, client, done) {
        console.log('poolconnect')
        if (conErr) {
          res.sendStatus(500);
        } else {
          var valueArray = [participants]
          console.log('valueArray', valueArray)
          editQuery = 'SELECT * FROM meetings FULL JOIN members_meetings ON meetings.id = members_meetings.meetings_id FULL JOIN members ON members.id = members_meetings.members_id WHERE members_meetings.meetings_id = $1;' 
          client.query(editQuery, valueArray, function (queryErr, resultObj) {
            done();
            if (queryErr) {
              console.log('done 500', queryErr)
              res.sendStatus(500);
            } else {
              res.send(resultObj.rows);
            }
          }) // end query
        } // end pool else
      }) // end pool connect
    } else {
      // failure best handled on the server. do redirect here.
      console.log('not logged in');
      // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
      res.send(false);
    } //end else
  }); //end get Meeting to Edit get call 
module.exports = router;