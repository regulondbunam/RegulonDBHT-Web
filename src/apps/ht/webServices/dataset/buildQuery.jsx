import { gql } from "@apollo/client";

const publication = `
publication {
    pmid
    doi
    authors
    title
    date
    pmcid
  }
`
const publications = `
publication {
    pmid
    doi
    authors
    title
    date
    pmcid
  }
`

const objectTested = `
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
`

const objectsTested = `
objectsTested {
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
`

export function query(id_dataset, fields = []) {
    let q =`
        {
            getDatasetsFromSearch(advancedSearch: "${id_dataset}[_id]") {
                _id
                ${fields.find(field => field === "publication") ? publication : "" }
                ${fields.find(field => field === "publications") ? publications : "" }
                ${fields.find(field => field === "objectsTested") ? objectsTested : "" }
                ${fields.find(field => field === "objectTested") ? objectTested : ""}
                sourceSerie {
                    title
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
                    mediumSupplements
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
                assemblyGenomeId
                fivePrimeEnrichment
                nlpGrowthConditionsId
                geneExpressionFiltered
                experimentCondition
            }
        }
    `
    console.log(q)
    return gql`${q}`
}

/**
 
function Vquery(id_dataset) {
    return gql`
      {
          getDatasetsFromSearch(advancedSearch: "${id_dataset}[_id]") {
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
              mediumSupplements
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
      releaseDataControl{
        date
        version
      }
      assemblyGenomeId
      fivePrimeEnrichment
      nlpGrowthConditionsId
      geneExpressionFiltered
      experimentCondition
          }
        }
          `
}
 */