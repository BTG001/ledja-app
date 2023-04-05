import JobPostNavbar from "../../../components/navbars/JobPostNavbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useRouter } from "next/router";
import Config from "../../../Config";
import { useState, useEffect } from "react";
import JobCategories from "../../../components/recuriters/job-categories";
import Utils from "../../../Utils";
import Switch from "../../../components/switch";
import ErrorPopup from "../../../components/errorPopup";
import LeftCaretSelect from "../../../components/LeftCaretSelect";
import SkillsAssessmentSelect from "../../../components/SkillsAssessmentSelect";

export default function () {
    const router = useRouter();

    const [localJobPost, setLocalJobPost] = useState();
    const [activeJobCategoryId, setActiveJobCategoryId] = useState();
    const [withAssessment, setWithAssessment] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");
    const [selectedAssessment, setSelectedAssessment] = useState();
    const [assessments, setAssessments] = useState([
        { title: "assessment 1", id: 1 },
        { title: "assessment 2", id: 2 },
    ]);

    useEffect(() => {
        const theLocalJobPost = Utils.getLocalJobPost();

        console.log("local Job post: ", theLocalJobPost);

        setLocalJobPost(theLocalJobPost);

        setActiveJobCategoryId(theLocalJobPost.job_category_id);
        if (theLocalJobPost.with_assessment) {
            onChangeWithAssessment(true);
        }
    }, []);

    useEffect(() => {
        if (withAssessment) {
            onChangeWithAssessment(true);
        }
    }, [activeJobCategoryId]);

    const onNext = (e) => {
        e.preventDefault();

        localJobPost.job_category_id = activeJobCategoryId;

        console.log(localJobPost);

        localStorage.setItem("job_post", JSON.stringify(localJobPost));

        router.push("/recruiter/job-posting/step6");
    };

    const onChangeJobCategory = (newJobCategoryId) => {
        setActiveJobCategoryId(newJobCategoryId);
    };

    const onBack = (e) => {
        e.preventDefault();
        router.back();
    };

    const onChangeWithAssessment = (newValue) => {
        if (
            newValue &&
            activeJobCategoryId != Config.JOB_CATEGORIES.premium.id
        ) {
            setWithAssessment(false);
            setErrorMessage("Only premium jobs can have an assessment");
            setShowErrorPopup(true);
            return;
        }
        setWithAssessment(newValue);
    };

    const onClose = () => {
        setShowErrorPopup(false);
    };
    return (
        <>
            <ErrorPopup
                showPopup={showErrorPopup}
                message={errorMessage}
                onClose={onClose}
            />
            <JobPostNavbar
                currentStepText={"Step 5 of 6 - Customize application process"}
            />

            <div className="w-3/4 mt-5 mb-10 mx-auto">
                <JobCategories
                    activeJobCategoryId={activeJobCategoryId}
                    onChangeJobCategory={onChangeJobCategory}
                    showTitle={false}
                />
                <form className="form">
                    <div className="form-input-container mb-5">
                        <label className="form-label-light">
                            Add a skills assessment to the job post
                        </label>

                        <div className="text-sm my-2 text-my-gray-70 border border-solid border-my-gray-70 rounded-sm p-2 ">
                            <p>
                                A skills assessment will help you detemine
                                whether applicants meet your needs.
                                <br /> It significantly increases your chances
                                of finding the right applicant.
                                <br /> This option is available for the premium
                                job selection
                            </p>
                            <div className="flex flex-row flex-nowrap justify-end items-center p-2 ">
                                <span className="text-xs my-1 mx-2 text-my-gray-70   ">
                                    Add a skills assessment for this job
                                </span>
                                {/* <Image
                                    src={"/switch-off-icon.svg"}
                                    width={34}
                                    height={20}
                                /> */}
                                <Switch
                                    on={withAssessment}
                                    onChangeOn={onChangeWithAssessment}
                                />
                            </div>
                        </div>
                        {withAssessment && (
                            <div>
                                <span className=" my-1 text-dark-60 text-lg   ">
                                    Select or add an assessment
                                </span>
                                <div className="flex flex-row flex-wrap-reverse justify-between items-center">
                                    <div className="min-w-50-screen md:min-w-30-screen">
                                        <SkillsAssessmentSelect
                                            placeholder={"Please Select"}
                                            options={assessments}
                                            value={selectedAssessment}
                                            className={"w-full"}
                                            onChangeActiveValue={(value) => {
                                                setSelectedAssessment(value);
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-row flex-nowrap justify-center items-center md:px-4 py-1 cursor-pointer my-5 ">
                                        <Image
                                            src={"/plus-icon.svg"}
                                            width={15}
                                            height={15}
                                            className="m-2"
                                        />
                                        <span className=" text-primary-70">
                                            Add a new assessment
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
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
