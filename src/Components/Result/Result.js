import React, { Component } from 'react';
import './Result.css'


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
                                <label htmlFor="checkbox" className="">
                                    <a to="/ht/normalized/sample/id" >Liga aqui</a>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td className="lateral">
                                <p name="Match" className="match">Match</p>
                            </td>
                            <td className="principal">
                                <label htmlFor="Match" className="match">Match</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="lateral">
                                <p name="GEOID" className="extra">GEO ID</p>
                            </td>
                            <td className="principal">
                                <label htmlFor="GEOID" className="extra">GeoSampleID</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="lateral">
                                <p name="PMID" className="extra">PMID</p>
                            </td>
                            <td className="principal">
                                <label htmlFor="PMID" className="extra">PMID</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="lateral">
                                <p name="GC" className="extra">GC</p>
                            </td>
                            <td className="principal">
                                <label htmlFor="GC" className="extra">GrowthCondition</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
} export default Result;