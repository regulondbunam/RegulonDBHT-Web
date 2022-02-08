import React from 'react'
import DataSetHome from './dataSetHome'
import DatasetInfo from './datasetInfo'

export default function DataSet({id_dataset, datasetType, experimentType}) {
    if(id_dataset){
        return <DatasetInfo id_dataset={id_dataset} />
    }
    return <DataSetHome experimentType={experimentType} datasetType={datasetType}/>
}
