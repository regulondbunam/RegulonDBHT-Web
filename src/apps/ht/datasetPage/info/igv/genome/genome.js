export function confGenome({
  id_dataset,
  peaksFile,
  sitesFile,
  tfFiles,
  tsFile,
  ttFile,
  tuFile,
  geFile,
  promoter,
  terminator
}) {
  let conf = {
    "id": "Ecoli",
    "name": "Ecoli",
    "fastaURL": "/media/raw/e_coli_k12.fna",
    "indexURL": "/media/raw/e_coli_k12.fna.fai",
    "order": 1000,
    "tracks": [
      {
        "name": "Genes",
        "type": "annotation",
        "url": "/media/raw/ht_collections_web_v3/regulondb/GeneProductSet.gff3",
        "format": "gff3",
        "displayMode": "EXPANDED",
      }
    ]
  }
  if (geFile) {
    conf.tracks.push(
      {
        "name": `${id_dataset} dataset`,
        "url": geFile,
        "nameField": `${id_dataset} dataset`,
      }
    )    
  }
  if (tfFiles) {
    tfFiles.forEach(tf => {
      conf.tracks.push(
        {
          "name": `RegulonDB TFBS: ${tf.name}`,
          "url": tf.url,
          "displayMode": "EXPANDED",
          "nameField": `RegulonDB TFBS: ${tf.name}`
        }
      )  
    });
      
  }
  if (peaksFile) {
    conf.tracks.push(
      {
        "name": `${id_dataset} peaks`,
        "url": peaksFile,
        "format": "gff3",
        "displayMode": "EXPANDED",
        "nameField": `${id_dataset} peaks`,
      }
    )    
  }
  if (sitesFile) {
    conf.tracks.push(
      {
        "name": `${id_dataset} sites`,
        "url": sitesFile,
        "format": "gff3",
        "displayMode": "EXPANDED",
        "nameField": `${id_dataset} sites`,
      }
    )    
  }
  if (terminator) {
    conf.tracks.push(
      {
        "name": `TerminatorSet`,
        "url": terminator,
        "format": "gff3",
        "displayMode": "EXPANDED",
        "nameField": `TerminatorSet`,
      }
    )    
  }
  if (ttFile) {
    conf.tracks.push(
      {
        "name": `${id_dataset} dataset`,
        "url": ttFile,
        "format": "gff3",
        "displayMode": "EXPANDED",
        "nameField": `${id_dataset} dataset`,
      }
    )    
  }
  if (promoter) {
    conf.tracks.push(
      {
        "name": `PromoterSet`,
        "url": promoter,
        "format": "gff3",
        "displayMode": "EXPANDED",
        "nameField": `PromoterSet`,
      }
    )    
  }
  if (tsFile) {
    conf.tracks.push(
      {
        "name": `${id_dataset} dataset`,
        "url": tsFile,
        "format": "gff3",
        "displayMode": "EXPANDED",
        "nameField": `${id_dataset} dataset`,
      }
    )    
  }
  if (tuFile) {
    conf.tracks.push(
      {
        "name": `${id_dataset} dataset`,
        "url": tuFile,
        "format": "gff3",
        "displayMode": "EXPANDED",
        "nameField": `${id_dataset} dataset`,
      }
    )    
  }
  //console.log(conf)
  return conf
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