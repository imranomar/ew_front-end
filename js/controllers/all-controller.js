 var app = angular.module("laundryApp");

 //Login of Controller

 app.controller('LoginCtrl', function($scope,$location,$http){
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
       $http.get('http://thisisbig.ae/advanced/backend/web/customersapi/authenticate?email='+email+'&password='+password)
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

 app.controller('MydetailsCtrl',function($scope,$location,$http) {
 	// body...
 	    $scope.loading = false;
        let x = localStorage.getItem('laundryUser');
        $scope.userdata = {};
   		getPayement();
     	getAddress();
     	
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






     	function getAddress(){
	 	    $http.get('http://thisisbig.ae/advanced/backend/web/customersapi/view/?id='+x+'&expand=addresses')
	       .then(function(res){
	          console.log(res.data);
	          let city = res.data.id;
	          getcity(city);
	          $scope.userdata = res.data;
	       }).catch(function(err){
	             console.log(err);
	       });
       }
       function getPayement(){
   	 	    $scope.loading = true;
	        $http.get('http://thisisbig.ae/advanced/backend/web/vaultapi?id=1')
	        .then(function(res){
	        	$scope.loading = false;
	        	console.log(res.data);
	        	console.log("tahseen");
	        	$scope.paymentDetails = res.data;
	        }).catch(function(err){
	        	$scope.loading = false;
                console.log(err);
	        });
       }

        function getcity(city){
          $http.get('http://thisisbig.ae/advanced/backend/web/citiesapi/view?id='+city)
	          .then(function(res){
                  console.log(res.data);
                  $scope.cityid = res.data;
                  console.log($scope.cityid.title);
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

app.controller('AddressesCtrl',function($scope,$http){

		// $scope.first=[{'street':'Xyz1','pobox':'Bhopal','Flat':'Mno','name':'Address 1'}];
		// $scope.second=[{'title':'Laundry','pobox1':'Bhopal','flat1':'Mno','bldname':'Manish''name':'Address 2'}];
		
  //       $scope.Street = function () {
  //           if ($scope.Street == false || $scope.Street == undefined)
  //               $scope.Street = true;
  //           else
  //               $scope.Street = false;
  //       }

  //       $scope.pobox = function () {
  //           if ($scope.pobox == false || $scope.pobox == undefined)
  //               $scope.pobox = true;
  //           else
  //               $scope.pobox = false;
  //       }

		// $scope.Flat = function () {
  //           if ($scope.Flat == false || $scope.Flat == undefined)
  //               $scope.Flat = true;
  //           else
  //               $scope.Flat = false;
  //       }


		// $scope.title = function () {
  //           if ($scope.title == false || $scope.title == undefined)
  //               $scope.title = true;
  //           else
  //               $scope.title = false;
  //       }

		// $scope.pobox1 = function () {
  //           if ($scope.pobox1 == false || $scope.pobox1 == undefined)
  //               $scope.pobox1 = true;
  //           else
  //               $scope.pobox1 = false;
  //       }

		// $scope.flat1 = function () {
  //           if ($scope.flat1 == false || $scope.flat1 == undefined)
  //               $scope.flat1 = true;
  //           else
  //               $scope.flat1 = false;
  //       }

		// $scope.bldname = function () {
  //           if ($scope.bldname == false || $scope.bldname == undefined)
  //               $scope.bldname = true;
  //           else
  //               $scope.bldname = false;
  //       }

});


// Load Controller of DeliverydateCtrl

app.controller('DeliverydateCtrl',function($scope) {
	// body...
})


// Load Controller of OrdersummaryCtrl

app.controller('OrdersummaryCtrl',function($scope){

})



// Load Controller of PaymentmethodfCtrl

app.controller('PaymentmethodCtrl',function($scope){

	$scope.cards=[
		{'paymentid':'1','cardname':'Master Card','Name':'Mohan Kumar','Number':'784512369815','cvcode':'4512','Expiry':'18/12/2025','cardnumber':'********9815','val':'true'},
		{'paymentid':'2','cardname':'Visa Card','Name':'Sohan Kumar','Number':'78451236789','cvcode':'4512','Expiry':'05/01/2019','cardnumber':'********6789','val':'false'}
	];
})


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
