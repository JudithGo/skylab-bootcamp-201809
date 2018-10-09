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



var login = new Login('Login', 'section',
function() {
    var user = document.querySelector('._username').value;
    var password =  document.querySelector('._password').value;
    if(safeBox.retrieveSecret(user, password)){
        login.hide();
        welcome.title.innerText='Welcome ' + user + '!!';
        welcome.show();
    }else{
        error=new Error('Error!', 'section', 'User or password is not valid!!');
        document.body.appendChild(error.element);
        error.show();
    }
    // var error;
    // try{
    //     if(safeBox.retrieveSecret(user,password)){
    //         login.hide();
    //         welcome.title.innerText='Welcome ' + user + '!!';
    //         welcome.show();
    //     } else{
    //         error=new Error('Error!', 'section', 'User or password is not valid!!');
    //         document.body.appendChild(error.element);
    //         error.show();
    //     }

    // }catch(err){
    //     error=new Error('Error!', 'section', err.message);
    //     document.body.appendChild(error.element);
    //     error.show();
    // }

},
function(){
    login.hide();
    landing.show();
});

document.body.appendChild(login.element);



var register = new Register('Register', 'section',
function() {
    var user = document.querySelector('.__username').value;
    var password =  document.querySelector('.__password').value;
    safeBox.saveSecret(user, password);
    register.hide();
    login.show();
   
    // register.addform(document.body);

    // var user = document.querySelector('._username').value;
    // var password =  document.querySelector('._password').value;
    // var error;
    // try{
    //     if(safeBox.saveSecret(user,password)){
    //         login.hide();
    //         welcome.show();
    //     } else{
    //         error=new Error('Error!', 'section', 'User or password is not valid!!');
    //         document.body.appendChild(error.element);
    //         error.show();
    //     }

    // }catch(err){
    //     error=new Error('Error!', 'section', err.message);
    //     document.body.appendChild(error.element);
    // }
},
function(){
    register.hide();
    landing.show();
});


document.body.appendChild(register.element);


var welcome = new Welcome('Welcome!', 'section');
document.body.appendChild(welcome.element);


