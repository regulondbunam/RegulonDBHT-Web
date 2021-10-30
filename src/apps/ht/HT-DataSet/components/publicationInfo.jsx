import React, {useMemo} from 'react'
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
        <div style={{marginLeft: "2%"}}>
            <p style={{ fontSize: "12px", float: "left", marginRight: "5px" }} className="p_accent">
            PMID:
            </p><Link to="#" >{publication?.pmid}</Link>
            <div style={{marginLeft: "5%"}}>
                {
                    publication?.title
                    ?<p className="p_accent" >{publication?.title}</p>
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
                    ?<p>PMCID:{publication?.pmcid}</p>
                    :null
                }
                {
                    publication?.doi
                    ?<p>DOI: <Link to="#">{publication?.doi}</Link></p>
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
