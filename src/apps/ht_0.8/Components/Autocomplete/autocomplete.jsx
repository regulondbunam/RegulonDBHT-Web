import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client';
import Style from "./auto.module.css"
/* import { QUERY } from './query'; */


const Autocomplete = ({
    id,
    datasetType,
    query,
    turnOff,
    QUERY_GQL,
    set_keyword = () => { },
}) => {
    const [_keyword, setKeyword] = useState()
    const [getSuges, { loading, error, data }] = useLazyQuery(QUERY_GQL);
    const matchKeywords = filterData(data?.getDatasetsFromSearch, _keyword, query);



    if (error) {
        console.error(error)
    }
    return (
        <div className={Style.input}>
            <div className={Style.inputR}>
                <input
                    autoComplete="off"
                    id={id}
                    type="text"
                    className={Style.TextArea}
                    disabled={turnOff}
                    onChange={(e) => {

                        let keyword = e.target.value;

                        if (query) {
                            document.getElementById(`auto_warn${id}`).style.display = "none"
                            if (keyword.length > 0) {
                                setKeyword(keyword)
                                /* console.log("'" + keyword + "'[" + query + "]" + " AND " + datasetType + "[datasetType]") */
                                getSuges({
                                    variables: {
                                        keyword: "\"" + keyword + "\"[" + query + "]" + " AND " + datasetType + "[datasetType]"
                                    }
                                })
                            } else {
                                setKeyword(undefined)
                            }
                        } else {
                            document.getElementById(`auto_warn${id}`).style.display = "inline"
                        }

                        set_keyword(keyword);
                    }} />
            </div>
            <div className={Style.result} >
                {
                    matchKeywords && <ul>
                        {
                            matchKeywords.map((keyword, i) => {
                                return (
                                    <li key={`${i}_${keyword}`}
                                        onClick={() => {
                                            document.getElementById(id).value = keyword
                                            set_keyword(keyword);
                                            setKeyword(undefined);
                                        }}
                                    >
                                        {keyword}
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
                {
                    loading && <ul>Loading suges...</ul>
                }
                <ul id={`auto_warn${id}`} style={{ display: "none", backgroundColor: "yellow" }} >Please select a location in dorpdown</ul>
            </div>
        </div>
    )
}

function filterData(data, keyword, location) {
    //console.log(data)
    if (!location || !keyword || !data) { return undefined }
    let locations = location.split(".")
    if (Array.isArray(data) && !data.length) {
        return undefined
    }
    if (Array.isArray(locations) && !locations.length) {
        return undefined
    }
    let rx = new RegExp(`${keyword.toLowerCase()}`)
    let keywords = []
    try {
        data.forEach(dataset => {
            let _dataset = dataset
            //console.log(_dataset)
            for (let index = 0; index < locations.length; index++) {
                const loc = locations[index].replaceAll(" ", "");
                _dataset = _dataset[loc]
                console.log(_dataset)
                if (typeof _dataset !== "object" || Array.isArray(_dataset)) {
                    if (Array.isArray(_dataset)) {
                        _dataset.forEach(element => {
                            if (rx.test(element.toLowerCase())) {
                                if (!keywords.find(el => el === element)) {
                                    keywords.push(element)
                                }
                            }
                        });
                    } else {
                        try {
                            let text = _dataset
                            if (rx.test(_dataset.toLowerCase())) {
                                if (!keywords.find(el => el === text)) {
                                    keywords.push(_dataset)
                                }
                            }
                        } catch (error) {
                            console.error(error)
                        }

                    }
                }
            }
        });
    } catch (error) {
        console.error(error)
    }
    return keywords


}

export default Autocomplete
