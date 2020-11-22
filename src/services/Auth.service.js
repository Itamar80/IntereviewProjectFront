import HttpService from './HttpService';

export const authService = {
    login,
    signup,
    logout,
}

async function login(creds) {
    const response = await HttpService.post(`login`, creds)
    return response
}
async function signup(creds) {
    const response = await HttpService.post(`signup`, creds)
    return response
}
async function logout(creds) {
    const response = await HttpService.delete(`delete`, creds)
    return response
}