import React, { useState } from 'react'
import GE from './tables/ge'
import { Table } from './Table'


export default function NormData({ datasetType, jsonTable, peaksJT, sitesJT }) {
    const [_select, set_select] = useState("TFBS")
    //console.log(datasetData)
    // console.log(jsonTable);
    let options = undefined
    let jsonTableData = undefined
    switch (datasetType) {
        case "TTS":
        case "TSS":
        case "TUS":
            options = undefined
            jsonTableData = jsonTable
            break;
        case "TFBINDING":
            options = ["TFBS", "PEAKS", "TFBS and PEAKS"]
            switch (_select) {
                case "TFBS":
                    jsonTableData = sitesJT
                    break;
                case "PEAKS":
                    jsonTableData = peaksJT
                    break;
                default:
                    jsonTableData = sitesJT
                    break;
            }
            break;
        default:
            break;
    }

    if (jsonTable?.error) {
        return <div></div>
    }

    if (!jsonTableData) {
        return null
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
                _select !== "TFBS and PEAKS"
                ?<Table data={jsonTableData.data} columns={jsonTableData.columns} conf={{title: datasetType, search: true}} />
                :<div>
                    <Table data={sitesJT.data} columns={sitesJT.columns} error={sitesJT.error} conf={{title: "Sites", search: true}} />
                    <Table data={peaksJT.data} columns={peaksJT.columns} error={peaksJT.error} conf={{title: "Peaks", search: true}}/>
                </div>
            }
        </div>
    )
}
