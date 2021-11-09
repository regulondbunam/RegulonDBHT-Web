import React, { useEffect } from 'react';
import igv from "igv"
import {genomaE} from "./genome/genome"
//

export function Viewer() {

    useEffect(() => {
        var options =
        {
            genome: genomaE,
        };
        var igvDiv = document.getElementById("igv-divK");
        if (igvDiv) {
            igv.createBrowser(igvDiv, options)
                .then(function (browser) {
                    //console.log("hola");
                })
            
        }
    })

    return <div id="igv-divK" />
}
