import React, { useMemo, Component } from 'react';
import ExternalRef from './externalRef'
import Note from './note'
import Style from './summary_OT.module.css'

export default function SummaryObj({
    objectsTested = []
}) {
    const jsonTable = useMemo(() => {
        let jsonT = {
            columns: [
                {
                    Header: 'Name',
                    accessor: '_name'
                },
                {
                    Header: 'Genes',
                    accessor: '_genes'
                },
                {
                    Header: 'More Info',
                    accessor: '_info'
                }

            ],
            data: []
        }

        objectsTested.forEach(obj => {
            if (obj?._id) {
                jsonT.data.push({
                    _id: obj._id,
                    _name: obj.name,
                    _genes: obj.genes,
                    _info: obj
                })
            }

        });
        return jsonT
    }, [objectsTested]);
    return (
        <Table columns={jsonTable.columns} data={jsonTable.data} />
    )
}

class Table extends Component {

    state = {
        _info: {}
    }

    render() {
        const {
            data,
            columns
        } = this.props
        const {
            _info
        } = this.state
        return (
            <table>
                <thead>
                    <tr>
                        {
                            columns.map((c, i) => {
                                return (
                                    <td className={Style.header} key={`tableOT_${c.accessor}_${i}`} >{c.Header}</td>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d, i) => {
                            const objTest = d._info
                            let isInfo = _info[d._id]
                            return (
                                <React.Fragment key={`tbody_tf${i}`}>
                                    <tr>
                                        <td className={Style.cell} >{d?._name}</td>
                                        {linkGenes(d?._genes)}
                                        <td className={isInfo ? Style.cellInfoB : Style.cellInfoA} style={{ cursor: "pointer" }}
                                            onClick={() => {

                                                let n = _info
                                                console.log(n);
                                                if (!isInfo) {
                                                    _info[d._id] = true
                                                } else {
                                                    _info[d._id] = false
                                                }
                                                console.log(n);
                                                this.setState({ _info: n })
                                            }} >
                                                {
                                                    isInfo
                                                    ?<i style={{color: "#FFFFFF"}} className='bx bxs-chevron-up' />
                                                    :<i className='bx bxs-chevron-down' />
                                                }
                                            
                                        </td>
                                    </tr>
                                    {
                                        isInfo &&
                                        <tr>
                                            <td className={Style.rowInfo} colSpan={"3"} >
                                                <div>
                                                    {
                                                        objTest.synonyms.length > 0
                                                            ? <p>Synonyms: {
                                                                objTest.synonyms.map(s => {
                                                                    return s
                                                                }).join(", ")
                                                            }</p>
                                                            : null
                                                    }
                                                    <div style={{overflowX:"auto"}} >
                                                    {
                                                        objTest?.externalCrossReferences
                                                            ? <div>
                                                                <p>External Cross References</p>
                                                                <ExternalRef externalRef={objTest?.externalCrossReferences} />
                                                            </div>
                                                            : null
                                                    }
                                                    </div>
                                                    {
                                                        objTest?.note
                                                            ? <div><p>Summary</p>
                                                                <Note note={objTest?.note} />
                                                            </div>
                                                            : null
                                                    }
                                                    <br />
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}


function linkGenes(genes = []) {
    return (
        <td className={Style.cell} >
            {
                genes.map((gen) => {
                    return <a key={gen._id} style={{ marginLeft: "5px" }} href={`http://regulondb.ccg.unam.mx/search?term=${gen.name}&organism=ECK12&type=gene`} target="_blank" rel="noreferrer">{gen.name}</a>
                })
            }
        </td>
    )
}
