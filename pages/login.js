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

export default function login() {
    const router = useRouter();
    const loginForm = useRef();

    const [loading, setLoading] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");
    const auth = useContext(AuthContext);

    const onLoginSubmit = async (e) => {
        console.log("auth: ", auth);
        if (loading) {
            return;
        } else {
            setLoading(true);
        }
        const loginFormData = new FormData(loginForm.current);
        e.preventDefault();

        Utils.makeRequest(async () => {
            try {
                const results = await axios.postForm(
                    `${Config.API_URL}/login`,
                    loginFormData
                );
                console.log("login results: ", results);

                if (results.data.success) {
                    localStorage.setItem("token", results.data.data.token);
                    localStorage.setItem("email", results.data.data.email);

                    localStorage.setItem("user_id", results.data.data.user.id);
                    const userTypeId = results.data.data.user.user_type_id;
                    localStorage.setItem("user_type_id", userTypeId);

                    let avatarURL = null;
                    let companyAvatarURL = null;

                    const basicInfos =
                        results.data.data.user.basic_info_jobseeker ||
                        results.data.data.user.basic_info_recruiter;

                    console.log("basic infos", basicInfos);

                    if (basicInfos) {
                        avatarURL = basicInfos.avatar_url;
                        localStorage.setItem("avatar_url", avatarURL);

                        if (basicInfos.company_avatar_url) {
                            companyAvatarURL = basicInfos.company_avatar_url;
                            localStorage.setItem(
                                "company_avatar_url",
                                companyAvatarURL
                            );
                        }
                    }

                    auth.setAuth((prevValues) => {
                        return {
                            ...prevValues,
                            isLoggedIn: true,
                            avatarURL: avatarURL,
                            companyAvatarURL: companyAvatarURL,
                        };
                    });

                    if (userTypeId == Config.JOB_SEEKER_USER_TYPE_ID) {
                        router.push("/job-seeker/job-search");
                    } else if (userTypeId == Config.RECRUITER_USER_TYPE_ID) {
                        router.push("/recruiter/recruiter-dashboard");
                    }
                }

                setLoading(false);
            } catch (error) {
                console.log("login error: ", error);
                setErrorMessage("Incorrect email or password");
                setShowErrorPopup(true);
                setLoading(false);
            }
        });

        // for (const [key, value] of loginFormData) {
        //     console.log(key, ": ", value);
        // }
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
                <h3 className="form-title">Login to LEDJA</h3>
                <form className="form" ref={loginForm} onSubmit={onLoginSubmit}>
                    <div className="form-input-container">
                        <label className="form-label">Email Address</label>
                        <input
                            className="form-input"
                            type={"email"}
                            name="email"
                            placeholder="email@example.com"
                            required
                        />
                    </div>

                    <div className="form-input-container" required>
                        <label className="form-label">Password</label>
                        <input
                            className="form-input"
                            type={"password"}
                            name="password"
                            placeholder="6 characters minimum"
                            required
                        />
                    </div>

                    <button className={`submit-btn `} type={"submit"}>
                        {loading && <span className="loader"></span>}
                        {!loading && <span className="">Login</span>}
                    </button>
                </form>
                <p className="text-center">
                    <span className="text-sm text-dark-50 mr-4">
                        Dont have an account?
                    </span>
                    <Link href="/signup" className="text-sm text-primary-70">
                        Sign up
                    </Link>
                </p>
            </div>
            <Footer />
        </>
    );
}
