import React, { Component } from 'react'
import { register } from './auth';

class Register extends Component {
    state = {
        formData: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        },
        errors: {
            errors: {},
            message: '',
        },
    }

    handleInput = (e) => {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [e.target.name] : e.target.value
            }
        }))
    }

    registerUser = (e) => {
        e.preventDefault();
        register(this.state.formData).then(response => {
            localStorage.setItem('user',JSON.stringify(Object.assign({}, response.user, {token: response.token})));
            location.href = '/dashboard';
        }).catch(error => {
            this.setState({errors : error.response.data});
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header">Register</div>
                            <div className="card-body">
                                <form onSubmit={this.registerUser}>
                                    {
                                        this.state.errors.message ? (
                                        <div className="alert alert-danger" >
                                            {this.state.errors.message}
                                        </div>
                                        ) : ''
                                    }
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" id="name" required
                                            className={'name' in  this.state.errors.errors ?
                                              'form-control is-invalid' : 'form-control'
                                            }
                                            value={this.state.formData.name}
                                            onChange={this.handleInput}
                                        />
                                        {
                                            'name' in  this.state.errors.errors ? (
                                                <span className="invalid-feedback" role="alert">
                                                    {this.state.errors.errors.name.map((err, index) => (
                                                        <strong key={index}>{err}</strong>
                                                    ))}
                                                </span>
                                            ) : ''

                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email"
                                            className={'email' in  this.state.errors.errors ?
                                                'form-control is-invalid' : 'form-control'
                                            }
                                            value={this.state.formData.email}
                                            onChange={this.handleInput}
                                        />
                                        {
                                            'email' in  this.state.errors.errors ? (
                                                <span className="invalid-feedback" role="alert">
                                                    {this.state.errors.errors.email.map((err, index) => (
                                                        <strong key={index}>{err}</strong>
                                                    ))}
                                                </span>
                                            ) : ''

                                        }

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" id="password"
                                            className={'password' in  this.state.errors.errors ?
                                                'form-control is-invalid' : 'form-control'
                                            }
                                            value={this.state.formData.password}
                                            onChange={this.handleInput}
                                        />
                                        {
                                            'password' in  this.state.errors.errors ? (
                                                <span className="invalid-feedback" role="alert">
                                                    {this.state.errors.errors.password.map((err, index) => (
                                                        <strong key={index}>{err}</strong>
                                                    ))}
                                                </span>
                                            ) : ''
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password_confirmation">Password Confirmation</label>
                                        <input type="password" name="password_confirmation" id="password_confirmation" required
                                            className={'password_confirmation' in  this.state.errors.errors ?
                                                'form-control is-invalid' : 'form-control'
                                            }
                                            value={this.state.formData.password_confirmation}
                                            onChange={this.handleInput}
                                        />
                                        {
                                            'password_confirmation' in  this.state.errors.errors ? (
                                                <span className="invalid-feedback" role="alert">
                                                    {this.state.errors.errors.password_confirmation.map((err, index) => (
                                                        <strong key={index}>{err}</strong>
                                                    ))}
                                                </span>
                                            ) : ''
                                        }
                                    </div>
                                    <input type="submit" value="Register" className="btn btn-primary"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;
