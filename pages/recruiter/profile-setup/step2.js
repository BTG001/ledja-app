import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Utils from "../../../Utils";
import Config from "../../../Config";
import ErrorPopup from "../../../components/errorPopup";
import AuthenticatedNavbar from "../../../components/navbars/authenticatedNavbar";

export default function RecruiterProfileSetupStep2() {
    const router = useRouter();

    const R_Step2Form = useRef();

    const [websiteFocus, setWebsiteFocus] = useState(false);
    const [linkedinFocus, setLinkedinFocus] = useState(false);
    const [twitterFocus, setTwitterFocus] = useState(false);
    const [facebookFocus, setFacebookFocus] = useState(false);

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

        const R_Step2FormData = new FormData(R_Step2Form.current);

        R_Step2FormData.append("user_id", userId);

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.postForm(
                    `${Config.API_URL}/recruiter_links`,
                    R_Step2FormData
                );

                if (results.data.success) {
                    router.push("/recruiter/profile-setup/step3");
                }
                setLoadingNext(false);
            } catch (error) {
                console.log("step 2 Error: ", error);
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

        const R_Step2FormData = new FormData(R_Step2Form.current);

        R_Step2FormData.append("user_id", userId);

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.postForm(
                    `${Config.API_URL}/recruiter_links`,
                    R_Step2FormData
                );

                if (results.data.success) {
                    router.push("/recruiter/recruiter-dashboard");
                }
                setLoadingExit(false);
            } catch (error) {
                console.log("step 2 Error: ", error);
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
                        <p className="z-0 col-span-2 w-full h-1-px bg-my-gray-50"></p>

                        <span className="z-10 w-8 h-8 bg-my-gray-50 flex justify-center items-center  rounded-full">
                            3
                        </span>

                        <p className="z-0 col-span-2 w-full h-1-px bg-my-gray-50"></p>

                        <span className="z-10 w-8 h-8 bg-my-gray-50 flex justify-center items-center rounded-full">
                            4
                        </span>
                    </div>
                </div>
                <h3 className="form-label">Links</h3>
                <form className="form" ref={R_Step2Form}>
                    <div className="form-input-container">
                        <label className="form-label-light" for="websites">
                            Websites
                        </label>
                        <div
                            className={`mt-4 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                websiteFocus
                                    ? "border-primary-70"
                                    : "border-my-gray-70"
                            }`}
                        >
                            <input
                                onFocus={() => setWebsiteFocus(true)}
                                onBlur={() => setWebsiteFocus(false)}
                                className="form-input-with-icon peer"
                                type={"url"}
                                placeholder="https://abccompany.com"
                                // value={"abccompany.com"}
                                name="websites"
                            />
                            <Image
                                src={"/website-icon.svg"}
                                width={17}
                                height={9}
                                className="m-2"
                            />
                        </div>
                        <p className="text-red-500">{errors.websites}</p>
                    </div>

                    <div className="form-input-container">
                        <label className="form-label-light " for="social-media">
                            Social Media
                        </label>
                        <div
                            className={`mt-4 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                linkedinFocus
                                    ? "border-primary-70"
                                    : "border-my-gray-70"
                            }`}
                        >
                            <input
                                onFocus={() => setLinkedinFocus(true)}
                                onBlur={() => setLinkedinFocus(false)}
                                className="form-input-with-icon peer"
                                type={"url"}
                                placeholder="https://linkedin.com/abc"
                                name="linked_in"
                                s
                                // value={"abccompany/linkedin.com"}
                            />
                            <Image
                                src={"/linkedin.svg"}
                                width={14}
                                height={9}
                                className="m-2"
                            />
                        </div>
                        <p className="text-red-500">{errors.linked_in}</p>
                        <div
                            className={`mt-4 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                twitterFocus
                                    ? "border-primary-70"
                                    : "border-my-gray-70"
                            }`}
                        >
                            <input
                                onFocus={() => setTwitterFocus(true)}
                                onBlur={() => setTwitterFocus(false)}
                                className="form-input-with-icon peer"
                                type={"text"}
                                placeholder="https://twitter.com/abc"
                                name="twitter"
                                // value={"abccompany/twitter.com"}
                            />
                            <Image
                                src={"/twitter.svg"}
                                width={13}
                                height={11}
                                className="m-2"
                            />
                        </div>
                        <p className="text-red-500">{errors.twitter}</p>
                        <div
                            className={`mt-4 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                facebookFocus
                                    ? "border-primary-70"
                                    : "border-my-gray-70"
                            }`}
                        >
                            <input
                                onFocus={() => setFacebookFocus(true)}
                                onBlur={() => setFacebookFocus(false)}
                                className="form-input-with-icon peer"
                                type={"text"}
                                placeholder="https://facebook.com/abc"
                                name="facebook"
                                // value={"abccompany/facebook.com"}
                            />
                            <Image
                                src={"/facebook.svg"}
                                width={8}
                                height={6}
                                className="m-2"
                            />
                        </div>
                        <p className="text-red-500">{errors.facebook}</p>
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
