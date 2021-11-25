import React, { useState } from 'react';
import './Builder.css'


export default function Builder() {
    const [_keyword, set_keyword] = useState("")
    const [activo, setActivo] = useState(false)
    const [query, setQuery] = useState("")
    const [turnOff, setTurnOff] = useState(false)
    const [buildedQuery, setBuildedQuery] = useState()

    const Metadata = [
        "hola munod",//DatasetID
        "PMID", "Doi", "Authors", "Title", "Date", "PmcID", //Publication
        "ID - ObjectTested", "Name - Object tested", "Synonymus", "Summary", "Active Conformations", "ID - Gene", "Name - Gene", "Distance to - Gene", "ID - Esternal Cros References", "Name - Esternal Cros References", "Object ID - Esternal Cros References", "URL - Esternal Cros References",//ObjecTested
        "Source ID", "Source Name", "Plataform ID", "Plataform Title", "Title - Source Serie", "Strategy", "Method",//Source Serie
        "Experiment ID", "Control ID - Sample", "Tile - Sample",//Sample
        "Control ID - Linked Dataset", "Experiment ID - Linked Dataset", "Dataset Type - Linked DataSet",//Linked Dataset
        "Reference Genome", //Referenced genome
        "Dataset Type", //Datset Type
        "Temporal ID", //Temporal Datset ID
        "Growth Conditions",//Growth Conditions
        "Date - Rekease data control", "version",//Release Dat Control
    ]

    const MetadataGC = [
        "Organism",
        "Genetic Background",
        "Medium",
        "Aeration",
        "Temperature",
        "Ph",
        "Pressure",
        "OpticalDensity",
        "Growth Phase",
        "Growth Rate",
        "Vessel Type",
        "Aeration Speed"
    ]

    const metadataIdentificada = [
        //DatasetID
        { "value": "ID", "query": "_id" },
        //Publication
        { "value": "PMID", "query": "publication.pmid" },
        { "value": "Doi", "query": "publication.doi" },
        { "value": "Authors", "query": "publication.authors" },
        { "value": "Title", "query": "publication.title" },
        { "value": "Date", "query": "publication.date" },
        { "value": "PmcId", "query": "publication.pmcid" },
        //ObjectTested
        { "value": "ID - ObjectTested", "query": "objectTested._id" },
        { "value": "Name", "query": "objectTested.name" },
        { "value": "Synonymus", "query": "objectTested.synonymus" },
        { "value": "Summary", "query": "objectTested.summary" },
        { "value": "Active Conformations", "query": "objectTested.activeConformations" },
        { "value": "ID - Gene", "query": "objectTested.gene._id" },
        { "value": "Name - Gene", "query": "objectTested.gene.Name" },
        { "value": "Distance to - Gene", "query": "objectTested.gene.distanceTo" },
        { "value": "ID - Esternal Cros References", "query": "objectTested.externalCrosReferenced.externalCrosReferencedId" },
        { "value": "Name - Esternal Cros References", "query": "objectTested.externalCrosReferenced.externalCrosReferencedName" },
        { "value": "Object ID - Esternal Cros References", "query": "objectTested.externalCrosReferenced.objectId" },
        { "value": "URL - Esternal Cros References", "query": "objectTested.externalCrosReferenced.url" },
        //Source Serie
        { "value": "Source ID", "query": "sourceSerie.sourceID" },
        { "value": "Source Name", "query": "sourceSerie.sourceName" },
        { "value": "Plataform ID", "query": "sourceSerie.plataformID" },
        { "value": "Plataform Title", "query": "sourceSerie.plataformTitle" },
        { "value": "Title - Source Serie", "query": "sourceSerie.title" },
        { "value": "Strategy", "query": "sourceSerie.strategy" },
        { "value": "Method", "query": "sourceSerie.method" },
        //Sample
        { "value": "Experiment ID", "query": "sample.experimentId" },
        { "value": "Control ID - Sample", "query": "sample.controlId" },
        { "value": "Tile - Sample", "query": "sample.title" },
        //Linked Dataset
        { "value": "Control ID - Linked Dataset", "query": "linkedDatset.controlId" },
        { "value": "Experiment ID - Linked Dataset", "query": "linkedDatset.ExperimentId" },
        { "value": "Dataset Type - Linked Dataset", "query": "linkedDatset.datasetType" },
        //Referenced Genome
        { "value": "Reference Genome", "query": "referenceGenome" },
        //Dataset type
        { "value": "Dataset Type", "query": "datasetType" },
        //Temporal Dataset ID
        { "value": "Temporal ID", "query": "temporalId" },
        //Growth Conditions
        { "value": "Growth Conditions", "query": "Entro en condiciones de crecimento" },
        //Release Data Control
        { "value": "Date - Rekease data control", "query": "releaseDataControl.date" },
        { "value": "version", "query": "releaseDataControl.version" },

    ]


    /*Obtiene el valor seleccionado en el boton DropDown y lo clasifica de acuerdo a la metadata para crear la pequela contulta que hara funcionar el componente "Autocompletar" */
    function identificar() {
        let Value = document.getElementById("metadataDD").value;
        metadataIdentificada.map((value) => {
            if (value.value === Value) {
                if (Value !== "Growth Conditions") {
                    setQuery(value.query)
                } else {
                    setTurnOff(true)
                    setActivo(true)
                }
            }
            return query
        })
    }

    function BuildQuery() {
        if (_keyword !== "" && query !== "") {
            let queryBox = document.getElementById("query_area");
            let operador = ""
            if (queryBox) {
                if(BuildQuery){
                    let op = document.getElementById("operador")
                    if(op){
                        operador = op.value
                    }
                }
                queryBox.value = `${queryBox.value } ${operador} ${_keyword}[${query}]`
            }
            setBuildedQuery(`${_keyword}[${query}]`);
        } else {
            console.log("Vacio")
        }

    };

    function imprimir() {
        console.log(buildedQuery)
    }

    return (
        <div>
            <div className="builderTitle">
                <h3 >Builder</h3>
            </div>
            <div className="firstRow">
                <div className="dropdownCont" >
                    <select label="Nombre" className="dropDownBtn" id="metadataDD" disabled={turnOff} onClick={identificar}>
                        <option value="" className=".dropDownBtn-content" >All fields</option>
                        {
                            Metadata.map((data) => {
                                return (
                                    <option value={data} key={data} className=".dropDownBtn-content" >{data}</option>
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
                        set_keyword(keyword);
                    }}
                />
                <button className="iconButton" disabled={turnOff} onClick={BuildQuery}><i className='bx bx-plus-circle'></i></button>
                {
                    buildedQuery
                        ?<div className="dropdownCont" >
                            <select label="Nombre" className="dropDownBtn" id="operador" disabled={turnOff}>
                                <option value="AND" className=".dropDownBtn-content" >AND</option>
                                <option value="OR" className=".dropDownBtn-content">OR</option>
                                <option value="NOT" className=".dropDownBtn-content">NOT</option>
                            </select>
                            </div>
                        :null
                }
            </div>
            <div className="IndexList">
                <p disabled={turnOff}>Show Index</p>
            </div>
            <div className="SearchButton" id="builder_search" >
                <button className="accent" disabled={buildedQuery === undefined} >Search</button>
            </div>
            <div className="secondRow">
                {activo === true &&
                    <div >
                        <h3>Gorwth Conditions</h3>
                        <div className="container">
                            <div className="dropdownCont">
                                <select label="Nombre" className="dropDownBtn" id="metadataDD" onClick={identificar}>
                                    <option value="" className=".dropDownBtn-content" >All fields</option>
                                    {
                                        MetadataGC.map((data) => {
                                            return (
                                                <option value={data} key={data} className=".dropDownBtn-content" >{data}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <input id="builder_GC" type="text" className="TextArea" />
                            <button className="iconButton" onClick={BuildQuery}><i className='bx bx-plus-circle'></i></button>
                            <div className="dropdownCont" >
                                <select label="Nombre" className="dropDownBtn" id="operaciones">
                                    <option value="AND" className=".dropDownBtn-content" >AND</option>
                                    <option value="OR" className=".dropDownBtn-content">OR</option>
                                    <option value="NOT" className=".dropDownBtn-content">NOT</option>
                                </select>
                            </div>
                        </div>
                        <div className="IndexList">
                            <p>Show Index</p>
                        </div>
                    </div>}
            </div>
            {/*  <Autocomplete keyword={_keyword} location={query} /> */}

        </div>
    );
}


//    