import React, { Component } from 'react';
import htData from '../assets/Data/data.json';


class Table extends Component {


    render() {
        return (
            <div>
                <div id="MetaData">
                    <table className="Table">
                        {console.log("hola perra")}
                        <caption className="TableTittle">{this.props.tittle}</caption>
                        <tbody>
                            <tr className="FilaA">
                                <td>Lorem ipsum dolor sit amet:</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</td>
                            </tr>
                            <tr className="FilaB">
                                <td>Lorem ipsum dolor sit amet:</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</td>
                            </tr>
                            <tr className="FilaA">
                                <td>Lorem ipsum dolor sit amet:</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</td>
                            </tr>
                            <tr className="FilaB">
                                <td>Lorem ipsum dolor sit amet:</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</td>
                            </tr>
                            <tr className="FilaA">
                                <td>Lorem ipsum dolor sit amet:</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</td>
                            </tr>
                            <tr className="FilaB">
                                <td>Lorem ipsum dolor sit amet:</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</td>
                            </tr>
                            <tr className="FilaA">
                                <td>Lorem ipsum dolor sit amet:</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</td>
                            </tr>
                            <tr className="FilaB">
                                <td>Lorem ipsum dolor sit amet:</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</td>
                            </tr>
                            <tr className="FilaA">
                                <td>Lorem ipsum dolor sit amet:</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</td>
                            </tr>
                            <tr className="FilaB">
                                <td>Lorem ipsum dolor sit amet:</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
} export default Table;