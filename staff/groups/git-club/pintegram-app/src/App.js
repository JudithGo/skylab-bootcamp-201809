import React, { Component } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import AddPost from './components/AddPost'
import Home from './components/Home'
import Error from './components/Error'
import Landing from './components/Landing'
import logic from './logic'
import { Route, withRouter, Redirect } from 'react-router-dom'
import OtherProfile from './components/OtherProfile'



class App extends Component {
    state = { error: null, post : false, otherUser: false}

    handleRegisterClick = () => this.props.history.push('/register')

    handleLoginClick = () => this.props.history.push('/login')

    handleRegister = (name, surname, username, password) => {
        try {
            logic.registerUser(name, surname, username, password)
                .then(() => {
                    this.setState({ error: null }, () => this.props.history.push('/login'))
                })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleLogin = (username, password) => {
        try {
            logic.login(username, password)
                .then(() =>  {
                    this.setState({error : null}, () => this.props.history.push('/home'))
                } )
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handlePost = () =>{
        this.props.history.push('/addpost')
        this.setState({post: true, profile: false})
    }

    handleProfile = () =>{
        this.props.history.push('/profile')
        this.setState({post: false, profile: true})
    }


    handleAddPost = (url, text) =>{
        logic.createPost(url, text)
        .then(this.setState({post : false, profile: false}))
    }

    handleLogoutClick = () => {
        logic.logout()

        this.props.history.push('/')
    }

    handleGoBack = () => this.props.history.push('/')
    
    handleGoBack2 = () => {
        this.props.history.push('/home')
        this.setState({post : false, profile: false})
    }

    handleUserSearch = (name) =>{
  
     
        logic.searchUserByName(name)
            .then(user =>{
                if (user){
                    this.setState({otherUser: user})
                    this.props.history.push(`/user/${this.state.otherUser.id}`)
                    this.setState({post: false, otherUser: true})
                }
            } )
    }


    render() {
        const { error, post, profile, otherUser } = this.state

        return <div>
            <Route exact path="/" render={() => !logic.loggedIn ? <Landing onRegisterClick={this.handleRegisterClick} onLoginClick={this.handleLoginClick} /> : <Redirect to="/home" />} />
            <Route path="/register" render={() => !logic.loggedIn ? <Register onRegister={this.handleRegister} onGoBack={this.handleGoBack} /> : <Redirect to="/home" />} />
            <Route path="/login" render={() => !logic.loggedIn ? <Login onLogin={this.handleLogin} onGoBack={this.handleGoBack} /> : <Redirect to="/home" />} />
            {error && <Error message={error} />}
            <Route path="/home" render={() => logic.loggedIn && !post && !profile ? <Home onLogout={this.handleLogoutClick} onPost={this.handlePost} onProfile={this.handleProfile} onUserSearch={this.handleUserSearch} /> : <Redirect to="/" />} />
            <Route path="/addpost" render={() => logic.loggedIn && post && !profile ? <AddPost onLogout={this.handleLogoutClick} onProfile={this.handleProfile} onPost={this.handleAddPost} onGoBack={this.handleGoBack2} /> : <Redirect to="/home" />} />
            <Route path="/profile" render={() =>logic.loggedIn && profile && !post? <Profile onLogout={this.handleLogoutClick} onPost={this.handlePost} onGoBack={this.handleGoBack2} /> : <Redirect to="/home" />} />
            <Route path="/user/:id" render={ ()=>logic.loggedIn && !post && !profile && otherUser ?  <OtherProfile onLogout={this.handleLogoutClick} id={this.props.match.params.id} onPost={this.handlePost} onInitialize={this.state.otherUser}  onGoBack={this.handleGoBack2}/> :<Redirect to="/home"/>}/>
            {/* {this.state.comment && <AddComment />} */}
        </div>
    }
}

export default withRouter(App)
