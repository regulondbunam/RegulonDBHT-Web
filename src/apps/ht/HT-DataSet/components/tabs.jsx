import React, { useState } from 'react'
import NormData from '../../HT-NormalizedData/normData'
import Summary from './summary'
import Style from './tabs.module.css'

export default function Tabs({ id_dataset, data }) {

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
                >NORMALIZED DATA
                </button>
                <button className={""+isActive(1)}
                    id={`TAB_${id_dataset}_1`}
                    onClick={() => { open(1) }}
                >AUTHOR DATA</button>
            </div>
            {
                _openTab === 0
                    ? <div className={Style.tabcontent}>
                        <h3>Sumary</h3>
                        <Summary data={data} />
                        <h3>Data</h3>
                        <NormData id_dataset={id_dataset} />
                    </div>
                    : null
            }
            {
                _openTab === 1
                    ? <div className={Style.tabcontent}>
                        <h3>Author Report</h3>
                    </div>
                    : null
            }

        </div>
    )
}
