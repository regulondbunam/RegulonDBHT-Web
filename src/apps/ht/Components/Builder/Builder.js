import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Builder.css'


export default function Builder() {
    const [_keyword, set_keyword] = useState()
    const [activo, setActivo] = useState(false)
    const [query, setQuery] = useState()
    const [turnOff, setTurnOff] = useState(false)
    const [buildedQuery, setBuildedQuery] = useState()
    const history = useHistory();

    const Metadata = [
        //DatasetID
        "DatasetID",
        
        //Publication
        "PMID",
        "DOI",
        "Authors",
        "Publication Title",
        "Publication Date",
        "PMCID",
        
        //ObjecTested
        "RegulonDB TF ID",
        "TF Name",
        "TF Synonyms",
        "TF Gene Name",
        "DBxRef Name",
        "DBxRef ID",
        
        //Source Serie
        "Serie ID",
        "Source DBName",
        "Platform ID",
        "Platform Title",
        "Serie Title",
        "Experiment Strategy",
        "Experiment Method",
        "Experiment sample ID",
        "Control sample ID",
        "Experiment Title",//Sample
        "Reference genome", //Referenced genome
        "Growth Conditions",//Growth Conditions
    ]

    const MetadataGC = [
        "Organism",
        "Genetic Background",
        "Medium",
        "Medium Supplements",
        "Aeration",
        "Temperature",
        "Ph",
        "Pressure",
        "Optical Density",
        "Growth Phase",
        "Growth Rate",
        "Vessel Type",
        "Aeration Speed"
    ]

    const metadataIdentificada = [
        //DatasetID
        { "value": "DatasetID", "query": "_id" },
        //Publication
        { "value": "PMID", "query": "publication.pmid" },
        { "value": "DOI", "query": "publication.doi" },
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
        { "value": "Growth Conditions", "query": "" },
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


    /*Obtiene el valor seleccionado en el boton DropDown y lo clasifica de acuerdo a la metadata para crear la pequela contulta que hara funcionar el componente "Autocompletar" */
    function identificar() {

        let Value = document.getElementById("metadataDD").value;
        metadataIdentificada.map((value) => {
            if (value.value === Value) {
                if (Value !== "Growth Conditions") {
                    setQuery(value.query)
                    /* setActivo(false) */
                } else {
                    setTurnOff(true)
                    setActivo(true)
                }
            }
            return query
        })
    }

    function identificarGC() {
        let Value = document.getElementById("metadataGC").value;
        metadataIdentificada.map((value) => {
            if (value.value === Value) {
                setQuery(value.query)
            }
            return query
        })

    }

    function BuildQuery() {
        if (_keyword !== "" && query !== "") {
            let queryBox = document.getElementById("query_area");
            let operador = ""
            if (queryBox) {
                if (BuildQuery) {
                    let op = document.getElementById("operador")
                    if (op) {
                        operador = op.value
                    }
                }
                queryBox.value = `${queryBox.value}${operador}${_keyword}[${query}]`
            }
            if (buildedQuery) {
                setBuildedQuery(`${buildedQuery} ${operador} ${_keyword}[${query}]`);
            } else {
                setBuildedQuery(`${_keyword}[${query}]`);
            }
        } else {
            console.log("Vacio")
        }

    };





    /* function imprimir() {
        console.log(buildedQuery)
    } */

    return (
        <div>
            <div className="builderTitle">
                <h3 >Builder</h3>
            </div>
            <div className="firstRow">
                <div className="dropdownCont" >
                    <select label="Nombre" id="metadataDD" className="dropDownBtn" onClick={identificar} onChange={(e) => {
                        let value = e.target.value
                        console.log(value)
                        if (value === "Growth Conditions") {
                            setActivo(true)
                        } else {
                            setActivo(false)
                            setTurnOff(false)
                        }
                    }}>
                        <option value="" >All fields</option>
                        {
                            Metadata.map((data, i) => {
                                return (
                                    <option value={data} key={`${data}_${i}`}  >{data}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <input
                    id="builder_text"
                    type="text"
                    className="TextArea"
                    disabled={turnOff}
                    onChange={() => {
                        let keyword = document.getElementById("builder_text").value
                        console.log(keyword)
                        set_keyword(keyword);
                    }}
                />
                <button className="iconButton" disabled={turnOff} onClick={BuildQuery}><i className='bx bx-plus-circle'></i></button>
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
            <div className="IndexList">
                <p disabled={turnOff}>Show Index</p>
            </div>
            <div className="secondRow">
                {activo === true &&
                    <div >
                        <h3>Growth Conditions</h3>
                        <div className="container">
                            <div className="dropdownCont">
                                <select label="Nombre" id="metadataGC" className="dropDownBtn" onClick={identificarGC}>
                                    <option value="" id="metadataGC">All fields</option>
                                    {
                                        MetadataGC.map((data, i) => {
                                            return (
                                                <option value={data} key={`${data}_${i}`}  >{data}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <input
                                id="builder_GC"
                                type="text"
                                className="TextArea"
                                onChange={() => {
                                    let keyword = document.getElementById("builder_GC").value
                                    console.log(keyword)
                                    set_keyword(keyword);
                                }} />
                            <button className="iconButton" onClick={BuildQuery}><i className='bx bx-plus-circle'></i></button>
                            <div className="dropdownCont" >
                                <select label="Nombre" className="dropDownBtn" id="operador">
                                    <option value="AND"  >AND</option>
                                    <option value="OR" >OR</option>
                                    <option value="NOT" >NOT</option>
                                </select>
                            </div>
                        </div>
                        <div className="IndexList">
                            <p>Show Index</p>
                        </div>
                    </div>}
            </div>
            <div className="SearchButton" id="builder_search" >

                <button className="accent" disabled={(_keyword === undefined || _keyword === "") || query === undefined} style={{ marginRight: "1%" }} onClick={() => {
                    if (buildedQuery) {
                        history.push(`/dataset/query/${buildedQuery} AND TFBINDING[datasetType]`)
                    } else {
                        if (activo === true) {//consultar builder de GC
                            let keyword = document.getElementById("builder_GC").value
                            history.push(`/dataset/query/${keyword}[${query}] AND TFBINDING[datasetType]`)
                        } else {
                            //Coonsultar builder normal
                            let keyword = document.getElementById("builder_text").value
                            history.push(`/dataset/query/${keyword}[${query}] AND TFBINDING[datasetType]`)
                        }
                    }
                }}>Search</button>
            </div>
            {/*  <Autocomplete keyword={_keyword} location={query} /> */
            /* to={`/dataset/query/${buildedQuery} AND TFBINDING[datasetType]`} */}

        </div>
    );
}


//    