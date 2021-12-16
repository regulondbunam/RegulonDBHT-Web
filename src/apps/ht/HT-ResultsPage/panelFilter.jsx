import React, { Component } from 'react'
import Style from "./filter.module.css"
import Authors from './filters/authors'
import EStrategy from './filters/eStrategy'
import GConditions from './filters/gConditions'
import TFS from './filters/tf'


export default class Filter extends Component {

    state = {
        filterData: {
            ids: [],
            authors: [],
            eStrategy: [],
            gConditions: [],
            tfs: []
        },
        isClean: true,
        selectDatasets: [],
        view_IDs: false,
        view_Authors: false,
        view_Estrategy: false,
        view_gConditions: false,
        view_tfs: false
    }

    cleanSelectDataset = (selectDatasets) => {
        let newS = []
        for (let dt of selectDatasets) {
            if (!newS.find(e => e === dt)) {
                newS.push(dt)
            }
        }
        return newS
    }

    componentDidUpdate(prevState) {
        const N_RESULTS = document.getElementById("n_result")
        //console.log(PANEL)
        if (N_RESULTS && this.state.selectDatasets.length !== 0) {
            let newS = this.cleanSelectDataset(this.state.selectDatasets)
            N_RESULTS.innerHTML = `${newS.length} Results`
            for (let dt of this.props.data) {
                let id = dt._id;
                let dtstR = document.getElementById(`dataset_result_${id}`)
                if (dtstR) {
                    if (this.state.selectDatasets.find(e => e === id)) {
                        dtstR.style.display = "block"
                    } else {
                        dtstR.style.display = "none"
                    }
                }

            }
            if (this.state.isClean) {
                this.setState({ isClean: false })
            }
        }
        console.log(this.state.selectDatasets)
        if (this.state.selectDatasets.length === 0 && !this.state.isClean) {
            this._cleanFilter()
        }
    }

    _cleanFilter = () => {
        const N_RESULTS = document.getElementById("n_result")
        if (N_RESULTS) {
            N_RESULTS.innerHTML = `${this.props.data.length} Results`
            for (let dt of this.props.data) {
                let id = dt._id;
                let dtstR = document.getElementById(`dataset_result_${id}`)
                if (dtstR) {
                    dtstR.style.display = "block"
                }

            }
        }
        this.setState({
            filterData: {
                ids: [],
                authors: [],
                eStrategy: [],
                gConditions: [],
                tfs: []
            },
            selectDatasets: [],
            isClean: true
        })
    }

    render() {
        const { data, datasetType } = this.props
        const { selectDatasets, view_IDs, view_tfs, filterData, view_Authors, view_Estrategy, view_gConditions } = this.state
        //const fields = Object.keys(data[0])
        console.log(data[0]);
        let f_id = true
        let f_tfs = true
        let f_a = true
        let f_eS = true
        let f_gC = true
        switch (datasetType) {
            case "GENE_EXPRESSION":
                f_eS = false
                f_gC = false
                f_tfs = false
                break;

            default:
                break;
        }

        return (
            <div>
                <p className="p_accent"> Filters </p>
                <button onClick={this._cleanFilter} >Clean Filter  <i className='bx bx-trash'></i></button>
                <br />
                <br />
                {
                    f_id && <><ButtonFilter view={view_IDs} label="Dataset IDs  " fun={(view) => { this.setState({ view_IDs: view }) }} />
                        {
                            view_IDs && <Ids data={data} selectDatasets={selectDatasets} set_selectedDataset={(setDataset) => { this.setState({ selectDatasets: setDataset }) }} filterData={filterData} set_filterData={(filterData) => { this.setState({ filterData: filterData }) }} />
                        }</>
                }
                {
                    f_a && <>
                        <ButtonFilter view={view_Authors} label="Authors  " fun={(view) => { this.setState({ view_Authors: view }) }} />
                        {
                            view_Authors && <Authors data={data} selectDatasets={selectDatasets} set_selectedDataset={(setDataset) => { this.setState({ selectDatasets: setDataset }) }} filterData={filterData} set_filterData={(filterData) => { this.setState({ filterData: filterData }) }} />
                        }
                    </>
                }
                {
                    f_eS && <>
                        <ButtonFilter view={view_Estrategy} label="Experiment Strategy" fun={(view) => { this.setState({ view_Estrategy: view }) }} />
                        {
                            view_Estrategy && <EStrategy data={data} selectDatasets={selectDatasets} set_selectedDataset={(setDataset) => { this.setState({ selectDatasets: setDataset }) }} filterData={filterData} set_filterData={(filterData) => { this.setState({ filterData: filterData }) }} />
                        }
                    </>
                }
                {
                    f_gC && <>
                        <ButtonFilter view={view_gConditions} label="Growth Conditions" fun={(view) => { this.setState({ view_gConditions: view }) }} />
                        {
                            view_gConditions && <GConditions data={data} selectDatasets={selectDatasets} set_selectedDataset={(setDataset) => { this.setState({ selectDatasets: setDataset }) }} filterData={filterData} set_filterData={(filterData) => { this.setState({ filterData: filterData }) }} />
                        }
                    </>
                }
                {
                    f_tfs && <>
                        <ButtonFilter view={view_tfs} label="Transcription Factor" fun={(view) => { this.setState({ view_tfs: view }) }} />
                        {
                            view_tfs && <TFS data={data} selectDatasets={selectDatasets} set_selectedDataset={(setDataset) => { this.setState({ selectDatasets: setDataset }) }} filterData={filterData} set_filterData={(filterData) => { this.setState({ filterData: filterData }) }} />
                        }
                    </>
                }
            </div>
        )
    }
}

function ButtonFilter({ label, view, fun }) {
    return (
        <button className={Style.buttonFilter}
            onClick={() => {
                fun(!view)
            }}
        >
            {label}
            {
                !view
                    ? <i className='bx bxs-down-arrow'></i>
                    : <i className='bx bxs-up-arrow' ></i>
            }
        </button>
    )
}

function Ids({ data, filterData, set_filterData, selectDatasets, set_selectedDataset }) {
    //let selected = selectDatasets
    let ids = filterData.ids
    return (
        <div className={Style.filedContent} >
            <table className="table_content">
                <thead>
                    {
                        data.map((dataset, i) => {
                            return (
                                <tr key={`ids_filter_${i}_${dataset?._id}`}>
                                    <th>
                                        <input type="checkbox" name={`CB_${dataset?._id}`} id={`CB_${dataset?._id}`}
                                            value={dataset?._id}
                                            checked={ids.find(element => element === dataset?._id) ? true : false}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    ids.push(dataset?._id);
                                                    selectDatasets.push(dataset?._id)
                                                } else {
                                                    let inx = selectDatasets.indexOf(dataset?._id);
                                                    if (inx > -1) {
                                                        selectDatasets.splice(inx, 1);
                                                    }
                                                    inx = ids.indexOf(dataset?._id);
                                                    if (inx > -1) {
                                                        ids.splice(inx, 1);
                                                    }
                                                }
                                                filterData.ids = ids
                                                set_selectedDataset(selectDatasets)
                                                set_filterData(filterData)
                                            }}
                                        />
                                        {
                                            dataset?._id
                                        }
                                    </th>
                                </tr>
                            )
                        })
                    }
                </thead>
            </table>
        </div>
    )
}