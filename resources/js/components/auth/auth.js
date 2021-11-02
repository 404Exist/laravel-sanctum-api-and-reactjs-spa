import axios from 'axios';
export function register(credentials) {
    return new Promise((res, rej) => {
        axios.post('/api/register', credentials)
        .then(response => res(response.data))
        .catch(error => rej(error));
    });
}

export function login(credentials) {
    return new Promise((res, rej) => {
        axios.post('/api/login', credentials)
        .then(response => res(response.data))
        .catch(error => rej(error));
    });
}

export function getLoggedInUser() {
    const userStr = localStorage.getItem('user');

    if (!userStr) return null;

    return JSON.parse(userStr);
}
