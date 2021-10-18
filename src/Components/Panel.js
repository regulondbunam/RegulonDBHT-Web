import React, { Component } from 'react';


//css
import HtWeb from '../assets/css/HtWeb.css'

class Panel extends Component {

    enviar = () =>{
        this.props.enviarDescripcion(this.props.descripcion,this.props.tittle);
    }

    reiniciar = () => {
        this.props.actualizarDescripcion();
    }

    

    render() {

        return (
            <button className={this.props.css} onMouseEnter={this.enviar} onMouseLeave={this.reiniciar} disabled={this.props.value}> 

                <p>{this.props.tittle}</p>

            </button>
        );
    }
}

export default Panel;
