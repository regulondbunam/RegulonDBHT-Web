import React from "react"

export function ColumnSelector({
    getToggleHideAllColumnsProps,
    allColumns,
    id_dataset
}) {
    return (
        <div style={{ display: "grid", height: "30px", gridTemplateColumns: "auto 150px 100px", gridColumnGap: "10px" }}  >
            <h4 style={{ margin: "0", paddingLeft: "10px" }} >author's table</h4>
            <div className="dropdown">
                <button style={{ padding: "4px", width: "150px" }} >Display columns</button>
                <div className="dropdown-content">
                    <div>
                        <div>
                            <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
                            All
                        </div>
                        {allColumns.map(column => (
                            <div key={column.id}>
                                <label>
                                    <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                                    {column.id}
                                </label>
                            </div>
                        ))}
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}
/**
 * 
 */

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return <input type="checkbox" ref={resolvedRef} {...rest} />
    }
)