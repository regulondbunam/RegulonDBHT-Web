import React, { useEffect } from 'react';
import igv from "igv"
import {genoma} from "./genome/genome"
//

export default function IGVtest() {

    useEffect(() => {
        var options =
        {
            genome: genoma,
        };
        var igvDiv = document.getElementById("igv-div");
        if (igvDiv) {
            igv.createBrowser(igvDiv, options)
                .then(function (browser) {
                    console.log("Created IGV browser");
                })
            
        }
    })

    return <div id="igv-div" />
}
