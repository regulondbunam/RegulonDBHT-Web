import React, { useEffect, useState } from 'react'
import { SpinnerCircle } from '../../../components/ui-components/ui_components'
import GetPeaks from '../webServices/peaks/peaks_dataset'

export default function Peaks({ id_dataset }) {
    const [_data, set_data] = useState()
    const [_state, set_state] = useState()

    //console.log(_data)
    return (
        <div >
            {
                _state !== "done"
                    ? <GetPeaks id_dataset={id_dataset}
                        resoultsData={(data) => { set_data(data); }}
                        status={(state) => { set_state(state) }}
                    />
                    : null
            }
            {
                _state === "loading"
                    ? <SpinnerCircle />
                    : null
            }
            {
                !_data
                    ? null
                    : <table className="table_content" >
                        <HeadPeaks Peaks={_data[0]} />
                        <DisplayPeaks data={_data} />
                    </table>
            }
        </div>
    )
}

function HeadPeaks({ Peaks }) {

    return (
        <thead>
            <tr>
                <th style={{textAlign: 'end'}} colSpan="7">
                   { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#">download complete file</a>
                </th>
            </tr>
            <tr>
                <th>NAME</th>
                <th>START</th>
                <th>END</th>
                <th>SCORE</th>
                <th>Closest Genes</th>
            </tr>
        </thead>
    )
}

function DisplayPeaks({data = []}) {
    const [_page, set_page] = useState(0)
    const [items, setItems] = useState(10)
    const _totalP = parseInt(data.length/10,10)
    const [_items, set_items] = useState([])
    useEffect(() => {
        let itemSelection = []
        for(let i = 0; i < items; i++) {
            let sec = (_page * 10 + i)
            if (sec < data.length) {
                itemSelection.push(data[sec])
            }
            
        }
        if(_items.length === 0){
            set_items(itemSelection)
        }
        let inputNumber = document.getElementById("input_current_page_Peaks01")
        if(inputNumber){
            inputNumber.value = _page
        }
        let inputNumberA = document.getElementById("input_current_page_Peaks02")
        if(inputNumberA){
            inputNumberA.value = _page
        }
        
    },[data,_items,items,_page])
    return (
        <tbody>
            <tr>
                <td colSpan="7">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label>
                                        Show in list:
                                        <select value={items} onChange={(e) => {
                                            set_items([])
                                            setItems(parseInt(e.target.value))
                                            
                                        }}>
                                            <option value="10">10</option>
                                            <option value="50">50</option>
                                            <option value={data.length}>ALL ({data.length})</option>
                                        </select>
                                    </label>
                                </td>
                                {
                                    data.length === items
                                        ? null
                                        : <td>
                                            <label htmlFor="input_current_page_tfbs02">
                                                Current Page:
                                            </label>
                                            <input type="number"
                                                id="input_current_page_tfbs02"
                                                min="1"
                                                max={_totalP}
                                                name="currentPage"
                                                onChange={(e) => {
                                                    set_items([]); set_page(e.target.value);
                                                }}
                                            />
                                        </td>
                                }
                                {
                                    data.length === items
                                        ? null
                                        : <td>
                                            <button className="aBase"
                                                onClick={() => { set_items([]); set_page(1) }}
                                            >First page</button>
                                        </td>
                                }
                                {
                                    data.length === items
                                        ? null
                                        : <td>
                                            <button className="aBase"
                                                onClick={() => { set_items([]); set_page(_totalP); }}
                                            >Last page</button>
                                        </td>
                                }
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            {
                _items.map(item=>{
                    const cloGenes = item?.closestGenes
                    let genes = ""
                    if(cloGenes){
                        genes = cloGenes.map(gene=>{
                            return gene?.name
                        }).join(", ")
                    }
                    return <tr style={{height: "25px"}} key={`Peaks_${item?._id}`}>
                        <td>
                            {item?.name
                                ?item?.name
                                :null
                            }
                        </td>
                        <td>
                            {item?.peakLeftPosition
                                ?item?.peakLeftPosition
                                :null
                            }
                        </td>
                        <td>
                            {item?.peakRightPosition
                                ?item?.peakRightPosition
                                :null
                            }
                        </td>
                        <td>
                            {item?.score
                                ?item?.score
                                :null
                            }
                        </td>
                        <td>
                            {item?.closestGenes
                                ?genes
                                :null
                            }
                        </td>
                    </tr>
                })
            }
            <tr>
                <td colSpan="7">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label>
                                        Show in list:
                                        <select value={items} onChange={(e) => {
                                            set_items([])
                                            setItems(parseInt(e.target.value))
                                        }}>
                                            <option value="10">10</option>
                                            <option value="50">50</option>
                                            <option value={data.length}>ALL ({data.length})</option>
                                        </select>
                                    </label>
                                </td>
                                {
                                    data.length === items
                                        ? null
                                        : <td>
                                            <label htmlFor="input_current_page_tfbs01">
                                                Current Page:
                                            </label>
                                            <input type="number"
                                                id="input_current_page_tfbs01"
                                                min="1"
                                                max={_totalP}
                                                name="currentPage"
                                                onChange={(e) => {
                                                    set_items([]); set_page(e.target.value);
                                                }}
                                            />
                                        </td>
                                }
                                {
                                    data.length === items
                                        ? null
                                        : <td>
                                            <button className="aBase"
                                                onClick={() => { set_items([]); set_page(1) }}
                                            >First page</button>
                                        </td>
                                }
                                {
                                    data.length === items
                                        ? null
                                        : <td>
                                            <button className="aBase"
                                                onClick={() => { set_items([]); set_page(_totalP); }}
                                            >Last page</button>
                                        </td>
                                }
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    )
}
