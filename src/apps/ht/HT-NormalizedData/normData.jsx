import React, { useState } from 'react'
import GE from './tables/ge'
import PEAKS from './tables/peaks'
import TFBS from './tables/tfbs'
import TSS from './tables/tss'
import TTS from './tables/tts'
import TUS from './tables/tus'


export default function NormData({ datasetType, datasetData }) {
    const [_select, set_select] = useState("TFBS")
    //console.log(datasetData)
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
            <br />
            <br />
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
                (_select === "TFBS" && datasetData?.tfbsData)
                ? <TFBS data={datasetData?.tfbsData} />
                : null
            }
            {
                (_select === "PEAKS" && datasetData?.peaksData)
                    ? <PEAKS data={datasetData?.peaksData} />
                    : null
            }
            {
               ( _select === "TFBS and PEAKS")
                    ? <div>
                        {
                            datasetData?.tfbsData && <TFBS data={datasetData?.tfbsData} />
                        }
                        {
                            datasetData?.peaksData && <PEAKS data={datasetData?.peaksData} />
                        }
                    </div>
                    : null
            }
            {
                (datasetType === "TUS" && datasetData?.tusData)
                ?<TUS data={datasetData?.tusData} />
                :null
            }
            {
                (datasetType === "TSS" && datasetData?.tssData)
                ?<TSS data={datasetData?.tssData} />
                :null
            }
            {
                (datasetType === "TTS" && datasetData?.ttsData)
                ?<TTS data={datasetData?.ttsData} />
                :null
            }
            {
                (datasetType === "GENE_EXPRESSION" && datasetData?.geData)
                ?<GE data={datasetData?.geData} />
                :null
            }
        </div>
    )
}
