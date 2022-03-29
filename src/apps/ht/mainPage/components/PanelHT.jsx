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
        let datasetType = panel.url
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
                <Link to={`/ht/dataset/${datasetType}/`}>
                <h2 style={{fontSize: "5vh"}} >
                {panel.title}
                </h2>
                </Link>
                {
                    datasetType==='TFBINDING'
                    &&<div style={{marginBottom: "10px"}}>
                    <Link style={{marginRight: "10px"}} to={`${window.IN_URL.dataset}${datasetType}/experimentType=ChIP-seq`}>
                    ChIP-seq
                    </Link>
                    <Link style={{marginRight: "10px"}} to={`${window.IN_URL.dataset}${datasetType}/experimentType=ChIP-exo`}>
                    ChIP-exo
                    </Link>
                    <Link style={{marginRight: "10px"}} to={`${window.IN_URL.dataset}${datasetType}/experimentType=gSELEX-chip`}>
                    gSELEX-chip
                    </Link>
                    <Link style={{marginRight: "10px"}} to={`${window.IN_URL.dataset}${datasetType}/experimentType=DAP`}>
                    DAP
                    </Link>
                    </div>
                }
                <Link style={{marginRight: "10px"}} to={`${window.IN_URL.finder}${datasetType}`}>
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