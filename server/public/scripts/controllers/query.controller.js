myApp.controller('QueryController', function(UserService) {
    console.log('QueryController created');
    var vm = this; 
    vm.institutions = UserService.institutions
    vm.members = UserService.members

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
}); //end controller