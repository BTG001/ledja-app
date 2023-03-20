import LogoNavbar from "../../../components/navbars/LogoNavbar";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Config from "../../../Config";
import Utils from "../../../Utils";
import ErrorPopup from "../../../components/errorPopup";
import { BiCloudUpload } from "react-icons/bi";
import { AuthContext } from "../../_app";
import { useContext } from "react";

export default function JobSeekerProfileSetupStep1() {
    const router = useRouter();

    const [loadingNext, setLoadingNext] = useState(false);
    const [loadingExit, setLoadingExit] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");
    const [basicInfos, setBasicInfos] = useState({
        // firstName: "Jane",
        // lastName: "Doe",
        // phoneNumber: "000-000-000",
        // email: "jane@gmail.com",
        // position: "Recruitment Specialist",
        // location: "Nairobi, Kenya",
    });

    const auth = useContext(AuthContext);

    const userAvatarInput = useRef();

    const [errors, setErrors] = useState({});

    const onNext = (e) => {
        e.preventDefault();

        if (loadingNext) {
            return;
        } else {
            setLoadingNext(true);
        }

        const hasErrors = validateData();

        if (hasErrors) {
            setErrorMessage("Please resolve the errors shown");
            setShowErrorPopup(true);
            setLoadingNext(false);
            return;
        }

        const basicInfosFormData = createFormData();

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.postForm(
                    `${Config.API_URL}/basic_infos`,
                    basicInfosFormData
                );

                console.log(results);

                if (results.data.data.avatar_url) {
                    auth.setAuth((prevValues) => {
                        return {
                            ...prevValues,
                            avatarURL: results.data.data.avatar_url,
                        };
                    });

                    localStorage.setItem(
                        "avatar_url",
                        results.data.data.avatar_url
                    );
                }

                if (results.data.success) {
                    router.push("/job-seeker/profile-setup/step2");
                }
                setLoadingNext(false);
            } catch (error) {
                console.log("step 1 Error: ", error);
                setErrorMessage(error.message);
                setShowErrorPopup(true);
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

        const hasErrors = validateData();

        if (hasErrors) {
            setErrorMessage("Please resolve the errors shown");
            setShowErrorPopup(true);
            setLoadingNext(false);
            return;
        }

        const basicInfosFormData = createFormData();

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.postForm(
                    `${Config.API_URL}/basic_infos`,
                    basicInfosFormData
                );

                console.log("Step 1 results: ", results);

                if (results.data.success) {
                    router.push("/job-seeker/job-search");
                }
                setLoadingExit(false);
            } catch (error) {
                console.log("step 1 Error: ", error);
                setErrorMessage(error.message);
                setShowErrorPopup(true);
                setLoadingExit(false);
            }
        });
    };

    const createFormData = () => {
        const basicInfosFormData = new FormData();

        const userId = localStorage.getItem("user_id");

        basicInfosFormData.append("user_id", userId);
        basicInfosFormData.append("fname", basicInfos.firstName);
        basicInfosFormData.append("lname", basicInfos.lastName);
        basicInfosFormData.append("email", basicInfos.email);
        basicInfosFormData.append("phone_no", basicInfos.phoneNumber);
        basicInfosFormData.append("position", basicInfos.position);
        basicInfosFormData.append("location", basicInfos.location);
        if (basicInfos.avatar) {
            basicInfosFormData.append("avatar", basicInfos.avatar);
        }

        return basicInfosFormData;
    };

    const validateData = () => {
        let hasErrors = false;
        const theErrors = {};

        if (!basicInfos.firstName) {
            hasErrors = true;
            theErrors.firstName = "First Name is Required";
        }
        if (!basicInfos.lastName) {
            hasErrors = true;
            theErrors.lastName = "Last Name is Required";
        }

        if (!basicInfos.phoneNumber) {
            hasErrors = true;
            theErrors.phoneNumber = "Phone Number is Required";
        }

        if (!basicInfos.email) {
            hasErrors = true;
            theErrors.email = "Email is Required";
        }

        if (!basicInfos.position) {
            hasErrors = true;
            theErrors.position = "Position/Title is Required";
        }

        if (!basicInfos.location) {
            hasErrors = true;
            theErrors.location = "Location is Required";
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
                <form className="form">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="form-input-container">
                            <label className="form-label-light form-label-required">
                                First Name
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Jennifer"
                                required
                                value={basicInfos.firstName}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setBasicInfos((prevValues) => {
                                        return {
                                            ...prevValues,
                                            firstName: value,
                                        };
                                    });
                                }}
                            />
                            <p className="text-red-500 text-left py-2 ">
                                {errors.firstName || ""}
                            </p>
                        </div>

                        <div className="form-input-container">
                            <label className="form-label-light form-label-required">
                                Last Name
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Smith"
                                required
                                value={basicInfos.lastName}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setBasicInfos((prevValues) => {
                                        return {
                                            ...prevValues,
                                            lastName: value,
                                        };
                                    });
                                }}
                            />
                            <p className="text-red-500 text-left py-2 ">
                                {errors.lastName || ""}
                            </p>
                        </div>
                    </div>

                    <div className=" md:grid md:grid-cols-2 md:gap-6">
                        <div className="form-input-container">
                            <label className="form-label-light form-label-required">
                                Phone Number
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="000-000-0000"
                                required
                                value={basicInfos.phoneNumber}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setBasicInfos((prevValues) => {
                                        return {
                                            ...prevValues,
                                            phoneNumber: value,
                                        };
                                    });
                                }}
                            />
                            <p className="text-red-500 text-left py-2 ">
                                {errors.phoneNumber || ""}
                            </p>
                        </div>

                        <div className="form-input-container">
                            <label className="form-label-light form-label-required">
                                Email
                            </label>
                            <input
                                className="form-input"
                                type={"email"}
                                placeholder="Jennifer@abccompany.com"
                                required
                                value={basicInfos.email}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setBasicInfos((prevValues) => {
                                        return { ...prevValues, email: value };
                                    });
                                }}
                            />
                            <p className="text-red-500 text-left py-2 ">
                                {errors.email || ""}
                            </p>
                        </div>
                    </div>

                    <div className="form-input-container">
                        <label className="form-label-light form-label-required">
                            Position / Title
                        </label>
                        <input
                            className="form-input"
                            type={"text"}
                            placeholder="talent acquisition specialist"
                            required
                            value={basicInfos.position}
                            onChange={(e) => {
                                const value = e.target.value;

                                setBasicInfos((prevValues) => {
                                    return { ...prevValues, position: value };
                                });
                            }}
                        />
                        <p className="text-red-500 text-left py-2 ">
                            {errors.position || ""}
                        </p>
                    </div>

                    <div className="form-input-container">
                        <label className="form-label-light form-label-required">
                            Location
                        </label>
                        <input
                            className="form-input"
                            type={"text"}
                            placeholder="Nairobi, Kenya"
                            required
                            value={basicInfos.location}
                            onChange={(e) => {
                                const value = e.target.value;

                                setBasicInfos((prevValues) => {
                                    return { ...prevValues, location: value };
                                });
                            }}
                        />
                        <p className="text-red-500 text-left py-2 ">
                            {errors.location || ""}
                        </p>
                    </div>

                    <div className="form-input-container">
                        {basicInfos.avatar && (
                            <Image
                                src={URL.createObjectURL(basicInfos.avatar)}
                                className="border border-primary-40 border-solid p-1 m-2"
                                width={160}
                                height={120}
                            />
                        )}

                        <input
                            className="form-input hidden"
                            type={"file"}
                            accept=".png,.jpg,.jpeg"
                            ref={userAvatarInput}
                            onChange={(e) => {
                                const value = e.target.files[0];

                                console.log("avatar: ", value);

                                setBasicInfos((prevValues) => {
                                    return { ...prevValues, avatar: value };
                                });
                            }}
                        />
                        <div
                            onClick={() => {
                                userAvatarInput.current.click();
                            }}
                            className="cursor-pointer flex flex-row justify-center items-center bg-primary-70 m-1 rounded-sm"
                        >
                            <BiCloudUpload className="text-8xl text-white p-1 m-2" />
                            <span className=" text-white p-1 m-2">
                                Upload Profile Picture{" "}
                            </span>
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
