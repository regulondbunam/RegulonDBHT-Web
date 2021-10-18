  
import React, { Component } from 'react';

import { NavLink } from "react-router-dom";





class BuilderC extends Component {
    

    render() {
        return (
            <form>
                <section className="distribute">
                    <button className="DropDown">All Fields</button>
                    <input type="text" className='TextArea'/>
                    <button className="DropDown">AND</button>
                </section>
                <div className="rigth">
                    <a className="index">Show index</a>
                </div>
                <br/>
                <br/>
                <div className="rigth">
                <NavLink to="/ht/normalized/searchBuilder/Consulta">
                    <button className="Search">Search</button>
                </NavLink>
                </div>
            </form>
        );
    }
} export default BuilderC;