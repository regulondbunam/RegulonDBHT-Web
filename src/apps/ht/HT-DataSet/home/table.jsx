import React, { useMemo } from 'react'
import GlobalFilter from './tableComponents/GlobalFilter'
import { useTable, useBlockLayout, useGlobalFilter, useResizeColumns } from 'react-table'
import { FixedSizeList } from 'react-window'
import scrollbarWidth from './scrollbarWidth'
import { Link } from 'react-router-dom'
import { TableStyles } from "./styledComponents"

function Table({ columns, datasetType, data }) {
    // Use the state and functions returned from useTable to build your UI
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 100,
            width: 150,
            maxWidth: 400,
        }),
        []
    )
    const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        totalColumnsWidth,
        state,
        preGlobalFilteredRows,
        prepareRow,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useBlockLayout,
        useGlobalFilter,
        useResizeColumns
    )

    const RenderRow = React.useCallback(
        ({ index, style }) => {
            const row = rows[index]
            prepareRow(row)
            //console.log(row)
            return (
                <Link to={`/${datasetType}/dataset/${row.cells[0].value}`} >
                    <div
                        {...row.getRowProps({
                            style,
                        })}
                        className="tr"
                    >
                        {row.cells.map(cell => {
                            return (
                                <div {...cell.getCellProps()} className="td">
                                    {cell.render('Cell')}
                                </div>
                            )
                        })}
                    </div>
                </Link>
            )
        },
        [prepareRow, rows, datasetType]
    )

    // Render the UI for your table
    return (
        <div>
            <div >
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </div>
            <TableStyles>
                <div {...getTableProps()} className="table">
                    <div>
                        {headerGroups.map(headerGroup => (
                            <div {...headerGroup.getHeaderGroupProps()} className="tr">
                                {headerGroup.headers.map(column => (
                                    <div {...column.getHeaderProps()} className="th">
                                        {column.render('Header')}
                                        <div
                                            {...column.getResizerProps()}
                                            className={`resizer ${column.isResizing ? 'isResizing' : ''
                                                }`}
                                        />
                                    </div>

                                ))}
                            </div>
                        ))}
                    </div>

                    <div {...getTableBodyProps()}>
                        <FixedSizeList
                            height={500}
                            itemCount={rows.length}
                            itemSize={40}
                            width={totalColumnsWidth + scrollBarSize}
                        >
                            {RenderRow}
                        </FixedSizeList>
                    </div>
                </div>
            </TableStyles>
        </div>

    )
}

export function DatasetTable({ datasets, datasetType }) {
    let tableFormat = useMemo(() => {
        let columns
        let data = []
        columns = [
            {
                Header: "ID",
                accessor: "_id"
            },
            {
                Header: "Sample Title | TF ",
                accessor: "_title"
            },
            {
                Header: "Strategy",
                accessor: "_strategy"
            }
        ]
        try {
            datasets.forEach(dataset => {
                let title = dataset?.sample?.title
                if (!title) {
                    title = []
                    dataset.objectsTested.forEach(obj => {
                        if(obj?.name){
                            title.push(obj.name+" ")
                        }
                    });
                    if (title.length === 0) {
                        dataset.publications.forEach(obj => {
                            if(obj?.title){
                                title.push(obj.title+" ")
                            }
                        });
                        if (title.length<1) {
                            title = dataset?._id
                        }
                    }
                }
                data.push({
                    _id: dataset?._id,
                    _title: title,
                    _strategy: dataset?.sourceSerie?.strategy
                })
            })
        } catch (error) {
            console.error("data jsontable",error);
        }
        return { columns: columns, data: data }
    }, [datasets])

    return (
        <Table columns={tableFormat.columns} datasetType={datasetType} data={tableFormat.data} />
    )
}
