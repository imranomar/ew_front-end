 var app = angular.module("laundryApp");

 //Login of Controller

 app.controller('LoginCtrl', function($scope,$location){
 	$scope.logindata=[];
	$scope.loginsubmit = function () {
		console.log($scope.logindata);
		$location.path('/dashboard');
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
 	  	'question':'How do I brighten my dingy white clothes and linens?','decription':'clothes and linens?'
 	  	},
 	  	{
 	  	'question':'How do I remove set-in stains that have been washed and dried?','decription':'washed and dried?'
 	  	},
 	  	{
 	  	'question':'How can I prevent fading of my dark clothes?','decription':'fading of my dark clothes?'
 	  	},
 	  	{
 	  	'question':'How do I remove dye transfer from clothes?','decription':'dye transfer from clothes?'
 	  	},
 	  	{
 	  	'question':'How do I remove yellow armpit stains?','decription':'yellow armpit stains?'
 	  	},
 	  	{
 	  	'question':'How do I remove ink stains from clothes and leather?','decription':'ink stains from clothes and leather?'
 	  	},
 	  	{
 	  	'question':'Why wont my washer/dryer work?','decription':'washer/dryer work?'
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

 app.controller('MydetailsCtrl',function($scope) {
 	// body...
 });


// Load Notification Page of Controller

app.controller('NotificationCtrl',function ($scope) {
		$scope.notificationtoday = [
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
	 	  	}
	 	];
});


// Load addresses page of controller 

app.controller('AddressesCtrl',function($scope,$http){

		$scope.first=[{'street':'Xyz','pobox':'Bhopal','Flat':'Mno'}];
		$scope.second=[{'title':'Laundry','pobox1':'Bhopal','flat1':'Mno','bldname':'Manish'}];
		
        $scope.Street = function () {
            if ($scope.Street == false || $scope.Street == undefined)
                $scope.Street = true;
            else
                $scope.Street = false;
        }

        $scope.pobox = function () {
            if ($scope.pobox == false || $scope.pobox == undefined)
                $scope.pobox = true;
            else
                $scope.pobox = false;
        }

		$scope.Flat = function () {
            if ($scope.Flat == false || $scope.Flat == undefined)
                $scope.Flat = true;
            else
                $scope.Flat = false;
        }


		$scope.title = function () {
            if ($scope.title == false || $scope.title == undefined)
                $scope.title = true;
            else
                $scope.title = false;
        }

		$scope.pobox1 = function () {
            if ($scope.pobox1 == false || $scope.pobox1 == undefined)
                $scope.pobox1 = true;
            else
                $scope.pobox1 = false;
        }

		$scope.flat1 = function () {
            if ($scope.flat1 == false || $scope.flat1 == undefined)
                $scope.flat1 = true;
            else
                $scope.flat1 = false;
        }

		$scope.bldname = function () {
            if ($scope.bldname == false || $scope.bldname == undefined)
                $scope.bldname = true;
            else
                $scope.bldname = false;
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

app.controller('PaymentmethodCtrl',function($scope){

})
