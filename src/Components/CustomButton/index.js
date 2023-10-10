import React from 'react'
import "./style.css";

const CustomButton = ({ disabled, onclick, icon, text = "", variant = "primary" }) => {
    return (
        <button disabled={disabled} onClick={onclick} className={variant === "primary" ? "btn-primary" : "btn-outline-primary"}>
            <span className='btn-text'>
                {text}
            </span>
            {icon}
        </button>
    )
}

export default CustomButton