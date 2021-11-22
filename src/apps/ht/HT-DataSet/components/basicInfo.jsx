import React, { useMemo } from 'react'
import Style from './basicInfo.module.css'
import Sample from './basicInfo/sample';
import PublicationInfo from './publicationInfo';

export default function BasicInfo({ data }) {

    let informations = useMemo(() => {
        let inf = []
        //inf.push({title:"",data:""});
        //datasetType
        inf.push({ title: "Dataset Type", data: data?.datasetType });
        //sourceSerie
        /*
        {
            "sourceID": null,
            "sourceName": "GEO",
            "title": "ArcA",
            "platformID": "GPL8387",
            "platformTitle": null,
            "strategy": "ChIP-chip",
            "method": null,
            "__typename": "SourceSerie"
        } */
        inf.push({ title: "Platform", data: data?.sourceSerie?.platformTitle });
        inf.push({ title: "Platform ID", data: data?.sourceSerie?.platformID });
        inf.push({ title: "Source Serie", data: data?.sourceSerie?.title });
        inf.push({ title: "Source Name", data: data?.sourceSerie?.sourceName });
        inf.push({ title: "Source ID", data: data?.sourceSerie?.sourceID });
        inf.push({ title: "Strategy", data: data?.sourceSerie?.strategy });

        return inf
    }, [data])

    //linkedDataset
    let id;
    let controlId;
    if (data?.linkedDataset?.controlId) {
        controlId = data?.linkedDataset?.controlId
    }
    if (data?.linkedDataset?.experimentId) {
        id = data?.linkedDataset?.experimentId
    }

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
                {
                        data?.sample?.title
                            ? <tr>
                                <td>
                                    <h3>Sample</h3>
                                    <Sample sample={data?.sample}/>
                                </td>
                            </tr>
                            : null
                    }
                    {
                        data?.linkedDataset?.controlId
                            ? <tr>
                                <td>
                                    <h3>Linked Dataset</h3>
                                </td>
                            </tr>
                            : null
                    }
                   
                    <tr>
                        <td>
                            <div className={Style.gridContainer} >
                                {
                                    informations.map((e, i) => {
                                        return <BitInfo key={`${i}-${e.title}`} title={e.title} data={e.data} />
                                    })
                                }
                            </div>
                        </td>
                    </tr>
                    {
                        data?.linkedDataset?.controlId
                            ? <tr>
                                <td>
                                    <p style={{ fontSize: "12px", float: "left", marginRight: "5px" }} className="p_accent">
                                        Control ID:
                                    </p>
                                    {
                                        controlId.map((link, i) => {
                                            return <a style={{ marginRight: "5px" }} key={`${i}-${link}`} href={`https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${link}`}
                                                target="_blank" rel="noreferrer">{link}</a>
                                        })
                                    }
                                </td>
                            </tr>
                            : null
                    }
                    {
                        data?.linkedDataset?.experimentId
                            ? <tr>
                                <td>
                                    <p style={{ fontSize: "12px", float: "left", marginRight: "5px" }} className="p_accent">
                                        Experimental ID:
                                    </p>
                                    {
                                        id.map((link, i) => {
                                            return <a style={{ marginRight: "5px" }} key={`${i}-${link}`} href={`https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${link}`}
                                                target="_blank" rel="noreferrer">{link}</a>
                                        })
                                    }
                                </td>
                            </tr>
                            : null
                    }
                </tbody>
            </table>
            <div>
                <PublicationInfo publication={data?.publication} />
            </div>
        </div>
    )
}

function BitInfo({ title, data }) {
    if (!data) {
        return null
    }
    return (
        <div className={Style.gridItem}>
            <p style={{ fontSize: "12px" }} className="p_accent">
                {title}
            </p>
            <p>
                {data}
            </p>
        </div>
    )
}