export function confGenome(peaksFile,sitesFile,tfFile) {
  let conf = {
    "id": "Ecoli",
    "name": "Ecoli",
    "fastaURL": "/media/raw/e_coli_k12.fna",
    "indexURL": "/media/raw/e_coli_k12.fna.fai",
    "order": 1000000,
    "tracks": [
      {
        "name": "Genes",
        "type": "annotation",
        "url": "/media/raw/GeneProductSet.gff3",
        "displayMode": "EXPANDED",
      }
    ]
  }
  if (peaksFile !== "undefined") {
    conf.tracks.push(
      {
        "name": "peaks",
        "url": peaksFile,
        "displayMode": "EXPANDED",
        "format": "bed",
        "nameField": "peaks",
      }
    )    
  }
  if (sitesFile !== "undefined") {
    conf.tracks.push(
      {
        "name": "sites",
        "url": sitesFile,
        "format": "bed",
        "displayMode": "EXPANDED",
        "nameField": "sites",
      }
    )    
  }
  if (tfFile !== "undefined") {
    conf.tracks.push(
      {
        "name": "RegulonDB TFBS",
        "url": tfFile,
        "format": "bed",
        "displayMode": "EXPANDED",
        "nameField": "RegulonDB_TFBS",
      }
    )    
  }
  return conf
}

export const genomaE = {

}
/**
 * export const genoma = {
    "id": "Sars-CoV-2_ASM985889v3",
    "name": "Sars-CoV-2 (ASM985889v3)",
    "fastaURL": "/media/raw/sars_seq.fna",
    "indexURL": "/media/raw/sars_seq_index.fna.fai",
    "order": 1000000,
    "tracks": [
      {
        "name": "Annotations",
        "url": "/media/raw/sars_relSeq.gff",
        "displayMode": "EXPANDED",
        "nameField": "gene",
        "height": 150
      }
    ]
  }
 */