var app = angular.module("laundryApp", ["ngCordova", "ngCookies", "ngStorage", "ngRoute", "ngValidate", "mgo-angular-wizard", "pascalprecht.translate"]);

app.config(function($translateProvider, $cookiesProvider, $validatorProvider) {
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

  $validatorProvider.addMethod(
    "lettersonly",
    function(value, element) {
      return this.optional(element) || /^[a-z. ]+$/i.test(value);
    },
    "Letters only please"
  );  
});

app.run(function($rootScope, $location, $translate, AppService, LocalDataService) {
  AppService.initialize();
  
  $rootScope.serviceOfferedToCity = "copenhagen";

  $rootScope.customer_id = LocalDataService.getUserDetailsLocal();

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

  var langauage = LocalDataService.getLanguageFromLocal();

  if (langauage) {
      $rootScope.SelectedLang = langauage;
      $translate.use(langauage);
  }

  
  var date = new Date();
  $rootScope.currentYear = date.getFullYear();

  $rootScope.showBackBtn = false;
  $rootScope.hideNavBar = false;

  $rootScope.$on("$routeChangeStart", function(event, currRoute, prevRoute) {
    debugger;
    var currentRouteDetails = currRoute.$$route;

    var authenticationRequired =
      currentRouteDetails && currentRouteDetails.authentication == true
        ? true
        : false;

    var isAuthenticated = LocalDataService.isAuthenticated();
    if(authenticationRequired && !isAuthenticated) {
      $location.path("/login");
    } else if(!authenticationRequired && isAuthenticated) {
      $location.path("/dashboard");
    } else {

      var showBackBtn =
        currentRouteDetails && currentRouteDetails.showBackBtn == true
          ? true
          : false;
      var hideNavBar =
        currentRouteDetails && currentRouteDetails.hideNavBar == true
          ? true
          : false;
          

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
    }
  });
});


app.factory('AppService', function ($rootScope, FCMService) {
  return {
    initialize: function(){
      document.addEventListener(
        "deviceready",
        function() {
          $rootScope.isOnline = true;

          $rootScope.network = $cordovaNetwork.getNetwork();
          $rootScope.isOnline = $cordovaNetwork.isOnline();
          
          // listen for Online event
          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
              $rootScope.isOnline = true;
              $rootScope.network = $cordovaNetwork.getNetwork();
          })
  
          // listen for Offline event
          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
              console.log("got offline");
              $rootScope.isOnline = false;
              $rootScope.network = $cordovaNetwork.getNetwork();
          })

          FCMService.generateToken();
        },
        false
      );
    }
  }
});

app.factory("CommonService", function ($http, $q, $httpParamSerializer) {
  return {
    CallAjaxRequest: function (partialUrl, dataObject, method) {
      var defer = $q.defer();
      $http({
          method: method || 'POST',
          url: baseUrl + partialUrl,
          data: $httpParamSerializer(dataObject),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).success(function (data, status, header, config) {
          defer.resolve(data);
      }).error(function (data, status, header, config) {
          defer.reject(data);
      });
      return defer.promise;
    },
    CallAjaxUsingPostRequest: function (partialUrl, dataObject) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: baseUrl + partialUrl,
            data: $httpParamSerializer(dataObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, header, config) {
            defer.resolve(data);
        }).error(function (data, status, header, config) {
            defer.reject(data);
        });
        return defer.promise;
    },
    CallAjaxUsingGetRequest: function (partialUrl) {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: baseUrl + partialUrl,
        }).success(function (data, status, header, config) {
            defer.resolve(data);
        }).error(function (data, status, header, config) {
            defer.reject(data);
        });
        return defer.promise;
    },
    GenerateAddPaymentForm: function(userId) {
      return (
        '<FORM ACTION="https://payment.architrade.com/paymentweb/start.action" METHOD="POST" CHARSET="UTF -8"> \
                    <INPUT TYPE="hidden" NAME="accepturl" VALUE="' +
        baseUrl +
        'vault/createvaultweb"> \
                    <INPUT TYPE="hidden" NAME="callbackurl" VALUE=""> \
                    <INPUT TYPE="hidden" NAME="amount" VALUE="1"> \
                    <INPUT TYPE="hidden" NAME="currency" VALUE="578"> \
                    <INPUT TYPE="hidden" NAME="merchant" VALUE="90246240"> \
                    <INPUT TYPE="hidden" NAME="orderid" id="orderid" VALUE="' +
        userId +
        '"> \
                    <INPUT TYPE="hidden" NAME="lang" VALUE="EN"> \
                    <INPUT TYPE="hidden" NAME="preauth" VALUE="1"> \
                    <INPUT TYPE="hidden" NAME="test" VALUE="1"> \
                    <INPUT TYPE="hidden" NAME="decorator" VALUE="responsive" /> \
                    <INPUT type="Submit" id="submit" name="submit" style="visibility:hidden"> \
                </FORM> \
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> \
                <script>$("#submit").click();</script>'
      );
    },
    toast: function(message) {
      M.toast({html: message, classes: 'rounded', displayLength: 5000});
    }
  };
});

app.factory("LocalDataService", function($rootScope, $cookies, $localStorage) {
  const is_user_logged_in = true; 
  var LOCALSTORAGE_USER = "laundryUser";
  var LOCALSTORAGE_LANGUAGE = "locale";
  var LOCAL_MYORDER = "myorder";
  var LOCAL_INCOMPLETE_ORDER_ID = "incomplete_order_id";

  return {
    isAuthenticated: function() {
      var user = localStorage.getItem(LOCALSTORAGE_USER);

      if(user) {
        return true;
      }
      return false;
    },
    storeUserDetailsLocal: function(data, isChecked) {
      localStorage.setItem(LOCALSTORAGE_USER, data);

      // var date = new Date();
      // var date1 = "";

      // if (isChecked == true) {
      //   localStorage.setItem(LOCALSTORAGE_REMEMBER_ME, "y");
      //   date1 = new Date(date.setDate(date.getDate() + 10)).toUTCString();
      // } else {
      //   localStorage.removeItem(LOCALSTORAGE_REMEMBER_ME);
      //   date1 = new Date(date.setHours(date.getHours() + 1)).toUTCString();
      // }
      // localStorage.setItem(LOCALSTORAGE_AUTH_USER, '1');
      // document.cookie = "laundryCookie=y; path= /; expires=" + date1;
    },
    getUserDetailsLocal: function() {
      //document.cookie = "laundryCookie=y; path= /; expires=expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      return localStorage.getItem(LOCALSTORAGE_USER);
      //localStorage.removeItem(LOCALSTORAGE_REMEMBER_ME);
    },
    removeUserDetailsLocal: function() {
      //document.cookie = "laundryCookie=y; path= /; expires=expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      localStorage.removeItem(LOCALSTORAGE_USER);
      //localStorage.removeItem(LOCALSTORAGE_REMEMBER_ME);
    },
    storeLanguageLocal(language) {
      $localStorage[LOCALSTORAGE_LANGUAGE] = language;
    },
    getLanguageFromLocal() {
      var language = $localStorage[LOCALSTORAGE_LANGUAGE];

      if (!language) {
        return false;
      }
      return language;
    },
    saveOrderData: function(data) {
      if (is_user_logged_in) {
        $localStorage[LOCAL_MYORDER] = data;
      } else {
        var date = new Date();
        var expireDate = new Date(
          date.setHours(date.getHours() + 1)
        ).toUTCString();

        $cookies.put(LOCAL_MYORDER, JSON.stringify(data), {
          expires: expireDate
        });
      }
    },
    saveOrderDataForUser: function(user_id, data) {
      $localStorage[LOCAL_MYORDER + "_" + user_id] = data;
    },
    getOrderData: function(data) {
      var orderDetails;

      if (is_user_logged_in) {
        orderDetails =
          $localStorage[LOCAL_MYORDER];
      } else {
        orderDetails = $cookies.get(LOCAL_MYORDER);
      }

      if (!orderDetails) {
        return null;
      }

      if (is_user_logged_in) {
        return orderDetails;
      } else {
        return JSON.parse(orderDetails);
      }
    },
    removeOrderData: function() {
      if (is_user_logged_in) {
        delete $localStorage[LOCAL_MYORDER];
      } else {
        $cookies.remove(LOCAL_MYORDER);
      }
    },
    removeGuestUserOrderData: function() {
      $cookies.remove(LOCAL_MYORDER);
    },
    removeUserData: function() {
      delete $localStorage[LOCAL_MYORDER];
    },
    getIncompleteOrderId: function() {
      var orderId
      if (is_user_logged_in) {
        orderId =
          $localStorage[LOCAL_PREFIX_INCOMPLETE_ORDER_ID + "_" + $rootScope.customer_id];
      } else {
        orderId = $cookies.get(LOCAL_PREFIX_INCOMPLETE_ORDER_ID);
      }

      if (!orderId) {
        return false;
      }
      return orderId;
    },
    saveIncompleteOrderId: function(order_id) {
      if (is_user_logged_in) {
        $localStorage[LOCAL_PREFIX_INCOMPLETE_ORDER_ID + "_" + $rootScope.customer_id] = order_id;
      } else {
        var date = new Date();
        var expireDate = new Date(
          date.setHours(date.getHours() + 1)
        ).toUTCString();

        $cookies.put(LOCAL_PREFIX_INCOMPLETE_ORDER_ID, order_id, {
          expires: expireDate
        });
      }
    },
  };
});

app.config(function($routeProvider,$locationProvider) {
  $routeProvider
  .when("/login", {
    templateUrl : "views/login.html",
    authentication: false,
    hideNavBar: true
  })
  .when('/signup', {
    templateUrl: 'views/signup.html',
    authentication: false,
      hideNavBar: true

  })
  .when('/forget', {
    templateUrl: 'views/forget.html',
    hideNavBar: true,
    authentication: false
  })
  .when('/dashboard', {
    templateUrl: 'views/dashboard.html',
    authentication: true
  })
  .when('/menu', {
    templateUrl: 'views/menu.html',
    authentication: false
  })
  .when('/pricing', {
    templateUrl: 'views/pricing.html',
    authentication: false
  })
  .when('/aboutus', {
    templateUrl: 'views/aboutus.html',
    authentication: false
  })
  .when('/faqs', {
    templateUrl: 'views/faqs.html',
    authentication: false
  })
  .when('/mydetails', {
    templateUrl: 'views/mydetails.html',
    authentication: true,
    showBackBtn: true
  })
  .when('/notification', {
    templateUrl: 'views/notifications.html',
    authentication: true
  })
  .when('/address', {
    templateUrl: 'views/addresses.html',
    authentication: true
  })
  .when('/deliverydate', {
    templateUrl: 'views/deliverydate.html',
    authentication: true
  })
  .when('/ordersummary', {
    templateUrl: 'views/ordersummary.html',
    authentication: true,
    showBackBtn: true
  })
  .when('/payment', {
    templateUrl: 'views/paymentmethod.html',
    authentication: true
  })
  .when('/finaldate',{
  	templateUrl: 'views/selecttimefinal.html',
    authentication: true
  })
  .when('/myedit/:person',{
  	templateUrl: 'views/myedit.html',
    authentication: true
  })
  .when('/edit-address/:id', {
    templateUrl: 'views/address.html',
    authentication: true,
    showBackBtn: true
  })
  .when('/add-address', {
    templateUrl: 'views/address.html',
    authentication: true,
    showBackBtn: true
  })
  .when('/add-payment', {
    templateUrl: 'views/add-payment.html',
    authentication: true,
    showBackBtn: true
  })
  .otherwise({
    redirectTo: '/login'
  });

  // use the HTML5 History API
  $locationProvider.html5Mode(false);
});

app.factory('FCMService', function ($rootScope) {
  return {
    generateToken: function(){
      if(!device.cordova) {
         return;
      }
      
      FCMPlugin.getToken(function(token){
        $rootScope.fcm_token = token;
      });
    }
  }
});

app.directive('applyModal', function () {
  return function (scope, element, attrs) {
      $(element).modal();
  };
});


