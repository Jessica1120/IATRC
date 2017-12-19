myApp.service('UserService', function($http, $location){
    console.log('UserService Loaded');
    var self = this;
    self.userObject = {};
    //members objects
    self.allMembers = {data: []} //object for viewMembers get
    self.memberToEdit = {data:[]} // object for findMember
   //meetings objects
    self.allMeetings = {data: []} //object for ViewMeetings get
    self.meetingToEdit = {data:[]} // object for findMember
    self.participantList = {data: []} //object for viewParticipants

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
  console.log('saveEdit running in Service')
  $http({
      method: 'PUT',
      url:    '/members',
      data:   objToSend
  }).then(function(res) {
      console.log('addMember response:', res );
      console.log('objToSend.id after call:', objToSend.id);
      self.viewMembers();
      self.getMember(objToSend.id);
    //need a confirmation alert or something here
  }); //end then
}; //end addMember

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
  }// end view Members

  
//get meeting to edit

self.viewParticipants = function(meeting) {
  console.log('In get participants service', meeting);
   //$http call to get all data from existing form
  return $http({
    method: 'GET',
    url: '/meetings/getParticipants/' + meeting
  }).then(function (res) {
    console.log('Response', res);
    self.participantList.data = res.data;
  })
};

self.getMeeting = function(meeting) {
  console.log('In findMeeting', meeting);
   //$http call to get all data from existing form
  return $http({
    method: 'GET',
    url: '/meetings/get/' + meeting
  }).then(function (res) {
    console.log('Response', res);
    self.meetingToEdit.data = res.data;
  })
};



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
    },
  
    self.logout = function() {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function(response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    }
  });