  
import React, { Component } from 'react';

import { NavLink } from "react-router-dom";





class BuilderC extends Component {


    consulta = React.createRef();

    recirbirConsulta = (e) => {
        e.preventDefault();
        this.props.consulta = this.consulta;
        this.props.enviarConsulta(this.props.consulta)
    }

    

    render() {
        return (
            <form onChange={this.recirbirConsulta}>
                <section className="distribute">
                    <button className="DropDown">All Fields</button>
                    <input type="text" className='TextArea' ref={this.consulta}/>
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