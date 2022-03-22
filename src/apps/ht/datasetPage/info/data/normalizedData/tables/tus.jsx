import React, { useMemo } from 'react'
import {TableI} from "../../../../../../../components/ui-components/ui_components"

export default function TUS({ data }) {
   //console.log(data)
    const dataTable = useMemo(() => {
        let formatTable = {
            columns: [],
            rows: []
        };
        if (Array.isArray(data) && !data.length) {
            return null
        }
        for (const property in data[0]) {
            let dis = false
            let name = property
            switch (property) {
                case "leftEndPosition":
                    name = "START"
                    break;
                case "rightEndPosition":
                    name = "END"
                    break;
                case "name":
                    name = "NAME"
                    break;
                case "strand":
                    name = "STRAND"
                    break;
                case "length":
                    name = "LENGTH"
                    break;
                case "genes":
                    name = "GENES"
                    break;
                default:
                    dis = true
                    break;
            }
            formatTable.columns.push({
                name: name,
                value: property,
                disabled: dis
            });
        }
        data.forEach(tu => {
            let row = []
            for (const key in tu) {
                if (Object.hasOwnProperty.call(tu, key)) {
                    let tu_prop = tu[key];
                    if (key === "genes") {
                        tu_prop = linkGenes(tu_prop)
                    }
                    row.push({
                        data: tu_prop,
                        value: key
                    })
                }
            }
            formatTable.rows.push(row)
        });
        return formatTable
    }, [data])
    if (Array.isArray(data) && !data.length) {
        console.warn("getDatasetAllTus array data is empty")
        return null
    }
    return (
        <div style={{overflow: "auto"}} >
            <TableI dataTable={dataTable} />
        </div>
    )
}

function linkGenes(genes=[]) {
    return (
        <div >
            {
                genes.map((gen)=>{
                    return <a key={gen._id} style={{ marginLeft: "5px" }} href={`http://regulondb.ccg.unam.mx/search?term=${gen.name}&organism=ECK12&type=gene`} target="_blank" rel="noreferrer">{gen.name}</a>
                })
            }
        </div>
    )
}