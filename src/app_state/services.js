import { apiClient } from '../helper/request/api_client';

const handleLogin = (body) => {
    return apiClient.post(`login`, body);
};

const handleSignOut = (body = {}) => {
    return apiClient.post(`logout`, body);
};

export const authServices = {
    handleLogin,
    handleSignOut
};
