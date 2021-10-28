
import React, { Component } from 'react';
import Style from './QueryBox.module.css'


class QueryBox extends Component {
    render() {
        return (
                <div>
                    <h2>Query Box</h2>
                    <input id="query_area" type="text" className={Style.QueryArea} />
                </div>
        );
    }
} export default QueryBox;