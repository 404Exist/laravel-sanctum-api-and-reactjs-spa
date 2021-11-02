import React, {Component} from 'react';
import { Route , Switch  } from 'react-router-dom';
import { Redirect } from 'react-router';

import { getLoggedInUser } from './auth/auth';

import Home from './Home';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './Dashboard';

class GuestRoute extends Component {
    render() {
        const { component: Component, ...props } = this.props
        return (
        <Route
            {...props}
            render={props => (
                !getLoggedInUser() ?
                <Component {...props} /> :
                <Redirect to='/' />
            )}
        />
        )
    }
}

class AuthRoute extends Component {
    render() {

        const { component: Component, ...props } = this.props

        return (
        <Route
            {...props}
            render={props => (
                getLoggedInUser() ?
                <Component {...props} /> :
                <Redirect to='/login' />
            )}
        />
        )
    }
}

function Routes() {

    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <GuestRoute path="/login" component={Login}/>
            <GuestRoute path="/register" component={Register}/>
            <AuthRoute path="/dashboard" component={Dashboard}/>
        </Switch>
    )
}

export default Routes
