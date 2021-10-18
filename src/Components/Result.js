import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

//components


class Result extends Component {



    render() {
        return (
            <div className="result">
                <table>
                    <tbody>
                        <tr>
                            <td className="lateral">
                                <input name="checkbox" type="checkbox" className="checkbox" />
                            </td>
                            <td className="ligaResult">
                                <label htmlFor="checkbox" className="sinborde">
                                    <NavLink to="/ht/normalized/sample/id" >{this.props.Tittle}</NavLink>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td className="lateral">
                                <p name="Match" className="match">Match</p>
                            </td>
                            <td className="principal">
                                <label htmlFor="Match" className="match">{this.props.Match}</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="lateral">
                                <p name="GEOID" className="extra">GEO ID</p>
                            </td>
                            <td className="principal">
                                <label htmlFor="GEOID" className="extra">{this.props.GeoSampleID}</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="lateral">
                                <p name="PMID" className="extra">PMID</p>
                            </td>
                            <td className="principal">
                                <label htmlFor="PMID" className="extra">{this.props.PMID}</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="lateral">
                                <p name="GC" className="extra">GC</p>
                            </td>
                            <td className="principal">
                                <label htmlFor="GC" className="extra">{this.props.GrowthCondition}</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
} export default Result;

{/*
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
                */}