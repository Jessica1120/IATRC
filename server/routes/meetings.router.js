var router = require('express').Router();
var path = require('path');
var pool = require('../modules/pool.js');



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
  

router.put('/', function (req, res) {
    var meetingToEdit = req.body
    console.log('In PUT for edit Member', meetingToEdit);
    if (req.isAuthenticated()) {
      console.log('isAuthentication')
      pool.connect(function (conErr, client, done) {
        console.log('poolconnect')
        if (conErr) {
          res.sendStatus(500);
        } else {
          var valueArray = [meetingToEdit.type, meetingToEdit.topic, meetingToEdit.month, meetingToEdit.year, meetingToEdit.id]
          console.log('valueArray', valueArray)
          editQuery = 'UPDATE meetings SET type=$1, topic=$2, month=$3, year=$4 WHERE id=$5' 
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
  }); //end save Edit meeting call 

//get Meeting to Edit
router.get('/get/:id', function (req, res) {
  var meetingToEdit = req.params.id
  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        res.sendStatus(500);
      } else {
        var valueArray = [meetingToEdit]
        editQuery = 'SELECT * FROM meetings FULL JOIN members_meetings ON meetings.id = members_meetings.meetings_id FULL JOIN members ON members.id = members_meetings.members_id WHERE members_meetings.meetings_id = $1 ORDER BY members.last_name;'
        client.query(editQuery, valueArray, function (queryErr, resultObj) {
          done();
          if (queryErr) {
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
}); //end get member to edit get call



  //post new meeting
router.post('/', function(req, res) {
  var newMeeting = req.body;
      console.log('In Post New Meeting', req.body);
      if (req.isAuthenticated()) {
      pool.connect(function(connectionError, client, done){
          if(connectionError) {
              console.log(connectionError);
              res.sendStatus(500);
          } else {
              var gQuery = 'INSERT INTO meetings (type, topic, month, year) VALUES ($1, $2, $3, $4)';
              var valueArray = [newMeeting.type, newMeeting.topic, newMeeting.month, newMeeting.year];
              client.query(gQuery, valueArray, function(queryError, resultObj) {
                  done();
                  if(queryError) {
                      console.log(queryError);
                      res.sendStatus(500);
                  } else {
                      console.log('new Meeting post successful');
                      res.sendStatus(202);
                  } //end result else
              }); //end query
          } //end pool else
      }) //end pool connect 
    } else {
        console.log('not logged in');
        res.send(false);//end auth if
      }
}) //end meeting post
  module.exports = router;