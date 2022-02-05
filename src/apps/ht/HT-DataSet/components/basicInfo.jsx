import React from 'react'
import LinkedDataset from './basicInfo/linkDataset';
import Sample from './basicInfo/sample';
import SourceSerie from './basicInfo/source';
import PublicationInfo from './publicationInfo';

export default function BasicInfo({ data }) {
    let title = ""

    //Condicion para filtrar comentarios de Victor (curador) saludos n.n
    if (data) {
        if (data?.sample?.title === "obtener de GEO") {
            title = ""
        } else {
            title = data?.sample?.title
        }
        //console.log(_data)
    } else {
        return <></>
    }

    return (
        <div>
            <p style={{ fontSize: "12px" }}>ID: {data?._id}</p>
            <table>
                <thead className="table_content">
                    <tr>
                        <th>
                            <p style={{ fontSize: "22px" }} className="p_accent">{title}</p>
                            <p style={{ fontSize: "14px" }} >Dataset Type: {data?.datasetType}</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {
                                data?.sample?.title
                                    ? <Sample sample={data?.sample} strategy={data?.sourceSerie?.strategy} />
                                    : null
                            }
                            {
                                data?.linkedDataset?.controlId
                                    ? <LinkedDataset linkedDataset={data?.linkedDataset} />
                                    : null
                            }
                            {
                                data?.fivePrimeEnrichment
                                    ? <div>
                                        <table className="table_auto">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p style={{ fontSize: "12px" }} className="p_accent" >
                                                            5'_enrichment:
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p>{data?.fivePrimeEnrichment}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    : null
                            }
                            <SourceSerie sourceSerie={data?.sourceSerie} />
                            {
                                data?.publications.length > 0 &&
                                data.publications.map((publication, i) => {
                                    return <PublicationInfo key={`publication_${data?._id}_${i}`} publication={publication} />
                                })
                            }

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

