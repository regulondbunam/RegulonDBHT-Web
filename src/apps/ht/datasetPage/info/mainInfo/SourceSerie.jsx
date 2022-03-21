import React from 'react'

let Style = {}

Style.gridContainer = {
    display: "grid",
    gridGap: "3px",
    gridAutoFlow: "dense",
    gridTemplateColumns: "repeat(auto-fill,minmax(100px, 1fr))"
}
Style.gridItem = {
    display: "grid",
    backgroundColor: "rgb(243, 220, 171)",
    textAlign: "center",
    verticalAlign: "middle",
    padding: "5px",
}

export default function SourceSerie({ sourceSerie }) {

    return (
        <div style={{ marginLeft: "3%" }}>
            {
                sourceSerie?.title && <p className="p_accent" >{sourceSerie?.title}</p>
            }
            <div style={Style.gridContainer} >
                <BitInfo title={"Strategy"} data={sourceSerie?.strategy} />
                <BitInfo title={"Method"} data={sourceSerie?.metod} />
            </div>
            {
                sourceSerie?.series.length > 0 && <div style={Style.gridContainer} >
                    {
                        sourceSerie.series.map((serie)=>{
                            return(
                                <BitInfo key={serie.sourceId} data={serie?.sourceName} />
                            )
                        })
                    }
            </div>
            }
            {
                sourceSerie?.platform?.title && <div>
                    <p style={{fontSize: "14px"}} >Platform: {sourceSerie?.platform?.title}</p>
                    {
                        sourceSerie?.platform?.source && <p>source: {sourceSerie?.platform?.source}</p>
                    }
                </div>
            }
            
        </div>
    )
}



function BitInfo({ title, data }) {
    if (!data) {
        return null
    }
    return (
        <div style={Style.gridItem}>
           {
               title && <p style={{ fontSize: "12px", textAlign: "center" }} className="p_accent">
               {title}
           </p>
           }
            <p style={{ fontSize: "14px", textAlign: "center" }}>
                {data}
            </p>
        </div>
    )
}