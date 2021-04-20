import React from 'react';

export default function TableHeader({ columns }) {
    return (
        <>
            <tr>
                { columns.map(column => (
                    <th key={column.path || column.key}>{column.label} </th>
                ))}
            </tr>
        </>
    )
}
