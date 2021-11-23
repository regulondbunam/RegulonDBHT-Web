import React from 'react'
import { Link } from 'react-router-dom'
export default function PublicationInfo({publication}) {
    
/*
{
    "pmid": 24699140,
    "doi": "10.1371/journal.pgen.1004264",
    "authors": [
        "Federowicz S",
        "Kim D",
        "Ebrahim A",
        "Lerman J",
        "Nagarajan H",
        "Cho BK",
        "Zengler K",
        "Palsson B"
    ],
    "title": "Determining the control circuitry of redox metabolism at the genome-scale.",
    "date": "2014 Apr",
    "pmcid": null,
    "__typename": "DatasetPublication"
}
*/
    return (
        <div >
            <p className="p_accent" style={{fontSize: "14px"}} >Publication</p>
            <div style={{marginLeft: "5%"}}>
                {
                    publication?.title
                    ?<a href={`https://pubmed.ncbi.nlm.nih.gov/${publication?.pmid}/`} className="p_accent" style={{ fontSize: "14px"}} target="_blank" rel="noreferrer">{publication?.title}</a>
                    :null
                }
                {
                    publication?.authors
                    ?<p>{
                        publication?.authors.map(e=>{
                            return e
                        }).join(", ")
                    }</p>
                    :null
                }
                {
                    publication?.pmcid
                    ?<p style={{ float: "left", marginRight: "5px" }}>PMID:{publication?.pmid}</p>
                    :null
                }
                {
                    publication?.pmcid
                    ?<p style={{ float: "left", marginRight: "5px" }}>PMCID:{publication?.pmcid}</p>
                    :null
                }
                {
                    publication?.doi
                    ?<p style={{ float: "left", marginRight: "5px" }} >DOI: <Link to="#">{publication?.doi}</Link></p>
                    :null
                }
                {
                    publication?.date
                    ?<p>date: {publication?.date}</p>
                    :null
                }
            </div>
        </div>
    )
}
