import React from 'react'
import SourceSerie from './SourceSerie'
import Publications from './Publications'


export default function Maininfo({ _id, sample, fivePrimeEnrichment, datasetType, sourceSerie, publications }) {
    let datasetTitle = ""
    //Condicion para filtrar comentarios de Victor (curador) saludos n.n
    if (sample?.title) {
        if (sample?.title === "obtener de GEO") {
            datasetTitle = ""
        } else {
            datasetTitle = sample?.title
        }
        //console.log(_data)
    }
    //console.log(sourceSerie);
    return (
        <div style={{ marginLeft: "5%" }} id={`dataset_${_id}_main_info`} >
            <p style={{ fontSize: "12px" }}>ID: {_id}</p>
            <p style={{ fontSize: "22px" }} className="p_accent">{datasetTitle}</p>
            {
                sourceSerie?.strategy && <p style={{ fontSize: "14px" }} >|  Strategy: {sourceSerie.strategy}</p>
            }
            {
                fivePrimeEnrichment && <p style={{ fontSize: "14px" }} >5' Enrichment: {fivePrimeEnrichment}</p>
            }
            {
                sample?.controlId.length > 0 && <p style={{ fontSize: "14px" }} >Control ID: {sample?.controlId.join(", ")}</p>
            }
            {
                sample?.experimentId.length > 0 && <p style={{ fontSize: "14px" }} >Experiment ID: {sample?.experimentId.join(", ")}</p>
            }
            {datasetType === "GENE_EXPRESSION" && (
                <div>
                    <a href={"https://trace.ncbi.nlm.nih.gov/Traces/?view=run_browser&acc=" + _id.split("_")[2] + "&display=metadata"}>Sequence Read Archive Link</a>
                </div>
            )}

            <SourceSerie sourceSerie={sourceSerie} />
            {
                publications.length > 0 && <div>
                    <p style={{ fontSize: "12px" }} className="p_accent" >Publications:</p>
                    <Publications publications={publications} />
                </div>
            }

        </div>
    )
}
