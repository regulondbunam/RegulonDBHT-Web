import React, { useMemo } from 'react'
import Style from '../basicInfo.module.css'

export default function SourceSerie({ sourceSerie }) {
    let informations = useMemo(() => {
        let inf = []
        //inf.push({title:"",data:""});
        //datasetType
        //sourceSerie
        /*
        {
            "sourceID": null,
            "sourceName": "GEO",
            "title": "ArcA",
            "platformID": "GPL8387",
            "platformTitle": null,
            "strategy": "ChIP-chip",
            "method": null,
            "__typename": "SourceSerie"
        } */
        //inf.push({ title: "Platform", data: sourceSerie?.platformTitle });
        

        inf.push({ title: "Serie id", data: sourceSerie?.sourceId });
        // inf.push({ title: "Title", data: sourceSerie?.title });
        // inf.push({ title: "Name", data: sourceSerie?.sourceName });

        return inf
    }, [sourceSerie])
    return (
        <table>
            <tbody>
                {
                    sourceSerie?.platformTitle
                        ? <tr>
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p style={{ fontSize: "12px" }} className="p_accent">
                                                    Strategy
                                                </p>
                                                <p>
                                                    {sourceSerie?.strategy}
                                                </p>
                                            </td>
                                            <td>
                                                <p style={{ fontSize: "12px" }} className="p_accent">
                                                    Platform
                                                </p>
                                                <a href={`https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${sourceSerie?.platformId}`} >
                                                    {sourceSerie?.platformTitle}
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        : null
                }
                <tr>
                    <td>
                        <div className={Style.gridContainer} >
                            {
                                informations.map((e, i) => {
                                    return <BitInfo key={`${i}-${e.title}`} title={e.title} data={e.data} />
                                })
                            }
                        </div>
                    </td>
                </tr>
            </tbody>

        </table>
    )
}

function BitInfo({ title, data }) {
    if (!data) {
        return null
    }
    if(title==="Serie id"){
        return (
            <div className={Style.gridItem}>
                <p style={{ fontSize: "12px" }} className="p_accent">
                    {title}
                </p>
                <a href={`https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${data}`} target="_blank" rel="noreferrer">
                    {data}
                </a>
            </div>
        )
    }
    return (
        <div className={Style.gridItem}>
            <p style={{ fontSize: "12px" }} className="p_accent">
                {title}
            </p>
            <p>
                {data}
            </p>
        </div>
    )
}