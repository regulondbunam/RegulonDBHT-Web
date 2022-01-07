import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout, useGlobalFilter, useAsyncDebounce, useResizeColumns } from 'react-table'
import { FixedSizeList } from 'react-window'
import scrollbarWidth from './scrollbarWidth'

const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      .resizer {
        display: inline-block;
        background: blue;
        width: 10px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: red;
        }
      }
      :last-child {
        border-right: 1px solid black;
      }
    }
  }
`

function Table({ columns, data }) {
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
        <div {...getTableProps()} className="table">
            <div className="th" >
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </div>
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
    )
}

export function DatasetTable({ datasets, datasetType }) {
    let tableFormat = useMemo(() => {
        let columns
        let data
        switch (datasetType) {
            case "TFBINDING":
                columns = [
                    {
                        Header: "ID",
                        accessor: "_id"
                    },
                    {
                        Header: "Title",
                        accessor: "_title"
                    }
                ]
                data = datasets.map(dataset => {
                    let title = dataset?.sample?.title
                    if (!title) {
                        title = dataset?.objectTested?.name
                        if (!title) {
                            title = dataset?._id
                        }
                    }
                    return {
                        _id: dataset?._id,
                        _title: title
                    }
                })
                break;
            default:
                columns = [
                    {
                        Header: "ID",
                        accessor: "_id"
                    },
                    {
                        Header: "Title",
                        accessor: "_title",
                        filter: 'fuzzyText',
                    }
                ]
                data = datasets.map(dataset => {
                    return {
                        _id: dataset?._id,
                        _title: "title"
                    }
                })
                break;
        }
        return { columns: columns, data: data }
    }, [datasets, datasetType])

    return (
        <Styles>
            <Table columns={tableFormat.columns} data={tableFormat.data} />
        </Styles>
    )
}

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
        </span>
    )
}
