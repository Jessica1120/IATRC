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
        res.sendStatus(500);
      } else {
        client.query('SELECT id, first_name, last_name FROM members', function (queryErr, resultObj) {
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
        var gQuery = 'INSERT INTO members (first_name, last_name, institution, department, address_1, address_2, address_3, city, state, zipcode, country, phone, email, website, member_status, member_year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)';
        var valueArray = [newMember.first_name, newMember.last_name, newMember.institution, newMember.department, newMember.address_1, newMember.address_2, newMember.address_3, newMember.city, newMember.state, newMember.zipcode, newMember.country, newMember.phone, newMember.email, newMember.website, newMember.member_status, newMember.member_year];
        client.query(gQuery, valueArray, function (queryError, resultObj) {
          done();
          if (queryError) {
            console.log(queryError);
            res.sendStatus(500);
          } else {
            console.log('new Member post successful');
            res.sendStatus(202);
          } //end result else
        }); //end query
      } //end pool else
    }) //end pool connect 
  } else {
    console.log('not logged in');
    res.send(false);//end auth if
  }
}) //end game post

router.get('/get/:id', function (req, res) {
  var memberToEdit = req.params.id
  console.log('In get for memberToEdit', memberToEdit);
  if (req.isAuthenticated()) {
    console.log('isAuthentication')
    pool.connect(function (conErr, client, done) {
      console.log('poolconnect')
      if (conErr) {
        res.sendStatus(500);
      } else {
        var valueArray = [memberToEdit]
        console.log('valueArray', valueArray)
        editQuery = 'SELECT * FROM members WHERE id = $1;'
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
}); //end editForm get call

router.put('/', function (req, res) {
  var editMember = req.body;
  console.log('In PUT edit Member', req.body);
  if (req.isAuthenticated()) {
    pool.connect(function (connectionError, client, done) {
      if (connectionError) {
        console.log(connectionError);
        res.sendStatus(500);
      } else {
        valueArray = []
        tempvarQuery = []
        var bling = 0
        for (var i = 0 in editMember) {
          if (editMember[i] !== null || editMember[i] !== undefined) {
            valueArray.push(editMember[i])
          }
        }
        for (const prop in editMember) {
          if (editMember[i] !== null || editMember[i] !== undefined) {
            bling++
            tempvarQuery.push(prop+'=$'+bling)
          } 
        }
        var queryFields = tempvarQuery.join(', ')
        var gQuery = 'UPDATE members SET ' + queryFields + ' WHERE id = $1'
        console.log('query', gQuery)
        client.query(gQuery, valueArray, function(queryError, resultObj) {
            done();
            if(queryError) {
                console.log(queryError);
                res.sendStatus(500);
            } else {
                console.log('Update member Put successful');
                res.sendStatus(202);
            } //end result else
        }); //end query
      } //end pool else
    }) //end pool connect 
  } else {
    console.log('not logged in');
    res.send(false);//end auth if
  }
}) //end game post


module.exports = router;

