import { createContext, useEffect, useState } from "react";
import CustomHead from "../components/CustomHead";
import "../styles/globals.css";
import Utils from "../Utils";

export const AuthContext = createContext({
    isLoggedIn: false,
    avatarURL: null,
    companyAvatarURL: null,
});

function MyApp({ Component, pageProps }) {
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        avatarURL: null,
        companyAvatarURL: null,
    });

    useEffect(() => {
        setAuth((prevValues) => {
            return {
                ...prevValues,
                isLoggedIn: Utils.isLoggedIn(),
                avatarURL: localStorage.getItem("avatar_url"),
                companyAvatarURL: localStorage.getItem("company_avatar_url"),
            };
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
