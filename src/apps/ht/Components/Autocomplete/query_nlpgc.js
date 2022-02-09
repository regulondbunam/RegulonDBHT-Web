import { gql } from "@apollo/client";

export const QUERY_NLPGC = gql`
query SEARCH_NLPGC($keyword: String!){
  getNLPGrowthConditionBySearch(advancedSearch: $keyword){
    _id
      organism {
        value
      }
      geneticBackground {
        value
      }
      medium {
        value
      }
      aeration {
        value
      }
      temperature {
        value
      }
      ph {
        value
      }
      pressure {
        value
      }
      opticalDensity {
        value
      }
      growthPhase {
        value
      }
      growthRate {
        value
      }
      vesselType {
        value
      }
      aerationSpeed {
        value
      }
      mediumSupplements {
        value
      }
      additionalProperties {
        name
        value {
          value
        }
      }
      datasetIds
      temporalId
  }
}

`