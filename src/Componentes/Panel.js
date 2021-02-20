import React, {Component} from 'react';

//css
import Regulon from '../assets/css/Regulon.css'

class Panel extends Component{
    render(){
        return(
            <aside className="panel">
                <p>{this.props.tittle}</p>
            </aside>   
        );
    }
}

export default Panel;