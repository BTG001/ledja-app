import CustomHead from "../components/CustomHead";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <CustomHead />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
