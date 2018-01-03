myApp.controller('InfoController', function(UserService) {
    console.log('InfoController created');
    var vm = this;
    vm.userService = UserService;
    vm.allMeetings = UserService.allMeetings;
    vm.meetingToEdit = UserService.meetingToEdit;
    vm.allMembers = UserService.allMembers;
    vm.attended = UserService.attended
    vm.unattended = UserService.unattended

    vm.viewMeetings= function() {
      UserService.viewMeetings();
      console.log('in view Meetings running')
    }; //end ViewMeetings

    //get meeting to Edit
    vm.getMeeting = function(meeting) {
      // vm.allMembers=[];
      // vm.attended=[];
      console.log('get meeting')
      UserService.getMeeting(meeting);
   }

   //get list of all members to edit meeting participants
   vm.getMembers = function(meeting) {
    UserService.viewMembersMeeting(meeting)
   
      
  }; //end viewMembers
  


  vm.saveEditMeeting = function(meeting) {
      var objToSend = {
      id: meeting
    };
      if (vm.editTypeIn !== undefined) {
        objToSend.type = vm.editTypeIn
        if (vm.vm.editTypeIn == "") {
          delete objToSend.type
        }
      }  
       
      if (vm.editTopicIn !== undefined) {
        objToSend.topic = vm.editTopicIn
        if (vm.editTopicIn == "") {
          delete objToSend.topic
        }
      } 
     
      if (vm.editMonthIn !== undefined) {
        objToSend.month = vm.editMonthIn
        if (vm.editMonthIn == "") {
          delete objToSend.month
        }
      } 

      if (vm.editYearIn!== undefined) {
        objToSend.year = vm.editYearIn
        if (vm.editYearIn == "") {
          delete objToSend.year
        }
      } 
    
   
    console.log('in saveEditMember', objToSend)
    UserService.saveEditMeeting(objToSend)

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

