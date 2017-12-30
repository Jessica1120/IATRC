myApp.controller('InfoController', function(UserService) {
    console.log('InfoController created');
    var vm = this;
    vm.userService = UserService;
    vm.allMeetings = UserService.allMeetings;
    vm.participantList = UserService.participantList
    vm.meetingToEdit = UserService.meetingToEdit;

    vm.viewMeetings= function() {
      UserService.viewMeetings();
      console.log('in view Meetings running')
    }; //end ViewMeetings


    //get member to Edit
    vm.getMeeting = function(meeting) {
      console.log('in controller get meeting', meeting)
      UserService.getMeeting(meeting);
   }
    vm.saveEditMeeting = function(meeting) {
      var objToSend = {
      id: meeting,
      type: vm.editTypeIn,
      topic: vm.editTopicIn,
      month: vm.editMonthIn,
      year: vm.editYearIn
    };
    console.log('in saveEditMember', objToSend)
    UserService.saveEditMeeting(objToSend); 
  }

   vm.addMeeting = function() {
    console.log ('in controller addMeeting running')
    var objToSend = {
      type: vm.typeIn,
      topic: vm.topicIn,
      month: vm.monthIn,
      year: vm.yearIn
    };
    UserService.addMeeting(objToSend);
    vm.typeIn = '',
    vm.topicIn = '',
    vm.monthIn = '',
    vm.yearIn = ''
  }; //end addMeeting

  });

