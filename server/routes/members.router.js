var router = require('express').Router();
var path = require('path');
var pool = require('../modules/pool.js');

//on View Members Load

//Request for view members
router.get('/', function (req, res) {
  console.log('in Get for view members');
  // check if logged in
  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        console.log(conErr)
        res.sendStatus(500);
      } else {
        console.log('running query')
        client.query('SELECT member_id, first_name, last_name, past_service FROM members ORDER BY last_name;', function (queryErr, resultObj) {
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
});//end view members Get call

//Get meetings by Year
router.get('/meetingsByYear/:id', function(req, res) {
  var meetingsYear = req.params.id
  console.log('in Get for meetingsbyYear', meetingsYear)
  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        res.sendStatus(500);
      } else {
        var valueArray = [meetingsYear]
        editQuery = 'SELECT * FROM meetings WHERE meetings.year = $1 ORDER BY meetings.year;'
        client.query(editQuery, valueArray, function (queryErr, resultObj) {
          done();
          if (queryErr) {
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



//add member Post
router.post('/', function (req, res) {
  var newMember = req.body;
  console.log('In Post New Member', req.body);
  if (req.isAuthenticated()) {
    pool.connect(function (connectionError, client, done) {
      if (connectionError) {
        console.log(connectionError);
        res.sendStatus(500);
      } else { 
        if (newMember.serviceArray.length == 0) {
          var gQuery = 'INSERT INTO members (first_name, last_name, institution, department, address_1, address_2, address_3, city, state, zipcode, country, phone, email, website, member_status, member_year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning member_id';
          var valueArray = [newMember.first_name, newMember.last_name, newMember.institution, newMember.department, newMember.address_1, newMember.address_2, newMember.address_3, newMember.city, newMember.state, newMember.zipcode, newMember.country, newMember.phone, newMember.email, newMember.website, newMember.member_status, newMember.member_year];
          client.query(gQuery, valueArray, function (queryError, resultObj) {
          done();
          if (queryError) {
            console.log(queryError);
            res.sendStatus(500);
          } else {
            console.log('new Member post successful', resultObj.rows);
            res.sendStatus(202);
          } //end result else
        }); //end query
      } //end if no arrays
        else {
          console.log('serviceArray running')  
          var gQuery = 'INSERT INTO members (first_name, last_name, institution, department, address_1, address_2, address_3, city, state, zipcode, country, phone, email, website, member_status, member_year, past_service) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) returning id';
            var valueArray = [newMember.first_name, newMember.last_name, newMember.institution, newMember.department, newMember.address_1, newMember.address_2, newMember.address_3, newMember.city, newMember.state, newMember.zipcode, newMember.country, newMember.phone, newMember.email, newMember.website, newMember.member_status, newMember.member_year, true];
          client.query(gQuery, valueArray, function (queryError, resultObj) {
            done();
            if (queryError) {
              console.log(queryError);
              res.sendStatus(500);
            } else {
              console.log('else', resultObj.rows[0].member_id)
              var serviceValueArray = []
              var $serviceArray = []
              var $blingPhrase = $serviceArray.join(', ')
              var $1 = 1

              newMember.serviceArray.forEach(function (element) {
                  serviceValueArray.push(resultObj.rows[0].member_id, element.meetings_id, element.service_type, element.start_date, element.end_date, element.add_info)
                })
                console.log('serviceValue Array', serviceValueArray)
              for(let i = 0; i<serviceValueArray.length; i++){
                $serviceArray.push('$' + $1++)
              }
              console.log($serviceArray)
              for(let k=0; k < $serviceArray.length-5; k+=6) {
                $serviceArray.splice(k, 1, '(' + $serviceArray[k])
              }
              for (let j=5; j < $serviceArray.length; j+=6) {
                $serviceArray.splice(j, 1, $serviceArray[j]+')')
              }
              console.log('$$serviceArray', $serviceArray)
              var $blingPhrase = $serviceArray.join(', ')
             
              var serviceQuery = 'INSERT INTO members_meetings (members_id, meetings_id, service_id, start_date, end_date, add_info) VALUES ' + $blingPhrase
              console.log('serviceQuery', serviceQuery)
              console.log('serviceValueArray', serviceValueArray)
              client.query(serviceQuery, serviceValueArray, function (queryError, resultObj) {
                done();
              if (queryError) {
                console.log(queryError);
                res.sendStatus(500);
              } else { 
              console.log('new Member post successful');
              res.sendStatus(202);
            } //end result else
          }); //end 2nd query
          } //end 2nd else
          }); //end query

        } //end if only serviceArray
      } //end pool else
    }) //end pool connect 
  } else {
    console.log('not logged in');
    res.send(false);//end auth if
  }
}) //end new member post

router.post('/memberToMeeting', function (req, res) {
  console.log('memberToMeetingrunning', req.body)
  var memberToMeeting = req.body
  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        console.log('pool.connect', conErr)
        res.sendStatus(500);
      } else {
        var valueArray = [memberToMeeting.member_id, memberToMeeting.meeting_id, memberToMeeting.service_type, memberToMeeting.start_date, memberToMeeting.end_date, memberToMeeting.add_info];
        memberToMeetingQuery = 'INSERT INTO members_meetings (members_id, meetings_id, service_id, start_date, end_date, add_info) VALUES ($1, $2, $3, $4, $5, $6)';
        client.query(memberToMeetingQuery, valueArray, function (queryErr, resultObj) {
          done();
          if (queryErr) {
            console.log('error', queryErr)
            res.sendStatus(500);
          } else {
            console.log('202')
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
}); //end add member to meeting

//get member to edit
router.post('/getmember', function (req, res) {
  console.log('get member running', req.body)
  var memberToEdit = req.body
  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        console.log('pool.connect', conErr)
        res.sendStatus(500);
      } else {
        var valueArray = [memberToEdit.member_id]
        if (memberToEdit.past_service == false) {
        editQuery = 'SELECT * FROM members WHERE member_id = $1';
        } else {
          editQuery = 'SELECT * FROM members FULL JOIN members_meetings ON members.member_id = members_meetings.members_id FULL JOIN meetings ON meetings.meeting_id = members_meetings.meetings_id FULL JOIN service ON service.service_id = members_meetings.service_id WHERE members.member_id = $1'
        }
        client.query(editQuery, valueArray, function (queryErr, resultObj) {
          done();
          if (queryErr) {
            console.log('error', queryErr)
            res.sendStatus(500);
          } else {
            console.log('getmemberreturn', resultObj.rows)
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

//edit member information
router.put('/', function (req, res) {
  var editMember = req.body;
  console.log('In PUT edit Member', req.body);
  if (req.isAuthenticated()) {
    pool.connect(function (connectionError, client, done) {
      if (connectionError) {
        console.log(connectionError);
        res.sendStatus(500);
      } else {
        var valueArray = []
        var tempvarQuery = []
        var bling = 0
        for (var i = 0 in editMember) {
          valueArray.push(editMember[i]);
          }
        for (const prop in editMember) {
          bling++
          var eb = ' = $'
          tempvarQuery.push(prop+eb+bling)
        }
        var queryFields = tempvarQuery.join(', ')
        var gQuery = 'UPDATE members SET ' + queryFields + ' WHERE member_id = $1 Returning past_service'
        console.log('line 113 query, value arry:', gQuery, valueArray)
        client.query(gQuery, valueArray, function(queryError, resultObj) {
            done();
            if(queryError) {
                console.log(queryError);
                res.sendStatus(500);
            } else {
                console.log('Update member Put successful');
                res.send(resultObj.rows);
            } //end result else
        }); //end query
      } //end pool else
    }) //end pool connect 
  } else {
    console.log('not logged in');
    res.send(false);//end auth if
  }
}); //end edit member

//edit member Service
router.put('/service', function (req, res) {
  var editService = req.body;
  console.log('In PUT edit Service', req.body);
  if (req.isAuthenticated()) {
    pool.connect(function (connectionError, client, done) {
      if (connectionError) {
        console.log(connectionError);
        res.sendStatus(500);
      } else {
        var valueArray = []
        var tempvarQuery = []
        var bling = 0
        for (var i = 0 in editService) {
          valueArray.push(editService[i]);
          }
        for (const prop in editService) {
          bling++
          var eb = ' = $'
          tempvarQuery.push(prop+eb+bling)
        }
        var queryFields = tempvarQuery.join(', ')
        var gQuery = 'UPDATE members_meetings SET ' + queryFields + ' WHERE members_id = $1 returning members_id'
        console.log('line 113 query, value arry:', gQuery, valueArray)
        client.query(gQuery, valueArray, function(queryError, resultObj) {
            done();
            if(queryError) {
                console.log('1st error',queryError);
                res.sendStatus(500);
            } else {
              console.log('res', resultObj.rows[0])
              var sQuery = 'SELECT member_id FROM members INNER JOIN members_meetings ON members.member_id = members_meetings.members_id WHERE members_meetings.members_id = $1';
              var valueArray2 = [resultObj.rows[0].members_id];
              client.query(sQuery, valueArray2, function (queryError, resultObj) {
              done();
                if (queryError) {
                  console.log('2nd error', queryError);
                  res.sendStatus(500);
                } else {
                console.log('Update member Put successful', resultObj.rows[0]);
                res.send(resultObj.rows[0]);
            } //end result else
        }); //end query
      };
      }) 
    }//end pool else
    }) //end pool connect 
  } else {
    console.log('not logged in');
    res.send(false);//end auth if
  }
}); //end edit member
//delete member
router.put('/delete/:id', function(req, res) {
  var deleteMember = req.params.id
  console.log('deleteMember', deleteMember)
    if (req.isAuthenticated()) {
      pool.connect(function (conErr, client, done) {
    if (conErr) {
      res.sendStatus(500);
    } else {
      var valueArray = [deleteMember]
      pQuery = 'DELETE FROM members WHERE members.member_id = $1;'
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

module.exports = router;

