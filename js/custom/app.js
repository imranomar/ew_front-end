var app = angular.module("laundryApp", ["ngCookies", "ngStorage", "ngRoute", "ngValidate", "mgo-angular-wizard", "pascalprecht.translate"]);

app.config(function($translateProvider, $cookiesProvider) {
  // Set $cookies defaults
  $cookiesProvider.defaults.path = '/';

  $translateProvider.preferredLanguage('en');
  $translateProvider.registerAvailableLanguageKeys(['en', 'dm'], {
      'en': 'en',
      'dm': 'dm'
  });

  $translateProvider.useStaticFilesLoader({
      prefix: translationFolderPath,
      suffix: '.json'
  });

  $translateProvider.useSanitizeValueStrategy(null);
});

app.run(function($rootScope, $translate, AppService, CommonService) {
  AppService.initialize();
  $rootScope.customer_id = localStorage.getItem('laundryUser');

  $rootScope.Languages = {
    'en': 'English',
    'dm': 'Denmark'
  };

  $rootScope.CardTypes = {
    "MC": "Master Card",
    "VISA": "VISA Card",
    "DK": "Dankort Card",
    "V-DK": "VISA/Dankort Card",
    "ELEC": "VISA Electron Card"
  };

  $rootScope.SelectedLang = 'en';

  var langauage = CommonService.getLanguageFromLocal();

  if (langauage) {
      $rootScope.SelectedLang = langauage;
      $translate.use(langauage);
  }

  $rootScope.showBackBtn = false;
  $rootScope.hideNavBar = false;

  $rootScope.$on("$routeChangeStart", function(event, currRoute, prevRoute) {
    var currentRouteDetails = currRoute.$$route;
    var showBackBtn = currentRouteDetails && currentRouteDetails.showBackBtn == true? true: false;
    var hideNavBar = currentRouteDetails && currentRouteDetails.hideNavBar == true? true: false;

    if (showBackBtn && showBackBtn == true) {
      $rootScope.showBackBtn = true;
    } else {
      $rootScope.showBackBtn = false;
    }

    if (hideNavBar && hideNavBar == true) {
      $rootScope.hideNavBar = true;
    } else {
      $rootScope.hideNavBar = false;
    }
  });
});


app.factory('AppService', function ($rootScope, FCMService) {
  return {
    initialize: function(){
      document.addEventListener("deviceready", function() {
        FCMService.generateToken();
      }, false);
    }
  }
});


app.factory("CommonService", function ($http, $q, $httpParamSerializer, appInfo, $localStorage) {
  var LOCALSTORAGE_USER = "laundryUser";
  var LOCALSTORAGE_REMEMBER_ME = "rememberMe";
  var LOCALSTORAGE_LANGUAGE = "locale";


  return {
    storeLanguageLocal(language) {
        $localStorage[LOCALSTORAGE_LANGUAGE] = language;
    },
    getLanguageFromLocal: function() {
        var language = $localStorage[LOCALSTORAGE_LANGUAGE];

        if (!language) {
            return false;
        }
        return language;
    },
    storeUserDetailsLocal: function(data, isChecked) {
      localStorage.setItem(LOCALSTORAGE_USER, data);

      var date = new Date();
      var date1 = "";

      if(isChecked == true) {
        localStorage.setItem(LOCALSTORAGE_REMEMBER_ME, 'y');
        date1 = new Date(date.setDate(date.getDate()+10)).toUTCString();
      } else {
        localStorage.removeItem(LOCALSTORAGE_REMEMBER_ME);
        date1 = new Date(date.setHours(date.getHours()+1)).toUTCString();
      }
      document.cookie = 'laundryCookie=y; path= /; expires=' + date1;
    },
    removeUserDetailsLocal: function() {
      document.cookie = 'laundryCookie=y; path= /; expires=expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      localStorage.removeItem(LOCALSTORAGE_USER);
      localStorage.removeItem(LOCALSTORAGE_REMEMBER_ME);
    },
    CallAjaxUsingPostRequest: function (partialUrl, dataObject) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: appInfo.url + partialUrl,
            data: $httpParamSerializer(dataObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, header, config) {
            defer.resolve(data);
        }).error(function (data, status, header, config) {
            defer.reject(status);
        });
        return defer.promise;
    },
    CallAjaxUsingGetRequest: function (partialUrl) {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: appInfo.url + partialUrl,
        }).success(function (data, status, header, config) {
            defer.resolve(data);
        }).error(function (data, status, header, config) {
            defer.reject(status);
        });
        return defer.promise;
    },
    GenerateAddPaymentForm: function(userId) {
      return '<FORM ACTION="https://payment.architrade.com/paymentweb/start.action" METHOD="POST" CHARSET="UTF -8"> \
                  <INPUT TYPE="hidden" NAME="accepturl" VALUE="'+ baseUrl +'vault/createvaultweb"> \
                  <INPUT TYPE="hidden" NAME="callbackurl" VALUE=""> \
                  <INPUT TYPE="hidden" NAME="amount" VALUE="1"> \
                  <INPUT TYPE="hidden" NAME="currency" VALUE="578"> \
                  <INPUT TYPE="hidden" NAME="merchant" VALUE="90246240"> \
                  <INPUT TYPE="hidden" NAME="orderid" id="orderid" VALUE="' + userId +'"> \
                  <INPUT TYPE="hidden" NAME="lang" VALUE="EN"> \
                  <INPUT TYPE="hidden" NAME="preauth" VALUE="1"> \
                  <INPUT TYPE="hidden" NAME="test" VALUE="1"> \
                  <INPUT TYPE="hidden" NAME="decorator" VALUE="responsive" /> \
                  <INPUT type="Submit" id="submit" name="submit" style="visibility:hidden"> \
              </FORM> \
              <script src="js/jquery-3.3.1.slim.min.js"></script> \
              <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> \
              <script>$("#submit").click();</script>';
    }
  };
});

app.config(function($routeProvider,$locationProvider) {
  let cookieName = 'laundryCookie';
  function getCookie(name) {
    debugger;
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
    },
    hideNavBar: true
  })
  .when('/signup', {
    templateUrl: 'views/signup.html',
      resolve:{
        "check": function ($location){
          if(getCookie(cookieName) == 'y'){
            $location.path('/dashboard');
          } 
        }
      },
      hideNavBar: true

  })
  .when('/forget', {
    templateUrl: 'views/forget.html',
    resolve :{
      "check": function($location){
        if(getCookie(cookieName) == 'y'){
          $location.path('/dashboard');
        } 
      }
    },
    hideNavBar: true
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
    },
    showBackBtn: true
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
    },
    showBackBtn: true
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
    templateUrl: 'views/address.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    },
    showBackBtn: true
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
    templateUrl: 'views/address.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    },
    showBackBtn: true
  })
  .when('/add-payment', {
    templateUrl: 'views/add-payment.html',
    resolve :{
      "check": function($location){
        if(!getCookie(cookieName)){
          $location.path('/login');
        } 
      }
    },
    showBackBtn: true
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
      url: baseUrl
  }
});

app.factory('FCMService', function ($rootScope, appInfo, $httpParamSerializer,$http) {
  return {
    generateToken: function(){
      if(!device.cordova) {
         return;
      }
      
      FCMPlugin.getToken(function(token){
        $rootScope.fcm_token = token;
        // let x = localStorage.getItem('laundryUser');
        // let data = {
        //   token: token,     
        // };
        // let req = {
        //     method: 'PUT',
        //     url: appInfo.url+'customersapi/update/?id='+x,
        //     data: $httpParamSerializer(data),
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // }
        // $http(req)
        //   .then(function(res){
        //     console.log(res);
        //   }).catch(function(error){
        //       console.log(error);      
        // })
      });
    }
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

app.directive('applyModal', function () {
  return function (scope, element, attrs) {
      $(element).modal();
  };
});


