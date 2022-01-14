import React from 'react';
import Style from './PanelHT.module.css'
import { Link } from 'react-router-dom';
import ModalHT from './ModalHT';
import { getMD } from '../../doc/fetchDOC';

export default class PanelHT extends React.Component {

    state = {
        _mdData : undefined
    }

    componentDidMount() {
        getMD(this.props.panel.url_rawDescription,(md_data)=>{
            this.setState({_mdData: md_data});
        })
    }

    render() {
        const { panel } = this.props
        console.log(panel);
        if (!panel.enable) {
            return (
                <div className={Style.dPanel}>
                    {panel.title}
                </div>
            )
        }
        //TFBINDING
        return (
            <div className={Style.Panel}>
                <div>
                    <ModalHT id={panel?.id} title={panel.title} md_data={this.state._mdData} />
                </div>
                <Link to={`/${panel.url}/query`}>
                <h2 style={{fontSize: "5vh"}} >
                {panel.title}
                </h2>
                </Link>
                {
                    panel.url==='TFBINDING'
                    &&<div style={{marginBottom: "10px"}}>
                    <Link style={{marginRight: "10px"}} to={`/${panel.url}/ChiP-seq`}>
                    ChiP-seq
                    </Link>
                    <Link style={{marginRight: "10px"}} to={`/${panel.url}/ChiP-exo`}>
                    ChiP-exo
                    </Link>
                    <Link style={{marginRight: "10px"}} to={`/${panel.url}/gSELEX-chip`}>
                    gSELEX-chip
                    </Link>
                    <Link style={{marginRight: "10px"}} to={`/${panel.url}/DAP`}>
                    DAP
                    </Link>
                    </div>
                }
                <Link style={{marginRight: "10px"}} to={`/${panel.url}/`}>
                    <button>Query Builder</button>
                </Link>
                
                
            </div>
        )
    }
}

/*
<button >View all datasets</button>
 <Link to={`/${panel.url}`}>
            <div className={Style.Panel}>
                {panel.title}
            </div>
        </Link>
*/