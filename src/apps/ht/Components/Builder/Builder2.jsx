import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Autocomplete from "../Autocomplete/autocomplete"
import './Builder.css'

const META_DATA = [
    //DatasetID
    { "value": "DatasetID", "query": "_id" },
    //Publication
    { "value": "PMID", "query": "publication.pmid" },
    /* { "value": "DOI", "query": "publication.doi" }, */
    { "value": "Authors", "query": "publication.authors" },
    { "value": "Publication Title", "query": "publication.title" },
    { "value": "Publication Date", "query": "publication.date" },
    { "value": "PMCID", "query": "publication.pmcid" },
    //ObjectTested
    { "value": "RegulonDB TF ID", "query": "objectTested._id" },
    { "value": "TF Name", "query": "objectTested.name" },
    { "value": "TF Synonyms", "query": "objectTested.synonyms" },

    { "value": "TF Gene Name", "query": "objectTested.gene.name" },


    { "value": "DBxRef Name", "query": "objectTested.externalCrossReferences.externalCrossReferenceName" },
    { "value": "DBxRef ID", "query": "objectTested.externalCrossReferences.objectId" },

    //Source Serie
    { "value": "Serie ID", "query": "sourceSerie.sourceId" },
    { "value": "Source DBName", "query": "sourceSerie.sourceName" },
    { "value": "Platform ID", "query": "sourceSerie.plataformId" },
    { "value": "Platform Title", "query": "sourceSerie.plataformTitle" },
    { "value": "Serie Title", "query": "sourceSerie.title" },
    { "value": "Experiment Strategy", "query": "sourceSerie.strategy" },
    { "value": "Experiment Method", "query": "sourceSerie.method" },

    //Sample
    { "value": "Experiment Sample ID", "query": "sample.experimentId" },
    { "value": "Control Sample ID", "query": "sample.controlId" },
    { "value": "Experiment Title", "query": "sample.title" },

    //Referenced Genome
    { "value": "Reference genome", "query": "referenceGenome" },


    //Growth Conditions
    { "value": "Growth Conditions", "query": "gc" },
]

const META_GC = [
    { "value": "Organism", "query": "growthConditions.organism" },
    { "value": "Genetic Background", "query": "growthConditions.geneticBackground" },
    { "value": "Medium", "query": "growthConditions.medium" },
    { "value": "Medium Supplements", "query": "growthConditions.mediumSupplements" },
    { "value": "Aeration", "query": "growthConditions.aeration" },
    { "value": "Temperature", "query": "growthConditions.temperature" },
    { "value": "Ph", "query": "growthConditions.ph" },
    { "value": "Pressure", "query": "growthConditions.pressure" },
    { "value": "Optical Density", "query": "growthConditions.opticalDensity" },
    { "value": "Growth Phase", "query": "growthConditions.growthPhase" },
    { "value": "Growth Rate", "query": "growthConditions.growthRate" },
    { "value": "Vessel Type", "query": "growthConditions.vesselType" },
    { "value": "Aeration Speed", "query": "growthConditions.aerationSpeed" }
]

export default function Builder2({
    datasetType
}) {
    const [turnOff, setTurnOff] = useState(false) // habilita el formulario de GC
    const [buildedQuery, setBuildedQuery] = useState("") // contiene el query armado
    const [_keyword, set_keyword] = useState()
    const [query, setQuery] = useState("_id")
    const history = useHistory();

    useEffect(() => {

        const builder = document.getElementById("builder_HT")
        if (builder) {
            builder.addEventListener('builderR', function (e) {
                setBuildedQuery(e.detail.buildedQuery);
                set_keyword(e.detail._keyword);
            }, false);
        }
    }, [])

    function BuildQuery() {
        let ruta = document.getElementById("metadataDD").value;
        let queryBox = document.getElementById("query_area");
        let operador
        let term
        if(turnOff){
            operador  = document.getElementById("operadorGC")
            term  = document.getElementById("builder_GC").value;
        }else{
            operador  = document.getElementById("operador")
            term  = document.getElementById("builder_text").value;
        }
        if(!term || term === "" || !ruta ){
            alert("Search term is required")
            return null
        }
        if(operador){
            operador = operador.value
        }else{
            operador = ""
        }
        let query = `${operador}'${term}'[${ruta}]`
        if(queryBox){
            queryBox.value = query
            setBuildedQuery(`${buildedQuery} ${query}`)
        }
    }

    function clear() {
        let DD1 = document.getElementById("metadataDD");
        let Input1 = document.getElementById("builder_text");
        let DD2 = document.getElementById("metadataGC");
        let Input2 = document.getElementById("builder_GC");
        let queryBox = document.getElementById("query_area");
        if (buildedQuery) {
            if (turnOff) {
                //resetear formulario GC
                let OP2 = document.getElementById("operadorGC");
                DD2.value = "Organism";
                OP2.value = "AND";
                Input2.value = "";
                queryBox.value = "";
            } else {
                //resetear formulario B
                let OP1 = document.getElementById("operador");
                DD1.value = "DatasetID";
                OP1.value = "AND";
                Input1.value = "";
                queryBox.value = "";
            }
        }else {
            if (turnOff) {
                Input2.value = "";
                DD2.selectedIndex = 0
            } else{
                Input1.value = "";
                DD1.selectedIndex = 0
            }
        }
        

    }

    return (
        <div id="builder_HT" >
            <div>
                <div className="builderTitle">
                    <h3 >Builder</h3>
                </div>
                <div className="firstRow">
                    <div className="dropdownCont" >
                        <select label="Nombre" id="metadataDD" className="dropDownBtn" onChange={(e) => {
                            let value = e.target.value
                            setQuery(value)
                            if (value === "gc") {
                                setTurnOff(true)
                            } else {
                                setTurnOff(false)
                            }
                        }}>
                            {
                                META_DATA.map((data, i) => {
                                    return (
                                        <option value={data?.query} key={`${data}_${i}`}>{data?.value}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <Autocomplete id="builder_text" datasetType={datasetType} query={query} turnOff={turnOff} set_keyword={(keyword) => { set_keyword(keyword) }} />
                    <button className="iconButton" onClick={BuildQuery} disabled={turnOff}><i className='bx bx-plus-circle'></i></button>
                    {
                        buildedQuery
                            ? <div className="dropdownCont" >
                                <select label="Nombre" id="operador" className="dropDownBtn" disabled={turnOff}>
                                    <option value="AND"  >AND</option>
                                    <option value="OR" >OR</option>
                                    <option value="NOT" >NOT</option>
                                </select>
                            </div>
                            : null
                    }
                </div>
            </div>
            <div className="secondRow">
                {turnOff === true &&
                    <div className="contenedorGC">
                        <h3>Growth Conditions</h3>
                        <div className="container">
                            <div className="dropdownCont">
                                <select label="Nombre" id="metadataGC" className="dropDownBtn" onChange={(e)=>{
                                    setQuery(e.target.value)
                                }}>
                                    {
                                        META_GC.map((data, i) => {
                                            return (
                                                <option value={data?.query} key={`${data.value}_${i}`}  >{data.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <Autocomplete id="builder_GC" datasetType={datasetType} query={query} set_keyword={(keyword) => { set_keyword(keyword) }} />
                            <button className="iconButton" onClick={BuildQuery}><i className='bx bx-plus-circle'></i></button>
                            {
                                buildedQuery
                                    ? <div className="dropdownCont" >
                                        <select label="Nombre" className="dropDownBtn" id="operadorGC">
                                            <option value="AND"  >AND</option>
                                            <option value="OR" >OR</option>
                                            <option value="NOT" >NOT</option>
                                        </select>
                                    </div>
                                    : null
                            }

                        </div>
                    </div>}
            </div>


            <div className="SearchButton" id="builder_search" >
                <button className="button" onClick={clear}>Clear</button>
                <button className="accent" disabled={((_keyword === undefined || _keyword === "") /* || query === undefined */) && (buildedQuery === undefined || buildedQuery === "")} style={{ marginRight: "1%" }} onClick={() => {
                    let queryBox = document.getElementById("query_area");
                    if (queryBox.value) {
                        history.push(`/dataset/query/${fixQuery(queryBox.value)} AND ${datasetType}[datasetType]`)
                    } else {
                        if (turnOff) {//consultar builder de GC
                            history.push(`/dataset/query/${fixQuery(`'${_keyword}'`)}[${query}] AND ${datasetType}[datasetType]`)
                        } else {
                            //Coonsultar builder normal
                            history.push(`/dataset/query/'${fixQuery(`'${_keyword}'`)}'[${query}] AND ${datasetType}[datasetType]`)
                        }
                    }
                }}>Search</button>
            </div>
        </div>
    );
}

function fixQuery(query) {
    let brokeQueryArray = query.split('');
    let fixedQueryArray = [];
    //let especialCharacterArray = ["%", "_", "-", ";", ".", "/"];
    // String.remplace("","")
    let negativeCharacterArray = [",", "`", "~", "!", "@", "#", "$", "^", "&", "*", "+", "=", ":", ">", "<", ",", "?", "{", "}", "%"]
    for (let i = 0; i < brokeQueryArray.length; i++) {
        if (brokeQueryArray[i] !== "(") {
            for (let j = 0; j < negativeCharacterArray.length; j++) {
                if (brokeQueryArray[i] === negativeCharacterArray[j]) {
                    brokeQueryArray[i] = "";
                    fixedQueryArray[i] = brokeQueryArray[i];
                } else {
                    fixedQueryArray[i] = brokeQueryArray[i];
                }
            }
        } else {
            if (brokeQueryArray[i] === "(") {
                let ubi = 0;
                for (let t = 0; t < brokeQueryArray.length; t++) {
                    if (brokeQueryArray[t] === "'")
                        ubi = t - 1;
                }
                i = ubi;
            }
        }

    }
    return fixedQueryArray.toString().replace(/,/g, '');
}