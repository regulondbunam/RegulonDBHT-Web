import React, { useState, useEffect, useMemo } from 'react'
import Style from './result.module.css'
import { ExtQuery } from './ExtracQueries'
import { SpinnerCircle } from '../../../../components/ui-components/ui_components'
import Mark from '../../../../components/ui-components/web/components/utiles/MarkStr'
import NLPGCgetdatasetIds from '../../webServices/nlpGrowthCondition/nlpgc_datasetIds'
import GetResultsDataset from '../../webServices/dataset/dataset_results'
import Filter from './componets/panelFilter'
import PanelResult from './componets/panelResult'

export default function Results({ search, datasetType }) {
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

    let ht_query = ""

    if (!_datasets) {
        if (querys?.nlpgc && !_nlpgc_datasetId) {
            //console.log(cleanQuery(querys?.nlpgc));
            return (
                <div>
                    <NLPGCgetdatasetIds keyword={cleanQuery(querys?.nlpgc)} status={(state) => { set_state(state) }}
                        resoultsData={(datasetIds) => {
                            let ids = []
                            if (Array.isArray(datasetIds)) {
                                datasetIds.forEach(elements => {
                                    if (Array.isArray(elements.datasetIds)) {
                                        elements.datasetIds.forEach(id => {
                                            ids.push(id)
                                        })
                                    }
                                });
                                set_nlpgc_datasetId(`'${ids.join("|")}'[_id]`)
                            } else {
                                set_nlpgc_datasetId([])
                            }


                        }}
                    />
                    <SpinnerCircle />
                </div>
            )
        } else {
            ht_query = querys.dataset
            if (querys.nlpgc) {
                if (querys.dataset) {
                    ht_query = `(${querys.dataset}) ${querys.nlpgcLogic} ${_nlpgc_datasetId}`
                } else {
                    ht_query = _nlpgc_datasetId
                }
            }
            return (
                <div>
                    <GetResultsDataset ht_query={ht_query} status={(state) => { set_state(state) }} resoultsData={(datasets) => { set_datasets(datasets) }} />
                    <SpinnerCircle />
                </div>
            )
        }
    } else {
        console.log(_datasets);
        return (
            <div >
                <div className={Style.filter}>
                    <Filter data={_datasets} datasetType={datasetType} />
                </div>
                <div className={Style.result} >
                    <ResultsPanel data={_datasets} ht_query={ht_query} />
                </div>
            </div>
        )
    }
}

function cleanQuery(query = "") {
    let n = query.replace(/°C/g, "")
    return n
}

function ResultsPanel({ data = [], ht_query = "" }) {


    const results = useMemo(() => {
      let dataStr = []
      let strQuery = ht_query
      strQuery = strQuery.replaceAll("AND", "#")
      strQuery = strQuery.replaceAll("OR", "#")
      strQuery = strQuery.split("#")
      strQuery.map((e) => {
        e = e.replaceAll(`"`, "")
        e = e.replaceAll(`]`, "")
        e = e.replaceAll("\\", "")
        e = e.split(`[`)
        dataStr.push({ key: e[0], location: e[1] })
        return null
      })
  
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
    }, [data, ht_query])
  
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
        <p className="p_accent" id={"n_result"} >{data.length} Results</p>
        {
          results
            ? <Panels results={results} />
            : null
        }
      </div>
    )
  }
  
  function Panels({ results }) {
  
    return (
      <div id="resultPanel_63" >
        {
          results.map(ds => {
            return (
              <div key={`ds_id_${ds?._id}`} id={`dataset_result_${ds?._id}`} >
                <PanelResult ds={ds} match_data={ds?._match} />
              </div>
            )
          })
        }
      </div>
    )
  }
  
  function FormatData(data, keyWord, location) {
    keyWord = keyWord.replaceAll("'", "")
    if (!location) { return undefined }
    let locations = location.split(".")
    if (!keyWord || locations.length === 0 || !data) {
      return undefined
    }
    let MachText = ""
    try {
      let dataMatch = data
      for (let index = 0; index < locations.length; index++) {
        const key = locations[index].replaceAll(" ", "");
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
      //console.log(MachText,keyWord)
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