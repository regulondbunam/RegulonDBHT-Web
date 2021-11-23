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
    const [_c, set_c] = useState(false)
    const { data, loading, error } = useQuery(query(id_dataset))
    //console.log(data, loading, error)
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data && !_c) {
            try {
              set_c(true)
                resoultsData(data?.getAllTFBindingOfDataset)
                status('done')
            } catch (error) {
                status('error')
                console.error(error)
            }
        }
        if (error) {
            status('error')
            console.error(error)
        }

    }, [loading, error, status, data, resoultsData, id_dataset, _c, set_c]);
    return (<></>);
}

export default GetTFBS;