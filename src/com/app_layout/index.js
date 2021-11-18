import React from 'react';
import { useSelector } from 'react-redux';
import { isLoginSelector } from '../../app_state/login';

const AppLayout = ({ children }) => {
    // 
    const isLogin = useSelector(isLoginSelector);
    if (isLogin) {
        console.log('<auth_layout>')
        return (
            <div className="in-app">{
                children
            }</div>
        )

    } else {
        console.log('<un_auth_layout>')
        return (
            <div className="in-app">{children}</div>
        )

    }

};

export default AppLayout;