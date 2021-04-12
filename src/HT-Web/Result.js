import React, { Component } from 'react';

import Table from "../Components/Table.js";


class Result extends Component {
    render() {
        return (
            <div>
                <div id="SubHeader">
                    <h1>HT ID</h1>
                    <p>Profundidad</p>
                </div>
                <div id="body">
                    <div>
                        <Table tittle="Sample ID" />
                    </div>
                    <div className="salto"></div>
                    <div>
                        <Table tittle="Data Content"/>
                    </div>
                </div>
            </div>
        );
    }
} export default Result;