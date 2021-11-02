import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [formData, setFormData] = useState({name: '', slug:'', description: '', price: ''});
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState({message: '', errors: {}});

    const handleInput = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    const createProduct = (e) => {
        e.preventDefault();
        formData.slug = formData.name.toLowerCase().replace(' ','-');
        const userToken = JSON.parse(localStorage.getItem('user'));
        axios({
            method: 'post',
            url: '/api/product',
            data: formData,
            headers: {
                Authorization: 'Bearer ' + userToken.token
            }
        })

        .then(response => {
            console.log(response);
            products.push(response.data);
            setProducts(products);
            setFormData({name: '', slug: '', description: '', price: ''});
            setErrors({message: '', errors: {}});
        })
        .catch(error => setErrors(error.response.data));

    }

    useEffect(() => {
        const fetchData = async () => {
            const res= await axios('/api/products')
            const data = await res.data;
            setProducts(data);
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">Products</div>
                        <div className="card-body">
                            {products.map((product, index) => (
                                <div className="posts" key={index}>
                                    <em>{product.created_at}</em><br/>
                                    <strong>{product.name}</strong>
                                    <p>{product.description}</p>
                                    <em>{product.price}</em><br/><hr/><br/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card mt-4 mb-4">
                        <div className="card-header">Create Product</div>
                        <div className="card-body">
                            <form onSubmit={createProduct}>
                                {
                                errors.message ? (
                                <div className="alert alert-danger">{ errors.message }</div>
                                ) : ''

                                }
                                <div className="form-group">
                                    <label htmlFor="name">Product name</label>
                                    <input type="text" name="name" id="name"
                                        className={'name' in  errors.errors ?
                                            'form-control is-invalid' : 'form-control'
                                        }
                                        value={formData.name}
                                        onChange={handleInput}
                                    />
                                    {
                                        'name' in  errors.errors ? (
                                            <span className="invalid-feedback" role="alert">
                                                {errors.errors.name.map((err, index) => (
                                                    <strong key={index}>{err}</strong>
                                                ))}
                                            </span>
                                        ) : ''

                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea name="description" id="description"
                                        className={'description' in  errors.errors ?
                                            'form-control is-invalid' : 'form-control'
                                        }
                                        onChange={handleInput}
                                        value={formData.description}></textarea>
                                    {
                                        'description' in  errors.errors ? (
                                            <span className="invalid-feedback" role="alert">
                                                {errors.errors.description.map((err, index) => (
                                                    <strong key={index}>{err}</strong>
                                                ))}
                                            </span>
                                        ) : ''

                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">price</label>
                                    <input type="text" name="price" id="price"
                                        className={'price' in  errors.errors ?
                                            'form-control is-invalid' : 'form-control'
                                        }
                                        onChange={handleInput}
                                        value={formData.price}
                                    />
                                    {
                                        'price' in  errors.errors ? (
                                            <span className="invalid-feedback" role="alert">
                                                {errors.errors.price.map((err, index) => (
                                                    <strong key={index}>{err}</strong>
                                                ))}
                                            </span>
                                        ) : ''

                                    }
                                </div>
                                <input type="submit" value="Create" className="btn btn-primary"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
