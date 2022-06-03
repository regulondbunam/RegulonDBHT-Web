import React, { Component } from 'react'
import { SpinnerCircle } from '../../../../../components/ui-components/ui_components'
import NormData from './normalizedData/normData'
import AuthorData from './authors/authors'

import GetAuthorData from '../../../webServices/authors/authorsData_dataset'
import Summary from './summary'
import Style from './tabs.module.css'

import { Viewer } from '../igv/viewer'
export default class Tabs extends Component {

    state = {
        _openTab: -1,
        _autorData: undefined,
        _jsonTable: undefined,
        _sitesJT: undefined,
        _peaksJT: undefined,
    }

    componentDidMount() {

        let file_format = undefined
        let id_dataset = this.props.id_dataset
        switch (this.props.data.datasetType) {
            case "TFBINDING":
                if (!this.state._sitesJT) {
                    try {
                        fetch(`${process.env.REACT_APP_PROSSES_SERVICE}/${id_dataset}/sites/jsonTable`, { cache: "default" })
                            .then(response => response.json())
                            .then(data => { this.setState({_sitesJT: data, _openTab: 0}); })
                            .catch(error => {
                                console.error(error)
                                this.setState({_sitesJT: { error: error }})
                            });
                    } catch (error) {
                        console.error(error)
                        this.setState({_sitesJT: { error: error }})
                    }
                }
                if (!this.state._peaksJT) {
                    try {
                        fetch(`${process.env.REACT_APP_PROSSES_SERVICE}/${id_dataset}/peaks/jsonTable`, { cache: "default" })
                            .then(response => response.json())
                            .then(data => { this.setState({_peaksJT: data, _openTab: 0}); })
                            .catch(error => {
                                console.error(error)
                                this.setState({_peaksJT: { error: error }})
                            });
                    } catch (error) {
                        console.error(error)
                        this.setState({_peaksJT: { error: error }})
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

        if (!this.state._jsonTable && file_format) {
            try {
                //FLASK_PROSSES_SERVICE
                fetch(`${process.env.REACT_APP_PROSSES_SERVICE}/${id_dataset}/${file_format}/jsonTable`, { cache: "default" })
                    .then(response => response.json())
                    .then(data => { this.setState({_jsonTable: data, _openTab: 0}); })
                    .catch(error => {
                        console.error(error)
                        this.setState({_jsonTable: { error: error }})
                    });
            } catch (error) {
                console.error(error)
                this.setState({_jsonTable: { error: error }})
            }
        }
    }

    _open = (id) => {
        this.setState({ _openTab: id})
    }

    _isActive = (id) => {
        if (this.state._openTab=== id) {
            return Style.selected
        }
        return ""
    }

  render() {

    const { data, id_dataset } = this.props
    const { _openTab, _jsonTable, _sitesJT, _peaksJT, _autorData } = this.state

    let tabTitle1 = ""
    let dataType = ""
    let fileFormat = ""
    switch (data?.datasetType) {
        case "TFBINDING":
            tabTitle1 = "Normalized"
            dataType = "sites"
            fileFormat = "GFF3"
            break;
        case "TSS":
            dataType = "tss"
            break;
        case "TTS":
            dataType = "tts"
            break;
        case "TUS":
            dataType = "tus"
            break;
        case "GENE_EXPRESSION":
            dataType = "ge"
            tabTitle1 = "Uniformized"
            break;
        default:
            tabTitle1 = undefined
            break;
    }

    if (((data?.datasetType==="TFBINDING" && _sitesJT && _peaksJT) || (data?.datasetType!=="TFBINDING" && _jsonTable)) && _autorData  ) {
        return (
            <div>
                <h2>DATA FROM DATASET</h2>
                <div className={Style.tab}>
                    {
                        ((data?.datasetType==="TFBINDING" && _sitesJT && _peaksJT) || (data?.datasetType!=="TFBINDING" && _jsonTable))
                            ? <button className={"" + this._isActive(0)}
                                id={`TAB_${id_dataset}_0`}
                                onClick={(event) => { this._open(0) }}
                            >{tabTitle1}
                            </button>
                            : null
                    }
                    {
                        (Array.isArray(_autorData) && _autorData.length)
                            ?
                            <button className={"" + this._isActive(1)}
                                id={`TAB_${id_dataset}_1`}
                                onClick={() => { this._open(1) }}
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
                            <NormData dataType={dataType} datasetId={id_dataset} fileFormat={fileFormat} datasetType={data?.datasetType} jsonTable={_jsonTable} peaksJT={_peaksJT} sitesJT={_sitesJT} />
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
                    this.setState({ _autorData: data })
                    if (_openTab === -1) {
                        this._open(1)
                    }
                } else {
                    this.setState({ _autorData: { error: "No data found" } })
                }
            }}
            />
        </div>
    )
  }
}


