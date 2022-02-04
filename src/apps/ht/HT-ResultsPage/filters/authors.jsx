import React from 'react'
import Style from "../filter.module.css"

export default function Authors({ data, filterData, set_filterData, selectDatasets, set_selectedDataset }) {
    let authorsSelect = filterData.authors
    let _authors = {}
    for (let dataset of data) {
        for( let publication of dataset?.publications){
            for(let author of publication.authors){
                if (_authors[author]) {
                    _authors[author].push(dataset._id)
                } else {
                    _authors[author] = [dataset._id]
                }
            }
        }
    }
    return (
        <div className={Style.filedContent} >
            <table className="table_content">
                <thead>
                    {
                        Object.keys(_authors).map((author, i) => {
                            let ids = _authors[author]
                            return (
                                <tr key={`ids_filter_${i}_${author}`}>
                                    <th>
                                        <input type="checkbox" name={`CB_${author}`} id={`CB_author_${author}`}
                                            value={author}
                                            checked={authorsSelect.find(element => element === author) ? true : false}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    for (let id of ids) {
                                                        selectDatasets.push(id)
                                                    }
                                                    authorsSelect.push(author);
                                                } else {
                                                    let inx
                                                    for (let id of ids) {
                                                        inx = selectDatasets.indexOf(id);
                                                    if (inx > -1) {
                                                        selectDatasets.splice(inx, 1);
                                                    }
                                                    }
                                                    inx = authorsSelect.indexOf(author);
                                                    if (inx > -1) {
                                                        authorsSelect.splice(inx, 1);
                                                    }
                                                }
                                                filterData.author = authorsSelect
                                                set_selectedDataset(selectDatasets)
                                                set_filterData(filterData)
                                            }}
                                        />
                                        {
                                            author
                                        }
                                    </th>
                                </tr>
                            )
                        })
                    }
                </thead>
            </table>
        </div>
    )
}