import React, { useState } from 'react'
import PEAKS from './tables/peaks'
import TFBS from './tables/tfbs'
import TUS from './tables/tus'

export default function NormData({ datasetType, tfbsData, tusData, peaksData, ttsData, tssData }) {
    const [_select, set_select] = useState("TFBS")
    //console.log(tfbsData[0])
    let options = undefined

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
                (_select === "TFBS" && tfbsData)
                ? <TFBS data={tfbsData} />
                : null
            }
            {
                (_select === "PEAKS" && peaksData)
                    ? <PEAKS data={peaksData} />
                    : null
            }
            {
               ( _select === "TFBS and PEAKS")
                    ? <div>
                        {
                            tfbsData && <TFBS data={tfbsData} />
                        }
                        {
                            peaksData && <PEAKS data={peaksData} />
                        }
                    </div>
                    : null
            }
            {
                (datasetType === "TUS" && tusData)
                ?<TUS data={tusData} />
                :null
            }
        </div>
    )
}
