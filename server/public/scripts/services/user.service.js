myApp.service('UserService', function($http, $location){
    console.log('UserService Loaded');
    var self = this;
    self.userObject = {};
    self.allMembers = {data: []} //object for viewMembers get
    self.memberToEdit = {data:[]} // object for findMember
   
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

  
    //passport authentication
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