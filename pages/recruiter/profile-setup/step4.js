import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import RecruiterProfileSuccessPopup from "../../../components/recuriters/recuiter-profile-success-popup";
import Utils from "../../../Utils";
import Config from "../../../Config";
import ErrorPopup from "../../../components/errorPopup";
import AuthenticatedNavbar from "../../../components/navbars/authenticatedNavbar";

export default function RecruiterProfileSetupStep4() {
    const router = useRouter();

    const R_Step4Form = useRef();

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [loadingNext, setLoadingNext] = useState(false);
    const [loadingExit, setLoadingExit] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");
    const [errors, setErrors] = useState({});

    const onNext = async (e) => {
        e.preventDefault();

        if (loadingNext) {
            return;
        } else {
            setLoadingNext(true);
        }

        const userId = localStorage.getItem("user_id");

        const R_Step4FormData = new FormData(R_Step4Form.current);

        R_Step4FormData.append("user_id", userId);

        const phoneNo = R_Step4FormData.get("phone_no");

        if (!phoneNo || phoneNo.length != 12) {
            setErrorMessage("Invalid Phone Number");
            setShowErrorPopup(true);
            setLoadingNext(false);
            return;
        }

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.postForm(
                    `${Config.API_URL}/about_recruiters`,
                    R_Step4FormData
                );

                console.log("R_step4 results: ", results);

                if (results.data.success) {
                    setShowSuccessPopup(true);
                }

                setLoadingNext(false);
            } catch (error) {
                console.log("step 4 Error: ", error);
                // setErrorMessage(error.message);
                // setShowErrorPopup(true);
                extractErrors(error);
                setLoadingNext(false);
            }
        });
    };

    const onSaveAndExit = (e) => {
        e.preventDefault();
        if (loadingExit) {
            return;
        } else {
            setLoadingExit(true);
        }

        const userId = localStorage.getItem("user_id");

        const R_Step4FormData = new FormData(R_Step4Form.current);

        R_Step4FormData.append("user_id", userId);
        const phoneNo = R_Step4FormData.get("phone_no");

        if (!phoneNo || phoneNo.length != 12) {
            setErrorMessage("Invalid Phone Number");
            setShowErrorPopup(true);
            setLoadingExit(false);
            return;
        }

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.postForm(
                    `${Config.API_URL}/about_recruiters`,
                    R_Step4FormData
                );

                console.log("R_step4 results: ", results);

                if (results.data.success) {
                    router.push("/recruiter/recruiter-dashboard");
                }

                setLoadingExit(false);
            } catch (error) {
                console.log("step 4 Error: ", error);
                // setErrorMessage(error.message);
                // setShowErrorPopup(true);
                extractErrors(error);
                setLoadingExit(false);
            }
        });
    };

    const extractErrors = (error) => {
        try {
            let errorMessages = {};
            const errors = error.response.data.data;

            Object.keys(errors).map((errorKey) => {
                errorMessages[errorKey] = errors[errorKey][0];
            });

            console.log("errors: ", errorMessages);
            setErrors(errorMessages);

            if (errors.length < 1 && error.response.data.error) {
                setErrorMessage(`Unknown Error:  ${error.response.data.error}`);
                setShowErrorPopup(true);
            }
        } catch (error) {
            setErrorMessage(`Unknown Error:  ${error.message}`);
            setShowErrorPopup(true);
            console.log("Error Generating Error Message: ", error);
        }
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
            <AuthenticatedNavbar />
            <p
                className="back-btn"
                onClick={() => {
                    router.back();
                }}
            >
                <Image src="/back-icon.svg" width={6} height={11} />
                <span className="px-4">Back</span>
            </p>
            <div className="w-4/5 md:w-1/2 lg:w-2/5 mx-auto my-5 min-h-80-screen mb-24">
                <h3 className="form-title">Let’s set up your account now!</h3>
                <div className="w-3/4 my-10 mx-auto relative flex flex-row justify-center items-center">
                    <p className="absolute  w-full h-1-px bg-primary-70 z-0 "></p>
                    <div className="z-10 flex flex-row justify-between items-center w-full min-w-full">
                        <span className="w-8 h-8 bg-primary-70 text-white flex justify-center items-center rounded-full">
                            1
                        </span>

                        <span className="w-8 h-8 bg-primary-70 text-white flex justify-center items-center  rounded-full">
                            2
                        </span>

                        <span className="w-8 h-8 bg-primary-70 text-white flex justify-center items-center  rounded-full">
                            3
                        </span>

                        <span className="w-8 h-8 bg-primary-70 text-white flex justify-center items-center rounded-full">
                            4
                        </span>
                    </div>
                </div>
                <h3 className="form-label">Tell me about youtself</h3>
                <form className="form" ref={R_Step4Form}>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="form-input-container">
                            <label
                                className="form-label-light form-label-required"
                                for="firstName"
                            >
                                First Name
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Jennifer"
                                name="fname"
                                // value={"Jennifer"}
                                required
                            />
                            <p className="text-red-500">{errors.fname}</p>
                        </div>

                        <div className="form-input-container">
                            <label
                                className="form-label-light form-label-required"
                                for="lastName"
                            >
                                Last Name
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Smith"
                                name="lname"
                                // value={"Smith"}
                                required
                            />
                            <p className="text-red-500">{errors.lname}</p>
                        </div>
                    </div>
                    {/* 
                    <div className=" md:grid md:grid-cols-2 md:gap-6"> */}
                    <div className="form-input-container">
                        <label
                            className="form-label-light form-label-required"
                            for="text"
                        >
                            Phone Number
                        </label>
                        <input
                            className="form-input"
                            type={"text"}
                            placeholder="254712345678"
                            name="phone_no"
                            required
                        />
                        <p className="text-red-500">{errors.phone_no}</p>
                    </div>

                    {/* <div className="form-input-container">
                            <label
                                className="form-label-light form-label-required"
                                for="email"
                            >
                                Email
                            </label>
                            <input
                                className="form-input"
                                type={"email"}
                                placeholder="Jennifer@abccompany.com"
                                name="email"
                                required
                            />
                        </div> */}
                    {/* </div> */}

                    <div className="form-input-container">
                        <label
                            className="form-label-light form-label-required"
                            for="position-title"
                        >
                            Position / Title
                        </label>
                        <input
                            className="form-input"
                            type={"text"}
                            placeholder="talent acquisition specialist"
                            name="company_position"
                            // value={"COO"}
                            required
                        />
                        <p className="text-red-500">{errors.lname}</p>
                    </div>

                    <div className="form-input-container">
                        <label
                            className="form-label-light form-label-required"
                            for="location"
                        >
                            Location
                        </label>
                        <input
                            className="form-input"
                            type={"text"}
                            name="location"
                            placeholder="Nairobi, Kenya"
                            // value={"Nairobi, Kenya"}
                            required
                        />
                        <p className="text-red-500">{errors.location}</p>
                    </div>
                    <div className="flex flex-row justify-left">
                        <button
                            className="submit-btn-secondary mr-3"
                            type={"submit"}
                            onClick={onSaveAndExit}
                        >
                            {loadingExit && (
                                <span className="loader-secondary"></span>
                            )}
                            {!loadingExit && (
                                <span className="">Save and Exit</span>
                            )}
                        </button>
                        <button
                            className="submit-btn-left ml-3"
                            type={"submit"}
                            onClick={onNext}
                        >
                            {loadingNext && <span className="loader"></span>}
                            {!loadingNext && <span className="">Next</span>}
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
            <RecruiterProfileSuccessPopup
                showPopup={showSuccessPopup}
                onClose={() => {
                    setShowSuccessPopup(false);
                }}
            />
        </>
    );
}
