// App Controller
app.controller("AppController", function(
  $scope,
  $rootScope,
  $location,
  $filter,
  $timeout,
  $translate,
  CommonService
) {
  $rootScope.showLoading = false;
  $scope.changeLanguage = function(lang) {
    $rootScope.SelectedLang = lang;
    CommonService.storeLanguageLocal(lang);
    $translate.use(lang);
  };

  $rootScope.goTo = function(route) {
    $(".sidenav").sidenav("close");
    $location.path(route);
  };

  $scope.signout = function() {
    CommonService.removeUserDetailsLocal();
    $location.path("/login");
  };

  $rootScope.closemenu = function() {
    $location.path("/dashboard");
  };

  /** Validation **/
  $rootScope.loginValidationOptions = {
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      email: {
        required: function() {
          return $filter("translate")("validation_message_email_required");
        },
        email: function() {
          return $filter("translate")("validation_message_email_invalid");
        }
      },
      password: {
        required: function() {
          return $filter("translate")("validation_message_password_required");
        }
      }
    }
  };

  $rootScope.basicDetailsValidationOptions = {
    rules: {
      fullname: {
        required: true,
        lettersonly: true
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        number: true,
        minlength: 7
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      fullname: {
        required: function() {
          return $filter("translate")("validation_message_fullname_required");
        },
        lettersonly: function() {
          return $filter("translate")("validation_message_lettersonly");
        }
      },
      email: {
        required: function() {
          return $filter("translate")("validation_message_email_required");
        }
      },
      phone: {
        required: function() {
          return $filter("translate")("validation_message_phone_required");
        }
      },
      password: {
        required: function() {
          return $filter("translate")("validation_message_password_required");
        }
      }
    }
  };

  $rootScope.forgotPasswordValidationOptions = {
    rules: {
      email: {
        required: true,
        email: true
      }
    }
  };
});

//Login of Controller
app.controller("LoginCtrl", function(
  $scope,
  $rootScope,
  $location,
  $timeout,
  CommonService
) {
  $rootScope.showLoading = false;

  $scope.logindata = {
    email: "",
    password: ""
  };

  $scope.checked = true;

  $scope.err = false;

  $scope.loginsubmit = function(form) {
    if (form.validate()) {
      $scope.err = false;

      let email = $scope.logindata.email;
      let password = $scope.logindata.password;

      $rootScope.showLoading = true;

      var apiUrl =
        "customersapi/authenticate?email=" + email + "&password=" + password;

      CommonService.CallAjaxUsingPostRequest(apiUrl, {
        device_id: $rootScope.fcm_token
      })
        .then(
          function(data) {
            if (data != 0) {
              CommonService.storeUserDetailsLocal(data, $scope.checked);
              $rootScope.goTo("/dashboard");
            } else {
              $scope.err = true;
            }
          },
          function(error) {
            console.log("error");
            console.log(err);
          }
        )
        .finally(function() {
          $rootScope.showLoading = false;
        });
    }
  };

  /** Validation **/
  $scope.validationOptions = {
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    }
  };
});

// Signup of Controller

app.controller("SignupCtrl", function(
  $scope,
  $rootScope,
  CommonService,
  $location
) {
  $rootScope.showLoading = false;

  $scope.signupdata = {};

  $scope.signupsubmitform = function(form) {
    if (form.validate()) {
      let data = {
        full_name: $scope.signupdata.name,
        email: $scope.signupdata.email,
        password: $scope.signupdata.password,
        phone: $scope.signupdata.phone,
        sex: "0"
      };

      $scope.err = "";
      $rootScope.showLoading = true;

      var apiUrl = "customersapi/create";

      CommonService.CallAjaxUsingPostRequest(apiUrl, data)
        .then(
          function(data) {
            CommonService.storeUserDetailsLocal(data, $scope.checked);
            $location.path("/dashboard");
          },
          function(error) {
            console.log("error");
            console.log(err);
          }
        )
        .finally(function() {
          $rootScope.showLoading = false;
        });
      }
  };
});

// Forget password of Controller

// Forget password of Controller
app.controller("ForgetCtrl", function($scope, $rootScope, CommonService, $timeout) {
  $scope.messageObj = null;
  $rootScope.showLoading = false;
  $scope.form = {
    email: null
  };

  var apiUrl = "customersapi/forgotpassword";

  $scope.forgotpassowrd = function(form) {
    if (form.validate()) {
      $rootScope.showLoading = true;
      CommonService.CallAjaxUsingPostRequest(apiUrl, $scope.form)
        .then(
          function(result) {
            if (result.Success == true) {
              $scope.form.email = null;

              $scope.messageObj = {
                class: "msg msg-info",
                message: result.Message
              };
            } else {
              $scope.messageObj = {
                class: "msg msg-error",
                message: result.Message
              };
            }

            $timeout(function() {
              $scope.messageObj = null;
            }, 2000);
          },
          function(error) {}
        )
        .finally(function() {
          $rootScope.showLoading = false;
        });
    }
  };
});

// Dashboard of Controller
app.controller("DashboardCtrl", function($scope, $location) {

});

// pricing of Controller
app.controller("PricingCtrl", function($scope) {
  // body...
});

// Aboutus of Controller

app.controller("AboutusCtrl", function($scope) {
  // body...
});

// Frequently asked questions of Controller

app.controller("FaqsCtrl", function($scope) {
  $scope.questions = [
    {
      question: "How do I brighten my dingy white clothes and linens?",
      decription:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English."
    },
    {
      question:
        "How do I remove set-in stains that have been washed and dried?",
      decription:
        "washed and dried? Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "
    },
    {
      question: "How can I prevent fading of my dark clothes?",
      decription:
        "fading of my dark clothes? There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable."
    },
    {
      question: "How do I remove dye transfer from clothes?",
      decription:
        "dye transfer from clothes? Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for"
    },
    {
      question: "How do I remove yellow armpit stains?",
      decription:
        "yellow armpit stains? Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for"
    },
    {
      question: "How do I remove ink stains from clothes and leather?",
      decription:
        "ink stains from clothes and leather? Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for"
    },
    {
      question: "Why wont my washer/dryer work?",
      decription:
        "washer/dryer work? Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for"
    }
  ];

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };

  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
});

// My details Page of Controller

app.controller("MydetailsCtrl", function(
  $scope,
  $location,
  $http,
  appInfo,
  $httpParamSerializer
) {
  // body...
  $scope.loading = false;
  let x = localStorage.getItem("laundryUser");

  $scope.userdata = {};
  $scope.asteriskPassword = "";
  $scope.paymentDetails = [];
  $scope.cityids = [];
  getPayment();
  getAddress();
  getVault(x);

  function getPassword() {
    let p = $scope.userdata.password.split("").map(() => {
      return "*";
    });
    $scope.asteriskPassword = p.join("");
  }

  $(".edit-btn").click(function() {
    $(this).css("display", "none"); //working
    $(this)
      .parent()
      .parent()
      .find(".clk-fade-in")
      .css("display", "block");
    $(this)
      .parent()
      .parent()
      .find(".clk-fade-out")
      .css("display", "none");
    $(this)
      .parent()
      .parent()
      .find(".whn-clk-edt")
      .css("display", "block");
    $(this)
      .parent()
      .parent()
      .find(".form-control")
      .css("display", "block"); //working
    $(this)
      .parent()
      .parent()
      .find(".form-control")
      .focus(); //working
  });

  $(".whn-clk-edt").click(function() {
    $(this).css("display", "none"); //working
    $(this)
      .parent()
      .parent()
      .find(".clk-fade-in")
      .css("display", "none");
    $(this)
      .parent()
      .parent()
      .find(".clk-fade-out")
      .css("display", "block");
    $(this)
      .parent()
      .parent()
      .find(".whn-clk-edt")
      .css("display", "none");
    $(this)
      .parent()
      .parent()
      .find(".form-control")
      .css("display", "none"); //working
    $(this)
      .parent()
      .parent()
      .find(".form-control")
      .focus(); //working
    $(this)
      .parent()
      .parent()
      .find(".edit-btn")
      .css("display", "block");
  });

  $scope.onSavePersonDetail = function() {
    let data = {
      full_name: $scope.userdata.full_name,
      email: $scope.userdata.email,
      password: $scope.userdata.password,
      phone: $scope.userdata.phone
    };

    let req = {
      method: "PUT",
      crossDomain: true,
      url: appInfo.url + "customersapi/update/?id=" + x,
      data: $httpParamSerializer(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $scope.loading = true;
    $http(req)
      .then(function(res) {
        $scope.loading = false;
        console.log(res);
        $scope.userdata.password = res.data.password;
        getPassword();
      })
      .catch(function(err) {
        $scope.loading = false;
        console.log(err);
      });
  };

  function getAddress() {
    $http
      .get(appInfo.url + "customersapi/view/?id=" + x + "&expand=addresses")
      .then(function(res) {
        //   console.log(res.data);
        $scope.userdata = res.data;
        for (let value of $scope.userdata.addresses) {
          getcity(value.city_id);
        }
        getPassword();
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function getPayment() {
    //alert(appInfo.url+'customersapi/view/?id='+x+'&expand=payments');
    $http
      .get(appInfo.url + "customersapi/view/?id=" + x + "&expand=payments")
      .then(function(res) {
        $scope.loading = false;
        // console.log(res.data);
        $scope.userdata.payments = res.data.payments;
        //for(let value of  $scope.userdata.payments){
        //getVault(value.vault_id);
        //}
      })
      .catch(function(err) {
        $scope.loading = false;
        console.log(err);
      });
  }

  function getVault(id) {
    //alert(appInfo.url+'vaultapi/view/?id='+id);
    $scope.loading = true;
    $http
      .get(appInfo.url + "customersapi/view/?id=" + x + "&expand=vault")
      .then(function(res) {
        $scope.loading = false;
        for (let value of res.data.vault) {
          $scope.paymentDetails.push(value);
        }
      })
      .catch(function(err) {
        $scope.loading = false;
        console.log(err);
      });
  }

  function getcity(city) {
    $http
      .get(appInfo.url + "citiesapi/view?id=" + city)
      .then(function(res) {
        console.log(res.data);
        $scope.cityids.push(res.data);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});

// Load Notification Page of Controller

app.controller("NotificationCtrl", function($scope) {
  $scope.notificationtoday = [
    {
      todayname: "LAUNDRY PICKUP TODAY",
      timing: "AT 8:00 AM",
      date: "Thu 17th August 2017"
    },
    {
      todayname: "LAUNDRY PICKUP TODAY",
      timing: "AT 8:00 AM",
      date: "Thu 17th August 2017"
    },
    {
      todayname: "LAUNDRY PICKUP TODAY",
      timing: "AT 8:00 AM",
      date: "Thu 17th August 2017"
    },
    {
      todayname: "LAUNDRY PICKUP TODAY",
      timing: "AT 8:00 AM",
      date: "Thu 17th August 2017"
    },
    {
      todayname: "LAUNDRY PICKUP TODAY",
      timing: "AT 3:00 AM",
      date: "Thu 17th August 2017"
    }
  ];

  $scope.laundrypickup = [
    {
      todayname: "LAUNDRY PICKUP",
      timing: "IN 1 HOUR!"
    },
    {
      todayname: "LAUNDRY PICKUP",
      timing: "IN 1 HOUR!"
    },
    {
      todayname: "LAUNDRY PICKUP",
      timing: "IN 1 HOUR!"
    }
  ];
});

// Load addresses page of controller

app.controller("AddressesCtrl", function(
  $scope,
  $http,
  appInfo,
  $location,
  $httpParamSerializer
) {
  $scope.loading = false;
  let x = localStorage.getItem("laundryUser");
  $scope.userdata = {};
  $scope.cityids = [];
  $scope.cityData = [];
  getAddress();
  getAllcity();

  $("body").on("click", ".magic-edit", function() {
    $(this).css("display", "none");
    $(this)
      .siblings(".magic-check")
      .css("display", "block");
    $(this)
      .siblings(".magic-input")
      .css("display", "block");
    $(this)
      .siblings(".main-data")
      .css("display", "none");
  });

  $("body").on("click", ".magic-check", function() {
    $(this).css("display", "none");
    $(this)
      .siblings(".magic-edit")
      .css("display", "block");
    $(this)
      .siblings(".magic-input")
      .css("display", "none");
    $(this)
      .siblings(".main-data")
      .css("display", "block");
  });

  $("body").on("click", ".magic-check", function() {
    let bodyfont = $(this).parents(".bodyfont");

    var streetname = bodyfont.find('.xxx-control[name="streetname"]').val();
    var pobox = bodyfont.find('.xxx-control[name="pobox"]').val();
    var floor = bodyfont.find('.xxx-control[name="floor"]').val();
    var city = bodyfont.find('.xxx-control[name="city"]').val();
    var id = bodyfont.find('.id[name="id"]').val();
    var index = bodyfont.find('.index[name="index"]').val();

    let data = {
      street_name: streetname,
      floor: floor,
      pobox: pobox,
      city_id: city
    };

    let req = {
      method: "PUT",
      url: appInfo.url + "addressesapi/update?id=" + id,
      data: $httpParamSerializer(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $scope.loading = true;
    $http(req)
      .then(function(res) {
        $scope.loading = false;
        console.log(res.data);
        console.log("address");
        $scope.userdata.addresses[index] = res.data;
      })
      .catch(function(err) {
        $scope.loading = false;
        console.log(err);
      });
  });

  $scope.onDelteAddress = function(data) {
    let req = {
      method: "DELETE",
      url: appInfo.url + "addressesapi/delete?id=" + data.id,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $scope.err = "";
    $scope.loading = true;
    $http(req)
      .then(function(res) {
        $scope.loading = false;
        console.log(res.data);
        getAddress();
      })
      .catch(function(error) {
        $scope.loading = false;
        let err = error.data;
        $scope.err = err[0].message;
        // console.log(error);
      });
  };

  function getAddress() {
    $scope.loading = true;
    $http
      .get(appInfo.url + "customersapi/view/?id=" + x + "&expand=addresses")
      .then(function(res) {
        $scope.loading = false;
        console.log(res.data.id);
        $scope.getAddressId = res.data.id;

        $scope.userdata = res.data;
        for (let value of $scope.userdata.addresses) {
          getcity(value.city_id);
        }
      })
      .catch(function(err) {
        $scope.loading = false;
        console.log(err);
      });
  }

  function getcity(city) {
    $http
      .get(appInfo.url + "citiesapi/view?id=" + city)
      .then(function(res) {
        console.log(res.data);
        $scope.cityids.push(res.data);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function getAllcity() {
    $http
      .get(appInfo.url + "citiesapi")
      .then(function(res) {
        $scope.cityData = res.data;
        console.log($scope.cityData);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});

// Load Controller of DeliverydateCtrl

app.controller("DeliverydateCtrl", function($scope) {
  // body...
});

// Load Controller of OrdersummaryCtrl

app.controller("OrdersummaryCtrl", function(
  $q,
  $timeout,
  WizardHandler,
  $scope,
  $http,
  appInfo,
  CommonService,
  $httpParamSerializer,
  $location
) {
  //$scope.selectedStep = "Step 2";

  let x = localStorage.getItem("laundryUser");

  $scope.showLoading = true;
  $scope.loading = false;

  $scope.pickupDateList = [];
  $scope.showAllpickupDateList = false;

  $scope.deliveryDateList = [];
  $scope.showAlldeliveryDateList = false;

  $scope.err = false;
  $scope.errorMessage = null;

  $scope.Wizard = null;
  $scope.stepValidation = true;

  //  localstorage keys
  $scope.localData = {
    pickupDate: {},
    pickupTime: {},
    deliveryDate: {},
    deliveryTime: {}
  };

  var days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];
  var months = new Array();
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";

  initializeOrderCreation();

  function initializeOrderCreation() {
    /* Load User details */
    var apiUserUrl = "customersapi/view/?id=" + x + "&expand=addresses,vault";
    CommonService.CallAjaxUsingGetRequest(apiUserUrl)
      .then(
        function(data) {
          if (data.addresses && data.addresses.length > 0) {
            debugger;
            extractDefaultAddress(data.addresses);
          }

          if (data.vault && data.vault.length > 0) {
            extractDefaultVault(data.vault);
          }
        },
        function(error) {
          console.log("error");
          console.log(err);
        }
      )
      .finally(function() {});

    /* Load Options details */
    CommonService.CallAjaxUsingGetRequest("optionsapi")
      .then(
        function(data) {
          if (data && data.length > 0) $scope.optionsData = data[0];
        },
        function(error) {
          console.log("error");
          console.log(err);
        }
      )
      .finally(function() {
        $scope.showLoading = false;
      });

    /* Load Pricing details */
    CommonService.CallAjaxUsingGetRequest("slotspricingapi")
      .then(
        function(data) {
          if (data && data.length > 0) $scope.TimeSlots = data;
        },
        function(error) {
          console.log("error");
          console.log(err);
        }
      )
      .finally(function() {});
  }

  $scope.initializeWizard = function() {
    functionForPickupDate();

    $scope.Wizard = WizardHandler.wizard("requestPickupWizard");

    if (getLocalStorageData()) {
      $scope.localData = getLocalStorageData();

      var goToStep = 0;

      if (getObjectLength($scope.localData.deliveryTime) != 0) {
        goToStep = 4;
      } else if (getObjectLength($scope.localData.deliveryDate) != 0) {
        goToStep = 3;
      } else if (getObjectLength($scope.localData.pickupTime) != 0) {
        goToStep = 2;
      } else if (getObjectLength($scope.localData.pickupDate) != 0) {
        goToStep = 1;
      }
      $scope.goToStep(goToStep);
    }
  };

  $scope.$on("wizard:stepChanged", function(event, args) {
    console.log(args);
    var step = args.index;

    switch (step) {
      case 0:
        $scope.showAllpickupDateList = false;
        break;

      case 1:
        console.log("second");
        break;

      case 2:
        $scope.showAlldeliveryDateList = false;
        functionForDropDate();
        break;
    }
  });

  $scope.validateStep = function() {
    debugger;
    if ($scope.stepValidation == true) {
      var currentStep = $scope.Wizard.currentStepNumber();

      if (
        currentStep == 1 &&
        getObjectLength($scope.localData.pickupDate) == 0
      ) {
        return false;
      } else if (
        currentStep == 2 &&
        getObjectLength($scope.localData.pickupTime) == 0
      ) {
        return false;
      } else if (
        currentStep == 3 &&
        getObjectLength($scope.localData.deliveryDate) == 0
      ) {
        return false;
      } else if (
        currentStep == 4 &&
        getObjectLength($scope.localData.deliveryTime) == 0
      ) {
        return false;
      }
    }
    return true;
  };

  $scope.noValidation = function() {
    $scope.stepValidation = false;
  };

  $scope.checkValidation = function() {
    $scope.stepValidation = true;
  };

  // wizard one start
  function functionForPickupDate() {
    if ($scope.optionsData == null) return;

    let array = [];
    let date = new Date();

    let holidays = $scope.optionsData.holidays.split(",");
    let length = $scope.optionsData.holidays.split(",").length;
    if ($scope.optionsData.weekend) {
      length += 1;
    }
    for (var i = 0; i < 16 + length; i++) {
      let name = "";
      let price = "";
      date = new Date();
      let d = new Date(date.setDate(date.getDate() + i));
      if (d.getDate() == new Date().getDate()) {
        // if  day is tomorrow
        name = "Today";
        price = $scope.optionsData.same_day_pickup_price;
      } else if (d.getDate() == new Date().getDate() + 1) {
        // if day is day after
        name = "Tomorrow";
      } else {
        name = days[d.getDay()];
      }

      array.push({
        date: d,
        name: name,
        price: price,
        shortDate: d.getDate() + "th " + months[d.getMonth()]
      });
    }

    for (var i = 0; i < array.length; i++) {
      for (let j = 0; j < holidays.length; j++) {
        if (array[i]) {
          if (
            array[i].date.toLocaleDateString() ==
            new Date(holidays[j] * 1000).toLocaleDateString()
          ) {
            array.splice(i, 1);
          }
        }
      }

      if ($scope.optionsData.weekend) {
        if (array[i]) {
          if (days.indexOf($scope.optionsData.weekend) > -1) {
            if (
              array[i].date.getDay() == days.indexOf($scope.optionsData.weekend)
            ) {
              array.splice(i, 1);
            }
          }
        }
      }
    }
    array.length = 15;
    $scope.pickupDateList = array;
    console.log($scope.pickupDateList);
  }

  $scope.loadMorePickupDates = function() {
    $scope.showAllpickupDateList = true;
  };
  // wizard one closed

  // wizard three  start
  function functionForDropDate() {
    if ($scope.optionsData == null) return;

    let array = [];
    let date = new Date(getLocalStorageData().pickupDate.date);
    let pickupD = new Date(getLocalStorageData().pickupDate.date);

    let holidays = $scope.optionsData.holidays.split(",");
    let length = $scope.optionsData.holidays.split(",").length;
    if ($scope.optionsData.weekend) {
      length += 1;
    }
    for (var i = 0; i < 16 + length; i++) {
      let name = "";
      let price = "";
      let d = new Date(date.setDate(date.getDate() + 1));
      if (d.getDate() == new Date().getDate() + 1) {
        // if day is day after
        name = "Tomorrow";
        price = $scope.optionsData.next_day_delivery_price;
      } else if (d.getDate() == pickupD.getDate() + 1) {
        // if  day is tomorrow
        // name = 'day after';
        name = "next day deliever";
        price = $scope.optionsData.next_day_delivery_price;
      }

      array.push({
        date: d,
        name: name,
        price: price,
        shortDate: d.getDate() + "th " + days[d.getDay()]
      });
    }
    for (var i = 0; i < array.length; i++) {
      for (let j = 0; j < holidays.length; j++) {
        if (array[i]) {
          if (
            array[i].date.toLocaleDateString() ==
            new Date(holidays[j] * 1000).toLocaleDateString()
          ) {
            array.splice(i, 1);
          }
        }
      }
      if (array[i]) {
        if ($scope.optionsData.weekend) {
          if (days.indexOf($scope.optionsData.weekend) > -1) {
            if (
              array[i].date.getDay() == days.indexOf($scope.optionsData.weekend)
            ) {
              array.splice(i, 1);
            }
          }
        }
      }
    }
    array.length = 15;
    $scope.deliveryDateList = array;
  }

  $scope.loadMoreDeliveryDates = function() {
    $scope.showAlldeliveryDateList = true;
  };
  // wizard three closed

  // Wizard last step
  $scope.goToStep = function(stepNumber) {
    if ($scope.Wizard) {
      $scope.Wizard.goTo(stepNumber);
    }
  };

  // End Wizard last step

  /* Common Functions */

  function extractDefaultAddress(addresses) {
    $scope.AllAddresses = addresses;

    var address = addresses.find(function(adr) {
      return adr.as_default == 1;
    });

    if (address && address !== null) {
      $scope.getAddress = address;
    } else {
      $scope.getAddress = addresses[0];
    }
  }

  function extractDefaultVault(vaults) {
    $scope.AllPayments = vaults;

    var vault = vaults.find(function(vlt) {
      return vlt.as_default == 1;
    });

    if (vault && vault !== null) {
      $scope.getPayment = vault;
    } else {
      $scope.getPayment = vaults[0];
    }
  }

  /* End of Common Functions */

  $scope.changeVault = function(vault) {
    $scope.getPayment = vault;
    $("#vaultChangeModal").modal("close");
  };

  $scope.changeAddress = function(address) {
    $scope.getAddress = address;
    $("#addressChangeModal").modal("close");
  };

  $scope.performAction = function(action, value) {
    switch (action) {
      case "SAVE_PICKUP_DATE":
        $scope.localData.pickupDate = value;
        break;

      case "SELECT_PICKUP_TIME":
        $scope.localData.pickupTime = value;
        return false;
        break;

      case "SELECT_PICKUP_AT_DOOR":
        $scope.localData.pickupTime = {};
        $scope.localData.pickupTime.leaveAtdoor = "y";
        break;

      case "SAVE_DELIVERY_DATE":
        $scope.localData.deliveryDate = value;
        break;

      case "SELECT_DELIVERY_TIME":
        $scope.localData.deliveryTime = value;
        return false;
        break;

      case "SELECT_DELIVERY_AT_DOOR":
        $scope.localData.deliveryTime = {};
        $scope.localData.deliveryTime.leaveAtdoor = "y";
        break;
    }

    let obj = JSON.stringify($scope.localData);
    saveLocalData(obj);

    // Check Validation
    $scope.checkValidation();
  };

  //get data in fith wizard
  $scope.createOrder = function() {
    $scope.err = false;

    if (!$scope.getAddress) {
      $scope.err = true;
      $scope.errorMessage = "Please add address details";
      return;
    }
    if (!$scope.getPayment) {
      $scope.err = true;
      $scope.errorMessage = "Please add payment details";
      return;
    }

    let getItemLocallyCustomer = localStorage.getItem("laundryUser");
    var confuseDatepickup = $scope.localData.pickupDate.date;
    var simpleDatepickup = new Date(confuseDatepickup)
      .toISOString()
      .substr(0, 10);
    var confuseDate = $scope.localData.deliveryDate.date;
    var simpleDate = new Date(confuseDate).toISOString().substr(0, 10);

    let data = {
      payment_id: $scope.getPayment.id,
      status: "0",
      pickup_date: simpleDatepickup,
      pickup_time_from: $scope.localData.pickupTime.time_from,
      pickup_time_to: $scope.localData.pickupTime.time_to,
      pickup_price: $scope.localData.pickupTime.price,
      pickup_type: $scope.localData.pickupTime.type,
      drop_date: simpleDate,
      drop_time_from: $scope.localData.deliveryTime.time_from,
      drop_time_to: $scope.localData.deliveryTime.time_to,
      drop_price: $scope.localData.deliveryTime.price,
      drop_type: $scope.localData.deliveryTime.type,
      address_id: $scope.getAddress.addresses[0].id,
      same_day_pickup: $scope.localData.pickupDate.name == "Today" ? "1" : "0",
      next_day_drop:
        $scope.localData.deliveryDate.name == "next day" ? "1" : "0",
      comments: null,
      customer_id: getItemLocallyCustomer,
      pickup_at_door: $scope.localData.pickupTime.leaveAtdoor == "y" ? 1 : 0,
      drop_at_door: $scope.localData.deliveryTime.leaveAtdoor == "y" ? 1 : 0
    };

    for (let key in data) {
      if (!data[key]) {
        data[key] = "0";
      }
    }

    let req = {
      method: "POST",
      url: appInfo.url + "ordersapi/create",
      data: $httpParamSerializer(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    $scope.err = "";
    $scope.loading = true;
    $http(req)
      .then(function(res) {
        $scope.loading = false;
        var orderDetail = res.data;

        var apiUrl = "tasksapi/create";

        var taskData = {
          order_id: orderDetail.id,
          type: 1,
          at: new Date(),
          status: 0
        };

        CommonService.CallAjaxUsingPostRequest(apiUrl, taskData)
          .then(
            function(data) {
              alert("Order created successfully.");
              removeLoalStorageAndGoToDashboard();
              console.log(res);
            },
            function(error) {
              console.log("error");
              console.log(err);
            }
          )
          .finally(function() {
            $rootScope.showLoading = false;
          });
      })
      .catch(function(error) {
        $scope.loading = false;
        let err = error.data;
        console.log(error);
      });
  };
  /* Cancel Order */
  $scope.onCancelOrder = function() {
    var confirmation = confirm("Do you want to cancel order ?");
    if (confirmation) {
      removeLoalStorageAndGoToDashboard();
    }
  };

  // save onto local storage closed
  function getLocalStorageData() {
    var order = localStorage.getItem(getLocalStorageKeyOfOrder());

    let obj = {};
    if (order) {
      obj = JSON.parse(order);
      return obj;
    }
    return null;
  }

  function getObjectLength(obj) {
    if (!obj) return 0;
    return Object.keys(obj).length;
  }

  function removeLoalStorageAndGoToDashboard() {
    localStorage.removeItem(getLocalStorageKeyOfOrder());
    window.location.reload();
  }

  function saveLocalData(data) {
    localStorage.setItem(getLocalStorageKeyOfOrder(), data);
  }

  function getLocalStorageKeyOfOrder() {
    key = "Myorder_" + x;
    return key;
  }

  $scope.displayCityName = function(cityId) {
    var cityText = "N/A";
    if (cityId > 0) {
      var cityObj = $scope.cityData.find(function(city) {
        return city.id == cityId;
      });

      if (cityObj !== null) cityText = cityObj.title;
    }
    return cityText;
  };

  $scope.openModal = function(modal) {
    $("#" + modal).modal("open");
  };
});

// Load Controller of PaymentmethodfCtrl

app.controller("PaymentmethodCtrl", function($scope, $http, appInfo) {
  $scope.loading = false;
  $scope.paymentId;
  let x = localStorage.getItem("laundryUser");
  $scope.userdata = {};
  $scope.paymentDetails = [];
  getPayment();

  $scope.onDeltePayment = function(data, i) {
    let id = $scope.userdata.payments[i].id;
    let req = {
      method: "DELETE",
      url: appInfo.url + "paymentsapi/delete?id=" + id,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $scope.err = "";
    $scope.loading = true;
    $http(req)
      .then(function(res) {
        $scope.loading = false;
        console.log(res.data);
        getPayment();
        console.log("tyahsee");
      })
      .catch(function(error) {
        $scope.loading = false;
        let err = error.data;
        $scope.err = err[0].message;
        // console.log(error);
      });
  };

  function getPayment() {
    $http
      .get(appInfo.url + "customersapi/view/?id=" + x + "&expand=payments")
      .then(function(res) {
        // console.log(res.data.payments[0].id);
        // $scope.paymentId = res.data.payments[0].id;

        $scope.userdata.payments = res.data.payments;
        if ($scope.userdata.payments.length == 0) {
          $scope.paymentDetails = [];
        }
        for (let value of $scope.userdata.payments) {
          getVault(value.vault_id);
        }
        console.log("tahsss");
      })
      .catch(function(err) {
        console.log(err);
      });

    $scope.editPayment = function(e) {
      console.log(e);
    };
  }

  function getVault(id) {
    $scope.loading = true;
    $http
      .get(appInfo.url + "vaultapi/view/?id=" + id)
      .then(function(res) {
        $scope.loading = false;
        // console.log(res.data);
        $scope.paymentDetails.push(res.data);
      })
      .catch(function(err) {
        $scope.loading = false;
        console.log(err);
      });
  }
});

// Load Controller of FinaldateCtrl

app.controller("FinaldateCtrl", function($scope) {
  console.log("FinaldateCtrl");
});

// Load Controller of MyeditCtrl

app.controller("MyeditCtrl", function($scope, $routeParams) {
  $scope.message =
    "Clicked person name from home page should be dispalyed here";
  $scope.person = $routeParams.person;
  console.log($scope.person);

  $scope.persondata = [];

  $scope.myeditsave = function() {
    console.log($scope.persondata);
  };
});

app.controller("EditPaymentCtrl", function(
  $scope,
  $http,
  appInfo,
  $routeParams,
  $httpParamSerializer
) {
  $scope.paymentDetails = {};
  getVault();

  $scope.onEditSubmit = function() {
    let data = {
      name: $scope.paymentDetails.name,
      number: $scope.paymentDetails.number,
      cvcode: $scope.paymentDetails.cvcode,
      expiry_month: $scope.paymentDetails.expiry_month,
      expiry_year: $scope.paymentDetails.expiry_year
    };

    let req = {
      method: "PUT",
      url: appInfo.url + "vaultapi/update?id=" + $routeParams.id,
      data: $httpParamSerializer(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $scope.loading = true;
    $http(req)
      .then(function(res) {
        $scope.loading = false;
        console.log(res.data);
      })
      .catch(function(err) {
        $scope.loading = false;
        console.log(err);
      });
  };

  function getVault(id) {
    $scope.loading = true;
    $http
      .get(appInfo.url + "vaultapi/view/?id=" + $routeParams.id)
      .then(function(res) {
        $scope.loading = false;
        // console.log(res.data);
        $scope.paymentDetails = res.data;
      })
      .catch(function(err) {
        $scope.loading = false;
        console.log(err);
      });
  }
});

app.controller("AddressCtrl", function(
  $scope,
  $http,
  appInfo,
  $httpParamSerializer,
  $routeParams,
  $timeout
) {
  let x = localStorage.getItem("laundryUser");

  $scope.id = $routeParams.id > 0 ? $routeParams.id : -1;

  $scope.err;
  $scope.loading = false;
  $scope.addressData = {};
  $scope.cityData = [];
  getcity();

  if ($scope.id > 0) getOneAddress();

  $scope.onAddSubmit = function() {
    let data = {
      street_name: $scope.addressData.street_name,
      floor: $scope.addressData.floor,
      pobox: $scope.addressData.pobox,
      city_id: $scope.addressData.city_id,
      customer_id: x,
      unit_number: $scope.addressData.unit_number,
      as_default: "0"
    };

    var method = $scope.id > 0 ? "PUT" : "POST";
    var apiUrl =
      appInfo.url +
      ($scope.id > 0
        ? "addressesapi/update?id=" + $scope.id
        : "addressesapi/create");
    let req = {
      method: method,
      url: apiUrl,
      data: $httpParamSerializer(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $scope.err = "";
    $scope.loading = true;
    $http(req)
      .then(function(res) {
        $scope.loading = false;
        console.log(res.data);
        console.log("add");
      })
      .catch(function(error) {
        $scope.loading = false;
        let err = error.data;
        $scope.err = err[0].message;
        // console.log(error);
      });
  };

  function getOneAddress() {
    $scope.loading = true;
    $http
      .get(appInfo.url + "addressesapi/view?id=" + $routeParams.id)
      .then(function(res) {
        $scope.loading = false;
        console.log(res.data);
        console.log("0");

        $scope.addressData = res.data;
        $scope.addressData.city_id = res.data.city_id.toString();
      })
      .catch(function(err) {
        $scope.loading = false;
        console.log(err);
      });
  }

  function getcity() {
    $http
      .get(appInfo.url + "citiesapi")
      .then(function(res) {
        // console.log(res.data);
        $scope.cityData = res.data;
        $timeout(function() {
          $("select").formSelect();
        }, 100);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});

app.controller("AddPaymentCtrl", function(
  $scope,
  $http,
  appInfo,
  $httpParamSerializer
) {
  let userId = localStorage.getItem("laundryUser");
  $scope.paymentDetails = {};
  $scope.userId = userId;

  //todo:after every 20 milliseconds keep checking if the content of the iframe is
  //"completed" then rediect to mydetails page to the payments section

  // setInterval(function() {
  //alert($("#iframe2").contents().find("body").html());
  //}, 3000);

  //$('#submit').click();
  var doc = document.getElementById("iframe2").contentWindow.document;
  doc.open();
  doc.write(
    'Loading... \
	\
                <FORM ACTION="https://payment.architrade.com/paymentweb/start.action" METHOD="POST" CHARSET="UTF -8"> \
                  <INPUT TYPE="hidden" NAME="accepturl" VALUE="http://localhost/advanced/backend/web/vault/createvault"> \
                    <INPUT TYPE="hidden" NAME="cancelurl" VALUE="http://localhost/advanced/backend/web/vault/createvault"> \
                    <INPUT TYPE="hidden" NAME="callbackurl" VALUE=""> \
                  <INPUT TYPE="hidden" NAME="amount" VALUE="1"> \
                  <INPUT TYPE="hidden" NAME="currency" VALUE="578"> \
                  <INPUT TYPE="hidden" NAME="merchant" VALUE="90246240"> \
                  <INPUT TYPE="hidden"   NAME="orderid" id="orderid" VALUE="' +
      userId +
      '"> \
                  <INPUT TYPE="hidden" NAME="lang" VALUE="EN"> \
                  <INPUT TYPE="hidden" NAME="preauth" VALUE="1"> \
                  <INPUT TYPE="hidden" NAME="test" VALUE="1"> \
                  <INPUT TYPE="hidden" NAME="decorator" VALUE="responsive" /> \
                  <INPUT type="Submit" id="submit" name="submit" style="visibility:hidden"  value="TICKET DEMO"> \
                  </FORM> \
                  <script src="js/jquery-3.3.1.slim.min.js"></script> \
                  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> \
				  <script>$("#submit").click();</script>\
                  '
  );
  doc.close();

  $scope.onAddPayment = function() {
    let data = {
      name: $scope.paymentDetails.name,
      number: $scope.paymentDetails.number,
      cvcode: $scope.paymentDetails.cvcode,
      expiry_month: $scope.paymentDetails.expiry_month,
      expiry_year: $scope.paymentDetails.expiry_year
    };

    let req = {
      method: "POST",
      url: appInfo.url + "vaultapi/create",
      data: $httpParamSerializer(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $scope.err = "";
    $scope.loading = true;
    $http(req)
      .then(function(res) {
        $scope.loading = false;
        console.log(res.data);
        addPayment(res.data.id);
      })
      .catch(function(error) {
        $scope.loading = false;
        let err = error.data;
        $scope.err = err[0].message;
        // console.log(error);
      });
  };

  function addPayment(id) {
    let data = {
      customer_id: userId,
      vault_id: id
    };

    let req = {
      method: "POST",
      url: appInfo.url + "paymentsapi/create",
      data: $httpParamSerializer(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $scope.err = "";
    $scope.loading = true;
    $http(req)
      .then(function(res) {
        $scope.loading = false;
        console.log(res.data);
        $scope.paymentDetails = {};
      })
      .catch(function(error) {
        $scope.loading = false;
        let err = error.data;
        $scope.err = err[0].message;
        // console.log(error);
      });
  }
});
