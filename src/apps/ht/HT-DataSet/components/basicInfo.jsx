import React from 'react'
import Style from './basicInfo.module.css'

export default function BasicInfo({ data }) {

    

    return (
        <div>
            <p style={{ fontSize: "12px" }}>ID: {data?.datasetID}</p>
            <table style={{ borderLeft: "1px solid #000000" }}>
                <thead className="table_content">
                    <tr>
                        <th colSpan="3">
                            <p style={{ fontSize: "22px" }} className="p_accent">{data?.sample?.title}</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="3">
                            <p style={{ fontSize: "12px" }} className="p_accent">Type</p>
                            <p className="p_accent">
                                {
                                    data?.linkedDataset?.datasetType
                                        ? data?.linkedDataset?.datasetType
                                        : " - - -"
                                }
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <div className={Style.gridContainer}>

                            </div>
                        </td>
                    </tr>
                    <tr>

                        <td>
                            <p style={{ fontSize: "12px" }} className="p_accent">Strategy</p>
                            <p className="p_accent">
                                {
                                    data?.sourceSerie?.strategy
                                        ? data?.sourceSerie?.strategy
                                        : " - - -"
                                }
                            </p>
                        </td>
                        <td>
                            <p style={{ fontSize: "12px" }} className="p_accent">Method</p>
                            <p className="p_accent">
                                {
                                    data?.sourceSerie?.method
                                        ? data?.sourceSerie?.method
                                        : " - - -"
                                }
                            </p>
                        </td>
                    </tr>
                    <tr>

                    </tr>
                </tbody>
            </table>

        </div>
    )
}

function BitInfo(title, data) {
    if (!data) {
        return null
    }
    return (
        <div className={Style.gridItem}>
            <p style={{ fontSize: "12px" }} className="p_accent">
                {title}
            </p>
            <p className="p_accent">
                {data}
            </p>
        </div>
    )
}