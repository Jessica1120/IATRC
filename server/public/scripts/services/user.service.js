myApp.service('UserService', function($http, $location){
    console.log('UserService Loaded');
    var self = this;
    self.userObject = {};
    self.allMembers = {data: []} //object for viewMembers get

  //view members Get on page load
  self.viewMembers = function(){
    console.log('viewMembers in Service running')
    return $http({
      method: 'GET',
      url: '/members/view'
    })
      .then(function (res) {
        self.allMembers.data = res.data;
       console.log('allMembers in Service', self.allMembers)
      }) //end call back function
    }// end view Members



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