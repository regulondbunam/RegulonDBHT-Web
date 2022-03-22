import React, { useState, useMemo } from 'react'
import GetNLPGC from '../../../webServices/nlpGrowthCondition/nlpgc_dataset'
import { SpinnerCircle } from '../../../../../components/ui-components/ui_components'

export default function NLPgc({ datasetId }) {
    const [_nlpgc, set_nlpgc] = useState()
    console.log(_nlpgc);
    let informations = useMemo(() => {
        if (!_nlpgc) {
            return null
        }
        let inf = []
        //inf.push({title:"",data:""});
        _nlpgc?.additionalProperties.length > 0 && inf.push({ title: "Additional Properties", data: _nlpgc?.additionalProperties });
        _nlpgc?.aeration.length > 0 && inf.push({ title: "Aeration", data: _nlpgc?.aeration });
        _nlpgc?.aerationSpeed.length > 0 && inf.push({ title: "Aeration Speed", data: _nlpgc?.aerationSpeed });
        _nlpgc?.geneticBackground.length > 0 && inf.push({ title: "Genetic Background", data: _nlpgc?.geneticBackground });
        _nlpgc?.growthPhase.length > 0 && inf.push({ title: "Growth Phase", data: _nlpgc?.growthPhase });
        _nlpgc?.growthRate.length > 0 && inf.push({ title: "Growth Rate", data: _nlpgc?.growthRate });
        _nlpgc?.medium.length > 0 && inf.push({ title: "Medium", data: _nlpgc?.medium });
        _nlpgc?.mediumSupplements.length > 0 && inf.push({ title: "Medium Supplements", data: _nlpgc?.mediumSupplements });
        _nlpgc?.opticalDensity.length > 0 && inf.push({ title: "Optical Density", data: _nlpgc?.opticalDensity });
        _nlpgc?.organism.length > 0 && inf.push({ title: "Organism", data: _nlpgc?.organism });
        _nlpgc?.ph.length > 0 && inf.push({ title: "PH", data: _nlpgc?.ph });
        _nlpgc?.temperature.length > 0 && inf.push({ title: "Temperature", data: _nlpgc?.temperature });
        _nlpgc?.pressure.length > 0 && inf.push({ title: "Pressure", data: _nlpgc?.pressure });
        _nlpgc?.vesselType.length > 0 && inf.push({ title: "Vessel Type", data: _nlpgc?.vesselType });
        return inf;
    }, [_nlpgc])
    if (!_nlpgc) {
        return (
            <div>
                <GetNLPGC id_dataset={datasetId}
                    resoultsData={(data) => { set_nlpgc(data) }}
                />
                <SpinnerCircle />
            </div>
        )
    }
    if (informations.length < 1) {
        return null
    }
    return (
        <div>
            <h2>
                NLP Growth Conditions
            </h2>
            <div>
            {
                informations.map((inf,j) => {
                    return (
                        <div>
                            <table key={`table_nlpgc${j}_${inf.title}`} className='table_content' >
                                <thead>
                                    <tr>
                                        <th colSpan={4} >{inf.title}</th>
                                    </tr>
                                    <tr>
                                        <th>Value</th>
                                        <th>Field</th>
                                        <th>Score</th>
                                        <th>Phrase</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        inf.data.map((gc, i) => {
                                            return (
                                                <React.Fragment key={`table_nlpgc_${i}_${inf.title.replace(" ","_")}_${gc.value.replace(" ","_")}`} >
                                                    <tr >
                                                        <td>{gc.value}</td>
                                                        <td>{gc.nameField}</td>
                                                        <td>{gc.score}</td>
                                                        <td><button className='aBase' 
                                                            onClick={(e)=>{
                                                                let myButton = e.target
                                                                let phraseRow = document.getElementById(`phrase_${i}_${inf.title}_${gc.value}`)
                                                                if(phraseRow){
                                                                    if(phraseRow.style.display === 'none'){
                                                                        phraseRow.style.display = 'contents'
                                                                        myButton.innerHTML = 'hide'
                                                                    }else{
                                                                        phraseRow.style.display = 'none'
                                                                        myButton.innerHTML = 'view'
                                                                    }
                                                                }
                                                            }}
                                                            >
                                                            view
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr id={`phrase_${i}_${inf.title.replace(" ","_")}_${gc.value.replace(" ","_")}`} style={{display: 'none'}} >
                                                        <td colSpan={4} id={`phrase_td_${i}_${inf.title}_${gc.value}`} >
                                                            {gc.associatedPhrase}
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <br />
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}
