import React from 'react';

const Message = ({ variant, error }) => {
    return ( 
        <div className={`alert alert-${variant || "info" }`}>
            {error}
        </div>
     );
}
 
export default Message;