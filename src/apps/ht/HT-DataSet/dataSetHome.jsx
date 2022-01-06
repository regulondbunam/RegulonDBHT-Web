import React, { useEffect, useState} from 'react'
import { SpinnerCircle } from '../../../components/ui-components/ui_components'
import GetResultsDataset from '../webServices/dataset/dataset_results'
import { DatasetTable } from './home/table'


export default function DataSetHome({ datasetType }) {
    const [_data, set_data] = useState()
    const [_state, set_state] = useState()
    const query = `${datasetType}[datasetType]`

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

    return (
        <div>
            <h2>Datasets</h2>
            {
                !_data &&
                <GetResultsDataset
                    ht_query={query}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                />
            }
            {
                _state === "loading" && <SpinnerCircle />
            }
            {
                _data && <DatasetTable datasets={_data} datasetType={datasetType} />
            }
        </div>
    )
}
