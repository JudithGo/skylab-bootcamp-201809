var landing = new Landing('Choose an option', 'section',
    function() {
        landing.hide();
        register.show()
    },
    function() {
        landing.hide();
        login.show();
    });

document.body.appendChild(landing.element);



var register = new Register('Register', 'section', function () {
    var user = document.querySelector('.__username').value;
    var email =  document.querySelector('.__email').value;
    var password =  document.querySelector('.__password').value;
    logic.register(user, email, password,
        function () {
            register.hide();
            login.show();
        },
        function (message) {
            alert(message);
        }
    );
}, function () {
    register.hide();
    landing.show();
});

document.body.appendChild(register.element);


var login = new Login('Login', 'section', function () {
    var user = document.querySelector('.__username').value;
    var password =  document.querySelector('.__password').value;
    logic.login(user, password, 
        function(user) {
            login.hide();

            welcome.title.innerText = 'Welcome, ' + user + '!';
            
            welcome.show();
        },
        function(message) {
            alert(message);
        });
}, function () {
    login.hide();
    landing.show();
});

document.body.appendChild(login.element)


var welcome = new Welcome('Welcome!', 'section');
document.body.appendChild(welcome.element);


