import React, { Component } from 'react'
import logic from '../logic'

class PopupUpload extends Component {
    state = { file: null }

    componentDidMount() {
        logic.listBuddies()
            .then(buddies => this.setState({ buddies }))
    }

    handleselectedFile = event => {
        this.setState({file: event.target.files[0]})
    }

    handleUpload = event => {
        event.preventDefault()
        this.props.onSubmitChange(this.state.file)
        this.props.onClosePopupUpload()
        this.setState({ file: null })
    }

    render() {
        return <section className="popup-upload">
            <form encType="multipart/form-data" onSubmit={this.handleUpload}>
                <i onClick={this.props.onClosePopupUpload} className="fas fa-times"></i>
                <input type="file" name="photo" id="photo" onChange={this.handleselectedFile} />
                <button >Upload</button>
            </form>
        </section>
    }
}

export default PopupUpload