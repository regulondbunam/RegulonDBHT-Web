import React, { useMemo, useState } from 'react'
import { SpinnerCircle } from '../../../components/ui-components/ui_components'
import GetTFBS from '../webServices/tfbs/tfbs_dataset'

export default function TFBS({ id_dataset }) {
    const [_data, set_data] = useState()
    const [_state, set_state] = useState()

    console.log(_data)
    return (
        <div>
            {
                _state !== "done"
                    ? <GetTFBS id_dataset={id_dataset}
                        resoultsData={(data) => { set_data(data); }}
                        status={(state) => { set_state(state) }}
                    />
                    : null
            }
            {
                _state === "loading"
                    ? <SpinnerCircle />
                    : null
            }
            {
                !_data
                    ? null
                    : <table className="table_content" >
                        <Headtfbs tfbs={_data[0]} />
                    </table>
            }
        </div>
    )
}

function Headtfbs({ tfbs }) {

    return (
        <thead>
            <tr>
                <th style={{textAlign: 'end'}} colspan="6">
                    <a href="#">download complete file</a>
                </th>
            </tr>
            <tr>
                <th>NAME</th>
                <th>START</th>
                <th>SEQUECE</th>
                <th>END</th>
                <th>SCORE</th>
                <th>Closest Genes</th>
            </tr>
        </thead>
    )
}

function DisplayTFBS(data) {
    useMemo(() => { }, [data])
}
