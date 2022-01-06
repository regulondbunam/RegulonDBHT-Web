import React from 'react'
import Title from './Components/ht_title'
import { useParams } from "react-router-dom";
import MainPage from './HT-MainPage/MainPage';
import HtBuilder from './HT-Builder/HtBuilder';
import ResultPage from './HT-ResultsPage/resultPage';
import DataSet from './HT-DataSet/dataSet';

export default function HT() {
    const datasetType = useParams().datasetType;
    const site = useParams().site;
    const info = useParams().info;

    if(!datasetType){
        return(
            <div>
                <Title />
                <MainPage />
            </div>
        )
    }

    if(site !== "query"){
        return(
            <div>
                <Title />
                <DataSet id_dataset={info} datasetType={datasetType} />
            </div>
        )
    }

    return (
        <div>
            <Title />
            {
                !info
                ?<HtBuilder datasetType={datasetType}/>
                :<ResultPage datasetType={datasetType} query={info}/>
            }
        </div>
    )
}
