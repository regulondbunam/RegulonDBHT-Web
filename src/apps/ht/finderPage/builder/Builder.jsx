import React, { useState } from 'react'
import Style from './builder.module.css'
import fields from "./fields.json"
import Autocompletev02 from './Autocompletev02/Autocomplete'
import DataSolver from './DataSolver/DataSolver'
import { SpinnerCircle } from '../../../../components/ui-components/ui_components'
import SearchNLPGC from '../../webServices/nlpGrowthCondition/nlpgc_search'

export default function Builder({
    datasetType,
    datasets,
    queryBox,
    set_queryBox = () => { },
    set_search = () => { }
}) {
    const [_datasetFeature, set_datasetFeature] = useState("")
    const [_nlpgc, set_nlpgc] = useState()
    const [_nlpGCFeature, set_nlpGCFeature] = useState("")
    const [_nlpCondition, set_nlpCondition] = useState("")
    const [suggest, setSuggest] = useState()
    const id_autocomplete = "builder_input_text"

    function setAutocomplete_Input(str = ""){
        const inputText = document.getElementById(id_autocomplete)
        console.log(inputText);
        if (inputText) {
            const input_REACTION = new CustomEvent('inputTextR', {
                bubbles: true,
                detail: {
                    inputText: str
                }
            });
            inputText.dispatchEvent(input_REACTION);
        }
    }

    return (
        <div >
            <div className={Style.gridContainer}>
                <div className={Style.gridItem}>
                    <label htmlFor="datasetFeatures">Dataset Property</label>
                    <br />
                    <select name="datasetFeatures" id="datasetFeatures" style={{ width: "100%" }}
                        onChange={(e) => {
                            set_datasetFeature(e.target.value)
                            setSuggest(DataSolver(e.target.value, datasets))
                            set_nlpCondition(undefined)
                            setAutocomplete_Input()
                        }}
                    >
                        <option value="0" selected disabled hidden>choose one</option>
                        {
                            fields.datasetsFeatures.map((data, i) => {
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
                {
                    _datasetFeature.match(/growthConditions/g) &&
                    <div className={Style.gridItem}>
                        <label htmlFor="growthConditions">Growth Condition</label>
                        <br />
                        <select name="growthConditions" id="growthConditions" style={{ width: "100%" }}
                            onChange={(e) => {
                                set_datasetFeature(e.target.value)
                                setSuggest(DataSolver(e.target.value, datasets))
                                setAutocomplete_Input()
                            }}
                        >
                            <option value="0" selected disabled hidden>choose one</option>
                            {datasetType === "GENE_EXPRESSION" ?
                                fields.nlpGC.map((data, i) => {
                                    return (
                                        <option value={data?.query} key={`${data.value}_${i}`}  >{data.value}</option>
                                    )
                                })
                                :
                                fields.growthConditions.map((data, i) => {
                                    return (
                                        <option value={data?.query} key={`${data.value}_${i}`}  >{data.value}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                }
                {
                    _datasetFeature.match(/nlpGC/g) &&
                    <div className={Style.gridItem}>
                        {
                            !_nlpgc
                                ? <div>
                                    <SearchNLPGC keyword='GC[_id]' resoultsData={(data) => { set_nlpgc(data) }} />
                                    <SpinnerCircle />
                                </div>
                                : <div>
                                    <label htmlFor="nlpGConditions">NLP Growth Condition</label>
                                    <br />
                                    <br />
                                    <select name="nlpGConditions" id="nlpGConditions" style={{ width: "100%" }}
                                        onChange={(e) => {
                                            set_nlpCondition(e.target.value)
                                            set_nlpGCFeature(`${_nlpCondition}.value`)
                                            setAutocomplete_Input()
                                            setSuggest(DataSolver(`${_nlpCondition}.value`, _nlpgc))
                                        }}
                                    >
                                        <option value="0" selected disabled hidden>choose one</option>
                                        {
                                            fields.nlpGC.map((data, i) => {
                                                return (
                                                    <option value={data?.query} key={`${data.value}_${i}`}  >{data.value}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                        }
                    </div>
                }
                {
                    _nlpCondition && _datasetFeature.match(/nlpGC/g)
                        ? <div className={Style.gridItem}>
                            <label htmlFor="nlpGConditions">NLPGC Property</label>
                            <br />
                            <select name="nlpGConditions" id="nlpGConditions" style={{ width: "100%" }}
                                onChange={(e) => {
                                    let q = `${_nlpCondition}.${e.target.value}`
                                    console.log(q);
                                    set_nlpGCFeature(q)
                                    setSuggest(DataSolver(q, _nlpgc))
                                }}
                            >
                                {
                                    fields.nlpGCProperties.map((data, i) => {
                                        return (
                                            <option value={data?.query} key={`${data.value}_${i}`}  >{data.value}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        : null
                }
            </div>
            <br />
            {
                _datasetFeature !== 'growthConditions' && <Autocompletev02 suggestions={suggest} id={id_autocomplete} ></Autocompletev02>
            }
            


        </div>
    )
}

