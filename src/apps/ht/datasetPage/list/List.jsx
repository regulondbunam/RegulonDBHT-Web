import React, { useState, useEffect } from 'react'
import { SpinnerCircle } from '../../../../components/ui-components/ui_components'
import { DatasetTable } from './home/table'

export default function List({ datasetType, experimentType }) {
  const [_data, set_data] = useState()
  const [_state, set_state] = useState()
  let advancedSearch = `${datasetType}[datasetType]`
  let subtitle = ""
  switch (datasetType) {
    case "TFBINDING":
      subtitle = "All datasets TF Binding Sites"
      if (experimentType) {
        subtitle = `All datasets TF Binding Sites with strategy ${experimentType}`
        advancedSearch = `'${experimentType}'[sourceSerie.strategy] AND TFBINDING[datasetType]`
      }
      break;
    case "TUS":
      subtitle = "All datasets Transcription Units"
      break;
    case "TTS":
      subtitle = "All datasets Transcription Termination Sites"
      break;
    case "TSS":
      subtitle = "All datasets Transcription Start Sites"
      break;
    case "GENE_EXPRESSION":
      subtitle = "All datasets Gene Expression"
      break;
    default:
      advancedSearch = undefined
      break;
  }

  useEffect(() => {
    const COVER = document.getElementById("title-cover-ht")
    if (COVER) {
      const COVER_REACTION = new CustomEvent('coverR', {
        bubbles: true,
        detail: {
          title: subtitle,
          state: _state,
        }
      });
      COVER.dispatchEvent(COVER_REACTION);
    }
    if (!_data) {
      try {
        (async () => {
          set_state("loading")
          await fetch(`${process.env.REACT_APP_PROSSES_SERVICE}ht/wdps/jsontable`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ advancedSearch: advancedSearch })
          })
            .then((response) => response.json())
            .then(data => {
              set_data(data)
              set_state("done")
            })
            .catch((error) => {
              console.error("prosses_Services_error: ", error);
              set_state("error")
            });
        })();
      } catch (error) {
        console.error("prosses_Services_error: ", error);
        set_state("error")
      }

    }
  }, [_state, subtitle])

  if (!advancedSearch) {
    return (
      <article>
        <h2>unknow dataset type: {datasetType}</h2>
      </article>
    )
  }

  return (
    <div>
      <h2>Collection datasets  {subtitle}</h2>

      {
        _state === "loading" && <SpinnerCircle />
      }
      {
        _data && <DatasetTable jsonTable={_data} datasetType={datasetType} />
      }

    </div>
  )
}
