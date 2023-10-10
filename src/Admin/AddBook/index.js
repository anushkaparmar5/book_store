import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetMessage, userAdd, userEdit } from '../../BookSlics/BookSlics';
// import { resetMessage, userAdd, userDelete, userEdit } from './bookSlice';

const AddBook = () => {
    let initialValue = {

        title: "",
        description: "",
        author: "",
        publishers: "",
        price: "",
        discount: "",
        images: [],
        rating: ""
    }
    const [formData, setFormData] = useState(initialValue);
    console.log('dormData :>> ', formData);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();



    const requiredValue = (name, value, image) => {
        let error = {};
        if (!value || (Array.isArray(image) && image?.length === 0)) {
            error[name] = "This field is required.";
        } else {
            error[name] = "";
        }
        setErrors((prev) => ({ ...prev, ...error }));
    };

    const validateFormData = (formData) => {
        let errors = {};
        Object.keys(formData).forEach(item => {
            if (!formData[item])
                errors[item] = "This field is required.";
        })
        setErrors((prev) => ({ ...prev, ...errors }));
        return Object.keys(errors)?.length ? true : false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateFormData(formData)) {
            if (formData?.id) {
                dispatch(userEdit(formData));
            } else {
                dispatch(userAdd({ ...formData, id: Date.now() }));
            }
            setFormData(initialValue);
        }
    };

    const handleOnChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let image = e.target.image
        requiredValue(name, value, image);
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // const handleDelete = (data) => {
    //     dispatch(userDelete(data));
    // };

    // const handleEdit = (data) => {
    //     setFormData(data);
    // };


    return (
        <div className='container'>
            <div className='mt-2 mx-5'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={formData?.title} onChange={handleOnChange} />
                        <small className='text-danger'>{errors["title"]}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={formData?.description} onChange={handleOnChange} />
                        <small className='text-danger'>{errors["description"]}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Author</label>
                        <input type="text" className="form-control" id="author" name="author" value={formData?.author} onChange={handleOnChange} />
                        <small className='text-danger'>{errors["author"]}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="publishers" className="form-label">publishers</label>
                        <input type="text" className="form-control" id="publishers" name="publishers" value={formData?.publishers} onChange={handleOnChange} />
                        <small className='text-danger'>{errors["publishers"]}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control" id="price" name="price" value={formData?.price} onChange={handleOnChange} />
                        <small className='text-danger'>{errors["price"]}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="discount" className="form-label">Discount</label>
                        <input type="number" className="form-control" id="discount" name="discount" value={formData?.discount} onChange={handleOnChange} />
                        <small className='text-danger'>{errors["discount"]}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="actual_price" className="form-label">Actual Price</label>
                        <input type="actual_price" className="form-control" id="actual_price" name="actual_price" value={formData?.actual_price} onChange={handleOnChange} />
                        <small className='text-danger'>{errors["actual_price"]}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="images" className="form-label">Image</label>
                        <input type="file" className="form-control" id="images" name="images" value={formData?.images} onChange={handleOnChange} />
                        <small className='text-danger'>{errors["images"]}</small>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <input type="number" className="form-control" id="rating" name="rating" value={formData?.rating} onChange={handleOnChange} />
                        <small className='text-danger'>{errors["rating"]}</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddBook
