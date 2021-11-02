import React from 'react'
import { NavLink } from 'react-router-dom'
import { getLoggedInUser } from './auth/auth';

function Navbar() {
    const user = getLoggedInUser();
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        location.href = '/login';
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div className="container">
                    <div className="navbar-header">
                        <NavLink to="/" className="navbar-brand">Laravel API</NavLink>
                    </div>
                    <ul className="nav navbar-nav">
                        {
                            user ? (
                                <>
                                <NavLink to="/dashboard" className="nav-item nav-link">Dashboard</NavLink>
                                <a href="" onClick={logout} className="nav-item nav-link">Logout</a>
                                </>
                            ) : (
                                <>
                                <NavLink to="/login" className="nav-item nav-link">Login</NavLink>
                                <NavLink to="/register" className="nav-item nav-link">Register</NavLink>
                                </>
                            )
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )

}

export default Navbar
