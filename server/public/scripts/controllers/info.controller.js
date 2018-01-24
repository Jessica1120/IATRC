myApp.controller('InfoController', function(UserService) {
    console.log('InfoController created');
    var vm = this;
    vm.userService = UserService;
    vm.allMeetings = UserService.allMeetings;
    vm.meetingToEdit = UserService.meetingToEdit;
    vm.allMembers = UserService.allMembers;
    vm.attended = [] //holds members added to meeting
    vm.absent = [] //holds members removed from meeting
    
    
  //loads all meeting on Page Load
    vm.viewMeetings= function() {
      UserService.viewMeetings();
      console.log('in view Meetings running')
    }; //end ViewMeetings

    //get meeting to Edit
vm.getMeeting = function(meeting) {
      console.log('get meeting')
      UserService.getMeeting(meeting);
} //end get meeting to Edit

   //get to edit attendees
vm.editMembers = function(meeting) {
    UserService.editMembers(meeting)   
}; //end get to edit attendees

vm.saveEditMeeting = function(meeting) {
  
  var objToSend = {
      meeting_id: meeting,
      attended: vm.attended,
      absent: vm.absent
  }
  
  for (var i = 0; i < vm.meetingToEdit.data.length; i++) {
    if(vm.meetingToEdit.data[i].Selected !== true) {
      vm.absent.push(vm.meetingToEdit.data[i].member_id)
      }
  }
  console.log('slice absent', vm.meetingToEdit.data, vm.absent)
  for (var i = 0; i < vm.allMembers.data.length; i++) {
    if(vm.allMembers.data[i].Selected == true) {
      vm.attended.push(vm.allMembers.data[i].member_id)
    } 
  }
      if (vm.editTypeIn !== undefined) {
        objToSend.type = vm.editTypeIn
        if (vm.editTypeIn == "" || vm.editTypeIn == undefined) {
          delete objToSend.type
        }
      }  
       
      if (vm.editTopicIn !== undefined) {
        objToSend.topic = vm.editTopicIn
        if (vm.editTopicIn == "" || vm.editTopicIn == undefined) {
          delete objToSend.topic
        }
      } 
     
      if (vm.editMonthIn !== undefined) {
        objToSend.month = vm.editMonthIn
        if (vm.editMonthIn == "" || vm.editMonthIn == undefined) {
          delete objToSend.month
        }
      } 

      if (vm.editYearIn!== undefined) {
        objToSend.year = vm.editYearIn
        if (vm.editYearIn == "" || vm.editYearIn == undefined) {
          delete objToSend.year
        }
      } 
    console.log('objtoSend', objToSend)
    UserService.saveEditMeeting(objToSend)
} //end saveEditMeeting


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

//delete Meeting

vm.deleteMeeting = function(meetingId) {
  console.log('in controller delete,', meetingId)
  UserService.deleteMeeting(meetingId);
}

});