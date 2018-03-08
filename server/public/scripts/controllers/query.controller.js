myApp.controller('QueryController', function(UserService) {
    console.log('QueryController created');
    var vm = this; 
    vm.institutions = UserService.institutions

vm.getInstitutions= function() {
   UserService.getInstitutions()
    console.log('in getInstitutions')
  };

vm.membersBy=function(index) {
   
    UserService.membersBy(vm.institutions.data[index])
    
};



}); //end controller