import React from 'react'
import { useTable, usePagination } from 'react-table'
import ReactTooltip from 'react-tooltip';


export function Table({ columns, data, error,
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
            initialState: { pageIndex: 2 },
            defaultColumn
        },
        usePagination
    )

    if (error || !data) {
        return null
    }
    //console.log(data);
    // Render the UI for your table
    return (
        <div style={{ overflow: "auto" }}>
            <h3>{conf.title}</h3>
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
                                    // console.log(cell);
                                    if (cell.column.id === "_gene") {
                                        try {
                                            if (cell.value) {
                                                //console.log(cell.value);
                                                return (
                                                    <td {...cell.getCellProps()}>

                                                        {
                                                            cell.value.map((gene, i) => {
                                                                return (
                                                                    <div key={`genecell_${i}`} style={{ marginLeft: "5px", float:"left" }} >
                                                                        <ReactTooltip id={`Link_${gene._id}`} aria-haspopup='true' >
                                                                            <p style={{color: "white"}} >Gene: {gene.name}</p>
                                                                            <p style={{color: "white"}} >Distance to: {gene.distanceTo}</p>
                                                                            <p style={{color: "white"}} >TranscriptionUnits:</p>
                                                                            <p style={{color: "white"}} >{gene.transcriptionUnits}</p>
                                                                        </ReactTooltip>
                                                                        <a data-tip data-for={`Link_${gene._id}`} href={`http://regulondb.ccg.unam.mx/search?term=${gene.name}&organism=ECK12&type=gene`} target="_blank" rel="noreferrer">{gene.name}</a>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                )
                                            }
                                        } catch (error) {

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

/*
function linkGene(gen) {
    return <a key={gen?._id} style={{ marginLeft: "5px" }} href={`http://regulondb.ccg.unam.mx/search?term=${gen?.name}&organism=ECK12&type=gene`} target="_blank" rel="noreferrer">{gen?.name}</a>
}
*/