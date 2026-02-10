export interface LoginData {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface RegistrationData{
    name: string;
    password: string;
}