import React from 'react'
import DataSetHome from './dataSetHome'
import DatasetInfo from './datasetInfo'

export default function DataSet({id_dataset}) {
    if(id_dataset){
        return <DatasetInfo id_dataset={id_dataset} />
    }
    return <DataSetHome/>
}
