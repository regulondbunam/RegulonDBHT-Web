import React, { Component } from 'react';

//Components
import Result from '../Components/Result.js'

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'Query here'
        };
    }

    render() {
        return (
            <div>
                <div id="SubHeaderS">
                    <h1>Results</h1>
                    <textarea value={this.state.value} className="TextAreaH" />

                </div>
                <div >
                    <p className="profundidad">Profundidad</p>
                </div>

                

                <section id="body">

                    <div className="distribute-left">
                        <button className="button">Save</button>
                        <button className="button">E-Mail</button>
                    </div>

                    <div>
                        <h2># Results</h2>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="1"/>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="2"/>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="3"/>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="4"/>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="5"/>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="6"/>
            
                    </div>

                    <div className="distribute">
                        <button className="red-button">Matrix</button>
                        <button className="button">Show More</button>
                        <div className="liga">
                            <a href='#'>Next Page</a>
                        </div>

                    </div>

                </section>

            </div>
        );
    }
} export default Results;