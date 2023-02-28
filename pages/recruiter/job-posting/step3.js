import JobPostNavbar from "../../../components/navbars/JobPostNavbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Utils from "../../../Utils";
import ErrorPopup from "../../../components/errorPopup";

export default function () {
    const router = useRouter();

    const [localJobPost, setLocalJobPost] = useState();
    const [ownCompletion, setOwnCompletion] = useState(false);
    const [withRecommendation, setWithRecommendation] = useState(false);

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");

    useEffect(() => {
        const theLocalJobPost = Utils.getLocalJobPost();

        console.log("local Job POst: ", theLocalJobPost);

        setLocalJobPost(theLocalJobPost);
        if (theLocalJobPost.with_recommendation) {
            setWithRecommendation(theLocalJobPost.withRecommendation);
        }

        if (theLocalJobPost.own_completion) {
            setOwnCompletion(theLocalJobPost.own_completion);
        }
    }, []);

    const onNext = (e) => {
        e.preventDefault();

        if (!withRecommendation && !ownCompletion) {
            setErrorMessage("You must select one option");
            setShowErrorPopup(true);
            return;
        }

        localJobPost.with_recommendation = withRecommendation;
        localJobPost.own_completion = ownCompletion;

        console.log(localJobPost);

        localStorage.setItem("job_post", JSON.stringify(localJobPost));

        router.push("/recruiter/job-posting/step4");
    };

    const onBack = (e) => {
        e.preventDefault();
        router.back();
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
            <JobPostNavbar
                currentStepText={"Step 3 of 6 - Complete job post"}
            />

            <div className="w-3/4 mt-5 mb-10 mx-auto">
                <form className="form">
                    <div className="form-input-container block my-5">
                        <label className="my-3 block" for="industry">
                            How would you like to complete your job posts
                        </label>
                        <div
                            onClick={() => {
                                setOwnCompletion(true);
                                setWithRecommendation(false);
                            }}
                            className={`cursor-pointer flex flex-row flex-nowrap justify-start items-center border border-solid  p-2 rounded-md
                        ${
                            ownCompletion
                                ? "border-primary-70"
                                : "border-my-gray-70"
                        }`}
                        >
                            <p
                                className={`
                            w-4 h-4 rounded-full border border-primary-70
                            ${ownCompletion ? "bg-primary-70" : ""}
                            `}
                            ></p>
                            <p className="m-4">Complete job post on my own</p>
                        </div>
                    </div>
                    <div className="form-input-container my-5">
                        {/* <label className="form-label-light" for="industry">
                            How many people do you want to hire for this job?
                        </label> */}
                        <div
                            onClick={() => {
                                setOwnCompletion(false);
                                setWithRecommendation(true);
                            }}
                            className={`cursor-pointer flex flex-row flex-nowrap justify-start items-center border border-solid  p-2 rounded-md
                        ${
                            withRecommendation
                                ? "border-primary-70"
                                : "border-my-gray-70"
                        }`}
                        >
                            <p
                                className={`w-4 h-4 rounded-full border border-primary-70 mt-1
                                ${withRecommendation ? "bg-primary-70" : ""}
                                `}
                            ></p>
                            <div className="flex flex-col flex-nowrap justify-start items-center p-0 m-0">
                                <p className="mx-4 p-0 my-0">
                                    Complete my job post with recommendations
                                </p>
                                <ul className="list-disc list-inside pl-4 text-sm">
                                    <li>
                                        Options to increase your job post
                                        visibility
                                    </li>
                                    <li>
                                        A tailored job template you can edit
                                    </li>
                                    <li>Suggested job post improvements</li>
                                </ul>
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
                            value="Save and continue"
                            onClick={onNext}
                        />
                    </div>
                </form>
            </div>

            <Footer />
        </>
    );
}
