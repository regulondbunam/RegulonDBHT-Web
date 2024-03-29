# The high-throughput transcription factor binding sites (TFBS)
This collection is composed of datasets generated by ChIP-seq experiments. 

**Summary** 
This collection contains 28 datasets related to 12 different TFs.

**Creation of the collection**

1. **PubMed** is searched for articles relating high-throughput experiments, and specifically using the ChIP-seq technology. The articles are carefully selected and curated.
2. **Annotation process** 

  a. The data reported in the curated articles is reported and detailed in a dataset registry, where a dataset is composed of a given sample and its technical and/or biological replicates, when available, as well as the targeted TF and the experimental condition (organism, strain, temperature, medium, medium supplements, pH, etc). Each dataset is also associated with its “series ID” (whether from GEO or ArrayExpress), the experiment platform, the article’s PMID, the reference genome, and the control samples if provided.

  b. The supplementary files reported by the authors are downloaded, specifically the identified binding sites and their coordinates. These files are formatted into a pre-defined model.

  c. The curation process associates the TFBS files with their corresponding dataset, TF and associated metadata. 

3. **Uniformization**. This step allows the standardization of all the datasets in the collection. 
    a. Starting with the dataset table, series and sample IDs are extracted in order to automatize the downloading of all of the raw Fastq files composing each dataset (treatment sample, control, replicates).
    b. The raw data is pre-processed: each sample is independently cleaned, trimmed, mapped to the reference genome, and sequencing quality is verified. The peak-calling step is performed, using the aligned samples and their controls. It consists in detecting regions of the genome where a significant amount of reads were mapped, likely to indicate a binding position. This step generates a single, bed-formatted peak file for each dataset.
    c. The post-processing consists in identifying actual binding sites inside of the peaks regions. For each dataset, the TF motif available in RegulonDB is used for pattern-matching using RSAT matrix-scan. When a known motif is not available, a putative one is generated through *de novo* motif search in the peaks regions using RSAT peak-motifs. The identified binding sites are then used to build a new binding matrix, specific to each dataset.

4. **Mapping with RegulonDB and other datasets**. RegulonDB currently holds the biggest collection of transcriptional regulatory binding sites for E. coli. Binding sites identified in the ChIP-seq datasets are compared to the RegulonDB collection, in order to tag those as formerly known or potentially new. ChIP-seq datasets of a given TF are also compared to each other. Finally, all binding sites are associated with their closest gene(s) and its product. 
