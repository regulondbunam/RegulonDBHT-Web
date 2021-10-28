import React from 'react'
import Title from './Components/ht_title'
import { useParams } from "react-router-dom";
import MainPage from './HT-MainPage/MainPage';
import HtBuilder from './HT-Builder/HtBuilder';

export default function HT() {
    const collection = useParams().collection;
    const query = useParams().query;

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
                !query?<HtBuilder/>:null
            }
        </div>
    )
}
