const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const jwt = require('jsonwebtoken')
const bearerTokenParser = require('../utils/bearer-token-parser')
const jwtVerifier = require('./jwt-verifier')
const routeHandler = require('./route-handler')
const fileUpload = require('express-fileupload');
const fs = require('fs');


const jsonBodyParser = bodyParser.json()

const router = express.Router()

const { env: { JWT_SECRET } } = process

router.post('/users', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { name, surname, username, password } = req.body

        return logic.registerUser(name, surname, username, password)
            .then(() => {
                res.status(201)

                res.json({
                    message: `${username} successfully registered`
                })
            })
    }, res)
})

router.post('/auth', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { username, password } = req.body
        return logic.authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, JWT_SECRET)

                res.json({
                    data: {
                        id,
                        token
                    }
                })
            })
    }, res)
})

router.get('/users/:id', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.retrieveUser(id)
            .then(user =>
                res.json({
                    data: user
                })
            )
    }, res)
})

router.patch('/users/:id', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub, body: { name, surname, username, newPassword, password } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.updateUser(id, name ? name : null, surname ? surname : null, username ? username : null, newPassword ? newPassword : null, password)
            .then(() =>
                res.json({
                    message: 'user updated'
                })
            )
    }, res)
})

router.patch('/users/:id/buddie', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub, body: { username } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.addBuddieUser(id, username)
            .then(() =>
                res.json({
                    message: 'buddie added'
                })
            )
    }, res)
})

router.post('/users/:id/postits', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id }, body: { text, status } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.addPostit(id, text, status)
            .then(() => res.json({
                message: 'postit added'
            }))

    }, res)
})

router.get('/users/:id/postits', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.listPostits(id)
            .then(postits => res.json({
                data: postits
            }))
    }, res)
})

router.post('/users/:id/upload', [bearerTokenParser, jwtVerifier, fileUpload()], (req, res) => {
    routeHandler(() => {
        
        const { sub, params: { id }, files: { photo } } = req
        
        if (id !== sub) throw Error('token sub does not match user id')
        
        return logic.uploadPhoto(id, photo.name, photo.data)
            .then(() => res.json({
                message: 'photo added'
            }))

    }, res)
})

router.get('/users/:id/upload', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id } } = req

        if (id !== sub) throw Error('token sub does not match user id')
        
        // return logic.retrievePhoto(id)
        //     .then(file => res.download(file))
        // }, res)
        return logic.retrievePhoto(id)
            .then(file => {
                var bitmap = fs.readFileSync('/Users/judith/bootcamp/collab/skylab-bootcamp-201809/staff/judith-gongora/kanban-api/' + `${file}`);
                let data = new Buffer(bitmap).toString('base64')
                return data = `data:image/png;base64,${data}`
            })
            .then(data=> res.json({
            data: data,
            message: 'ok'
        }))
    }, res)
        
})

router.get('/users/:id/buddies', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.retrieveBuddies(id)
            .then(buddies => res.json({
                data: buddies
            }))
    }, res)
})

router.put('/users/:id/postits/:postitId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, postitId }, body: { text, status } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.modifyPostit(id, postitId, text, status)
            .then(() => res.json({
                message: 'postit modified'
            }))
    }, res)
})

router.patch('/users/:id/postits/:postitId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, postitId }, body: { username } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.assignToUser(id, postitId, username)
            .then(() => res.json({
                message: 'buddie assigned'
            }))
    }, res)
})

router.delete('/users/:id/postits/:postitId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, postitId } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.removePostit(id, postitId)
            .then(() => res.json({
                message: 'postit removed'
            }))
    }, res)

})

module.exports = router