import React from 'react';
import { useSelector } from 'react-redux';
import Unauthorized from '../Unauthorized/Unauthorized'

export default function RequireAuthorization({children}) {
    const currentUser = useSelector(state => state.currentUser);
    //const roles = (Array.isArray(role) ? role : [role]).filter(Boolean);
    const isLoggedIn = Object.keys(currentUser).length > 0 && !currentUser.error;
    //const isLoggedIn = currentUser.loggedIn;
    //const hasRole = !roles.length || roles.includes(user.role);
    //const isAuthorized = isLoggedIn && hasRole;

    return isLoggedIn
        ? <>{children}</>
        : <Unauthorized />
}
