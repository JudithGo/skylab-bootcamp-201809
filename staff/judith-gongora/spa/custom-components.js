function Landing(title, tag, registerCallback, loginCallback) {
    Panel.call(this, title, tag);

    this.element.className = 'landing';
    
    this.landing__div = document.createElement('div');
    this.landing__div.className = 'landing__div';

    this.register = document.createElement('button');
    this.register.innerText = 'Register';
    this.register.addEventListener('click', registerCallback);
    this.landing__div.appendChild(this.register);

    this.landing__div.appendChild(document.createTextNode(' or '));


    this.login = document.createElement('button');
    this.login.innerText = 'Login';
    this.login.addEventListener('click', loginCallback);
    this.landing__div.appendChild(this.login);

    this.element.appendChild(this.landing__div);
}

Landing.prototype = Object.create(Panel.prototype);
Landing.prototype.constructor = Landing;

function Login(title, tag, loginCallback, backCallback) {
    Panel.call(this, title, tag);

    this.element.className = 'login';
    this.element.style.display = 'none';

    this.form = document.createElement('form');
    this.element.appendChild(this.form);
    
    this.div_username = document.createElement('div');
    this.div_username.className = 'div';

    this.lbl_username = document.createElement('label');
    this.lbl_username.innerText = 'Username';
    this.div_username.appendChild(this.lbl_username);
    this.username = document.createElement('input');
    this.username.className='_username';
    this.div_username.appendChild(this.username);
    this.form.appendChild(this.div_username);

    this.div_password = document.createElement('div');
    this.div_password.className = 'div';
    this.lbl_password = document.createElement('label');
    this.lbl_password.innerText = 'Password';
    this.div_password.appendChild(this.lbl_password);
    this.password = document.createElement('input');
    this.password.type='password';
    this.password.className='_password';
    this.div_password.appendChild(this.password);
    this.form.appendChild(this.div_password);

    this.login = document.createElement('button');
    this.login.innerText = 'Login';
    this.login.type='button';
    this.login.addEventListener('click', loginCallback);
    this.form.appendChild(this.login);

    this.back = document.createElement('a');
    this.back.href = '#';
    this.back.innerText = 'Back';
    this.back.addEventListener('click', backCallback);
    this.element.appendChild(this.back);
}

Login.prototype = Object.create(Panel.prototype);
Login.prototype.constructor = Login;

function Register(title, tag, registerCallback, backCallback) {
    Panel.call(this, title, tag);

    this.element.className = 'register';

    this.element.style.display = 'none';

    this.form = document.createElement('form');

    this.element.appendChild(this.form);
    // this.form.addEventListener('submit', function(event){
    //     event.preventDefault();
    //     var name = this.username.value;
    // }.bind(this));
    
    // this.arr_elements = ['FirstName','LastName', 'Email', 'Password'];

    this.div_username = document.createElement('div');
    this.div_username.className = 'div';
    this.lbl_username = document.createElement('label');
    this.lbl_username.innerText = 'Username';
    this.div_username.appendChild(this.lbl_username);
    this.username = document.createElement('input');
    this.username.className='__username';
    this.div_username.appendChild(this.username);
    this.form.appendChild(this.div_username);

    this.div_email = document.createElement('div');
    this.div_email.className = 'div';
    this.lbl_email = document.createElement('label');
    this.lbl_email.innerText = 'Email';
    this.div_email.appendChild(this.lbl_email);
    this.email = document.createElement('input');
    this.email.className='__email';
    this.div_email.appendChild(this.email);
    this.form.appendChild(this.div_email);

    this.div_password = document.createElement('div');
    this.div_password.className = 'div';
    this.lbl_password = document.createElement('label');
    this.lbl_password.innerText = 'Password';
    this.div_password.appendChild(this.lbl_password);
    this.password = document.createElement('input');
    this.password.type='password';
    this.password.className='__password';
    this.div_password.appendChild(this.password);
    this.form.appendChild(this.div_password);

    this.register = document.createElement('button');
    this.register.innerText = 'Register';
    this.register.type='button';
    this.register.addEventListener('click', registerCallback);
    this.form.appendChild(this.register);

    this.back = document.createElement('a');
    this.back.href = '#';
    this.back.innerText = 'Back';
    this.back.addEventListener('click', backCallback);
    this.element.appendChild(this.back);
}

Register.prototype = Object.create(Panel.prototype);
Register.prototype.constructor = Register;

// Register.prototype.addform = function (arr_elements){
//     arr_elements.forEach(function(e){
//         var div = document.createElement('div');
//         var label = document.createElement('label');
//         var input = document.createElement('input');
//         label.innerText = e;
//         input.placeholder = e;
//         div.appendChild(label);
//         div.appendChild(label);
//         form.appendChild(div);
//     });
// };


function Error(title, tag, p) {
    Panel.call(this, title, tag);

    this.element.className = 'error alert--danger';
    this.txt = document.createElement('p');
    this.txt.innerText=p;
    this.element.style.display = 'none';
    this.element.appendChild(this.txt);
}

Error.prototype = Object.create(Panel.prototype);
Error.prototype.constructor = Error;


function Welcome(title, tag) {
    Panel.call(this, title, tag);

    this.element.className = 'welcome';

    this.element.style.display = 'none';
}

Welcome.prototype = Object.create(Panel.prototype);
Welcome.prototype.constructor = Welcome;