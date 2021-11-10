import React, { useMemo, useState } from 'react'
import Style from './panelResult.module.css'
import { Link } from 'react-router-dom'

export default function PanelResult({ ds, match_data }) {
    const growthCondition = ds?.growthConditions
    const [_display, set_display] = useState(false)
    let gc = useMemo(() => {
        let inf = []
        //inf.push({title:"",data:""});
        inf.push({ title: "ORGANISM", data: growthCondition?.organism });
        inf.push({ title: "GENETIC BACKGROUND", data: growthCondition?.geneticBackground });
        inf.push({ title: "MEDIUM", data: growthCondition?.medium });
        //MEDIUM SUPPLEMENTS ?
        inf.push({ title: "AERATIOM", data: growthCondition?.aeration });
        inf.push({ title: "TEMPERATURE", data: growthCondition?.temperature });
        inf.push({ title: "PH", data: growthCondition?.ph });
        inf.push({ title: "PRESSURE", data: growthCondition?.pressure });
        inf.push({ title: "OPTICAL DENSITY", data: growthCondition?.opticalDensity });
        inf.push({ title: "GROWTH PHASE", data: growthCondition?.growthPhase });
        inf.push({ title: "GROWTH RATE", data: growthCondition?.growthRate });
        inf.push({ title: "VESSEL TYPE", data: growthCondition?.vesselType });
        inf.push({ title: "AERATION SPEED", data: growthCondition?.aerationSpeed });
        return inf;
    }, [growthCondition])
    //console.log(ds)
    return (

        <div className={Style.Panel}
            onMouseEnter={() => { set_display(true) }}
            onMouseLeave={() => { set_display(false) }}
        >
            On dataset with ID: {ds?._id}
            <Link to={`/s/dataset/${ds?._id}`}>
                <h2 className={Style.title}>
                    {ds?.sample?.title}
                </h2>
            </Link>
            {
                ds?._match
                    ? <div>
                        {
                            ds?._match.map((mt, i) => {
                                return (
                                    <div key={`${i}-${mt?.location}-${mt?.key}`}>
                                        Keyword: <b>{mt?.key}</b> found in {mt?.location}, <br />
                                        <div className={Style.matchText} dangerouslySetInnerHTML={{ __html: mt?.matchText }} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    : null
            }
            <b>Growth Conditions:</b>
            {
                gc
                    ? <div>
                        {
                            _display
                                ? <div className={Style.gridContainer}>
                                    {
                                        gc.map((gc, i) => {
                                            if (!gc.data) {
                                                return null
                                            }
                                            return <BitInfo key={`bgrowth_${i}_${gc.title}`} title={gc.title} data={gc.data} />
                                        })
                                    }
                                </div>
                                : gc.map(c => {
                                    if (c?.data) {
                                        return `${c.title}: ${c.data}`
                                    }
                                    return ""
                                }).join(", ")
                        }
                    </div>
                    : null
            }
        </div>

    )
}
function BitInfo({ title, data }) {
    if (!data) {
        return null
    }
    return (
        <div className={Style.gridItem}>
            <p style={{ fontSize: "9px", textAlign: "center" }} className="p_accent">
                {title}
            </p>
            <p style={{ fontSize: "10px", textAlign: "center" }}>
                {data}
            </p>
        </div>
    )
}