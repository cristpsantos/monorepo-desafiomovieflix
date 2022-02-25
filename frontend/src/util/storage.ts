const keyToken = 'authData';

type LoginResponse = {
    access_token: string;
    userId: number;
    userName: string;
};

export const saveAuthData = (obj: LoginResponse) => {
    localStorage.setItem(keyToken, JSON.stringify(obj));
}

export const getAuthData = () => {
    return JSON.parse(localStorage.getItem(keyToken) ?? "{}") as LoginResponse;
}

export const removeAuthData = () => {
    localStorage.removeItem(keyToken);
}