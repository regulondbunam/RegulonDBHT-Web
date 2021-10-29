import React, { Component } from 'react';
import './Builder.css'

class Builder extends Component {

    render() {
        return (
            <div>
                <div>
                    <h3 >Builder</h3>
                    <button >All Fields</button>
                    <input type="text" className="TextArea" />
                    <button className="iconButton" ><i className='bx bx-plus-circle'></i></button>
                    <button >AND</button>
                </div>
                <div className="IndexList">
                    <p>Show Index</p>
                </div>
                <div className="SearchButton">
                    <button className="accent">Search</button>
                </div>
            </div>
        );
    }
} export default Builder;