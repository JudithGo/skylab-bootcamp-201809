// logic.js

var logic;
(function () {
    var _password;
    var _user;
    var _email;
    logic = {
        register: function (user, email, password, onSuccess, onFail) {
            if (!user || !user.trim().length) onFail('invalid user');
            else if (!email || !email.trim().length) onFail('invalid email');
            else if (!password || !password.trim().length) onFail('invalid password');
            else {
                _user = user;
                _password = password;
                _email = email;
                onSuccess();
            }
            
        },

        login: function (user, password, onSuccess, onFail) {
            if (!user || !user.trim().length) onFail('invalid user');
            else if (!password || !password.trim().length) onFail('invalid password');
            else if (user) {
                if (user === _user && password === _password) {
                    onSuccess(user);
                }
                else onFail('wrong credentials!');
            }
        }
    };
})();
