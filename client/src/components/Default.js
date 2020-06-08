import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Default extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto text-center text-title text-uppercase pt-5" >
            <h1 className="display-3">404</h1>
            <h1>error</h1>
            <br />
            <h3>the requested URL
              <span className="text-danger">
                {this.props.location.pathname}
              </span>
              {" "} was not found
            </h3>
            <br />
            <h3>
              <Link to="/">
              &#8630; Go back to home
              </Link>
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
