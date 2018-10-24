//import logic from './logic'

require('isomorphic-fetch')

global.sessionStorage = require('sessionstorage')

const logic = require('./logic')

logic._app = 'test-pintegram'

const { expect } = require('chai')

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {
    describe('users', () => {
        false && describe('register', () => {
            it('should succeed on correct data', () =>
                logic.registerUser('John', 'Doe', `jd-${Math.random()}`, '123')
                    .then(() => expect(true).to.be.true)
            )

            it('should fail on trying to register twice same user', () => {
                const username = `jd-${Math.random()}`

                return logic.registerUser('John', 'Doe', username, '123')
                    .then(() => logic.registerUser('John', 'Doe', username, '123'))
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.message).to.equal(`user with username "${username}" already exists`)
                    })
            })

            it('should fail on undefined name', () => {
                expect(() =>
                    logic.registerUser(undefined, 'Doe', 'jd', '123')
                ).to.throw(TypeError, 'undefined is not a string')
            })

            afterEach(() => logic.logout())

            // TODO other cases
        })

        false && describe('login', () => {
            describe('with existing user', () => {
                let username, password

                beforeEach(() => {
                    const name = 'John', surname = 'Doe'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`

                    return logic.registerUser(name, surname, username, password)
                })

                it('should succeed on correct data', () =>
                    logic.login(username, password)
                        .then(() => expect(true).to.be.true)
                )

                it('should fail on wrong username', () => {
                    username = `dummy-${Math.random()}`

                    return logic.login(username, password)
                        .catch(err => {
                            expect(err).not.to.be.undefined
                            expect(err.message).to.equal(`user with username "${username}" does not exist`)
                        })
                })

                it('should fail on wrong password', () => {
                    password = 'pepito'

                    return logic.login(username, password)
                        .catch(err => {
                            expect(err).not.to.be.undefined
                            expect(err.message).to.equal('username and/or password wrong')
                        })
                })

                afterEach(() => logic.logout())
            })

            it('should fail on undefined username', () => {
                const username = undefined

                expect(() =>
                    logic.login(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            it('should fail on boolean username', () => {
                const username = true

                expect(() =>
                    logic.login(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            it('should fail on numeric username', () => {
                const username = 123

                expect(() =>
                    logic.login(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            // TODO other cases
        })
    })

    false && describe('posts', () => {
        describe('create', () => {
            describe('with existing user', () => {
                let username, password, text

                beforeEach(() => {
                    const name = 'John', surname = 'Doe'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`
                    text = `hello ${Math.random()}`

                    return logic.registerUser(name, surname, username, password)
                        .then(() => logic.login(username, password))
                })

                it('should succeed on correct data', () =>
                    logic.createPost("https://res.cloudinary.com/skylabcoders/image/upload/v1540308747/skylabcoders/a3kz5hstqqqgkiaisi1t.jpg", text)
                        .then(() => expect(true).to.be.true)
                )

                afterEach(() => logic.logout())
            })
        })

        describe('list', () => {
            describe('with existing user', () => {
                let username, password, text

                beforeEach(() => {
                    const name = 'John', surname = 'Doe'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`

                    text = `hello ${Math.random()}`

                    return logic.registerUser(name, surname, username, password)
                        .then(() => logic.login(username, password))
                })

                describe('with existing post', () => {
                    beforeEach(() => logic.createPost("https://res.cloudinary.com/skylabcoders/image/upload/v1540308747/skylabcoders/a3kz5hstqqqgkiaisi1t.jpg", text))

                    it('should return posts', () =>
                        logic.listPosts()
                            .then(posts => {
                                expect(posts).not.to.be.undefined
                                expect(posts.length).to.equal(1)
                            })
                    )
                })

                it('should return no posts', () =>
                    logic.listPosts()
                        .then(posts => {
                            expect(posts).not.to.be.undefined
                            expect(posts.length).to.equal(0)
                        })
                )

                afterEach(() => logic.logout())
            })
        })

        false && describe('delete', () => {
            describe('with existing user', () => {
                let username, password, text, postId

                beforeEach(() => {
                    const name = 'John', surname = 'Doe'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`

                    text = `hello ${Math.random()}`

                    return logic.registerUser(name, surname, username, password)
                        .then(() => logic.login(username, password))
                })

                describe('with existing post', () => {
                    beforeEach(() =>
                        logic.createPost("https://res.cloudinary.com/skylabcoders/image/upload/v1540308747/skylabcoders/a3kz5hstqqqgkiaisi1t.jpg", text)
                            .then(() => logic.listPosts())
                            .then(posts => postId = posts[0].id)
                    )

                    it('should succeed', () =>
                        logic.deletePost(postId)
                            .then(() => logic.listPosts())
                            .then(posts => expect(posts.length).to.equal(0))
                    )
                })

                afterEach(() => logic.logout())
            })
        })




        // describe('update', () => {
        //     describe('with existing user', () => {
        //         let username, password, text, postId

        //         beforeEach(() => {
        //             const name = 'John', surname = 'Doe'

        //             username = `jd-${Math.random()}`
        //             password = `123-${Math.random()}`

        //             text = `hello ${Math.random()}`

        //             return logic.registerUser(name, surname, username, password)
        //                 .then(() => logic.login(username, password))
        //         })

        //         describe('with existing post', () => {
        //             let newText

        //             beforeEach(() => {
        //                 newText = `hello ${Math.random()}`

        //                 return logic.createpost(text)
        //                     .then(() => logic.listposts())
        //                     .then(([post]) => postId = post.id)
        //             })

        //             it('should succeed', () =>
        //                 logic.updatepost(postId, newText)
        //                     .then(() => {
        //                         expect(true).to.be.true

        //                         return logic.listposts()
        //                     })
        //                     .then(posts => {
        //                         expect(posts).not.to.be.undefined
        //                         expect(posts.length).to.equal(1)

        //                         const [post] = posts

        //                         expect(post.id).to.equal(postId)
        //                         expect(post.text).to.equal(newText)
        //                     })
        //             )
        //         })
        // afterEach(() => logic.logout())
        //     })
        // })
    })
    false && describe('logout', () => {
        describe('with existing user', () => {
            let username, password

            beforeEach(() => {
                const name = 'John', surname = 'Doe'

                username = `jd-${Math.random()}`
                password = `123-${Math.random()}`

                text = `hello ${Math.random()}`

                return logic.registerUser(name, surname, username, password)
                    .then(() => logic.login(username, password))
            })
            it('should succesfully log out', () => {

                logic.logout(user => {
                    expect(user._userId).to.equal(null)
                    expect(user._token).to.equal(null)
                    expect(user._posts).to.equal([])
                    expect(user._postsUser).to.equal([])
                    expect(user._postsAllUser).to.equal([])
                    expect(user._likes).to.equal([])
                    expect(user._follows).to.equal([])
                    expect(user._followers).to.equal([])
                    expect(user._postLiked).to.equal([])
                    expect(user._comments).to.equal([])
                    expect(user._postsOtherUser).to.equal([])
                    expect(sessionStorage.getItem('userId')).to.equal(null)
                    expect(sessionStorage.getItem('token')).to.equal(null)


                })

            })
        })


    })


    false && describe('add like', () => {
        describe('with existing user', () => {
            let username, password, text, postId

            beforeEach(() => {
                const name = 'John', surname = 'Doe'

                username = `jd-${Math.random()}`
                password = `123-${Math.random()}`

                text = `hello ${Math.random()}`

                return logic.registerUser(name, surname, username, password)
                    .then(() => logic.login(username, password))
            })

            describe('with existing post', () => {
                beforeEach(() =>
                    logic.createPost("https://res.cloudinary.com/skylabcoders/image/upload/v1540308747/skylabcoders/a3kz5hstqqqgkiaisi1t.jpg", text)
                        .then(() => logic.listPosts())
                        .then(posts => postId = posts[0].id)
                )

                it('should successfully add like to post', () =>

                    logic.addLike(postId)
                        .then(expect(logic._likes[logic._likes.length - 1]).to.equal(postId))
                        .then(() => logic.listLikes())
                        .then(likes => expect(likes.length).to.equal(1))

                )

                it('should fail on non-number postId (string)', () => {
                    const postId = 'holacaracola'

                    expect(() => logic.addLike(postId))
                        .to.throw(Error, `${postId} is not a number`)
                })
                it('should fail on non-number postId (Array)', () => {
                    const postId = []

                    expect(() => logic.addLike(postId))
                        .to.throw(Error, ` is not a number`)
                })
                it('should fail on non-number postId (object)', () => {
                    const postId = {}

                    expect(() => logic.addLike(postId))
                        .to.throw(Error, `[object Object] is not a number`)
                })
                it('should fail on non-number postId (boolean)', () => {
                    const postId = true

                    expect(() => logic.addLike(postId))
                        .to.throw(Error, `${postId} is not a number`)
                })
                it('should fail on non-number postId (undefined)', () => {
                    const postId = undefined

                    expect(() => logic.addLike(postId))
                        .to.throw(Error, `${postId} is not a number`)
                })
                it('should fail on non-number postId (null)', () => {
                    const postId = null

                    expect(() => logic.addLike(postId))
                        .to.throw(Error, `${postId} is not a number`)
                })







                afterEach(() => logic.logout())
            })

        })
    })

    false && describe('list likes', () => {
        describe('with existing user', () => {
            let username, password, text, postId

            beforeEach(() => {
                const name = 'John', surname = 'Doe'

                username = `jd-${Math.random()}`
                password = `123-${Math.random()}`

                text = `hello ${Math.random()}`

                return logic.registerUser(name, surname, username, password)
                    .then(() => logic.login(username, password))
            })

            describe('with existing post', () => {
                beforeEach(() =>
                    logic.createPost("https://res.cloudinary.com/skylabcoders/image/upload/v1540308747/skylabcoders/a3kz5hstqqqgkiaisi1t.jpg", text)
                        .then(() => logic.listPosts())
                        .then(posts => postId = posts[0].id)
                )

                it('should successfully list likes on a liked post', () =>

                     logic.addLike(postId)
                        .then(expect(logic._likes[logic._likes.length - 1]).to.equal(postId))
                        .then(() => logic.listLikes())
                        .then(likes => expect(likes.length).to.equal(1))

                )






                afterEach(() => logic.logout())
            })

        })


    })




    false && describe('liked post', () => {
        describe('with existing user', () => {
            let username, password, text, postId

            beforeEach(() => {
                const name = 'John', surname = 'Doe'

                username = `jd-${Math.random()}`
                password = `123-${Math.random()}`

                text = `hello ${Math.random()}`

                return logic.registerUser(name, surname, username, password)
                    .then(() => logic.login(username, password))
            })

            describe('with existing post', () => {
                beforeEach(() =>
                    logic.createPost("https://res.cloudinary.com/skylabcoders/image/upload/v1540308747/skylabcoders/a3kz5hstqqqgkiaisi1t.jpg", text)
                        .then(() => logic.listPosts())
                        .then(posts => postId = posts[0].id)
                )

                it('should successfully find liked post', () =>

                    logic.addLike(postId)
                        .then(expect(logic._likes[logic._likes.length - 1]).to.equal(postId))
                        .then(() => logic.likedPost(postId))
                        .then(like => expect(like).to.equal(true))

                )
                it('should fail on non-number postId (string)', () => {
                    const postId = 'holacaracola'

                    expect(() => logic.addLike(postId))
                        .to.throw(Error, `${postId} is not a number`)
                })
                it('should fail on non-number postId (Array)', () => {
                    const postId = []

                    expect(() => logic.addLike(postId))
                        .to.throw(Error, ` is not a number`)
                })
                it('should fail on non-number postId (object)', () => {
                    const postId = {}

                    expect(() => logic.addLike(postId))
                        .to.throw(Error, `[object Object] is not a number`)
                })
                it('should fail on non-number postId (boolean)', () => {
                    const postId = true

                    expect(() => logic.addLike(postId))
                        .to.throw(Error, `${postId} is not a number`)
                })
                it('should fail on non-number postId (undefined)', () => {
                    const postId = undefined

                    expect(() => logic.addLike(postId))
                        .to.throw(Error, `${postId} is not a number`)
                })
                it('should fail on non-number postId (null)', () => {
                    const postId = null

                    expect(() => logic.addLike(postId))
                        .to.throw(Error, `${postId} is not a number`)
                })




                afterEach(() => logic.logout())
            })

        })


    })

    describe('retrieveUser', () => {
        describe('with existing user', () => {
            let username, password, text, postId

            beforeEach(() => {
                const name = 'John', surname = 'Doe'

                username = `jd-${Math.random()}`
                password = `123-${Math.random()}`

                text = `hello ${Math.random()}`

                return logic.registerUser(name, surname, username, password)
                    .then(() => logic.login(username, password))
            })


            it('should sucessfully retrieve name of required user', () => 
                logic.retriveUser(logic._userId)
                    .then(user => expect(user).to.equal(name))
                    
            )

            afterEach(() => logic.logout())
        })



    })




})