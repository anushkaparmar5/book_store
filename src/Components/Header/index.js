import React from 'react'
import { NavLink } from 'react-router-dom'
import "./style.css";


const Header = () => {
    return (
        <div className="header">
            <div className="nav-bar">
                <div className="left-menu">
                    <ul>
                        <li><NavLink to={"/"}>Home</NavLink></li>
                        <li><NavLink to={"/admin/books"}>Admin Penal</NavLink></li>
                    </ul>
                </div>
                <div className="logo">
                    <div className="title">Book Store</div>
                </div>
                <div className="right-menu">
                    <div className="input-box">
                        <input type="search" name="search" id="search" placeholder='Search here...' />
                        <button type="submit">Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;