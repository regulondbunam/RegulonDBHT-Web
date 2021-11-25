import React, { useEffect, useState } from 'react';
import igv from "igv"
import { confGenome } from "./genome/genome"
import { SpinnerCircle } from '../../../../components/ui-components/ui_components';
//

const FILE_SERVER = process.env.REACT_APP_FILE_SERVICE

export function Viewer({ id_dataset, tf }) {
    const [_peaksFile, set_peaksFile] = useState()
    const [_sitesFile, set_sitesFile] = useState()
    const [_tfFile, set_tfFile] = useState()

    useEffect(() => {

        var igvDiv = document.getElementById("igv-divK");
        if (igvDiv && id_dataset) {

            if (_peaksFile) {
                igv.createBrowser(igvDiv, {
                    genome: confGenome(_peaksFile, _sitesFile, _tfFile)
                })
                    .then(function (browser) {
                        //console.log("hola");
                    })
            } else {
                if (!_sitesFile) {
                    let xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = process;
                    xhr.open("GET", `${FILE_SERVER}/download/dataset/chip-seq/sites/bed/${id_dataset}`, true);
                    xhr.send();
                    xhr.onloadend = () => {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200 || xhr.status === 0) {
                                let link = saveStaticDataToFile(xhr.responseText, "sites", id_dataset, "bed");
                                set_sitesFile(link)
                            }
                        }
                    }
                } else {
                    if (!_tfFile) {
                        let xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = process;
                        xhr.open("GET", `${FILE_SERVER}/regulondb_files/tf/bed/${tf}`, true);
                        xhr.send();
                        xhr.onloadend = () => {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200 || xhr.status === 0) {
                                    let link = saveStaticDataToFile(xhr.responseText, "tf", tf, "bed");
                                    set_tfFile(link)
                                }
                            }
                        }
                    } else {
                        let xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = process;
                        xhr.open("GET", `${FILE_SERVER}/download/dataset/chip-seq/peaks/bed/${id_dataset}`, true);
                        xhr.send();
                        xhr.onloadend = () => {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200 || xhr.status === 0) {
                                    let link = saveStaticDataToFile(xhr.responseText, "peaks", id_dataset, "bed");
                                    set_peaksFile(link)
                                }
                            }
                        }
                    }

                }

            }




            /*
                */

        }
    })

    return <div id="igv-divK">
        {
            !_peaksFile
                ? <SpinnerCircle />
                : null
        }
    </div>
}

function saveStaticDataToFile(str, type, name, extension) {
    let blob = new Blob([str],
        { type: "text/plaint;charset=utf-8" },
        `file_${type}_${name}.${extension}`
    );
    return window.URL.createObjectURL(blob);
}
