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
            <p style={{ fontSize: "14px", float:'left', marginRight:'10px' }} >Dataset Type: {datasetType}</p>
            <p style={{ fontSize: "14px" }} >|  Strategy: {sourceSerie.strategy}</p>
            <hr />
            {
                fivePrimeEnrichment && <p style={{ fontSize: "14px" }} >5' Enrichment: {fivePrimeEnrichment}</p>
            }
            {
                sample?.controlId.length > 0 && <p style={{ fontSize: "14px" }} >Control ID: {sample?.controlId.join(", ")}</p>
            }
            {
                sample?.experimentId.length > 0 && <p style={{ fontSize: "14px" }} >Experiment ID: {sample?.experimentId.join(", ")}</p>
            }
            <p style={{ fontSize: "12px" }} className="p_accent" >Source serie:</p>
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
