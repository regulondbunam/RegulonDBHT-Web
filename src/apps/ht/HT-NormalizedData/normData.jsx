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
            <label>
                Select data view: 
                <select onChange={(e) => {
                    set_select(e.target.value)
                }}>
                    <option value="TFBS">TFBS</option>
                    <option value="PEAKS">PEAKS</option>
                    <option value="TFBS and PEAKS" >TFBS and PEAKS</option>
                </select>
            </label>
            {
                _select === "TFBS"
                    ? <TFBS id_dataset={id_dataset} />
                    : null
            }
            {
                _select === "PEAKS"
                    ? <Peaks id_dataset={id_dataset} />
                    : null
            }
            {
                _select === "TFBS and PEAKS"
                    ? <div>
                        <TFBS id_dataset={id_dataset} />
                        <Peaks id_dataset={id_dataset} />
                    </div>
                    : null
            }
        </div>
    )
}
