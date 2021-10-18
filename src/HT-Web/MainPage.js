
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import  htData  from '../assets/Data/data.json';


//Componentes
import Panel from '../Components/Panel';




class MainPage extends Component {

    state = {
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


    titulo = htData.ht_data.main__page.main_page_tittle

    render() {
        return (
            <div>
                <div id="SubHeader">
                    <h1>{htData.ht_data.main__page.main_page_subTittle}</h1>
                </div>

                <div id="body">

                    <div>
                        <p>{htData.ht_data.main__page.main_page_descripcion}</p>
                    </div>
                    <section className="distribute">

                        <NavLink to="/ht/contrast/searchBuilder">
                            <Panel
                                tittle={htData.ht_data.main__page.panel_A.tittle}
                                descripcion={htData.ht_data.main__page.panel_A.descripcion}
                                enviarDescripcion={this.ActualizarDescripcion}
                                actualizarDescripcion={this.ReiniciarDescripcion}
                                css={htData.ht_data.main__page.panel_A.css}
                                value={htData.ht_data.main__page.panel_A.value}

                            />
                        </NavLink>

                        <NavLink to="/ht/normalized/searchBuilder">
                            <Panel
                                tittle={htData.ht_data.main__page.panel_B.tittle}
                                descripcion={htData.ht_data.main__page.panel_B.descripcion}
                                enviarDescripcion={this.ActualizarDescripcion}
                                actualizarDescripcion={this.ReiniciarDescripcion}
                                css={htData.ht_data.main__page.panel_B.css}
                                value={htData.ht_data.main__page.panel_B.value}
                            />
                        </NavLink>

                        <Panel
                            tittle={htData.ht_data.main__page.panel_C.tittle}
                            descripcion={htData.ht_data.main__page.panel_C.descripcion}
                            enviarDescripcion={this.ActualizarDescripcion}
                            actualizarDescripcion={this.ReiniciarDescripcion}
                            css={htData.ht_data.main__page.panel_C.css}
                            value={htData.ht_data.main__page.panel_C.value}
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

                        (<div/>)
                    }



                </div>
            </div>
        

        );
    }

}

export default MainPage;