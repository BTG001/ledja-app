import LogoNavbar from "../../../components/navbars/LogoNavbar";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import JobSeekerProfileSuccessPopup from "../../../components/job-seekers/job-seeker-profile-success-popup";
import Config from "../../../Config";
import Utils from "../../../Utils";
import ErrorPopup from "../../../components/errorPopup";

export default function JobSeekerProfileSetupStep4() {
    const router = useRouter();

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [loadingNext, setLoadingNext] = useState(false);
    const [loadingExit, setLoadingExit] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");

    const [uploadJobs, setUploadJobs] = useState({});

    const uploadJobsForm = useRef();
    const resumeInput = useRef();
    const otherInput = useRef();

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

        const uploadJobsFormData = createFormData();

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.postForm(
                    `${Config.API_URL}/upload_jobs`,
                    uploadJobsFormData
                );

                console.log("step 4 results: ", results);

                setShowSuccessPopup(true);
                setLoadingNext(false);
            } catch (error) {
                console.log("step 4 Error: ", error);
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

        const uploadJobsFormData = createFormData();

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.postForm(
                    `${Config.API_URL}/upload_jobs`,
                    uploadJobsFormData
                );

                console.log("Step 4 results: ", results);

                if (results.data.success) {
                    router.push("/job-seeker/job-search");
                }

                setLoadingExit(false);
            } catch (error) {
                console.log("step 4 Error: ", error);
                setErrorMessage(error.message);
                setShowErrorPopup(true);
                setLoadingExit(false);
            }
        });
    };

    const createFormData = () => {
        const uploadJobsFormData = new FormData(uploadJobsForm.current);

        const userId = localStorage.getItem("user_id");

        uploadJobsFormData.append("user_id", userId);

        return uploadJobsFormData;
    };

    const validateData = () => {
        let hasErrors = false;
        const theErrors = {};

        const uploadJobsFormData = new FormData(uploadJobsForm.current);

        if (!uploadJobs.resume) {
            hasErrors = true;
            theErrors.resume = "Resume is required";
        }

        if (!uploadJobs.others) {
            hasErrors = true;
            theErrors.others = "Certificate and other documents are required";
        }

        setErrors(theErrors);

        return hasErrors;
    };

    const onSelectResume = () => {
        resumeInput.current.click();
    };

    const onSelectOtherFiles = () => {
        otherInput.current.click();
    };

    const onClose = () => {
        setShowErrorPopup(false);
    };

    const displayFile = (file) => {
        if (file.name.endsWith(".pdf")) {
            return (
                <div className="my-2 flex flex-row flex-nowrap justify-start items-center border border-solid border-my-gray-70 rounded-sm ">
                    <span className="p-2 text-xs text-dark-50 bg-my-gray-50 border-r border-solid border-my-gray-70">
                        PDF
                    </span>
                    <span className="text-xs text-dark-50 p-2">
                        {file.name}
                    </span>
                </div>
            );
        } else {
            return (
                <div className="my-2 flex flex-row flex-nowrap justify-start items-center border border-solid border-my-gray-70 rounded-sm ">
                    <span className="p-2 text-xs text-dark-50 bg-my-gray-50 border-r border-solid border-my-gray-70">
                        DOC
                    </span>
                    <span className="text-xs text-dark-50 p-2">
                        {file.name}
                    </span>
                </div>
            );
        }
    };

    const displayOtherfiles = () => {
        for (const file of uploadJobs.others) {
            const displayedFile = displayFile(file);
        }
    };
    return (
        <>
            <ErrorPopup
                showPopup={showErrorPopup}
                onClose={onClose}
                message={errorMessage}
            />
            <JobSeekerProfileSuccessPopup
                showPopup={showSuccessPopup}
                onClose={() => {
                    setShowSuccessPopup(false);
                }}
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

                        <p className="z-0 col-span-2 w-full h-1-px bg-primary-70"></p>

                        <span className="z-10 w-8 h-8 bg-primary-70 text-white flex justify-center items-center rounded-full">
                            4
                        </span>
                    </div>
                </div>
                <h3 className="form-label">Uploads</h3>
                <form
                    className="form"
                    ref={uploadJobsForm}
                    encType="multipart/form-data"
                >
                    <div className="form-input-container">
                        <p className="form-label-light my-2">Resume</p>
                        <input
                            ref={resumeInput}
                            className="hidden"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            type={"file"}
                            onChange={(e) => {
                                const value = e.target.files[0];
                                setUploadJobs((prevValues) => {
                                    return {
                                        ...prevValues,
                                        resume: value,
                                    };
                                });
                            }}
                        />

                        {uploadJobs.resume && displayFile(uploadJobs.resume)}

                        <div
                            onClick={onSelectResume}
                            className={
                                "w-max cursor-pointer mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-sm flex flex-row flex-nowrap justify-start items-center"
                            }
                        >
                            <Image
                                src={"/plus-icon.svg"}
                                width={9}
                                height={9}
                                className="m-2"
                            />
                            <span className="text-xs text-primary-70">
                                Upload resume
                            </span>
                        </div>
                        <p className="text-red-500 text-left py-2 ">
                            {errors.resume || ""}
                        </p>
                    </div>

                    <div className="form-input-container ">
                        <label className="form-label-light">
                            Certificate / Other documents
                        </label>
                        <input
                            ref={otherInput}
                            className="hidden"
                            name="other_docs"
                            accept=".pdf,.doc,.docx"
                            type={"file"}
                            multiple
                            onChange={(e) => {
                                const value = e.target.files;
                                console.log(value);
                                setUploadJobs((prevValues) => {
                                    return {
                                        ...prevValues,
                                        others: value,
                                    };
                                });
                            }}
                        />
                        {uploadJobs.others &&
                            Array.from(uploadJobs.others).map((file) => {
                                return displayFile(file);
                            })}
                        <div
                            onClick={onSelectOtherFiles}
                            className={
                                "w-max cursor-pointer mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-sm flex flex-row flex-nowrap justify-start items-center"
                            }
                        >
                            <Image
                                src={"/plus-icon.svg"}
                                width={9}
                                height={9}
                                className="m-2 "
                            />
                            <span className="text-xs text-primary-70">Add</span>
                        </div>
                        <p className="text-red-500 text-left py-2 ">
                            {errors.others || ""}
                        </p>
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
