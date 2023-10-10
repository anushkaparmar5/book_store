import React, { useEffect, useState } from 'react'
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import { URLS } from '../Constant';
import Loader from '../Components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetMessage } from '../BookSlics/BookSlics';

const Home = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [allBooks, setAllBooks] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("Price High To Low")

    const handleAddToCart = (item) => { };

    const handleViewItem = (item) => {
        navigate(`${URLS.BookDetails}/${item?._id}`);
    };

    const getBooks = async () => {
        setLoading(true);
        const url = "http://localhost:4000/api/books";
        await fetch(url)
            .then(res => res.json())
            .then(data => {
                setAllBooks(data);
                setLoading(false);
            })
            .catch(rejected => {
                console.log(rejected);
            });
    }

    const sortBooks = (list, filter) => {
        if (filter === "Price Low To High") {
            list.sort((a, b) => a.price - b.price);
        } else {
            list.sort((a, b) => b.price - a.price);
        }
        return list;
    }
    const sortedItems = sortBooks(allBooks, selectedFilter)

    const handleChangeFilter = (e) => {
        let { value } = e.target;
        setSelectedFilter(value);
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (isLoading ?
        <Loader /> :
        <div>
            <div className="container-fluid">
                <div className="container">
                    <div className="page-header">
                        <div className="page-title">Popular Books</div>
                        <div className="page-filters">
                            <select name="filter" id="filter" onChange={handleChangeFilter} value={selectedFilter} defaultValue={selectedFilter} >
                                <option value="Price Low To High">Price Low To High</option>
                                <option value="Price High To Low">Price High To Low</option>
                            </select>
                        </div>
                    </div>
                    <div className="all-books">
                        {sortedItems?.length ? sortedItems.map((book, index) => {
                            return (
                                <div className="book-card" key={index}>
                                    <Link className='card-link' to={`${URLS.BookDetails}/${book?._id}`}>
                                        <div className="card-header">
                                            <img src={book?.images[0]} alt="book" />
                                        </div>
                                        <div className="card-footer">
                                            <div className="title-box">
                                                <div className='title'>{book?.title}</div>
                                                <div className='author-publisher'>{book?.author}</div>
                                            </div>
                                            <div className="price-rating-box">
                                                <div className="price-box">
                                                    <span className='sale-price'>{book?.price} <i className="fa-solid fa-indian-rupee-sign"></i></span>
                                                    <span className='discount'>{book?.discount}</span>
                                                    <span className='actual-price'>{book?.actual_price} <i className="fa-solid fa-indian-rupee-sign"></i></span>
                                                </div>
                                                <div className="rating">
                                                    <span>{book?.rating}</span>
                                                    <i className="star-icon fa-regular fa-star"></i>
                                                </div>
                                            </div>
                                            <div className="buttons">
                                                <button onClick={() => handleAddToCart(book)} className='cart-icon-button'><i className="fa-solid fa-cart-plus"></i></button>
                                                <button onClick={() => handleViewItem(book)} className='view-icon-button'><i className="fa-regular fa-eye"></i></button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }) :
                            <div className='h3'>
                                No Books Founds.
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home;