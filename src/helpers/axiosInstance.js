import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

let headers = {'Content-Type': 'application/json', Accept: 'application/json'};

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.6:5000/',
  headers,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log('Axios 3');
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      console.log('Axios 2');
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        console.log('Axios 1');
        console.log(error);
        reject(error);
      });
    }

    if (error.response.status === 403) {
      console.log('Axios 403');
    } else {
      return new Promise((resolve, reject) => {
        console.log('Axios 0');
        reject(error);
      });
    }
  },
);

export default axiosInstance;
