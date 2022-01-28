import React from 'react'
import GlobalFilter from './tableComponents/GlobalFilter'
import { useTable, useBlockLayout, useGlobalFilter, useResizeColumns } from 'react-table'
import { FixedSizeList } from 'react-window'
import scrollbarWidth from './scrollbarWidth'
import { TableStyles } from "./styledComponents"
import Style from './table.module.css'
import { ColumnSelector } from './tableComponents/ColumnSelector'


function Table({ columns, data, id_dataset }) {
    // Use the state and functions returned from useTable to build your UI
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 10,
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
        setGlobalFilter,
        allColumns,
        getToggleHideAllColumnsProps,
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
    
    const itemSize = 30
    const itemScroll = 500/preGlobalFilteredRows.length
    const itemsView = 500/itemSize
    const thumbHeight = itemsView * itemScroll
    let listRef = React.createRef();

    const RenderRow = React.useCallback(
        ({ index, style }) => {
            const row = rows[index]
            prepareRow(row)
            let max = 0;
            //let min = 0
            return (
                <div
                    {...row.getRowProps({
                        style,
                    })}
                >
                    {row.cells.map(cell => {
                        if(max<cell.row.index){
                            max = cell.row.index
                            let thumb = document.getElementById("scrollThumb")
                            if (thumb) {
                                thumb.style.top = `${itemScroll*max}px`
                            }
                        }
                       
                        return (
                            <div {...cell.getCellProps()} className="td">
                                {cell.render('Cell')}
                            </div>
                        )
                    })}
                </div>
            )
        },
        [prepareRow, rows, itemScroll]
    )



    // Render the UI for your table
    return (
        <div>
            <div className={Style.author_row}  >
                <ColumnSelector getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} allColumns={allColumns} id_dataset={id_dataset} />
            </div>
            <div className={Style.author_row}  >
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 10px"}} >
                <TableStyles className={Style.window_table}>
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

                        <div {...getTableBodyProps()} >
                            <FixedSizeList
                                height={500}
                                itemCount={rows.length}
                                itemSize={itemSize}
                                width={totalColumnsWidth + scrollBarSize}
                                className={Style.bodyTableAuthor}
                                ref={listRef}
                            >
                                {RenderRow}
                            </FixedSizeList>
                        </div>
                    </div>
                </TableStyles>
                <div className={Style.scrollIndicator} id="scrollIndicator_author" onClick={e=>{
                    let ind = e.target
                    ind = ind.getBoundingClientRect()
                    let sel = (e.clientY-ind.top)*preGlobalFilteredRows.length/500
                    listRef.current.scrollToItem(sel)
                }} >
                    <div className={Style.scrollThumb} id='scrollThumb' style={{height: `${thumbHeight}px`}} ></div>
                </div>
            </div>

        </div>

    )
}

export function AuthorTable({ tableData, id_dataset }) {
    //console.log(tableData?.comments)
    if (!tableData?.data) {
        return <p>Error process author data</p>
    }
    return (
        <div>
            <div className={Style.author_row} >
                <h3 style={{ margin: "0", paddingLeft: "10px" }}  >Author Report</h3>
            </div>
            <div className={Style.author_row} >
                <h4 style={{ margin: "0", paddingLeft: "10px" }}  >author's comments:</h4>
                <p style={{ padding: "0 10px 5px 15px" }} > {tableData?.comments}</p>
            </div>
            <div className={Style.author_row} >
                <Table columns={tableData.columns} data={tableData.data} id_dataset={id_dataset} />
            </div >
            <br />
        </div>

    )
}
