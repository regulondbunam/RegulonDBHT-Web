import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Autocomplete from "../Autocomplete/autocomplete"
import Autocompletev02 from "../Autocompletev02/Autocomplete";
import './Builder.css'
import { QUERY } from '../Autocomplete/query';
import { QUERY_NLPGC } from '../Autocomplete/query_nlpgc';

const META_DATA = [
    //DatasetID
    { "value": "DatasetID", "query": "_id" },
    //Publication
    { "value": "PMID", "query": "publications.pmid" },
    /* { "value": "DOI", "query": "publication.doi" }, */
    { "value": "Authors", "query": "publications.authors" },
    { "value": "Publication Title", "query": "publications.title" },
    { "value": "Publication Date", "query": "publications.date" },
    { "value": "PMCID", "query": "publications.pmcid" },
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

const META_NLPG = [
    { "value": "NLPG ID", "query": "_id" },
    //Organism
    { "value": "Organism", "query": "organism.value" },
    //Genetic Background
    { "value": "Genetic Background", "query": "geneticBackground.value" },
    //Medium
    { "value": "Medium", "query": "medium.value" },
    //Aeration
    { "value": "Aeration", "query": "aeration.value" },
    //Temperature
    { "value": "Temperature", "query": "temperature.value" },
    //PH
    { "value": "PH", "query": "ph.value" },
    //Pressure
    { "value": "Pressure", "query": "pressure.value" },
    //Optical density
    { "value": "Optical density", "query": "opticalDensity.value" },
    //Pressure
    { "value": "Optical density", "query": "opticalDensity.value" },
    //Growth phase
    { "value": "Growth phase", "query": "growthPhase.value" },
    //Growth rate
    { "value": "Growth rate", "query": "growthRate.value" },
    //Vessel type
    { "value": "Vessel type", "query": "vesselType.value" },
    //Aeratio speed
    { "value": "Aeration Speed", "query": "aerationSpeed.value" },
    //Medium supplements
    { "value": "Medium supplements", "query": "mediumSupplements.value" },
    //DatasetID
    { "value": "Dataset ID", "query": "datasetIds" },
    //TemporalID
    { "value": "temporal ID", "query": "temporalId" },
]


export default function Builder2({
    datasetType
}) {
    const [turnOff, setTurnOff] = useState(false) // habilita el formulario de GC
    const [buildedQuery, setBuildedQuery] = useState("") // contiene el query armado
    const [_keyword, set_keyword] = useState()
    const [query, setQuery] = useState("_id")
    const history = useHistory();
    const [nlpgc, setnlpgc] = useState()
    const [nlpgcop, setnlpgcop] = useState()
    const [op, setOp] = useState()

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
        let Input1 = document.getElementById("builder_text");
        let DD1 = document.getElementById("metadataDD");
        let Input2 = document.getElementById("builder_GC");
        let DD2 = document.getElementById("metadataGC");
        let nlpgcQuery = ""
        let query = ""
        let ruta
        let queryBox = document.getElementById("query_area");
        let operador
        let term
        if (turnOff) {
            operador = document.getElementById("operadorGC")
            ruta = document.getElementById("metadataGC").value;
            term = document.getElementById("builder_GC").value;
        } else {
            ruta = document.getElementById("metadataDD").value;
            operador = document.getElementById("operador")
            term = document.getElementById("builder_text").value;
        }
        let coma = term.split(';');
        if (coma.length > 1) {
            term = coma[0] + ""
        }
        if (!term || term === "" || !ruta) {
            alert("Search term is required")
            return null
        }
        if (operador) {
            operador = operador.value
        } else {
            operador = ""
        }

        if (datasetType === "GENE_EXPRESSION") {
            if (turnOff) {
                if (nlpgc) {
                    nlpgcQuery = ` ${operador} '${term}'[${ruta}]`
                } else {
                    if (nlpgcop) {
                        nlpgcQuery = ` NLPGC${operador}'${term}'[${ruta}]`
                        setnlpgc(true);
                    }
                    nlpgcQuery = ` NLPGC '${term}'[${ruta}]`
                    setnlpgc(true);
                    setnlpgcop(true);
                }
            } else {
                if (op) {
                    query = `'${term}'[${ruta}] ${operador} `
                } else {
                    query = `'${term}'[${ruta}]`
                    setOp(true);
                }
            }

        } else {
            query = `${operador}'${term}'[${ruta}]`

        }

        if (turnOff) {
            if(buildedQuery){
                let OP2 = document.getElementById("operadorGC");
                OP2.selectedIndex = 0;
            }
            Input2.value = "";
            DD2.selectedIndex = 0;

        } else {
            if (buildedQuery) {
                let OP1 = document.getElementById("operador");
                OP1.selectedIndex = 0;
            }
            Input1.value = "";
            DD1.selectedIndex = 0;
        }


        if (queryBox) {
            queryBox.value = `${query}${buildedQuery}${nlpgcQuery}`
            setBuildedQuery(`${query}${buildedQuery}${nlpgcQuery}`)
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
                DD2.selectedIndex = 0;
                OP2.selectedIndex = 0;
                Input2.value = "";
                queryBox.value = "";
                setBuildedQuery(undefined);
            } else {
                //resetear formulario B
                let OP1 = document.getElementById("operador");
                DD1.selectedIndex = 0;
                OP1.selectedIndex = 0;
                Input1.value = "";
                queryBox.value = "";
                setBuildedQuery(undefined);
            }
        } else {
            if (turnOff) {
                Input2.value = "";
                DD2.selectedIndex = 0
                setTurnOff(undefined);
            } else {
                Input1.value = "";
                DD1.selectedIndex = 0;;
            }
        }


    }

    return (
        <div id="builder_HT" >
            <div>
                <div className="builderTitle">
                    <h3 >Builder</h3>
                </div>
                <Autocompletev02></Autocompletev02>
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
                                    /* if (datasetType === "GENE_EXPRESSION" && data?.query === "gc") {
                                        return null
                                    } */
                                    if (datasetType === "TFBINDING") {
                                        return (
                                            <option value={data?.query} key={`${data}_${i}`}>{data?.value}</option>
                                        )
                                    } else {
                                        if (data?.value !== "RegulonDB TF ID" && data?.value !== "TF Name" && data?.value !== "TF Synonyms" && data?.value !== "TF Gene Name") {
                                            return (
                                                <option value={data?.query} key={`${data}_${i}`}>{data?.value}</option>
                                            )
                                        } else {
                                            return null
                                        }
                                    }
                                })
                            }
                        </select>
                    </div>
                    <Autocomplete id="builder_text" datasetType={datasetType} query={query} QUERY_GQL={QUERY} turnOff={turnOff} set_keyword={(keyword) => { set_keyword(keyword) }} />
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
                                <select label="Nombre" id="metadataGC" className="dropDownBtn" onChange={(e) => {
                                    //console.log(e.target.value)
                                    setQuery(e.target.value)
                                }}>
                                    {datasetType === "GENE_EXPRESSION" ?

                                        META_NLPG.map((data, i) => {
                                            return (
                                                <option value={data?.query} key={`${data.value}_${i}`}  >{data.value}</option>
                                            )
                                        })
                                        :
                                        META_GC.map((data, i) => {
                                            return (
                                                <option value={data?.query} key={`${data.value}_${i}`}  >{data.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            {datasetType === "GENE_EXPRESSION" ?
                                <Autocomplete id="builder_GC" datasetType={datasetType} QUERY_GQL={QUERY} query={query} set_keyword={(keyword) => { set_keyword(keyword) }} />
                                :
                                <Autocomplete id="builder_GC" datasetType={datasetType} QUERY_GQL={QUERY} query={query} set_keyword={(keyword) => { set_keyword(keyword) }} />
                            }
                            <button className="iconButton" onClick={BuildQuery}><i className='bx bx-plus-circle'></i></button>
                            {
                                buildedQuery
                                    ? <div className="dropdownCont" >
                                        <select label="Nombre" className="dropDownBtn" id="operadorGC">
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                            <option value="NOT">NOT</option>
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
                            history.push(`/dataset/query/${fixQuery(`'${_keyword}'`)}[${query}] AND ${datasetType}[datasetType]`)
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

    let negativeCharacterArray = ["!", "@", "#", "$", "^", "&", "*", ">", "<", "?", "{", "}", "%"]
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
