myApp.controller('UserController', function(UserService) {
    console.log('UserController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.allMembers = UserService.allMembers;

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

  }); //end controller function

  