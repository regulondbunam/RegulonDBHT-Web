import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Builder.css'
import { QUERY } from '../Autocomplete/query';
//import { QUERY_NLPGC } from '../Autocomplete/query_nlpgc';
import DataSolver from '../DataSolver/DataSolver';
import Autocompletev02 from '../Autocompletev02/Autocomplete';


export default function Builder2({
    datasetType
}) {
    const [turnOff, setTurnOff] = useState(false) // habilita el formulario de GC
    const [buildedQuery, setBuildedQuery] = useState("") // contiene el query armado
    const [_keyword, set_keyword] = useState()
    const [query, setQuery] = useState("_id")
    const [suggest, setSuggest] = useState()
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
            if (buildedQuery) {
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
            document.getElementById("builder_text").value = "";
            Input1.value = "";
            DD1.selectedIndex = 0;
        }

        if (queryBox) {
            if (datasetType === "GENE_EXPRESSION") {
                queryBox.value = `${query}${buildedQuery}${nlpgcQuery}`
                setBuildedQuery(`${query}${buildedQuery}${nlpgcQuery}`)
            } else {
                queryBox.value = `${buildedQuery}${query}`
                setBuildedQuery(`${buildedQuery}${query}`)
            }
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
                setTurnOff(false)
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
                DD1.selectedIndex = 0;
                Input2.value = "";
                DD2.selectedIndex = 0
                setTurnOff(false);
            } else {
                Input1.value = "";
                DD1.selectedIndex = 0;;
            }
        }
    }

    return (
        <div id="builder_HT" >
            <div>
                <div className="ph.value">
                    <h3 >Builder</h3>
                </div>
                {
                    !suggest &&
                    <DataSolver query={query} QUERY_GQL={QUERY} DATASET={datasetType} set_suggest={(suggest) => { setSuggest(suggest) }} />
                }
                <div className="firstRow">
                    <div className="dropdownCont" >
                        <select label="Nombre" id="metadataDD" className="dropDownBtn" onChange={(e) => {
                            let value = e.target.value
                            setQuery(value)
                            if (value === "gc" && datasetType !== "GENE_EXPRESSION") {
                                setTurnOff(true)
                                setQuery("growthConditions.organism")
                            } else {
                                setTurnOff(false)
                            }
                            setSuggest(undefined)
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
                                        if (datasetType !== "GENE_EXPRESSION") {
                                            if (datasetType === "TSS") {
                                                if (data?.value !== "RegulonDB TF ID" && data?.value !== "TF Name" && data?.value !== "TF Synonyms" && data?.value !== "TF Gene Name" && data?.value !== "Control Sample ID" && data?.value !== "Experiment Sample ID") {
                                                    return (
                                                        <option value={data?.query} key={`${data}_${i}`}>{data?.value}</option>
                                                    )
                                                } else {
                                                    return null
                                                }
                                            } else {
                                                if (data?.value !== "RegulonDB TF ID" && data?.value !== "TF Name" && data?.value !== "TF Synonyms" && data?.value !== "TF Gene Name") {
                                                    return (
                                                        <option value={data?.query} key={`${data}_${i}`}>{data?.value}</option>
                                                    )
                                                } else {
                                                    return null
                                                }
                                            }
                                        } else {
                                            if (data?.value !== "Growth Conditions" && data?.value !== "Reference genome" && data?.value !== "Control Sample ID" && data?.value !== "Experiment Sample ID" && data?.value !== "DBxRef ID" && data?.value !== "DBxRef Name" && data?.value !== "RegulonDB TF ID" && data?.value !== "TF Name" && data?.value !== "TF Synonyms" && data?.value !== "TF Gene Name") {
                                                return (
                                                    <option value={data?.query} key={`${data}_${i}`}>{data?.value}</option>
                                                )
                                            } else {
                                                return null
                                            }
                                        }
                                    }
                                })
                            }
                        </select>
                    </div>
                    <Autocompletev02 suggestions={suggest} id="builder_text"></Autocompletev02>
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
                                    setQuery(e.target.value)
                                    setSuggest(undefined)
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
                            <Autocompletev02 suggestions={suggest} id="builder_GC"></Autocompletev02>
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


const META_DATA = [
    //DatasetID
    { "value": "DatasetID", "query": "_id" },
    //Publication
    { "value": "PMID", "query": "publications.pmid" },
    { "value": "Authors", "query": "publications.authors" },
    { "value": "Publication Title", "query": "publications.title" },
    { "value": "Publication Date", "query": "publications.date" },
    { "value": "PMCID", "query": "publications.pmcid" },
    //ObjectTested
    { "value": "RegulonDB TF ID", "query": "objectsTested._id" },
    { "value": "TF Name", "query": "objectsTested.name" },
    { "value": "TF Synonyms", "query": "objectsTested.synonyms" },
    { "value": "TF Gene Name", "query": "objectsTested.genes.name" },
    { "value": "DBxRef Name", "query": "objectsTested.externalCrossReferences.externalCrossReferenceName" },
    { "value": "DBxRef ID", "query": "objectsTested.externalCrossReferences.objectId" },
    //Source Serie
    { "value": "Serie ID", "query": "sourceSerie.series.sourceId" },
    { "value": "Source DBName", "query": "sourceSerie.series.sourceName" },
    /* | */{ "value": "Platform ID", "query": "sourceSerie.platform._id" },
    /* | */{ "value": "Platform Title", "query": "sourceSerie.platform.title" },
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
    /* { "value": "Pressure", "query": "growthConditions.pressure" }, */
    { "value": "Optical Density", "query": "growthConditions.opticalDensity" },
    { "value": "Growth Phase", "query": "growthConditions.growthPhase" },
    /* { "value": "Growth Rate", "query": "growthConditions.growthRate" },
    { "value": "Vessel Type", "query": "growthConditions.vesselType" },
    { "value": "Aeration Speed", "query": "growthConditions.aerationSpeed" } */
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
    //{ "value": "Pressure", "query": "pressure.value" },/* aqui */
    //Optical density
    { "value": "Optical density", "query": "opticalDensity.value" },
    //Growth phase
    { "value": "Growth phase", "query": "growthPhase.value" },
    //Growth rate
    //{ "value": "Growth rate", "query": "growthRate.value" },/* Aqui */
    //Vessel type
    //{ "value": "Vessel type", "query": "vesselType.value" },/* aqui */
    //Aeratio speed
    //{ "value": "Aeration Speed", "query": "aerationSpeed.value" },/* aqui */
    //Medium supplements
    { "value": "Medium supplements", "query": "mediumSupplements.value" },
    //DatasetID
    { "value": "Dataset ID", "query": "datasetIds" }
]