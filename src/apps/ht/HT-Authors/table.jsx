import React from 'react'
import GlobalFilter from './tableComponents/GlobalFilter'
import { useTable, useBlockLayout, useGlobalFilter, useResizeColumns } from 'react-table'
import { FixedSizeList } from 'react-window'
import scrollbarWidth from './scrollbarWidth'
import { TableStyles } from "./styledComponents"

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 100,
            width: 150,
            maxWidth: 1000,
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
            )
        },
        [prepareRow, rows]
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

export function AuthorTable({ tableData }) {
    console.log(tableData?.comments)
    return (
       <div>
           {
               tableData?.data
               ?<div>
                   <p></p>
                   <Table columns={tableData.columns} data={tableData.data} />
               </div>
               :<p>Error prosess author data</p>
           }
            
       </div>
    )
}
