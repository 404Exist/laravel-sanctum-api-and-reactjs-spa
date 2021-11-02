import React, { Component } from 'react'
import { login } from './auth';

class Login extends Component {
    state = {
        formData: {
            email: '',
            password: '',
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

    login = (e) => {
        e.preventDefault();
        login(this.state.formData).then(response => {
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
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <form onSubmit={this.login}>
                                    {
                                        this.state.errors.message ? (
                                        <div className="alert alert-danger" >
                                            {this.state.errors.message}
                                        </div>
                                        ) : ''
                                    }
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
                                    <input type="submit" value="Login" className="btn btn-primary"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;
