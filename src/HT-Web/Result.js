import React, {Component} from 'react';

import Table from "../Components/Table.js";


class Result extends Component{
    render(){
        return(
            <div>

                <div id="SubHeader">
                    <h1>HT ID</h1>
                    <p>Profundidad</p>
                </div>

                

                <div id="body">
                    
                        <Table/>

                        <Table/>

                </div>
            </div>
        );
    }
}export default Result;