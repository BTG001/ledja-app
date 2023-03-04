import { createContext, useEffect, useState } from "react";
import CustomHead from "../components/CustomHead";
import "../styles/globals.css";
import Utils from "../Utils";

export const AuthContext = createContext({ isLoggedIn: false });

function MyApp({ Component, pageProps }) {
    const [auth, setAuth] = useState({ isLoggedIn: false });

    useEffect(() => {
        setAuth((prevValues) => {
            return { ...prevValues, isLoggedIn: Utils.isLoggedIn() };
        });
    }, []);
    return (
        <AuthContext.Provider value={{ ...auth, setAuth }}>
            <CustomHead />
            <Component {...pageProps} />
        </AuthContext.Provider>
    );
}

export default MyApp;
