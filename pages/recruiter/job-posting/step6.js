import JobPostNavbar from "../../../components/navbars/JobPostNavbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import RecruiterJobSuccessPopup from "../../../components/recuriters/recruiter-job-success-popup";
import NotEnoughCreditPopup from "../../../components/payments/not-enough-credit-popup";
import ReloadCreditPopup from "../../../components/payments/reload-credit-popup";
import ReloadSuccessPopup from "../../../components/payments/reload-success-popup";
import JobCategories from "../../../components/recuriters/job-categories";
import Utils from "../../../Utils";
import Config from "../../../Config";
import ErrorPopup from "../../../components/errorPopup";

export default function () {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessageArray, setErrorMessageArray] = useState([]);

    const [showJobSuccessPopup, setShowJobSuccessPopup] = useState(false);
    const [afterPayment, setAfterPayment] = useState(true);
    const [showNotEnoughCreditPopup, setShowNotEnoughCreditPopup] =
        useState(false);
    const [showReloadCreditPopup, setShowReloadCreditPopup] = useState(false);
    const [showReloadSuccessPopup, setShowReloadSuccessPopup] = useState(false);

    const [localJobPost, setLocalJobPost] = useState({});
    const [jobCategory, setJobCategory] = useState("standard");

    useEffect(() => {
        const theLocalJobPost = Utils.getLocalJobPost();

        console.log("local Job post: ", theLocalJobPost);

        setLocalJobPost(theLocalJobPost);

        const theJobCategory = localStorage.getItem("job_category");

        if (theJobCategory) {
            setJobCategory(theJobCategory);
        }
    }, []);

    const onBack = (e) => {
        e.preventDefault();
        router.back();
    };

    const fileInput = useRef();

    const onUploadFile = () => {
        fileInput.current.click();
    };

    const onNext = (e) => {
        e.preventDefault();

        if (loading) {
            return;
        } else {
            setLoading(true);
        }

        if (!afterPayment) {
            setShowNotEnoughCreditPopup(true);
            return;
        }

        localJobPost.job_category_id = Config.JOB_CATEGORIES[jobCategory].id;

        const JobFormData = new FormData();
        JobFormData.append("job_category_id", localJobPost.job_category_id);
        JobFormData.append("user_id", localJobPost.user_id);
        JobFormData.append("company_industry", localJobPost.company_industry);
        JobFormData.append(
            "company_sub_industry",
            localJobPost.company_sub_industry
        );
        JobFormData.append("title", localJobPost.title);
        JobFormData.append("type", localJobPost.type);
        JobFormData.append("location", localJobPost.location);
        JobFormData.append("description", localJobPost.description);
        JobFormData.append("no_of_hires", 5);
        JobFormData.append("hiring_speed", localJobPost.hiring_speed);
        JobFormData.append("with_resume", localJobPost.with_resume);
        JobFormData.append("apply_method", "email");

        JobFormData.append("communication_preferences", "mobile_no");
        JobFormData.append("job_status", "new");
        JobFormData.append("own_completion", localJobPost.own_completion);
        JobFormData.append(
            "with_recommendation",
            localJobPost.with_recommendation
        );

        JobFormData.append("experience_level", "Minimum 1 year");
        JobFormData.append("salary", "10000");

        console.log("file: ", fileInput.current.files[0]);

        JobFormData.append("skills_assessment", fileInput.current.files[0]);
        console.log(localJobPost);

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.postForm(
                    `${Config.BASE_URL}/jobs`,
                    JobFormData
                );

                console.log("Job Results: ", results);
                setShowJobSuccessPopup(true);
                localStorage.removeItem("job_post");
                setLoading(false);
            } catch (error) {
                console.log("Job Error: ", error);
                setLoading(false);

                try {
                    let errorMessages = [];
                    const errors = error.response.data.data;
                    Object.keys(errors).map((errorKey) => {
                        errors[errorKey].map((error) => {
                            errorMessages.push(error);
                        });
                    });

                    console.log("error Message: ", errorMessages);
                    setErrorMessageArray(errorMessages);
                } catch (error) {
                    console.log("Error Generating Error Message: ", error);
                }

                setShowErrorPopup(true);
            }
        });

        // localStorage.setItem("job_post", JSON.stringify(localJobPost));
    };

    const onChangeJobCategory = (newJobCategory) => {
        setJobCategory(newJobCategory);
    };

    const onClose = () => {
        setShowNotEnoughCreditPopup(false);
        setShowReloadCreditPopup(false);
        setShowReloadSuccessPopup(false);
        setShowErrorPopup(false);
    };

    const onReloadCredit = () => {
        setShowNotEnoughCreditPopup(false);
        setShowReloadCreditPopup(true);
    };

    const onReloaded = () => {
        setShowReloadCreditPopup(false);
        setShowReloadSuccessPopup(true);
    };

    const onAfterPayment = () => {
        console.log("on after payment");
        setShowReloadSuccessPopup(false);
        setAfterPayment(true);
    };

    const onNavigateToStep1 = () => {
        router.push("/recruiter/job-posting/step1");
    };

    const onNavigateToStep2 = () => {
        router.push("/recruiter/job-posting/step2");
    };

    const onNavigateToStep4 = () => {
        router.push("/recruiter/job-posting/step4");
    };

    return (
        <>
            <ErrorPopup
                showPopup={showErrorPopup}
                onClose={onClose}
                messageArray={errorMessageArray}
            />
            <input
                className="hidden"
                type={"file"}
                ref={fileInput}
                onChange={onNext}
            />
            <JobPostNavbar currentStepText={"Step 6 of 6 - Job post review"} />

            <div className="w-3/4 mt-5 mb-10 mx-auto">
                <JobCategories
                    jobCategory={jobCategory}
                    onChangeJobCategory={onChangeJobCategory}
                    showTitle={false}
                />

                <div>
                    <div>
                        <p className="text-lg text-dark-50">Job details</p>
                        <div className="md:grid md:grid-cols-2 w-full">
                            <div>
                                <p className="flex flex-col flex-nowrap justify-start items-start my-3">
                                    <span className="text-dark-50">
                                        Job title
                                    </span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            {localJobPost.title || ""}
                                        </span>
                                        <Image
                                            onClick={onNavigateToStep1}
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1 cursor-pointer"
                                        />
                                    </span>
                                </p>
                                <p className="flex flex-col flex-nowrap justify-start items-start my-3">
                                    <span className="text-dark-50">
                                        Company
                                    </span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            ABC Group LTD
                                        </span>
                                        <Image
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1"
                                        />
                                    </span>
                                </p>
                                <p className="flex flex-col flex-nowrap justify-start items-start my-3">
                                    <span className="text-dark-50">
                                        Industry
                                    </span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            {localJobPost.company_industry ||
                                                ""}
                                        </span>
                                        <Image
                                            onClick={onNavigateToStep1}
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1 cursor-pointer"
                                        />
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p className="flex flex-col flex-nowrap justify-start items-start my-3">
                                    <span className="text-dark-50">
                                        Location
                                    </span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            {localJobPost.location || ""}
                                        </span>
                                        <Image
                                            onClick={onNavigateToStep1}
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1 cursor-pointer"
                                        />
                                    </span>
                                </p>
                                <p className="flex flex-col flex-nowrap justify-start items-start my-3">
                                    <span className="text-dark-50">
                                        Work type
                                    </span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            {localJobPost.type || ""}
                                        </span>
                                        <Image
                                            onClick={onNavigateToStep2}
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1 cursor-pointer"
                                        />
                                    </span>
                                </p>
                                <p className="flex flex-col flex-nowrap justify-start items-start my-3">
                                    <span className="text-dark-50">
                                        Experience
                                    </span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            Minimum 1 year
                                        </span>
                                        <Image
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1"
                                        />
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="flex flex-row flex-nowrap justify-start items-center">
                                <span className="text-dark-50 my-3 text-lg">
                                    Job description
                                </span>
                                <Image
                                    onClick={onNavigateToStep1}
                                    src={"/edit-icon.svg"}
                                    width={18}
                                    height={18}
                                    className="m-1 cursor-pointer"
                                />
                            </p>
                            <p>{localJobPost.description || ""}</p>
                        </div>
                        <div>
                            <p className="flex flex-row flex-nowrap justify-start items-center">
                                <span className="text-dark-50 my-3 text-lg">
                                    Application settings
                                </span>
                            </p>
                            <div className="mb-16">
                                <div>
                                    <p className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-dark-50 my-2">
                                            Apply method
                                        </span>
                                        <Image
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1"
                                        />
                                    </p>
                                    <ul className="text-dark-50 list-disc list-inside ml-3">
                                        <li>Email</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-dark-50 my-2">
                                            Resume required
                                        </span>
                                        <Image
                                            onClick={onNavigateToStep4}
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1 cursor-pointer"
                                        />
                                    </p>
                                    <ul className="text-dark-50 list-disc list-inside ml-3">
                                        <li>
                                            {localJobPost.with_resume
                                                ? "Yes"
                                                : "No"}
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-dark-50 my-2">
                                            Send application updates to
                                        </span>
                                        <Image
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1"
                                        />
                                    </p>
                                    <ul className="text-dark-50 list-disc list-inside ml-3">
                                        <li>email@email.com</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-row flex-wrap justify-center items-center ">
                    <input
                        className="submit-btn-secondary mr-3"
                        value={"Back"}
                        type={"submit"}
                        onClick={onBack}
                    />

                    <button
                        onClick={onUploadFile}
                        className={`submit-btn-left ml-3`}
                        type={"submit"}
                    >
                        {loading && <span className="loader"></span>}
                        {!loading && <span className="">Post a Job</span>}
                    </button>
                </div>
            </div>

            <RecruiterJobSuccessPopup
                showPopup={showJobSuccessPopup}
                onClose={onClose}
            />

            <NotEnoughCreditPopup
                showPopup={showNotEnoughCreditPopup}
                onReloadCredit={onReloadCredit}
                onClose={onClose}
            />

            <ReloadCreditPopup
                showPopup={showReloadCreditPopup}
                onClose={onClose}
                onReloaded={onReloaded}
            />
            <ReloadSuccessPopup
                showPopup={showReloadSuccessPopup}
                onAfterPayment={onAfterPayment}
                onClose={onNext}
            />
            <Footer />
        </>
    );
}
