import React from 'react'
import ExternalRef from './externalRef'
import Note from './note'

export default function TfInfo({ objTest }) {
    let synonyms = objTest?.synonyms
    let genes = objTest?.genes
    let externalCrossReferences = objTest?.externalCrossReferences
    if(Array.isArray(synonyms) && !synonyms.length){
        synonyms = undefined
    }
    if(Array.isArray(genes) && !genes.length){
        genes = undefined
    }
    if(Array.isArray(externalCrossReferences) && !externalCrossReferences.length){
        externalCrossReferences = undefined
    }
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
                synonyms
                    ? <p>Synonyms: {
                        objTest.synonyms.map(s => {
                            return s
                        }).join(", ")
                    }</p>
                    : null
            }
            {
                genes
                    ? <p>Genes: {
                        objTest.genes.map((gen,i) => {
                            return <a key={gen._id} style={{marginLeft: "5px" }} href={`http://regulondb.ccg.unam.mx/search?term=${gen.name}&organism=ECK12&type=All`} target="_blank" rel="noreferrer">{gen.name}</a>          
                        })
                    }</p>
                    : null
            }
            {
                externalCrossReferences
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
