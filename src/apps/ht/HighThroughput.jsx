import React from 'react'
import { useParams } from "react-router-dom";
import Title from './components/Title';
import Main from './mainPage/Main'
import Dataset from './datasetPage/Dataset';
import Finder from './finderPage/Finder'

window.IN_URL = {
    main: "/ht",
    finder: "/ht/finder/",
    dataset: "/ht/"
}

export default function HT() {
    const site = useParams().site;
    const info = useParams().info;

    //console.log(site, info);

    

    let Page = <Main />
    if (site) {
        if (site === "finder" ) {
            if (info) {
                Page = <Finder datasetType={info.toLocaleUpperCase()} />
            }
            
        } else {
            const query = new URLSearchParams(info);
            Page = <Dataset datasetType={site.toLocaleUpperCase()} tfName={query.get('tf')} datasetId={query.get('datasetId')} experimentType={query.get('experimentType')} />
        }
    }

    return (
        <div>
            <Title />
            {Page}
        </div>
    )

}
