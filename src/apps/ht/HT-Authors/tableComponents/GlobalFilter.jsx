import React from "react"
import {useAsyncDebounce} from "react-table"
export default function GlobalFilter({
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
            <div style={{display: "grid", gridTemplateColumns: "21px auto"}} >
            <i className='bx bx-search-alt' style={{textAlign: "center",fontSize: "21px"}}></i>
            <input
                value={value || ""}
                placeholder={`Search in ${count} elements:`}
                style={{width: "100%"}}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
            />
            </div>
            
        </span>
    )
}