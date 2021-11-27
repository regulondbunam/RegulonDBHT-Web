import React, { useEffect } from 'react';
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
        getDatasetsFromSearch(advancedSearch: "${id_dataset}[_id]") {
          _id
          fivePrimeEnrichment
          publication {
            pmid
            doi
            authors
            title
            date
            pmcid
          }
          objectTested {
            _id
            name
            synonyms
            genes {
              _id
              name
            }
            note
            activeConformations
            externalCrossReferences {
              externalCrossReferenceId
              externalCrossReferenceName
              objectId
              url
            }
          }
          sourceSerie {
            sourceId
            sourceName
            title
            platformId
            platformTitle
            strategy
            method
          }
          sample {
            experimentId
            controlId
            title
          }
          linkedDataset {
            controlId
            experimentId
            datasetType
          }
          referenceGenome
          datasetType
          temporalId
          growthConditions {
            organism
            geneticBackground
            medium
            aeration
            temperature
            ph
            pressure
            opticalDensity
            growthPhase
            growthRate
            vesselType
            aerationSpeed
          }
          releaseDataControl {
            date
            version
          }
        }
      }
        `
}

const GetInfoDataset = ({
    id_dataset = "",
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(query(id_dataset))
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data) {
            try {
                resoultsData(data?.getDatasetsFromSearch[0])
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

    }, [loading, error, status, data, resoultsData, id_dataset]);
    return (<></>);
}

export default GetInfoDataset;