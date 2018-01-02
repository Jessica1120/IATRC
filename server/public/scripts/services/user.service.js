myApp.service('UserService', function($http, $location){
    console.log('UserService Loaded');
    var self = this;
    self.userObject = {};
    //members objects
    self.allMembers = {data: []} //object for viewMembers get
    self.memberToEdit = {data:[]} // object for findMember
   //meetings objects
    self.allMeetings = {data: []} //object for ViewMeetings get
    self.attended = []
    self.temp=[]
    self.unattended = []
    self.updatedMeeting = {data:[]} // object for findMember
    self.participantList = {data: []} //object for viewParticipants
    self.meetingToEdit = {data: []}//object for getMeeting
//MEMBER PAGE FUNCTIONS

  //view members Get on page load
self.viewMembers = function(){
    console.log('viewMembers in Service running')
    return $http({
      method: 'GET',
      url: '/members'
    })
      .then(function (res) {
        self.allMembers.data = res.data;
       console.log('allMembers in Service', self.allMembers)
      }) //end call back function
    }// end view Members

//addMember post Call 
self.addMember = function(objToSend) {
  $http({
      method: 'POST',
      url:    '/members',
      data:   objToSend
  }).then(function(res) {
      console.log('addMember response:', res );
    //need a confirmation alert or something here
  }); //end then
}; //end addMember

//get member to edit
self.getMember = function(member) {
  console.log('In findMember', member);
   //$http call to get all data from existing form
  return $http({
    method: 'GET',
    url: '/members/get/' + member
  }).then(function (res) {
    console.log('Response', res);
    self.memberToEdit.data = res.data;
  })
};
//save edits to member
self.saveEditMember = function(objToSend) {
  console.log('service Obj', objToSend)
  $http({
      method: 'PUT',
      url:    '/members',
      data:   objToSend
  }).then(function(res) {
      console.log('editMember response:', res );
      console.log('objToSend.id after call:', objToSend.id);
      self.viewMembers();
      self.getMember(objToSend.id);
    //need a confirmation alert or something here
  }); //end then
}; //end saveEditmember

self.deleteMember = function(deleteMemberId) {
  console.log('service delete running', deleteMemberId)
  return $http ({
    method: 'DELETE',
    url: '/members/delete/' + deleteMemberId 
  }).then(function (res) {
    console.log(res)
  })
}

//MEETINGS PAGE FUNCTIONS

//view meetings GET on page load
self.viewMeetings = function(){
  console.log('viewMeeting in Service running')
  return $http({
    method: 'GET',
    url: '/meetings'
  })
    .then(function (res) {
      self.allMeetings.data = res.data;
     console.log('allMeetings in Service', self.allMeetings)
    }) //end call back function
  }// end view Meetings



//get Meeting to edit
self.getMeeting = function(meeting) {
  console.log('In findmeeting', meeting);
   //$http call to get all data from existing form
  return $http({
    method: 'GET',
    url: '/meetings/get/' + meeting
  }).then(function (res) {
    console.log('Response', res);
    self.meetingToEdit.data = res.data;
  })
};

self.viewMembersMeeting = function(meeting){
  return $http({
    method: 'GET',
    url: '/members'
  })
    .then(function (res) {
      self.allMembers.data = res.data;
      console.log('self.allMembers at 118', self.allMembers)
    }) //end call back function
     .then(function (res) {
       console.log('start')
      for (let i = 0; i < self.allMembers.data.length; i++) {
        if (self.allMembers.data[i].meetings_id == meeting) {
          console.log('yes', self.allMembers.data[i].meetings_id, meeting)
          self.attended.push(self.allMembers.data[i])
          console.log('self.attended', self.attended )
          self.allMembers.data.splice(i, 1);
         
        }
          for(let j = 0; j < self.attended.length; j++) {
          if (self.allMembers.data[i].id == self.attended[j].id) {
            self.allMembers.data.splice(i, 1)
            console.log('spliced', self.allMembers.data)
          }
        }
      } //end for loop
      for (let i=0; i < self.allMembers.data.length; i++) {
        for(let j=i+1; j < self.allMembers.data.length; j++) {
          if(self.allMembers.data[i].id == self.allMembers.data[j].id) {
            self.allMembers.data.splice(i, 1)
          }  
        }
      }
    })
  //end 3rd then 
}   
//save edited meeting

self.saveEditMeeting = function(objToSend) {
  console.log('saveEdit running in Service')
  $http({
      method: 'PUT',
      url:    '/meetings',
      data:   objToSend
  }).then(function(res) {
      console.log('addMeeting response:', res );
      self.viewMeetings();
    //need a confirmation alert or something here
  }); //end then
}; //end  saveEdit Meeting

self.addMeeting = function(objToSend) {
  $http({
      method: 'POST',
      url:    '/meetings',
      data:   objToSend
  }).then(function(res) {
      console.log('addmeeting response:', res );
    //need a confirmation alert or something here
  }); //end then
}; //end addMember


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
    }
  
    self.logout = function() {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function(response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    }
  }); 