// safe-box.js

var safeBox;
(function () {
    var _password;
    var _user;
    safeBox = {
        saveSecret: function (user, password) {
            // if (typeof user !== 'string' || !user.trim().length) alert('invalid username')
            // else if (typeof password !== 'string' || !password.trim().length) alert('invalid password');
            // else{
                _user = user;
                _password = password;
            // }
        },

        retrieveSecret: function (user, password) {
            // if (typeof user !== 'string' || !user.trim().length) alert('invalid username');

            // if (typeof password !== 'string' || !password.trim().length) alert('invalid password');

            if (user === _user && password === _password) return true;
            else return false;  
            // if (user === _user && password !== _password) throw Error('invalid password');     
        }     
    };
})();
