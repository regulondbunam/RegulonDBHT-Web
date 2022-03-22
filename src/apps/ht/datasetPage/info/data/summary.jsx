import React from 'react'

export default function Summary({data}) {
    const sum = dataExample?.summary
    return (
        <div style={{display: "none"}} >
            <h3>Summary</h3>
            <table className="table_content">
                <thead>
                    <tr>
                        <th>
                            Total of
                        </th>
                        <th>
                            Dataset (A)
                        </th>
                        <th>
                            RegulonDB (B)
                        </th>
                        <th>
                            A ∩ B
                        </th>
                        <th>
                            A - B
                        </th>
                        <th>
                            B - A
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Peaks
                        </td>
                        <td>
                            {
                                sum?.totalOfPeaks?.inDataset
                                ?sum?.totalOfPeaks?.inDataset
                                :null
                            }
                        </td>
                        <td>
                            {
                                sum?.totalOfPeaks?.inRDBClassic
                                ?sum?.totalOfPeaks?.inRDBClassic
                                :null
                            }
                        </td>
                        <td>
                            {
                                sum?.totalOfPeaks?.sharedItems
                                ?sum?.totalOfPeaks?.sharedItems
                                :null
                            }
                        </td>
                        <td>
                            {
                                sum?.totalOfPeaks?.notInRDB
                                ?sum?.totalOfPeaks?.notInRDB
                                :null
                            }
                        </td>
                        <td>
                            {
                                sum?.totalOfPeaks?.notInDataset
                                ?sum?.totalOfPeaks?.notInDataset
                                :null
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Genes
                        </td>
                        <td>
                            {
                                sum?.totalOfGenes?.inDataset
                                ?sum?.totalOfGenes?.inDataset
                                :null
                            }
                        </td>
                        <td>
                            {
                                sum?.totalOfGenes?.inRDBClassic
                                ?sum?.totalOfGenes?.inRDBClassic
                                :null
                            }
                        </td>
                        <td>
                            {
                                sum?.totalOfGenes?.sharedItems
                                ?sum?.totalOfGenes?.sharedItems
                                :null
                            }
                        </td>
                        <td>
                            {
                                sum?.totalOfGenes?.notInRDB
                                ?sum?.totalOfGenes?.notInRDB
                                :null
                            }
                        </td>
                        <td>
                            {
                                sum?.totalOfGenes?.notInDataset
                                ?sum?.totalOfGenes?.notInDataset
                                :null
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            TFBS
                        </td>
                        <td>
                            {
                                sum?.totalOfTFBS?.inDataset
                                ?sum?.totalOfTFBS?.inDataset
                                :null
                            }
                        </td>
                        <td>
                            {
                                sum?.totalOfTFBS?.inRDBClassic
                                ?sum?.totalOfTFBS?.inRDBClassic
                                :null
                            }
                        </td>
                        <td>
                            {
                                sum?.totalOfTFBS?.sharedItems
                                ?sum?.totalOfTFBS?.sharedItems
                                :null
                            }
                        </td>
                        <td>
                            {
                                sum?.totalOfTFBS?.notInRDB
                                ?sum?.totalOfTFBS?.notInRDB
                                :null
                            }
                        </td>
                        <td>
                            {
                                sum?.totalOfTFBS?.notInDataset
                                ?sum?.totalOfTFBS?.notInDataset
                                :null
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}



const dataExample = {
    "summary": {
        "totalOfPeaks": {
            inDataset: "###",
            inRDBClassic: "###",
            sharedItems: "---",
            notInRDB: "###",
            notInDataset: "###",
        },
        "totalOfGenes": {
            inDataset: "###",
            inRDBClassic: "###",
            sharedItems: "###",
            notInRDB: "###",
            notInDataset: "###",
        },
        "totalOfTFBS": {
            inDataset: "###",
            inRDBClassic: "###",
            sharedItems: "###",
            notInRDB: "###",
            notInDataset: "###",
        }
    }
}