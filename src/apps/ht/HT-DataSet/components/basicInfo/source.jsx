import React, { useMemo } from 'react'
import Style from '../basicInfo.module.css'

export default function SourceSerie({ sourceSerie }) {
    let informations = useMemo(() => {
        let inf = []

        sourceSerie?.series.length > 0 && inf.push({ title: "Serie id", data: sourceSerie?.series.map(s => { return s.sourceId }).join(" ") });
        sourceSerie?.title && inf.push({ title: "Title", data: sourceSerie?.title });
        sourceSerie?.name && inf.push({ title: "Name", data: sourceSerie?.sourceName });

        return inf
    }, [sourceSerie])
    return (
        <table>
            <tbody>
                {
                    sourceSerie?.strategy
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
                                            {
                                                sourceSerie?.platform?._id &&
                                                <td>
                                                    <p style={{ fontSize: "12px" }} className="p_accent">
                                                        Platform
                                                    </p>
                                                    <a href={`https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${sourceSerie?.platform?._id}`} >
                                                        {sourceSerie?.platform?.title}
                                                    </a>
                                                </td>
                                            }

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
    if (title === "Serie id") {
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