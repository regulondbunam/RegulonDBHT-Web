import React from 'react'
import Style from "../filter.module.css"

export default function EStrategy({ data, filterData, set_filterData, selectDatasets, set_selectedDataset }) {
    let eStrategy = filterData.eStrategy
    let _eStrategy = {}
    for (let dtset of data) {
        let eS = dtset.sourceSerie?.strategy
        if(eS){
        eS.replace(" ","")
        if (_eStrategy[eS]) {
            _eStrategy[eS].push(dtset._id)
        } else {
            _eStrategy[eS] = [dtset._id]
        }
        }
        
    }
    console.log(_eStrategy)
    return (
        <div className={Style.filedContent} >
            <table className="table_content">
                <thead>
                    {
                        Object.keys(_eStrategy).map((strategy, i) => {
                            let ids = _eStrategy[strategy]
                            return (
                                <tr key={`ids_filter_${i}_${strategy}`}>
                                    <th>
                                        <input type="checkbox" name={`CB_${strategy}`} id={`CB_author_${strategy}`}
                                            value={strategy}
                                            checked={eStrategy.find(element => element === strategy) ? true : false}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    for (let id of ids) {
                                                        selectDatasets.push(id)
                                                    }
                                                    eStrategy.push(strategy);
                                                } else {
                                                    let inx
                                                    for (let id of ids) {
                                                        inx = selectDatasets.indexOf(id);
                                                        if (inx > -1) {
                                                            selectDatasets.splice(inx, 1);
                                                        }
                                                    }
                                                    inx = eStrategy.indexOf(strategy);
                                                    if (inx > -1) {
                                                        eStrategy.splice(inx, 1);
                                                    }
                                                }
                                                filterData.eStrategy = eStrategy
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