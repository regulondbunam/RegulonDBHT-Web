import React, { useEffect } from 'react'
import { SVG } from "@svgdotjs/svg.js";

export class MKSequenceClass extends React.Component {

    state = {
        id_drawPlace: `di_seq_${this.props.id_drawPlace}`,
        id_canvas: `cav_${this.props.id_drawPlace}`
    }

    componentDidMount() {
        const drawPlace = document.getElementById(this.state.id_drawPlace)
        let canvas = document.getElementById(this.state.id_canvas);
        if (drawPlace && canvas === null) {
            const width = drawPlace.clientWidth;
            canvas = SVG().addTo(`#${this.state.id_drawPlace}`).size(width, 30).id(this.state.id_canvas);
            let px = 0
            // eslint-disable-next-line no-unused-vars
            const seq = [].map.call(this.props.sequence, function (x) {
                canvas.rect(10, 16).fill(sequenceColor[x]).move(px, 0)
                canvas.text(x)
                .fill("#FFFFFF")
                .font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px, 0)
                px += 10
            });
        }
    }

    render() {
        const { sequence } = this.props;
        if (sequence !== null) {
            const width = sequence.length * 10
            return (
    
                <div
                    id={this.state.id_drawPlace}
                    style={{
                        height: "20px",
                        width: width,
                        left: "0",
                        overflowY: "hidden",
                        overflowX: "auto"
                    }}
                >
                </div>
            );
        }
        return (
            <div></div>
        )
    }
}


export function MarkSequence(id,sequence) {
    //di_seq_cav-RDBECOLIBSC03351
    const id_drawPlace = `di_seq_${id}`
    //console.log(`id_drawPlace`, id_drawPlace)
    const id_canvas = `cav_${id}`
    useEffect(() => {
        const drawPlace = document.getElementById(id_drawPlace)
        let canvas = document.getElementById(id_canvas);
        if (drawPlace && canvas === null) {
            const width = drawPlace.clientWidth;
            canvas = SVG().addTo(`#${id_drawPlace}`).size(width, 30).id(id_canvas);
            let px = 0
            // eslint-disable-next-line
            const seq = [].map.call(sequence, function (x) {
                canvas.rect(10, 16).fill(sequenceColor[x]).move(px, 0)
                canvas.text(x)
                    .font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px, 0)
                px += 10
            });
        }
    })
    if (sequence !== null) {
        const width = sequence.length * 10
        return (

            <div
                id={id_drawPlace}
                style={{
                    height: "20px",
                    width: width,
                    left: "0",
                    overflowY: "hidden",
                    overflowX: "auto"
                }}
            >
            </div>
        );
    }
    return (
        <div></div>
    )

}

/**
 * sequenceInfo: {
                            sequence: rs?.sequence,
                            posL: rs?.leftEndPosition,
                            posR: rs?.rightEndPosition
                        },
 */

export function MarkSequenceWithPositions({id,sequenceInfo}) {
    const sequence = sequenceInfo?.sequence, posL = `${sequenceInfo?.posL}`, posR = `${sequenceInfo?.posR}`
    const id_drawPlace = `di_seq_${id}`
    const id_canvas = `cav-${id}`
    useEffect(() => {
        const drawPlace = document.getElementById(id_drawPlace)
        let canvas = document.getElementById(id_canvas);
        if (drawPlace && canvas === null) {
            const width = drawPlace.clientWidth;
            canvas = SVG().addTo(`#${id_drawPlace}`).size(width, 80).id(id_canvas);
            let px = 0
            let isLine = false
            // eslint-disable-next-line
            const seq = [].map.call(sequence, function (x) {
                try {
                    canvas.line(px,0,px,80).stroke({ color: '#dbdbdb', width: 1, linecap: 'round' })
                if(sequenceCase[x] && !isLine){
                    // is upercase
                    isLine = true
                    canvas.line(px,16,px,64).stroke({ color: '#00F', width: 1, linecap: 'round' })
                    canvas.text(`${posL}`).font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px-(10*(posL.length/2)), 64)
                }
                if(isLine){
                    if(sequenceCase[x]){
                        canvas.line(px,16,px+10,16).stroke({ color: '#000', width: 1, linecap: 'round' })
                    }else{
                        isLine = false
                        canvas.line(px,16,px,64).stroke({ color: '#00F', width: 1, linecap: 'round' })
                        canvas.text(`${posR}`).font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px-(10*(posL.length/2)), 64)
                    }
                }
                canvas.rect(10, 16).fill(sequenceColor[x]).move(px, 32)
                canvas.text(x).font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px, 32)
                px += 10
                } catch (error) {
                    console.error("Error al dibujar secuencia",error)
                }
            });
        }
    })
    if (sequence !== null) {
        return (

            <div
            id={id_drawPlace}
                style={{
                    height: "80px",
                    width: "100%",
                    left: "0",
                    overflowY: "hidden",
                    overflowX: "auto"
                }}
            >
            </div>
        );
    }
    return (
        <div></div>
    )

}

const sequenceCase = {
    A: true,
    C: true,
    T: true,
    G: true,
    a: false,
    c: false,
    t: false,
    g: false,
}


const sequenceColor = {
    A: "#00C800", //green
    C: "#0001C8", //blue
    T: "#FF0000", // red
    G: "#D17104", // gold
    a: "#8BF0A3",
    c: "#BEC4EB",
    t: "#EBD89B",
    g: "#EB8F97",
}