import React, { useMemo } from 'react'
import { TableI } from "../../../../components/ui-components/ui_components"

export default function TSS({ data }) {
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
                case "pos_1":
                    name = "POS 1"
                    break;
                case "strand":
                    name = "STRAND"
                    break;
                case "closestGenes":
                    name = "closest genes"
                    break;
                case "promoter":
                    name = "PROMOTER"
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
        data.forEach(tss => {
            let row = []
            for (const key in tss) {
                if (Object.hasOwnProperty.call(tss, key)) {
                    let tss_prop = tss[key];

                    if (key === "closestGenes") {
                        if (Array.isArray(tss_prop) && tss_prop.length) {
                            tss_prop = linkGenes(tss_prop)
                        } else {
                            tss_prop = ""
                        }
                    }
                    if (key === "promoter") {
                        if (Array.isArray(tss_prop) && tss_prop.length) {
                            tss_prop = linkPromoters(tss_prop)
                        } else {
                            tss_prop = ""
                        }
                    }

                    row.push({
                        data: tss_prop,
                        value: key
                    })
                }
            }
            formatTable.rows.push(row)
        });
        return formatTable
    }, [data])
    console.log(dataTable)
    if (Array.isArray(data) && !data.length) {
        console.warn("getDatasetAllTus array data is empty")
        return null
    }
    return (
        <div style={{ overflow: "auto" }} >
            <TableI dataTable={dataTable} />
        </div>
    )
}

function linkGenes(genes = []) {
    return (
        <div >
            {
                genes.map((gen) => {
                    return <a key={gen._id} style={{ marginLeft: "5px" }} href={`http://regulondb.ccg.unam.mx/search?term=${gen.name}&organism=ECK12&type=gene`} target="_blank" rel="noreferrer">{gen.name}</a>
                })
            }
        </div>
    )
}

function linkPromoters(genes = []) {
    return (
        <div >
            {
                genes.map((gen) => {
                    return <a key={gen._id} style={{ marginLeft: "5px" }} href={`http://regulondb.ccg.unam.mx/search?term=${gen.name}&organism=ECK12&type=gene`} target="_blank" rel="noreferrer">{gen.name}</a>
                })
            }
        </div>
    )
}