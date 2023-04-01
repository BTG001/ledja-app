import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import { useRef } from "react";
import axios from "axios";
import Utils from "../../../Utils";
import Config from "../../../Config";
import { useState } from "react";
import ErrorPopup from "../../../components/errorPopup";
import { BiCloudUpload } from "react-icons/bi";
import { AuthContext } from "../../_app";
import { useContext } from "react";
import AuthenticatedNavbar from "../../../components/navbars/authenticatedNavbar";

export default function RecruiterProfileSetupStep1() {
    const router = useRouter();

    const R_Step1Form = useRef();

    const [loadingNext, setLoadingNext] = useState(false);
    const [loadingExit, setLoadingExit] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");
    const [basicInfos, setBasicInfos] = useState({});
    const recruiterAvatarInput = useRef();
    const companyAvatarInput = useRef();
    const auth = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const onNext = async (e) => {
        e.preventDefault();

        if (loadingNext) {
            return;
        } else {
            setLoadingNext(true);
        }

        const userId = localStorage.getItem("user_id");

        const R_Step1FormData = new FormData(R_Step1Form.current);

        R_Step1FormData.append("user_id", userId);

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.postForm(
                    `${Config.API_URL}/recruiter_basic_infos`,
                    R_Step1FormData
                );

                console.log(results);

                setAvatars(results);

                if (results.data.success) {
                    router.push("/recruiter/profile-setup/step2");
                }
                setLoadingNext(false);
            } catch (error) {
                console.log("step 1 Error: ", error);
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

        const R_Step1FormData = new FormData(R_Step1Form.current);

        R_Step1FormData.append("user_id", userId);

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.postForm(
                    `${Config.API_URL}/recruiter_basic_infos`,
                    R_Step1FormData
                );

                console.log(results);

                setAvatars(results);

                if (results.data.success) {
                    router.push("/recruiter/recruiter-dashboard");
                }
                setLoadingExit(false);
            } catch (error) {
                console.log("step 1 Error: ", error);
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

    const setAvatars = (results) => {
        if (results.data.data.avatar_url) {
            auth.setAuth((prevValues) => {
                return {
                    ...prevValues,
                    avatarURL: results.data.data.avatar_url,
                };
            });

            localStorage.setItem("avatar_url", results.data.data.avatar_url);
        }

        if (results.data.data.company_avatar_url) {
            auth.setAuth((prevValues) => {
                return {
                    ...prevValues,
                    companyAvatarURL: results.data.data.company_avatar_url,
                };
            });

            localStorage.setItem(
                "company_avatar_url",
                results.data.data.company_avatar_url
            );
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
            <div className="w-4/5 md:w-1/2 lg:w-2/5 mx-auto my-5 min-h-80-screen mb-24">
                <h3 className="form-title">Let’s set up your account now!</h3>
                <div className="w-3/4 my-10 mx-auto relative flex flex-row justify-center items-center">
                    <p className="absolute  w-full h-1-px bg-my-gray-50 z-0 "></p>
                    <div className="z-10 flex flex-row justify-between items-center w-full min-w-full">
                        <span className="w-8 h-8 bg-primary-70 text-white flex justify-center items-center rounded-full">
                            1
                        </span>

                        <span className="w-8 h-8 bg-my-gray-50 flex justify-center items-center  rounded-full">
                            2
                        </span>

                        <span className="w-8 h-8 bg-my-gray-50 flex justify-center items-center  rounded-full">
                            3
                        </span>

                        <span className="w-8 h-8 bg-my-gray-50 flex justify-center items-center rounded-full">
                            4
                        </span>
                    </div>
                </div>
                <h3 className="form-label">Basic information</h3>
                <form className="form" onSubmit={onNext} ref={R_Step1Form}>
                    <div className="form-input-container">
                        <label
                            className="form-label-light form-label-required"
                            for="company-name"
                        >
                            Company Name
                        </label>
                        <input
                            className="form-input"
                            type={"text"}
                            placeholder="ABC Company Inc."
                            name="company_name"
                            // value={"ABC Company Inc"}
                            required
                        />
                        <p className="text-red-500">{errors.company_name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="form-input-container">
                            <label
                                className="form-label-light form-label-required"
                                for="industry"
                            >
                                Industry
                            </label>
                            <select
                                className="form-input"
                                name="industry"
                                required
                            >
                                <option value={"Banking"}>Banking</option>
                                <option value={"Industry2"}>Industry2</option>
                            </select>
                            <p className="text-red-500">{errors.industry}</p>
                        </div>

                        <div className="form-input-container">
                            <label
                                className="form-label-light form-label-required"
                                for="headquarter"
                            >
                                Headquarter
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Nairobi, Kenya"
                                name="headquarters"
                                // value={"CBD"}
                                required
                            />
                            <p className="text-red-500">
                                {errors.headquarters}
                            </p>
                        </div>
                    </div>

                    <div className=" md:grid md:grid-cols-2 md:gap-6">
                        <div className="form-input-container">
                            <label
                                className="form-label-light "
                                for="company-size"
                            >
                                Company Size
                            </label>
                            <input
                                className="form-input"
                                type={"number"}
                                placeholder="25 (employees)"
                                name="company_size"
                                // value={"2000"}
                            />
                            <p className="text-red-500">
                                {errors.company_size}
                            </p>
                        </div>

                        <div className="form-input-container">
                            <label className="form-label-light " for="revenue">
                                Revenue
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="2000000"
                                name="revenue"
                                // value={"20000000"}
                            />
                            <p className="text-red-500">{errors.revenue}</p>
                        </div>
                    </div>

                    <div className=" md:grid md:grid-cols-2 md:gap-6">
                        <div className="form-input-container">
                            <label className="form-label-light " for="founded">
                                Founded
                            </label>
                            <input
                                className="form-input"
                                type={"number"}
                                min="1900"
                                max={new Date().getFullYear()}
                                placeholder="2003"
                                name="founded_on"
                                // value={"2001"}
                            />
                            <p className="text-red-500">{errors.founded_on}</p>
                        </div>

                        <div className="form-input-container">
                            <label className="form-label-light " for="revenue">
                                CEO
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Frank Jessy"
                                name="ceo"
                                // value={"Frank Jessy"}
                            />
                            <p className="text-red-500">{errors.ceo}</p>
                        </div>
                    </div>

                    <div className="md:grid md:grid-cols-2 md:gap-1 justify-center items-center ">
                        <div className="form-input-container grid grid-rows-2 justify-center items-center">
                            {basicInfos.avatar && (
                                <div className="w-full m-auto flex justify-center items-center">
                                    <Image
                                        src={URL.createObjectURL(
                                            basicInfos.avatar
                                        )}
                                        className="border border-primary-40 border-solid p-1 m-2"
                                        width={160}
                                        height={120}
                                    />
                                </div>
                            )}

                            <input
                                className="form-input hidden"
                                type={"file"}
                                accept=".png,.jpg,.jpeg"
                                ref={recruiterAvatarInput}
                                name="avatar"
                                onChange={(e) => {
                                    const value = e.target.files[0];

                                    console.log("avatar: ", value);

                                    setBasicInfos((prevValues) => {
                                        return { ...prevValues, avatar: value };
                                    });
                                }}
                            />
                            <p className="text-red-500">{errors.avatar}</p>
                            <div
                                onClick={() => {
                                    recruiterAvatarInput.current.click();
                                }}
                                className="cursor-pointer flex flex-row justify-center items-center bg-primary-70 m-1 rounded-md"
                            >
                                <BiCloudUpload className="text-8xl text-white p-1 m-2" />
                                <span className=" text-white p-1 m-2">
                                    Upload Profile Picture{" "}
                                </span>
                            </div>
                        </div>
                        <div className="form-input-container grid grid-rows-2 justify-center items-center">
                            {basicInfos.companyAvatar && (
                                <div className="w-full m-auto flex justify-center items-center">
                                    <Image
                                        src={URL.createObjectURL(
                                            basicInfos.companyAvatar
                                        )}
                                        className="border border-primary-40 border-solid p-1 m-2"
                                        width={160}
                                        height={120}
                                    />
                                </div>
                            )}

                            <input
                                className="form-input hidden"
                                type={"file"}
                                accept=".png,.jpg,.jpeg"
                                ref={companyAvatarInput}
                                name="company_avatar"
                                onChange={(e) => {
                                    const value = e.target.files[0];

                                    console.log("company avatar: ", value);

                                    setBasicInfos((prevValues) => {
                                        return {
                                            ...prevValues,
                                            companyAvatar: value,
                                        };
                                    });
                                }}
                            />
                            <p className="text-red-500">
                                {errors.company_avatar}
                            </p>
                            <div
                                onClick={() => {
                                    companyAvatarInput.current.click();
                                }}
                                className="cursor-pointer flex flex-row justify-center items-center bg-primary-70 m-1 rounded-md"
                            >
                                <BiCloudUpload className="text-8xl text-white p-1 m-2" />
                                <span className=" text-white p-1 m-2">
                                    Upload Company Profile Picture{" "}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-start">
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
