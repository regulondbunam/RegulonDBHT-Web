import React from 'react';
import Style from "./MainPage.module.css"
import Conf from '../config/ht_conf_enus.json'
import PanelHT from '../Components/Panel/PanelHT';

const conf = Conf?.pages?.main_page

class MainPage extends React.Component {

    state = {
        descripcion: conf?.descripcionç
    }

    render() {
        return (
            <article>
                <br />
                <div className="CollectionsDescriptionBreakdown">
                    <p>
                        {this.state.descripcion}
                    </p>
                </div>
                <br />
                <div className={Style.gridContainer}>
                    {
                        conf?.collection.map((panel) => {
                            if (panel?.enable) {
                                return (
                                    <div className={Style.gridItem} key={panel.id}
                                        onMouseEnter={()=>{
                                            this.setState({descripcion: panel?.description})
                                        }}
                                        onMouseLeave={()=>{
                                            this.setState({descripcion: conf?.descripcion})
                                        }}
                                    >
                                        {PanelHT(panel)}
                                    </div>
                                )
                            }
                            return (
                                <div className={Style.gridItem} key={panel.id}
                                    onMouseEnter={()=>{
                                        this.setState({descripcion: panel?.description})
                                    }}
                                    onMouseLeave={()=>{
                                        this.setState({descripcion: conf?.descripcion})
                                    }}
                                >
                                    {PanelHT(panel,false)}
                                </div>
                            )
                        })
                    }
                </div>
            </article>
        );
    }
}

export default MainPage