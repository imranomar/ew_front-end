var baseUrl = 'http://139.59.95.219/demo/easywash_laundry_app_api/backend/web/';

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
         
          //  document.getElementById('status').innerHTML ="You are connected." ;
         }
         else if (response.status === 'not authorized'){
          // document.getElementById('status').innerHTML ='we are not logged in.';
         }
         else{
          // document.getElementById('status').innerHTML ='You are logged into the facebook';
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
                    url: baseUrl+"customersapi/create",
                    data: {
                      "full_name": res.name,
                      "email": res.email,
                      "facebook_id": res.id,
                      "password": '',
                      "phone": '',
                      "sex": ''
                    },
                    success: function (ress) {
                      console.log(ress.id);
                      let check = document.getElementsByClassName('rememberMeCheck')[0];
                       localStorage.setItem('laundryUser', ress.id);
                       let date = new Date();
                        if(check){
                          let date1 = new Date(date.setDate(date.getDate()+10)).toUTCString();
                          document.cookie = 'laundryCookie=y; expires=' + date1;
                        }else{
                          let date1 = new Date(date.setHours(date.getHours()+1)).toUTCString();
                          document.cookie = 'laundryCookie=y; expires=' + date1;
                        }
                       location.reload();
                    },
                    error: function(err){
                      console.log(err);
                    }
                });
            }
          );
        console.log(response);
          //  document.getElementById('status').innerHTML ='You are connected.' ;
         }
         else if (response.status === 'not authorized'){
          // document.getElementById('status').innerHTML ='we are not logged in.';
         }
         else{
          // document.getElementById('status').innerHTML ='You are logged into the facebook.';
         }

  });
 }



var app = angular.module("laundryApp", ["ngRoute"]);

app.config(function($routeProvider,$locationProvider) {
  let cookieName = 'laundryCookie';
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  $routeProvider
  .when("/login", {
    templateUrl : "views/login.html",
    resolve:{
      "check": function($location){
            if(getCookie(cookieName) == 'y'){
              $location.path('/dashboard');
            }  
        }
    }
  })
  .when('/signup', {
    templateUrl: 'views/signup.html',
      resolve:{
        "check": function ($location){
          if(getCookie(cookieName) == 'y'){
            $location.path('/dashboard');
          } 
        }
      }
  })
  .when('/forget', {
    templateUrl: 'views/forget.html',
    resolve :{
      "check": function($location){
        if(getCookie(cookieName) == 'y'){
          $location.path('/dashboard');
        } 
      }
    }
  })
  .when('/dashboard', {
    templateUrl: 'views/dashboard.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/menu', {
    templateUrl: 'views/menu.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/pricing', {
    templateUrl: 'views/pricing.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/aboutus', {
    templateUrl: 'views/aboutus.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/faqs', {
    templateUrl: 'views/faqs.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/mydetails', {
    templateUrl: 'views/mydetails.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/notification', {
    templateUrl: 'views/notifications.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/address', {
    templateUrl: 'views/addresses.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/deliverydate', {
    templateUrl: 'views/deliverydate.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/ordersummary', {
    templateUrl: 'views/ordersummary.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/payment', {
    templateUrl: 'views/paymentmethod.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/finaldate',{
  	templateUrl: 'views/selecttimefinal.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/myedit/:person',{
  	templateUrl: 'views/myedit.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/edit-address/:id', {
    templateUrl: 'views/edit-address.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/edit-payment/:id', {
    templateUrl: 'views/edit-payment.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/add-address', {
    templateUrl: 'views/add-address.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
  })
  .when('/add-payment', {
    templateUrl: 'views/add-payment.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    }
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

// http://thisisbig.ae/advanced/backend/web/
app.factory('appInfo', function () {
  return {
      url: 'http://139.59.95.219/demo/easywash_laundry_app_api/backend/web/'
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

