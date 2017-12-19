myApp.controller('InfoController', function(UserService) {
    console.log('InfoController created');
    var vm = this;
    vm.userService = UserService;
    vm.allMeetings = UserService.allMeetings;
  
    vm.viewMeetings= function() {
      UserService.viewMeetings();
      console.log('in view Meetings running')
    }; //end ViewMeetings

    vm.viewParticipants = function(meeting) {
      UserService.viewParticipants(meeting)
      console.log('in view Participants', meeting)
    }

    vm.getMeeting = function(meeting) {
      console.log('in controller get member', meeting)
      UserService.getMember(meeting);

   }

  });

