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
                        objTest.genes.map((gen,i) => {
                            return <a key={gen._id} style={{marginLeft: "5px" }} href={`http://regulondb.ccg.unam.mx/search?term=${gen.name}&organism=ECK12&type=All`} target="_blank" rel="noreferrer">{gen.name}</a>          
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
                objTest?.note
                ?<div><p>Summary</p>
                    <Note note={objTest?.note} />
                </div>
                :null
            }
        </div>
    )
}
