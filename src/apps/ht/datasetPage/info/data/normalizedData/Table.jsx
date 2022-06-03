import React from 'react'
import { useTable, usePagination } from 'react-table'
import ReactTooltip from 'react-tooltip';
import { MKSequenceClass } from './mkSequence'


export function Table({ datasetId, dataType, fileFormat, columns, data, error,
    conf = {
        title: "Table",
        search: true,
    }
}) {
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 10,
            width: 70,
            maxWidth: 1000,
        }),
        []
    )
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            defaultColumn
        },
        usePagination
    )

    if (error || !data) {
        return null
    }
    //console.log(data[0]);
    // Render the UI for your table
    return (
        <div style={{ overflow: "auto" }}>
            <Header title={conf.title.toUpperCase()} datasetId={datasetId} dataType={dataType} fileFormat={fileFormat} />
            <table className={"table_content"} {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    //console.log(cell);
                                    if (cell.column.id === "_sequence") {
                                        try {
                                            return (
                                                <td>
                                                    <MKSequenceClass
                                                        id_drawPlace={`${cell.row.id}`}
                                                        sequence={cell.value} />
                                                </td>

                                            )
                                        } catch (error) {
                                            console.error(error);
                                        }
                                    }
                                    if (cell.column.id === "_prom") {
                                        try {
                                            if (cell.value) {
                                                console.log(cell.value);
                                                return (
                                                    <td {...cell.getCellProps()}>

                                                        {
                                                            cell.value.map((prom, i) => {
                                                                return (
                                                                    <div key={`genecell_${i}`} style={{ marginLeft: "5px", float: "left" }} >
                                                                        {prom.name}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                )
                                            }
                                        } catch (error) {
                                            console.log(error);
                                        }
                                        return <td></td>
                                    }
                                    if (cell.column.id === "_gene") {
                                        try {
                                            if (cell.value) {
                                                //console.log(cell.value);
                                                return (
                                                    <td {...cell.getCellProps()}>

                                                        {
                                                            cell.value.map((gene, i) => {
                                                                return (
                                                                    <div key={`genecell_${i}`} style={{ marginLeft: "5px", float: "left" }} >
                                                                        {dataType !== "tus"
                                                                            && <ReactTooltip id={`Link_${gene._id}`} aria-haspopup='true' >
                                                                                <p style={{ color: "white" }} >Gene: {gene.name}</p>
                                                                                {
                                                                                    gene?.bnumber && <div>
                                                                                        <p style={{ color: "white" }} >Bnumber: {gene.bnumber}</p>
                                                                                    </div>
                                                                                }
                                                                                {
                                                                                    gene?.distanceTo && <div>

                                                                                        <p style={{ color: "white" }} >Distance to: {gene.distanceTo}</p>
                                                                                    </div>
                                                                                }
                                                                                {
                                                                                    gene?.transcriptionUnits && <div>
                                                                                        <p style={{ color: "white" }} >TranscriptionUnits:</p>
                                                                                        <p style={{ color: "white" }} >{gene.transcriptionUnits}</p>
                                                                                    </div>
                                                                                }

                                                                            </ReactTooltip>
                                                                        }

                                                                        <a data-tip data-for={`Link_${gene._id}`} href={`http://regulondb.ccg.unam.mx/search?term=${gene.name}&organism=ECK12&type=gene`} target="_blank" rel="noreferrer">{gene.name}</a>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                )
                                            }
                                        } catch (error) {
                                            console.log(error);
                                        }
                                        return <td></td>
                                    }
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        value={pageIndex + 1}
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export function Header({
    title,
    datasetId,
    dataType,
    fileFormat
}) {
    return (
        <div style={{ display: "grid", height: "30px", gridTemplateColumns: "auto 150px", gridColumnGap: "10px" }}  >
            <h4 style={{ paddingLeft: "10px" }} >{title}</h4>
            <div className="dropdown">
                <button style={{ padding: "4px", width: "150px" }} >Download Options</button>
                <div className="dropdown-content">
                    <div>
                        <a style={{ textAlign: "center", fontSize: "14px", color: "black" }} target="_blank" rel="noreferrer" href={`${process.env.REACT_APP_PROSSES_SERVICE}/${datasetId}/${dataType}/jsonGQL`}>JSON GQL</a>
                    </div>
                    <div>
                        <a style={{ textAlign: "center", fontSize: "14px", color: "black" }} target="_blank" rel="noreferrer" href={`${process.env.REACT_APP_PROSSES_SERVICE}/${datasetId}/${dataType}/jsonTable`}>JSON TABLE</a>
                    </div>
                    <div>
                        <a style={{ textAlign: "center", fontSize: "14px", color: "black" }} target="_blank" rel="noreferrer" href={`${process.env.REACT_APP_PROSSES_SERVICE}/${datasetId}/${dataType}/${fileFormat}`}>{fileFormat} file</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

/*
 <a style={{textAlign: "center",fontSize: "14px"}} href={`${process.env.REACT_APP_PROSSES_SERVICE}/${id_dataset}/authorData/cvs`}>Download File</a>
*/