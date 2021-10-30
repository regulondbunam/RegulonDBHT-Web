import React from 'react'
import { Link } from 'react-router-dom'
import ExternalRef from './externalRef'
import Note from './note'

export default function TfInfo({ data }) {
    const objTest = data?.objectTested
    if (!objTest) {
        return null
    } 
    return (
        <div>
            <p style={{ fontSize: "12px" }}>ID: {objTest?._id}</p>
            <table>
                <thead className="table_content">
                    <tr>
                        <th>
                            <p style={{ fontSize: "22px" }} className="p_accent">{objTest?.name}</p>
                        </th>
                    </tr>
                </thead>
            </table>
            {
                objTest?.synonyms
                    ? <p>Synonyms: {
                        objTest.synonyms.map(s => {
                            return s
                        }).join(", ")
                    }</p>
                    : null
            }
            {
                objTest?.genes
                    ? <p>Genes: {
                        objTest.genes.map((gene,i) => {
                            return <Link key={`${i}_gene_${gene._id}`} to={`#`}>{gene.name}</Link>
                        })
                    }</p>
                    : null
            }
            {
                objTest?.externalCrossReferences
                ?<div>
                    <p>External Cross References</p>
                    <ExternalRef externalRef={objTest?.externalCrossReferences} />
                </div>
                :null
            }
            {
                objTest?.summary
                ?<Note note={objTest?.summary} />
                :null
            }
        </div>
    )
}
