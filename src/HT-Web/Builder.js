import React, { Component } from 'react';
import Sidebar from '../Componentes/Sidebar';

//Componentes
import TextBox from '../ui-components/input/text/TextBox.js'
import BuilderC from '../Componentes/BuilderC.js';

class Builder extends Component {
    render() {
        return (
            <div className="MainPage">
            <div>

                <div id="SubHeader">
                    <h1>HT Search Builder</h1>
                    <p>Profundidad</p>
                </div>

                <div className="Contenido"  id="body">
                    <Sidebar />
                    <section className="center" id="body">
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        </div>
                        <div id="QueryBox">
                            <h2>Query Box</h2>
                            <TextBox/>
                        </div>
                        <div id="Builder">
                            <h3>Builder</h3>
                            <BuilderC/>
                        </div>

                        

                    </section>
                    <Sidebar />
                </div>
                <div className="clearfix"></div>

            </div>
        </div>
        );
    }
} export default Builder;