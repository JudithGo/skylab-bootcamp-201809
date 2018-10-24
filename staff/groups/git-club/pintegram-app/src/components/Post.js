import React, { Component } from 'react'
import logic from '../logic'
// import AddComment from './AddComment'

class Post extends Component {
    state = { postId:this.props.id, url:this.props.url, text: this.props.text, liked: null, likes: undefined, user: null}

    componentDidMount() {
        logic.retriveUser(this.props.user)
            .then(user => { this.setState({ user }) })
        
        logic.likesPost(this.state.postId)
            .then(likes => { this.setState({ likes }) })
       
        logic.likedPost(this.state.postId)
            .then(liked => { this.setState({ liked }) })
        
    }

    handleLikePost = () => {
        logic.addLike(this.state.postId)
        .then(Promise.all([logic.likesPost(this.state.postId), logic.likedPost(this.state.postId)])
            .then(([likes, liked]) => {
                this.setState({ likes, liked})
            }))

        // logic.addLike(this.state.postId)
        //    .then(logic.likesPost(this.state.postId).then(likes => { this.setState({ likes })}))
        //    .then(logic.likedPost(this.state.postId).then(liked => { this.setState({ liked })}))
    }

    handleAddComment = () => {
        
    }

    handleComment = () => {
        document.getElementsByClassName("comment").style.display="block"
        
    }

    handleUserSearch = (event) => {
        event.preventDefault()
        // const userSearch = this.state.user
        this.props.onUserSearch(this.state.user)
    }

    render() {
        return <article className="post">
            <div className="post__justify">
            <div className="post__center">
            <a className="post__text" onClick={this.handleUserSearch}>{this.state.user}</a>
            <img className="post__img" src={this.state.url}></img>
            <div className="post__icon">
            {!this.state.liked ? <i onClick={this.handleLikePost} className="far fa-heart icon"></i> : <i className="fas fa-heart icon"></i>}{this.state.likes}
            <i onClick={this.handleComment} className="fas fa-comment icon"></i>
            </div>
            <p className="post__text post__text-margin">{this.state.text}</p> 
            {/* <p className="comments"></p> */}
            <textarea className="comment"/>
            </div> 
            </div>    
        </article>
    }
}

export default Post