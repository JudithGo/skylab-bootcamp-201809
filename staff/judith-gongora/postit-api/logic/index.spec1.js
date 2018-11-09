require('dotenv').config()

const { MongoClient } = require('mongodb')
const { User, Postit } = require('../data')
const logic = require('.')

const { expect } = require('chai')

const { env: { MONGO_URL } } = process

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {
    let users
    before(() => {
        client = new MongoClient(MONGO_URL, { useNewUrlParser: true })
        return client.connect()
            .then(() => {
                const db = client.db('postit-test')

                users = db.collection('users')

                User._collection = users
            })
    })

    beforeEach(() => users.deleteMany() )

    afterEach(() => users.deleteMany() )

    describe('user', () => {
        !false && describe('register', () => {
            let name, surname, username, password

            beforeEach(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                username = `username-${Math.random()}`
                password = `password-${Math.random()}`
            })

            it('should succeed on correct data', () =>
                logic.registerUser(name, surname, username, password)
                    .then(() => users.find().toArray())
                    .then(_users => {

                        const [user] = _users

                        expect(user.id).to.be.a('string')
                        expect(user.name).to.equal(name)
                        expect(user.surname).to.equal(surname)
                        expect(user.username).to.equal(username)
                        expect(user.password).to.equal(password)
                    })
            )

            it('should fail on undefined name', () => {
                expect(() => logic.registerUser(undefined, surname, username, password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases
        })

        !false && describe('authenticate', () => {
            let user

            beforeEach(() => {
                
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                return user.save()
            })

            it('should authenticate on correct credentials', () => {
                const { username, password } = user

                return logic.authenticateUser(username, password)
                    .then(id => {
                        expect(id).to.exist
                        expect(id).to.be.a('string')

                        return users.find().toArray()

                        .then (_users =>{
                            expect(_users[0].id).to.equal(id)
                        })
                    })
            })

            it('should fail on undefined username', () => {
                expect(() => logic.authenticateUser(undefined, user.password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases
        })

        !false && describe('update user', () => {
            let user
            let npassword
            beforeEach(() => {
        
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                return user.save()
            })

            it('should update user on correct credentials', () => {
                const { id, surname, password } = user
                npassword = ' '
                const newname = 'new name'
                return logic.updateUser(id, newname, surname, npassword, password)
                    .then(()=> users.find().toArray()
                        .then (_users =>{
                        expect(_user[0].id).to.equal(id)
                        expect(_user[0].name).to.equal(newname)
                        })
                    )
            })

            it('should fail on wrong password', () => {
                let { id, name, surname, password } = user
                npassword = ' '
                password = 'other'
                expect(() => logic.updateUser(id, name, surname, npassword, password)).to.throw('invalid password')
            })

            // TODO other test cases
        })

        !false && describe('retrieve', () => {
            let user, postit

            beforeEach(() => {
                postit = new Postit('hello text')
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123', postits: [postit] })

                return user.save()
            })

            it('should succeed on valid id', () =>
                logic.retrieveUser(user.id)
                    .then(_user => {
                        expect(_user).not.to.be.instanceof(User)

                        const { id, name, surname, username, password, postits } = _user

                        expect(id).to.exist
                        expect(id).to.equal(user.id)
                        expect(name).to.equal(user.name)
                        expect(surname).to.equal(user.surname)
                        expect(username).to.equal(user.username)
                        expect(password).to.be.undefined
                        expect(postits).not.to.exist
                    })
            )
        })
    })

    describe('postits', () => {
        !false && describe('add', () => {
            let user, text

            beforeEach(() => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                fs.writeFileSync(User._file, JSON.stringify([user]))

                text = `text-${Math.random()}`
            })

            it('should succeed on correct data', () =>
                logic.addPostit(user.id, text)
                    .then(() => {
                        const json = fs.readFileSync(User._file)

                        const users = JSON.parse(json)

                        expect(users.length).to.equal(1)

                        const [_user] = users

                        expect(_user.id).to.equal(user.id)

                        const { postits } = _user

                        expect(postits.length).to.equal(1)

                        const [postit] = postits

                        expect(postit.text).to.equal(text)
                    })
            )

            // TODO other test cases
        })

        !false && describe('list', () => {
            let user, postit, postit2

            beforeEach(() => {
                postit = new Postit({ text: 'hello text' })
                postit2 = new Postit({ text: 'hello text 2' })
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123', postits: [postit, postit2] })

                fs.writeFileSync(User._file, JSON.stringify([user]))
            })

            it('should succeed on correct data', () =>
                logic.listPostits(user.id)
                    .then(postits => {
                        const json = fs.readFileSync(User._file)

                        const users = JSON.parse(json)

                        expect(users.length).to.equal(1)

                        const [_user] = users

                        expect(_user.id).to.equal(user.id)

                        const { postits: _postits } = _user

                        expect(_postits.length).to.equal(2)

                        expect(postits.length).to.equal(_postits.length)

                        const [_postit, _postit2] = _postits

                        expect(_postit.id).to.equal(postit.id)
                        expect(_postit.text).to.equal(postit.text)

                        expect(_postit2.id).to.equal(postit2.id)
                        expect(_postit2.text).to.equal(postit2.text)

                        const [__postit, __postit2] = postits

                        expect(_postit.id).to.equal(__postit.id)
                        expect(_postit.text).to.equal(__postit.text)

                        expect(_postit2.id).to.equal(__postit2.id)
                        expect(_postit2.text).to.equal(__postit2.text)
                    })
            )
        })

        !false && describe('remove', () => {
            let user, postit

            beforeEach(() => {
                postit = new Postit({ text: 'hello text' })
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123', postits: [postit] })

                fs.writeFileSync(User._file, JSON.stringify([user]))
            })

            it('should succeed on correct data', () =>
                logic.removePostit(user.id, postit.id)
                    .then(() => {
                        const json = fs.readFileSync(User._file)

                        const users = JSON.parse(json)

                        expect(users.length).to.equal(1)

                        const [_user] = users

                        expect(_user.id).to.equal(user.id)

                        const { postits } = _user

                        expect(postits.length).to.equal(0)
                    })
            )
        })

        !false && describe('modify', () => {
            let user, postit, newText

            beforeEach(() => {
                postit = new Postit({ text: 'hello text' })
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123', postits: [postit] })

                newText = `new-text-${Math.random()}`

                fs.writeFileSync(User._file, JSON.stringify([user]))
            })

            it('should succeed on correct data', () =>
                logic.modifyPostit(user.id, postit.id, newText)
                    .then(() => {
                        const json = fs.readFileSync(User._file)

                        const users = JSON.parse(json)

                        expect(users.length).to.equal(1)

                        const [_user] = users

                        expect(_user.id).to.equal(user.id)

                        const { postits } = _user

                        expect(postits.length).to.equal(1)

                        const [postit] = postits

                        expect(postit.text).to.equal(newText)
                    })
            )
        })
    })
})