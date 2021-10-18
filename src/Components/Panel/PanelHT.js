import React from 'react';
import './PanelHT.css';



class PanelHT extends React.Component{
    render(){
        return(
            <div className="Panel">
                <a href="#">
                    <div className="PanelBody">{this.props.tittle}</div>
                </a>
            </div>
        );
    }
}

export default PanelHT;