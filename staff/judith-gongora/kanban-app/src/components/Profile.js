import React, { Component } from 'react'
import logic from '../logic';
import PopupUpload from './PopupUpload'

class Profile extends Component {
    state = { name: this.props.name, surname: this.props.surname, password: '', newPassword: '', confirmPassword: '', username: '', img: null, changePhoto: false  }

    componentDidMount() {
        logic.retrieveImage()
            .then(img => this.setState({ img }))
        // TODO error handling!
    }

    onNameChange = (event) => {
        const name = event.target.value
        this.setState({ name })
    }

    onSurnameChange = (event) => {
        const surname = event.target.value
        this.setState({ surname })
    }

    onUserNameChange = (event) => {

        const username = event.target.value
        this.setState({username})
    }


    onNewPasswordChange = (event) => {
        const newPassword = event.target.value
        this.setState({ newPassword })
    }

    onConfirmPasswordChange = (event) => {
        const confirmPassword = event.target.value
        this.setState({ confirmPassword })
    }


    onPasswordChange = (event) => {
        const password = event.target.value
        this.setState({ password })
    }

    handleSubmitChange = (file) =>{
        const data = new FormData()
        data.append('photo', file, file.name)
        console.log(data)
        logic.uploadPhoto(data)
            .then(logic.retrieveImage())
            .then(img => this.setState({ img }))
    }

    handleUpload = () => {
        this.setState({changePhoto: true})
    }

    handleClosePopupUpload = () => {
        this.setState({changePhoto:''})
    }

    handleSubmit = (event) => {

        event.preventDefault()
        const { newPassword, confirmPassword, username, name, surname, password } = this.state

        if (newPassword === confirmPassword) logic.sendUpdatedInfo(this.props.id, name, surname, username, newPassword, password)

        else console.log('error')
    }
    render() {
        return <div className="profile__container"> 
        {this.state.changePhoto && <PopupUpload key={this.state.share} onClosePopupUpload={this.handleClosePopupUpload} onSubmitChange={this.handleSubmitChange}/>}
        <header>
            <section>
                <img src="https://res.cloudinary.com/skylabcoders/image/upload/v1541952996/pintegram/images.png"></img>
                <h1>Kanban App</h1>
            </section>  <h1>Profile Page</h1>  
            <div><button onClick={this.props.onBack}>Postits</button></div><div><button onClick={this.props.onLogout}>Logout</button></div> 
        </header>
        <div className="profile-center">
            <div className="img__container">
                <img className="profile__img-small " src={this.state.img ? this.state.img : "https://res.cloudinary.com/skylabcoders/image/upload/v1540218439/skylabcoders/profile-icon-png-910.png"}></img> 
                <i onClick={this.handleUpload} className="fas fa-pen icon icon__profile"></i>
            </div>
            <div className="form__container-profile">
                <form >
                    <label>username</label>
                    <input type="text" onChange={this.onUserNameChange} defaultValue={this.props.username}></input>
                    <label>Name</label>
                    <input type="text" onChange={this.onNameChange} defaultValue={this.props.name}></input>
                    <label>Surname</label>
                    <input type="text" onChange={this.onSurnameChange} defaultValue={this.props.surname}></input>
                    <label>New Password</label>
                    <input onChange={this.onNewPasswordChange} type="password"></input>
                    <label>Confirm Password</label>
                    <input onChange={this.onConfirmPasswordChange} type="password"></input>

                    <label>Enter your password to make changes</label>
                    <input onChange={this.onPasswordChange} type="password" required></input>
                    <button type="submit" onClick={this.handleSubmit}>Submit</button>

                </form>
            </div>
        </div>
</div>
        
        
        
        
        
    }
}

export default Profile