import React, { useState } from 'react'
import Style from './builder.module.css'
import fields from "./fields.json"
import Autocompletev02 from './Autocompletev02/Autocomplete'
import DataSolver from './DataSolver/DataSolver'

export default function Builder({
    datasetType,
    datasets,
    queryBox,
    set_queryBox = () => {},
    set_search = () => {}
}) {
    const [_datasetFeature, set_datasetFeature] = useState()
    const [suggest, setSuggest] = useState()
    
    console.log(suggest);

    return (
        <div >
            <div className={Style.gridContainer}>
                <div className={Style.gridItem}>
                    <label htmlFor="datasetFeatures">Dataset Property</label>
                    <br />
                    <select name="datasetFeatures" id="datasetFeatures" style={{ width: "100%" }}
                        onChange={(e) => {
                            set_datasetFeature(e.target.value)
                            setSuggest(DataSolver(e.target.value,datasets))
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
                    _datasetFeature === 'growthConditions' &&
                    <div className={Style.gridItem}>
                        <label htmlFor="datasetFeatures">Growth Condition</label>
                        <br />
                        <select name="datasetFeatures" id="datasetFeatures" style={{ width: "100%" }}
                        >
                            <option value="0" selected disabled hidden>choose one</option>
                            {datasetType === "GENE_EXPRESSION" ?
                                fields.nlpgGC.map((data, i) => {
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
            </div>
            <br />
            <Autocompletev02 suggestions={suggest} id="builder_text"></Autocompletev02>

        </div>
    )
}