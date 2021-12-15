import React from 'react'
import Style from "../filter.module.css"

export default function EStrategy({data, filterData, set_filterData}) {
    let eStrategy = filterData.eStrategy
    let _eStrategy = []
    for(let dtset of data ){
        let eS = dtset.sourceSerie?.strategy
        if(!_eStrategy.find(e => e=== eS)){
            _eStrategy.push(eS)
        }
    }
    return (
        <div className={Style.filedContent} >
        <table className="table_content">
            <thead>
                {
                    _eStrategy.map((strategy, i) => {
                        return (
                            <tr key={`ids_filter_${i}_${strategy}`}>
                                <th>
                                    <input type="checkbox" name={`CB_${strategy}`} id={`CB_author_${strategy}`}
                                        value={strategy}
                                        checked={eStrategy.find(element => element === strategy ) ? true : false}
                                        onChange={(e) =>{
                                            if(e.target.checked){
                                                eStrategy.push(strategy);
                                            }else{
                                                let inx = eStrategy.indexOf(strategy);
                                                if(inx > -1){
                                                    eStrategy.splice(inx, 1);
                                                }
                                            }
                                            filterData.eStrategy = eStrategy
                                            set_filterData(filterData)
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