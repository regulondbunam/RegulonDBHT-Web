import React, { useState } from 'react';
// import Autocomplete from './autocomplete';
import './Builder.css'
import DropDown from 'D:/Proyectos/RegulonDB-Web-HT-Polanco/src/components/ui-components/input/buttons/drop_down.jsx'


export default function Builder() {
    //const [_keyword, set_keyword] = useState()
    const [query, setQuery] = useState("");
    const Metadata = [
        "ID",//DatasetID
        "PMID", "Doi", "Authors", "Title", "Date", "PmcId", //Publication
        "ID - ObjectTested", "Name", "Synonymus", "Summary", "Active Conformations", "ID - Gene", "Name - Gene", "Distance to - Gene", "ID - Esternal Cros References", "Name - Esternal Cros References", "Object ID - Esternal Cros References", "URL - Esternal Cros References",//ObjecTested
        "Source ID", "Source Name", "Plataform ID", "Plataform Title", "Title - Source Serie", "Strategy", "Method",//Source Serie
        "Experiment ID", "Control ID - Sample", "Tile - Sample",//Sample
        "Control ID - Linked Dataset", "Experiment ID - Linked Dataset", "Dataset Type - Linked DataSet",//Linked Dataset
        "Reference Genome", //Referenced genome
        "Dataset Type", //Datset Type
        "Temporal ID", //Temporal Datset ID
        "Date - Rekease data control", "version",//Release Dat Control  
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
    function identificar(Value) {
        metadataIdentificada.map((value) => {
            if (value.value === Value) {
                setQuery(value.query)
            }
            return  query
        })
    }
    

    return (
        <div>
            <div>
                <h3 >Builder</h3>
                <DropDown
                    label="All Fields"
                    arrayOptions={Metadata}
                    parentCallBack={identificar}
                />
                <input id="builder_text" type="text" className="TextArea" /* onChange={() => {
                    // imprimir();
                    let keyword = document.getElementById("builder_text").value
                    set_keyword(keyword)
                }} */ />
                <button className="iconButton" ><i className='bx bx-plus-circle'></i></button>
                <button >AND</button>
            </div>
            <div className="IndexList">
                <p>Show Index</p>
            </div>
            <div className="SearchButton">
                <button className="accent">Search</button>
            </div>
           {/*  <Autocomplete keyword={_keyword} location={query} /> */}

        </div>
    );
}


//    