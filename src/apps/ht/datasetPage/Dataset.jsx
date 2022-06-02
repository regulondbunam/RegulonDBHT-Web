import React, { useMemo } from 'react'
import Info from './info/Info'
import List from './list/List'

export default function Dataset({ datasetId, datasetType, experimentType, tfName }) {

  const propList = useMemo(() => {
    let properties = [
      {
        query: "[datasetType]",
        term: datasetType
      },
      {
        query: "[sourceSerie.strategy]",
        term: experimentType
      },
      {
        query: "[objectsTested.name]",
        term: tfName
      }
    ]
    let advancedSearch = ""
    let ind = 0
    properties.forEach((pro) => {
      if (pro?.term) {
        if (ind > 0) {
          if (ind > 1) {
            advancedSearch = `(${advancedSearch}) AND '${pro.term}'${pro.query}`
          } else {
            advancedSearch += ` AND '${pro.term}'${pro.query}`
            ind++
          }
        } else {
          advancedSearch = `'${pro.term}'${pro.query}`
          ind++
        }
      }
    });
    let title = datasetType
    switch (datasetType) {
      case "TFBINDING":
        title = " TF Binding Sites"
        if (experimentType) {
          title += ` with strategy ${experimentType}`
        }
        if(tfName){
          title += ` only TF ${tfName}`
        }
        break;
      case "TUS":
        title = " Transcription Units"
        break;
      case "TTS":
        title = " Transcription Termination Sites"
        break;
      case "TSS":
        title = " Transcription Start Sites"
        break;
      case "GENE_EXPRESSION":
        title = " Gene Expression"
        break;
      default:
        title = " ..."
        break;
    }
    return {advancedSearch: advancedSearch, title: title}
  }, [datasetType, tfName, experimentType])

  if (datasetId) {
    return <Info datasetId={datasetId} />
  }

  if (experimentType || datasetType || tfName) {
    return <List datasetType={datasetType.toLocaleUpperCase()} title={propList.title} advancedSearch={propList.advancedSearch} />
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
