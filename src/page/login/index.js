import React, { useState, useEffect } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox, Image, Row, notification } from "antd";
import { useHistory } from 'react-router-dom';

// import { handleClearAllData, requestSignIn } from "./actions";
import { get } from "lodash";

import { images } from "../../helper/static/images";
import { requestLogin, isLoginSelector } from "../../app_state/login";
import { ROUTES } from "../../config/route";

const { logo, bg } = images;

const SignInPage = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');

    const onLogin = async () => {
        const body = { username, password: pwd };
        const result = await dispatch(requestLogin(body));
        if (result) history.push(`/${ROUTES.HOME}`)
    };

    return (
        <div
            style={{
                height: "100vh",
                alignItems: "center",
                justifyContent: 'center',
                width: "100%",
                display: "flex",
                flexDirection: 'column',
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover'
            }}
        >
            <img src={logo} style={{ height: '140px', width: '300px', zIndex: 1, objectFit: 'contain', marginTop: -250, }} />
            <span style={{ zIndex: 3, fontSize: 28, color: '#fff', fontWeight: 'bold', marginTop: 10 }}>PHẦN MỀM GIÁM SÁT SẢN XUẤT THEO CÔNG ĐOẠN</span>
            <span style={{ zIndex: 3, fontSize: 22, color: '#fff', }}>Tracking Manufacturing Progress</span>
            <div>
                <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', marginTop: 40 }}>
                    <div style={{ width: 130, zIndex: 3, color: '#eee', fontSize: 16 }}>Tên đăng nhập</div>
                    <Input
                        placeholder='Tên đăng nhập'
                        style={{ width: 200 }}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                onLogin()
                            }
                        }}
                    />
                    <span style={{ width: 130 }}></span>
                </div>
                <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', marginTop: 20 }}>
                    <div style={{ width: 130, zIndex: 3, color: '#eee', fontSize: 16 }}>Mật khẩu</div>
                    <Input.Password
                        placeholder='Mật khẩu'
                        style={{ width: 200 }}
                        value={pwd}
                        onChange={e => setPwd(e.target.value)}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                onLogin()
                            }
                        }}
                    />
                    <span style={{ width: 130 }}></span>
                </div>

            </div>
            <Button
                onClick={onLogin}
                style={{ alignSelf: 'center', marginTop: 20, width: 130 }}>Đăng nhập</Button>
        </div>
    );
};

export default SignInPage;
