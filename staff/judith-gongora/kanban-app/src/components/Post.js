import React, { Component } from 'react'

class Post extends Component {
    state = { text: this.props.text, status: this.props.status, share: false }


    handleChange = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleShare = () => {

        this.setState({ share : true })
    }

    handleBlur = () => {
        this.props.onUpdatePost(this.props.id, this.state.text, this.state.status)
    }

    render() {
        return <article className="card" draggable onDragStart={ this.props.onDragStart }>
            <textarea defaultValue={this.state.text} onChange={this.handleChange} onBlur={this.handleBlur} />

            <button onClick={() => this.handleShare}><i className="fas fa-share-alt-square"></i></button>
        </article>
    }
}

export default Post