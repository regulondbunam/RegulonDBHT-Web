import React from 'react';
import Style from './PanelHT.module.css';
import { Link } from 'react-router-dom';

export default function PanelHT(panel, enabled = true) {
    if (!enabled) {
        return (
            <div className={Style.dPanel}>
                {panel.title}
            </div>
        )
    }
    return (
        <Link to={`/${panel.url}`}>
            <div className={Style.Panel}>
                {panel.title}
            </div>
        </Link>

    )
}