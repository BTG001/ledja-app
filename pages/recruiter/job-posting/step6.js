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
import axios from "axios";

export default function () {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessageArray, setErrorMessageArray] = useState([]);

    const [showJobSuccessPopup, setShowJobSuccessPopup] = useState(false);
    const [showNotEnoughCreditPopup, setShowNotEnoughCreditPopup] =
        useState(false);
    const [showReloadCreditPopup, setShowReloadCreditPopup] = useState(false);
    const [showReloadSuccessPopup, setShowReloadSuccessPopup] = useState(false);
    const [wallet, setWallet] = useState({});
    const [localJobPost, setLocalJobPost] = useState({});
    const [activeJobCategoryId, setActiveJobCategoryId] = useState();
    const [amountReloaded, setAmountReloaded] = useState(0);

    let runnedOnce = false;

    useEffect(() => {
        if (!runnedOnce) {
            runnedOnce = true;
            const theLocalJobPost = Utils.getLocalJobPost();

            console.log("local Job post: ", theLocalJobPost);

            setLocalJobPost(theLocalJobPost);

            fetchRecruiter();

            setActiveJobCategoryId(theLocalJobPost.job_category_id);
        }
    }, []);

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        if (router.query.transaction_id) {
            console.log("query: ", router.query);
            // onVerifyPayment(router.query.transaction_id);
            getUserWallet();
        }
    }, [router.isReady]);

    const onBack = (e) => {
        e.preventDefault();
        router.back();
    };

    // const fileInput = useRef();

    // const onUploadFile = () => {
    //     fileInput.current.click();
    // };

    async function getUserWallet() {
        Utils.makeRequest(async () => {
            try {
                const userId = localStorage.getItem("user_id");
                const url = `${Config.API_URL}/wallets/user/${userId}`;

                let wallet = await axios.get(url, {
                    headers: Utils.getHeaders(),
                });

                wallet = wallet.data.data[0];
                console.log("wallet: ", wallet);
                setWallet(wallet);
                setShowReloadSuccessPopup(true);
            } catch (error) {
                console.log("wallet fetch Error: ", error);
            }
        });
    }

    const onNext = (e) => {
        if (e) {
            e.preventDefault();
        }

        if (loading) {
            return;
        } else {
            setLoading(true);
        }
        console.log("job categories: ", JobCategories);

        const activeCategoryCost = parseInt(
            localStorage.getItem("active_job_category_cost")
        );

        console.log("the wallet: ", wallet);

        if (wallet.amount < activeCategoryCost) {
            setShowNotEnoughCreditPopup(true);
            setLoading(false);
            return;
        }

        localJobPost.job_category_id = activeJobCategoryId;

        const JobFormData = new FormData();
        JobFormData.append("job_category_id", localJobPost.job_category_id);
        const userId = localStorage.getItem("user_id");
        JobFormData.append("user_id", userId);
        JobFormData.append("company_industry", localJobPost.company_industry);
        JobFormData.append(
            "company_sub_industry",
            localJobPost.company_sub_industry
        );
        JobFormData.append("title", localJobPost.title);
        // JobFormData.append("type", localJobPost.type);
        JobFormData.append("location", localJobPost.location);
        JobFormData.append("description", localJobPost.description);
        JobFormData.append("no_of_hires", localJobPost.no_of_hires);
        JobFormData.append("hiring_speed", localJobPost.hiring_speed);
        JobFormData.append("with_resume", localJobPost.with_resume);
        JobFormData.append("apply_method", "email");

        JobFormData.append("communication_preferences", "mobile_no");
        JobFormData.append("job_status", "active");
        JobFormData.append("own_completion", localJobPost.own_completion);
        JobFormData.append(
            "with_recommendation",
            localJobPost.with_recommendation
        );

        JobFormData.append("experience_level", localJobPost.experience_level);

        JobFormData.append("salary", localJobPost.salary || "");
        JobFormData.append("send_to_email", localJobPost.send_to_email);

        JobFormData.append(
            "skills_assessment_id",
            localJobPost.skills_assessment_id || ""
        );

        JobFormData.append("job_type_ids", localJobPost.job_type_ids);

        JobFormData.append("category", localJobPost.category);

        // console.log("file: ", fileInput.current.files[0]);

        // JobFormData.append("skills_assessment", fileInput.current.files[0]);
        console.log(localJobPost);

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.postForm(
                    `${Config.API_URL}/jobs`,
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

    async function fetchRecruiter() {
        try {
            const whenPaymentTheAmount = localStorage.getItem("payment_amount");

            setAmountReloaded(whenPaymentTheAmount);

            const whenPaymentTheAuthorizationId = localStorage.getItem(
                "payment_authorization_id"
            );

            console.log(
                "when payment------",
                "Payment Authorization ID: ",
                whenPaymentTheAuthorizationId,
                "Amount: ",
                whenPaymentTheAmount
            );

            const userId = localStorage.getItem("user_id");
            const url = `${Config.API_URL}/users/${userId}`;

            let recruiter = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            recruiter = recruiter.data.data;

            if (recruiter.wallet) {
                setWallet(recruiter.wallet);

                if (whenPaymentTheAmount && whenPaymentTheAuthorizationId) {
                    onVerifyPayment(whenPaymentTheAuthorizationId);
                }
            }

            console.log("recruiter: ", recruiter);
        } catch (error) {
            console.log("recruiter profile Error: ", error);
        }
    }

    const onVerifyPayment = (paymentId) => {
        setShowReloadSuccessPopup(true);

        Utils.makeRequest(async () => {
            try {
                const url = `${Config.API_URL}/verify_payment/${paymentId}`;

                let verification = await axios.post(
                    url,
                    {},
                    {
                        headers: Utils.getHeaders(),
                    }
                );

                verification = verification.data.data;

                console.log("Verification: ", verification);

                if (!verification.wallet) {
                    setFailedMessage(verification);
                } else {
                    setWallet(verification.wallet);
                    setShowReloadSuccessPopup(true);
                }
            } catch (error) {
                console.log("transaction Error: ", error);
            }
        });
    };

    const onChangeJobCategory = (newJobCategoryId) => {
        setActiveJobCategoryId(newJobCategoryId);
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

    const onReloaded = (wallet, theAmountReloaded) => {
        setWallet(wallet);
        setAmountReloaded(theAmountReloaded);
        setShowReloadCreditPopup(false);
        setShowReloadSuccessPopup(true);
    };

    const onAfterPayment = () => {
        console.log("on after payment");
        setShowReloadSuccessPopup(false);
        localStorage.removeItem("payment_authorization_id");
        localStorage.removeItem("payment_method");
        localStorage.removeItem("payment_amount");

        history.pushState(
            { search: "" },
            "",
            location.origin + location.pathname
        );
        onNext();
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
            <RecruiterJobSuccessPopup
                showPopup={showJobSuccessPopup}
                onClose={onClose}
            />

            <NotEnoughCreditPopup
                showPopup={showNotEnoughCreditPopup}
                onReloadCredit={onReloadCredit}
                onClose={onClose}
                currentAmount={wallet.amount}
            />

            <ReloadCreditPopup
                showPopup={showReloadCreditPopup}
                onClose={onClose}
                onReloaded={onReloaded}
                wallet={wallet}
            />
            <ReloadSuccessPopup
                showPopup={showReloadSuccessPopup}
                onAfterPayment={onAfterPayment}
                balance={wallet.amount}
                amountReloaded={amountReloaded}
            />
            {/* <input
                className="hidden"
                type={"file"}
                ref={fileInput}
                onChange={onNext}
            /> */}
            <JobPostNavbar currentStepText={"Step 6 of 6 - Job post review"} />

            <div className="w-3/4 mt-5 mb-10 mx-auto">
                <JobCategories
                    activeJobCategoryId={activeJobCategoryId}
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
                                {/* <p className="flex flex-col flex-nowrap justify-start items-start my-3">
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
                                </p> */}
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
                                <p className="flex flex-col flex-nowrap justify-start items-start my-3">
                                    <span className="text-dark-50">
                                        Sub Industry
                                    </span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            {localJobPost.company_sub_industry ||
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
                                        Work types
                                    </span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            {localJobPost.job_type_ids || ""}
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
                                            {localJobPost.experience_level}{" "}
                                            Years
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
                                    <span className="text-dark-50">Salary</span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            KSh {localJobPost.salary}
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
                                        {/* <Image
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1"
                                        /> */}
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
                                            onClick={onNavigateToStep4}
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1 cursor-pointer"
                                        />
                                    </p>
                                    <ul className="text-dark-50 list-disc list-inside ml-3">
                                        <li>{localJobPost.send_to_email}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-row flex-wrap justify-center items-center ">
                    <input
                        className="submit-btn-secondary mr-3 cursor-pointer"
                        value={"Back"}
                        type={"submit"}
                        onClick={onBack}
                    />

                    <button
                        onClick={onNext}
                        className={`submit-btn-left ml-3`}
                        type={"submit"}
                    >
                        {loading && <span className="loader"></span>}
                        {!loading && <span className="">Post a Job</span>}
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
}
