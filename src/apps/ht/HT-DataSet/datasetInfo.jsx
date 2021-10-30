import React, { useState, useEffect } from 'react'
import GetInfoDataset from '../webServices/dataset/dataset_info'
import { SpinnerCircle } from '../../../components/ui-components/ui_components'
import BasicInfo from './components/basicInfo'
import TfInfo from './components/tfInfo'

export default function DatasetInfo({ id_dataset }) {
    const [_data, set_data] = useState()
    const [_state, set_state] = useState()

    useEffect(() => {
        let title = "Loading ..."
        if (_data) {
            title = _data?.sample?.title
            console.log(_data)
        }
        const COVER = document.getElementById("title-cover-ht")
        if (COVER) {
            const COVER_REACTION = new CustomEvent('coverR', {
                bubbles: true,
                detail: {
                    state: _state,
                    title: title
                }
            });
            COVER.dispatchEvent(COVER_REACTION);
        }
        return () => {
            const COVER = document.getElementById("title-cover-ht")
            if (COVER) {
                const COVER_REACTION = new CustomEvent('coverR', {
                    bubbles: true,
                    detail: {
                        state: "done",
                        title: "High Throughput Collection"
                    }
                });
                COVER.dispatchEvent(COVER_REACTION);
            }
        }
    }, [_state, _data])
    return (
        <article>
            {
                !_data
                    ? <div>
                        <SpinnerCircle />
                        <GetInfoDataset id_dataset={id_dataset}
                            status={(state) => { set_state(state) }}
                            resoultsData={(data) => { set_data(data) }}
                        />
                    </div>
                    : <Body data={_data} />
            }

        </article>
    )
}

function Body({ data }) {

    return (
        <div>
            <h2>
                DATASET
            </h2>
            <div style={{ marginLeft: "5%" }}>
                <BasicInfo data={data} />
            </div>
            <h2>TRANSCRIPTION FACTOR</h2>
            <div style={{ marginLeft: "5%" }}>
                <TfInfo data={data} />
            </div>

        </div>
    )

}
