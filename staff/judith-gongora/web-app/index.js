require('dotenv').config()
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const logic = require('./logic')
const package = require('./package.json')

const { argv: [, , port = process.env.PORT || 8080] } = process

const app = express()

app.use(express.static('./public'))
app.set('view engine', 'pug') //Configura el metodo de render en view engine con el lenguaje pug

const formBodyParser = bodyParser.urlencoded({ extended: false }) //Variable que codifica en utf8 en parse del body. extended es como te devuelve en false queryString

const mySession = session({
    secret: 'my super secret', //Secreto que firma la session
    cookie: { maxAge: 60 * 60 * 24 }, //Caduca al minuto
    resave: true, // guarda de nuevo cuando se guarda en la session store
    saveUninitialized: true, //Guarda al inicializar
    store: new FileStore({ //Donde guardar los sessions
        path: './.sessions'
    })
})

app.use(mySession) //De esta manera permitimos el uso de mySession en cualquier llamada app.

app.get('/', (req, res) => {
    req.session.error = null

    res.render('landing')
})

app.get('/register', (req, res) => {
    res.render('register', { error: req.session.error })
})

app.post('/register', formBodyParser, (req, res) => {
    const { name, surname, username, password } = req.body

    try {
        logic.registerUser(name, surname, username, password)
            .then(() => {
                req.session.error = null

                res.render('register-confirm', { name })
            })
            .catch(({ message }) => {
                req.session.error = message

                res.redirect('/register')
            })
    } catch ({ message }) {
        error = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    res.render('login', { error: req.session.error })
})

app.post('/login', formBodyParser, (req, res) => {
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password)
            .then(id => {
                req.session.userId = id

                req.session.error = null

                res.redirect('/home')
            })
            .catch(({ message }) => {
                req.session.error = message

                res.redirect('/login')
            })
    } catch ({ message }) {
        error = message

        res.redirect('/login')
    }
})

app.get('/home', (req, res) => {
    const id = req.session.userId

    if (id) {
        try {
            logic.retrieveUser(id)
                .then(({ name }) => res.render('home', { name }))
                .catch(({ message }) => {
                    req.session.error = message

                    res.redirect('/')
                })
        } catch ({ message }) {
            req.session.error = message

            res.redirect('/')
        }
    } else res.redirect('/')
})

app.get('/postits', (req, res) => {
    const id = req.session.userId

    if (id) {

        try {
            logic.retrieveUser(id)
                
                .then(({ name, postits }) => res.render('postits', { name, postits }))
                .catch(({ message }) => {
                    req.session.error = message

                    res.redirect('/postits')
                })
        } catch ({ message }) {
            req.session.error = message

            res.redirect('/home')
        }
    } else res.redirect('/home')
 
})

app.post('/postits', formBodyParser, (req, res) => {
    const { content } = req.body
    const id = req.session.userId

    try {

        logic.createPostit(id, content)

        error = null

        res.redirect('/postits')

    } catch ({ message }) {
        error = message

        res.redirect('/postits')
    }
})

app.post('/postit-delete/:id', (req, res) => {
    const idPostit  = req.params.id
    const id = req.session.userId
    
    try {

        logic.deletePostit(Number(idPostit), id)

        error = null

        res.redirect('/postits')

    } catch ({ message }) {
        error = message

        res.redirect('/postits')
    }
})

app.post('/postit-update/:id', formBodyParser, (req, res) => {
    const idPostit  = req.params.id
    const id = req.session.userId
    const { contentmod } = req.body
    
    try {

        logic.updatePostit(Number(idPostit), id, contentmod)

        error = null

        res.redirect('/postits')

    } catch ({ message }) {
        error = message

        res.redirect('/postits')
    }
})

app.get('/logout', (req, res) => {
    req.session.userId = null

    res.redirect('/')
})

app.listen(port, () => console.log(`Server ${package.version} up and running on port ${port}`))