import React, { useState } from 'react'
import Authors from '../../HT-Authors/authors'
import NormData from '../../HT-NormalizedData/normData'
import Summary from './summary'
import Style from './tabs.module.css'

export default function Tabs({ id_dataset, data }) {

    let tabTitle1 = ""

    switch (data?.datasetType) {
        case "TFBINDING":
            tabTitle1 = "Normalized"
            break;
        case "TUS":
            tabTitle1 = "Uniformized"
            break;
        default:
            tabTitle1 = "data"
            break;
    }

    const [_openTab, set_openTab] = useState(0)

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
            <div className={Style.tab}>
                <button className={""+isActive(0)}
                    id={`TAB_${id_dataset}_0`}
                    onClick={(event) => { open(0) }}
                >{tabTitle1}
                </button>
                <button className={""+isActive(1)}
                    id={`TAB_${id_dataset}_1`}
                    onClick={() => { open(1) }}
                >Author data</button>
            </div>
            {
                _openTab === 0
                    ? <div className={Style.tabcontent}>
                        
                        <Summary data={data} />
                        <h3>Data</h3>
                        <NormData id_dataset={id_dataset} datasetType={data?.datasetType} />
                    </div>
                    : null
            }
            {
                _openTab === 1
                    ? <div className={Style.tabcontent}>
                        <h3>Author Report</h3>
                        <Authors id_dataset={id_dataset} />
                    </div>
                    : null
            }

        </div>
    )
}
