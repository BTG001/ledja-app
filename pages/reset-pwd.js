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
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
export default function ResetPassword() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");

    const [errors, setErrors] = useState({});

    const [resetValues, setResetValues] = useState({
        // email: "work.evans020@gmail.com",
        // password: "secret",
        // confirm_password: "secret",
    });

    const [returnMessage, setReturnMessage] = useState("");

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordInputActive, setPasswordInputActive] = useState(false);
    const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
        useState(false);
    const [
        passwordConfirmationInputActive,
        setPasswordConfirmationInputActive,
    ] = useState(false);

    const onResetSubmit = async (e) => {
        e.preventDefault();

        if (loading) {
            return;
        } else {
            setLoading(true);
        }

        const hasErrors = validateValues();
        if (hasErrors) {
            setLoading(false);
            return;
        }

        const passwordResetFormData = new FormData();
        passwordResetFormData.append("email", resetValues.email);
        passwordResetFormData.append("password", resetValues.password);
        passwordResetFormData.append(
            "confirm_password",
            resetValues.confirm_password
        );
        passwordResetFormData.append("code", resetValues.code);

        Utils.makeRequest(async () => {
            try {
                const results = await axios.postForm(
                    `${Config.API_URL}/reset_password`,
                    passwordResetFormData
                );

                console.log("reset results: ", results);

                setLoading(false);

                if (results.data.success) {
                    router.push("/login");
                    setResetValues({});
                }
                setReturnMessage(results.data.message);
            } catch (error) {
                console.log("reset error: ", error);
                setErrorMessage("An Error Occurred While Resetting Password");
                setShowErrorPopup(true);
                setLoading(false);
            }
        });
    };

    const validateValues = () => {
        const theErrors = {};
        let hasErrors = false;

        if (!resetValues.email) {
            theErrors.email = "Email is required";
            hasErrors = true;
        }
        if (!resetValues.password) {
            theErrors.password = "Password is required";
            hasErrors = true;
        }
        if (!resetValues.confirm_password) {
            theErrors.confirm_password = "Password confirmation is required";
            hasErrors = true;
        }

        if (
            resetValues.confirm_password &&
            resetValues.password &&
            resetValues.confirm_password != resetValues.password
        ) {
            theErrors.confirm_password =
                "Password confirmation must match password";
            hasErrors = true;
        }

        if (!resetValues.code) {
            theErrors.code = "The Verification code is required";
            hasErrors = true;
        }

        setErrors(theErrors);
        return hasErrors;
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
                <h3 className="form-title">Reset Your Password</h3>
                <form className="form" onSubmit={onResetSubmit}>
                    <div className="form-input-container">
                        <p className="text-red-500 text-left  ">
                            {returnMessage || ""}
                        </p>
                        <label className="form-label">Email Address</label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                setResetValues((prevValues) => {
                                    return {
                                        ...prevValues,
                                        email: value,
                                    };
                                });
                            }}
                            value={resetValues.email || ""}
                            className="form-input"
                            type={"email"}
                            name="email"
                            placeholder="email@example.com"
                            required
                        />
                        <p className="text-red-500 text-left  ">
                            {errors.email || ""}
                        </p>
                    </div>

                    {/* <div className="form-input-container" required>
                        <label className="form-label">New Password</label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                setResetValues((prevValues) => {
                                    return {
                                        ...prevValues,
                                        password: value,
                                    };
                                });
                            }}
                            value={resetValues.password || ""}
                            className="form-input"
                            type={"password"}
                            name="password"
                            placeholder="6 characters minimum"
                            required
                        />
                        <p className="text-red-500 text-left  ">
                            {errors.password || ""}
                        </p>
                    </div> */}
                    {/* <div className="form-input-container" required>
                        <label className="form-label">
                            Confirm New Password
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                setResetValues((prevValues) => {
                                    return {
                                        ...prevValues,
                                        confirm_password: value,
                                    };
                                });
                            }}
                            value={resetValues.confirm_password || ""}
                            className="form-input"
                            type={"password"}
                            name="confirm_password"
                            placeholder="6 characters minimum"
                            required
                        />
                        <p className="text-red-500 text-left  ">
                            {errors.confirm_password || ""}
                        </p>
                    </div> */}

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
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setResetValues((prevValues) => {
                                        return {
                                            ...prevValues,
                                            password: value,
                                        };
                                    });
                                }}
                                value={resetValues.password || ""}
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
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setResetValues((prevValues) => {
                                        return {
                                            ...prevValues,
                                            confirm_password: value,
                                        };
                                    });
                                }}
                                value={resetValues.confirm_password || ""}
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
                        {/* <p className="text-red-500 my-1 py-1">
                            {errors.c_password || ""}
                        </p> */}
                        <p className="text-red-500 text-left  ">
                            {errors.confirm_password || ""}
                        </p>
                    </div>

                    <div className="form-input-container" required>
                        <label className="form-label">Verification Code</label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                setResetValues((prevValues) => {
                                    return {
                                        ...prevValues,
                                        code: value,
                                    };
                                });
                            }}
                            value={resetValues.code || ""}
                            className="form-input"
                            type={"number"}
                            name="code"
                            placeholder="eg. 52738729"
                            required
                        />
                        <p className="text-red-500 text-left  ">
                            {errors.code || ""}
                        </p>
                    </div>

                    <button className={`submit-btn `} type={"submit"}>
                        {loading && <span className="loader"></span>}
                        {!loading && <span className="">Reset Password</span>}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}
