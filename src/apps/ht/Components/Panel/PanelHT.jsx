import React from 'react';
import Style from './PanelHT.module.css'
import { Link } from 'react-router-dom';
import ModalHT from './ModalHT';

export default function PanelHT(panel, description, enabled = true) {
    if (!enabled) {
        return (
            <div className={Style.dPanel}>
                {panel.title}
            </div>
        )
    }
    return (
        <div className={Style.Panel}>
            <h2 style={{fontSize: "5vh"}} >
            {panel.title}
            </h2>
            <div>
                <ModalHT id={panel?.id} title={panel.title} md_data={panel?.description} />
                <Link to={`/${panel.url}`}>
                <button className="accent" >Query Builder</button>
                </Link>
            </div>
        </div>
    )
}

/*
<button >View all datasets</button>
 <Link to={`/${panel.url}`}>
            <div className={Style.Panel}>
                {panel.title}
            </div>
        </Link>
*/