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
        inf.push({ title: "Platform ID", data: sourceSerie?.platformID });
        inf.push({ title: "Source Serie", data: sourceSerie?.title });
        inf.push({ title: "Source Name", data: sourceSerie?.sourceName });
        inf.push({ title: "Source ID", data: sourceSerie?.sourceID });
        inf.push({ title: "Strategy", data: sourceSerie?.strategy });

        return inf
    }, [sourceSerie])
    return (
        <table>
            <tbody>
                {
                    sourceSerie?.platformTitle
                        ? <tr>
                            <td>
                                <p style={{ fontSize: "12px" }} className="p_accent">
                                    Platform
                                </p>
                                <p>
                                    {sourceSerie?.platformTitle}
                                </p>
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