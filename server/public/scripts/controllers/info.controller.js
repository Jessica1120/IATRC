myApp.controller('InfoController', function(UserService) {
    console.log('InfoController created');
    var vm = this;
    vm.userService = UserService;
    vm.allMeetings = UserService.allMeetings;
    vm.participantList = UserService.participantList

    vm.viewMeetings= function() {
      UserService.viewMeetings();
      console.log('in view Meetings running')
    }; //end ViewMeetings

    vm.viewParticipants = function(meeting) {
      UserService.viewParticipants(meeting)
      console.log('in view Participants', meeting)
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

