import LogoNavbar from "../components/navbars/LogoNavbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import Config from "../Config";
import Utils from "../Utils";
import ErrorPopup from "../components/errorPopup";
import { AuthContext } from "./_app";

export default function EmailReset() {
    const router = useRouter();
    const loginForm = useRef();

    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");
    const auth = useContext(AuthContext);

    const onEmailResetSubmit = async (e) => {
        e.preventDefault();
        console.log("auth: ", auth);
        if (loading) {
            return;
        } else {
            setLoading(true);
        }

        if (!email) {
            setErrorMessage("Email is required");
            setShowErrorPopup(true);
            setLoading(false);
            return;
        }
        const emailResetFormData = new FormData();
        emailResetFormData.append("email", email);
        emailResetFormData.append("link", `${location.origin}/reset-pwd`);

        Utils.makeRequest(async () => {
            try {
                const results = await axios.postForm(
                    `${Config.API_URL}/send_password_reset_mail`,
                    emailResetFormData
                );
                console.log("email reset results: ", results);
                setLoading(false);
                setEmail(null);
                alert("A reset link has been sent to your email");
            } catch (error) {
                console.log("login error: ", error);
                setErrorMessage("Error Sending reset link");
                setShowErrorPopup(true);
                setLoading(false);
            }
        });
    };

    const onClose = () => {
        setShowErrorPopup(false);
    };

    return (
        <>
            <ErrorPopup
                showPopup={showErrorPopup}
                onClose={onClose}
                message={errorMessage}
            />
            <LogoNavbar />
            <p
                className="back-btn"
                onClick={() => {
                    router.back();
                }}
            >
                <Image src="/back-icon.svg" width={6} height={11} />
                <span className="px-4">Back</span>
            </p>
            <div className="w-4/5 md:w-1/2 lg:w-1/3 mx-auto my-5 min-h-80-screen mb-24">
                <h3 className="form-title">Enter Your Email</h3>
                <form className="form" onSubmit={onEmailResetSubmit}>
                    <div className="form-input-container">
                        <label className="form-label">Email Address</label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                setEmail(value);
                            }}
                            value={email || ""}
                            className="form-input"
                            type={"email"}
                            name="email"
                            placeholder="email@example.com"
                            required
                        />
                    </div>

                    <button className={`submit-btn `} type={"submit"}>
                        {loading && <span className="loader"></span>}
                        {!loading && <span className="">Send Email</span>}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}
