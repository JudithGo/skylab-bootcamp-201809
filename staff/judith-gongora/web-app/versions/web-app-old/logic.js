const { User, Postit } = require('./data')


const logic = {
    registerUser(name, surname, username, password) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw Error('name is empty or blank')
        if (!surname.trim()) throw Error('surname is empty or blank')
        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        let user = User.findByUsername(username)

        if (user) throw Error(`username ${username} already registered`)

        user = new User(name, surname, username, password)

        user.save()
    },

    authenticateUser(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        const user = User.findByUsername(username)

        if (!user || user.password !== password) throw Error('invalid username or password')

        return user.id
    },

    retrieveUser(id) {
        if (typeof id !== 'number') throw TypeError(`${id} is not a number`)

        const user = User.findById(id)

        if (!user) throw Error(`user with id ${id} not found`)

        const _user = new User(
            user.name,
            user.surname,
            user.username
        )

        _user.id = user.id
        _user.postits = user.postits

        delete _user.password

        return _user
    },

    createPostit(id, content) {
        console.log('entra')

        if (typeof id !== 'number') throw TypeError(`${id} is not a number`)

        if (typeof content !== 'string') throw TypeError(`${content} is not a string`)

        if (!content.trim()) throw Error('content is empty or blank')

        const user = User.findById(id)

        if (!user) throw Error(`user with id ${id} not found`)

        const postit = new Postit (content)

        const _user = new User(
            user.name,
            user.surname,
            user.username,
            user. password
        )
        user.postits.push(postit)

        user.postits.forEach(postit => {
            _user.postits.push(postit)
            
        })

        _user.id = user.id

        _user.save()
    },


    deletePostit(idPostit, idUser) {
        if (typeof idPostit !== 'number') throw TypeError(`${idPostit} is not a number`)

        const user = User.findById(idUser)

        if (!user) throw Error(`user with id ${idUser} not found`)

        const _user = new User(
            user.name,
            user.surname,
            user.username,
            user. password
        )
        _user.postits = user.postits.filter(postit => postit.id === idPostit)
            console.log( _user.postits)
        _user.id = user.id

        _user.save()
    }
}



module.exports = logic