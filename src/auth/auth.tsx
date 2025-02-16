import Cookies from "js-cookie";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext<{
    logOut: () => void
    cookies: {[key: string]: string}
} | null>(null);

export const UserProvider = (props: { children: ReactNode }) => {
    const navigate = useNavigate();

    const logOut = () => {
        Cookies.remove('accessToken', { sameSite: 'lax', secure: false, expires: 365 });
        Cookies.remove('refreshToken', { sameSite: 'lax', secure: false, expires: 365 });
        Cookies.remove('department_id', { sameSite: 'lax', secure: false, expires: 365 });
        navigate('/login');
    };

    const cookies = Cookies.get();

    const value = useMemo(
        () => ({
            cookies,
            logOut: logOut
        }),
        [cookies]
    );

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(UserContext)
};
