import React, { } from 'react'
import Loader from '../Components/Loader';
import CustomButton from '../Components/CustomButton';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import { calculateDiscountedPrice, capitalize, titleCase } from "../utils/index"
import { useSelector } from 'react-redux';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems).filter((value) => value?.userId === 1);
    const isLoading = useSelector((state) => state.cart.isLoading);
    const navigate = useNavigate();
    console.log('cartItems :>> ', cartItems);

    const handleHomeClick = () => {
        navigate("/");
    }

    return (isLoading ?
        <Loader /> :
        <div className="container cart-wrapper">
            {cartItems?.length ?
                <div className="row">
                    <div className="col left-cart-box">
                        <div className="title">Total {cartItems?.length || 0} Books </div>
                        <div className="all-cart-items">
                            {cartItems?.map((item, index) => {
                                return <div className="cart-item" key={index}>
                                    <div className="image-box">
                                        <img src={item?.images[0]} alt="cover" />
                                    </div>
                                    <div className="book-data">
                                        <div className="title">{titleCase(item?.title)}</div>
                                        <div className="author">{capitalize(item?.author)}</div>
                                        <div className='prices'>
                                            <div className='sale-price'>
                                                <i className="fa-solid fa-indian-rupee-sign"></i>
                                                <span>{calculateDiscountedPrice(item?.price, item?.discount)}</span>
                                            </div>
                                            <div className='actual-price'>
                                                <i className="fa-solid fa-indian-rupee-sign"></i>
                                                <span>{item?.price}</span>
                                            </div>
                                            <div className='discount'>
                                                <span>{item?.discount}% off</span>
                                            </div>
                                        </div>
                                        <div className="buttons">
                                            <div className="qty-btn">
                                                <CustomButton onclick={() => { }} icon={<i className="fa-solid fa-minus"></i>} variant='outline' />
                                                <span>
                                                    {item?.quantity}
                                                </span>
                                                <CustomButton onclick={() => { }} icon={<i className="fa-solid fa-plus"></i>} variant='outline' />
                                            </div>
                                            <div className="remove-btn">
                                                <CustomButton onclick={() => { }} text='Remove' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="col-3 right-cart-box">
                        <div className="price-details-box">
                            <div className="title">PRICE DETAILS</div>
                            <div className="price-details">
                                <div className="price">
                                    <div className="key">Price (1 item)</div>
                                    <div className="value"><i className="fa-solid fa-indian-rupee-sign"></i> 500</div>
                                </div>
                                <div className="price">
                                    <div className="key">Price (1 item)</div>
                                    <div className="value"><i className="fa-solid fa-indian-rupee-sign"></i> 500</div>
                                </div>
                                <div className="price">
                                    <div className="key">Discount</div>
                                    <div className="discount-value"> <i className="fa-solid fa-minus"></i> <i className="fa-solid fa-indian-rupee-sign"></i> 40</div>
                                </div>
                                <div className="price">
                                    <div className="key">Delivery Charges</div>
                                    <div className="value"><span className='charges'><i className="fa-solid fa-indian-rupee-sign"></i> 80</span> <span className='discount-value'>Free</span></div>
                                </div>
                                <hr />
                                <div className="price">
                                    <div className="total-key">Total Amount Charges</div>
                                    <div className="total-value"><i className="fa-solid fa-indian-rupee-sign"></i> 460 </div>
                                </div>
                                <div className="save-text">
                                    You will save <i className="fa-solid fa-indian-rupee-sign"></i> 40 on this order
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                <div className="no-data">
                    <h3>Your cart is empty</h3>
                    <CustomButton onclick={handleHomeClick} text='Continue Shopping' variant='primary' />
                </div>
            }
        </div>
    )
}

export default Cart
