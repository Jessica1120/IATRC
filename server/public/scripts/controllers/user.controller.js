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
        var objToSend = {
        id: editMemberId,
        first_name: vm.firstEditIn,
        last_name: vm.lastEditIn,
        institution: vm.institutionEditIn,
        department: vm.departmentEditIn,
        address_1:  vm.address_1EditIn,
        address_2: vm.address_2EditIn,
        address_3:  vm.address_3EditIn,
        city: vm.cityEditIn,
        state: vm.stateEditIn,
        zipcode: vm.zipcodeEditIn,
        country: vm.countryEditIn,
        phone:  vm.phoneEditIn,
        email: vm.emailEditIn,
        website: vm.websiteEditIn,
        member_status: vm.memberStatusEditIn,
        member_year: vm.memberYearEditIn,
        publications: vm.publicationsEditIn,
       };
      console.log('in saveEditMember', objToSend)
      UserService.saveEditMember(objToSend); 
    }

  }); //end controller