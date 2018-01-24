myApp.controller('UserController', function(UserService) {
    console.log('UserController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.memberList = UserService.memberList;
    vm.memberToEdit = UserService.memberToEdit;
    vm.meetingsByYear = UserService.meetingsByYear;
    vm.serviceArray = [] // array to send to Database
    vm.defaultMeeting = {meeting_id: 1}
    vm.serviceOnly = UserService.serviceOnly
    vm.meetings = UserService.meetings

//page load
vm.viewMembers = function() {
  UserService.viewMembers();
  console.log ('in controller viewMembers running')
}; //end viewMembers

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
  
//edit Service
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

//adding member to meeting pt 1 - search for meeting
vm.findMeetingsByYear = function(meetingYear) {
  console.log('meetingYear', meetingYear)
  UserService.findMeetingsByYear(meetingYear)
}; //end findMeetingsByYear

//addService
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
}; //end addService

vm.deleteService = function (service, memberId) {
  console.log('delete', service, memberId)
  UserService.deleteService(service, memberId)
}


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
        member_year: vm.sinceIn,
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
    } //end then
    






vm.deleteMember = function(deleteMemberId) {
  console.log('in controller delete,', deleteMemberId)
  UserService.deleteMember(deleteMemberId); 
  }
    

      
          //delete member

        


  




  

  





  


  }); //end controller
  