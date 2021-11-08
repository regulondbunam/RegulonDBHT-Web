import React, { useState, useEffect, useMemo } from 'react'
import GetResultsDataset from '../webServices/dataset/dataset_results'
import { SpinnerCircle } from '../../../components/ui-components/ui_components'
import Mark from '../../../components/ui-components/web/components/utiles/MarkStr'
import PanelResult from './panelResult'

export default function ResultPage({
  query
}) {
  const [_data, set_data] = useState()
  const [_state, set_state] = useState()

  const dataStr = useMemo(() => {
    let str = []
    let strQuery = query
    strQuery = strQuery.replaceAll("AND", "#")
    strQuery = strQuery.replaceAll("OR", "#")
    strQuery = strQuery.split("#")
    strQuery.map((e) => {
      e = e.replaceAll(`"`, "")
      e = e.replaceAll(`]`, "")
      e = e.replaceAll("\\", "")
      e = e.split(`[`)
      str.push({ key: e[0], location: e[1] })
      return null
    })
    //console.log(str)
    return str
  }, [query])

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
          ? <div><GetResultsDataset
            ht_query={query}
            resoultsData={(data) => { set_data(data) }}
            status={(state) => { set_state(state) }}
          />
            {
              _state === "error"
                ? <p>Query Error: Falied to read query, please check your query </p>
                : <SpinnerCircle />
            }

          </div>
          : <Results data={_data} dataStr={dataStr} />
      }
    </article>
  )
}

function Results({ data = [], dataStr = [] }) {

  const results = useMemo(() => {
    let results = []
    data.forEach(result => {
      let match = []
      dataStr.forEach(mstr => {
        let matchText = FormatData(result, mstr?.key, mstr?.location)
        if (matchText) {
          match.push({
            matchText: matchText,
            key: mstr?.key,
            location: mstr.location
          })
        }
      });
      result._match = match
      results.push(result)
    });
    return results
  }, [data, dataStr])

  //console.log(data)
  if (!data) {
    return (
      <div>
        ERROR QUERY!
      </div>
    )
  }
  if (data.length === 0) {
    return (
      <div>
        No match Results!
      </div>
    )
  }
  return (
    <div>
      <p>{data.length} Results</p>
      {
        results
          ? <div>
            {
              results.map(ds => {
                return (
                  <div key={`ds_id_${ds?.datasetID}`}>
                    <PanelResult ds={ds} match_data={ds?._match} />
                  </div>
                )
              })
            }
          </div>
          : null
      }
    </div>
  )
}

function FormatData(data, keyWord, location) {
  let locations = location.split(".")
  if (!keyWord || !location || locations.length < 1 || !data) {
    return "---"
  }
  let MachText = "---"
  //console.log(data)
  try {
    let dataMatch = data
    for (let index = 0; index < locations.length; index++) {
      const key = locations[index];
      dataMatch = dataMatch[key]
      if (index === locations.length - 1) {
        if (dataMatch.length) {
          if (Array.isArray(dataMatch)) {
            MachText = dataMatch.map(t => {
              return t
            }).join(", ")
          } else {
            MachText = dataMatch
          }
        }
      }
    }
    let rx = new RegExp(`${keyWord.toLowerCase()}`)
    if (rx.test(MachText.toLowerCase())) {
      MachText = `
              ${Mark(keyWord, MachText)}
              `
    } else {
      MachText = undefined
    }
  } catch (error) {
    console.error(error)
  }
  return MachText
}