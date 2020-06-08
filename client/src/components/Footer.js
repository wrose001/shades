import React, { Component } from 'react'
import Displayimage from './Displayimage'
import './Style.css'

export default class Footer extends Component {
    render() {
        return (
            <div className="bg-light p-5 fixed-bottom footerContainer" style={{zIndex: "-100"}}>
                <Displayimage />
                <div className="col-12 text-center bottom-center">
                    <p className="h6">&copy; SHADES INC. 2020</p>
                </div>
            </div>
        )
    }
}
