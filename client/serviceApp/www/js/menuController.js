serveApp.controller('AppCtrl', ['$scope','$state','$auth',function($scope,$state,$auth) {
	
	console.log("App Ctrl");
	$scope.menuOptions = [{
		name : 'Opt1',
		show : false,
		items : [{
			itemName: "subOption1",
			goTo: "app.page1"
		},
		{
			itemName: "subOption2",
			goTo: "app.page2"
		}]
	},
	{
		name : 'Opt2',
		show : false,
		items : [],
		goTo: "app.page2"
	},
	{
		name : 'Opt3',
		show : false,
		items : [{
			itemName: "subOption1",
			goTo: "app.page1"
		},
		{
			itemName: "subOption2",
			goTo: "app.page2"
		}]
	}
	];
		
	 

	$scope.toggleOptions = function (option){
		if(option.items.length != 0){
			//console.log("suboption",option)
			option.show = !option.show;	
		} else {
			//console.log("no sub")
			$state.go(option.goTo);
		}		
	};
	
	$scope.toggleSubOptions = function (item){
		$state.go(item.goTo);
	}
	
	$scope.logout = function(){
		$auth.logout().then(function(){
			$state.go('login');
		})
	}
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  
}]);