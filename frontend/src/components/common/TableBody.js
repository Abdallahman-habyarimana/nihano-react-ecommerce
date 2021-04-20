import React from 'react'
import _ from 'lodash'

export default function TableBody({ data, columns }) {
    
    const renderCell = (item, column) => {
        console.log(item)
        if(column.content) return column.content(item);  
        let value = _.get(item, column.path)
        value = convertType(value)
        value = parseDate(value)
        return value
    }

    const createKey = (item, column) => {
        return item._id + (column.path || column.key)
    }

    const convertType = (value) => {
        if(typeof value === 'boolean')
            return (value ? 'YES' : 'NO')
        else if(typeof value === 'number')
            return value.toFixed(2)
        else
            return value
    }

    const parseDate = (value) => {
        var valid = (new Date(value)).getTime() > 0;
        if(valid) return value.substring(0,10)
        return value
    }
    
    return (
        <>
             <tbody>
                    { data.map( item => 
                    <tr key={item._id}>
                        {columns.map(column => <td key={createKey(item, column)}>{ renderCell(item, column) }</td>)}
                    </tr>)}
            </tbody>
        </>
    )
}
