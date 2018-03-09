myApp.controller('QueryController', function(UserService) {
    console.log('QueryController created');
    var vm = this; 
    vm.yearOptions = []//populates year select
    vm.institutions = UserService.institutions
    vm.insitutionArray = UserService.insitutionArray
    vm.serviceArray = UserService.serviceArray
    vm.statusArray = UserService.statusArray
    vm.stateArray = UserService.stateArray
    vm.yearArray = UserService.yearArray


vm.getInstitutions= function() {
   UserService.getInstitutions()
    console.log('in getInstitutions')
  };

vm.membersByInstitution=function() {
    objToSend = {
        institution: vm.institutionIn
        }
    UserService.membersBy(objToSend);
    
};
vm.membersByService=function() {
    objToSend = {
        service_id: vm.serviceIn
    }
    UserService.membersBy(objToSend)
}
vm.memberByState=function() {
    objToSend = {
        state: vm.stateIn
        }
    UserService.membersBy(objToSend)
}

vm.membersByStatus=function() {
    objToSend = {
        member_status: vm.statusIn
        }
    UserService.membersBy(objToSend);
};

vm.membersByYear = function() {
    objToSend = {
        startYearIn: parseInt(vm.startYearIn),
        endYearIn: parseInt(vm.endYearIn),
    }
    UserService.membersByYear(objToSend)
}
vm.runYears = function() {
    for(i=1979; i<2019; i++) {
      vm.yearOptions.push(i);
    }
    console.log('yearOptions', vm.yearOptions)
  }
}); //end controller