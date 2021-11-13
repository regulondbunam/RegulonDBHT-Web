import React, { useState, useEffect } from 'react'
import { Cover } from "../../../components/ui-components/ui_components";


export const Related = () => {
    const id = "related_ht"
    const [_linkedDataset, set_linkedDataset] = useState()
    const [_pmid, set_pmid] = useState()
    const [_doi, set_doi] = useState()
    const [_externalLinks, set_externalLinks] = useState()
    const [_genes, set_genes] = useState()


    useEffect(() => {
        const cover = document.getElementById(id)
        if (cover) {
            cover.addEventListener('upR', function (e) {
                //console.log(`state`, e.detail)
                if (e.detail.linkedDataset) {
                    set_linkedDataset(e.detail.linkedDataset)
                }
                if (e.detail.pmid) {
                    set_pmid(e.detail.pmid)
                }
                if (e.detail.doi) {
                    set_doi(e.detail.doi)
                }
                if (e.detail.externalLinks) {
                    set_externalLinks(e.detail.externalLinks)
                }
                if (e.detail.genes) {
                    set_genes(e.detail.genes)
                }
            }, false);
        }
    }, [])
    //console.log(_isInfo)
    return (
        <div id={id} style={{position:"fixed", width: "100%"}}>
            <table className="table_content" >
                <thead>
                    <tr>
                        <th>RELATED TOOLS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr align="center" >
                        <td >
                            <button
                                onClick={() =>{ 
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
                                Print this page
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Related