import React from 'react';

function InputError( {errorClass, errorMessage}){
    return (
        <div className={errorClass}>
            <span>{errorMessage}</span>
        </div>
    )
}

export default InputError;
