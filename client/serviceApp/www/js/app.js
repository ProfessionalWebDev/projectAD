// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var serveApp = angular.module('serveApp', ['ionic','satellizer','angularValidator']);

serveApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

serveApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('signup', {
	  url: '/signup',
	  templateUrl: 'templates/signUp.html',
	  controller: 'signupCtrl'
  })

  .state('login', {
	  url: '/login',
	  templateUrl: 'templates/login.html',
	  controller: 'loginCtrl'
  })
  
  .state('otp', {
	  url: '/otp',
	  templateUrl: 'templates/changePassword.html',
	  controller: 'chanegePasswordCtrl'
  })
  
  .state('forgotpass', {
	  url: '/forgotpass',
	  templateUrl: 'templates/changePassword.html',
	  controller: 'chanegePasswordCtrl'
  })
  
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
		controller: 'pageOneCtrl'
      }
    }
  })
  
  .state('app.page1', {
    url: '/page1',
    views: {
      'menuContent': {
        templateUrl: 'templates/page1.html',
		controller: 'pageOneCtrl'
      }
    }
  })

  .state('app.page2', {
      url: '/page2',
      views: {
        'menuContent': {
          templateUrl: 'templates/page2.html',
		  controller: 'pageTwoCtrl'
        }
      }
    })
	
	.state('app.resetpass', {
	  url: '/resetpass',
	  views: {
        'menuContent': {
          templateUrl: 'templates/changePassword.html',
		  controller: 'changePasswordCtrl'
        }
      }	  
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

serveApp.config(function($authProvider, ipAddress){
	$authProvider.baseUrl = ipAddress;
});
