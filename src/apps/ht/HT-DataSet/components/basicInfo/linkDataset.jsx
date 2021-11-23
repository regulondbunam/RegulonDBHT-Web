import React from 'react'

export default function LinkedDataset({ linkedDataset }) {
    const controlId = linkedDataset?.controlId;
    const experimentId = linkedDataset?.experimentId;
    if(!linkedDataset){
        return null
    }
    return (
        <table className="table_auto" style={{borderLeft: '1px solid #72a7c7'}} >
            <thead>
                <tr>
                    <th colSpan="2" style={{borderBottom: '1px solid #72a7c7'}} >Related Gene Expression Dataset</th>
                </tr>
            </thead>
            <tbody>
                {
                    controlId
                        ? <tr>
                            <td>
                                <p style={{ fontSize: "12px" }} className="p_accent">Control ID:</p>
                            </td>
                            <td>
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
                    experimentId
                        ? <tr>
                            <td>
                                <p style={{ fontSize: "12px" }} className="p_accent">Experiment ID:</p>
                            </td>
                            <td>
                                {
                                    experimentId.map((link, i) => {
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
    )
}