import React from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const Table = ({ data, columns }) => {
    return ( 
        <table className="table">
            <TableHeader columns={columns} />
            <TableBody columns={columns} data={data}/>
        </table>
     );
}
 
export default Table;