var app = angular.module("laundryApp", ["ngRoute"]);

app.config(function($routeProvider,$locationProvider) {

  $routeProvider

  .when("/login", {
    templateUrl : "views/login.html",
    controller: 'LoginCtrl',
       resolve:{
          "check": function($location){
                   if(localStorage.getItem('laundrylogin')){
                      $location.path('/dashboard');
                   }
            }
      }
  })
  .when('/signup', {
    templateUrl: 'views/signup.html',
    controller: 'SignupCtrl' ,
      resolve:{
        "check": function ($location){
            if(localStorage.getItem('laundrylogin')){
              $location.path('/dashboard');
            }
        }
      }
    


   
  })
  .when('/forget', {
    templateUrl: 'views/forget.html',
    controller: 'ForgetCtrl',
    resolve :{
      "check": function($location){
        if(localStorage.getItem('laundrylogin')){
          $location.path('/dashboard');
        }
      }
    }


  })
  .when('/dashboard', {
    templateUrl: 'views/dashboard.html',
    controller: 'DashboardCtrl'
  })
  .when('/menu', {
    templateUrl: 'views/menu.html',
    controller: 'MenuCtrl'
  })
  .when('/pricing', {
    templateUrl: 'views/pricing.html',
    controller: 'PricingCtrl'
  })
  .when('/aboutus', {
    templateUrl: 'views/aboutus.html',
    controller: 'AboutusCtrl'
  })
  .when('/faqs', {
    templateUrl: 'views/faqs.html',
    controller: 'FaqsCtrl'
  })
  .when('/mydetails', {
    templateUrl: 'views/mydetails.html',
    controller: 'MydetailsCtrl'
  })
  .when('/notification', {
    templateUrl: 'views/notifications.html',
    controller: 'NotificationCtrl'
  })
  .when('/address', {
    templateUrl: 'views/addresses.html',
    controller: 'AddressesCtrl'
  })
  .when('/deliverydate', {
    templateUrl: 'views/deliverydate.html',
    controller: 'DeliverydateCtrl'
  })
  .when('/ordersummary', {
    templateUrl: 'views/ordersummary.html',
    controller: 'OrdersummaryCtrl'
  })
  .when('/payment', {
    templateUrl: 'views/paymentmethod.html',
    controller: 'PaymentmethodCtrl'
  })
  .when('/finaldate',{
  	templateUrl: 'views/selecttimefinal.html',
  	controller: 'FinaldateCtrl'
  })
  .when('/myedit/:person',{
  	templateUrl: 'views/myedit.html',
  	controller: 'MyeditCtrl'
  })
  .otherwise({
    redirectTo: '/login'
  });

  // use the HTML5 History API
  $locationProvider.html5Mode(false);



});

// route for the about page
// .when('/about/:person', {
//     templateUrl : 'pages/about.html',
//     controller  : 'aboutController'
// })

app.directive('itemFloatingLabel', function() {
  return {
    restrict: 'C',
    link: function(scope, element) {
      var el = element[0];
      var input = el.querySelector('input, textarea');
      var inputLabel = el.querySelector('.input-label');

      if (!input || !inputLabel) return;

      var onInput = function() {
        if (input.value) {
          inputLabel.classList.add('has-input');
        } else {
          inputLabel.classList.remove('has-input');
        }
      };

      input.addEventListener('input', onInput);

      

      scope.$on('$destroy', function() {
        input.removeEventListener('input', onInput);
      });
    }
  };
});

