import React, { useEffect, useState } from 'react';
//import { Person } from "schema-dts";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";
//import {CITATIONS_FIELDS} from "../fragments/fragments"

//const RegulonGeneOntologyItem = ``


function query(id_dataset) {
    return gql`
    {
        getAllTFBindingOfDataset(datasetId: "${id_dataset}") {
          _id
          chromosome
          chrLeftPosition
          chrRightPosition
          closestGenes {
            _id
            name
            distanceTo
          }
          transcriptionUnit {
            _id
            name
            distanceTo
          }
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
    const { data, loading, error } = useQuery(query(id_dataset))
    //console.log(data, loading, error)
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