//initialise and setup facebook js sdk
  window.fbAsyncInit = function() {
    FB.init({
      appId            : '630548993961819',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.12'
    });
    FB.getLoginStatus(function(response){
          console.log(response);
         if(response.status === 'connected'){
         
           document.getElementById('status').innerHTML ="You are connected." ;
         }
         else if (response.status === 'not authorized'){
          document.getElementById('status').innerHTML ='we are not logged in.';
         }
         else{
          document.getElementById('status').innerHTML ='You are logged into the facebook';
         }
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

 function login(){
  FB.login(function(response){
       if(response.status === 'connected'){
          FB.api('/me', { locale: 'en_US', fields: 'name, email' },

            function(res) {
               $.ajax({
                    type: "POST",
                    url: "http://thisisbig.ae/advanced/backend/web/customersapi/create",
                    data: {
                      "full_name": res.name,
                      "email": res.email,
                      "facebook_id": res.id,
                      "password": '',
                      "phone": '',
                      "sex": ''
                    },
                    success: function (data) {
                       console.log(data);
                    },
                    error: function(err){
                      console.log(err);
                    }
                });
            }
          );
        console.log(response);
           document.getElementById('status').innerHTML ='You are connected.' ;
         }
         else if (response.status === 'not authorized'){
          document.getElementById('status').innerHTML ='we are not logged in.';
         }
         else{
          document.getElementById('status').innerHTML ='You are logged into the facebook.';
         }

  });
 }



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
    templateUrl: 'views/mydetails.html'
  })
  .when('/notification', {
    templateUrl: 'views/notifications.html',
    controller: 'NotificationCtrl'
  })
  .when('/address', {
    templateUrl: 'views/addresses.html'
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

app.factory('appInfo', function () {
  return {
      url: 'http://thisisbig.ae/advanced/backend/web/'
  }
});

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

