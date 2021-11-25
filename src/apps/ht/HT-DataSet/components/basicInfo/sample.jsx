import React from 'react'

export default function Sample({ sample }) {
    const controlId = sample?.controlId;
    const experimentId = sample?.experimentId;
    if (!sample) {
        return null
    }
    return (
        <table className="table_auto" >
            <thead>
                <tr>
                    <th colSpan="2" style={{borderBottom: '1px solid #72a7c7'}} >ChIP-Seq Dataset</th>
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
