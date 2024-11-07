import { createContext, useCallback, useContext, useMemo, useState } from "react";
import clienteAxios from "../config/axios";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {


    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('auth') ?? false);
    const [userAuth, setUserAuth] = useState(JSON.parse(localStorage.getItem('user')) ?? {});
 console.log(isAuthenticated);
 

    const login = useCallback(async ( email, password ) => {
        try {
            const { data } = await clienteAxios.post('usuarios/login', { email, password });

            localStorage.setItem('token', data.token); // Guardamos el token en el local storage
            localStorage.setItem('usuario', JSON.stringify(data.usuario)); // Guardamos el usuario en el local storage
            localStorage.setItem('auth', true);
            setIsAuthenticated(true);
            setUserAuth(data.usuario);
        } catch (error) {
            console.log(error)
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
        setIsAuthenticated(false);
        setUserAuth({});
    }, []);

    const value = useMemo(() => ({
        isAuthenticated,
        userAuth,
        login,
        logout,
    }), [isAuthenticated, userAuth, login, logout]);

     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}