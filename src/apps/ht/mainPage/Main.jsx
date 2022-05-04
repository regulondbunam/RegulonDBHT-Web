import React from 'react';
import Style from "./mainPage.module.css"
import PanelHT from './components/PanelHT';
import { getConfOf } from '../doc/fetchDOC';


class Main extends React.Component {

    state = {
        conf: undefined
    }

    componentDidMount() {
        getConfOf("main_page", (conf) => {
            console.log(conf);
            this.setState({ conf: conf });
        })
        const COVER = document.getElementById("title-cover-ht")
        if (COVER) {
            const COVER_REACTION = new CustomEvent('coverR', {
                bubbles: true,
                detail: {
                    title: "High Throughput Collection",
                    state: "done",
                }
            });
            COVER.dispatchEvent(COVER_REACTION);
        }
    }

    render() {
        const { conf } = this.state
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
                <p style={{ color: "#FFFFFF" }} >0.9.6</p>
            </article>
        );
    }
}

export default Main