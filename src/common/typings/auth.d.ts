import { RouteProps } from "react-router-dom";

export interface AuthState {
    authUser?: User;
    isLoggedIn: boolean;
    isFirstLogin: boolean;
    authError: string;
    authSuccess: string;
}
type UserType = 'admin' | 'user' | any;

export interface ProtectedRouteProps extends RouteProps {
    component: React.ComponentType<any>;
    type: UserType;
}