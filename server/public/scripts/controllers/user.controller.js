myApp.controller('UserController', function(UserService) {
    console.log('UserController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.memberList = UserService.memberList;
    vm.memberToEdit = UserService.memberToEdit;
    vm.meetingsByYear = UserService.meetingsByYear;
    vm.serviceArray = [ ] // array to send to Database
    vm.defaultMeeting = {meeting_id: 1}
    vm.serviceOnly = UserService.serviceOnly
    vm.meetings = UserService.meetings
    vm.yearOptions = []//populates year select

//user.html view:
vm.runYears = function() {
  for(i=1979; i<2028; i++) {
    vm.yearOptions.push(i);
  }
  console.log('yearOptions', vm.yearOptions)
}
//addService to existing member
vm.addService = function(member_id, meetings_id) {
  console.log(meetings_id)
  var objToSend = {
    member_id: member_id,
    service_id: parseInt(vm.serviceIn),
    meetings_id: meetings_id,
    start_date: vm.start_dateIn,
    end_date: vm.end_dateIn,
    add_info: vm.addInfoIn
    }
    if (meetings_id == undefined) {
      objToSend.meetings_id = 1
    }
  console.log('add service', objToSend)
  UserService.addService(objToSend)
    vm.start_dateIn= '',
    vm.end_dateIn='',
    vm.addInfoIn=''
}; //end addService

vm.deleteMember = function(deleteMemberId) {
  
   if (confirm("Are you sure you want to delete this member from the database?")) {
    console.log('willDelete')
    UserService.deleteMember(deleteMemberId)
    }
     else {
       console.log("cancelled")
     };
};//delete member end


vm.deleteService = function (service) {
  UserService.deleteService(service)
}
//edit member's service
vm.editService = function(primaryId, memberId) {
  console.log('service', primaryId, memberId, vm.editMeetingIn)
  
  var editServiceObj = {
    members_id: memberId,
    primary_id: primaryId
  }
      if (vm.editStartYear !== undefined) {
        editServiceObj.start_date = vm.editStartYear
        if (vm.editStartYear == "") {
          delete editServiceObj.start_date
        }
      }
      if (vm.editEndYear !== undefined) {
        editServiceObj.end_date = vm.editEndYear
        if (vm.editEndYear == "") {
          delete editServiceObj.end_date
        }
      }
      if (vm.editMeetingIn !== undefined) {
        editServiceObj.service_id = vm.editMeetingIn
        if (vm.editMeetingIn == "") {
          delete editServiceObj.service_id
        }
      }
      if (vm.editAddInfo !== undefined) {
        editServiceObj.add_info = vm.editAddInfo
        if (vm.editAddInfo == "") {
          delete objToSend.add_info
        }
      }
      console.log('Edit', editServiceObj)
      UserService.editService(editServiceObj);
}; //end edit Service

//Click on member to view/edit
vm.getMember = function(member) {
  UserService.getMember(member);
  console.log('vm.serviceOnly Array in getMember', vm.serviceOnly)
} //end getMember

//saveEditMember function to edit non-service info
vm.saveEditMember = function(editMemberId) {
  console.log('saveEditMemberrunning')
      var objToSend = {member_id: editMemberId}
    
    if (vm.firstEditIn !== undefined) {
      objToSend.first_name = vm.firstEditIn
      if (vm.firstEditIn == "") {
        delete objToSend.first_name
      }  
    }
    if (vm.lastEditIn !== undefined) {
      objToSend.last_name = vm.lastEditIn
      if (vm.lastEditIn == "") {
        delete objToSend.last_name
      }
    }
    if (vm.institutionEditIn !== undefined) {
      objToSend.institution = vm.institutionEditIn
      if (vm.institutionEditIn == "") {
        delete objToSend.institution
      }
    }
    if (vm.departmentEditIn !== undefined) {
      objToSend.department = vm.departmentEditIn
      if (vm.departmentEditIn == "") {
        delete objToSend.department
      }
    }
    if (vm.address_1EditIn !== undefined) {
      objToSend.address_1 = vm.address_1EditIn
      if (vm.address_1EditIn == "") {
        delete objToSend.address_1
      }
    }
    if (vm.address_2EditIn !== undefined) {
      objToSend.address_2 = vm.address_2EditIn
      if (vm.address_2EditIn == "") {
        delete objToSend.address_2
      }
    }
    if (vm.address_3EditIn !== undefined) {
      objToSend.address_3 = vm.address_3EditIn
      if (vm.address_3EditIn == "") {
        delete objToSend.address_3
      }
    }
    if (vm.cityEditIn !== undefined) {
      objToSend.city = vm.cityEditIn
      if (vm.cityEditIn == "") {
        delete objToSend.city
      }
    } 
    if (vm.stateEditIn !== undefined) {
      objToSend.state= vm.stateEditIn
      if (vm.stateEditIn == "") {
        delete objToSend.state
      }
    }
    if (vm.zipcodeEditIn !== undefined) {
      objToSend.zipcode= vm.zipcodeEditIn
      if (vm.zipcodeEditIn == "") {
        delete objToSend.zipcode
      }
    }
    if (vm.countryEditIn !== undefined) {
      objToSend.country= vm.countryEditIn
      if (vm.countryEditIn == "") {
        delete objToSend.country
      }
    }
    if (vm.phoneEditIn !== undefined) {
      objToSend.phone = vm.phoneEditIn
      if (vm.phoneEditIn == "") {
        delete objToSend.phone
      }
    }
    if (vm.emailEditIn !== undefined) {
      objToSend.email = vm.emailEditIn
      if (vm.emailEditIn == "") {
        delete objToSend.email
      }
    }
    if (vm.websiteEditIn !== undefined) {
      objToSend.website = vm.websiteEditIn
      if (vm.websiteEditIn == "") {
        delete objToSend.website
      }
    }
    if (vm.memberStatusEditIn !== undefined) {
      objToSend.member_status = vm.memberStatusEditIn
      if (vm.memberStatusEditIn == "") {
        delete objToSend.member_status
      }
    }
    if (vm.memberYearEditIn !== undefined) {
      objToSend.member_year = vm.memberYearEditIn
      if (vm.memberYearEditIn == "") {
        delete objToSend.member_year
      }
    }
    if (vm.publicationsEditIn !== undefined) {
      objToSend.publications = vm.publicationsEditIn
      if (vm.publicationsEditIn == "") {
        delete objToSend.publications
      }
    }
    console.log('saveEditMember object', objToSend)
    UserService.saveEditMember(objToSend);
    vm.firstEditIn = ""
    vm.lastEditIn = ""
    vm.institutionEditIn = ""
    vm.departmentEditIn = ""
    vm.address_1EditIn = ""
    vm.address_2EditIn = ""
    vm.address_3EditIn = ""
    vm.cityEditIn = ""
    vm.stateEditIn = ""
    vm.zipcodeEditIn = ""
    vm.countryEditIn = ""
    vm.phoneEditIn = ""
    vm.emailEditIn = ""
    vm.websiteEditIn = ""
    vm.memberStatusEditIn = ""
    vm.memberYearEditIn = ""
    vm.publicationsEditIn = "" 
}; //end saveEditMember

//gets member list on page load
vm.viewMembers = function() {
  UserService.viewMembers();
  console.log ('in controller viewMembers running')
}; //end viewMembers
//edit Service


//ADDMEMBERS.HTML view

vm.addMember = function() {
  console.log ('in controller addMember running')
  var objToSend = {
    first_name: vm.firstIn,
    last_name: vm.lastIn,
    institution: vm.InstitutionIn,
    department: vm.departmentIn,
    address_1: vm.address1In,
    address_2:  vm.address2In,
    address_3: vm.address3In,
    city: vm.cityIn,
    state: vm.stateIn,
    zipcode: vm.zipIn,
    country: vm.countryIn,
    phone: vm.phoneIn,
    email:  vm.emailIn,
    website: vm.websiteIn,
    member_status: vm.statusIn,
    member_year: parseInt(vm.sinceIn),
    publications: vm.publicationsIn,
    serviceArray: vm.serviceArray,
  };
  UserService.addMember(objToSend)
  vm.firstIn = '',
  vm.lastIn = ''  
  vm.InstitutionIn = '',
  vm.departmentIn = '',
  vm.address1In = '',
  vm.address2In = '',
  vm.address3In = '',
  vm.cityIn = '',
  vm.stateIn = '',
  vm.zipIn = '',
  vm.countryIn = '',
  vm.phoneIn = '',
  vm.emailIn = '',
  vm.websiteIn = '',
  vm.statusIn = '',
  vm.sinceIn = '',
  vm.publicationsIn = '',
  vm.serviceArray = []
  alert("Member added successfully.")
} //end add Member

//search for meeting to add member to
vm.findMeetingsByYear = function(meetingYear) {
  console.log('meetingYear', meetingYear)
  UserService.findMeetingsByYear(meetingYear)
}; //end findMeetingsByYear

vm.serviceItem = function(service, topic) {
    console.log(service, topic)
    serviceObj = {
      topic: topic,
      meeting_id: service.meeting_id,
      service_id: vm.serviceIn,
      start_date: parseInt(vm.startYearIn),
      end_date: parseInt(vm.endYearIn),
      add_info: vm.addInfoIn
    }
    if (vm.serviceIn == "1") {
      console.log('serviceIn', vm.serviceIn)
      serviceObj.member_type = "Elected Member"
    } else if (vm.serviceIn == "2") {
       serviceObj.member_type = "Funding Agency Representative"
    } else if (vm.serviceIn == "3") {
      serviceObj.member_type = "Theme Day Organizer"
    } else if (vm.serviceIn == "4") {
      serviceObj.member_type = "Non-Theme Day Organizer"
    } else if (vm.serviceIn == "5") {
      serviceObj.member_type = "Other"
    } else if (vm.serviceIn == "6") {
      serviceObj.member_type = "Attendance Only"
    } else if (vm.serviceIn !== undefined) {
      serviceObj.service_id = vm.serviceIn
      if (vm.serviceIn == '') {
        delete serviceObj.service_id
      }
    }
    vm.serviceArray.push(serviceObj)
    console.log(vm.serviceArray)
 
    vm.serviceIn = '',
    vm.startYearIn = '',
    vm.endYearIn = '',
    vm.addInfoIn = ''
};
 
vm.remove = function(index) {
  console.log('indexof', index)
  vm.serviceArray.splice(index, 1)
}

}); //end controller




  