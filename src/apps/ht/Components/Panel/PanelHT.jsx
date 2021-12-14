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
            {panel.title}
            <div>
                <ModalHT title={panel.title} md_data={description} />
                <button >View all datasets</button>
                <button className="accent" >Query Builder</button>
            </div>
        </div>
    )
}

/*
 <Link to={`/${panel.url}`}>
            <div className={Style.Panel}>
                {panel.title}
            </div>
        </Link>
*/