
import React, { Component } from 'react';
import Style from './QueryBox.module.css'


class QueryBox extends Component {
    render() {
        return (
            <div>
                <h3>Query Box</h3>
                <div style={{ marginLeft: "5%" }}>
                    <textarea id="query_area" type="text" className={Style.QueryArea} />
                </div>
            </div>
        );
    }
} export default QueryBox;