import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SpinnerCircle } from '../../../components/ui-components/ui_components'
import GetResultsDataset from '../webServices/dataset/dataset_results'
import { DatasetTable } from './home/table'


export default function DataSetHome({ datasetType, experimentType }) {
    const [_data, set_data] = useState()
    const [_state, set_state] = useState()
    let query = `${datasetType}[datasetType]`
    let subtitle = ""
    switch (datasetType) {
        case "TFBINDING":
            subtitle = "TF Binding Sites"
            if (experimentType) {
                query = `'${experimentType}'[sourceSerie.strategy] AND TFBINDING[datasetType]`
            }
            break;
        case "TUS":
            subtitle = "Transcription Units"
            break;
        case "TTS":
            subtitle = "Transcription Termination Sites"
            break;
        case "TSS":
            subtitle = "Transcription Start Sites"
            break;
        case "GENE_EXPRESSION":
            subtitle = "Gene Expression"
            break;
        default:
            query = undefined
            break;
    }

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

    if (!query) {
        return (
            <article>
                <h2>unknow dataset type: {datasetType}</h2>
            </article>
        )
    }

    return (
        <article>
            <h2>{subtitle}</h2>
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
            <p>
                Do you need to make a more specific search?
            </p>
            <Link to={`/${datasetType}/query`}>
                <button>
                    Use the Query Builder
                </button>
            </Link>

        </article>
    )
}
