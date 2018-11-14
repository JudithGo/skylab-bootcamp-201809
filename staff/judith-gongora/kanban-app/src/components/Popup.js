import React, { Component } from 'react'
import logic from '../logic'

class Popup extends Component {
    state = { text: '', buddies:[] }

    componentDidMount() {
        logic.listBuddies()
            .then(buddies => this.setState({ buddies }))
    }

    handleInput = event => {
        const text = event.target.value
        console.log(text)
        this.setState({ text })
    }

    // handleSubmit = event => {
    //     event.preventDefault()

    //     this.props.onSubmitShare(this.state.text)

    //     this.setState({ text: '' })
    // }
    handleSubmit = event => {
        event.preventDefault()

        this.props.onSubmitShare(this.state.text)
        this.props.onClosePopup()

        this.setState({ text: '' })
    }

    render() {
        return <section className="popup">
            {/* <form onSubmit={this.handleSubmit}>
                <i onClick={this.props.onClosePopup} className="fas fa-times"></i>
                <input value={this.state.text} placeholder="Username buddie here..." onChange={this.handleInput} />
                <button type="submit">Add contributor</button>
            </form> */}
            <form onSubmit={this.handleSubmit}>
            <i onClick={this.props.onClosePopup} className="fas fa-times"></i>
            <select onChange={this.handleInput}>
            <option value='' >Select</option>
            {this.state.buddies.map(buddie => <option value={buddie} >{buddie}</option>)}
            </select>
            <button type="submit" onClick={this.handleSubmit} >Add contributor</button>
            </form>
        </section>
    }
}

export default Popup