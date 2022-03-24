import { gql } from "@apollo/client";

export const QUERYGQL = gql`
  query SEARCH_KEYWORD($keyword: String!){
    getDatasetsFromSearch(advancedSearch: $keyword) {
      _id
      publications{
        pmid,
        doi,
        authors,
        title,
        date,
        pmcid,
        abstract
      },
      objectsTested{
        _id,
        name,
        synonyms,
        genes {
          _id,
          name
        }
        note,
        activeConformations,
        externalCrossReferences {
          externalCrossReferenceId,
          externalCrossReferenceName,
          objectId,
          url
        }
      },
      sourceSerie {
        series{
          sourceId,
          sourceName
        },
        platform{
          _id,
          title
        },
        title,
        strategy,
        method
      },
      sample {
        experimentId,
        controlId,
        title
      },
      linkedDataset {
        controlId,
        experimentId,
        datasetType
      },
      referenceGenome,
      datasetType,
      temporalId,
      growthConditions {
        organism,
        geneticBackground,
        medium,
        mediumSupplements,
        aeration,
        temperature,
        ph,
        pressure,
        opticalDensity,
        growthPhase,
        growthRate,
        vesselType,
        aerationSpeed
      },
      releaseDataControl {
        date,
        version
      }
    }
  }
        `
