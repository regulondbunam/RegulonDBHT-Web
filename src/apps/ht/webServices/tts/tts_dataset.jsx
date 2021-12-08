import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";
import response from "./getAllTTSofDatasetResponse.json"

function query(id_dataset) {
    return gql`
    {
        getAllTFBindingOfDataset(datasetId: "${id_dataset}") {
          _id
          chromosome
          chrLeftPosition
          chrRightPosition
          foundClassicRIs {
            tfbsLeftPosition
            tfbsRightPosition
            relativeGeneDistance
            relativeTSSDistance
            strand
            sequence
          }
          foundDatasetRIs {
            tfbsLeftPosition
            tfbsRightPosition
            relativeGeneDistance
            relativeTSSDistance
            strand
            sequence
          }
          nameCollection
          score
          strand
          sequence
          closestGenes {
            _id
            name
            distanceTo
          }
          datasetIds
          temporalId
        }
      }
    `
}

const GetTFBS = ({
    id_dataset = "",
    status = () => { },
    resoultsData = () => { },
}) => {
  let loading = false;
  let error = false;
  let data = response.data;
  //const { data, loading, error } = useQuery(query(id_dataset))
    //console.log(id_dataset)
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data) {
            try {
              if(data.getAllTFBindingOfDataset.length > 0) {
                status('done')
              } else {
                status('no_results')
              }
              resoultsData(data?.getAllTFBindingOfDataset)
                
            } catch (error) {
                status('error')
                console.error(error)
            }
        }
        if (error) {
            status('error')
            console.error(error)
        }

    }, [loading, error, status, data, resoultsData, id_dataset]);
    return (<></>);
}

export default GetTFBS;