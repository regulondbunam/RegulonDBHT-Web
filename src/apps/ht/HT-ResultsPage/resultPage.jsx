import React, { useState, useEffect } from 'react'
import GetResultsDataset from '../webServices/dataset/dataset_results'
import {SpinnerCircle} from '../../../components/ui-components/ui_components'

export default function ResultPage({
    query
}) {
    const [_data, set_data] = useState()
    const [_state, set_state] = useState()

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
        <article>
            <h2>Results of:</h2>
            <p>{query}</p>
            {
                !_data
                ?<GetResultsDataset
                ht_query={query}
                resoultsData={(data)=>{set_data(data)}}
                status={(state)=>{set_state(state)}}
                />
                :<SpinnerCircle />
            }
        </article>
    )
}
