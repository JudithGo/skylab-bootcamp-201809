// import data from './data'
// const data = require('./data')

// const {Postit} = data

const logic = {
    _postits : [],
    _callApi(path, method, token, data) {
        const init = {
            method,
            headers: {}
        }

        if (method !== 'GET') {
            init.headers['Content-Type'] = 'application/json; charset=utf-8'
        }

        if (token) {
            init.headers.Authorization = `Bearer ${token}`
        }

        if (data) {
            init.body = JSON.stringify(data)
        }

        return fetch(`http://localhost:5000/api/${path}`, init)
            .then(res => res.json())
    },

    createUser(name, surname, email, username, password) {
        
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw Error('name is empty or blank')
        if (!surname.trim()) throw Error('surname is empty or blank')
        if (!email.trim()) throw Error('email is empty or blank')
        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')
 
        return this._callApi('users', 'POST', undefined, { name, surname, username, password })
        .then(res => {
            if (res.error) throw Error(res.error)
        })
        .catch(({message}) => console.log('error', message))
    },

    loginUser(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        return this._callApi('auth', 'POST', undefined, {username, password})
            .then(res => {
                
                if (res.error) throw Error(res.error)

                return res.data
            })
        
    },

    retrieveUser(userId, token) {
        
        if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)

        if (!userId.trim()) throw Error('userId is empty or blank')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)

        if (!token.trim()) throw Error('token is empty or blank')

        return fetch(`http://localhost:5000/api/users/${userId}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)

                return  res.data 
            })
    },

    updateUser(userId, token, name, surname, npassword, rnpassword, password) {
        
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
       
        if (typeof npassword !== 'string') throw TypeError(`${npassword} is not a string`)
        if (typeof rnpassword !== 'string') throw TypeError(`${rnpassword} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw Error('name is empty or blank')
        if (!surname.trim()) throw Error('surname is empty or blank')
        if (!userId.trim()) throw Error('user id is empty or blank')
        if (!token.trim()) throw Error('token is empty or blank')
    
        if (!password.trim()) throw Error('password is empty or blank')
        
        let body
        if (!npassword.trim() && !rnpassword.trim()) body = { name, surname, npassword, password }
        if (npassword.trim() && !rnpassword.trim()) throw Error('repeat new password is empty or blank')
        if (!npassword.trim() && rnpassword.trim()) throw Error('new password is empty or blank')
        if (npassword.trim() && rnpassword.trim() && npassword !== rnpassword) throw Error('the password are different')
        if (npassword.trim() && rnpassword.trim() && npassword === rnpassword) body = {name, surname, npassword, password}

 
        return this._callApi(`/users/${userId}/profile`, 'PUT', token, body)
        .then(res => {
            if (res.error) throw Error(res.error)
        })
        .catch(({message}) => console.log('error', message))
    },

    //POSTITS
    createPostit(text, userId, token) {
        
        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim()) throw Error('text is empty or blank')

        if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)

        if (!userId.trim()) throw Error('userId is empty or blank')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)

        if (!token.trim()) throw Error('token is empty or blank')

        return fetch(`http://localhost:5000/api/users/${userId}/postits`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    listPostits(userId, token) {
        if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)

        if (!userId.trim()) throw Error('userId is empty or blank')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)

        if (!token.trim()) throw Error('token is empty or blank')

        return fetch(`http://localhost:5000/api/users/${userId}/postits`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)

                return this._postits = res.data || []
            })
    },

    deletePostit(id, userId, token) {
  
        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

        if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)

        if (!userId.trim()) throw Error('userId is empty or blank')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)

        if (!token.trim()) throw Error('token is empty or blank')

        this._postits = this._postits.filter(postit => postit.id !== id)

        return fetch(`http://localhost:5000/api/users/${userId}/postits/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    editPost(id) {
        document.getElementById(id).disabled = false;
    },

    UpdatePostit(userId, token, id, index, text) {

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim()) throw Error('text is empty or blank')

        if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)

        if (!userId.trim()) throw Error('userId is empty or blank')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)

        if (!token.trim()) throw Error('token is empty or blank')

        this._postits.splice(index, 1, {text : text ,id : id})

        return fetch(`http://localhost:5000/api/users/${userId}/postits/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    }


}
module.exports = logic
// export default logic