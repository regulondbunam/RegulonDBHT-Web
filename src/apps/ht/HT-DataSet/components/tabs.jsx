import React, { useState, useEffect } from 'react'
import { SpinnerCircle } from '../../../../components/ui-components/ui_components'
import Authors from '../../HT-Authors/authors'
import NormData from '../../HT-NormalizedData/normData'
import GetAuthorData from '../../webServices/authors/authorsData_dataset'
import GetPeaks from '../../webServices/peaks/peaks_dataset'
import GetTFBS from '../../webServices/tfbs/tfbs_dataset'
import GetTUs from '../../webServices/transUnits/tu_dataset'
import Summary from './summary'
import Style from './tabs.module.css'


export default function Tabs({ id_dataset, data }) {
    const [_openTab, set_openTab] = useState(0)
    const [_autorData, set_autorData] = useState()
    const [_datasetData, set_datasetData] = useState()
    /*
    
    const [_ttsData, set_ttsData] = useState()
    const [_tssData, set_tssData] = useState()
    
    const [_tusData, set_tusData] = useState()
    const [_loading, set_loading] = useState([false, false, false, true, true])
    let loading = (_loading[0] && _loading[1] && _loading[2] && _loading[3] && _loading[4])
    /*
        useEffect(() => {
            if(loading) {
                if(!(_peaksData || _tfbsData || _tssData || _ttsData || _tusData)){
                    set_openTab(1)
                }
            }
        })
    */



    let tabTitle1 = ""
    switch (data?.datasetType) {
        case "TFBINDING":
            tabTitle1 = "Normalized"
            break;
        case "TSS":
        case "TTS":
        case "TUS":
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

    if (_datasetData && _autorData) {
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
                            <h3>Author Report</h3>
                            <Authors id_dataset={id_dataset} data={_autorData} />
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
                    if (Array.isArray && data.length) {
                        set_datasetData({tusData: data})
                    } else {
                        set_datasetData(1)
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
                if (Array.isArray && data.length) {
                    set_tfbsData(data);
                } else {
                    set_tfbsData(1)
                }
            }}
            />
        </div>
    )
}