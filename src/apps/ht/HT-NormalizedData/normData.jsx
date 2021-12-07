import React, { useState } from 'react'
import TFBS from './tables/tfbs'

export default function NormData({ datasetType, tfbsData, tuData, peaksData, ttsData, tssData }) {
    const [_select, set_select] = useState("TFBS")
    console.log(tfbsData[0])
    let options = []

    switch (datasetType) {
        case "TTS":
        case "TSS":
        case "TUS":
            options = undefined
            break;
        case "TFBINDING":
            options = ["TFBS", "PEAKS", "TFBS and PEAKS"]
            break;
        default:
            break;
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
                && <TFBS data={tfbsData} />
            }
            {
                _select === "PEAKS"
                    ? null
                    : null
            }
            {
                _select === "TFBS and PEAKS"
                    ? null
                    : null
            }
            {
                datasetType === "TUS"
                ?null
                :null
            }
        </div>
    )
}
