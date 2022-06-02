import React, { useState } from 'react'
import { Table } from './Table'


export default function NormData({datasetId, datasetType, dataType, fileFormat, jsonTable, peaksJT, sitesJT }) {
    const [_select, set_select] = useState(undefined)
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
                    dataType = "peaks"
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

    if (!jsonTableData && !dataType) {
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
                        <br />
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
                _select === "TFBS and PEAKS"
                ? <div>
                    <Table datasetId={datasetId} dataType={"sites"} fileFormat={"GFF3"} data={sitesJT.data} columns={sitesJT.columns} error={peaksJT?.error} conf={{title: "Sites", search: true}} />
                    <Table datasetId={datasetId} dataType={"peaks"} fileFormat={"GFF3"} data={peaksJT.data} columns={peaksJT.columns} error={peaksJT?.error} conf={{title: "Peaks", search: true}} />
                </div>
                :<Table datasetId={datasetId} dataType={dataType} fileFormat={fileFormat} data={jsonTableData.data} columns={jsonTableData.columns} error={jsonTableData?.error} conf={{title: dataType, search: true}} />
            }
            
        </div>
    )
}
