import React, { useState } from "react";
import { useLazyQuery } from '@apollo/client';
import { QUERY } from "../Autocomplete/query";


const Autocomplete2 = ({
}) => {

    const [getSuges, { loading, error, data }] = useLazyQuery(QUERY);

    var query = "publication.pmid"

    return (
        <div>
            <h1>Probando</h1>
            <button onClick={() => {
                getSuges({
                    variables : {keyword: "RH[_id]"}
                })
            }}></button>
            {
                probando(data?.getDatasetsFromSearch, query)
            }
        </div>
    )
}

function probando(data, query){
    let location = query.split(".")
    if (Array.isArray(data)) {
        data.forEach(campo => {
            let _campo = campo
            for (let index = 0; index < location.length; index++) {
                //Array.isArray(location)
                const loc = location[index].replaceAll(" ","");
                _campo = _campo[loc]
            }
            _campo.map(m => {
                console.log(m)
            })
        })
    }
}

export default Autocomplete2
