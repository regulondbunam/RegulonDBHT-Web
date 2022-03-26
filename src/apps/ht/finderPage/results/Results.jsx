import React, { useState, useEffect } from 'react'
import { ExtQuery } from './ExtracQueries'
import NLPGCgetdatasetIds from '../../webServices/nlpGrowthCondition/nlpgc_datasetIds'

export default function Results({ search }) {
    const [_state, set_state] = useState()
    const [_nlpgc_datasetId, set_nlpgc_datasetId] = useState()
    const [_datasets, set_datasets] = useState()
    //console.log(search);
    let querys = ExtQuery(search)
    //console.log(querys);
    useEffect(() => {
        const COVER = document.getElementById("title-cover-ht")
        if (COVER) {
            const COVER_REACTION = new CustomEvent('coverR', {
                bubbles: true,
                detail: {
                    state: _state,
                }
            });
            COVER.dispatchEvent(COVER_REACTION);
        }
    }, [_state])



    if (querys?.nlpgc && !_nlpgc_datasetId) {
        return (
            <div>
                <NLPGCgetdatasetIds keyword={querys?.nlpgc} status={(state) => { set_state(state) }} 
                resoultsData={(datasetIds) => { 
                    let ids = []
                    if (Array.isArray(datasetIds)) {
                        datasetIds.forEach(elements => {
                            if (Array.isArray(elements.datasetIds)) {
                                elements.datasetIds.forEach(id =>{
                                    ids.push(id)
                                })
                            }
                        });
                        set_nlpgc_datasetId(`'${ids.join("|")}'[_id]`) 
                    }else{
                        set_nlpgc_datasetId([]) 
                    }
                    
                    
                }} 
                />
            </div>
        )
    } else {
        if (querys.dataset) {
            console.log(`(${querys.dataset}) ${querys.nlpgcLogic} ${_nlpgc_datasetId}`);
        }else{
            console.log(_nlpgc_datasetId);
        }
        


        return (
            <div>
                query dataset
                {querys.dataset}
                <br />
                query NLPGC
                {querys.nlpgc}
            </div>
        )
    }
}
