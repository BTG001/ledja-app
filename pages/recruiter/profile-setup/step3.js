import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import Utils from "../../../Utils";
import Config from "../../../Config";
import ErrorPopup from "../../../components/errorPopup";
import AuthenticatedNavbar from "../../../components/navbars/authenticatedNavbar";

export default function RecruiterProfileSetupStep3() {
    const router = useRouter();

    const R_Step3Form = useRef();

    const [loadingNext, setLoadingNext] = useState(false);
    const [loadingExit, setLoadingExit] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");

    const [companyCulture, setCompanyCulture] = useState("");
    const [companyIntroduction, setCompanyIntroduction] = useState("");

    const [errors, setErrors] = useState({});

    const onNext = async (e) => {
        e.preventDefault();

        if (loadingNext) {
            return;
        } else {
            setLoadingNext(true);
        }

        const userId = localStorage.getItem("user_id");

        const R_step3FormData = new FormData(R_Step3Form.current);

        R_step3FormData.append("user_id", userId);

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.postForm(
                    `${Config.API_URL}/more_about_recruiters`,
                    R_step3FormData
                );

                console.log("step 3 resulsts: ", results);

                if (results.data.success) {
                    router.push("/recruiter/profile-setup/step4");
                }
                setLoadingNext(false);
            } catch (error) {
                console.log("step 3 Error: ", error);
                // setErrorMessage(error.message);
                // setShowErrorPopup(true);
                extractErrors(error);
                setLoadingNext(false);
            }
        });
    };

    const onClose = () => {
        setShowErrorPopup(false);
    };

    const onSaveAndExit = (e) => {
        e.preventDefault();
        if (loadingExit) {
            return;
        } else {
            setLoadingExit(true);
        }

        const userId = localStorage.getItem("user_id");

        const R_step3FormData = new FormData(R_Step3Form.current);

        R_step3FormData.append("user_id", userId);

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.postForm(
                    `${Config.API_URL}/more_about_recruiters`,
                    R_step3FormData
                );

                console.log("step 3 results: ", results);

                if (results.data.success) {
                    router.push("/recruiter/recruiter-dashboard");
                }
                setLoadingExit(false);
            } catch (error) {
                console.log("step 3 Error: ", error);
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
            <div className="w-4/5 md:w-1/2 lg:w-1/3 mx-auto my-5 min-h-80-screen mb-24">
                <h3 className="form-title">Let’s set up your account now!</h3>
                <div className="w-3/4 my-10 mx-auto relative flex flex-row justify-center items-center">
                    <div className="grid grid-cols-10 gap-0 w-full min-w-full items-center">
                        <span className=" z-10 w-8 h-8 bg-primary-70 text-white flex justify-center items-center rounded-full">
                            1
                        </span>
                        <p className=" z-0 col-span-2 w-full h-1-px bg-primary-70 "></p>

                        <span className="z-10 w-8 h-8 bg-primary-70 text-white flex justify-center items-center  rounded-full">
                            2
                        </span>
                        <p className="z-0 col-span-2 w-full h-1-px bg-primary-70"></p>

                        <span className="z-10 w-8 h-8 bg-primary-70 text-white flex justify-center items-center  rounded-full">
                            3
                        </span>

                        <p className="z-0 col-span-2 w-full h-1-px bg-my-gray-50"></p>

                        <span className="z-10 w-8 h-8 bg-my-gray-50 flex justify-center items-center rounded-full">
                            4
                        </span>
                    </div>
                </div>
                <h3 className="form-label">Tell me more about the company</h3>
                <form className="form" ref={R_Step3Form}>
                    <div className="form-input-container">
                        <label className="form-label-light" for="company-name">
                            Company Introduction
                        </label>

                        <textarea
                            className="form-input"
                            rows={3}
                            name="company_intro"
                            value={companyIntroduction}
                            placeholder="Hi everyone! I’m a recruiter at ABC company...."
                            onChange={(e) => {
                                const value = e.target.value;

                                if (value.length > 2000) {
                                    return;
                                }

                                setCompanyIntroduction(value);
                            }}
                        ></textarea>
                        <p
                            className={`text-right p-2  ${
                                companyIntroduction.length >= 2000
                                    ? "text-red-400"
                                    : "text-my-gray-70"
                            }`}
                        >
                            {companyIntroduction.length}/2000
                        </p>
                        <p className="text-red-500">{errors.company_intro}</p>
                    </div>

                    <div className="form-input-container">
                        <label className="form-label-light" for="company-name">
                            Company Culture
                        </label>

                        <textarea
                            className="form-input"
                            rows={3}
                            name="company_culture"
                            value={companyCulture}
                            placeholder="We offer a collaborative work environment..."
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length > 2000) {
                                    return;
                                }

                                setCompanyCulture(value);
                            }}
                        ></textarea>
                        <p
                            className={`text-right p-2  ${
                                companyCulture.length >= 2000
                                    ? "text-red-400"
                                    : "text-my-gray-70"
                            }`}
                        >
                            {companyCulture.length}/2000
                        </p>
                        <p className="text-red-500">{errors.company_culture}</p>
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
        </>
    );
}
