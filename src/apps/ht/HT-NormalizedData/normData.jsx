import React, { useState } from 'react'
import Peaks from './peaks'
import TFBS from './tfbs'
import TUs from './tus'

export default function NormData({ id_dataset, datasetType }) {

    const [_select, set_select] = useState("TFBS")

    let options = []

    switch (datasetType) {
        case "TUS":
            options = undefined
            break;
        case "TFBINDING":
            options = ["TFBS", "PEAKS", "TFBS and PEAKS"]
            break;
        default:
            break;
    }

    if (!id_dataset) {
        return null
    }
    return (
        <div>
            {
                options
                    ? <label>
                        Select data view:
                        <select onChange={(e) => {
                            set_select(e.target.value)
                        }}>
                            {
                                options.map((op,i)=>{
                                    return <option key={`viwe_option_${i}_${op}`} value={op}>{op}</option>
                                })
                            }
                        </select>
                    </label>
                    : null
            }
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
            {
                datasetType === "TUS"
                ?<TUs id_dataset={id_dataset} />
                :null
            }
        </div>
    )
}
