import React, { Component } from 'react';
import './Builder.css'

class Builder extends Component {

    render() {
        return (
            <div className="Body">
                <div className="BuilderBody">
                    <h3 >Builder</h3>
                    <button className="Button">All Fields</button>
                    <input type="text" className="TextArea" />
                    <button>+</button>
                    <button className="Button">AND</button>
                </div>
                <div className="IndexList">
                    <p>Show Index</p>
                </div>
                <div className="SearchButton">
                    <button className="AccendButton">Search</button>
                </div>
            </div>
        );
    }
} export default Builder;