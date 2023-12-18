import React, { } from 'react'
import Loader from '../Components/Loader';
import CustomButton from '../Components/CustomButton';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import { capitalize, titleCase } from "../utils/index"
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, removeFromCart, updateQuantity } from '../CartSlice/cartSlice';
import { toast } from 'react-toastify';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems).filter((value) => value?.userId === 1);
    const isLoading = useSelector((state) => state.cart.isLoading);
    const message = useSelector((state) => state.cart.message)
    const cartLoading = useSelector((state) => state.cart.cartLoading)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleHomeClick = () => {
        navigate("/");
    }

    const handleCartItemRemove = (item) => {
        dispatch(removeFromCart(item));
    };

    const handleCartItemUpdate = (item, action) => {
        let quantity = cartItems.find(_item => _item?._id === item?._id)?.quantity;
        if (action === "INC")
            quantity += 1;
        else if (action === "DEC")
            quantity -= 1;
        if (quantity === 0) {
            dispatch(removeFromCart(item));
        } else {
            dispatch(updateQuantity({ _id: item._id, userId: item.userId, quantity }));
        }
    };

    const calculateDiscountedPrice = (item) => {
        return item.price - item.price * (item.discount / 100);
    };

    const calculateIndividualPrice = (item) => {
        return calculateDiscountedPrice(item) * item.quantity;
    };

    const calculateTotalPrice = () => {
        const totalPrice = cartItems.reduce((total, item) => {
            return total + calculateIndividualPrice(item);
        }, 0);
        return totalPrice;
    };

    const calculateSubTotalPrice = () => {
        const totalPrice = cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
        return totalPrice;
    };

    const calculateTotalDiscount = () => {
        const totalPrice = cartItems.reduce((total, item) => {
            return total + item.discount * item.quantity;
        }, 0);
        return totalPrice;
    };

    if (message?.text && message?.type) {
        if (message?.type === "success") {
            toast.success(message?.text);
            dispatch(clearMessage());
        } else if (message?.type === "error") {
            toast.error(message?.text)
            dispatch(clearMessage())
        } else if (message?.type === "warning") {
            toast.warning(message?.text)
            dispatch(clearMessage())
        }

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
                                                <span>{calculateDiscountedPrice(item)}</span>
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
                                                <CustomButton disabled={cartLoading} onclick={() => handleCartItemUpdate(item, "DEC")} icon={<i className="fa-solid fa-minus"></i>} variant='outline' />
                                                <span>
                                                    {item?.quantity}
                                                </span>
                                                <CustomButton disabled={cartLoading} onclick={() => handleCartItemUpdate(item, "INC")} icon={<i className="fa-solid fa-plus"></i>} variant='outline' />
                                            </div>
                                            <div className="remove-btn">
                                                <CustomButton disabled={cartLoading} onclick={() => handleCartItemRemove(item)} text='Remove' />
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
                                    <div className="key">Price ({cartItems?.length} item)</div>
                                    <div className="value"><i className="fa-solid fa-indian-rupee-sign"></i> {calculateSubTotalPrice()}</div>
                                </div>
                                <div className="price">
                                    <div className="key">Discount</div>
                                    <div className="discount-value"> <i className="fa-solid fa-minus"></i> <i className="fa-solid fa-indian-rupee-sign"></i> {calculateTotalDiscount()}</div>
                                </div>
                                <div className="price">
                                    <div className="key">Delivery Charges</div>
                                    <div className="value"><span className='charges'><i className="fa-solid fa-indian-rupee-sign"></i> 80</span> <span className='discount-value'>Free</span></div>
                                </div>
                                <hr />
                                <div className="price">
                                    <div className="total-key">Total Amount Charges</div>
                                    <div className="total-value"><i className="fa-solid fa-indian-rupee-sign"></i> {calculateTotalPrice()} </div>
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
