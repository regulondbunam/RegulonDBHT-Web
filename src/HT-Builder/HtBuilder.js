
import React, { Component } from 'react';
import './HtBuilder.css'

//Components
import Builder from '../Components/Builder/Builder.js'
import QueryBox from '../Components/QueryBox/QueryBox';


class HtBuilder extends Component {



    render() {
        return (
            <div>
                <div className="SubHeader">
                    <h1>Builder</h1>
                </div>
                <div className="depth">
                    <p>depth</p>
                </div>
                <div className="Body">
                    <p>Descripcion aqui</p>
                    <div>
                        <QueryBox />
                    </div>
                    <div>
                        <Builder />
                    </div>
                </div>
            </div>
        );
    }
} export default HtBuilder;