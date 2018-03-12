myApp.controller('QueryController', function(UserService) {
    console.log('QueryController created');
    var vm = this; 
    vm.yearOptions = []//populates year select
    vm.institutions = UserService.institutions
    vm.countries = UserService.countries
    vm.insitutionArray = UserService.insitutionArray
    vm.serviceArray = UserService.serviceArray
    vm.statusArray = UserService.statusArray
    vm.stateArray = UserService.stateArray
    vm.yearArray = UserService.yearArray

vm.clearAll = function() {
    vm.institutionIn = ''
    vm.endYearIn = ''
    vm.serviceIn = ''
    vm.startYearIn = ''
    vm.stateIn = ''
    vm.statusIn = ''
    vm.endYearIn = ''
    vm.insitutionArray = []
    vm.serviceArray = []
    vm.stateArray = []
    vm.statusArray = []
    vm.yearArray = []
}
//Search meetings functions
vm.getCountries = function() {
    UserService.getCountries()
     console.log(vm.countries)     
   };

//Search members functions
vm.getInstitutions= function() {
   UserService.getInstitutions()
   console.log(vm.institutions)
  };

vm.membersByInstitution=function() {
    objToSend = {
        institution: vm.institutionIn
        }
    UserService.membersBy(objToSend);
    
};
vm.membersByService=function() {
    console.log(vm.serviceIn, vm.startYearIn, vm.endYearIn)
    if (vm.serviceIn == 6 && vm.startYearIn == undefined && vm.endYearIn == undefined) {
        alert('You must enter a start date and/or an end date for this query.')
    } else {
    var objToSend = {
        service_id: vm.serviceIn
    }
        if (vm.startYearIn !== undefined) {
        objToSend.start_date = parseInt(vm.startYearIn);
        }
        if (vm.endYearIn !== undefined) {
        objToSend.end_date = parseInt(vm.endYearIn);
        }
    console.log('obj', objToSend)
    UserService.membersBy(objToSend)
    }
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
    objToSend = {}
    if (vm.startYearIn == undefined && vm.endYearIn == undefined){
        alert("please enter a Start Year and/or an End Year")
    } else {
        if (vm.startYearIn !== undefined) {
        objToSend.start_date = parseInt(vm.startYearIn);
        }
        if (vm.endYearIn !== undefined) {
        objToSend.end_date = parseInt(vm.endYearIn);
        }
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