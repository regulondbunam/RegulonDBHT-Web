import React, { useState, useEffect } from 'react'
import Builder from './builder/Builder'
import GetResultsDataset from '../webServices/dataset/dataset_results'
import { SpinnerCircle } from '../../../components/ui-components/ui_components'
//import GetFields from '../webServices/introspection/fields'

export default function Finder({ datasetType }) {
    const [_queryBox, set_queryBox] = useState("")
    const [_state, set_state] = useState()
    const [_datasets, set_datasets] = useState()
    const [_advanced, set_advanced] = useState(true)

    useEffect(() => {
        const COVER = document.getElementById("title-cover-ht")
        if (COVER) {
            const COVER_REACTION = new CustomEvent('coverR', {
                bubbles: true,
                detail: {
                    title: `Query Builder in ${datasetType}`,
                    state: _state,
                }
            });
            COVER.dispatchEvent(COVER_REACTION);
        }
    }, [_state, datasetType])
    if (!_datasets) {
        return (
            <div>
                <GetResultsDataset
                    ht_query={`'${datasetType}'[datasetType]`}
                    resoultsData={(data) => { set_datasets(data) }}
                    status={(state) => { set_state(state) }}
                />
                <SpinnerCircle />
            </div>
        )
    }
    return (
        <div style={{margin: "0 2% 0 5%"}}>

            <h2>{_advanced ? "QUERY BOX" : "Results of"}</h2>
            <textarea name="queryBox" id="finder_queryBox" style={{ width: "100%" }} rows={_advanced ? "5" : "1"} value={_queryBox} onChange={(e) => { set_queryBox(e.target.value) }} />
            {
                _advanced
                    ? <div>
                        <div style={{display: "flex", flexDirection: "row-reverse"}}>
                        <button className='aBase'
                            onClick={()=>{
                                set_queryBox("")
                                set_datasets(undefined)
                            }}
                        >reset</button>
                        </div>
                        <h2>Builder</h2>
                        <Builder 
                            datasetType={datasetType} 
                            queryBox={_queryBox}
                            set_queryBox={(query) => { set_queryBox(query) }}
                            datasets={_datasets}
                        />
                    </div>
                    : <div>
                        results
                    </div>
            }


        </div>
    )
}

