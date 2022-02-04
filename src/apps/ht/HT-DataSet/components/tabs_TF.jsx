import React, { useState, useEffect } from 'react'



export default function Tabs({ id_dataset, data }) {
    const [_openTab, set_openTab] = useState(0)
    const [_autorData, set_autorData] = useState()
    const [_datasetData, set_datasetData] = useState()

    useEffect(() => {
        if((_datasetData && _autorData)) {
            if(_datasetData === 1){
                set_openTab(1)
                let igv_view = document.getElementById("igv-view");
                if(igv_view){
                    igv_view.style.display = "none"
                }
            }
        }
    },[_datasetData, _autorData])




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
}

