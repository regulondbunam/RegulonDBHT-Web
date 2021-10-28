import React, { Component } from 'react';
import '../Results/Results.css';

//Components
import Result from '../Components/Result/Result.js'

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
                <div className="SubHeader">
                    <h1>Results: </h1>
                    <input type="text" className="TextArea" />
                </div>
                <div className="depth">
                    <p>depth</p>
                </div>
                <div className="Body">
                    <div className="QueryActionButtons">
                        <button className="Button">Save</button>
                        <button className="Button">E-Mail</button>
                    </div>
                    <div className="ResultsContainer">
                        <h2 className="Resultsquantity">10 Results</h2>
                        <Result />
                    </div>
                    <div className="ResultsActionButtons">
                        <button className="AccendButton">Matrix</button>
                        <button className="Button">Show More</button>
                        <a href="#">Next Page</a>
                    </div>
                </div>
            </div>
        );
    }
} export default Results;