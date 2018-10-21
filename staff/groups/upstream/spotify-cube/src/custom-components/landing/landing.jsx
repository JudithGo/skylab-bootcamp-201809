import React, {Component} from 'react'
import Cubito from '../cubito/cubito'



export default class Landing extends Component {

 
    render() {

        return ( <div className="box-shadow">
             <div className="landing--parent">
            <section className="landing--bg-img">
            </section>
            <section className="landing--content">
                <h1 className="title--landing"><i class="fab fa-spotify"></i> Music <span className="span"> is life</span></h1>
                <div className="landing--cube"><Cubito/></div>
                <button className="btn btn-warning" onClick={this.props.onClickEnter}>Enter</button>
            </section>
            </div>
        </div>
       
        )
    }
}