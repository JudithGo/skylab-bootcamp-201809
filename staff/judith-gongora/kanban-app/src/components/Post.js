import React, { Component } from 'react'
import logic from '../logic'

class Post extends Component {
    state = { text: this.props.text, status: this.props.status, mine: false}

    componentDidMount(){
        if(this.props.user === logic._userId) {
            this.setState({mine : true})
        }
    }

    handleChange = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleShare = () => {
        this.props.onHandleShare(this.props.id)
    }

    handleBlur = () => {
        this.props.onUpdatePost(this.props.id, this.state.text, this.state.status)
    }

    render() {
        return <article className="card" draggable onDragStart={ this.props.onDragStart }>
            <textarea defaultValue={this.state.text} onChange={this.handleChange} onBlur={this.handleBlur} />

            {this.state.mine && <button onClick={this.handleShare}>  <i className="fas fa-share-alt-square"></i></button> }
        </article>
    }
}

export default Post