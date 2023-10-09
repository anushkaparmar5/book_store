import React from 'react';
import { ClipLoader } from 'react-spinners';
import "./style.css";

const Loader = () => {
    return (
        <div className='loader-wrapper'>
            <ClipLoader
                color={"#2d9cdb"}
                loading={true}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Loader