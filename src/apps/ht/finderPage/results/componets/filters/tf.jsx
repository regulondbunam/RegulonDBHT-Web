import React from 'react'
import Style from "../filter.module.css"

export default function TFS({ data, filterData, set_filterData, selectDatasets, set_selectedDataset }) {
    let tfs = filterData.tfs
    let _tfs = {}
    for(let dataset of data){
        let _id = dataset._id
        for(let obj of dataset.objectsTested){
            if (_tfs[obj?.name]) {
                _tfs[obj?.name].push(_id)
            } else {
                _tfs[obj?.name] = [_id]
            }
        }
    }
    return (
        <div className={Style.filedContent} >
            <table className="table_content">
                <thead>
                    {
                        Object.keys(_tfs).map((strategy, i) => {
                            let ids = _tfs[strategy]
                            return (
                                <tr key={`ids_filter_${i}_${strategy}`}>
                                    <th>
                                        <input type="checkbox" name={`CB_${strategy}`} id={`CB_author_${strategy}`}
                                            value={strategy}
                                            checked={tfs.find(element => element === strategy) ? true : false}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    for (let id of ids) {
                                                        selectDatasets.push(id)
                                                    }
                                                    tfs.push(strategy);
                                                } else {
                                                    let inx
                                                    for (let id of ids) {
                                                        inx = selectDatasets.indexOf(id);
                                                        if (inx > -1) {
                                                            selectDatasets.splice(inx, 1);
                                                        }
                                                    }
                                                    inx = tfs.indexOf(strategy);
                                                    if (inx > -1) {
                                                        tfs.splice(inx, 1);
                                                    }
                                                }
                                                filterData.tfs = tfs
                                                set_filterData(filterData)
                                                set_selectedDataset(selectDatasets)
                                            }}
                                        />
                                        {
                                            strategy
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