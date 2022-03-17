import React from 'react';
import Style from "./MainPage.module.css"
import PanelHT from '../Components/Panel/PanelHT';
import { getConfOf } from '../doc/fetchDOC';


class MainPage extends React.Component {

    state = {
        conf: undefined
    }

    componentDidMount() {
        getConfOf("main_page",(conf)=>{
            this.setState({conf: conf});
        })
    }

    render() {
        const {conf} = this.state
        return (
            <article>
                <br />
                {
                    conf && 
                    <div className={Style.gridContainer}>
                    {
                       conf?.collection.map((panel) => {
                                return (
                                    <div className={Style.gridItem} key={panel.id}>
                                        <PanelHT panel={panel} />
                                    </div>
                                )
                        })
                    }
                </div>
                }
                <br />
                <br />
                <p style={{color: "#FFFFFF"}} >0.8.1</p>
            </article>
        );
    }
}

export default MainPage