import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

//components
import Checkbox from './Chekbox.js'

class Result extends Component {

    

    render() {
        return (
            <div className="distribute-left-Result">

                <div className="CheckBoxSection" id="Result">
                    <Checkbox />
                    <label>{this.props.numero}</label>
                </div>
                <section>

                    <div>

                        <NavLink to="/ht/normalized/sample/id" >{this.props.Match}</NavLink>
                    </div>

                    <div className="distribute">
                        <p>{this.props.GeoSampleID}</p>
                        <p>{this.props.Tittle}</p>
                    </div>

                    <div className="descripcion">
                        <p>{this.props.GrowthCondition}</p>
                    </div>

                    <div className="descripcion">
                        <p>{this.props.PMID}</p>
                    </div>

                </section>
            </div>
        );
    }
} export default Result;

