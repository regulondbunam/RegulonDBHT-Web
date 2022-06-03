import React, { useEffect } from 'react';
import igv from "igv"
import { confGenome } from "./genome/genome"
//import { SpinnerCircle } from '../../../../components/ui-components/ui_components';
//const FILE_SERVER = process.env.REACT_APP_FILE_SERVICE

export function Viewer({ id_dataset, tfs, datasetType }) {
    let _peaksFile = undefined;
    let _sitesFile = undefined;
    let _promoter = undefined;
    let _terminator = undefined;
    let _tfFiles = undefined;
    let _tsFile = undefined;
    let _ttFile = undefined;
    let _tuFile = undefined;
    let _tuSet = undefined;
    let _geFile = undefined;
    let show = true;
    switch (datasetType) {
        case "TFBINDING":
            _peaksFile = `${process.env.REACT_APP_PROSSES_SERVICE}/${id_dataset}/peaks/gff3`
            _sitesFile = `${process.env.REACT_APP_PROSSES_SERVICE}/${id_dataset}/sites/gff3`
            if(tfs.length>0){
                _tfFiles = []
                tfs.forEach(tf => {
                    _tfFiles.push({
                        "name": tf.name,
                        "url": `/media/raw/gff3/TFFiles/${tf.name}.gff3`
                    })
                });
            }
            break;
        case "TUS":
            _tuFile = `${process.env.REACT_APP_PROSSES_SERVICE}/${id_dataset}/tus/gff3`
            _tuSet = `/media/raw/gff3/TUSet.gff3`
            break;
        case "TSS":
            _promoter = `/media/raw/gff3/PromoterSet.gff3`
            _tsFile = `${process.env.REACT_APP_PROSSES_SERVICE}/${id_dataset}/tss/gff3`
            break;
        case "TTS":
            _terminator = `/media/raw/gff3/TerminatorSet.gff3`
            _ttFile = `${process.env.REACT_APP_PROSSES_SERVICE}/${id_dataset}/tts/gff3`
            break;
        case "GENE_EXPRESSION":
            _geFile = `${process.env.REACT_APP_PROSSES_SERVICE}/${id_dataset}/ge/bedgraph`
            break;
        default:
            show = false;
            break;
    }

    let notTracks = !_peaksFile || !_sitesFile || !_tfFiles || !_tsFile || !_ttFile || !_tuFile || !_geFile

    useEffect(() => {

        let igvDiv = document.getElementById("igv-divK");

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
                    terminator: _terminator,
                    tuSet: _tuSet
                })
            })
                .then(function (browser) {
                    //console.log("hola");
                })
        }
    }, [id_dataset, _peaksFile, _sitesFile, _tfFiles, _tuSet,_ttFile, _tsFile, _tuFile, notTracks, _geFile, _promoter, _terminator])

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
