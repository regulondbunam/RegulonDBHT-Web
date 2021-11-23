export const genomaE = {
  "id": "Ecoli",
  "name": "Ecoli",
  "fastaURL": "/media/raw/e_coli_k12.fna",
  "indexURL": "/media/raw/e_coli_k12.fna.fai",
  "order": 1000000,
  "tracks": [
    {
      "name": "peaks",
      "url": "/media/raw/DS00020_peaks.bed",
      "displayMode": "EXPANDED",
      "nameField": "gene",
      "height": 150
    }
  ]
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