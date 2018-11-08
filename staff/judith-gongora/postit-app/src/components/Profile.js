import React, { Component } from 'react'
import logic from '../logic'

class Profile extends Component{
    state = { name : '', surname : '', pass : '', npass : '', rnpass : '' }

    componentDidMount() {

        const { userId, token } = this.props

        logic.retrieveUser(userId, token)
            .then(user => { this.setState({ name : user.name, surname : user.surname }) })
    }

    handleChangeName = event => { 

        this.setState({ name : event.target.value})
    
    }
    handleChangeSurname = event => { 

        this.setState({ surname : event.target.value})
    
    }
    handleChangeNpass = event => { 

        this.setState({ npass : event.target.value})
    
    }
    handleChangeRnpass = event => { 

        this.setState({ rnpass : event.target.value})
    
    }

    handleChangePass = event => { 

        this.setState({ password : event.target.value})
    
    }
    
    handleSubmit = event => {
        event.preventDefault()
        this.props.handleUpdateProfile(this.state.name, this.state.surname, this.state.npass, this.state.rnpass,this.state.password)
        
        
    }

    render() {
        return <div>
            <button onClick={this.props.handleHomeClick}>Back home</button>
           <form className="form-login">
                <div className="form-group">
                    <label htmlFor="exampleInputName1">Name </label>
                    <input type="name" className="form-control" id="exampleInputName1" aria-describedby="NameHelp" placeholder="Enter name" value={this.state.name} onChange={this.handleChangeName}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputSurname1">Surname </label>
                    <input type="Surname" className="form-control" id="exampleInputSurname1" aria-describedby="SurnameHelp" placeholder="Enter surname" value={this.state.surname} onChange={this.handleChangeSurname}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">New password </label>
                    <input type="Email" className="form-control" id="exampleInputEmail1" aria-describedby="EmailHelp" placeholder="Enter email" value={this.state.npass} onChange={this.handleChangeNpass}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputUsername1">Repeat new password </label>
                    <input type="Username" className="form-control" id="exampleInputUsername1" aria-describedby="UsernameHelp" placeholder="Enter username" value={this.state.rnpass} onChange={this.handleChangeRnpass}/>
                   
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.password} onChange={this.handleChangePass}/>
                </div>
                <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
            </form>
        
    </div>
    }

}
 export default Profile
