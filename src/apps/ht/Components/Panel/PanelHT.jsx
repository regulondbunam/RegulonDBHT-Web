import React from 'react';
import Style from './PanelHT.module.css';
import { Link } from 'react-router-dom';

export default function PanelHT(panel) {
    return (

        <Link to={`/${panel.url}`}>
            <div className={Style.Panel}>
                {panel.title}
            </div>
        </Link>

    )
}