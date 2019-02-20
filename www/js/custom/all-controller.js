// App Controller
app.controller("AppController", function(
  $scope,
  $rootScope,
  $location,
  $filter,
  $timeout,
  $translate,
  CommonService,
  LocalDataService
) {
  $rootScope.showLoading = false;

  $scope.changeLanguage = function(lang) {
    $rootScope.SelectedLang = lang;
    LocalDataService.storeLanguageLocal(lang);
    $translate.use(lang);
  };

  $rootScope.goTo = function(route) {
    $(".sidenav").sidenav("close");
    $location.path(route);
  };

  $scope.signout = function() {
    LocalDataService.removeUserDetailsLocal();
    $location.path("/login");
  };

  $rootScope.closemenu = function() {
    $location.path("/dashboard");
  };

  $scope.changeLanguage = function(lang) {
    $rootScope.SelectedLang = lang;
    LocalDataService.storeLanguageLocal(lang);
    $translate.use(lang);
  };

  $rootScope.loadAddPaymentMethodForm = function(userId) {
    var formHtml = CommonService.GenerateAddPaymentForm(userId);

    $(".paymentIframeContainer").html("");
    $(".paymentIframeContainer:visible").html(
      '<iframe id="paymentIframe" name="paymentIframe" width="100%" height="650px"></iframe>'
    );
    var doc = document.getElementById("paymentIframe").contentWindow.document;
    doc.open();
    doc.write('<h3 class="text-center"><div class="loader-container"><div class="loader"></div></div></h3><link rel="stylesheet" href="'+ websiteUrl + 'wp-content/themes/eazywash/css/custom.css" />' + formHtml);
    doc.close();
  };

  $rootScope.showModal = function(modalId) {
    debugger;
    $(modalId).modal("open");
  };

  $rootScope.closeModal = function(modalId) {
    $('.modal-overlay').click();
    //$(modalId).closeModal();
    //$(modalId + ' .modal-close').trigger('click');
    //$(modalId).closeModal();
    // $timeout(function() {
    //   if ($(".modal:visible").length > 0) {
    //     $("body").addClass("modal-open");
    //   }
    // }, 500);
  };

  $rootScope.displayCardName = function(type) {
    var cardNameText = type;
    if ($rootScope.CardTypes[type]) {
      cardNameText = $rootScope.CardTypes[type];
    }
    return cardNameText;
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

  $rootScope.addressDetailsValidationOptions = {
    rules: {
      street_name: {
        required: true
      },
      floor: {
        required: true
      },
      pobox: {
        required: true
      },
      unit_number: {
        required: true
      },
      city: {
        required: true
      }
    },
    messages: {
      street_name: {
        required: function() {
          return $filter("translate")("validation_message_street_required");
        }
      },
      floor: {
        required: function() {
          return $filter("translate")("validation_message_floor_required");
        }
      },
      pobox: {
        required: function() {
          return $filter("translate")("validation_message_pobox_required");
        }
      },
      city: {
        required: function() {
          return $filter("translate")("validation_message_city_required");
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
  CommonService,
  LocalDataService
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
              LocalDataService.storeUserDetailsLocal(data, $scope.checked);
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
  $location,
  LocalDataService
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
            LocalDataService.storeUserDetailsLocal(data, $scope.checked);
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
  $rootScope,
  $filter,
  CommonService,
) {

  let userId = $rootScope.customer_id;

  $scope.userdata = {};
  $scope.addresses = [];
  $scope.vaults = [];
  $scope.asteriskPassword = "";

  getUserDetails();


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

  function getUserDetails() {
    $rootScope.showLoading = true;
    
    let partialUrl = "customersapi/view/?id=" + userId + "&expand=addresses,vault";
    
    CommonService.CallAjaxUsingGetRequest(partialUrl)
      .then(
        function(response) {
          $scope.userdata = response;

          if(response.addresses && response.addresses.length > 0) 
            $scope.addresses = response.addresses;
          
          if(response.vault && response.vault.length > 0) 
            $scope.vaults = response.vault;
            
          getPassword();
        },
        function(error) {

        }
      )
      .finally(function() {
        $rootScope.showLoading = false;
      });
  }

  
  function getPassword() {
    let p = $scope.userdata.password.split("").map(() => {
      return "*";
    });
    $scope.asteriskPassword = p.join("");
  }
  
  $scope.onSavePersonDetail = function() {
    let data = {
      full_name: $scope.userdata.full_name,
      email: $scope.userdata.email,
      password: $scope.userdata.password,
      phone: $scope.userdata.phone
    };

    $rootScope.showLoading = true;
    const partialUrl = "customersapi/update/?id=" + userId;
    CommonService.CallAjaxRequest(partialUrl, data, 'PUT').then(
      function(res) {
          console.log(res);
          $scope.userdata.password = res.password;
          getPassword();

          CommonService.toast($filter("translate")("message_user_info_updated"));
      },
      function(error) {
        console.log(error);
      }
    )
    .finally(function() {
      $rootScope.showLoading = false;          
    });
  };

  $scope.setDefaultAddress = function(addressDetail) {
    $rootScope.showLoading = true;
    let partialUrl = 'addressesapi/setdefault?id='+ addressDetail.id;

    CommonService.CallAjaxUsingPostRequest(partialUrl, { customer_id: x})
      .then(
        function(data) {
          if (data.Success == true) {
            $scope.userdata.addresses.map(function(address) {
              if (address.id == addressDetail.id) {
                return (address.as_default = 1);
              } else {
                return (address.as_default = 0);
              }
            });
          }

          CommonService.toast(data.Message);
        },
        function(error) {}
      )
      .finally(function() {
        $rootScope.showLoading = false;
      });
  };

  $scope.deleteVault = function(vaultDetail, index) {
    if (vaultDetail && vaultDetail !== null) {
      var cardName = $rootScope.CardTypes[vaultDetail.payment_type]
        ? $rootScope.CardTypes[vaultDetail.payment_type]
        : vaultDetail.payment_type;
      
      var confirmation = confirm(
        $filter("translate")("deletion_confirmation") +
          cardName +
          " " +
          $filter("translate")("vault_details.ends_with") +
          " " +
          vaultDetail.number +
          "?"
      );

      if (confirmation) {
        $rootScope.showLoading = true;
        const partialUrl = 'vaultapi/delete?id='+ vaultDetail.id;

        CommonService.CallAjaxRequest(partialUrl, {}, 'DELETE')
          .then(
            function(data) {
                debugger;
                $scope.vaults.splice(index, 1);

                CommonService.toast($filter("translate")("message_vault_delete"))
            },
            function(error) {}
          )
          .finally(function() {
            $rootScope.showLoading = false;
          });
      }
    }
  };

  $scope.deleteAddress = function(addressDetail, index) {
    if (addressDetail && addressDetail !== null) {
      var confirmation = confirm(
        $filter("translate")("address_deletion_confirmation")
      );
      if (confirmation) {
        $rootScope.showLoading = true;

        let partialUrl = 'addressesapi/delete?id='+ addressDetail.id;

        CommonService.CallAjaxRequest(partialUrl, {}, 'DELETE')
          .then(
            function(data) {
              $scope.addresses.splice(index, 1);

              CommonService.toast($filter("translate")("message_address_delete"))
            },
            function(error) {}
          )
          .finally(function() {
            $rootScope.showLoading = false;
          });
      }
    }
  };

  $scope.setDefaultVault = function(vaultDetail) {
    $rootScope.showLoading = true;

    let partialUrl = 'vaultapi/setdefault?id=' + vaultDetail.id;

    CommonService.CallAjaxUsingPostRequest(partialUrl, { customer_id: userId })
      .then(
        function(data) {
          $scope.loading = false;

          if (data.Success == true) {
            $scope.vaults.map(function(vault) {
              if (vault.id == vaultDetail.id) {
                return (vault.as_default = 1);
              } else {
                return (vault.as_default = 0);
              }
            });
          } 

          CommonService.toast(data.Message);
        },
        function(error) {}
      )
      .finally(function() {
        $rootScope.showLoading = false;
      });
  };

});

app.controller("DeliverydateCtrl", function($scope) {
  // body...
});

// Load Controller of OrdersummaryCtrl

app.controller("OrdersummaryCtrl", function(
  $scope,
  $rootScope,
  $filter,
  $timeout,
  WizardHandler,
  CommonService,
  LocalDataService
) {

  $scope.showLoading = true;
  $scope.loading = false;
  
  let userId = $rootScope.customer_id;
  $scope.isUserLoggedIn = userId > 0 ? true: false;

  $scope.set_order_system = "FULL"; // 'full' or 'quick'

  $scope.orderCreationDone = false;
  $scope.orderSummary = null;

  $scope.lastStepNumber = $scope.isUserLoggedIn ? 5 : 8;

  $scope.showAddressDetailStep = false;
  $scope.showPaymentDetailStep = false;

  $scope.cityData = [];
  $scope.AllAddresses = [];
  $scope.AllPayments = [];
  $scope.optionsData = null;

  $scope.TimeSlots = [];
  $scope.pickupDateList = [];
  $scope.deliveryDateList = [];

  $scope.getAddress = null;
  $scope.getPayment = null;

  $scope.orderSummary = null;
  $scope.orderCreationDone = false;

  $scope.Wizard = null;
  $scope.stepValidation = true;

  var defaultCityId = -1;
  
  $scope.Steps = {
    partial_user_detail: "PartialUserDetail",
    pickup_date: "PickupDate",
    pickup_time: "PickupTime",
    drop_date: "DropDate",
    drop_time: "DropTime",
    user_detail: "UserDetail",
    address_detail: "AddressDetail",
    payment_detail: "PaymentDetail",
    order_summary: "OrderSummary"
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

  loadDefaults();

  function loadDefaults() {
    $scope.err = false;
    $scope.errorMessage = null;
  
    $scope.userErr = false;
    $scope.userErrorMessage = null;
  
    $scope.addressErr = false;
    $scope.addressErrorMessage = null;
  
    $scope.paymentErr = false;
    $scope.paymentErrorMessage = null;

    $scope.showAlldeliveryDateList = false;  
    $scope.showAllpickupDateList = false;

    //  localstorage keys
    $scope.localData = {
      pickupDate: {},
      pickupTime: {},
      deliveryDate: {},
      deliveryTime: {},
      userDetails: {},
      addressDetails: {},
      paymentDetails: {}
    };

    $scope.userDetails =  {
      id: null,
      full_name: null,
      email: null,
      password: null,
      phone: null
    };

    $scope.addressDetails = {
      id: null,
      street_name: null,
      floor: null,
      pobox: null,
      unit_number: null,
      city_id: defaultCityId != -1? String(defaultCityId): null,
      as_default: null
    };
  }

  initializeOrderCreation();

  function initializeOrderCreation() {

    if (getLocalStorageData()) {
      $scope.localData = getLocalStorageData();
    }


    /* Load User details */
    var apiUserUrl = "customersapi/view/?id=" + userId + "&expand=addresses,vault";
    CommonService.CallAjaxUsingGetRequest(apiUserUrl)
      .then(
        function(response) {
          if ($scope.isUserLoggedIn == true) {
            if (response.addresses && response.addresses.length > 0) {
              extractDefaultAddress(response.addresses);
            } else {
              $scope.showAddressDetailStep = true;
              $scope.lastStepNumber += 1;
            }

            if (response.vault && response.vault.length > 0) {
              extractDefaultVault(response.vault);
            } else {
              $scope.showPaymentDetailStep = true;
              $scope.lastStepNumber += 1;
            }
          } else {
            if (response.addresses && response.addresses.length > 0) {
              $scope.AllAddresses = response.addresses;
            }

            if (response.vault && response.vault.length > 0) {
              $scope.AllPayments = response.vault;
            }
          }
        },
        function(error) {
          console.log("error");
          console.log(error);
        }
      )
      .finally(function() {
        $scope.showLoading = false;
      });

    /* Load Options details */
    CommonService.CallAjaxUsingGetRequest("optionsapi")
      .then(
        function(data) {
          if (data && data.length > 0) {
            $scope.optionsData = data[0];
            functionForPickupDate();
          }
        },
        function(error) {
          console.log("error");
          console.log(err);
        }
      )
      .finally(function() {
        
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

    $scope.Wizard = WizardHandler.wizard("requestPickupWizard");

    if (getLocalStorageData()) {
      //$rootScope.showModal("#requestPickupModal");

      if (!$scope.isUserLoggedIn) {
        $scope.getAddress = $scope.localData.addressDetails;
        $scope.getPayment = $scope.localData.paymentDetails;
      }

      var goToStep = 0;

      if (
        !$scope.isUserLoggedIn &&
        getObjectLength($scope.localData.paymentDetails) != 0
      ) {
        goToStep = 7;
      } else if (
        !$scope.isUserLoggedIn &&
        $scope.localData.addressDetails.street_name != null
      ) {
        goToStep = 6;
      } else if (
        !$scope.isUserLoggedIn &&
        $scope.localData.userDetails.email != null
      ) {
        goToStep = 5;
      } else if (getObjectLength($scope.localData.deliveryTime) != 0) {
        goToStep = 4;
      } else if (getObjectLength($scope.localData.deliveryDate) != 0) {
        goToStep = 3;
      } else if (getObjectLength($scope.localData.pickupTime) != 0) {
        goToStep = 2;
      } else if (getObjectLength($scope.localData.pickupDate) != 0) {
        goToStep = 1;
      } else if(getObjectLength($scope.localData.userDetails) != 0 &&
        $scope.localData.userDetails.id > 0){
        goToStep = 0;
      }

      if(!$scope.isUserLoggedIn)
        goToStep += 1;

      $scope.goToStep(goToStep);
    }
  };

  $scope.validateStep = function() {
    if ($scope.stepValidation == true) {
      var step = $scope.Wizard.currentStep();
      var stepTitle = step.wzHeadingTitle;

      return validationByStepTitle(stepTitle);
    }
    return true;
  };

  $scope.noValidation = function() {
    $scope.stepValidation = false;
  };

  $scope.checkValidation = function() {
    $scope.stepValidation = true;
  };

  $scope.$on("wizard:stepChanged", function(event, args) {
    var stepTitle = args.step.wzHeadingTitle;

    console.log(stepTitle);

    switch (stepTitle) {
      case $scope.Steps.pickup_date:
        //$scope.showAllpickupDateList = false;
        
      break;

      case $scope.Steps.pickup_time:
        console.log("second");
      break;

      case $scope.Steps.drop_date:
        //$scope.showAlldeliveryDateList = false;
        functionForDropDate();
      break;

      case $scope.Steps.partial_user_detail:
        if(getObjectLength($scope.localData.userDetails) != 0) {
          $scope.userDetails = angular.copy($scope.localData.userDetails);
        }
        

        if(getObjectLength($scope.localData.addressDetails) != 0) {
          $scope.addressDetails = angular.copy($scope.localData.addressDetails);
        }
      break;

      case $scope.Steps.user_detail:
        if(!$scope.isUserLoggedIn && getObjectLength($scope.localData.userDetails) != 0)
          $scope.userDetails = angular.copy($scope.localData.userDetails);
          break;

      case $scope.Steps.address_detail:
        if(!$scope.isUserLoggedIn && getObjectLength($scope.localData.addressDetails) != 0)
          $scope.addressDetails = angular.copy($scope.localData.addressDetails);
          break;

      case $scope.Steps.payment_detail:
        $timeout(function() {
          functionForPaymentDetail();
        }, 1000);
        break;
    }
  });

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

    let name = "";
    let price = "";
    let label = "";
    let subname = "";

    for (var i = 0; i < 16 + length; i++) {
      name = "";
      price = "";
      label = "";
      subname = "";

      date = new Date();
      let d = new Date(date.setDate(date.getDate() + i));
      if (d.getDate() == new Date().getDate()) {
        // if  day is tomorrow
        name = "Today";
        price = $scope.optionsData.same_day_pickup_price;
        subname = days[d.getDay()];
      } else if (d.getDate() == new Date().addDays(1).getDate()) {
        // if day is day after
        name = "Tomorrow";
        subname = days[d.getDay()];
      } else if (d.getDate() == new Date().addDays(2).getDate()) {
        // if day is day after
        name = "Day After Tomorrow";
        subname = days[d.getDay()];
      } else {
        name = days[d.getDay()];
      }

      label = ordinal_suffix_of(d.getDate()) + " " + months[d.getMonth()];

      array.push({
        date: d,
        name: name,
        subname: subname,
        price: price,
        shortDate: label
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

    let name = "";
    let price = "";
    let label = "";
    let subname = "";

    for (var i = 0; i < 16 + length; i++) {
      name = "";
      price = "";
      label = "";
      subname = "";
      let d = new Date(date.setDate(date.getDate() + 1));
      if (d.getDate() == new Date().addDays(1).getDate()) {
        // if day is day after
        name = "Tomorrow";
        price = $scope.optionsData.next_day_delivery_price;
        subname = days[d.getDay()];

      } else if (d.getDate() == pickupD.addDays(1).getDate()) {
        // if  day is tomorrow
        // name = 'day after';
        name = "Next day delievery";
        price = $scope.optionsData.next_day_delivery_price;
        subname = days[d.getDay()];

      } else {
        name = days[d.getDay()];
      }

      label = ordinal_suffix_of(d.getDate()) + " " + months[d.getMonth()];

      array.push({
        date: d,
        name: name,
        subname: subname,        
        price: price,
        shortDate: label
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

  // wizard sixth start
  function functionForPaymentDetail() {
    $rootScope.loadAddPaymentMethodForm(
      !$scope.isUserLoggedIn ? $scope.localData.userDetails.id : userId
    );
  }
  // wizard sixth closed

  // Wizard last step
  $scope.goToStep = function(stepNumber) {
    if ($scope.Wizard) {
      $scope.Wizard.goTo(stepNumber);
    }
  };

  // End Wizard last step

  /* Common Functions */

  function ordinal_suffix_of(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  function checkNoServiceCity(city_id) {
    var city = $scope.cityData.find(x => x.id == city_id);
    if(city && $filter('lowercase')(city.title) != $filter('lowercase')($rootScope.serviceOfferedToCity)) {
      $rootScope.showModal("#noServiceModal");
      return true;
    }
    return false;
  }

  function validationByStepTitle(stepTitle) {
    if (
      stepTitle == $scope.Steps.partial_user_detail &&
      jQuery("#" + stepTitle).valid() == false
    ) {
      return false;
    } else if (
      stepTitle == $scope.Steps.pickup_date &&
      getObjectLength($scope.localData.pickupDate) == 0
    ) {
      return false;
    } else if (
      stepTitle == $scope.Steps.pickup_time &&
      getObjectLength($scope.localData.pickupTime) == 0
    ) {
      return false;
    } else if (
      stepTitle == $scope.Steps.drop_date &&
      getObjectLength($scope.localData.deliveryDate) == 0
    ) {
      return false;
    } else if (
      stepTitle == $scope.Steps.drop_time &&
      getObjectLength($scope.localData.deliveryTime) == 0
    ) {
      return false;
    } else if (
      stepTitle == $scope.Steps.user_detail &&
      jQuery("#" + stepTitle).valid() == false
    ) {
      return false;
    } else if (
      stepTitle == $scope.Steps.address_detail &&
      jQuery("#" + stepTitle).valid() == false
    ) {
      return false;
    } else if (
      stepTitle == $scope.Steps.payment_detail &&
      (!$scope.isUserLoggedIn && getObjectLength($scope.localData.paymentDetails) == 0)
    ) {
      return false;
    }

    return true;
  }

  function getUserPaymentDetails() {
    const partialUrl = 'customersapi/view/?id=' + userId + '&expand=vault';

    $scope.paymentErr = false;

    CommonService.CallAjaxUsingGetRequest(partialUrl)
      .then(
        function(data) {
            if (data && data.vault && data.vault.length > 0) {
              extractDefaultVault(data.vault);

              if (!$scope.isUserLoggedIn) {
                $scope.localData.paymentDetails = $scope.getPayment;

                // Save local storage
                LocalDataService.saveOrderData($scope.localData);
              } 

              if (jQuery("#vaultAddModal").is(":visible"))
                  $rootScope.closeModal("#vaultAddModal");
                else 
                  $scope.Wizard.next();
          }
        },
        function(error) {
          console.log(error);
          $scope.paymentErr = true;
              $scope.paymentErrorMessage =
                "Please add payment before proceeding";
        }
      )
      .finally(function() {
        $scope.loading = false;
      });
  }

  function saveUserDetails(partialInfo) {
    if (partialInfo && !validationByStepTitle($scope.Steps.partial_user_detail))
      return;
    else if (!validationByStepTitle($scope.Steps.user_detail)) return;

    $scope.loading = true;
    
    var userData = $scope.userDetails;
    var addressData = $scope.addressDetails;

    var request_data = {};
    if (partialInfo) {
      request_data = {
        id: userData.id,
        full_name: userData.full_name,
        phone: userData.phone,
        sex: "1",
        address_id: addressData.id,
        city_id: addressData.city_id,
        action: "ajax_call",
        sub_action: "save_user_info"
      };
    } else {
      request_data = {
        id: userData.id,
        full_name: userData.full_name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        sex: "1",
        action: "ajax_call",
        sub_action: "register"
      };
    }

    $scope.userErr = false;
    $scope.loading = true;

    CommonService.CallAjaxUsingPostRequest(ajaxUrl, request_data)
      .then(
        function(data) {
          if (data.Success == true) {
            var result = data.data;

            if (!$scope.isUserLoggedIn) {
              if (partialInfo) {
                $scope.userDetails.id = result.id;
                $scope.addressDetails.id = result.address_id;

                var check = checkNoServiceCity(request_data.city_id);
                if(check == true) {
                  return false;
                }

                if($scope.set_order_system == "QUICK") {
                  $scope.localData.userDetails.id = angular.copy($scope.userDetails.id);
                } else {
                  $scope.localData.userDetails = angular.copy($scope.userDetails);
                }

                $scope.localData.addressDetails = angular.copy($scope.addressDetails);
                $scope.getAddress = angular.copy($scope.localData.addressDetails);
              } else {
                $scope.localData.userDetails = angular.copy($scope.userDetails);
              }

              // Save local storage
              LocalDataService.saveOrderData($scope.localData);
            }
            $scope.Wizard.next();
          } else {
            $scope.userErr = true;
            $scope.userErrorMessage = data.Message;
          }
        },
        function(error) {}
      )
      .finally(function() {
        $scope.loading = false;
      });
  }

  function saveAddressDetails(nextAllowed) {
    if (nextAllowed && !validationByStepTitle($scope.Steps.address_detail))
      return;
    else if (
      !nextAllowed &&
      !jQuery("#partial_" + $scope.Steps.address_detail).valid()
    )
      return;

    var addressData = $scope.addressDetails;

    var check = checkNoServiceCity(addressData.city_id);
    if(check == true) {
      return false;
    }

    var request_data = {
      id: addressData.id,
      customer_id: !$scope.isUserLoggedIn
        ? $scope.localData.userDetails.id
        : $rootScope.customer_id,
      street_name: addressData.street_name,
      floor: addressData.floor,
      pobox: addressData.pobox,
      city_id: defaultCityId,
      unit_number: addressData.unit_number,
      as_default: "1",
    };

    $scope.loading = true;
    $scope.addressErr = false;

    let partialUrl = '';
    let method = '';
        
    if(request_data.id > 0) {
      partialUrl = 'addressesapi/update/?id=' + userId;
      method = 'PUT';
    } else {
      partialUrl = 'addressesapi/create';
      method = 'POST';
    }
    
    CommonService.CallAjaxRequest(partialUrl, request_data, method)
      .then(
        function(result) {
          $scope.addressDetails = result;

          if(addressData.id > 0) {
            var addressIndex = $scope.AllAddresses.findIndex(userId=>x.id == addressData.id);
            if(addressIndex > -1) {
              $scope.AllAddresses[addressIndex] = result;
            } else {
              $scope.AllAddresses.push(result);
            }
          } else {
            $scope.AllAddresses.push(result);
          }

          $scope.getAddress = result;

          if (!$scope.isUserLoggedIn) {
            // Save local storage
            $scope.localData.addressDetails = result;
            LocalDataService.saveOrderData($scope.localData);
          }

          if (nextAllowed) {
            if(!$scope.isUserLoggedIn)
              $scope.createOrder(true);
            else
              $scope.Wizard.next();

          } else { 
            $scope.changeAddress(result);
          }
        },
        function(error) {
          debugger;
          if(error && error.length > 0) {
            $scope.addressErr = true;
            $scope.addressErrorMessage = error[0].message;
          }
        }
      )
      .finally(function() {
        $scope.loading = false;
      });
  }

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

  $scope.changeVault = function(vaultDetail) {
    if (vaultDetail.as_default == 1) {
      $scope.getPayment = vaultDetail;

      if (!$scope.isUserLoggedIn) {
        $scope.localData.paymentDetails = vaultDetail;

        LocalDataService.saveOrderData($scope.localData);
      }

      $rootScope.closeModal("#vaultChangeModal");
    } else {
      $scope.loading = true;

      const partialUrl = 'vaultapi/setdefault/?id=' + vaultDetail.id;

      CommonService.CallAjaxUsingPostRequest(partialUrl, {customer_id: $rootScope.customer_id})
        .then(
          function(data) {
            if (data.Success == true) {
              $scope.AllPayments.map(function(vault) {
                if (vault.id == vaultDetail.id) {
                  return (vault.as_default = 1);
                } else {
                  return (vault.as_default = 0);
                }
              });

              vaultDetail.as_default = "1";
              $scope.getPayment = vaultDetail;

              if (!$scope.isUserLoggedIn) {
                $scope.localData.paymentDetails = vaultDetail;
                LocalDataService.saveOrderData($scope.localData);
              }

              $rootScope.closeModal("#vaultAddModal");
              $rootScope.closeModal("#vaultChangeModal");
            }
          },
          function(error) {}
        )
        .finally(function() {
          $scope.loading = false;
        });
    }
  };

  $scope.reloadPaymentWindow = function() {
    var confirmation = confirm('Are you sure you want to reload the payment window? Otherwise Click Save card information for later use.');
    
    if(confirmation) {
      functionForPaymentDetail();
    }
  }

  $scope.changeAddress = function(address) {
    $scope.loading = true;
    
    const partialUrl = 'addressesapi/setdefault/?id=' + address.id;

    CommonService.CallAjaxUsingPostRequest(partialUrl, {customer_id: $rootScope.customer_id})
      .then(
        function(data) {
          if (data.Success == true) {
            $scope.AllAddresses.map(function(x) {
              if (x.id == address.id) {
                return (x.as_default = 1);
              } else {
                return (x.as_default = 0);
              }
            });

            address.as_default = "1";
            $scope.getAddress = address;

            if (!$scope.isUserLoggedIn) {
              $scope.localData.addressDetails = address;
              LocalDataService.saveOrderData($scope.localData);
            }

            $rootScope.closeModal("#addressAddModal");
            $rootScope.closeModal("#addressChangeModal");
          }
        },
        function(error) {}
      )
      .finally(function() {
        $scope.loading = false;
      });
  };

  $scope.openAddAddressModal = function() {
    $scope.addressDetails = {
      id: null,
      street_name: null,
      floor: null,
      pobox: null,
      unit_number: null,
      city_id: String(defaultCityId)
    };
    $rootScope.closeModal("#addressChangeModal");

    $rootScope.showModal("#addressAddModal");
  };

  $scope.openAddVaultModal = function() {
    debugger;
    $scope.localData.paymentDetails = {};
    $rootScope.closeModal("#vaultChangeModal");

    $timeout(function() {
      $rootScope.showModal("#vaultAddModal");
    }, 300);

    $timeout(function() {
      functionForPaymentDetail();
    }, 1000);
  };

  /* Perform Action contains multiple actions */
  $scope.performAction = function(action, value) {
    switch (action) {
      case "SAVE_USER_PARTIAL_INFORMATION":
        saveUserDetails(true);
        return false;
      break;

      case "SAVE_PICKUP_DATE":
          $scope.localData.pickupDate = value;
          $scope.Wizard.next();
        break;

      case "SELECT_PICKUP_TIME":
        $scope.localData.pickupTime = value;
        if(!$scope.isUserLoggedIn && $scope.set_order_system == 'QUICK') {
          $scope.createOrder();
          return false;
        }
        break;

      case "SELECT_PICKUP_AT_DOOR":
        $scope.localData.pickupTime = {};
        $scope.localData.pickupTime.leaveAtdoor = "y";
        if(!$scope.isUserLoggedIn && $scope.set_order_system == 'QUICK') {
          $scope.createOrder();
          return false;
        }
        break;

      case "SAVE_DELIVERY_DATE":
        $scope.localData.deliveryDate = value;
        break;

      case "SELECT_DELIVERY_TIME":
        $scope.localData.deliveryTime = value;
        break;

      case "SELECT_DELIVERY_AT_DOOR":
        $scope.localData.deliveryTime = {};
        $scope.localData.deliveryTime.leaveAtdoor = "y";
        break;

      case "SAVE_USER_DETAILS":
        saveUserDetails(false);
        return false;
        break;

      case "SAVE_ADDRESS_DETAILS":
        saveAddressDetails(value);
        return false;
        break;

      case "GET_PAYMENT_DETAILS":
        getUserPaymentDetails();
        return false;
        break;
    }

    LocalDataService.saveOrderData($scope.localData);

    // Check Validation
    $scope.checkValidation();
  };

  /* Create Order */
  $scope.createOrder = function(asIncomplete) {
    $scope.err = false;

    var request_data = {};

    if ($scope.isUserLoggedIn == true || $scope.set_order_system == "FULL") {
      if (!$scope.getAddress) {
        $scope.err = true;
        $scope.errorMessage = "Please add address details";
        return;
      }

      if (!asIncomplete && !$scope.getPayment) {
        $scope.err = true;
        $scope.errorMessage = "Please add payment details";
        return;
      }

      var confuseDate = $scope.localData.deliveryDate.date;
      var simpleDate = new Date(confuseDate).toISOString().substr(0, 10);

      request_data = {
        vault_id: $scope.getPayment?$scope.getPayment.id: null,
        drop_date: simpleDate,
        drop_time_from: $scope.localData.deliveryTime.time_from,
        drop_time_to: $scope.localData.deliveryTime.time_to,
        drop_price: $scope.localData.deliveryTime.price,
        drop_type: $scope.localData.deliveryTime.type,
        next_day_drop:
          $scope.localData.deliveryDate.name == "next day deliever" ? 1 : 0,
        drop_at_door: $scope.localData.deliveryTime.leaveAtdoor == "y" ? 1 : 0
      };
    }

    var confuseDatepickup = $scope.localData.pickupDate.date;
    var simpleDatepickup = new Date(confuseDatepickup)
      .toISOString()
      .substr(0, 10);


    request_data["pickup_date"] = simpleDatepickup;
    request_data["status"] = "0";
    request_data["pickup_time_from"] = $scope.localData.pickupTime.time_from;
    request_data["pickup_time_to"] = $scope.localData.pickupTime.time_to;
    request_data["pickup_price"] = $scope.localData.pickupTime.price;
    request_data["pickup_type"] = $scope.localData.pickupTime.type;
    request_data["address_id"] = $scope.getAddress.id;
    
    request_data["same_day_pickup"] =
      $scope.localData.pickupDate.name == "Today" ? "1" : "0";
    request_data["comments"] = null;
    request_data["customer_id"] = !$scope.isUserLoggedIn
      ? $scope.localData.userDetails.id
      : $rootScope.customer_id;
    request_data["pickup_at_door"] =
      $scope.localData.pickupTime.leaveAtdoor == "y" ? 1 : 0;

    if(asIncomplete)
      request_data["is_completed"] = false;
    else
      request_data["is_completed"] = true;


    var orderId = LocalDataService.getIncompleteOrderId();
    if(orderId)
      request_data["id"] = orderId;


    for (let key in request_data) {
      if (!request_data[key]) {
        request_data[key] = "0";
      }
    }

    $scope.showLoading = true;

    CommonService.CallAjaxUsingPostRequest('ordersapi/createorder', request_data)
      .then(
        function(data) {
          if (data.Success == true) {
            if(asIncomplete) {
              var result = data.data;

              LocalDataService.saveIncompleteOrderId(result.data.id);
              $scope.Wizard.next();
            } else {
              $scope.orderCreationDone = true;
              $scope.orderSummary = $scope.localData;

              removeLoalStorageAndGoToDashboard();
            }
          } else {
            $scope.err = true;
            $scope.errorMessage = data.Message;
          }
        },
        function(error) {
          console.log("error");
          console.log(err);
        }
      )
      .finally(function() {
        $scope.showLoading = false;
      });
  };

  /* Cancel Order */
  $scope.onCancelOrder = function() {
    if (getObjectLength($scope.localData.pickupDate) > 0 || getObjectLength($scope.localData.userDetails) > 0) {
      var confirmation = confirm(
        $filter("translate")("request_pickup_order_cancel_confirmation")
      );

      if (confirmation) {
        removeLoalStorageAndGoToDashboard();
        $scope.Wizard.reset();
      } else {
        return false;
      }
    } 
    $rootScope.goTo("/dashboard");
  };


  $scope.closeOrder = function() {
    $scope.orderCreationDone = false;
    $scope.orderSummary = null;
    $rootScope.goTo('/dashboard');
  }

  // save onto local storage closed
  function getLocalStorageData() {
    return LocalDataService.getOrderData(); //localStorage.getItem(getLocalStorageKeyOfOrder());

    // let obj = {};
    // if (order) {
    //   obj = JSON.parse(order);
    //   return obj;
    // }
    // return null;
  }

  function getObjectLength(obj) {
    if (!obj) return 0;
    return Object.keys(obj).length;
  }

  function removeLoalStorageAndGoToDashboard() {
    LocalDataService.removeOrderData();
    $scope.noValidation();
    loadDefaults();
    //window.location.reload();
  }

  // function saveLocalData(data) {
  //   LocalDataService.saveOrderData(data);
  // }

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

});

// Load Controller of PaymentmethodfCtrl

app.controller("PaymentmethodCtrl", function($scope, $http) {
  $scope.loading = false;
  $scope.paymentId;
  const userId = $rootScope.customer_id;
  $scope.userdata = {};
  $scope.paymentDetails = [];
  getPayment();

  $scope.onDeltePayment = function(data, i) {
    let id = $scope.userdata.payments[i].id;
    let req = {
      method: "DELETE",
      url: baseUrl + "paymentsapi/delete?id=" + id,
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
      .get(baseUrl + "customersapi/view/?id=" + userId + "&expand=payments")
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
      .get(baseUrl + "vaultapi/view/?id=" + id)
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
      url: baseUrl + "vaultapi/update?id=" + $routeParams.id,
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
      .get(baseUrl + "vaultapi/view/?id=" + $routeParams.id)
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
  $rootScope,
  CommonService,
  $routeParams,
  $timeout,
  $filter
) {
  const userId = $rootScope.customer_id;

  $scope.id = $routeParams.id > 0 ? $routeParams.id : -1;

  $scope.addressData = {
    street_name: $scope.null,
    floor: null,
    pobox: null,
    city_id: null,
    customer_id: userId,
    unit_number: null,
    as_default: "0"
  };

  $scope.cityData = [];
  debugger;
  getcity();

  if ($scope.id > 0) getOneAddress();

  
  $scope.saveAddressDetails = function(form) {
    if(form.validate()) {
      var check = checkNoServiceCity($scope.addressData.city_id);
      if(check == true) {
        return false;
      }
      
      $rootScope.showLoading = true;

      var method = $scope.id > 0 ? "PUT" : "POST";

      var apiUrl = $scope.id > 0
          ? "addressesapi/update?id=" + $scope.id
          : "addressesapi/create";

      CommonService.CallAjaxRequest(apiUrl, $scope.addressData, method)
        .then(
          function(response) {
            debugger;
            var message = "";
            if ($scope.id > 0) {
              message = $filter("translate")("message_address_updated");
            } else {
              message = $filter("translate")("message_address_added");
              $rootScope.goTo('/mydetails');
            }

            CommonService.toast(message);
          },
          function(error) {
          }
        )
        .finally(function() {
          $rootScope.showLoading  = false;
        });
      }
    };

  function getOneAddress() {
    $rootScope.showLoading  = true;

    CommonService.CallAjaxUsingGetRequest("addressesapi/view?id=" + $scope.id)
      .then(
        function(res) {
          $scope.addressData = res;
          $scope.addressData.city_id = String($scope.addressData.city_id);
        },
        function(error) {
          $rootScope.messageObj = {
            class: "msg msg-error",
            message: error.Message
          };
        }
      )
      .finally(function() {
        $rootScope.showLoading  = false;

        $timeout(function() {
          $rootScope.messageObj = null;
        }, 5000);
      });
  }

  function getcity() {
    CommonService.CallAjaxUsingGetRequest("citiesapi")
      .then(
        function(res) {
          debugger;
          $scope.cityData = res;

          var city = res.find(x => $filter('lowercase')(x.title) == $filter('lowercase')($rootScope.serviceOfferedToCity));

          if(city)
            $scope.addressData.city_id = String(city.id);
          // $timeout(function() {
          //   $("select").formSelect();
          // }, 100);
        },
        function(error) {
          console.log(error);
        }
      )
      .finally(function() {

      });
  }

  function checkNoServiceCity(city_id) {
    var city = $scope.cityData.find(x => x.id == city_id);
    if(city && $filter('lowercase')(city.title) != $filter('lowercase')($rootScope.serviceOfferedToCity)) {
      $rootScope.showModal("#noServiceModal");
      return true;
    }
    return false;
  }
});

app.controller("AddPaymentCtrl", function(
  $scope,
  $rootScope,
  CommonService,
  $timeout
) {
  debugger;
  let userId = $rootScope.customer_id;

  $timeout(function() {
    $rootScope.loadAddPaymentMethodForm(userId);
  }, 2000);

  $scope.paymentSuccess = function() {
    $rootScope.loadAddPaymentMethodForm(userId);
    CommonService.toast('Payment method added successfully');
  }
});
