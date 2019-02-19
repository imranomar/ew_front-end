// const rootUrl = "http://localhost/";
// const siteUrl = rootUrl + "eazywashgoapp/www/";
// const baseUrl = rootUrl + "advanced/backend/web/";
// const translationFolderPath  = siteUrl + 'translations/';


const rootUrl = "http://eazywash.dk/";
const siteUrl = rootUrl + "client/";
const baseUrl = rootUrl + "advanced/backend/web/";
const translationFolderPath  = siteUrl + 'translations/';

// window.addEventListener("beforeunload", function (e) {
//   if(!localStorage.getItem('rememberMe')){
//     let date1 = new Date().toUTCString();
//     document.cookie = 'laundryCookie=y; expires=' + date1;
//   }
// });

//initialise and setup facebook js sdk
  window.fbAsyncInit = function() {
    FB.init({
      appId            : '757262277993732',
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

 function loginWithFacebook(){
    FB.login(function(response){
        if(response.status === 'connected'){
            FB.api('/me', { locale: 'en_US', fields: 'name, email' },
              function(res) {
                jQuery.ajax({
                      type: "POST",
                      url: baseUrl + 'customersapi/fb_login_register',
                      data: {
                        "full_name": res.name,
                        "email": res.email,
                        "facebook_id": res.id,
                        "sex": '1',
                        "allow_login": true,
                        "action": 'ajax_call',
                        "sub_action": 'fb_login_register'
                      },
                      success: function (response) {

                        // let check = document.getElementsByClassName('rememberMeCheck')[0];
                        // localStorage.setItem('laundryUser', ress.id);
                        
                        // let date = new Date();
                        // if(check){
                        //   localStorage.setItem('rememberMe', 'y');
                        //   let date1 = new Date(date.setDate(date.getDate()+10)).toUTCString();
                        //   document.cookie = 'laundryCookie=y; expires=' + date1;
                        // }else{
                        //   localStorage.removeItem('rememberMe');
                        //   let date1 = new Date(date.setHours(date.getHours()+1)).toUTCString();
                        //   document.cookie = 'laundryCookie=y; expires=' + date1;
                        // }
                          
                        //test();

                        //location.reload();
                        var res = JSON.parse(response);

                        if (res.Success == true) {
                          // let date = new Date();
                          // localStorage.setItem("laundryUser", res.data.id);

                          // let date1 = new Date(
                          //   date.setHours(date.getHours() + 1)
                          // ).toUTCString();
                          // document.cookie = "laundryCookie=y; expires=" + date1;

                          window.location.reload();
                        } else {
                          if (res.data.length > 0) {
                            var fieldErrors = res.data;
                            var firstFieldError = fieldErrors[0];

                            alert(firstFieldError.message
                              ? firstFieldError.message
                              : res.Message);
                          } else {
                            alert(res.Message);
                          }
                        }
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

    },{ scope: 'email' });
 }

 Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var options = {};
    var instances = M.Sidenav.init(elems, options);
});

$(document).ready(function(){
    $('.sidenav').sidenav();
});

$(document).ready(function(){
  $('select').formSelect();
});



window.loadVaults = function() {
  debugger;
  var vaultModal = $('#vaultModal');
  if(vaultModal.is(":visible")) {
    vaultModal.modal('hide');
    $("#loadVaults").trigger("click");
  } else {
    $("#orderLoadVaults").trigger("click");
  }
};