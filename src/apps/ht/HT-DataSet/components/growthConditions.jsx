import React, {useMemo} from 'react'
import Style from './growthC.module.css'

export default function GrowthConditions({growthCondition}) {

    let informations = useMemo(() => {
        let inf = []
        //inf.push({title:"",data:""});
        inf.push({title:"ORGANISM",data: growthCondition?.organism});
        inf.push({title: "GENETIC BACKGROUND",data: growthCondition?.geneticBackground});
        inf.push({title: "MEDIUM",data: growthCondition?.medium});
        //MEDIUM SUPPLEMENTS ?
        inf.push({title: "AERATIOM",data: growthCondition?.aeration});
        inf.push({title: "TEMPERATURE",data: growthCondition?.temperature});
        inf.push({title: "PH",data: growthCondition?.ph});
        inf.push({title: "PRESSURE",data: growthCondition?.pressure});
        inf.push({title: "OPTICAL DENSITY",data: growthCondition?.opticalDensity});
        inf.push({title: "GROWTH PHASE",data: growthCondition?.growthPhase});
        inf.push({title: "GROWTH RATE",data: growthCondition?.growthRate});
        inf.push({title: "VESSEL TYPE",data: growthCondition?.vesselType});
        inf.push({title: "AERATION SPEED",data: growthCondition?.aerationSpeed});
        return inf;
    },[growthCondition])

    if (!growthCondition) {
        return null
    }

    return (
        <div>
            <div className={Style.gridContainer} >
            {
                informations
                ?informations.map((gc,i)=>{
                    if (!gc.data) {
                        return null
                    }
                    return <BitInfo key={`bgrowth_${i}_${gc.title}`} title={gc.title} data={gc.data} />
                })
                :null
            }
            </div>
        </div>
    )
}

function BitInfo({ title, data }) {
    if (!data) {
        return null
    }
    return (
        <div className={Style.gridItem}>
            <p style={{ fontSize: "12px", textAlign: "center" }} className="p_accent">
                {title}
            </p>
            <p style={{ fontSize: "14px", textAlign: "center" }}>
                {data}
            </p>
        </div>
    )
}

/**
 * {
    "organism": "Escherichia coli str. K-12 substr. MG1658 ",
    "geneticBackground": "fnr-8myc ",
    "medium": "M9 minimal medium ",
    "aeration": "N2 100% ",
    "temperature": "37 ",
    "ph": null,
    "pressure": null,
    "opticalDensity": null,
    "growthPhase": "exponential phase",
    "growthRate": null,
    "vesselType": null,
    "aerationSpeed": null,
    "__typename": "HTGrowthCondition"
}
 */