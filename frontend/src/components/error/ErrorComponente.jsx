import React from 'react';
import { MdCancelPresentation } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
function  ErrorComponente({error}) {
    const navigate = useNavigate();
    return (
        <>
            <div className='error_card'>
                <p>{error}</p>
                <button onClick={() => navigate('/')}><MdCancelPresentation  /></button>
            </div>
        </>
    );
};

export default ErrorComponente;