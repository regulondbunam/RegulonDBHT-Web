import React from 'react'
import Title from './Components/ht_title'
import { useParams } from "react-router-dom";
import MainPage from './HT-MainPage/MainPage';
import HtBuilder from './HT-Builder/HtBuilder';
import ResultPage from './HT-ResultsPage/resultPage';
import DataSet from './HT-DataSet/dataSet';

export default function HT() {
    const collection = useParams().collection;
    const query = useParams().query;
    const id_dataset = useParams().id_dataset;

    if(id_dataset){
        return(
            <div>
                <Title />
                <DataSet id_dataset={id_dataset} />
            </div>
        )
    }

    return (
        <div>
            <Title />
            {
                !collection?<MainPage />:setCollection(collection,query)
            }
        </div>
    )
}

function setCollection(collection,query) {
    return (
        <div>
            {
                !query?<HtBuilder/>:<ResultPage query={query}/>
            }
        </div>
    )
}
