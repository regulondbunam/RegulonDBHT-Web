import React from 'react'
import { CsvToHtmlTable } from 'react-csv-to-table';

export default function Authors({ data }) {
    console.log(data)
    const authorData = data[0]?.authorsData
    if (!authorData) {
        return null
    }
    try {
        let start = authorData.indexOf("#")
        let end = authorData.indexOf("\n")
        let coment = authorData.substring(start, end)
        coment = coment.replace("# ","")
        let document = authorData.substring(end, authorData.length)
        let link = saveStaticDataToFile(authorData, data[0]?._id)
        return (
            <div>
                <button
                    onClick={() => { window.location = link }}
                >Download File</button>
                <div style={{ overflow: "auto", height: "500px" }} >
                    <p>{coment}</p>
                    <CsvToHtmlTable
                        data={document}
                        tableClassName="table_content"
                        csvDelimiter=","
                    />
                </div>
            </div>
        )
    } catch (error) {
        return null
    }

}

function saveStaticDataToFile(str, name) {
    let blob = new Blob([str],
        { type: "text/csv;charset=utf-8" },
        `n_S${name}.csv`
    );
    return window.URL.createObjectURL(blob);
}