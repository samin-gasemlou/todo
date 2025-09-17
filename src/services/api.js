import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // آدرس بک‌اند
});

// افزودن توکن به همه درخواست‌ها
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// هندل کردن 401
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/sign-or-register';
    }
    return Promise.reject(error);
  }
);

// ثبت نام
export const registerUser = async (data) => {
  const response = await API.post('/auth/register', data);
  return response.data;
};

// ورود
export const loginUser = async (data) => {
  const response = await API.post('/auth/login', data);
  return response.data;
};

// گرفتن تسک‌ها (بعد از لاگین)
export const getTasks = async (token) => {
  const response = await API.get('/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//افزودن تسک
export const addTask = async (token, title) => {
  console.log('sending title:', title);
  console.log('with token:', token);
  const response = await API.post('/tasks', title);
  return response.data;
};
