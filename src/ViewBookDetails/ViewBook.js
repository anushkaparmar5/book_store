import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import { calculateDiscountedPrice, capitalize, titleCase } from '../utils';
import "./style.css";
import CustomButton from '../Components/CustomButton';
import { addToCart, clearMessage } from '../CartSlice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


function ViewBook() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const message = useSelector((state) => state.cart.message)
    const cartLoading = useSelector((state) => state.cart.cartLoading)
    const [bookData, setBookData] = useState({});
    const [isLoading, setLoading] = useState(true);

    const getBook = async () => {
        setLoading(true);
        const url = `http://localhost:4000/api/books/${id}`;
        await fetch(url)
            .then(res => res.json())
            .then(data => {
                setBookData(data);
                setLoading(false);
            })
            .catch(rejected => {
                console.log(rejected);
            });
    }

    const handleAddToCart = (item) => {
        dispatch(addToCart(item))
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

    useEffect(() => {
        getBook();
    }, []);

    return (isLoading ?
        <Loader /> :
        <div className="container ">
            <div className="row">
                <div className="col left-box">
                    <div className='image-buttons'>
                        <div className='book-image'>
                            <img alt="cover" src={bookData?.images[0]}></img>
                        </div>
                        <div className='buttons'>
                            <CustomButton disabled={cartLoading} onclick={() => handleAddToCart(bookData)} className="" variant="primary" text='Add To Cart' icon={<i className="fa-solid fa-cart-plus"></i>} />
                        </div>
                    </div>
                </div>
                <div className='col right-box'>
                    <div className='book-details'>
                        <div className='title'>{titleCase(bookData?.title)}</div>
                        <br />
                        <div className='rating-box'>
                            <span>{bookData?.rating}</span>
                            <i className="fa-regular fa-star"></i>
                        </div>
                        <div className='price-box'>
                            <div className='title'>Special price</div>
                            <div className='prices'>
                                <div className='sale-price'>
                                    <i className="fa-solid fa-indian-rupee-sign"></i>
                                    <span>{calculateDiscountedPrice(bookData?.price, bookData?.discount)}</span>
                                </div>
                                <div className='actual-price'>
                                    <i className="fa-solid fa-indian-rupee-sign"></i>
                                    <span>{bookData?.price}</span>
                                </div>
                                <div className='discount'>
                                    <span>{bookData?.discount}% off</span>
                                </div>
                            </div>
                            <div className='description'>
                                <div className='author-publisher'>
                                    <div className='label'>Authors: </div>
                                    <div className='value'>{capitalize(bookData?.author)}</div>
                                </div>
                                <div className='author-publisher'>
                                    <div className='label'>Publishers: </div>
                                    <div className='value'>{capitalize(bookData?.publishers)}</div>
                                </div>
                                <div className='author-publisher'>
                                    <div className='label'>Description: </div>
                                    <div className='value'>{capitalize(bookData?.description)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>);
};




export default ViewBook
