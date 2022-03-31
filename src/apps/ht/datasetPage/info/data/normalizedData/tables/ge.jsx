import React from 'react'
import { Table } from './Table';



export default function GE({ jsonTable }) {
    console.log(jsonTable);
    if (jsonTable.error) {
        return <div></div>
    }


    return <Table data={jsonTable.data} columns={jsonTable.columns} />
}