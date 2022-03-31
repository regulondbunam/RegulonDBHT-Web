import React, { useMemo } from "react"
import Style from "../table.module.css"

export function ColumnSelector({
    allColumns,
    ignoreColumns
}) {
    const Columns = useMemo(() => {
        let columns = {}
        allColumns.forEach(column => {
            let columnName = column.id;
            if (!ignoreColumns.includes(columnName)) {
                let fields = columnName.split("_")
                if (fields.length > 1) {
                    columnName = fields[0]
                    if (columnName in columns) {
                        columns[columnName].push(column)
                    } else {
                        
                        columns[columnName] = [column]
                    }

                } else {
                    //console.log(column.id);
                    columns[columnName] = [column]
                }
            }
        });
        return columns
    }, [allColumns, ignoreColumns])
    return (
        <div>
            <div className={Style.divBorder} >
                <h3>Column Selector</h3>
            </div>
            <div className={Style.divBorder}>
                {
                    Object.keys(Columns).map((key, index) => {
                        let fields = Columns[key]
                        if (fields.length > 1) {
                            return (
                                <div key={key+"_"+index} className={Style.itemCol + " " + Style.divBorder}>
                                    <div className={Style.itemSel}
                                        onClick={(event)=>{
                                            event.preventDefault()
                                            const section = document.getElementById("section_"+key+"_"+index)
                                            if(section){
                                                if(section.style.display === "none"){
                                                    section.style.display = "block"
                                                }else{
                                                    section.style.display = "none"
                                                }
                                                
                                            }
                                        }}
                                    >{key}</div>
                                    <div id={"section_"+key+"_"+index} style={{display:"none"}} >
                                        {fields.map(column => {
                                            let columnName = column.id;
                                            let fields = columnName.split("_")
                                            if (fields.length>1) {
                                                columnName = fields[1]
                                            }
                                            return (
                                                <div key={column.id+"_A_"+index}>
                                                    <label>
                                                    <input type="checkbox" {...column.getToggleHiddenProps()} />
                                                        {columnName}
                                                    </label>
                                                </div>
                                            )
                                        })}
                                        <br />
                                    </div>
                                </div>
                            )
                        } else {
                            let column = fields[0]
                            return (
                                <div key={column.id+"_B_"+index} className={Style.divBorder + " " + Style.itemSel} >
                                    <label>
                                        <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                                        {column.Header}
                                    </label>
                                </div>
                            )
                        }

                    })
                }
            </div>
        </div>
    )
}
/**
 * 
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
*/
