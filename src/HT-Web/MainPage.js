import React, { Component } from 'react';

//css
import Regulon from '../assets/css/Regulon.css'

//Componentes

import Sidebar from '../Componentes/Sidebar';
import Panel from '../Componentes/Panel';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
         textoF: "Hola"
        };
      }

    texto1 = "Descripcion 1";
    texto2 = "Descripcion 2";

    changeDescription = (e) => {
        this.textoF = this.texto1
    }
    render (){
    return (
        <div className="MainPage">
            <div>

                <div id="SubHeader">
                    <h1>High Throughput Collection</h1>
                </div>

                <div className="Contenido"  id="body">
                    <Sidebar />
                    <section className="center" id="body">
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        </div>
                        
                        <Panel tittle="GeneExpression Experiments Collection" onMouseClick={this.changeDescription}/>
                        <Panel tittle="GeneExpression Normalized Collection"/>
                        <Panel tittle="GeneExpression contrast from authors analysis Collection"/>

                        <div id="subtittle" className=".clearfix">
                            <label>Collection details</label>
                        </div>

                        <div className=".clearfix">
                            <p>{this.texto1}</p>   
                        </div>

                    </section>
                    <Sidebar />
                </div>
                <div className="clearfix"></div>

            </div>
        </div>
    );
    }

}

export default MainPage;