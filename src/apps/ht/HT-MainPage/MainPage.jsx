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
                                return (
                                    <div className={Style.gridItem} key={panel.id}
                                    >
                                        {PanelHT(panel,panel?.description,panel?.enable)}
                                    </div>
                                )
                        })
                    }
                </div>
                <br />
            </article>
        );
    }
}

export default MainPage