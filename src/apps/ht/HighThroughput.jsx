import React from 'react'
import { useParams } from "react-router-dom";
import Title from './components/Title';
import Main from './mainPage/Main'
import Dataset from './datasetPage/Dataset';
import Finder from './finderPage/Finder'

export default function HT() {
    const datasetType = useParams().datasetType;
    const site = useParams().site;
    const info = useParams().info;

    let Page = <Main />

    if(datasetType){
        switch (site) {
            case "finder":
                Page = <Finder />
                    break;
            case "dataset":
                const query = new URLSearchParams(info);
                Page = <Dataset datasetId={query.get('datasetId')} datasetType={datasetType} experimentType={query.get('experimentType')} />
                    break;
            default:
                Page = <Main />
        }
    }

    return(
        <div>
            <Title />
            {Page}
        </div>
    )
    
}
