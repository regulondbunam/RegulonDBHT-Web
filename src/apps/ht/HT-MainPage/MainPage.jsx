import React from 'react';
import Style from "./MainPage.module.css"
import Data from '../Assets/Data/Data.json';

//Componets
import PanelHT from '../Components/Panel/PanelHT';

const des = Data.ht_data.main_page.main_page_descripcion

class MainPage extends React.Component {

    state = {
        descripcion: des
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
                        Data.ht_data.main_page.paneles.map((panel) => {
                            return (
                                <div className={Style.gridItem} key={panel.id}
                                    onMouseEnter={()=>{
                                        this.setState({descripcion: panel?.description})
                                    }}
                                    onMouseLeave={()=>{
                                        this.setState({descripcion: des})
                                    }}
                                >
                                    {PanelHT(panel)}
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