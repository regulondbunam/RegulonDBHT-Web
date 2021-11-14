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
    let ncbiLinks = []
    if (_linkedDataset) {
        let ids = _linkedDataset?.controlId
        if (ids) {
            ids.forEach(id => {
                ncbiLinks.push(id)
            });
        }
        ids = _linkedDataset?.experimentId
        if (ids) {
            ids.forEach(id => {
                ncbiLinks.push(id)
            });
        }
    }

    console.log(_linkedDataset)
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
                                <i style={{ fontSize: "22px" }} class='bx bx-printer' ></i>
                            </button>
                            Print this page
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {
                                _linkedDataset
                                    ? <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <button className="iconButton"
                                                        onClick={() => {
                                                            let links = document.getElementById("ncbi_links")
                                                            if(links.style.display==="none"){
                                                                links.style.display = "contents"
                                                            }else{
                                                                links.style.display = "none"
                                                            }
                                                        }}
                                                    >
                                                        <img src="/media/img/ncbi_logo.gif" height="20px" alt="NCBI logo" />
                                                    </button>
                                                    NCBI GEO links
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="ncbi_links" style={{display: 'none'}}>
                                            {
                                                ncbiLinks.map((link,i) =>{
                                                    return (
                                                        <tr key={`link_${link}_${i}`} >
                                                            <td >
                                                                <div style={{marginLeft: "20px" }}>
                                                                <a href={`https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${link}`}
                                                                    target="_blank" rel="noreferrer"
                                                                >{link}</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
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