import React from 'react'
import { CsvToHtmlTable } from 'react-csv-to-table';

export default function Authors({ data }) {
    //console.log(data)
    const authorData = data[0]?.authorsData
    if (!authorData) {
        return null
    }
    try {
        let dt = getComments(authorData)
        let coment = dt.comment
        let document = dt.document
        let link = saveStaticDataToFile(authorData, data[0]?._id)
        return (
            <div>
                <button
                    onClick={() => { window.location = link }}
                >Download File</button>
                <div style={{ overflow: "auto", height: "500px" }} >
                    <p dangerouslySetInnerHTML={{ __html: coment }}></p>
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

function getComments(authorData) {
    let comment = "" 
    let document = authorData
    let start = authorData.indexOf("#")
    let flag = 0
    while (start !== -1) {
        let end = document.indexOf("\n")
        if (start > end) {
            console.warn("error format document author")
            document = document.replace("\n","")
        } else {
            comment += "<br/>"+document.substring(start, end)
            document = document.substring(end, document.length)
        }
        start = document.indexOf("#")
        if (flag > 5) { break; }
        flag++
    }

    return { comment: comment, document: document }
}

function saveStaticDataToFile(str, name) {
    let blob = new Blob([str],
        { type: "text/csv;charset=utf-8" },
        `n_S${name}.csv`
    );
    return window.URL.createObjectURL(blob);
}