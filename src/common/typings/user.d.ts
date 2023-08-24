export interface User {
    userName: string;
    password: string;
    type: string;
}
export interface UserAuthData {
    userName: string;
    password: string;
    type: string;
    isFirstLogin: boolean,
    name: string;
}
export interface UserTable {
    key: string;
    date: string;
    status: string;
}