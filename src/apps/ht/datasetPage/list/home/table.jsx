import React from 'react'
import GlobalFilter from './tableComponents/GlobalFilter'
import { useTable, useBlockLayout, useGlobalFilter, useResizeColumns, useSortBy } from 'react-table'
import { FixedSizeList } from 'react-window'
import scrollbarWidth from './scrollbarWidth'
import { Link } from 'react-router-dom'
import { TableStyles } from "./styledComponents"
import { ColumnSelector } from "./tableComponents/ColumnSelector";
import Style from "./table.module.css";


function Table({ columns, datasetType, data, ignoreColumns, hiddenColumns }) {
    // Use the state and functions returned from useTable to build your UI
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 100,
            width: 350,
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
        setGlobalFilter,
        allColumns
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: {
                hiddenColumns: hiddenColumns
            }
        },

        useBlockLayout,
        useGlobalFilter,
        useSortBy,
        useResizeColumns
    )

    const itemSize = 40
    const heightTable = 20 * itemSize
    const itemScroll = heightTable / rows.length
    const itemsView = heightTable / itemSize
    let thumbHeight = itemsView * itemScroll
    if (thumbHeight > heightTable) thumbHeight = 0
    let listRef = React.createRef();

    const RenderRow = React.useCallback(
        ({ index, style }) => {
            const row = rows[index]
            prepareRow(row)
            return (
                <Link to={`/ht/dataset/${datasetType}/datasetId=${row.original._id}`} >
                    <div
                        {...row.getRowProps({
                            style,
                        })}
                        className={"tr " + Style.itemSel}
                    >
                        {row.cells.map(cell => {
                            return (
                                <div {...cell.getCellProps()} className={"td"}>
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
        <section className={Style.row} >
            <div className={`${Style.columnL} ${Style.divBorder}`} >
                <ColumnSelector ignoreColumns={ignoreColumns} allColumns={allColumns} />
            </div>
            <div className={`${Style.columnC} ${Style.divBorder}`} >
                <div className={Style.divBorder} >
                    <h3>Datasets Table</h3>
                </div>
                <div className={Style.divBorder} >
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                </div>
                <div className={Style.tableConteiner} >
                    <TableStyles className={Style.divBorder} >
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
                                    height={heightTable}
                                    itemCount={rows.length}
                                    itemSize={itemSize}
                                    width={totalColumnsWidth + scrollBarSize}
                                    ref={listRef}
                                    onItemsRendered={({
                                        visibleStartIndex,
                                    }) => {
                                        let thumb = document.getElementById("scrollThumb")
                                        if (thumb) {
                                            if ((itemScroll * visibleStartIndex) > heightTable) {
                                                thumb.style.top = `${heightTable}px`
                                            } else {
                                                thumb.style.top = `${itemScroll * visibleStartIndex}px`
                                            }

                                        }
                                    }}
                                >
                                    {RenderRow}
                                </FixedSizeList>
                            </div>
                        </div>
                    </TableStyles>
                    <div className={Style.scrollIndicator} id="scrollIndicator_dataset"
                        style={{ height: `${heightTable}px` }}
                        onClick={e => {
                            let ind = e.target
                            ind = ind.getBoundingClientRect()
                            let sel = (e.clientY - ind.top) * (rows.length / heightTable)
                            console.log(sel);
                            listRef.current.scrollToItem(sel)
                        }} >
                        <div className={Style.scrollThumb} id='scrollThumb' style={{ height: `${thumbHeight}px` }} ></div>
                    </div>
                </div>
            </div>
            <div className={Style.columnR + " " + Style.divBorder} >
                <div className={Style.divBorder} >
                    <h3>Related Tools</h3>
                </div>
                {
                    /**
                     *  <div className={Style.divBorder} style={{padding: "2px"}} >
                     <button style={{width: "98%"}} >Download Table</button>
                 </div>
                     */
                }
                <div className={Style.divBorder} style={{ padding: "2px" }} >
                    <h3>Query Bulder</h3>
                    Do you need to make a more specific search?
                    <br />
                    <Link to={`/ht/finder/${datasetType}`}>
                        <button>
                            Use the Query Builder
                        </button>
                    </Link>
                </div>
            </div>
        </section>

    )
}


export function DatasetTable({ jsonTable, datasetType }) {

    let hiddenColumns = ['_id', 'referenceGenome', "datasetType", "objectsTested_name", "sample_title", "publications_title", "publications_authors", "sourceSerie_title", "sourceSerie_strategy", "sourceSerie_method", "growthConditions_organism", "growthConditions_geneticBackground", "growthConditions_medium", "growthConditions_aeration", "growthConditions_temperature", "growthConditions_ph", "growthConditions_pressure", "growthConditions_opticalDensity", "growthConditions_growthPhase", "growthConditions_growthRate", "growthConditions_vesselType", "growthConditions_aerationSpeed", "growthConditions_mediumSupplements"]
    let ignoreColumns = []

    //console.log(jsonTable);
    if (!jsonTable) {
        return <div>Loading...</div>
    }
    let show = []
    switch (datasetType) {
        case 'TFBINDING':
            show = ['_id', "objectsTested_name", "sample_title"]
            show.forEach(element => {
                remove(hiddenColumns, element)
            });
            
            break;
        case 'TUS':
            show = ['_id',"publications_title", "sourceSerie_title"]
            show.forEach(element => {
                remove(hiddenColumns, element)
            });
            ignoreColumns = ["objectsTested_name","sample_title"]
            break;
        case 'TTS':
            show = ['_id',"publications_title", "sourceSerie_title"]
            show.forEach(element => {
                remove(hiddenColumns, element)
            });
            ignoreColumns = ["objectsTested_name","sample_title"]
            break;
        case 'TSS':
            show = ['_id',"publications_title", "sourceSerie_title"]
            show.forEach(element => {
                remove(hiddenColumns, element)
            });
            ignoreColumns = ["objectsTested_name","sample_title"]
            break;
        case 'GENE_EXPRESSION':
            show = ['_id',"publications_title", "sourceSerie_title"]
            show.forEach(element => {
                remove(hiddenColumns, element)
            });
            ignoreColumns = ["objectsTested_name","sample_title","growthConditions_organism", "growthConditions_geneticBackground", "growthConditions_medium", "growthConditions_aeration", "growthConditions_temperature", "growthConditions_ph", "growthConditions_pressure", "growthConditions_opticalDensity", "growthConditions_growthPhase", "growthConditions_growthRate", "growthConditions_vesselType", "growthConditions_aerationSpeed", "growthConditions_mediumSupplements"]
            break;
        default:
            break;
    }

    if (jsonTable?.error) {
        console.error(jsonTable?.error);
        return <></>
    }
    //console.log(jsonTable.data);
    return (
        <Table columns={jsonTable.columns} datasetType={datasetType} data={jsonTable.data} hiddenColumns={hiddenColumns} ignoreColumns={ignoreColumns} />
    )
}


function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}