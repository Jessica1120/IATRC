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
router.post('/meetingsBy', function(req,res) {
  var meetingsBy = req.body;
  console.log('meetsBy', meetingsBy)
  var property = Object.keys(meetingsBy)
  console.log('property', property);
 
  if(req.isAuthenticated()) {
    pool.connect(function (connectionError, client, done) {
      if (connectionError) {
        console.log(connectionError);
        res.sendStatus(500);
      } else {
        if (meetingsBy.type == "Other") {
        var query="SELECT * FROM meetings WHERE " + property[0] + " NOT in ($1, $2, $3)"
        var valueArray = ["Annual", "Symposium", "Outreach"]
        } else {
        var query="SELECT * FROM meetings WHERE " + property[0] + " = $1"
        var valueArray = Object.values(meetingsBy)
        }
        console.log('query', query)
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
      //  end connection else
    }
    })//end pool.connect
  }//end Auth if 
    else {
      console.log('not logged in');
      res.send(false);
    }
}) //end membersBy
router.get('/countries', function (req, res) {
  console.log('in Get for query');
  // check if logged in
  if (req.isAuthenticated()) {
    pool.connect(function (conErr, client, done) {
      if (conErr) {
        console.log(conErr)
        res.sendStatus(500);
      } else {
        console.log('running query')
        client.query('SELECT meeting_country FROM meetings ORDER BY meeting_country Asc;', function (queryErr, resultObj) {
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
});//end Get Countries
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
        var qStart = "SELECT member_id, first_name, last_name, start_date, end_date FROM members FULL JOIN members_meetings ON members.member_id = members_meetings.members_id FULL JOIN meetings ON meetings.meeting_id = members_meetings.meetings_id WHERE members_meetings.service_id "
        var qEnd = " ORDER BY last_name"
        if (property[0] == "service_id" && membersBy.service_id == "6" && property[1] == "start_date" && property[2] == "end_date") {
          console.log('Any - start and end')
          var query = qStart + " != 6 AND start_date >= $1 AND start_date <= $2" + qEnd
          var valueArray = [membersBy.start_date, membersBy.end_date]
        } 
        else if (property[0] == "service_id" && membersBy.service_id == "6" && property[1] == "start_date") {
          console.log('Any - start only')
          var query = qStart + " !6 AND start_date <= $1" + qEnd
          var valueArray = [membersBy.start_date]
        } 
        else if (property[0] == "service_id" && membersBy.service_id == "6" && property[1] == "end_date") {
          console.log('Any - end only')
          var query = qStart + " !6 AND start_date >= $1" + qEnd
          var valueArray = [membersBy.end_date]
        } 
        else if (property[0] == "service_id" && membersBy.service_id !== "6" && property[1] == "start_date" && property[2] == "end_date") { 
          console.log('specific service - start and end date')
          var query =  qStart + "= $1 AND start_date >= $2 AND start_date <= $3" + qEnd
          var valueArray = [membersBy.service_id, membersBy.start_date, membersBy.end_date]
        } 
        else if (property[0] == "service_id" && membersBy.service_id !== "6" && property[1] == "start_date") { 
          console.log('specific service - start only')
          var query =  qStart + "= $1 AND start_date <= $2" + qEnd
          var valueArray = [membersBy.service_id, membersBy.start_date]
        } 
        else if (property[0] == "service_id" && membersBy.service_id !== "6" && property[1] == "end_date") { 
          console.log('specific service - end date only')
          var query =  qStart + "= $1 AND start_date <= $2" + qEnd
          var valueArray = [membersBy.service_id, membersBy.end_date]
        } 
        else if (property[0] == "service_id" && membersBy.service_id !== "6" ) {
         console.log('specific service only')
         var query =  qStart + "= $1" + qEnd
         var valueArray = [membersBy.service_id]
        } else {
          var query = "SELECT member_id, first_name, last_name FROM members WHERE " + property[0] + " = $1"
          console.log('not service')
          var valueArray = Object.values(membersBy)
        }
        console.log('query', query)
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
      //  end connection else
    }
    })//end pool.connect
  }//end Auth if 
    else {
      console.log('not logged in');
      res.send(false);
    }
}) //end membersBy

router.post('/membersByYear', function(req,res) {
  var membersByYear = req.body;
  var property = Object.keys(membersByYear)
  console.log('property', property);
  console.log('membersBy', membersByYear)
   if(req.isAuthenticated()) {
    pool.connect(function (connectionError, client, done) {
      if (connectionError) {
        console.log(connectionError);
        res.sendStatus(500);
      } else {
        var sQuery = "SELECT member_id, first_name, last_name, member_year FROM members "
        var valueArray = Object.values(membersByYear)
        if (property[0]== "start_date" && property[1] == "end_date") {
          var query = sQuery + "WHERE member_year >= $1 AND member_year <= $2 ORDER BY member_year"
        } else if (property[0] == "start_date" ){
          var query = sQuery + "WHERE member_year >= $1"
        } else {
          var query = sQuery + "WHERE member_year <= $1 ORDER BY member_year"
        }
        console.log('value', valueArray)
        client.query(query, valueArray, function (queryError, resultObj) {
          done();
          if (queryError) {
            console.log(queryError);
            res.sendStatus(500);
          } else {
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