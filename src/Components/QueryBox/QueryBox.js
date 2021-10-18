
import React, { Component } from 'react';
import './QueryBox.css'


class QueryBox extends Component {
    render() {
        return (
            <div>
                <div>
                    <h2>Query Box</h2>
                    <input type="text" className="QueryArea" />
                </div>
            </div>
        );
    }
} export default QueryBox;