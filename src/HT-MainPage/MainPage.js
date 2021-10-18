import React from 'react';
import '../HT-MainPage/MainPage.css';
import Data from '../Assets/Data/Data.json';

//Componets
import PanelHT from '../Components/Panel/PanelHT';

class MainPage extends React.Component {

    state = {
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    }



    render() {
        return (
            <div>
                <div className="SubHeader">
                    <h1>High Throughput Collection</h1>
                </div>
                <div className="Body">
                    <div className="CollectionsBreakdown">
                        <div className="">
                            <div className="">
                                {
                                    Data.ht_data.main_page.paneles.map((panel) => {
                                        return (
                                            <div className="" key={panel.id}>
                                                <PanelHT
                                                    tittle={panel.tittle}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="CollectionsDescriptionBreakdown">
                        <div className="">
                            <p>
                                {this.state.descripcion}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default MainPage;

/*
<table>
    <tbody>

    </tbody>
</table>*/