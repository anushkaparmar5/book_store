import React, { useEffect, useState } from 'react'
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import { URLS } from '../Constant';
import Loader from '../Components/Loader';

const Home = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const handleAddToCart = (item) => { };
    const handleViewItem = (item) => {
        navigate(`${URLS.BookDetails}/${item?.id}`);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])

    return (isLoading ?
        <Loader /> :
        <div>
            <div className="container-fluid">
                <div className="container">
                    <div className="page-header">
                        <div className="page-title">Popular Books</div>
                        <div className="page-filters">
                            <select name="filter" id="filter" >
                                <option selected value="Price Low To High">Price Low To High</option>
                                <option value="Price High To Low">Price High To Low</option>
                                <option value="New Arrived">New Arrived</option>
                                <option value="Sale">Sale</option>
                            </select>
                        </div>
                    </div>
                    <div className="all-books">
                        {Array.from({ length: 20 }, (v, i) => {
                            return (
                                <div className="book-card">
                                    <Link className='card-link' to={`${URLS.BookDetails}/${i}`}>
                                        <div className="card-header">
                                            <img src={"https://picsum.photos/id/237/536/354"} alt="book" />
                                        </div>
                                        <div className="card-footer">
                                            <div className="title-box">
                                                <div className='title'>Lorem ipsum dolor sit amet.</div>
                                                <div className='author-publisher'>Abc Def - Lorem ipsum dolor</div>
                                            </div>
                                            <div className="price-rating-box">
                                                <div className="price-box">
                                                    <span className='sale-price'>100 <i className="fa-solid fa-indian-rupee-sign"></i></span>
                                                    <span className='discount'>10% off</span>
                                                    <span className='actual-price'>120 <i className="fa-solid fa-indian-rupee-sign"></i></span>
                                                </div>
                                                <div className="rating">
                                                    <span>4.6</span>
                                                    <i className="star-icon fa-regular fa-star"></i>
                                                </div>
                                            </div>
                                            <div className="buttons">
                                                <button onClick={() => handleAddToCart(v)} className='cart-icon-button'><i class="fa-solid fa-cart-plus"></i></button>
                                                <button onClick={() => handleViewItem(v)} className='view-icon-button'><i class="fa-regular fa-eye"></i></button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home;