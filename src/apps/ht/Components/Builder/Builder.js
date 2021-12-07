import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Autocomplete from "../Autocomplete/autocomplete"
import './Builder.css'


export default function Builder({
    datasetType
}) {
    const [_keyword, set_keyword] = useState()
    const [activo, setActivo] = useState(false)
    const [query, setQuery] = useState("_id")
    const [turnOff, setTurnOff] = useState(false)
    const [buildedQuery, setBuildedQuery] = useState()
    const history = useHistory();

    useEffect(() => {

        const builder = document.getElementById("builder_HT")
        if (builder) {
            builder.addEventListener('builderR', function (e) {
                //console.log(`state`, e.detail)
                setBuildedQuery(e.detail.buildedQuery);
                set_keyword(e.detail._keyword);
                setQuery(e.detail.query);
            }, false);
        }
    }, [])

    const Metadata = [
        //DatasetID
        "DatasetID",

        //Publication
        "PMID",
        /* "DOI", */
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

        let DD1 = document.getElementById("metadataDD");
        let Input1 = document.getElementById("builder_text");
        let DD2 = document.getElementById("metadataGC");
        let Input2 = document.getElementById("builder_GC");
        let queryBox = document.getElementById("query_area");



        if (_keyword === undefined || query === undefined || _keyword === "") {
            alert("Serch term is required")
        } else {
            if (_keyword !== "" && query !== "") {
                let operador = "";
                if (queryBox.value) { //Preguntamos si queryBox existe
                    if (buildedQuery) {//Pregutamos si buildedQuery es diferente de indefinido para saber si agregar el operador o no
                        let op = document.getElementById("operador")
                        if (activo) { //activo es una constamte que "activa" la opcion de GC por lo que de ser verddero hay que optener el operador del dropDown de GC
                            op = document.getElementById("operadorGC")
                            operador = op.value
                            queryBox.value = `(${queryBox.value}) ${operador} ${_keyword}[${query}]`; //Armar el query con todos los datos, la existente en QueryBox, el operador y la nueva seccion armado con keyword y query
                            setBuildedQuery(`${buildedQuery} ${operador} \\"${_keyword}\\"[${query}]`);
                            setQuery(undefined);
                            set_keyword(undefined);


                            //Resetear campos de formulario GC
                            let OP2 = document.getElementById("operadorGC");
                            DD2.value = "Organism";
                            OP2.value = "AND";
                            Input2.value = "";
                        } else {
                            if (op) { //Si activo devuelve falso simplemente se optiene el valor del operador del builder normal
                                operador = op.value
                                queryBox.value = `(${queryBox.value}) ${operador} ${_keyword}[${query}]`; //Armar el query con todos los datos, la existente en QueryBox, el operador y la nueva seccion armado con keyword y query
                                setBuildedQuery(`${buildedQuery} ${operador} \\"${_keyword}\\"[${query}]`);
                                setQuery(undefined);
                                set_keyword(undefined);


                                //Resetear campos de formulario
                                let OP1 = document.getElementById("operador");
                                DD1.value = "DatasetID";
                                OP1.value = "AND";
                                Input1.value = "";
                            }
                        }
                    }
                } else {//Si llega hasta aqui se arma por primera vez el query
                    if (activo) {
                        setBuildedQuery(`\\"${_keyword}\\"[${query}]`);
                        queryBox.value = `${_keyword}[${query}]`;
                        setQuery(undefined);
                        set_keyword(undefined);

                        //Resetear campos de formulario
                        DD2.value = "Organism";
                        Input2.value = "";
                    } else {
                        setBuildedQuery(`\\"${_keyword}\\"[${query}]`);
                        queryBox.value = `${_keyword}[${query}]`;
                        setQuery(undefined);
                        set_keyword(undefined);


                        //Resetear campos de formulario
                        DD1.value = "DatasetID";
                        Input1.value = "";

                    }

                }
            }
        }


    };





    /* function imprimir() {
        console.log(buildedQuery)
    } */

    return (
        <div id="builder_HT" >
            <div id="prueba">
                <div className="builderTitle">
                    <h3 >Builder</h3>
                </div>
                <div className="firstRow">
                    <div className="dropdownCont" >
                        <select label="Nombre" id="metadataDD" className="dropDownBtn" onClick={identificar} onChange={(e) => {
                            let value = e.target.value
                            //console.log(value)
                            if (value === "Growth Conditions") {
                                setActivo(true)
                            } else {
                                setActivo(false)
                                setTurnOff(false)
                            }
                        }}>
                            {
                                Metadata.map((data, i) => {
                                    return (
                                        <option value={data} key={`${data}_${i}`}  >{data}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <Autocomplete id="builder_text" datasetType={datasetType} query={query} turnOff={turnOff} set_keyword={(keyword) => { set_keyword(keyword) }} />
                    <button className="iconButton" onClick={BuildQuery}><i className='bx bx-plus-circle'></i></button>
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
                {/* <div className="IndexList">
                    <p>Show Index</p>
                </div> */}
            </div>
            <div className="secondRow">
                <div id="secondForm">
                    {activo === true &&
                        <div className="contenedorGC">
                            <h3>Growth Conditions</h3>
                            <div className="container">
                                <div className="dropdownCont">
                                    <select label="Nombre" id="metadataGC" className="dropDownBtn" onClick={identificarGC}>
                                        {
                                            MetadataGC.map((data, i) => {
                                                return (
                                                    <option value={data} key={`${data}_${i}`}  >{data}</option>
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
                            <div className="IndexList">
                                <p>Show Index</p>
                            </div>
                        </div>}
                </div>
            </div>


            <div className="SearchButton" id="builder_search" >

                <button className="accent" disabled={((_keyword === undefined || _keyword === "") || query === undefined) && buildedQuery === undefined} style={{ marginRight: "1%" }} onClick={() => {
                    if (buildedQuery) {

                        history.push(`/dataset/query/${buildedQuery} AND ${datasetType}[datasetType]`)
                    } else {
                        if (activo === true) {//consultar builder de GC


                            history.push(`/dataset/query/\\"${_keyword}\\"[${query}] AND ${datasetType}[datasetType]`)
                        } else {
                            //Coonsultar builder normal

                            history.push(`/dataset/query/\\"${_keyword}\\"[${query}] AND ${datasetType}[datasetType]`)
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