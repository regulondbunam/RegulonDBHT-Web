import React, { useMemo, useState } from 'react'
import { SpinnerCircle } from '../../../components/ui-components/ui_components'
import GetTUs from '../webServices/transUnits/tu_dataset'
import {TableI} from "../../../components/ui-components/ui_components"

export default class Tus extends React.Component {

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


        if (_state === "no_found") {
            return null
        }
        return (
            <div>
                {
                    _state !== "done"
                        ? <GetTUs
                            id_dataset={this.props.id_dataset}
                            status={(state) => { this.setState({ _state: state }) }}
                            resoultsData={(data) => { this.setState({ _data: data }) }} />
                        : null
                }
                {
                    _state === "loading"
                        ? <SpinnerCircle />
                        : null
                }
                {
                    _data
                        ? <ViewData data={_data} />
                        : null
                }

            </div>
        )
    }
}


function ViewData({ data }) {
   // console.log(data[0])
    const dataTable = useMemo(() => {
        let formatTable = {
            columns: [],
            rows: []
        };
        if (Array.isArray(data) && !data.length) {
            return null
        }
        for (const property in data[0]) {
            let dis = true
            if (property === "_id" || property === "__typename") {
                dis = false
            }
            formatTable.columns.push({
                name: property,
                value: property,
                disabled: dis
            });
        }
        data.forEach(tu => {
            let row = []
            for (const key in tu) {
                if (Object.hasOwnProperty.call(tu, key)) {
                    let tu_prop = tu[key];
                    if (key === "genes") {
                        tu_prop = linkGenes(tu_prop)
                    }
                    row.push({
                        data: tu_prop,
                        value: key
                    })
                }
            }
            formatTable.rows.push(row)
        });
        return formatTable
    }, [data])
    if (Array.isArray(data) && !data.length) {
        console.warn("getDatasetAllTus array data is empty")
        return null
    }
    return (
        <div style={{overflow: "auto"}} >
            <TableI dataTable={dataTable} />
        </div>
    )
}

function linkGenes(genes=[]) {
    return (
        <div >
            {
                genes.map((gen)=>{
                    return <a key={gen._id} style={{ marginLeft: "5px" }} href={`http://regulondb.ccg.unam.mx/search?term=${gen.name}&organism=ECK12&type=gene`} target="_blank" rel="noreferrer">{gen.name}</a>
                })
            }
        </div>
    )
}