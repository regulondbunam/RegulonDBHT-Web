import React, { Component } from 'react';


//Componentes
import BuilderC from '../Components/BuilderC.js';


class BuilderE extends Component {
    render() {
        return (
            <div>

                <div id="SubHeader">
                    <h1>HT Search Builder Contrast</h1>
                    <p>Profundidad</p>
                </div>

                <div id="body">

                    <section>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        </div>
                        <div id="QueryBox">
                            <h2>Query Box</h2>
                            <textarea className="TextAreaBig">TypeHere</textarea>
                        </div>
                        <div className="box">
                            <h3>Builder</h3>
                            <BuilderC />
                        </div>
                    </section>
                </div>
            </div>
        );
    }
} export default BuilderE;