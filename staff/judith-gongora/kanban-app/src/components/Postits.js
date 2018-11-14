import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'
import Popup from './Popup'
// import { set } from 'mongoose';

class Postits extends Component {
    state = { postits: [], todo: [], doing: [], review: [], done: [], share : '' }

    componentDidMount() {
        logic.listPostits()
            .then(postits => this.setState({ postits }))
            .then(() =>{
                const todo = this.state.postits.filter(postit => postit.status === 'todo')
                this.setState({todo})
            })
            .then(() =>{
                const doing = this.state.postits.filter(postit => postit.status === 'doing')
                this.setState({doing})
            })
            .then(() =>{
                const review = this.state.postits.filter(postit => postit.status === 'review')
                this.setState({review})
            })
            .then(() =>{
                const done = this.state.postits.filter(postit => postit.status === 'done')
                this.setState({done})
            })
            

        // TODO error handling!
    }

    handleSubmit = (text, status) => {
        try {
           
            logic.addPostit(text, status)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits }))
                .then(() =>{
                    const todo = this.state.postits.filter(postit => postit.status === 'todo')
                    this.setState({todo})
                })
                .then(() =>{
                    const doing = this.state.postits.filter(postit => postit.status === 'doing')
                    this.setState({doing})
                })
                .then(() =>{
                    const review = this.state.postits.filter(postit => postit.status === 'review')
                    this.setState({review})
                })
                .then(() =>{
                    const done = this.state.postits.filter(postit => postit.status === 'done')
                    this.setState({done})
                })
        } catch ({ message }) {
            alert(message) // HORROR! FORBIDDEN! ACHTUNG!
        }
    }

    handleSubmitShare = (text) => {
        try {
           
            logic.assignBuddie(this.state.share, text)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits }))
                .then(() =>{
                    const todo = this.state.postits.filter(postit => postit.status === 'todo')
                    this.setState({todo})
                })
                .then(() =>{
                    const doing = this.state.postits.filter(postit => postit.status === 'doing')
                    this.setState({doing})
                })
                .then(() =>{
                    const review = this.state.postits.filter(postit => postit.status === 'review')
                    this.setState({review})
                })
                .then(() =>{
                    const done = this.state.postits.filter(postit => postit.status === 'done')
                    this.setState({done})
                })
        } catch ({ message }) {
            alert(message) // HORROR! FORBIDDEN! ACHTUNG!
        }
    }

    handleShare = (share) => {
        this.setState({share})
    }

    handleClosePopup = () => {
        this.setState({share:''})
    }

    handleAddBuddie = (text) => {
        try {
            console.log(text)
            logic.addBuddie(text)
        } catch ({ message }) {
            alert(message) // HORROR! FORBIDDEN! ACHTUNG!
        }
    }

    // TODO error handling!

    handleRemovePostit = id =>
        logic.removePostit(id)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))
            .then(() =>{
                const todo = this.state.postits.filter(postit => postit.status === 'todo')
                this.setState({todo})
            })
            .then(() =>{
                const doing = this.state.postits.filter(postit => postit.status === 'doing')
                this.setState({doing})
            })
            .then(() =>{
                const review = this.state.postits.filter(postit => postit.status === 'review')
                this.setState({review})
            })
            .then(() =>{
                const done = this.state.postits.filter(postit => postit.status === 'done')
                this.setState({done})
            })

    // TODO error handling!


    handleModifyPostit = (id, text, status) =>
        logic.modifyPostit(id, text, status)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))
            .then(() =>{
                const todo = this.state.postits.filter(postit => postit.status === 'todo')
                this.setState({todo})
            })
            .then(() =>{
                const doing = this.state.postits.filter(postit => postit.status === 'doing')
                this.setState({doing})
            })
            .then(() =>{
                const review = this.state.postits.filter(postit => postit.status === 'review')
                this.setState({review})
            })
            .then(() =>{
                const done = this.state.postits.filter(postit => postit.status === 'done')
                this.setState({done})
            })

    // TODO error handling!


    onDragOver = ev => {
        ev.preventDefault();
    }

    onDragStart = (ev, id, text) => {
        ev.dataTransfer.setData('id', id)
        ev.dataTransfer.setData('text', text)   
    }

    onDrop = (ev, status) => {
        const idPostit = ev.dataTransfer.getData('id')
        const text = ev.dataTransfer.getData('text')
        if (ev.target.classList.contains('dropzone-remove')) {
            this.handleRemovePostit (idPostit)
        } else{
            this.handleModifyPostit (idPostit, text, status)
        }
       
    }


    render() {
        return <div className="home__container"> 
                <header>
                    <section>
                        <img src="https://res.cloudinary.com/skylabcoders/image/upload/v1541952996/pintegram/images.png"></img>
                        <h1>Kanban App</h1>
                    </section>    
                    <div><button onClick={this.props.onHandleProfileClick}>Profile</button></div><div><button onClick={this.props.onLogout}>Logout</button></div> 
                </header>

                <div className="grid__postits">
                
                    <section className="list dropzone" onDragOver={this.onDragOver} onDrop={ event => this.onDrop(event, 'todo')}>
                    <header>
                        To Do
                    </header>
                    <InputForm onSubmit={this.handleSubmit}  status = 'todo' />
                        {this.state.todo.map(postit => <Post key={postit.id} text={postit.text} id={postit.id} user={postit.user} onUpdatePost={this.handleModifyPostit} onHandleShare={this.handleShare} status = 'todo' draggable='true' onDragStart={ event => this.onDragStart(event, postit.id, postit.text) }/>)}
                    </section>
                    <section className="list dropzone" onDragOver={this.onDragOver} onDrop={ event => this.onDrop(event, 'doing')}>
                    <header>
                        Doing
                    </header>
                    <InputForm onSubmit={this.handleSubmit} status= 'doing'/>
                        {this.state.doing.map(postit => <Post key={postit.id} text={postit.text} id={postit.id} user={postit.user} onUpdatePost={this.handleModifyPostit} onHandleShare={this.handleShare} status = 'doing' draggable='true' onDragStart={ event => this.onDragStart(event, postit.id, postit.text) }/>)}
                    </section>
                    <section className="list dropzone" onDragOver={this.onDragOver} onDrop={ event => this.onDrop(event, 'review')}>
                        <header>
                            Review
                        </header>
                        <InputForm onSubmit={this.handleSubmit} status='review'/>
                        {this.state.review.map(postit => <Post key={postit.id} text={postit.text} id={postit.id} user={postit.user} onUpdatePost={this.handleModifyPostit} onHandleShare={this.handleShare} status = 'review' draggable='true' onDragStart={ event => this.onDragStart(event, postit.id,postit.text) }/>)}
                    </section>
                    <section className="list dropzone" onDragOver={this.onDragOver} onDrop={ event => this.onDrop(event, 'done')}>
                    <header>
                        Done
                    </header>
                    <InputForm onSubmit={this.handleSubmit} status='done'/>
                        {this.state.done.map(postit => <Post key={postit.id} text={postit.text} id={postit.id} user={postit.user} onUpdatePost={this.handleModifyPostit} onHandleShare={this.handleShare} status = 'done' draggable='true' onDragStart={ event => this.onDragStart(event, postit.id, postit.text) }/>)}
                    </section>           
                     
            </div>
            
            <div className="remove">
                <p className="remove__text">Drop here to remove</p>
                <section className="dropzone-remove" onDragOver={this.onDragOver} onDrop={ event => this.onDrop(event, 'remove')} >    
                </section> 
            </div>   
            <div className="buddie">
                <section className="addBuddie">
                    <p className="addBuddie__text">Add buddies here</p>
                    <InputForm onSubmit={this.handleAddBuddie}/>
                </section>
            </div>   
            {this.state.share && <Popup key={this.state.share} onClosePopup={this.handleClosePopup} onSubmitShare={this.handleSubmitShare}/>}
        </div>
    }
}

export default Postits
