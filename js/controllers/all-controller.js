 var app = angular.module("laundryApp");
 
app.run(function($rootScope){
	$rootScope.a = '​http://thisisbig.ae/advanced/backend/web/';
 });


 

 //Login of Controller

 app.controller('LoginCtrl', function($scope,$location,$http, appInfo){
 	$scope.loading = false;
 	$scope.logindata={};
 	$scope.err = false;
 	$scope.checkbox = true;
 	

	$scope.loginsubmit = function () {
		
         $scope.loading = true;
		// $location.path('/dashboard');
		// console.log($scope.logindata);

		let email= $scope.logindata.email;
		let password= $scope.logindata.password;


		// console.log("helloqwerty");
       $http.get(appInfo.url+'customersapi/authenticate?email='+email+'&password='+password)
       .then(function(res){
       	$scope.loading = false;
       	   console.log("success");
       	   
   	     	if(res.data != 0){
   	     		localStorage.setItem('laundryUser', res.data);
   	     		
   	     		// console.log(localStorage.getItem('laundryUser'));
   	     		$location.path('/dashboard');
   	     	 	if($scope.checkbox == true){
	    			localStorage.setItem('laundrylogin', 1);
       	    	}else{
       	    		localStorage.removeItem('laundrylogin');
       	    	}
       	     }
       	     else{
       	     	$scope.err = true;
       	     }

       }).catch(function(err){
       	$scope.loading = false;
             console.log("error");
             console.log(err);
       });


			
	}		

 });


 // Signup of Controller

 app.controller('SignupCtrl',function($scope, $httpParamSerializer,$http, appInfo) {
 		$scope.signupdata = [];
 		$scope.signupsubmitform = function(){
			$scope.loading = true;
			let data = {
				full_name: $scope.signupdata.name,
				email: $scope.signupdata.email,
				password: $scope.signupdata.password,
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
	console.log('0');
 	$scope.menuopen =function(){
 		//$location.path("/menu");
 		
	 }
	 console.log("dashboard");

	$scope.closemenu = function(){
		alert('qwfwefw');
		angular.element('.Menu').remove();
	}
	$scope.Signout = function(){
		console.log("hello");
	    localStorage.removeItem('laundryUser');
	    localStorage.removeItem('laundrylogin');
        $location.path("/login");
	}

 });


 // Menu of Controller

 app.controller('MenuCtrl',function($scope,$location) {
	console.log("MenuCtrl");
	console.log("hello");
	$scope.Signout = function(){
		console.log("signout");
	}

 	$scope.closemenu = function () {
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
		 
		function getPassword(){
			let p = $scope.userdata.password.split('').map(()=>{
				return '*';
			})
			$scope.asteriskPassword = p.join('');
		}
     	
        $(".edit-btn").click(function(){
            $(this).parent().css("display","none");
        	$(this).parent().siblings(".clk-fade-out").css("display","none");
        	$(this).parent().siblings(".clk-fade-in").css("display","block");
        	$(this).parent().siblings(".whn-clk-edt").css("display","block");
		});
		
        $(".whn-clk-edt").click(function(){
              $(this).css("display","none");
              $(this).siblings(".clk-fade-out").css("display","block");
              $(this).siblings(".clk-fade-in").css("display","none");
              $(this).siblings(".sib").css("display","block");
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
			$http.get(appInfo.url+'customersapi/view/?id='+x+'&expand=payments')
			.then(function(res){
				$scope.loading = false;
				// console.log(res.data);
				$scope.userdata.payments = res.data.payments;
				for(let value of  $scope.userdata.payments){
					getVault(value.vault_id);
				}
			}).catch(function(err){
				$scope.loading = false;
				console.log(err);
			});
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

app.controller('OrdersummaryCtrl',function($scope, $http, appInfo,$httpParamSerializer){
	//  localstorage keys
	let localData = {
		pickupDate : {},
		pickupTime: {},
		deliveryDate: {},
		deliveryTime: {}
	} 
	let x = localStorage.getItem('laundryUser');
	$scope.getAddress;
	$scope.getpayment;

	// wizard one start
	let date  = new Date();
	let dateapi=[];
	var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	let array = [];	
	$scope.datelist;
	$scope.getLocalDetail;
	getDate();
	$scope.showAllDateList = false;
	function getDate(){
		$http.get(appInfo.url+'optionsapi')
			.then(function(res){
				dateapi = res.data[0];	
				console.log(dateapi);
				conDate();
			}).catch(function(err){
				   console.log(err);
			});
	}

	function conDate(){
		let holidays = dateapi.holidays.split(',');
		let length = dateapi.holidays.split(',').length;
		if(dateapi.weekend){
			length += 1;
		}
		for(var i = 0; i < 16 + length ; i++){
			let name = '';
			let price = '';
			let d = new Date(date.setDate(date.getDate()+1));
			
			if(d.getDate() == new Date().getDate()+1){
				// if  day is tomorrow
				name = 'Tomorrow';
				price = dateapi.next_day_pickup_price;
			}else if(d.getDate() == new Date().getDate()+2){
				// if day is day after 
				name = 'day after';
			}
			array.push({
				date: d,
				name: name,
				price: price,
				shortDate: d.getDate()+'th '+days[d.getDay()]
			});
		}

		for(var i = 0; i < array.length; i++){
			for(let j = 0; j < holidays.length; j++){
				if(array[i].date.getDate() == new Date(holidays[j] * 1000).getDate()){
					array.splice(i, 1);
				}	
			}
			if(dateapi.weekend){
				if(days.indexOf(dateapi.weekend) > -1){
					if(array[i].date.getDay() == days.indexOf(dateapi.weekend)){
						array.splice(i, 1);
					}
				}
			}	
		}
		array.length = 15;
		console.log(array);
		$scope.datelist = array;

	}

	$scope.onOther = function(){
		$scope.showAllDateList = true;
	}
	// wizard one closed


		// wizard three  start
	let date1  = localData.pickupDate.date;
	let dateapi1=[];
	let array1 = [];	
    $scope.datelist1;
	getDate1();
	$scope.showAllDateList1 = false;
	function getDate1(){
		$http.get(appInfo.url+'optionsapi')
			.then(function(res){
				dateapi1 = res.data[0];	
				console.log(dateapi1);
				conDate();
			}).catch(function(err){
				   console.log(err);
			});
	}

	function conDate1(){
		let holidays1 = dateapi.holidays.split(',');
		let length1 = dateapi.holidays.split(',').length;
		if(dateapi1.weekend){
			length1 += 1;
		}
		for(var i = 0; i < 16 + length1 ; i++){
			let name = '';
			let price = '';
			let d1 = new Date(date.setDate(date.getDate()+1));
			
			if(d1.getDate() == new Date().getDate1()+1){
				// if  day is tomorrow
				name = 'Tomorrow';
				price = dateapi.next_day_pickup_price;
			}else if(d1.getDate1() == new Date().getDate1()+2){
				// if day is day after 
				name = 'day after';
			}
			array.push({
				date: d1,
				name: name,
				price: price,
				shortDate: d1.getDate()+'th '+days[d1.getDay()]
			});
		}

		for(var i = 0; i < array1.length; i++){
			for(let j = 0; j < holidays1.length; j++){
				if(array[i].date.getDate1() == new Date(holidays1[j] * 1000).getDate1()){
					array.splice(i, 1);
				}	
			}
			if(dateapi1.weekend){
				if(days.indexOf(dateapi1.weekend) > -1){
					if(array1[i].date.getDay1() == days.indexOf(dateapi1.weekend)){
						array1.splice(i, 1);
					}
				}
			}	
		}
		array1.length = 15;
		console.log(array1);
		$scope.datelist1 = array1;

	}

	$scope.onOther1 = function(){
		$scope.showAllDateList1 = true;
	}
	

		
		// wizard three closed

	// wizard two open 
	$scope.TimeSlot ;
    function getTimeSlot(){
		$http.get(appInfo.url+'slotspricingapi')
			.then(function(res){	
				$scope.Timeslot = res.data;
				console.log	($scope.Timeslot);
			}).catch(function(err){
				   console.log(err);
			});
	}
	getTimeSlot();

	// wizard two closed 

	// wizard four open 
	$scope.TimeSlot1 ;
    function getTimeSlot1(){
		$http.get(appInfo.url+'slotspricingapi')
			.then(function(res){	
				$scope.Timeslot1 = res.data;
				console.log	($scope.Timeslot1);
			}).catch(function(err){
				   console.log(err);
			});
	}
	getTimeSlot1();

	// wizard four closed 

	

	// save into local storage start
    $scope.savelocallyDate = function(value){
		console.log(value);
		localData.pickupDate = value;
		var stringlocalData = JSON.stringify(localData);
		localStorage.setItem('Myorder',  stringlocalData);
		console.log(localData.pickupDate.date);
	}

	$scope.savelocallyTime = function(value){
		console.log(value);
		localData.pickupTime = value;
		var stringlocalTime = JSON.stringify(localData);
		localStorage.setItem('Myorder',  stringlocalTime);
	}
	$scope.savelocallyDeliveryDate = function(value){
		console.log(value);
		localData.deliveryDate = value;
		var stringlocalTime = JSON.stringify(localData);
		localStorage.setItem('Myorder',  stringlocalTime);
	}
	$scope.savelocallyDeliveryTime = function(value){
		console.log(value);
		localData.deliveryTime = value;
		var stringlocalTime = JSON.stringify(localData);
		localStorage.setItem('Myorder',  stringlocalTime);
	}
	$scope.getLocalDetail = function(){
		let getItemLocally = localStorage.getItem('Myorder');
		let getItemLocallyCustomer = localStorage.getItem('laundryUser');
		console.log( getItemLocallyCustomer);
		
		$scope.getLocalDetail = JSON.parse(getItemLocally);
		console.log($scope.getLocalDetail.deliveryDate.date);
		console.log($scope.getLocalDetail);
		console.log($scope.getLocalDetail.deliveryDate.price);
		var confuseDate = $scope.getLocalDetail.deliveryDate.date;
		var simpleDate = new Date(confuseDate).toISOString().substr(0,10);
		console.log(simpleDate);
		var confuseDatepickup = $scope.getLocalDetail.pickupDate.date;
		var simpleDatepickup = new Date(confuseDatepickup).toISOString().substr(0,10);
		console.log(simpleDatepickup);

		function getAddress(){
			
			$http.get(appInfo.url+'customersapi/view/?id='+x+'&expand=addresses')
			.then(function(res){
				
				console.log(res.data);
				$scope.getAddress = res.data;
				console.log($scope.getAddress.addresses[0].floor);
				console.log("tahseen");
			}).catch(function(err){
				$scope.loading = false;
				console.log(err);
			});
		}
		getAddress();

		function getPayment(){
			$http.get(appInfo.url+'customersapi/view/?id='+x+'&expand=payments')
			.then(function(res){
				console.log(res.data.payments[0].id);
				console.log(res);
				$scope.getpayment = res.data.payments[0];
				console.log("mil gaya");
				console.log($scope.getpayment.id);
				console.log("mil gaya");
				getVault($scope.getpayment.vault_id)
			}).catch(function(err){
				console.log(err);
			});
		}
		getPayment();

		function getVault(id){
			$scope.loading = true;
		$http.get(appInfo.url+'vaultapi/view/?id='+id)
		.then(function(res){
			$scope.loading = false;
			console.log(res.data);
			$scope.getpayment= res.data;

			console.log(res.data.cvcode);
			console.log(res.data.expiry_month);
			console.log(res.data.expiry_year);
		}).catch(function(err){
			$scope.loading = false;
			console.log(err);
		});
   }
		
	//get data in fith wizard

	$scope.createOrder = function(){
		let data = {
			payment_id:$scope.getpayment.id,
			status: '0',
			pickup_date: simpleDatepickup,
			pickup_time_from: $scope.getLocalDetail.pickupTime.time_from,
			pickup_time_to: $scope.getLocalDetail.pickupTime.time_to,
			pickup_price: $scope.getLocalDetail.pickupTime.price,
			pickup_type: $scope.getLocalDetail.pickupTime.type,
			drop_date: simpleDate,
			drop_time_from: $scope.getLocalDetail.deliveryTime.time_from,
			drop_time_to: $scope.getLocalDetail.deliveryTime.time_to,
			drop_price: $scope.getLocalDetail.deliveryTime.price,
			drop_type: $scope.getLocalDetail.deliveryTime.type,
			address_id:	$scope.getAddress.addresses[0].id,
			same_day_pickup: '0',
			next_day_drop: '0',
			comments: '0',
			customer_id: getItemLocallyCustomer,
	
		};
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
				console.log(res);
				console.log("final");
			}).catch(function(error){
				$scope.loading = false;
				let err = error.data;
				console.log(error);
			})
	}
	

	}
	

	


	
	// let localData = {
	// 	pickupDate : {},
	// 	pickupTime: {},
	// 	deliveryDate: {},
	// 	deliveryTime: {}
	// } 

	// save onto local storage closed



		
	 
    $("body").on('click','.next',function(){
		

		if($(this).parents(".tab1")){
			$(this).parents(".tab1").css("display","none");
		    $(this).parents(".tab1").siblings(".tab2").css("display","block");
		}

		$(".checky").change(function() {
			$(this).parents(".list").siblings(".finaldate1").toggleClass("fade", this.checked)
		}).change();

		$('.checky').click(function() {
			if($(this).is(':checked')){	
			  $(this).parents(".list").siblings(".finaldate1").find("input[type=radio]").prop('checked', false);
			  $(this).parents(".list").siblings(".finaldate1").find("input[type=radio]").attr('disabled', true);
			}	  
			else{
				$(this).parents(".list").siblings(".finaldate1").find("input[type=radio]").attr('disabled', false);
			}
		});
		if($(this).parents(".tab2")){
			$(this).parents(".tab2").siblings(".tab1").css("display","none");
			$(this).parents(".tab2").css("display","none");
			$(this).parents(".tab2").siblings(".tab3").css("display","block");
		}

		if($(this).parents(".tab3")){
			$(this).parents(".tab3").siblings(".tab2").css("display","none");
			$(this).parents(".tab3").css("display","none");
			$(this).parents(".tab3").siblings(".tab4").css("display","block");
		}  

		if($(this).parents(".tab4")){
			$(this).parents(".tab4").siblings(".tab3").css("display","none");
			$(this).parents(".tab4").css("display","none");
			$(this).parents(".tab4").siblings(".tab5").css("display","block");
		}  
		
	});
   $(".prev").click(function(){
		if($(this).parents(".tab2")){
				$(this).parents(".tab2").siblings(".tab1").css("display","block");
				$(this).parents(".tab2").css("display","none");
		}
		if($(this).parents(".tab3")){
			$(this).parents(".tab3").siblings(".tab2").css("display","block");
			$(this).parents(".tab3").css("display","none");
		}  
		
		if($(this).parents(".tab4")){
			$(this).parents(".tab4").siblings(".tab3").css("display","block");
			$(this).parents(".tab4").css("display","none");
		}  
   });

	$(".checky").each(function(){
		if ($(this).prop('checked')==true){ 
			alert("hello");
		}
	});
  
})




// Load Controller of PaymentmethodfCtrl

app.controller('PaymentmethodCtrl',function($scope, $http, appInfo){
	$scope.loading = false;
	$scope.paymentId;
	let x = localStorage.getItem('laundryUser');
	$scope.userdata = {};
	$scope.paymentDetails = [];
	getPayment();

	$scope.onDeltePayment = function(data){
		let req = {
			method: 'DELETE',
			url: appInfo.url+'paymentsapi/delete?id='+data.id,
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
			console.log(res.data.payments[0].id);
			$scope.paymentId = res.data.payments[0].id;
			
			$scope.userdata.payments = res.data.payments;
			for(let value of  $scope.userdata.payments){
				getVault(value.vault_id);
			}
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
})

// edit address
app.controller('EditAddressCtrl', function($scope, appInfo, $routeParams, $http, $httpParamSerializer){
	$scope.loading = false;
	getOneAddress();
	getcity();
	$scope.addressData = {};
	$scope.cityData = {};

	$scope.change = function(){
		console.log('e');
	}

	$scope.onEditSubmit = function(){

		let data = {
			street_name: $scope.addressData.street_name,
			floor: $scope.addressData.floor,
			pobox: $scope.addressData.pobox,
			city_id: $scope.addressData.city_id
		};
		
		let req = {
			method: 'PUT',
			url: appInfo.url+'addressesapi/update?id='+$routeParams.id,
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
				console.log("0");	
			}).catch(function(err){
				$scope.loading = false;
				   console.log(err);
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
				console.log(res.data);
				$scope.cityData = res.data;
			}).catch(function(err){
				   console.log(err);
			})
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


app.controller('AddAddressCtrl', function($scope, $http, appInfo, $httpParamSerializer){
	let x = localStorage.getItem('laundryUser');
	$scope.loading = false;
	$scope.addressData = {};
	$scope.cityData = [];
	getcity();
	$scope.err;
	$scope.onAddSubmit = function(){
		let data = {
			street_name: $scope.addressData.street_name,
			floor: $scope.addressData.floor,
			pobox: $scope.addressData.pobox,
			city_id: $scope.addressData.city_id,
			customer_id: x,
			unit_number: $scope.addressData.unit_number,
			as_default: '0'
		};
		let req = {
			method: 'POST',
			url: appInfo.url+'addressesapi/create',
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

	function getcity(){
		$http.get(appInfo.url+'citiesapi')
			.then(function(res){
				// console.log(res.data);
				$scope.cityData = res.data;
			}).catch(function(err){
				   console.log(err);
			})
	  }



});


app.controller('AddPaymentCtrl', function($scope, $http, appInfo, $httpParamSerializer){
	let userId = localStorage.getItem('laundryUser');
	$scope.paymentDetails = {};

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
