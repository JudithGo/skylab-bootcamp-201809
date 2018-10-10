// logic.js

var logic;
(function () {
    var _password;
    var _user;
    var _email;
    logic = {
        register: function (user, email, password, onSuccess, onFail) {
            if (typeof user !== 'string' || !user || !user.trim().length) onFail('invalid user');
            else if (typeof user !== 'string' || !email || !email.trim().length) onFail('invalid email');
            else if (typeof user !== 'string' || !password || !password.trim().length) onFail('invalid password');
            else if (typeof onSuccess !== 'function') throw Error (onSuccess + ' is not a function');
            else if (typeof onFail !== 'function') throw Error (onFail + ' is not a function');
            else {
                _user = user;
                _password = password;
                _email = email;
                onSuccess();
            }
            
        },

        login: function (user, password, onSuccess, onFail) {
            if (typeof user !== 'string' || !user || !user.trim().length) onFail('invalid user');
            else if (typeof user !== 'string' || !password || !password.trim().length) onFail('invalid password');
            else if (typeof onSuccess !== 'function') throw Error (onSuccess + ' is not a function');
            else if (typeof onFail !== 'function') throw Error (onFail + ' is not a function');
            else if (user) {
                if (user === _user && password === _password) {
                    onSuccess(user);
                }
                else onFail('wrong credentials!');
            }
        }
    };
})();
