myApp.controller('QueryController', function(UserService) {
    console.log('QueryController created');
    var vm = this; 
    vm.institutions = UserService.institutions
    vm.members = UserService.members

vm.getInstitutions= function() {
   UserService.getInstitutions()
    console.log('in getInstitutions')
  };

vm.membersByInstitution=function(index) {
   
    UserService.membersBy(vm.institutions.data[index])
    
};

vm.memberByState=function() {
    objToSend = {
        state: vm.stateIn
    }
    UserService.membersBy(objToSend)
}

}); //end controller