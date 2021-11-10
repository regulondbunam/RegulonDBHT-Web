import React, { useState } from 'react';
import Autocomplete from './autocomplete';
import './Builder.css'
import DropDown from 'D:/Proyectos/RegulonDB-Web-HT-Polanco/src/components/ui-components/input/buttons/drop_down.jsx'


export default function Builder() {
    const [_keyword, set_keyword] = useState()
    const arreglo = ["DatasetID", "ControlID", "Authors", "PMID", "Doi", "Title", "Date", "Pmcid", "Experiment", "ContrD", "Otro"]
    const [query, setQuery] = useState("");


    /*Obtiene el valor seleccionado en el boton DropDown y lo clasifica de acuerdo a la metadata para crear la pequela contulta que hara funcionar el componente "Autocompletar" */
    function identificar(value) {
        /*Convercion de valor a minusculas*/
        let valorMin = value;
        valorMin.toString();
        valorMin = valorMin.toLowerCase();

        /*Clasifica value de acuerdo a la metedata */
        switch (valorMin) {
            /*datasetId*/
            case "datasetid":
                {
                    let queryM = `${valorMin}`;
                    setQuery(queryM);
                    return
                }

            /*Publication*/
            case "pmid":
            case "doi":
            case "authors":
            case "title":
            case "date":
            case "pmcid":
                {
                    let queryM = `publication.${valorMin}`;
                    setQuery(queryM);
                    return
                }
            /*objectTested*/
            case "_id":
            case "name":
            case "synonyms":
            case "summary":
                {

                    let queryM = `objectTested.${valorMin}`;
                    setQuery(queryM);
                    return
                }
            case "activeConformations":
                {
                    let queryM = `objectTested.activeConformations`;
                    setQuery(queryM);
                    return
                }
            case "objecttested - genes - _id":
                {
                    let queryM = `objectTested.genes._id`;
                    setQuery(queryM);
                    return
                }
            case "objecttested - genes - name":
                {
                    let queryM = `objectTested.genes.name`;
                    setQuery(queryM);
                    return
                }
            case "objecttested - genes - distanceto":
                {
                    let queryM = `objectTested.genes.distanceTo`;
                    setQuery(queryM);
                    return
                }
            case "externalcrossreferences - externalcrossreferenceid":
                {
                    let queryM = `objectTested.externalcrossreferences.externalCrossReferenceId`;
                    setQuery(queryM);
                    return
                }
            case "externalcrossreferences - externalCrossReferenceName":
                {
                    let queryM = `objectTested.externalcrossreferences.externalCrossReferenceName`;
                    setQuery(queryM);
                    return
                }
            case "externalcrossreferences - objectId":
                {
                    let queryM = `objectTested.externalcrossreferences.objectId`;
                    setQuery(queryM);
                    return
                }
            case "objectTested.externalcrossreferences.url":
                {
                    let queryM = `objectTested.externalcrossreferences.url`;
                    setQuery(queryM);
                    return
                }

            /*SourceSerie*/
            case "sourceID":
                {
                    let queryM = `sourceSerie.sourceID`;
                    setQuery(queryM);
                    return
                }
            case "sourceName":
                {
                    let queryM = `sourceSerie.sourceName`;
                    setQuery(queryM);
                    return
                }
            case "platformID":
                {
                    let queryM = `sourceSerie.platformID`;
                    setQuery(queryM);
                    return
                }
            case "platformTitle":
                {
                    let queryM = `sourceSerie.platformTitle`;
                    setQuery(queryM);
                    return
                }
            case "title - SourceSerie":
            case "strategy":
            case "method":
                {
                    let queryM = `sourceSerie.${valorMin}`;
                    setQuery(queryM);
                    return
                }

            /*Sample*/
            case "experimentid":
                {
                    let queryM = `sample.experimentid`;
                    setQuery(queryM);
                    return
                }
            case "controlid - sample":
                {
                    let queryM = `sample.controlId`;
                    setQuery(queryM);
                    return
                }
            case "title - sample":
                {
                    let queryM = `sample.title`;
                    setQuery(queryM);
                    return
                }
            /*linkedDataset*/
            case "controlId":
                {
                    let queryM = `linkedDataset.controlId`;
                    setQuery(queryM);
                    return
                }
            case "experimentId":
                {
                    let queryM = `linkedDataset.experimentId`;
                    setQuery(queryM);
                    return
                }
            case "datasetType":
                {
                    let queryM = `linkedDataset.datasetType`;
                    setQuery(queryM);
                    return
                }

            /*referenceGenome*/
            case "referencegenome":
                {
                    let queryM = `referenceGenome`;
                    setQuery(queryM);
                    return
                }
            /*datasetType*/
            case "datasettype":
                {
                    let queryM = `datasetType`;
                    setQuery(queryM);
                    return
                }
            /*temporalDatasetID*/
            case "temporaldatasetid":
                {
                    let queryM = `temporalDatasetID`;
                    setQuery(queryM);
                    return
                }
            /*growthConditions*/
            case "organism":
            case "medium":
            case "aeration":
            case "temperature":
            case "ph":
            case "pressure":
                {
                    let queryM = `growthConditions.${valorMin}`;
                    setQuery(queryM);
                    return
                }
            case "geneticbackground":
                {
                    let queryM = `growthConditions.geneticBackground`;
                    setQuery(queryM);
                    return
                }
            case "opticaldensity":
                {
                    let queryM = `growthConditions.opticalDensity`;
                    setQuery(queryM);
                    return
                }
            case "growthphase":
                {
                    let queryM = `growthConditions.growthPhase`;
                    setQuery(queryM);
                    return
                }
            case "growthrate":
                {
                    let queryM = `growthConditions.growthRate}`;
                    setQuery(queryM);
                    return
                }
            case "vesseltype":
                {
                    let queryM = `growthConditions.vesselType`;
                    setQuery(queryM);
                    return
                }
            case "aerationspeed":
                {
                    let queryM = `growthConditions.aerationSpeed`;
                    setQuery(queryM);
                    return
                }


            /*releaseDataControl*/
            case "date - releasedatacontrol":
                    {
                        let queryM = `releaseDataControl.date`;
                        setQuery(queryM);
                        return
                    }
            case "version":
                {
                    let queryM = `releaseDataControl.${valorMin}`;
                    setQuery(queryM);
                    return
                }
            default: 
            //no hagas nada
        }

    }

    function imprimir() {
        console.log(query);
    }



    return (
        <div>
            <div>
                <h3 >Builder</h3>
                <DropDown
                    label="All Fields"
                    arrayOptions={arreglo}
                    parentCallBack={identificar}
                />
                <input id="builder_text" type="text" className="TextArea" onChange={() => {
                    imprimir();
                    let keyword = document.getElementById("builder_text").value
                    set_keyword(keyword)
                }} />
                <button className="iconButton" ><i className='bx bx-plus-circle'></i></button>
                <button >AND</button>
            </div>
            <div className="IndexList">
                <p>Show Index</p>
            </div>
            <div className="SearchButton">
                <button className="accent">Search</button>
            </div>
            <Autocomplete keyword={_keyword} location={query} />

        </div>
    );
}


//