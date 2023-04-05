import JobPostNavbar from "../../../components/navbars/JobPostNavbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Config from "../../../Config";
import Utils from "../../../Utils";
import JobCategories from "../../../components/recuriters/job-categories";
import ErrorPopup from "../../../components/errorPopup";

export default function () {
    const router = useRouter();

    const [localJobPost, setLocalJobPost] = useState();
    const [activeJobCategoryId, setActiveJobCategoryId] = useState();
    const [withResume, setWithResume] = useState(1);
    const [userEmail, setUserEmail] = useState("");

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");

    useEffect(() => {
        const theLocalJobPost = Utils.getLocalJobPost();

        const email = localStorage.getItem("email");
        setUserEmail(email);

        console.log("local Job post: ", theLocalJobPost);

        setLocalJobPost(theLocalJobPost);

        if (theLocalJobPost.with_resume) {
            setWithResume(theLocalJobPost.with_resume);
        }

        if (theLocalJobPost.send_to_email) {
            setUserEmail(theLocalJobPost.send_to_email);
        }

        setActiveJobCategoryId(theLocalJobPost.job_category_id);
    }, []);

    const onNext = (e) => {
        e.preventDefault();

        localJobPost.job_category_id = activeJobCategoryId;
        localJobPost.with_resume = withResume;
        localJobPost.send_to_email = userEmail;

        console.log(localJobPost);

        localStorage.setItem("job_post", JSON.stringify(localJobPost));
        router.push("/recruiter/job-posting/step5");
    };

    const onChangeJobCategory = (newJobCategoryId) => {
        setActiveJobCategoryId(newJobCategoryId);
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
                currentStepText={"Step 4 of 6 - Application preferences"}
            />

            <div className="w-3/4 mt-5 mb-10 mx-auto">
                <JobCategories
                    activeJobCategoryId={activeJobCategoryId}
                    onChangeJobCategory={onChangeJobCategory}
                    showTitle={false}
                />

                <form className="form">
                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            Would you like candidates to submit a resume?
                        </label>
                        <div
                            onClick={() => {
                                setWithResume("yes");
                            }}
                            className={`flex flex-row flex-nowrap justify-start items-center border border-solid  px-2 rounded-md text-dark-50 mb-8 cursor-pointer
                        ${
                            withResume == "yes"
                                ? "border-primary-70"
                                : "border-my-gray-70"
                        }
                        `}
                        >
                            <p
                                className={`w-4 h-4 rounded-full border border-primary-70
                                ${withResume == "yes" ? "bg-primary-70" : ""}`}
                            ></p>
                            <p className="mx-4 my-1 text-xs">
                                Yes <br />
                                People will be required to submit a resume
                            </p>
                        </div>
                        <div
                            onClick={() => {
                                setWithResume("no");
                            }}
                            className={`flex flex-row flex-nowrap justify-start items-center border border-solid  px-2 rounded-md text-dark-50 mb-8 cursor-pointer
                        ${
                            withResume == "no"
                                ? "border-primary-70"
                                : "border-my-gray-70"
                        }
                        `}
                        >
                            <p
                                className={`w-4 h-4 rounded-full border border-primary-70
                                ${withResume == "no" ? "bg-primary-70" : ""}`}
                            ></p>
                            <p className="mx-4 my-1 text-xs">
                                No
                                <br />
                                People will not be required to submit a resume
                            </p>
                        </div>
                        <div
                            onClick={() => {
                                setWithResume("optional");
                            }}
                            className={`flex flex-row flex-nowrap justify-start items-center border border-solid  px-2 rounded-md text-dark-50 mb-8 cursor-pointer
                            ${
                                withResume == "optional"
                                    ? "border-primary-70"
                                    : "border-my-gray-70"
                            }
                            `}
                        >
                            <p
                                className={`w-4 h-4 rounded-full border border-primary-70
                                    ${
                                        withResume == "optional"
                                            ? "bg-primary-70"
                                            : ""
                                    }`}
                            ></p>
                            <p className="mx-4 my-1 text-xs">
                                Optional <br></br>
                                People have the option of including resume
                            </p>
                        </div>
                    </div>
                    <div className="form-input-container">
                        <label className="form-label-light">
                            Communication Email
                        </label>
                        <p className="text-sm my-2 text-my-gray-70">
                            Receive daily updates about this job and
                            applications at;
                        </p>
                        <input
                            className="form-input"
                            type={"email"}
                            placeholder="test@gmail.com"
                            value={userEmail}
                            onChange={(e) => {
                                const value = e.target.value;
                                setUserEmail(value);
                            }}
                        />
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
