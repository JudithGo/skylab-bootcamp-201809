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

    describe('register', function () {
        it('should save the inputs', function () {
            logic.register(user, email, password,
                function () {
                    error = false;
                },
                function (message) {
                    msg = message;
                    error = true;
                }
            );
            expect(!error).toBeTruthy();
        });
        it('should throw an error if user is empty', function () {
            user ="";
            logic.register(user, email, password,
                function () {
                    error = false;
                },
                function (message) {
                    msg = message;
                    error = true;
                }
            );
            expect(msg).toEqual('invalid user');
        });
        it('should throw an error if email is empty', function () {
            email ="";
            logic.register(user, email, password,
                function () {
                    error = false;
                },
                function (message) {
                    msg = message;
                    error = true;
                }
            );
            expect(msg).toEqual('invalid email');
        });
        it('should throw an error if password is empty', function () {
            password ="";
            logic.register(user, email, password,
                function () {
                    error = false;
                },
                function (message) {
                    msg = message;
                    error = true;
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
                    msg = message;
                    error = true;
                }
            );
            expect(!error).toBeTruthy();
        });
        
        it('should throw an error if user is empty', function () {
            user ="";
            logic.login(user, password,
                function () {
                    error = false;
                },
                function (message) {
                    msg = message;
                    error = true;
                }
            );
            expect(msg).toEqual('invalid user');
        });
        
        it('should throw an error if password is empty', function () {
            password ="";
            logic.login(user, password,
                function () {
                    error = false;
                },
                function (message) {
                    msg = message;
                    error = true;
                }
            );
            expect(msg).toEqual('invalid password');
        });
        
        it('should throw an error with wrong credentials', function () {
            password ="123";
            logic.login(user, password,
                function () {
                    error = false;
                },
                function (message) {
                    msg = message;
                    error = true;
                }
            );
            expect(msg).toEqual('wrong credentials!');
        });
    });


});