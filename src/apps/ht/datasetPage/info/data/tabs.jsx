import React, { useState, useEffect } from 'react'
import { SpinnerCircle } from '../../../../../components/ui-components/ui_components'
import NormData from './normalizedData/normData'
import AuthorData from './authors/authors'

import GetAuthorData from '../../../webServices/authors/authorsData_dataset'
import Summary from './summary'
import Style from './tabs.module.css'

import { Viewer } from '../igv/viewer'

export default function Tabs({ id_dataset, data }) {
    const [_openTab, set_openTab] = useState()
    const [_autorData, set_autorData] = useState()
    const [_jsonTable, set_jsonTable] = useState()
    const [_sitesJT, set_sitesJT] = useState()
    const [_peaksJT, set_peaksJT] = useState()
    const [_isData, set_isData] = useState()// -1 -> nada, 0 -> autordata, 1 -> normdata

    useEffect(() => {
        let file_format = undefined
        switch (data?.datasetType) {
            case "TFBINDING":
                if (!_sitesJT) {
                    try {
                        fetch(`${process.env.REACT_APP_PROSSES_SERVICE}/${id_dataset}/sites/jsonTable`, { cache: "default" })
                            .then(response => response.json())
                            .then(data => { console.log(data);;set_sitesJT(data);set_isData(1);set_openTab(1)})
                            .catch(error => {
                                console.error(error)
                                set_sitesJT({ error: error })
                            });
                    } catch (error) {
                        console.error(error)
                        set_sitesJT({ error: error })
                    }
                }
                if (!_peaksJT) {
                    try {
                        fetch(`${process.env.REACT_APP_PROSSES_SERVICE}/${id_dataset}/peaks/jsonTable`, { cache: "default" })
                            .then(response => response.json())
                            .then(data => { set_peaksJT(data);set_isData(1);set_openTab(1)})
                            .catch(error => {
                                console.error(error)
                                set_peaksJT({ error: error })
                            });
                    } catch (error) {
                        console.error(error)
                        set_peaksJT({ error: error })
                    }
                }
                break;
            case "TSS":
                file_format = "tss"
                break;
            case "TTS":
                file_format = "tts"
                break;
            case "TUS":
                file_format = "tus"
                break;
            case "GENE_EXPRESSION":
                file_format = "ge"
                break;
            default:
                file_format = undefined
                break;
        }

        if (!_jsonTable && file_format) {
            try {
                //REACT_APP_PROSSES_SERVICE
                fetch(`${process.env.REACT_APP_PROSSES_SERVICE}/${id_dataset}/${file_format}/jsonTable`, { cache: "default" })
                    .then(response => response.json())
                    .then(data => { set_jsonTable(data);set_isData(1);set_openTab(1)})
                    .catch(error => {
                        console.error(error)
                        set_jsonTable({ error: error })
                    });
            } catch (error) {
                console.error(error)
                set_jsonTable({ error: error })
            }
        }

    }, [data, _jsonTable, id_dataset, set_jsonTable, _sitesJT, _peaksJT])




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

    if (_isData === -1) {
        return null
    }

    if (_isData >= 0) {
        return (
            <div>
                <h2>DATA FROM DATASET</h2>
                <div className={Style.tab}>
                    {
                        _isData === 1
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
                            <NormData datasetType={data?.datasetType} jsonTable={_jsonTable} peaksJT={_peaksJT} sitesJT={_sitesJT} />
                            <div id="igv-view" >
                                <Viewer id_dataset={data?._id} tfs={data?.objectsTested} datasetType={data?.datasetType} />
                                <br />
                                <br />
                            </div>
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
                    set_openTab(0)
                } else {
                    set_autorData(1)
                }
            }}
            />
        </div>
    )
}