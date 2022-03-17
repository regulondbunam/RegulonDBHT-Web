import React from 'react'
import Info from './info/Info'
import List from './list/List'

export default function Dataset({datasetId, datasetType, experimentType}) {

    if(datasetId){
        return <Info datasetId={datasetId} />
    }
    if (experimentType || datasetType) {
        return <List datasetType={datasetType} experimentType={experimentType} />
    }
  return (
    <div>Url Error check:
        <br />
        id:{datasetId}
        <br />
        datasetType: {datasetType}
        <br />
        experimentType: {experimentType}
    </div>
  )
}
