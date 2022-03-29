import React, {useState} from 'react'
import GetRelatedDataset from '../../../webServices/dataset/dataset_related'
import { SpinnerCircle } from '../../../../../components/ui-components/ui_components'
import { Link } from 'react-router-dom'
import Style from './related.module.css'

//const relatedOptions = ["datasetType","objectsTested","publications"]

export default function Related({
    objectTested
}) {
    const [_datasets, set_datasets] = useState()
    const [_state, set_state] = useState()

    if (_state === "error") {
        return <div></div>
    }
    if (!_datasets) {
        return(
            <div>
                <GetRelatedDataset ht_query='Fur[objectsTested.name]' resoultsData={(datasets)=>{set_datasets(datasets)}} status={(state)=>{set_state(state)}} />
                <SpinnerCircle />
            </div>
        )
    }else{
        return (
            <div>
                <h2>RELATED DATASET</h2>
                <p>Related by TF</p>
                <div style={{marginLeft: "3%"}}>
                    {
                        _datasets.map((dataset, idx )=>{
                            let title = dataset.sample.title
                            if(!title ||  title === "obtener de GEO"){
                                if(dataset?.publications){
                                    title = dataset.publications.map(pub=>{
                                        return pub.title;
                                    }).join(", ")
                                }
                                if(!title){
                                    title = dataset?._id
                                }
                            }
                            return(
                               <div className={Style.relatedCard} >
                                    <Link to={`/ht/dataset/TFBINDING/datasetId=${dataset._id}/`}>{title}</Link>
                               </div>
                            )
                        })
                    }
                </div>
            </div>
          )
    }
  
}
