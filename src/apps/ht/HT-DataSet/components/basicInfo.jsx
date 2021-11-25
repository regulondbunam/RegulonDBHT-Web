import React from 'react'
import LinkedDataset from './basicInfo/linkDataset';
import Sample from './basicInfo/sample';
import SourceSerie from './basicInfo/source';
import PublicationInfo from './publicationInfo';

export default function BasicInfo({ data }) {


    return (
        <div>
            <p style={{ fontSize: "12px" }}>ID: {data?._id}</p>
            <table>
                <thead className="table_content">
                    <tr>
                        <th>
                            <p style={{ fontSize: "22px" }} className="p_accent">{data?.sample?.title}</p>
                            <p style={{ fontSize: "14px" }} >Dataset Type: {data?.datasetType}</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {
                                data?.sample?.title
                                    ? <Sample sample={data?.sample} />
                                    : null
                            }
                            {
                                data?.linkedDataset?.controlId
                                    ? <LinkedDataset linkedDataset={data?.linkedDataset} />
                                    : null
                            }
                            <SourceSerie sourceSerie={data?.sourceSerie} />
                            <PublicationInfo publication={data?.publication} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

