import React, { useState } from 'react'
import { SpinnerCircle } from '../../../components/ui-components/ui_components'
import GetAuthorData from '../webServices/authors/authorsData_dataset'
import { CsvToHtmlTable } from 'react-csv-to-table';

export default function Authors({ id_dataset }) {

    const [_data, set_data] = useState()
    const [_state, set_state] = useState()



    return (
        <div>
            {
                _state !== "done"
                    ? <GetAuthorData id_dataset={id_dataset} resoultsData={(data) => { set_data(data) }} status={(state) => { set_state(state) }} />
                    : null
            }
            {
                _state === "loading"
                    ? <SpinnerCircle />
                    : null
            }
            {
                _data
                    ? <AuthorTable data={_data} />
                    : null
            }
        </div>
    )
}

function AuthorTable({ data }) {
    //console.log(data)
    const authorData = data[0]?.tfBindingAuthorsData
    if (!authorData) {
        return null
    }
    let link = saveStaticDataToFile(authorData, data[0]?._id)
    return (
        <div>
            <button
                onClick={() => { window.location = link }}
            >Download File</button>
            <div style={{overflow: "auto", height: "500px"}} > 
            <CsvToHtmlTable
                data={authorData}
                tableClassName="table_content"
                csvDelimiter=","
            />
            </div>
        </div>
    )
}

function saveStaticDataToFile(str, name) {
    let blob = new Blob([str],
        { type: "text/csv;charset=utf-8" },
        `n_${name}.csv`
    );
    return window.URL.createObjectURL(blob);
}