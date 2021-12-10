import React, { useState, useMemo } from 'react'
import { SpinnerCircle } from '../../../components/ui-components/ui_components'
import GetNLPGC from '../webServices/nlpGrowthCondition/nlpgc_dataset'

export default function NLPGC({ id_dataset }) {
    const [_data, set_data] = useState()
    const [_state, set_state] = useState()
    return (
        <div>
            {
                _state === "loading" && <SpinnerCircle />
            }
            <GetNLPGC id_dataset={id_dataset}
                status={(state) => { set_state(state) }}
                resoultsData={(data) => { set_data(data) }}
            />
            {
                _data && <ViewNLPGC data={_data} />
            }
        </div>
    )
}


function ViewNLPGC({ data }) {
    let informations = useMemo(() => {
        let inf = []
        //inf.push({title:"",data:""});
        inf.push({ title: "Organism", data: data?.organism });
        inf.push({ title: "Genetic Background", data: data?.geneticBackground });
        inf.push({ title: "Medium", data: data?.medium });
        inf.push({ title: "Aeration", data: data?.aeration });
        inf.push({ title: "Temperature", data: data?.temperature });
        inf.push({ title: "PH", data: data?.ph });
        inf.push({ title: "Pressure", data: data?.pressure });
        inf.push({ title: "Optical Density", data: data?.opticalDensity });
        inf.push({ title: "Growth Phase", data: data?.growthPhase });
        inf.push({ title: "Growth Rate", data: data?.growthRate });
        inf.push({ title: "Vessel Type", data: data?.vesselType });
        inf.push({ title: "Aeration Speed", data: data?.aerationSpeed });
        inf.push({ title: "Medium Supplements", data: data?.mediumSupplements });
        //inf.push({title:"AdditionalProperties",data: data?.});
        return inf;
    }, [data])
    return (
        <div>
            <h2>NLP Growth Conditions</h2>
            <div style={{ marginLeft: "5%" }} >
                {
                    informations
                        ? informations.map((gc, i) => {
                            return <BitInfo key={`bgrowth_${i}_${gc.title}`} title={gc.title} data={gc.data} />
                        })
                        : null
                }
            </div>
        </div>
    )
}

function BitInfo({ title, data }) {
    if (Array.isArray(data) && !data.length) {
        return null
    }
    return (
            <table className="table_content" style={{width: '70%'}} >
                <thead>
                    <tr>
                        <th colSpan="3">
                            {title}
                        </th>
                    </tr>
                    <tr>
                            <td style={{ fontSize: "12px", textAlign: "center" }} >Value</td>
                            <td style={{ fontSize: "12px", textAlign: "center" }} >Score</td>
                            <td style={{ fontSize: "12px", textAlign: "center" }} >Phrase</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d, i) => {
                            return <BoxData key={`box_${title}_${i}`} data={d} />
                        })
                    }
                </tbody>
            </table>
    )
}

function BoxData({ data }) {
    return (
        <tr>
            <td style={{ fontSize: "12px", textAlign: "center" }} className="p_accent">
                {data?.value}
            </td>
            {
                data?.score
                    ? <td style={{ fontSize: "10px", textAlign: "center" }}>
                        {`score: ${data?.score}`}
                    </td>
                    : <td></td>
            }
            <td style={{ fontSize: "12px", textAlign: "center" }}>
                {data?.associatedPhrase}
            </td>
        </tr>
    )
}

/**ç

 */