import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./style.css";
import { URLS } from '../../Constant';
import { useSelector } from 'react-redux';

const Header = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    return (
        <div className="header">
            <div className="nav-bar">
                <div className="left-menu">
                    <ul>
                        <li><NavLink to={"/"}>Home</NavLink></li>
                    </ul>
                </div>
                <div className="logo">
                    <div className="title">Book Store</div>
                </div>
                <div className="right-menu">
                    <div className="input-box">
                        <Link to={URLS.Cart} className='cart-icon-Link'><i className="fa-solid fa-cart-plus"> <span className='cart-count'>{cartItems?.length || 0}</span></i></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;