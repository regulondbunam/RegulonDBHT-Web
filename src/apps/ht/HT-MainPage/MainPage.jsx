import React from 'react';
import Style from "./MainPage.module.css"
import Conf from '../config/ht_conf_enus.json'
import PanelHT from '../Components/Panel/PanelHT';
import {Remarkable} from 'remarkable';

const md = new Remarkable();

const conf = Conf?.pages?.main_page

class MainPage extends React.Component {

    state = {
        descripcion: ""
    }

    render() {
        return (
            <article>
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
                <br />
                <div dangerouslySetInnerHTML={{__html: md.render(conf?.descripcion)}} />
            </article>
        );
    }
}

export default MainPage