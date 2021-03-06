myApp.service('UserService', function($http, $location){
    console.log('UserService Loaded');
    var self = this;
    
    //LOGIN OBJECT
    self.userObject = {};
   
    //MEMBER PAGE OBJECTS
    self.memberList = {data: []} //object for viewMembers get
    self.memberToEdit = {data:[]} // object for findMember
    self.meetingsByYear = {data: []} //object for findMeetingsByYear
    //meetings objects
    self.allMeetings = {data: []} //object for ViewMeetings get
    self.meetingToEdit = {data: []}//object for getMeeting
    self.allMembers = {data:[]} //object for ViewMembersMeeting
    self.updatedMeeting = {data:[]} // object for findMember
    self.serviceOnly = {data: []}
    self.meetings = {data: []}
    //QUERY OBJECTS
    self.institutions = {data: []}//object for Insitution list dropdown
    self.countries = {data: []} //object for Countries list dropdown
    //object for membersBy search
    self.countryArray = {data: []}
    self.insitutionArray = {data: []}
    self.stateArray = {data:[]}
    self.statusArray = {data: []}
    self.typeArray = {data:[]}
    self.yearArray = {data: []}
    self.serviceArray = []
    

//MEMBER PAGE FUNCTIONS - user.html view

//add service to existing member
self.addService = function(objToSend) {
  console.log('addService', objToSend)
  $http({
      method: 'POST',
      url:    'members/addService',
      data:   objToSend
  }).then(function(res) {
      console.log('addService response:', res );
      self.getMember(res.data);
    //need a confirmation alert or something here
  }); //end then
}; //end addService

self.deleteMember = function(deleteMemberId) {
  console.log('service delete running', deleteMemberId)
  return $http ({
    method: 'PUT',
    url: '/members/delete/' + deleteMemberId 
  }).then(function (res) {
    console.log(res)
    self.viewMembers()
  })
}
//deletes service from specific member
self.deleteService = function (objToSend) {
  console.log('deleteService', objToSend)
 return $http({
      method: 'DELETE',
      url:    'members/deleteService/' + objToSend 
  }).then(function(res) {
      console.log('deleteService response:', res.data );
      self.getMember(res.data[0]);
    //need a confirmation alert or something here
  }); //end then
}; //end deleteService
//edit service information
self.editService = function(objToSend) {
  console.log('service Obj', objToSend)
  return $http({
      method: 'PUT',
      url:    '/members/service',
      data:   objToSend
  }).then(function(res) {
      console.log('edit service res', res)
      self.getMember(res.data);
    // need a confirmation alert or something here
  }); //end then
}; //end editService
//get member to Edit
self.getMember = function(objToSend) {
  console.log('In findMember', objToSend)
  return $http({
    method: 'POST',
    url: '/members/getmember',
    data: objToSend
  }).then(function (res) {
    console.log('Response', res.data);
    self.memberToEdit.data = res.data;
    self.memberService();
  })
};
//gets service information for getMember function
self.memberService = function() { 
  self.serviceOnly.data = []
  self.meetings.data = []
  for(let i = 0; i < self.memberToEdit.data.length; i++) {
    if (self.memberToEdit.data[i].meetings_id == 1) {
      self.serviceOnly.data.push(self.memberToEdit.data[i])
    } else {
      self.meetings.data.push(self.memberToEdit.data[i])
    }
  }
  console.log('self.serviceOnly', self.serviceOnly)
  console.log('self.meetings', self.meetings)
}
//save edited non-service related information
self.saveEditMember = function(objToSend) {
  console.log('service Obj', objToSend)
  return $http({
      method: 'PUT',
      url:    '/members',
      data:   objToSend
  }).then(function(res) {
      self.getMember(objToSend);
    // need a confirmation alert or something here
  }); //end then
}; //end saveEditmember
//gets list of all members
self.viewMembers = function(){
  console.log('viewMembers in Service running')
  return $http({
    method: 'GET',
    url: '/members'
  })
    .then(function (res) {
    self.memberList.data = res.data
     self.getMember( self.memberList.data[0])
    })
  //   .then((self.memberList.data[0].member_id)
  //  ); //end call back function
}// end view Members


//ADDMEMBER PAGE FUNCTIONS
//addMember post Call 
self.addMember = function(objToSend) {
  console.log('inserviceobjtosend', objToSend)
  $http({
      method: 'POST',
      url:    '/members',
      data:   objToSend
  }).then(function(res) {
      console.log('addMember response:', res )
    })   
}; //end addMember
  //view Meetings by year
self.findMeetingsByYear = function(meetingYear){
      console.log('findMeetingByYear in Service running')
      return $http({
        method: 'GET',
        url: '/members/meetingsByYear/' + meetingYear
      })
        .then(function (res) {
          self.meetingsByYear.data = res.data;
         console.log('meetings by year', self.meetingsByYear.data)
        }) //end call back function
};// end findMeetingsByYear


//MEETINGS PAGE FUNCTIONS

//view meetings GET on page load
self.viewMeetings = function(){
  console.log('viewMeeting in Service running')
  return $http({
    method: 'GET',
    url: '/meetings'
  })
    .then(function (res) {
      self.allMeetings.data = res.data
      for (let i = 0; i < self.allMeetings.data.length; i++) {
        if (self.allMeetings.data[i].meeting_id == 1) {
          self.allMeetings.data.splice(self.allMeetings.data.indexOf(self.allMeetings.data[i]), 1)
        }
      }
      self.getMeeting(self.allMeetings.data[0].meeting_id)
     console.log('allMeetings in Service', self.allMeetings.data)
    }) //end call back function
}// end view Meetings
//get Meeting to edit
self.getMeeting = function(meeting) {
  console.log('In getMeeting Service', meeting);
  return $http({
    method: 'GET',
    url: '/meetings/get/' + meeting
  }).then(function (res) {
    console.log('Servvice Get Meeting Response', res);
    self.meetingToEdit.data = res.data; 
  })
}; //end get Meeting to edit
//get to edit attendees
self.editMembers = function(meeting){
  return $http({
    method: 'GET',
    url: '/members'
  })
    .then(function (res) {
      self.allMembers.data = res.data;
      
    }).then(function(res){
      for(let i =0; i<self.allMembers.data.length; i++) {
        for(let j =0; j<self.meetingToEdit.data.length; j++) {
          if (self.allMembers.data[i].member_id == self.meetingToEdit.data[j].member_id) {
            self.allMembers.data.splice(i, 1)
          } else {
            console.log('no match')
          }
        }
      }
    }) //end call back function
}   //end get attendees to edit
//save edited meeting
self.saveEditMeeting = function(objToSend) {
  console.log('saveEdit running in Service')
  $http({
      method: 'PUT',
      url:    '/meetings',
      data:   objToSend
  }).then(function(res) {
    self.getMeeting(objToSend.meeting_id)
    //need a confirmation alert or something here
  }); //end then
}; //end  saveEdit Meeting
self.addMeeting = function(objToSend) {
  $http({
      method: 'POST',
      url:    '/meetings',
      data:   objToSend
  }).then(function(res) {
      console.log('add meeting response:', res );
      self.viewMembers();
    //need a confirmation alert or something here
  }); //end then
}; //end addMeeting
self.deleteMeeting = function(meetingId) {
  console.log('In Delete meeting', meetingId) 
    return $http({
      method: 'PUT',
      url: '/meetings/delete/' + meetingId 
    }).then(function(res) {
      console.log('meeting deleted');
      self.viewMeetings();
    })
} // end deleteMeeting

//QUERIES
self.getCountries = function() {
  console.log('getCountries in Service running')
  return $http({
    method: 'GET',
    url: '/queries/countries'
  })
    .then(function (res) {
      self.countries.data = res.data.map(function(object) {
          return object.meeting_country
        }).filter(function(value, index, array){
          return array.indexOf(value) ===index;
        }).filter(function(country) {
          return country !== null && country !== undefined
        })
        
      })
}// end view Meetings

self.getInstitutions = function() {
  console.log('getInstitutions in Service running')
  return $http({
    method: 'GET',
    url: '/queries'
  })
    .then(function (res) {
      self.institutions.data = res.data
      console.log('res', self.institutions.data)
    }) //end call back function
}// end view Meetings
self.meetingsBy = function(objToSend) {
  return $http({
    method: 'POST',
    url: '/queries/meetingsBy',
    data: objToSend
  })
    .then(function (res) {
      if (res.data.length <= 0) {
        alert("No results found.")
      } else {
        if (res.data[0] == "meeting_country") {
          res.data.shift()
          self.countryArray.data = res.data
      }
        else if (res.data[0] == "meeting_state") {
          res.data.shift()
          self.stateArray.data = res.data
        }
        else {
          res.data.shift()
          self.typeArray.data = res.data
        }
     }
    })
}
self.membersBy = function(objToSend) {
  return $http({
    method: 'POST',
    url: '/queries/membersBy',
    data: objToSend
  })
    .then(function (res) {
      console.log(res.data)
      if (res.data.length <= 0) {
        alert("No results found.")
      } else if (res.data.length == 1 && res.data[0] == "service_id") {
        alert("No results found.")
      } else {
      if (res.data[0] == "member_status") {
        res.data.shift()
        self.statusArray.data = res.data
      } else if (res.data[0] == "institution") {
        res.data.shift()
        self.insitutionArray.data = res.data
      } else if (res.data[0] =="state") {
        res.data.shift()
        self.stateArray.data=res.data
      } else {
        res.data.shift()
        self.serviceArray.data=res.data
      }
    }
  })
      .then(function() {
        if (self.serviceArray.data != undefined) {
        for (let i=0; i<self.serviceArray.data.length; i++) {
          for (let j= i+1; j<self.serviceArray.data.length; j++) {
           if (self.serviceArray.data[i].member_id == self.serviceArray.data[j].member_id) {
            self.serviceArray.data.splice(j, 1)
            } 
          }
        }
      }
    })
    
}

self.membersByYear = function(objToSend) {
  return $http({
    method: 'POST',
    url: '/queries/membersByYear',
    data: objToSend
  })
    .then(function (res) {
      self.yearArray.data = res.data
      if (self.yearArray.data.length <= 0 ) {
        alert("No results found.")
      }
    })
  }
//PASSPORT AUTHENTICATION FUNCTIONS

self.getuser = function(){
      console.log('UserService -- getuser');
      $http.get('/user').then(function(response) {
          if(response.data.username) {
              // user has a curret session on the server
              self.userObject.userName = response.data.username;
              console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
          } else {
              console.log('UserService -- getuser -- failure');
              // user has no session, bounce them back to the login page
              $location.path("/home");
          }
      },function(response){
        console.log('UserService -- getuser -- failure: ', response);
        $location.path("/home");
      });
    } //end get user
  
    self.logout = function() {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function(response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    } //end logout
  
  }); //end app 

 