import React, { Component } from 'react';


//css
import Regulon from '../assets/css/Regulon.css';

//Componentes


class BuilderC extends Component {
    render() {
        return (
            <div id="BodyBuilder">
                <section>
                    <button className="DropDown">All Fields</button>
                    <textarea id='TextBox-Builder'>type here</textarea>
                    <button id='Agregar'>+</button>
                    <button className="DropDown">AND</button>
                    <label className="index">Show index</label>
                </section>
                <button id="Search">Search</button>
            </div>
        );
    }
} export default BuilderC;