// App Controller
app.controller('AppController', function ($scope, $rootScope, $location, $translate, CommonService) {

	$scope.changeLanguage = function (lang) {
		$rootScope.SelectedLang = lang;
		CommonService.storeLanguageLocal(lang);
		$translate.use(lang);
	}

	$scope.goTo = function(route)
	{
		$('.sidenav').sidenav('close');
		$location.path(route);
	}
});

//Login of Controller
app.controller('LoginCtrl', function($scope, $rootScope, $location,$http, $httpParamSerializer, appInfo, FCMService){
	// console.log(FCMService.test());
	$scope.showLoading = false;

	$scope.field = 'email';
 	$scope.logindata = {
		email: '',
		password: ''
	};
 	$scope.err = false;

	$scope.loginsubmit = function () {
		$scope.err = false;
		
		let email= $scope.logindata.email;
		let password= $scope.logindata.password;

		$scope.showLoading = true;

		let data = {
			device_id: $rootScope.fcm_token
		};
		
		let req = {
			method: 'POST',
			url: appInfo.url+'customersapi/authenticate?email='+email+'&password='+password,
			data: $httpParamSerializer(data),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
		
		$http(req)
			.then(function(res) {
				$scope.showLoading = false;

				if(res.data != 0){
					localStorage.setItem('laundryUser', res.data);
					let date = new Date();

					if($scope.checkbox == true){
						localStorage.setItem('rememberMe', 'y');
						let date1 = new Date(date.setDate(date.getDate()+10)).toUTCString();
						document.cookie = 'laundryCookie=y; expires=' + date1;
					}else{
						localStorage.removeItem('rememberMe');
						let date1 = new Date(date.setHours(date.getHours()+1)).toUTCString();
						document.cookie = 'laundryCookie=y; expires=' + date1;
					}
					$location.path('/dashboard');
				} else {
					$scope.err = true;
				}

			}).catch(function(err){
				$scope.showLoading = false;
				console.log("error");
				console.log(err);
			});
	}
	
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

 app.controller('SignupCtrl',function($scope, $httpParamSerializer,$http, appInfo, $location, FCMService) {
	$scope.signupdata = [];
 		$scope.signupsubmitform = function(){
			$scope.loading = true;
			let data = {
				full_name: $scope.signupdata.name,
				email: $scope.signupdata.email,
				password: $scope.signupdata.password,
				phone: $scope.signupdata.phone,
				sex: '0'
				
			};
			let req = {
				method: 'POST',
				url: appInfo.url+'customersapi/create',
				data: $httpParamSerializer(data),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}

			$scope.err = '';
			$scope.loading = true;

			$http(req)
				.then(function(res){
					$scope.loading = false;
					console.log(res.data);
					let date = new Date();
					localStorage.setItem('laundryUser', res.data.id);
					
					let date1 = new Date(date.setHours(date.getHours()+1)).toUTCString();
					document.cookie = 'laundryCookie=y; expires=' + date1;
					$location.path('/dashboard');
				}).catch(function(error){
					$scope.loading = false;
					let err = error.data;
					$scope.err = err[0].message;
					// console.log(error);
				})
 		}

 });


 // Forget password of Controller

 app.controller('ForgetCtrl',function($scope) {
 	$scope.forgetdata1 = [];

 	$scope.sendemail = function(){
 		console.log($scope.forgetdata1);
 	}
 });

 // Dashboard of Controller

 app.controller('DashboardCtrl',function($scope,$location) {
 	$scope.menuopen = function(){
 		//$location.path("/menu");
	}

	$scope.closemenu = function(){
		angular.element('.Menu').remove();
	}
	
 });


 // Menu of Controller

 app.controller('MenuCtrl',function($scope,$location) {

	$scope.signout = function()
	{
		let date = new Date().toUTCString();
		document.cookie = 'laundryCookie=y; expires=' + date;
		localStorage.removeItem('laundryUser');
		localStorage.removeItem('rememberMe');
		$location.path('/login');
	}

	 $scope.closemenu = function ()
	 {
		 $location.path("/dashboard");
		 console.log("MenuCtrl");
	 }

 });


 // pricing of Controller

 app.controller('PricingCtrl',function($scope) {
 	// body...
 });



 // Aboutus of Controller

 app.controller('AboutusCtrl',function($scope) {
 	// body...
 });


 // Frequently asked questions of Controller

 app.controller('FaqsCtrl',function($scope) {
 	
 	  $scope.questions = [
 	  	{
 	  	'question':'How do I brighten my dingy white clothes and linens?','decription':'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.'
 	  	},
 	  	{
 	  	'question':'How do I remove set-in stains that have been washed and dried?','decription':'washed and dried? Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for '
 	  	},
 	  	{
 	  	'question':'How can I prevent fading of my dark clothes?','decription':'fading of my dark clothes? There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.'
 	  	},
 	  	{
 	  	'question':'How do I remove dye transfer from clothes?','decription':'dye transfer from clothes? Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for'
 	  	},
 	  	{
 	  	'question':'How do I remove yellow armpit stains?','decription':'yellow armpit stains? Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for'
 	  	},
 	  	{
 	  	'question':'How do I remove ink stains from clothes and leather?','decription':'ink stains from clothes and leather? Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for'
 	  	},
 	  	{
 	  	'question':'Why wont my washer/dryer work?','decription':'washer/dryer work? Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for'
 	    }
 	   ];

		$scope.toggleGroup = function(group) {

			if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
			} 
			else {
			$scope.shownGroup = group;
			}

		};

		$scope.isGroupShown = function(group) {
			return $scope.shownGroup === group;
		};
 });



 // My details Page of Controller

 app.controller('MydetailsCtrl',function($scope,$location,$http, appInfo, $httpParamSerializer) {
	 // body...
 	    $scope.loading = false;
        let x = localStorage.getItem('laundryUser');
		$scope.userdata = {};
		$scope.asteriskPassword  = '';
		$scope.paymentDetails = [];
		$scope.cityids = [];
   		getPayment();
		getAddress();
		getVault(x);
		 
		function getPassword(){
			let p = $scope.userdata.password.split('').map(()=>{
				return '*';
			})
			$scope.asteriskPassword = p.join('');
		}
     	
        $(".edit-btn").click(function(){
            $(this).css("display","none"); //working
			$(this).parent().parent().find(".clk-fade-in").css("display","block");
			$(this).parent().parent().find(".clk-fade-out").css("display","none");
			$(this).parent().parent().find(".whn-clk-edt").css("display","block");
			$(this).parent().parent().find('.form-control').css("display","block"); //working
			$(this).parent().parent().find('.form-control').focus(); //working
		});
		
        $(".whn-clk-edt").click(function(){
			$(this).css("display","none"); //working
			$(this).parent().parent().find(".clk-fade-in").css("display","none");
			$(this).parent().parent().find(".clk-fade-out").css("display","block");
			$(this).parent().parent().find(".whn-clk-edt").css("display","none");
			$(this).parent().parent().find('.form-control').css("display","none"); //working
			$(this).parent().parent().find('.form-control').focus(); //working
			$(this).parent().parent().find(".edit-btn").css("display","block");
			
		});
		

		$scope.onSavePersonDetail = function(){
			let data = {
				full_name: $scope.userdata.full_name,
				email: $scope.userdata.email,
				password: $scope.userdata.password,
				phone: $scope.userdata.phone
			};	

			let req = {
				method: 'PUT',
				crossDomain: true,
				url: appInfo.url+'customersapi/update/?id='+x,
				data: $httpParamSerializer(data),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
			$scope.loading = true;
			$http(req)
			.then(function(res){
				$scope.loading = false;
				console.log(res);
				$scope.userdata.password = res.data.password;
				getPassword();
			 }).catch(function(err){
				$scope.loading = false;
				console.log(err);
			 });
		}

     	function getAddress(){
	 	    $http.get(appInfo.url+'customersapi/view/?id='+x+'&expand=addresses')
	       .then(function(res){
	        //   console.log(res.data);
			$scope.userdata = res.data;
			for(let value of  $scope.userdata.addresses){
				getcity(value.city_id);
			}
			getPassword();
	       }).catch(function(err){
	             console.log(err);
	       });
	   }

	   function getPayment(){
		//alert(appInfo.url+'customersapi/view/?id='+x+'&expand=payments');
			$http.get(appInfo.url+'customersapi/view/?id='+x+'&expand=payments')
			.then(function(res){
				$scope.loading = false;
				// console.log(res.data);
				$scope.userdata.payments = res.data.payments;
				//for(let value of  $scope.userdata.payments){
					//getVault(value.vault_id);
				//}
			}).catch(function(err){
				$scope.loading = false;
				console.log(err);
			});
	   }
	   
       function getVault(id){
		   //alert(appInfo.url+'vaultapi/view/?id='+id);
				$scope.loading = true;
				$http.get(appInfo.url+'customersapi/view/?id='+x+'&expand=vault')
	        .then(function(res){
	        	$scope.loading = false;
				for(let value of  (res.data.vault)){
					$scope.paymentDetails.push(value);
				}
	
	        }).catch(function(err){
	        	$scope.loading = false;
                console.log(err);
	        });
       }

        function getcity(city){
          $http.get(appInfo.url+'citiesapi/view?id='+city)
	          .then(function(res){
                  console.log(res.data);
                  $scope.cityids.push(res.data);
	          }).catch(function(err){
	          	   console.log(err);
	          })
		}

 });


// Load Notification Page of Controller

app.controller('NotificationCtrl',function ($scope) {
		$scope.notificationtoday = [
	 	  	{
	 	  	'todayname':'LAUNDRY PICKUP TODAY','timing':'AT 8:00 AM','date':'Thu 17th August 2017'
	 	  	},
	 	  	{
	 	  	'todayname':'LAUNDRY PICKUP TODAY','timing':'AT 8:00 AM','date':'Thu 17th August 2017'
	 	  	},
	 	  	{
	 	  	'todayname':'LAUNDRY PICKUP TODAY','timing':'AT 8:00 AM','date':'Thu 17th August 2017'
	 	  	},
	 	  	{
	 	  	'todayname':'LAUNDRY PICKUP TODAY','timing':'AT 8:00 AM','date':'Thu 17th August 2017'
	 	  	},
	 	  	{
	 	  	'todayname':'LAUNDRY PICKUP TODAY','timing':'AT 3:00 AM','date':'Thu 17th August 2017'
	 	  	}
 	   ];		

 	   $scope.laundrypickup = [
	 	  	{
	 	  		'todayname':'LAUNDRY PICKUP','timing':'IN 1 HOUR!'
	 	  	},
	 	  	{
	 	  		'todayname':'LAUNDRY PICKUP','timing':'IN 1 HOUR!'
	 	  	},
	 	  	{
	 	  		'todayname':'LAUNDRY PICKUP','timing':'IN 1 HOUR!'
	 	  	}
	 	];
});


// Load addresses page of controller 

app.controller('AddressesCtrl',function($scope,$http, appInfo, $location, $httpParamSerializer){
	$scope.loading = false;
	let x = localStorage.getItem('laundryUser');
	$scope.userdata = {};
	$scope.cityids = [];
	$scope.cityData = [];
	getAddress();
	getAllcity();

	

	$('body').on('click', '.magic-edit', function(){
		$(this).css("display","none");
		$(this).siblings(".magic-check").css("display","block");
		$(this).siblings(".magic-input").css("display","block");
		$(this).siblings(".main-data").css("display","none");
	
	});

	$('body').on('click', '.magic-check', function(){
		$(this).css("display","none");
		$(this).siblings(".magic-edit").css("display","block");
		$(this).siblings(".magic-input").css("display","none");
		$(this).siblings(".main-data").css("display","block");
	});

	$('body').on('click', '.magic-check', function(){
		let bodyfont = $(this).parents('.bodyfont');

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
			method: 'PUT',
			url: appInfo.url+'addressesapi/update?id='+id,
			data: $httpParamSerializer(data),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		$scope.loading = true;
		$http(req)
			.then(function(res){
				$scope.loading = false;
				console.log(res.data);
				console.log("address");
				$scope.userdata.addresses[index] = res.data;
			}).catch(function(err){
				$scope.loading = false;
				   console.log(err);
			})

	});

	

	$scope.onDelteAddress = function (data){
		let req = {
			method: 'DELETE',
			url: appInfo.url+'addressesapi/delete?id='+data.id,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		$scope.err = '';
		$scope.loading = true;
		$http(req)
			.then(function(res){
				$scope.loading = false;
				console.log(res.data);
				getAddress();
			}).catch(function(error){
				$scope.loading = false;
				let err = error.data;
				$scope.err = err[0].message;
				// console.log(error);
			})
	}


	function getAddress(){
		$scope.loading = true;
		$http.get(appInfo.url+'customersapi/view/?id='+x+'&expand=addresses')
		.then(function(res){
			$scope.loading = false;
			console.log(res.data.id);
			$scope.getAddressId = res.data.id;

			$scope.userdata = res.data;
			for(let value of  $scope.userdata.addresses){
				getcity(value.city_id);
			}
		}).catch(function(err){
			$scope.loading = false;
			console.log(err);
		});
	}
	  
	function getcity(city){
		$http.get(appInfo.url+'citiesapi/view?id='+city)
			.then(function(res){
				console.log(res.data);
				$scope.cityids.push(res.data);
			}).catch(function(err){
				   console.log(err);
			})
	  }

	  function getAllcity(){
		$http.get(appInfo.url+'citiesapi')
			.then(function(res){
				$scope.cityData = res.data;
				console.log($scope.cityData);
			}).catch(function(err){
				   console.log(err);
			})
	  }



});


// Load Controller of DeliverydateCtrl

app.controller('DeliverydateCtrl',function($scope) {
	// body...
})


// Load Controller of OrdersummaryCtrl

app.controller('OrdersummaryCtrl',function($q, $timeout, WizardHandler, $scope, $http, appInfo,$httpParamSerializer, $location){
	//$scope.selectedStep = "Step 2";

	let x = localStorage.getItem('laundryUser');

	$scope.getAddress;
	$scope.getpayment;

	$scope.Wizard = null;
	$scope.stepValidation = true;
	
	//  localstorage keys
	$scope.localData = {
		pickupDate : {},
		pickupTime: {},
		deliveryDate: {},
		deliveryTime: {}
	};


	var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
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

	$scope.$on('wizard:stepChanged',function(event, args) {
		console.log(args);
		var step = args.index;

		switch(step) {
			case 0:
				console.log('first');
				functionForFirst();
			break;

			case 1:
				console.log('second');
				functionForSecond();
			break;

			case 2:
				console.log('third');
				functionForThird();
			break;
			
			case 3:
				console.log('fourth');
				functionForForth();
			break;

			case 4:
				console.log('final');
				getLocalDetail();
			break;
		}
	});

	$scope.validateStep = function(){
		debugger;
		if($scope.stepValidation == true) 
		{
			var currentStep = $scope.Wizard.currentStepNumber();

			if(currentStep == 1 && getObjectLength($scope.localData.pickupDate) == 0) {
				return false;
			} else if(currentStep == 2 && getObjectLength($scope.localData.pickupTime) == 0) {
				return false;
			} else if(currentStep == 3 && getObjectLength($scope.localData.deliveryDate) == 0) {
				return false;
			} else if(currentStep == 4 && getObjectLength($scope.localData.deliveryTime) == 0) {
				return false;
			}
		}
		return true;
	};

	$scope.initializeWizard = function()
	{
		$scope.Wizard = WizardHandler.wizard("requestPickupWizard");

		if(getLocalStorageData()) {
			$scope.localData = getLocalStorageData();
			var goToStep = 0;

			if(getObjectLength($scope.localData.deliveryTime) != 0)
			{
				goToStep = 4;
			} 
			else if(getObjectLength($scope.localData.deliveryDate) != 0)
			{
				goToStep = 3;
			}
			else if(getObjectLength($scope.localData.pickupTime) != 0)
			{
				goToStep = 2;
			} 
			else if(getObjectLength($scope.localData.pickupDate) != 0)
			{
				goToStep = 1;
			} 

			if ($scope.Wizard) {
				$scope.Wizard.goTo(goToStep);
			}
		}
	}

	$scope.noValidation = function() { 
		$scope.stepValidation = false;
	}

	$scope.checkValidation = function() { 
		$scope.stepValidation = true;
	}

	// wizard one start
	$scope.pickupDateList;
	//$scope.getLocalDetail;

	function functionForFirst(){
		let date  = new Date();
		let dateapi = [];
		let array = [];	
		getDate();

		$scope.showAllpickupDateList = false;
		function getDate(){
			$http.get(appInfo.url+'optionsapi')
				.then(function(res){
					dateapi = res.data[0];	
					console.log(dateapi);
					makeDate();
				}).catch(function(err){
					console.log(err);
				});
		}

		function makeDate(){
			let holidays = dateapi.holidays.split(',');
			let length = dateapi.holidays.split(',').length;
			if(dateapi.weekend){
				length += 1;
			}
			for(var i = 0; i < 16 + length ; i++){
				let name = '';
				let price = '';
				date  = new Date();
				let d = new Date(date.setDate(date.getDate()+i));
				if(d.getDate() == new Date().getDate()){
					// if  day is tomorrow
					name = 'Today';
					price = dateapi.same_day_pickup_price;
				}else if(d.getDate() == new Date().getDate()+1){
					// if day is day after 
					name = 'Tomorrow';
				}
				else
				{ 
					name = days[d.getDay()];
				}
				
				array.push({
					date: d,
					name: name,
					price: price,
					shortDate: d.getDate()+'th '+months[d.getMonth()]
				});
			}
        
			for(var i = 0; i < array.length; i++){
				for(let j = 0; j < holidays.length; j++){
					if(array[i]){
						if(array[i].date.toLocaleDateString() == new Date(holidays[j] * 1000).toLocaleDateString()){
							array.splice(i, 1);
						}	
					}
				}
				
				if(dateapi.weekend){
					if(array[i]){
						if(days.indexOf(dateapi.weekend) > -1){
							if(array[i].date.getDay() == days.indexOf(dateapi.weekend)){
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
	}

	$scope.loadMorePickupDates = function(){
		$scope.showAllpickupDateList = true;
	}
	// wizard one closed


	// wizard three  start
	$scope.deliveryDateList;
	$scope.showAlldeliveryDateList = false;
	function functionForThird() {
		let date1  = new Date(getLocalStorageData().pickupDate.date);
		let pickupD = new Date(getLocalStorageData().pickupDate.date);
		let dateapi1 = [];
		let array1 = [];	
    
		getDate1();
		function getDate1(){
			$http.get(appInfo.url+'optionsapi')
				.then(function(res){
					dateapi1 = res.data[0];	
					console.log(dateapi1);
					makeDate1();
				}).catch(function(err){
					console.log(err);
				});
		}

		function makeDate1(){
		let holidays1 = dateapi1.holidays.split(',');
		let length1 = dateapi1.holidays.split(',').length;
		if(dateapi1.weekend){
			length1 += 1;
		}
		for(var i = 0; i < 16 + length1 ; i++){
			let name = '';
			let price = '';
			let d1 = new Date(date1.setDate(date1.getDate()+1));
			if(d1.getDate() == new Date().getDate()+1){
				// if day is day after 
				name = 'Tomorrow';
				price = dateapi1.next_day_delivery_price;
			}else
			if(d1.getDate() == pickupD.getDate()+1){
				// if  day is tomorrow
				// name = 'day after';
				name = 'next day';
				price = dateapi1.next_day_delivery_price;
			}
			 
			array1.push({
				date: d1,
				name: name,
				price: price,
				shortDate: d1.getDate()+'th '+days[d1.getDay()]
			});
		}
		for(var i = 0; i < array1.length; i++){

			for(let j = 0; j < holidays1.length; j++){
				if(array1[i]){
					if(array1[i].date.toLocaleDateString() == new Date(holidays1[j] * 1000).toLocaleDateString()){
						array1.splice(i, 1);
						
					}	
				}
			}
			if(array1[i]){
				if(dateapi1.weekend){
					if(days.indexOf(dateapi1.weekend) > -1){
						if(array1[i].date.getDay() == days.indexOf(dateapi1.weekend)){
							array1.splice(i, 1);
						}
					}
				}	
			}
		}
		array1.length = 15;
		$scope.deliveryDateList = array1;
		}
	}

	$scope.loadMoreDeliveryDates = function(){
		$scope.showAlldeliveryDateList = true;
	}
	// wizard three closed

	// wizard two open 
	$scope.PickupTimeSlots = [];
	function functionForSecond() {
		$scope.PickupTimeSlots = [];
		$http.get(appInfo.url+'slotspricingapi?sort=time_from')
		.then(function(res){	
			$scope.PickupTimeSlots = res.data;
			console.log	($scope.PickupTimeSlots);
		}).catch(function(err){
			console.log(err);
		});
	}
	// wizard two closed 

	// wizard four open 
	$scope.DeliveryTimeSlots = [];
	function functionForForth() {
		$scope.DeliveryTimeSlots = [];
		$http.get(appInfo.url+'slotspricingapi?sort=time_from')
			.then(function(res){	
				$scope.DeliveryTimeSlots = res.data;
				console.log	($scope.DeliveryTimeSlots);
			}).catch(function(err){
				console.log(err);
			});
	}
	
	// forth wizard
	let myPayment;
	function getLocalDetail(){
		getAddress();
		function getAddress(){
			$http.get(appInfo.url+'customersapi/view/?id='+x+'&expand=addresses')
			.then(function(res){
				console.log(res.data);
				$scope.getAddress = res.data;
			}).catch(function(err){
				$scope.loading = false;
				console.log(err);
			});
		}
		
		getPayment();
		function getPayment(){
			$http.get(appInfo.url+'customersapi/view/?id='+x+'&expand=payments')
			.then(function(res){
				console.log(res);
				$scope.getpayment = res.data.payments[0];
				myPayment = res.data.payments[0];
				if(!$scope.getpayment){
					return;
				}
				getVault($scope.getpayment.vault_id)
			}).catch(function(err){
				console.log(err);
			});
		}

		function getVault(id){
			$scope.loading = true;
			$http.get(appInfo.url+'vaultapi/view/?id='+id)
			.then(function(res){
				$scope.loading = false;
				console.log(res.data);
				$scope.getpayment= res.data;
			}).catch(function(err){
				$scope.loading = false;
				console.log(err);
			});
		   }
	}
	
	$scope.performAction = function(action, value) {
		switch(action) {
			case "SAVE_PICKUP_DATE":
				$scope.localData.pickupDate = value;
			break;

			case "SELECT_PICKUP_TIME":
				$scope.localData.pickupTime = value;
				return false;
			break;

			case "SELECT_PICKUP_AT_DOOR":
				$scope.localData.pickupTime = {};
				if(value == true) {
					$scope.localData.pickupTime.leaveAtdoor = 'y';
				}
				return false;
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
				if(value == true) {
					$scope.localData.deliveryTime.leaveAtdoor = 'y';
				}
				return false;
			break;
		}

		let obj = JSON.stringify($scope.localData);
		saveLocalData(obj);

		// Check Validation
		$scope.checkValidation();
	}
		   
	//get data in fith wizard
	$scope.createOrder = function(){
		if($scope.getAddress.addresses.length == 0){
			alert('Please add address');
			return;
		}
		if(!myPayment){
			alert('Please add payment');
			return;
		}

		let getItemLocallyCustomer = localStorage.getItem('laundryUser');
		var confuseDatepickup = $scope.localData.pickupDate.date;
		var simpleDatepickup = new Date(confuseDatepickup).toISOString().substr(0,10);
		var confuseDate = $scope.localData.deliveryDate.date;
		var simpleDate = new Date(confuseDate).toISOString().substr(0,10);

		let data = {
			payment_id: myPayment.id,
			status: '0',
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
			address_id:	$scope.getAddress.addresses[0].id,
			same_day_pickup: $scope.localData.pickupDate.name == 'Today'?'1':'0',
			next_day_drop: $scope.localData.deliveryDate.name == 'next day'?'1':'0',
			comments: null,
			customer_id: getItemLocallyCustomer,
			pickup_at_door: $scope.localData.pickupTime.leaveAtdoor == 'y' ? 1 : 0,
			drop_at_door: $scope.localData.deliveryTime.leaveAtdoor == 'y' ? 1 : 0
		};

		for(let key in data){
			if(!data[key]){
				data[key] = '0';
			}
		}

		let req = {
			method: 'POST',
			url: appInfo.url+'ordersapi/create',
			data: $httpParamSerializer(data),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		$scope.err = '';
		$scope.loading = true;
		$http(req)
			.then(function(res){
				$scope.loading = false;
				alert("Order created successfully.");
				removeLoalStorageAndGoToDashboard();
				console.log(res);
			}).catch(function(error){
				$scope.loading = false;
				let err = error.data;
				console.log(error);
			});
	}
	// save onto local storage closed

	function getLocalStorageData(){
		let a = localStorage.getItem('Myorder');
		let obj = {};
		if(a){
			obj = JSON.parse(a);
			return obj;
		}
		return null;
		
	}

	function getObjectLength(obj) {
		return Object.keys(obj).length;
	}

	function removeLoalStorageAndGoToDashboard(){
		localStorage.removeItem('Myorder');
		$location.path('/dashboard');
	}

	function saveLocalData(data){
		localStorage.setItem('Myorder',  data);
	}

	$scope.onCancelOrder = function() {
		var confirmation = confirm("Do you want to cancel order ?");
		if(confirmation) {
			removeLoalStorageAndGoToDashboard();
		}
	}
});




// Load Controller of PaymentmethodfCtrl

app.controller('PaymentmethodCtrl',function($scope, $http, appInfo){
	$scope.loading = false;
	$scope.paymentId;
	let x = localStorage.getItem('laundryUser');
	$scope.userdata = {};
	$scope.paymentDetails = [];
	getPayment();

	$scope.onDeltePayment = function(data, i){
		let id = $scope.userdata.payments[i].id;
		let req = {
			method: 'DELETE',
			url: appInfo.url+'paymentsapi/delete?id='+id,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		$scope.err = '';
		$scope.loading = true;
		$http(req)
			.then(function(res){
				$scope.loading = false;
				console.log(res.data);
				getPayment();
				console.log("tyahsee");
			}).catch(function(error){
				$scope.loading = false;
				let err = error.data;
				$scope.err = err[0].message;
				// console.log(error);
			})
	}
	

	function getPayment(){
	
		$http.get(appInfo.url+'customersapi/view/?id='+x+'&expand=payments')
		.then(function(res){
			// console.log(res.data.payments[0].id);
			// $scope.paymentId = res.data.payments[0].id;
			
			$scope.userdata.payments = res.data.payments;
			if($scope.userdata.payments.length == 0){
				$scope.paymentDetails = [];
			}
			for(let value of  $scope.userdata.payments){
				getVault(value.vault_id);
			}
			console.log("tahsss");
		}).catch(function(err){
			console.log(err);
		});

		$scope.editPayment = function(e){
			console.log(e);
			
		}	
	
	}
   
   function getVault(id){
		$scope.loading = true;
		$http.get(appInfo.url+'vaultapi/view/?id='+id)
		.then(function(res){
			$scope.loading = false;
			// console.log(res.data);
			$scope.paymentDetails.push(res.data);
		}).catch(function(err){
			$scope.loading = false;
			console.log(err);
		});
   }

});


// Load Controller of FinaldateCtrl

app.controller('FinaldateCtrl',function($scope){
	console.log('FinaldateCtrl');
})



// Load Controller of MyeditCtrl

app.controller('MyeditCtrl',function($scope,$routeParams){
	$scope.message = 'Clicked person name from home page should be dispalyed here';
	$scope.person = $routeParams.person;
	console.log($scope.person);

	$scope.persondata=[];

	$scope.myeditsave =function() {
		console.log($scope.persondata);
	}
});

app.controller('EditPaymentCtrl', function($scope, $http, appInfo, $routeParams, $httpParamSerializer){
	$scope.paymentDetails = {};
	getVault();

	$scope.onEditSubmit = function(){

		let data = {
			name: $scope.paymentDetails.name,
			number: $scope.paymentDetails.number,
			cvcode: $scope.paymentDetails.cvcode,
			expiry_month: $scope.paymentDetails.expiry_month,
			expiry_year: $scope.paymentDetails.expiry_year
		};
		
		let req = {
			method: 'PUT',
			url: appInfo.url+'vaultapi/update?id='+$routeParams.id,
			data: $httpParamSerializer(data),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		$scope.loading = true;
		$http(req)
			.then(function(res){
				$scope.loading = false;
				console.log(res.data);
			}).catch(function(err){
				$scope.loading = false;
				   console.log(err);
			})
	}


	
	function getVault(id){
		$scope.loading = true;
		$http.get(appInfo.url+'vaultapi/view/?id='+$routeParams.id)
		.then(function(res){
			$scope.loading = false;
			// console.log(res.data);
			$scope.paymentDetails = res.data;
		}).catch(function(err){
			$scope.loading = false;
			console.log(err);
		});
   }

});


app.controller('AddressCtrl', function($scope, $http, appInfo, $httpParamSerializer, $routeParams, $timeout){
	let x = localStorage.getItem('laundryUser');

	$scope.id = $routeParams.id > 0 ? $routeParams.id : -1;

	$scope.err;
	$scope.loading = false;
	$scope.addressData = {};
	$scope.cityData = [];
	getcity();

	if($scope.id > 0)
		getOneAddress();

	
	
	$scope.onAddSubmit = function() {
		let data = {
			street_name: $scope.addressData.street_name,
			floor: $scope.addressData.floor,
			pobox: $scope.addressData.pobox,
			city_id: $scope.addressData.city_id,
			customer_id: x,
			unit_number: $scope.addressData.unit_number,
			as_default: '0'
		};

		var method = $scope.id > 0 ? 'PUT': 'POST'
		var apiUrl = appInfo.url + ($scope.id > 0 ? 'addressesapi/update?id='+$scope.id: 'addressesapi/create');
		let req = {
			method: method,
			url: apiUrl,
			data: $httpParamSerializer(data),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		$scope.err = '';
		$scope.loading = true;
		$http(req)
			.then(function(res){
				$scope.loading = false;
				console.log(res.data);
				console.log("add");
				
			}).catch(function(error){
				$scope.loading = false;
				let err = error.data;
				$scope.err = err[0].message;
				// console.log(error);
			})
	}

	function getOneAddress(){
		$scope.loading = true;
		$http.get(appInfo.url+'addressesapi/view?id='+$routeParams.id)
			.then(function(res){
				$scope.loading = false;
				console.log(res.data);
				console.log("0");
				
				$scope.addressData = res.data;
				$scope.addressData.city_id = res.data.city_id.toString();
			}).catch(function(err){
				$scope.loading = false;
				console.log(err);
			})
	}

	function getcity(){
		$http.get(appInfo.url+'citiesapi')
			.then(function(res){
				// console.log(res.data);
				$scope.cityData = res.data;
				$timeout(function(){
					$('select').formSelect();
				}, 100)
			}).catch(function(err){
				   console.log(err);
			})
	}
});


app.controller('AddPaymentCtrl', function($scope, $http, appInfo, $httpParamSerializer){
	let userId = localStorage.getItem('laundryUser');
	$scope.paymentDetails = {};
	$scope.userId = userId;

	//todo:after every 20 milliseconds keep checking if the content of the iframe is
	//"completed" then rediect to mydetails page to the payments section

	// setInterval(function() {
//alert($("#iframe2").contents().find("body").html());
//}, 3000);
	
	
	//$('#submit').click();
	var doc = document.getElementById('iframe2').contentWindow.document;
	doc.open();
	doc.write('Loading... \
	\
                <FORM ACTION="https://payment.architrade.com/paymentweb/start.action" METHOD="POST" CHARSET="UTF -8"> \
                  <INPUT TYPE="hidden" NAME="accepturl" VALUE="http://thisisbig.ae/advanced/backend/web/vault/createvault"> \
                    <INPUT TYPE="hidden" NAME="cancelurl" VALUE="http://thisisbig.ae/advanced/backend/web/vault/createvault"> \
                    <INPUT TYPE="hidden" NAME="callbackurl" VALUE=""> \
                  <INPUT TYPE="hidden" NAME="amount" VALUE="1"> \
                  <INPUT TYPE="hidden" NAME="currency" VALUE="578"> \
                  <INPUT TYPE="hidden" NAME="merchant" VALUE="90246240"> \
                  <INPUT TYPE="hidden"   NAME="orderid" id="orderid" VALUE="'+userId+'"> \
                  <INPUT TYPE="hidden" NAME="lang" VALUE="EN"> \
                  <INPUT TYPE="hidden" NAME="preauth" VALUE="1"> \
                  <INPUT TYPE="hidden" NAME="test" VALUE="1"> \
                  <INPUT TYPE="hidden" NAME="decorator" VALUE="responsive" /> \
                  <INPUT type="Submit" id="submit" name="submit" style="visibility:hidden"  value="TICKET DEMO"> \
                  </FORM> \
                  <script src="js/jquery-3.3.1.slim.min.js"></script> \
                  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> \
				  <script>$("#submit").click();</script>\
                  ');
	doc.close();

	$scope.onAddPayment = function(){
		
		
			let data = {
				name: $scope.paymentDetails.name,
				number: $scope.paymentDetails.number,
				cvcode: $scope.paymentDetails.cvcode,
				expiry_month: $scope.paymentDetails.expiry_month,
				expiry_year: $scope.paymentDetails.expiry_year,
			};

			let req = {
				method: 'POST',
				url: appInfo.url+'vaultapi/create',
				data: $httpParamSerializer(data),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
			$scope.err = '';
			$scope.loading = true;
			$http(req)
				.then(function(res){
					$scope.loading = false;
					console.log(res.data);
					addPayment(res.data.id);
					
				}).catch(function(error){
					$scope.loading = false;
					let err = error.data;
					$scope.err = err[0].message;
					// console.log(error);
				})
	}

	function addPayment(id){
		let data = {
			customer_id: userId,
			vault_id: id
		};

		let req = {
			method: 'POST',
			url: appInfo.url+'paymentsapi/create',
			data: $httpParamSerializer(data),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		$scope.err = '';
		$scope.loading = true;
		$http(req)
			.then(function(res){
				$scope.loading = false;
				console.log(res.data);
				$scope.paymentDetails = {};
			}).catch(function(error){
				$scope.loading = false;
				let err = error.data;
				$scope.err = err[0].message;
				// console.log(error);
			})
	}

	
	



});
