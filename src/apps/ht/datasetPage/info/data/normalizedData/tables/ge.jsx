import React, { useMemo } from 'react'
import { TableI } from "../../../../../../../components/ui-components/ui_components"

export default function GE({ data }) {
    //console.log(data)
    const dataTable = useMemo(() => {
        let formatTable = {
            columns: [],
            rows: []
        };
        let proprs = ["NAME","BNUMBER","SYNONYMS"];
        if (Array.isArray(data) && !data.length) {
            return null
        }
        for (const property in data[0]) {
            let dis = false
            let name = property
            if (property === "gene") {
                for (let index = 0; index < proprs.length; index++) {
                    name = proprs[index];
                    formatTable.columns.push({
                        name: name,
                        value: `gene_${name}`,
                        disabled: dis
                    });
                }
            }else{
                switch (property) {
                    case "count":
                        name = "COUNT"
                        break;
                    case "tpm":
                        name = "TPM"
                        break;
                    case "fpkm":
                        name = "FPKM"
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
            
        }
        data.forEach(ge => {
            let row = []
            for (const key in ge) {
                if (Object.hasOwnProperty.call(ge, key)) {
                    let ge_prop = ge[key];
                    if (key === "gene") {
                        //NAME
                        row.push({
                            data: linkGene(ge_prop),
                            value: key
                        })
                        //Bnumber
                        row.push({
                            data: ge_prop?.bnumber,
                            value: key
                        })
                        if (Array.isArray(ge_prop?.synonyms) && ge_prop.synonyms.length) {
                            let synom = ge_prop?.synonyms.map(g=>{
                                return g
                            }).join(", ")
                            //synonyms
                            row.push({
                                data: synom,
                                value: key
                            })
                        } else {
                            row.push({
                                data: " ",
                                value: key
                            })
                        }
                    }else{
                        row.push({
                            data: ge_prop,
                            value: key
                        })
                    }
                    
                }
            }
            formatTable.rows.push(row)
        });
        return formatTable
    }, [data])
    //console.log(dataTable)
    if (Array.isArray(data) && !data.length) {
        console.warn("getDatasetAllTus array data is empty")
        return null
    }
    return (
        <div style={{ overflow: "auto" }} >
            <h3>GENE EXPRESSION DATA</h3>
            <TableI dataTable={dataTable} />
        </div>
    )
}

function linkGene(gen) {
    return <a key={gen?._id} style={{ marginLeft: "5px" }} href={`http://regulondb.ccg.unam.mx/search?term=${gen?.name}&organism=ECK12&type=gene`} target="_blank" rel="noreferrer">{gen?.name}</a>
}