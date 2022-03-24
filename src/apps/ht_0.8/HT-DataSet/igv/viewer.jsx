import React, { useEffect } from 'react';
import igv from "igv"
import { confGenome } from "./genome/genome"
//import { SpinnerCircle } from '../../../../components/ui-components/ui_components';
//const FILE_SERVER = process.env.REACT_APP_FILE_SERVICE

export function Viewer({ id_dataset, tfs, datasetType }) {
    const version = "v3"
    let _peaksFile = undefined;
    let _sitesFile = undefined;
    let _promoter = undefined;
    let _terminator = undefined;
    let _tfFiles = undefined;
    let _tsFile = undefined;
    let _ttFile = undefined;
    let _tuFile = undefined;
    let _geFile = undefined;
    let show = true;
    switch (datasetType) {
        case "TFBINDING":
            _peaksFile = `${process.env.REACT_APP_PROSSES_SERVICE}ht/wdps/${id_dataset}/peaks/gff3`
            _sitesFile = `${process.env.REACT_APP_PROSSES_SERVICE}ht/wdps/${id_dataset}/sites/gff3`
            if(tfs.length>0){
                _tfFiles = []
                tfs.forEach(tf => {
                    _tfFiles.push({
                        "name": tf.name,
                        "url": `/media/raw/ht_collections_web_v3/regulondb/TFFiles/${tf.name}.gff3`
                    })
                });
            }
            break;
        case "TUS":
            _tuFile = `${process.env.REACT_APP_PROSSES_SERVICE}ht/wdps/${id_dataset}/tus/gff3`
            break;
        case "TSS":
            _promoter = `/media/raw/ht_collections_web_${version}/regulondb/PromoterSet.gff3`
            _tsFile = `${process.env.REACT_APP_PROSSES_SERVICE}ht/wdps/${id_dataset}/tss/gff3`
            break;
        case "TTS":
            _terminator = `/media/raw/ht_collections_web_${version}/regulondb/TerminatorSet.gff3`
            _ttFile = `${process.env.REACT_APP_PROSSES_SERVICE}ht/wdps/${id_dataset}/tts/gff3`
            break;
        case "GENE_EXPRESSION":
            _geFile = `/media/raw/ht_collections_web_${version}/GE/${id_dataset}.bedgraph`
            break;
        default:
            show = false;
            break;
    }

    let notTracks = !_peaksFile || !_sitesFile || !_tfFiles || !_tsFile || !_ttFile || !_tuFile || !_geFile

    useEffect(() => {

        var igvDiv = document.getElementById("igv-divK");

        if (igvDiv && id_dataset) {
            igv.createBrowser(igvDiv, {
                genome: confGenome({
                    id_dataset: id_dataset,
                    peaksFile: _peaksFile,
                    sitesFile: _sitesFile,
                    tfFiles: _tfFiles,
                    tsFile: _tsFile,
                    ttFile: _ttFile,
                    tuFile: _tuFile,
                    geFile: _geFile,
                    promoter: _promoter,
                    terminator: _terminator
                })
            })
                .then(function (browser) {
                    //console.log("hola");
                })
        }
    }, [id_dataset, _peaksFile, _sitesFile, _tfFiles, _ttFile, _tsFile, _tuFile, notTracks, _geFile, _promoter, _terminator])

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>GENOME VIEWER</h2>
            <div id="igv-divK">
            </div>
        </div>
    )
}

/*
function saveStaticDataToFile(str, type, name, extension) {
    let blob = new Blob([str],
        { type: "text/plaint;charset=utf-8" },
        `file_${type}_${name}.${extension}`
    );
    return window.URL.createObjectURL(blob);
}
*/

/*
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
                           } else {
                               set_sitesFile("undefined")
                           }
                       }
                   }
               } else {
                   if (!_tfFile) {
                       if (!tf) {
                           //console.log(tf)
                           set_tfFile("undefined")
                       } else {
                           let xhr = new XMLHttpRequest();
                           xhr.onreadystatechange = process;
                           xhr.open("GET", `${FILE_SERVER}/regulondb_files/tf/bed/${tf}`, true);
                           xhr.send();
                           xhr.onloadend = () => {
                               if (xhr.readyState === 4) {
                                   if (xhr.status === 200 || xhr.status === 0) {
                                       let link = saveStaticDataToFile(xhr.responseText, "tf", tf, "bed");
                                       set_tfFile(link)
                                   } else {
                                       set_tfFile("undefined")
                                   }
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
                               } else {
                                   set_peaksFile("undefined")
                               }
                           }
                       }
                   }
               }
           }
           */