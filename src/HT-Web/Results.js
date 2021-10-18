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
            <div >
                <div id="SubHeaderS">
                    <h1>Results</h1>
                    <input type="text" className="TextAreaH" />

                </div>
                <div >
                    <p className="profundidad">Profundidad</p>
                </div>

                

                <section id="bodyResult">

                    <div className="distribute-left">
                        <button className="button">Save</button>
                        <button className="button">E-Mail</button>
                    </div>

                    <div>
                        <p className="numero-result">10 results</p>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="1"/>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="1"/>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="1"/>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="1"/>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="1"/>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="1"/>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="1"/>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="1"/>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="1"/>
                        <Result  Match="Author: Collado Vides" GeoSampleID="00000" Tittle="Lorem ipsun dolor sit" GrowthCondition="3+" PMID="1111" numero="1"/>
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