// public/js/services/UserService.js
angular.module('EmailService', [
    'ngCookies'
]);


angular.module('EmailService')
    .factory('Email', email);

    
    function email($rootScope, $http, $cookies, $location, $route, $q, userRoles) {
        
        welcomeEmail = function(usrData){
            // pass welcome email to route
            var data = {
                'to': 'pjmetzger76@gmail.com',//usrData.email,
                'subject' : 'DisneyGarageSale.com Activation Required!',
                'html' : "<div style='width:100%; text-align:center'><div style='width:50%'><div style='margin-bottom:30px;'>LOGO</div><div style='font-size:15px; border:1px solid #cccccc; padding:20px; margin-bottom:30px;'><p>Thank you for joining Disneygaragesale.com. Please confirm your email by clicking on the button below. If you received this by mistake or weren't expecting it, please disregard this email</p></div><div style='background:green; padding:30px;'><a style='font-size:20px; font-weight:bold; color: #ffffff;' href='http://localhost:8080/register/registration-verify/" + usrData.salt + "'>ACTIVATE ACCOUNT</a></div></div>",
                'text' : 'This is the text, if needed'
            }
            return $http.post('/sendemail', data);
        }


        return {
            welcome: function(data){
                return welcomeEmail(data);
            }
            
        }       

    };