import React from 'react'
import { Link } from 'react-router-dom'
import { GetRelatedDatasetByControlId } from '../webServices/dataset/dataset_related'


export class DatasetLinkedByControlId extends React.Component {

    state={
        _data: undefined,
        _state: undefined
    }

    shouldComponentUpdate(nextProps, nextState){
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
        console.log(_data)
        return (

            <div>
                {
                    _state !== "done"
                        ? <GetRelatedDatasetByControlId
                            linked_control_ids={this.props.linked_control_ids}
                            status={(state) => { this.setState({_state: state}) }}
                            resoultsData={(data) => {this.setState({_data: data}) }} />
                        : null
                }
                {
                    _state === "loading"
                        ? "Loading..."
                        : null
                }
                {
                    _data
                        ? <table>
                            <thead>
                                <tr>
                                    <th>
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
                                        Datasets related by ID CONTROL
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="control_links" style={{ display: 'none' }}>
                                {
                                    _data.map(dt=>{
                                        
                                        return(
                                            <tr key={dt._id}>
                                                <td>
                                                    <Link to={`/s/dataset/${dt?._id}`} >{dt._id}</Link>
                                                    <p>{dt?.sample?.title}</p>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        : null
                }
    
            </div>
        )
    }
}

