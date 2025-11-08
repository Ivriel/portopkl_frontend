export interface LoginResponse {
    message:string;
    token:string;
    userData:UserDataResponseLogin;
}

export interface UserDataResponseLogin {
    id:string;
    nama:string;
    email:string;
    role:string;
    avatar:string;
}