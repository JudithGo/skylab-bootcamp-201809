
var safeBox;
(function(){
    var _password;
    var _secret;
    safeBox = {
        saveSecret: function(secret, password){
            if (typeof secret === 'undefined') throw Error ('invalid secret');
            if (!secret.length) throw Error ('invalid secret');
            if (!secret.trim().length) throw Error ('invalid secret');

            if (typeof password !== 'string') throw Error ('invalid password');
            if (!password.length) throw Error ('invalid password');
            if (!password.trim().length) throw Error ('invalid password');
            
            _secret=secret;
            _password=password;     
        },
        retrieveSecret: function(password){
            if (password!== _password) throw Error ('invalid password');
            return _secret;
        }
    }
})();






