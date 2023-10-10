import React from 'react'
import { Link } from 'react-router-dom'
import { URLS } from '../../Constant'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetMessage, userDelete } from '../../BookSlics/BookSlics';

const Books = () => {
    const { usersData, count, message } = useSelector((state) => state.users);
    console.log('userData :>> ', usersData, count);
    const dispatch = useDispatch()

    if (message?.text && message?.type) {
        if (message?.type === "success") {
            toast.success(message?.text);
            dispatch(resetMessage());
        } else if (message?.type === "error") {
            toast.error(message?.text)
            dispatch(resetMessage())
        } else if (message?.type === "warning") {
            toast.warning(message?.text)
            dispatch(resetMessage())
        }
        // code for other type
    }

    const handleDelete = (data) => {
        dispatch(userDelete(data));
    };

    const handleEdit = (data) => {
        // setForm(data);
    };


    return (
        <div className='container'>
            <div>
                <div>Books : 0</div>
                <div>
                    <Link to={URLS.AddBook}> Add Book</Link>
                </div>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Author</th>
                            <th scope="col">Publishers</th>
                            <th scope="col">Price</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Actual Price</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData?.length ? usersData?.map((data, index) => {
                            return <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data?.image}</td>
                                <td>{data?.title}</td>
                                <td>{data?.description}</td>
                                <td>{data?.author}</td>

                                <td>{data?.publishers}</td>
                                <td>{data?.price}</td>
                                <td>{data?.discount}</td>
                                <td>{data?.actual_price}</td>
                                <td>{data?.rating}</td>

                                <td>
                                    <button type="button" className="btn btn-warning mx-2" onClick={() => handleEdit(data)}>Edit</button>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(data)}>Delete</button>
                                </td>
                            </tr>
                        }) :
                            <div classN ame='text-center'>No data Found</div>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Books
