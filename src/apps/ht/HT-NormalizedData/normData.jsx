import React, { useState } from 'react'
import Peaks from './peaks'
import TFBS from './tfbs'

export default function NormData({ id_dataset }) {

    const [_select, set_select] = useState("TFBS")


    if (!id_dataset) {
        return null
    }
    return (
        <div>
            <div className="dropdown">
                <label htmlFor="buttonSelect_norm">Select data view</label>
                <br />
                <button id="buttonSelect_norm">{_select}</button>
                <div className="dropdown-content">
                    <button
                        onClick={() => { set_select("TFBS") }}
                    >TFBS</button>
                    <button
                        onClick={() => { set_select("PEAKS") }}
                    >PEAKS</button>
                    <button
                        onClick={() => { set_select("TFBS and PEAKS") }}
                    >ALL</button>
                </div>
            </div>
            {
                _select === "TFBS"
                ?<TFBS id_dataset={id_dataset} />
                :null
            }
            {
                _select === "PEAKS"
                ?<Peaks id_dataset={id_dataset} />
                :null
            }
            {
                _select === "TFBS and PEAKS"
                ?<div>
                    <TFBS id_dataset={id_dataset} />
                    <Peaks id_dataset={id_dataset} />
                </div>
                :null
            }
        </div>
    )
}
