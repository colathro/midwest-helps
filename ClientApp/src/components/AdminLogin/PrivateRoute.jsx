import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AdminLogin } from './AdminLogin';

 
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <AdminLogin />
    )} />
)