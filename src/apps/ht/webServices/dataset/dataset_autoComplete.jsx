import React, { useEffect } from 'react';
//import { Person } from "schema-dts";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";
//import {CITATIONS_FIELDS} from "../fragments/fragments"

//const RegulonGeneOntologyItem = ``


function query(keyWord) {
    return gql`
    {
        getDatasetsFromSearch(advancedSearch: "${keyWord}") {
          _id
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
              distanceTo
            }
            summary
            activeConformations
            externalCrossReferences {
              externalCrossReferenceId
              externalCrossReferenceName
              objectId
              url
            }
          }
          sourceSerie {
            sourceID
            sourceName
            title
            platformID
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
          temporalID
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

const GetAutoComplete = ({
    keyWord = "",
    location = "[]",
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(query(`\\"${keyWord}\\"[${location}]`))
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data) {

            try {
                resoultsData(FormatData(data?.getDatasetsFromSearch, keyWord, location))
                status('done')
            } catch (error) {
                status('error')
                console.error(error)
            }
        }
        if (error) {
            status('error')
            //console.error(error)
        }

    }, [loading, error, status, data, resoultsData, keyWord, location]);
    return (<></>);
}

export default GetAutoComplete;

function FormatData(data, keyWord, location) {
    let locations = location.split(".")
    if (!keyWord || !location || locations.length < 1 || !data) {
        return []
    }
    let suggest = []
    //console.log(data)
    try {
        let result = [];
        data.map(d => {
            let loc = d
            for (let index = 0; index < locations.length; index++) {
                const key = locations[index];
                loc = loc[key];
                if (index === locations.length - 1) {
                    if(loc.length){
                        if (loc.length > 1) {
                            loc.forEach(item=>{
                                if (result.indexOf(item)<0) {
                                    result.push(item)
                                }
                            })
                        }else{
                            result.push(loc)
                        }
                    } 
                }
            }
            return null
        })
        let rx = new RegExp(`${keyWord.toLowerCase() }`)
        result.forEach(item => {
            if (rx.test(item.toLowerCase() )) {
                suggest.push(item)
            }
        });
    } catch (error) {
        console.error(error)
    }
    return suggest
}

// eslint-disable-next-line no-unused-vars
const a = `
{
    getDatasetsFromSearch(advancedSearch: "j[publication.authors]") {
      datasetID
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
          distanceTo
        }
        summary
        activeConformations
        externalCrossReferences {
          externalCrossReferenceId
          externalCrossReferenceName
          objectId
          url
        }
      }
      sourceSerie {
        sourceID
        sourceName
        title
        platformID
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
      temporalDatasetID
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