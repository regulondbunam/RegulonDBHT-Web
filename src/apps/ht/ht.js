import React from 'react'
import Title from './Components/ht_title'
import { useParams } from "react-router-dom";
import MainPage from './HT-MainPage/MainPage';

export default function HT() {
    const collection = useParams().collection;
    return (
        <div>
            <Title />
            {
                !collection?<MainPage />:setCollection(collection)
            }
        </div>
    )
}

function setCollection(collection) {
    return (
        <div>
            {collection}
        </div>
    )
}
