var app = angular.module("laundryApp", ["ngRoute"]);

app.config(function($routeProvider) {

  $routeProvider

  .when("/", {
    templateUrl : "views/login.html",
    controller: 'LoginCtrl'
  })
  .when('/signup', {
    templateUrl: 'views/signup.html',
    controller: 'SignupCtrl'
  })
  .when('/forget', {
    templateUrl: 'views/forget.html',
    controller: 'ForgetCtrl'
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
  .otherwise({
    redirectTo: '/'
  });



});

