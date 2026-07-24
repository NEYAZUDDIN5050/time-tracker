import axiosInstance from './axiosInstance';

export const signupApi = async (data) => {
    const response = await axiosInstance.post('/auth/signup', data);
    return response.data;
};

export const loginApi = async (data) => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
};

export const getMeApi = async () => {
    const response = await axiosInstance.post('/auth/me');
    return response.data;
};
