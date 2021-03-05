
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { htData } from '../assets/Data/data';


//Componentes
import Panel from '../Components/Panel';




class MainPage extends Component {

    state = {
        Descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        DescripcionPanel: null
    }





    ActualizarDescripcion = (descripcion, tittle) => {
        this.setState({
            DescripcionPanel: descripcion,
            tittle: ": " + tittle
        });
    }

    ReiniciarDescripcion = () => {
        this.setState({
            DescripcionPanel: this.state.Descripcion,
            tittle: ""
        });
    }

    panelDescripcion = "";
    panelTituli ="";


    render() {
        return (
            <div>

                {htData.map((ht, index) => {
                    return(
                       this.panelTituli =  ht.panel,
                       this.panelDescripcion =  ht.descripcion
                    )
                })}

                <div id="SubHeader">
                    <h1>High Throughput Collection</h1>
                </div>

                <div id="body">

                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <section className="distribute">

                        <NavLink to="/ht/contrast/searchBuilder">
                            <Panel
                                tittle={this.panelTituli}
                                descripcion={this.panelDescripcion}
                                enviarDescripcion={this.ActualizarDescripcion}
                                actualizarDescripcion={this.ReiniciarDescripcion}
                                css="panel"

                            />
                        </NavLink>

                        <NavLink to="/ht/normalized/searchBuilder">
                            <Panel
                                tittle="GeneExpression Normalized Collection"
                                descripcion="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                enviarDescripcion={this.ActualizarDescripcion}
                                actualizarDescripcion={this.ReiniciarDescripcion}
                                css="panel"
                            />
                        </NavLink>

                        <Panel
                            tittle="GeneExpression contrast from authors analysis Collection"
                            descripcion="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                            enviarDescripcion={this.ActualizarDescripcion}
                            actualizarDescripcion={this.ReiniciarDescripcion}
                            value={true}
                            css="panelDisabled"
                        />
                    </section>

                    <br />

                    {/*Condicional para el despliegue de Descripcion de colecion*/}

                    {this.state.tittle ?
                        (<div>
                            <div id="subtittle">
                                <label>Collection details{this.state.tittle}</label>
                            </div>
                            <p>
                                {this.state.DescripcionPanel}
                            </p>
                        </div>)

                        :

                        (<div>
                            {/*Declara que si no se activa el metodo se debe imprimir la siguiente descripcion*/}
                            <div id="subtittle">
                                <label>Collection</label>
                            </div>
                            <p>
                                {this.state.Descripcion}
                            </p>
                        </div>)
                    }



                </div>
            </div>
        

        );
    }

}

export default MainPage;