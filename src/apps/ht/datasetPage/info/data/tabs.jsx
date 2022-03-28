import React, { useState, useEffect } from 'react'
import { SpinnerCircle } from '../../../../../components/ui-components/ui_components'
import NormData from './normalizedData/normData'
import AuthorData from './authors/authors'

import GetAuthorData from '../../../webServices/authors/authorsData_dataset'
import GetGE from '../../../webServices/geneExpression/ge_dataset'
import GetPeaks from '../../../webServices/peaks/peaks_dataset'
import GetTFBS from '../../../webServices/tfbs/tfbs_dataset'
import GetTUs from '../../../webServices/transUnits/tu_dataset'
import GetTSS from '../../../webServices/tss/tss_dataset'
import GetTTS from '../../../webServices/tts/tts_dataset'
import Summary from './summary'
import Style from './tabs.module.css'



export default function Tabs({ id_dataset, data }) {
    const [_openTab, set_openTab] = useState(0)
    const [_autorData, set_autorData] = useState()
    const [_datasetData, set_datasetData] = useState()

    useEffect(() => {
        if((_datasetData && _autorData)) {
            if(_datasetData !== 1){
                let igv_view = document.getElementById("igv-view");
                if(igv_view){
                    igv_view.style.display = "block";
                }
            }else{
                set_openTab(1)
            }
        }
    },[_datasetData, _autorData])

    let tabTitle1 = ""
    switch (data?.datasetType) {
        case "TFBINDING":
            tabTitle1 = "Normalized"
            break;
        case "TSS":
        case "TTS":
        case "TUS":
        case "GENE_EXPRESSION":
            tabTitle1 = "Uniformized"
            break;
        default:
            tabTitle1 = undefined
            break;
    }



    const open = (id) => {
        set_openTab(id)
    }

    const isActive = (id) => {
        if (_openTab === id) {
            return Style.selected
        }
        return ""
    }

    if ((_datasetData === 1 && _autorData === 1) || !tabTitle1) {
        return null
    }

    if ((_datasetData || _datasetData === 1) && (_autorData || _autorData === 1)) {
        return (
            <div>
                <h2>DATA FROM DATASET</h2>
                <div className={Style.tab}>
                    {
                        _datasetData !== 1
                            ? <button className={"" + isActive(0)}
                                id={`TAB_${id_dataset}_0`}
                                onClick={(event) => { open(0) }}
                            >{tabTitle1}
                            </button>
                            : null
                    }
                    {
                        (Array.isArray(_autorData) && _autorData.length)
                            ?
                            <button className={"" + isActive(1)}
                                id={`TAB_${id_dataset}_1`}
                                onClick={() => { open(1) }}
                            >
                                Author data
                            </button>
                            : null
                    }

                </div>
                {
                    (_openTab === 0)
                        ? <div className={Style.tabcontent}>
                            <Summary data={data} />
                            <NormData datasetType={data?.datasetType} datasetData={_datasetData} />
                        </div>
                        : null
                }
                {
                    _openTab === 1
                        ? <div className={Style.tabcontent}>
                                <AuthorData id_dataset={id_dataset} data={_autorData} />
                        </div>
                        : null
                }

            </div>
        )
    }

    return (
        <div>
            <br />
            Looking for dataset data, please wait this may take some time
            <SpinnerCircle />
            <GetAuthorData id_dataset={id_dataset} resoultsData={(data) => {
                if (Array.isArray && data.length) {
                    set_autorData(data)
                } else {
                    set_autorData(1)
                }
            }}
            />
            {
                data?.datasetType === "TFBINDING" && <GetTFBSData id_dataset={id_dataset} set_datasetData={(data) => { set_datasetData(data) }} />
            }
            {
                data?.datasetType === "TUS" && 
                <GetTUs id_dataset={id_dataset} resoultsData={(data) => {
                    if(!data){
                        set_datasetData(1)
                    }else{
                        if (Array.isArray && data.length) {
                            set_datasetData({tusData: data})
                        } else {
                            set_datasetData(1)
                        }
                    }
                }}
                />
            }
            {
                data?.datasetType === "TSS" &&
                <GetTSS id_dataset={id_dataset} resoultsData={(data) => {
                    if(data){
                        if (Array.isArray && data.length) {
                            set_datasetData({tssData: data})
                        }else{
                            set_datasetData(1)
                        }
                    }
                }}
                />
            }
            {
                data?.datasetType === "TTS" &&
                <GetTTS id_dataset={id_dataset} resoultsData={(data) => {
                    if(!data){
                        set_datasetData(1)
                    }else{
                        if (Array.isArray && data.length) {
                            set_datasetData({ttsData: data})
                            //
                        } else {
                            set_datasetData(1)
                        }
                    }
                }}
                />
            }
            {
                data?.datasetType === "GENE_EXPRESSION" &&
                <GetGE id_dataset={id_dataset} resoultsData={(data) => {
                    //console.log(data);
                    if(!data){
                        set_datasetData(1)
                    }else{
                        if (Array.isArray && data.length) {
                            set_datasetData({geData: data})
                            //
                        } else {
                            set_datasetData(1)
                        }
                    }
                    
                }}
                />
            }
        </div>
    )
}

function GetTFBSData({
    id_dataset,
    set_datasetData = () => { }
}) {

    const [_tfbsData, set_tfbsData] = useState()
    const [_peaksData, set_peaksData] = useState()

    useEffect(() => {
        if (_tfbsData && _peaksData) {
            if (_tfbsData === 1 && _peaksData === 1) {
                set_datasetData(1)
            } else {
                set_datasetData({
                    peaksData: _peaksData,
                    tfbsData: _tfbsData
                })
            }
        }
    }, [_peaksData, _tfbsData, set_datasetData])

    return (
        <div>
            <GetPeaks id_dataset={id_dataset} resoultsData={(data) => {
                if (Array.isArray && data.length) {
                    set_peaksData(data);
                } else {
                    set_peaksData(1)
                }
            }}
            />
            <GetTFBS id_dataset={id_dataset} resoultsData={(data) => {
                if (data) {
                    if (Array.isArray && data.length) {
                        set_tfbsData(data);
                    } else {
                        set_tfbsData(1)
                    }
                }else{
                    set_tfbsData(1)
                }
            }}
            />
        </div>
    )
}