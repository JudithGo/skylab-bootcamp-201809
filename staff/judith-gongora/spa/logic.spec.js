describe('logic', function () {

        var user;
        var email;
        var password;
        var error;
        var msg;
    
    beforeEach(function() {
        user = 'pepe';
        email = 'pepe@gmail.com';
        password = '12345';

    });
    //REGISTER
    describe('register', function () {
        it('should save the inputs', function () {
            logic.register(user, email, password,
                function () {
                    error = false;
                },
                function (message) {
                    throw Error (message);
                }
            );
            expect(!error).toBeTruthy();
        });
        //User empty
        it('should throw an error if user is empty', function () {
            user ="";
            logic.register(user, email, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid user');
        });
        //User undefined
        it('should throw an error if user is undefined', function () {
            user =undefined;
            logic.register(user, email, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid user');
        });
        //User number
        it('should throw an error if user is number', function () {
            user =13;
            logic.register(user, email, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid user');
        });
        //email empty
        it('should throw an error if email is empty', function () {
            email ="";
            logic.register(user, email, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid email');
        });
        //Email undefined
        it('should throw an error if email is undefined', function () {
            email ="";
            logic.register(user, email, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid email');
        });
        //Email number
        it('should show an error if email is a number', function () {
            email =23;
            logic.register(user, email, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid email');
        });
        //Password undefined
        it('should show an error if password is undefined', function () {
            password = undefined;
            logic.register(user, email, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid password');
        });
        //Password empty
        it('should show an error if password is undefined', function () {
            password = "";
            logic.register(user, email, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid password');
        });
        //Password number
        it('should show an error if password is undefined', function () {
            password = 23;
            logic.register(user, email, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid password');
        });
    });

    describe('login', function () {

        beforeEach(function() {
            logic.register(user, email, password,function () {},function () {});
    
        });

        it('should show Welcom user', function () {

            logic.login(user, password,
                function () {
                    error = false;
                },
                function (message) {
                    throw Error (message);
                }
            );
            expect(!error).toBeTruthy();
        });
        //User empty
        it('should show an error if user is empty', function () {
            user ="";
            logic.login(user, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid user');
        });
        //User undefined
        it('should show an error if user is undefined', function () {
            user = undefined;
            logic.login(user, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid user');
        });
        //User number
        it('should show an error if user is number', function () {
            user =12;
            logic.login(user, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid user');
        });
        //password empty
        it('should show an error if password is empty', function () {
            password ="";
            logic.login(user, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid password');
        });
        //password undefined
        it('should show an error if password is undefined', function () {
            password = undefined;
            logic.login(user, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid password');
        });
        //password empty
        it('should throw an error if password is empty', function () {
            password =11;
            logic.login(user, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('invalid password');
        });
        //Wrong credentials
        it('should show an error with wrong credentials', function () {
            password ="123";
            logic.login(user, password,
                function () {
                    throw Error ();
                },
                function (message) {
                    msg = message;
                }
            );
            expect(msg).toEqual('wrong credentials!');
        });
    });


});