import React, {useState, useEffect} from 'react'
import GetInfoDataset from '../../webServices/dataset/dataset_info'
import {SpinnerCircle} from '../../../../components/ui-components/ui_components'
import Maininfo from './mainInfo/Maininfo'
import TranscriptionFactor from './transcriptionFactor/TranscriptionFactor'
import GrowthConditions from './growthConditions/growthConditions'
import NLPgc from './nlpGrowthConditions/NLPgc'
import Tabs from './data/tabs'
import { Viewer } from './igv/viewer'

export default function Info({datasetId}) {

  const [_dataset, set_dataset] = useState()
  const [_state, set_state] = useState('done')

  useEffect(() => {
    let title = "High Throughput Collection"
        if (_dataset) {

            if (_dataset?.sample?.title === "obtener de GEO") {
                title = _dataset?._id
            } else {
                title = _dataset?.sample?.title
            }
            //console.log(_data)
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
  }, [_state,_dataset])
  console.log(_dataset)
  if (_state === "error") {
    return (
      <div>dataset error</div>
    )
  }
  if(!_dataset){
    return(
      <div>
        <GetInfoDataset datasetId={datasetId} resoultsData={(dataset)=>{set_dataset(dataset)}} status={(state)=>{set_state(state)}} />
        <SpinnerCircle />
      </div>
    )
  }
  if(!_dataset?._id){
    return(
      <div>
        dataset no existe
      </div>
    )
  }
  
  return (
    <article>
      <h2>DATASET</h2>
      <Maininfo _id={_dataset?._id} sample={_dataset?.sample} datasetType={_dataset?.datasetType} sourceSerie={_dataset?.sourceSerie} publications={_dataset?.publications} />
      {
        _dataset?.datasetType === "TFBINDING" && <div>
          <h2>TRANSCRIPTION FACTOR</h2>
          <TranscriptionFactor objectsTested={_dataset?.objectsTested} />
        </div>
      }
      <GrowthConditions growthCondition={_dataset?.growthConditions} />
      <NLPgc datasetId={_dataset?._id} />
      <Tabs id_dataset={_dataset?._id} data={_dataset} />
      <br />
            <div id="igv-view" >
                {

                    _dataset?.sourceSerie?.strategy !== "ChIP-exo"
                        ? <Viewer id_dataset={_dataset?._id} tfs={_dataset?.objectsTested} datasetType={_dataset?.datasetType} />
                        : null
                }
            </div>
    </article>
  )
}
