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

 app.controller('SignupCtrl',function($scope) {
 		$scope.signupdata = [];
 		$scope.signupsubmitform = function(){
 			console.log($scope.signupdata);
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

 	$scope.menuopen =function(){
 		//$location.path("/menu");
 		
 	}

	$scope.closemenu = function(){
		alert('qwfwefw');
		angular.element('.Menu').remove();
	}

 });


 // Menu of Controller

 app.controller('MenuCtrl',function($scope,$location) {

 	$scope.closemenu = function () {
 		$location.path("/dashboard");
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
			console.log(res.data);
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

app.controller('OrdersummaryCtrl',function($scope){

})



// Load Controller of PaymentmethodfCtrl

app.controller('PaymentmethodCtrl',function($scope, $http, appInfo){
	$scope.loading = false;
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
			console.log(res.data);
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
