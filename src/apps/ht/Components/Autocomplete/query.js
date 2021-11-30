import { gql } from "@apollo/client";

export const QUERY = gql`
  query SEARCH_KEYWORD($keyword: String!){
    getDatasetsFromSearch(advancedSearch: $keyword) {
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
