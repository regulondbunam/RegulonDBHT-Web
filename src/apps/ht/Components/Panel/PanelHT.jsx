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
        if (!panel.enable) {
            return (
                <div className={Style.dPanel}>
                    {panel.title}
                </div>
            )
        }
        return (
            <div className={Style.Panel}>
                <Link to={`/${panel.url}`}>
                <h2 style={{fontSize: "5vh"}} >
                {panel.title}
                </h2>
                </Link>
                <div>
                    <ModalHT id={panel?.id} title={panel.title} md_data={this.state._mdData} />
                </div>
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