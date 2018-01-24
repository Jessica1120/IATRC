var router = require('express').Router();
var path = require('path');
var pool = require('../modules/pool.js');



//Request for view meetings on page load
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
  





//get Meeting to Edit
router.get('/get/:id', function (req, res) {
  var meetingToEdit = req.params.id
  console.log('in Get for meeting', req.params.id)
  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        res.sendStatus(500);
      } else {
        var valueArray = [meetingToEdit]
        editQuery = 'SELECT * FROM meetings FULL JOIN members_meetings ON meetings.meeting_id = members_meetings.meetings_id FULL JOIN members ON members.member_id = members_meetings.members_id WHERE meetings.meeting_id = $1 ORDER BY members.last_name;'
        client.query(editQuery, valueArray, function (queryErr, resultObj) {
          done();
          if (queryErr) {
            console.log('query error:', queryErr)
            res.sendStatus(500);
          } else {
            console.log(resultObj.rows)
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

//save changes to meeting
router.put('/', function (req, res){
  var editMeeting = req.body;  
  console.log('in Put for edit Meeting', editMeeting);
  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        console.log('Pool.connect error', conErr);
        res.sendStatus(500);
      } else {
        console.log('first Query running'); //determines if non-Array changes exist
        var valueArray = []
        var tempvarQuery = []
        var bling = 0
        for (var i = 0 in editMeeting) {
          if (editMeeting[i] instanceof Array) {
          console.log('Array')
          } else {
          valueArray.push(editMeeting[i]);
          }
        }  //end for loop for values    
        for (const prop in editMeeting) {
          if (prop == "attended" || prop == "absent") {
          } else {
            bling++
            var eb = ' = $'
            tempvarQuery.push(prop+eb+bling)
          } 
          }//end for loop for temp array of properties
        var queryFields = tempvarQuery.join(', ') //fields are non array properties (topic etc.)
        var editQuery = 'UPDATE meetings SET ' + queryFields + ' WHERE meeting_id = $1'
        console.log('editQuery', editQuery, valueArray)
        client.query(editQuery, valueArray, function (queryErr, resultObj) {
          done();
          if (queryErr) {
            console.log('queryError', queryErr);
            res.sendStatus(500);
          } else { 
            console.log('edit query successful') 
            if (editMeeting.absent.length > 0) {
               //defines remove Members
              var deleteBling = 2
              var blingArray = []
              editMeeting.absent.unshift(editMeeting.meeting_id)
              for(let i=0; i< editMeeting.absent.length-1; i++) {
              blingArray.push('$' + deleteBling++)
              } 
              var deleteQuery = 'DELETE FROM members_meetings WHERE members_id in (' + blingArray + ') AND meetings_id = $1'
              console.log('deleteQuery', deleteQuery, editMeeting.absent)
              client.query(deleteQuery, editMeeting.absent, function (queryErr, resultObj) {
              done();
                if (queryErr) {
                console.log('deleteQuery error', queryErr)
                res.sendStatus(500);
                } else {
                  console.log('deleteQuery Successful')
                }
                }); //end deleteQuery query
                }    else { //end if absent array has contents 
                console.log('absent Array empty')
                }
            if (editMeeting.attended.length > 0) {
              var addBling = 1
              var blingArray2 = []
              var attendedPairs = []
              for(let i=0; i< editMeeting.attended.length; i++) {
                attendedPairs.push(editMeeting.attended[i], editMeeting.meeting_id)
              }
              for(let j=0; j<attendedPairs.length/2; j++) {
                blingArray2.push(' ($' + addBling++ + ', $' + addBling++ + ')')
              }
              var addQuery = 'INSERT INTO members_meetings (members_id, meetings_id) VALUES ' + blingArray2
              console.log('addQuery', addQuery, attendedPairs)
              client.query(addQuery, attendedPairs, function (queryErr, resultObj) {
              done();
              if (queryErr) {
                console.log('done 500', queryErr)
                res.sendStatus(500);
                } else {
                console.log('202')
                res.sendStatus(202)
              }
            }) //end addMembers Query
          }; //end attended if
          }; // end first query error/success
       }); //end first client query 
      } //ends first else for queries 
    }); //end first pool connect
  } else {
    console.log('not logged in');
    res.send(false)
  } //end authentication
}); //end save changes to meeting

router.put('/delete/:id', function(req, res) {
  var deleteMeeting = req.params.id
  console.log('deleteMeeting', deleteMeeting)
    if (req.isAuthenticated()) {
      pool.connect(function (conErr, client, done) {
    if (conErr) {
      res.sendStatus(500);
    } else {
      valueArray = [deleteMeeting]
      pQuery = 'DELETE FROM meetings WHERE meetings.meeting_id = $1;'
      console.log('pQuery', pQuery)
      console.log('valueArray', valueArray)
      client.query(pQuery, valueArray, function (queryErr, resultObj) {
        done();
        if (queryErr) {
          res.sendStatus(500);
        } else {
          res.sendStatus(202);
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
}); //end delete member

//Add Meeting
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
}) //end add meeting post

module.exports = router;

     
//end if absent array has contents 