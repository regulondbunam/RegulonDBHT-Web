import React from 'react'
import { GetRelatedDatasetBySource } from '../webServices/dataset/dataset_related'


export class DatasetLinkedByControlId extends React.Component {

    state = {
        _data: undefined,
        _state: undefined
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state._state === nextState._state) {
            return false
        }
        if (this.state._data === nextState._data) {
            return false
        }
        return true
    }

    render() {
        const {
            _data,
            _state
        } = this.state
        //console.log(_state)

        if (_state === "no_found") {
            let tr = document.getElementById("source_related")
            tr.style.display = "none"
            return null
        }
        return (
            <div>
                {
                    _state !== "done"
                        ? <GetRelatedDatasetBySource
                            sourceId={this.props.sourceId}
                            status={(state) => { this.setState({ _state: state }) }}
                            resoultsData={(data) => { this.setState({ _data: data }) }} />
                        : null
                }
                {
                    _state === "loading"
                        ? "Loading..."
                        : null
                }
                {
                    _data
                        ? <div  style={{ overflow: "auto", maxHeight: "350px"}}>
                            <div>
                                <button className="iconButton"
                                    onClick={() => {
                                        let links = document.getElementById("control_links")
                                        if (links.style.display === "none") {
                                            links.style.display = "contents"
                                        } else {
                                            links.style.display = "none"
                                        }
                                    }}
                                >
                                    <i className='bx bx-glasses' ></i>
                                </button>
                                Related dataset by serie
                            </div>
                            <div id="control_links" style={{ display: 'none' }}>
                                            <div style={{ height: "auto"}}>
                                            {
                                                _data.map(dt => {

                                                    return (
                                                        <div key={dt._id}>
                                                                <a href={`./${dt?._id}`} >{dt._id}</a>
                                                                <p>{dt?.sample?.title}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                            </div>
                                        </div>
                        </div>
                        : null
                }

            </div>
        )
    }
}

/*
<table>
                            <tbody >
                                <tr>
                                    <td>
                                        
                                    </td>
                                </tr>
                            </tbody>
                        </table>
*/