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

        return User.findByUsername(username)
            .then(user => {
                if (user) throw Error(`username ${username} already registered`)

                user = new User({ name, surname, username, password })

                return user.save()
            })
    },

    authenticateUser(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        return User.findByUsername(username)
            .then(user => {
                if (!user || user.password !== password) throw Error('invalid username or password')

                return user.id
            })
    },

    retrieveUser(id) {
        if (typeof id !== 'number') throw TypeError(`${id} is not a number`)

        return User.findById(id)
            .then(user => {

                if (!user) throw Error(`user with id ${id} not found`)

                const _user = user.toObject()

                _user.id = id

                delete _user.password

                return _user
            })
    },

    createPostit(id, content) {
        if (typeof id !== 'number') throw TypeError(`${id} is not a number`)

        if (typeof content !== 'string') throw TypeError(`${content} is not a string`)

        if (!content.trim()) throw Error('content is empty or blank')

        return User.findById(id)
            .then(user => {
                if (!user) throw Error(`user with id ${id} not found`)
                
                const postit = new Postit (content)
               
                user.postits.push(postit)

                return user.save()
            })
    },

    /**
     * 
     * @param {number} idPostit 
     * @param {number} idUser 
     */
    deletePostit(idPostit, idUser) {

        if (typeof idPostit !== 'number') throw TypeError(`${idPostit} is not a number`)
        if (typeof idUser !== 'number') throw TypeError(`${idUser} is not a number`)

        return User.findById(idUser)
        .then(user => {

            if (!user) throw Error(`user with id ${id} not found`)
           
            user.postits = user.postits.filter(postit => postit.id !== idPostit)
            return user.save()
        })
        
    },

    updatePostit(idPostit, idUser, content) {

        if (typeof idPostit !== 'number') throw TypeError(`${idPostit} is not a number`)
        if (typeof idUser !== 'number') throw TypeError(`${idUser} is not a number`)
        if (typeof content !== 'string') throw TypeError(`${content} is not a string`)

        if (!content.trim()) throw Error('content is empty or blank')

        return User.findById(idUser)
        .then(user => {

            if (!user) throw Error(`user with id ${id} not found`)
           
            const postit = user.postits.find(postit => postit.id === idPostit)

            postit.content = content
            return user.save()
        })
        
    }
}

module.exports = logic