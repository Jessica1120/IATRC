myApp.controller('UserController', function(UserService) {
    console.log('UserController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.allMembers = UserService.allMembers;
    vm.memberToEdit = UserService.memberToEdit;

    vm.viewMembers = function() {
      UserService.viewMembers();
      console.log ('in controller viewMembers running')
    }; //end viewMembers

    vm.addMember = function() {
      console.log ('in controller addMember running')
      var objToSend = {
        first_name: vm.firstIn,
        last_name: vm.lastIn
      };
      UserService.addMember(objToSend);
      vm.firstIn = '',
      vm.lastIn = ''  
    }; //end addMember

    //get member to Edit
    vm.getMember = function(member) {
       console.log('in controller get member', member)
       UserService.getMember(member);
    }

    vm.saveEditMember = function(editMemberId) {
      
      var objToSend = {id: editMemberId}
      
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
      
      console.log('controller saveEditMember', objToSend)
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
      console.log('object after servidce', objToSend) 
    }
    
     
    

  }); //end controller
  