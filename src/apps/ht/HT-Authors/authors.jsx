import React from 'react'
import { CsvToHtmlTable } from 'react-csv-to-table';

export default function Authors({ data }) {
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