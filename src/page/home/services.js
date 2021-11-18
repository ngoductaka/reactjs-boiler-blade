import { apiClient } from "../../helper/request/api_client";

export const getUser = () => apiClient.get('/application/getuser');
export const getApplication = () => apiClient.get('/application');
