import { apiClient } from "../../../../helper/request/api_client";
import { ENDPOINT } from "./const";

export const get = (params) => apiClient.get(ENDPOINT, params)
export const post = (body) => apiClient.post(ENDPOINT, body)
export const patch = (body) => apiClient.patch(ENDPOINT, body)
export const deleteMany = (params) => apiClient.delete(ENDPOINT, params)

