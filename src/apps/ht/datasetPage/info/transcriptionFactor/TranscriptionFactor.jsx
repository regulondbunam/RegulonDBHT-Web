import React from 'react'
import ExternalRef from './externalRef'
import Note from './note'
export default function TranscriptionFactor({objectsTested}) {
  return (
    <div style={{ marginLeft: "5%" }} id={`dataset_objTested`} >
        {
            objectsTested.map(((obj,i)=>{
                return(
                    <div key={obj.name+i} >
                        <h3>{obj.name}</h3>
                        {
                            obj.genes.length > 0 && <div>
                                <p>
                                Genes:
                                {
                                    obj.genes.map(gene=>{
                                        return  <a key={gene._id} style={{ marginLeft: "5px" }} href={`http://regulondb.ccg.unam.mx/search?term=${gene.name}&organism=ECK12&type=gene`} target="_blank" rel="noreferrer">{gene.name}</a>
                                    })
                                }
                                </p>
                            </div>
                        }
                        <div id={`moreInfo_${obj.name}_${i}`} style={{display: 'none'}}  >
                            {
                                obj.synonyms.length > 0 && <div>
                                    <p>Synonyms:
                                    {
                                        obj.synonyms.join(", ")
                                    }</p>
                                </div>
                            }
                            {
                                obj.externalCrossReferences.length > 0 && <div>
                                    <p>External cross references:</p>
                                    <ExternalRef externalRef={obj.externalCrossReferences} />
                                </div>
                            }
                            {
                                obj?.note && <Note note={obj.note} />
                            }
                        </div>
                        {
                            obj.synonyms.length < 1 && obj.externalCrossReferences.length < 1 && !obj?.note
                            ?null
                            :<button style={{margin: 0}} className="aBase" 
                            onClick={(e)=>{
                                let mybutton = e.target
                                let info = document.getElementById(`moreInfo_${obj.name}_${i}`)
                                if(info){
                                    if(info.style.display === 'none'){
                                        info.style.display = "block"
                                        mybutton.innerHTML = "hide info..."
                                    }else{
                                        info.style.display = 'none'
                                        mybutton.innerHTML = "show info.."
                                    }
                                    
                                }
                            }} >
                                show info...
                            </button>
                        }
                        <hr />
                    </div>
                )
            }))
        }
    </div>
  )
}
