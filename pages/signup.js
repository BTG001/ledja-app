import LogoNavbar from "../components/navbars/LogoNavbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import Config from "../Config";
import axios from "axios";
import { useState } from "react";
import ErrorPopup from "../components/errorPopup";
import Utils from "../Utils";
import { AuthContext } from "./_app";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function login() {
    const router = useRouter();

    const signupForm = useRef();

    const [loading, setLoading] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordInputActive, setPasswordInputActive] = useState(false);
    const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
        useState(false);
    const [
        passwordConfirmationInputActive,
        setPasswordConfirmationInputActive,
    ] = useState(false);

    const { role } = router.query;
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (!role) {
            router.back();
        }
    }, []);

    const afterSubmit = async (e) => {
        e.preventDefault();

        if (loading) {
            return;
        } else {
            setLoading(true);
        }

        let userTypeID = Config.JOB_SEEKER_USER_TYPE_ID;

        if (role == "recruiter") {
            userTypeID = Config.RECRUITER_USER_TYPE_ID;
        }

        const signupFormData = new FormData(signupForm.current);
        signupFormData.append("user_type_id", userTypeID);

        // const termsOfServiceAgreement = signupFormData.get("terms");

        // console.log("terms of service: ", termsOfServiceAgreement);

        // if (!termsOfServiceAgreement) {
        //     setLoading(false);
        //     setErrorMessage(
        //         "You must agree to our terms of service and privacy policy to proceed"
        //     );
        //     setShowErrorPopup(true);
        //     return;
        // }

        // for (const [key, value] of signupFormData) {
        //     console.log(key, ": ", value);
        // }

        Utils.makeRequest(async () => {
            try {
                axios.defaults.withCredentials = true;
                const results = await axios.postForm(
                    `${Config.API_URL}/register`,
                    signupFormData
                );

                console.log("signup results: ", results);

                localStorage.setItem("token", results.data.data.token);
                localStorage.setItem("email", results.data.data.email);
                localStorage.setItem("user_id", results.data.data.user.id);
                localStorage.setItem(
                    "user_type_id",
                    results.data.data.user.user_type_id
                );

                auth.setAuth((prevValues) => {
                    return {
                        ...prevValues,
                        isLoggedIn: true,
                    };
                });

                if (results.data.success) {
                    if (role == "recruiter") {
                        router.push("/recruiter/profile-setup/step1");
                    } else {
                        router.push("/job-seeker/profile-setup/step1");
                    }
                }
            } catch (error) {
                console.log("Sign up Error: ", error);
                // setErrorMessage("Please resolve the errors");
                // setShowErrorPopup(true);

                try {
                    let errorMessages = {};
                    const errors = error.response.data.data;

                    Object.keys(errors).map((errorKey) => {
                        errorMessages[errorKey] = errors[errorKey][0];
                    });

                    console.log("errors: ", errorMessages);
                    setErrors(errorMessages);

                    if (errors.length < 1 && error.response.data.error) {
                        setErrorMessage(
                            `Unknown Error:  ${error.response.data.error}`
                        );
                        setShowErrorPopup(true);
                    }
                } catch (error) {
                    setErrorMessage(`Unknown Error:  ${error.message}`);
                    setShowErrorPopup(true);
                    console.log("Error Generating Error Message: ", error);
                }
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
                <h3 className="form-title">Create your account</h3>
                <form className="form" onSubmit={afterSubmit} ref={signupForm}>
                    <div className="form-input-container">
                        <label className="form-label">Email Address</label>
                        <input
                            className="form-input"
                            type={"email"}
                            placeholder="email@example.com"
                            name="email"
                            // required
                        />
                        <p className="text-red-500 my-1 py-1">
                            {errors.email || ""}
                        </p>
                    </div>

                    <div className="form-input-container" required>
                        <label className="form-label">Password</label>
                        <div
                            className={` flex justify-between items-center border border-solid px-4 text-dark-50 w-full  py-1 placeholder:text-my-gray-70 placeholder:text-sm rounded-sm mt-3
                        ${
                            passwordInputActive
                                ? "border-primary-70"
                                : "border-my-gray-70"
                        }`}
                        >
                            <input
                                className="outline-none active:outline-none flex-grow"
                                type={!passwordVisible ? "password" : "text"}
                                onFocus={() => {
                                    console.log("input active.......");
                                    setPasswordInputActive(true);
                                }}
                                onBlur={() => {
                                    setPasswordInputActive(false);
                                }}
                                name="password"
                                placeholder="6 characters minimum"
                                required
                            />

                            {passwordVisible && (
                                <AiOutlineEye
                                    onClick={() => {
                                        setPasswordVisible(false);
                                    }}
                                    className="text-2xl p-1"
                                />
                            )}
                            {!passwordVisible && (
                                <AiOutlineEyeInvisible
                                    onClick={() => {
                                        setPasswordVisible(true);
                                    }}
                                    className="text-2xl p-1"
                                />
                            )}
                        </div>
                        <p className="text-red-500 my-1 py-1">
                            {errors.password || ""}
                        </p>
                    </div>

                    <div className="form-input-container" required>
                        <label className="form-label">
                            Password Confirmation
                        </label>
                        <div
                            className={` flex justify-between items-center border border-solid px-4 text-dark-50 w-full  py-1 placeholder:text-my-gray-70 placeholder:text-sm rounded-sm mt-3
                        ${
                            passwordConfirmationInputActive
                                ? "border-primary-70"
                                : "border-my-gray-70"
                        }`}
                        >
                            <input
                                className="outline-none active:outline-none flex-grow"
                                type={
                                    !passwordConfirmationVisible
                                        ? "password"
                                        : "text"
                                }
                                onFocus={() => {
                                    console.log("input active.......");
                                    setPasswordConfirmationInputActive(true);
                                }}
                                onBlur={() => {
                                    setPasswordConfirmationInputActive(false);
                                }}
                                name="c_password"
                                placeholder="6 characters minimum"
                                required
                            />

                            {passwordConfirmationVisible && (
                                <AiOutlineEye
                                    onClick={() => {
                                        setPasswordConfirmationVisible(false);
                                    }}
                                    className="text-2xl p-1"
                                />
                            )}
                            {!passwordConfirmationVisible && (
                                <AiOutlineEyeInvisible
                                    onClick={() => {
                                        setPasswordConfirmationVisible(true);
                                    }}
                                    className="text-2xl p-1"
                                />
                            )}
                        </div>
                        <p className="text-red-500 my-1 py-1">
                            {errors.c_password || ""}
                        </p>
                    </div>

                    <div className="form-input-container mb-8">
                        {/* <input type={"checkbox"} checked name="terms" />{" "} */}
                        <p className="text-xs inline">
                            <span>By signing up, I agree to the</span>{" "}
                            <Link href={"/terms"} className="underline">
                                Terms of Service and Privacy Policy
                            </Link>
                        </p>
                    </div>

                    <button className={`submit-btn `} type={"submit"}>
                        {loading && <span className="loader"></span>}
                        {!loading && <span className="">Sign up</span>}
                    </button>
                </form>
                <p className="text-center">
                    <span className="text-sm text-dark-50 mr-4">
                        Already have an account?
                    </span>
                    <Link href="/login" className="text-sm text-primary-70">
                        login
                    </Link>
                </p>
            </div>
            <Footer />
        </>
    );
}
