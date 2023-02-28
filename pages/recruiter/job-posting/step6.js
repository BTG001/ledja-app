import JobPostNavbar from "../../../components/navbars/JobPostNavbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import RecruiterJobSuccessPopup from "../../../components/recuriters/recruiter-job-success-popup";
import NotEnoughCreditPopup from "../../../components/payments/not-enough-credit-popup";
import ReloadCreditPopup from "../../../components/payments/reload-credit-popup";
import ReloadSuccessPopup from "../../../components/payments/reload-success-popup";
import JobCategories from "../../../components/recuriters/job-categories";
import Utils from "../../../Utils";
import Config from "../../../Config";

export default function () {
    const router = useRouter();

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

    const onNext = (e) => {
        e.preventDefault();

        if (!afterPayment) {
            setShowNotEnoughCreditPopup(true);
            return;
        }

        localJobPost.job_category_id = Config.JOB_CATEGORIES[jobCategory].id;

        const JobFormData = new FormData();

        //    JobFormData.append()

        // console.log(localJobPost);

        // localStorage.setItem("job_post", JSON.stringify(localJobPost));

        setShowJobSuccessPopup(true);
    };

    const onChangeJobCategory = (newJobCategory) => {
        setJobCategory(newJobCategory);
    };

    const onClose = () => {
        setShowNotEnoughCreditPopup(false);
        setShowReloadCreditPopup(false);
        setShowReloadSuccessPopup(false);
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
                    <input
                        className="submit-btn-left ml-3"
                        type={"submit"}
                        value="Post a Job"
                        onClick={onNext}
                    />
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
                onClose={onClose}
            />
            <Footer />
        </>
    );
}
