import React, { useState } from 'react'
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
    const [_tfbsData, set_tfbsData] = useState()
    const [_ttsData, set_ttsData] = useState()
    const [_tssData, set_tssData] = useState()
    const [_peaksData, set_peaksData] = useState()
    const [_tusData, set_tusData] = useState()
    const [_loading, set_loading] = useState([false, false, false, true, true])

    let loading = (_loading[0] && _loading[1] && _loading[2] && _loading[3] && _loading[4])

    //console.log(loading)
    let tabTitle1 = ""

    switch (data?.datasetType) {
        case "TFBINDING":
            tabTitle1 = "Normalized"
            break;
        case "TSS":
        case "TUS":
            tabTitle1 = "Uniformized"
            break;
        default:
            tabTitle1 = "data"
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

    return (
        <div>
            <GetPeaks id_dataset={id_dataset} resoultsData={(data) => {
                if (Array.isArray && data.length) {
                    set_peaksData(data);
                }
            }}
                status={(state) => {
                    let l = _loading
                    if (state !== loading) {
                        l[0] = true
                        set_loading(l);
                    }
                }}
            />
            <GetTFBS id_dataset={id_dataset} resoultsData={(data) => {
                if (Array.isArray && data.length) {
                    set_tfbsData(data);
                }
            }}
                status={(state) => {
                    let l = _loading
                    if (state !== loading) {
                        l[1] = true
                        set_loading(l);
                    }
                }}
            />
            <GetTUs id_dataset={id_dataset} resoultsData={(data) => {
                if (Array.isArray && data.length) {
                    set_tusData(data)
                }
            }}
                status={(state) => {
                    let l = _loading
                    if (state !== loading) {
                        l[2] = true
                        set_loading(l);
                    }
                }}
            />
            <GetAuthorData id_dataset={id_dataset} resoultsData={(data) => {
                if (Array.isArray && data.length) {
                    set_autorData(data)
                }
            }}
            />
            
            <div className={Style.tab}>
                {
                    (loading && (_peaksData || _tfbsData || _tssData || _ttsData || _tusData))
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
                (_openTab === 0 && loading)
                    ? <div className={Style.tabcontent}>

                        <Summary data={data} />
                        <h3>Data</h3>
                        <NormData datasetType={data?.datasetType} peaksData={_peaksData} tfbsData={_tfbsData} tusData={_tusData} ttsData={_ttsData} tssData={_tssData} />
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
