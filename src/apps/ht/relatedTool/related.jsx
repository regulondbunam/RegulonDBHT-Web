import React, { useState, useEffect } from 'react'
import { DatasetLinkedByControlId } from './related_dataSet'


export const Related = () => {
    const id = "related_ht"
    const [_dataset, set_dataset] = useState()


    useEffect(() => {
        const cover = document.getElementById(id)
        if (cover) {
            cover.addEventListener('upR', function (e) {
                //console.log(`state`, e.detail)
                if (e.detail.Dataset) {
                    set_dataset(e.detail.Dataset)
                }
            }, false);
        }
    }, [set_dataset])
    // let dataset_linked_byControlId
    // let dataset_linked_byExperimentalId
    let source = undefined;
    if (_dataset) {
        //const linkedDataset = _dataset?.linkedDataset
        source = _dataset?.sourceSerie?.sourceId
        /*if(linkedDataset) {
            dataset_linked_byControlId = linkedDataset?.controlId
            dataset_linked_byExperimentalId = linkedDataset?.experimentId
        }*/
    }

    //console.log(_linkedDataset)
    return (
        <div id={id} style={{ position: "fixed", width: "100%" }}>
            <table className="table_content" >
                <thead>
                    <tr>
                        <th>RELATED TOOLS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >

                            <button className="iconButton"
                                onClick={() => {
                                    let rel = document.getElementById(id)
                                    console.log(rel)
                                    if (rel) {
                                        rel.style.visibility = "hidden"
                                    }
                                    window.print()
                                    if (rel) {
                                        rel.style.visibility = "visible"
                                    }
                                }}
                            >
                                <i style={{ fontSize: "22px" }} className='bx bx-printer' ></i>
                            </button>
                            Print this page
                        </td>
                    </tr>
                    <tr id="source_related" >
                        <td>
                            {
                                source
                                    ? <DatasetLinkedByControlId sourceId={source} />
                                    : null
                            }
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default Related