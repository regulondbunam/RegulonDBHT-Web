import React from 'react'

export default function Sample({sample}) {
    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <p style={{ fontSize: "12px"}} className="p_accent">Control ID:</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p style={{ fontSize: "12px"}} className="p_accent">Experiment ID:</p>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
