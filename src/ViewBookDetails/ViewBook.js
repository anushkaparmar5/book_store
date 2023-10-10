import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import { titleCase } from '../utils';
// import image from '/public/image.png'


function ViewBook() {
    const { id } = useParams();
    const [bookData, setBookData] = useState({});
    const [isLoading, setLoading] = useState(true);

    const getBook = async () => {
        setLoading(true);
        const url = `http://localhost:4000/api/books/${id}`;
        await fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log('data :>> ', data);
                setBookData(data);
                setLoading(false);
            })
            .catch(rejected => {
                console.log(rejected);
            });

    }
    useEffect(() => {
        getBook();
    }, []);

    return (isLoading ?
        <Loader /> :
        <div className="container ">
            <div className="row">
                <div className="col">
                    <div className='image-buttons'>
                        <div className='book-image'>
                            <img alt="cover" src={bookData?.images[0]}></img>
                        </div>
                        <div className='buttons'>
                            <button className='cart-btn'>Add To Cart</button>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='book-details'>
                        <div className='title'>{titleCase(bookData?.title)}</div>
                        <div className='rating-box'>
                            <span>{bookData?.rating}</span>
                            <i className="fa-regular fa-star"></i>
                        </div>
                        <div className='price-box'>
                            <div>Special price</div>
                            <div className='prices'>
                                <div className='sale-price'>
                                    <span>{bookData?.price}</span>
                                    <i className="fa-solid fa-indian-rupee-sign"></i>
                                </div>
                                <div className='actual-price'>
                                    <span>{bookData?.actual_price}</span>
                                    <i className="fa-solid fa-indian-rupee-sign"></i>
                                </div>
                                <div className='sale-price'>
                                    <span>{bookData?.discount}% off</span>
                                    <i className="fa-solid fa-indian-rupee-sign"></i>
                                </div>
                                <div className='description'>
                                    <div className='author'>
                                        <span>Authors</span>
                                        <span>{bookData?.author}</span>
                                    </div>
                                    <div className='publishers'>
                                        <span>Publishers</span>
                                        <span>{bookData?.publishers}</span>
                                    </div>
                                    <div className='desc'>
                                        <span>Description</span>
                                        <span>{bookData?.description}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>);
};




export default ViewBook
