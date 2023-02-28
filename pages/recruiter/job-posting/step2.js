import JobPostNavbar from "../../../components/navbars/JobPostNavbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useRouter } from "next/router";
import JobCategories from "../../../components/recuriters/job-categories";
import { useEffect, useState } from "react";
import Config from "../../../Config";
import { BiPlus } from "react-icons/bi";
import { useRef } from "react";
import ErrorPopup from "../../../components/errorPopup";
import Utils from "../../../Utils";

export default function () {
    const router = useRouter();

    const emptySelectString = "Please Select";

    const [localJobPost, setLocalJobPost] = useState();
    const [jobCategory, setJobCategory] = useState("standard");
    const [selectedJobType, setSelectedJobType] = useState();
    const [noOfHires, setNoOfHires] = useState();
    const [hireSpeed, setHireSpeed] = useState();

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");

    useEffect(() => {
        const theLocalJobPost = Utils.getLocalJobPost();

        console.log("local Job post: ", theLocalJobPost);

        setLocalJobPost(theLocalJobPost);

        const theJobCategory = localStorage.getItem("job_category");

        if (theJobCategory) {
            setJobCategory(theJobCategory);
        }

        setSelectedJobType(theLocalJobPost.type);

        setNoOfHires(theLocalJobPost.no_of_hires);
        setHireSpeed(theLocalJobPost.hiring_speed);
    }, []);

    const onNext = async (e) => {
        e.preventDefault();
        if (!selectedJobType) {
            setErrorMessage("Job Type is Required");
            setShowErrorPopup(true);
            return;
        }

        localJobPost.job_category_id = Config.JOB_CATEGORIES[jobCategory].id;

        localJobPost.type = selectedJobType;

        localJobPost.no_of_hires = noOfHires;
        localJobPost.hiring_speed = hireSpeed;

        localStorage.setItem("job_category", jobCategory);

        console.log(localJobPost);

        localStorage.setItem("job_post", JSON.stringify(localJobPost));

        router.push("/recruiter/job-posting/step3");
    };

    const onChangeJobCategory = (newJobCategory) => {
        setJobCategory(newJobCategory);
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
            <JobPostNavbar currentStepText={"Step 2 of 6 - Job type"} />

            <div className="w-3/4 mt-5 mb-10 mx-auto">
                <JobCategories
                    jobCategory={jobCategory}
                    onChangeJobCategory={onChangeJobCategory}
                    showTitle={false}
                />

                <form className="form">
                    <div className="form-input-container my-5">
                        <label className="form-label-light " for="industry">
                            Please select the job type
                        </label>
                        <div className="my-4 flex">
                            {Config.JOB_TYPES.map((jobType) => {
                                return (
                                    <p
                                        onClick={() => {
                                            setSelectedJobType(jobType);
                                        }}
                                        className={`mx-3 flex flex-row flex-nowrap justify-center items-center p-2 text-primary-70 border border-solid border-primary-2 rounded-10 cursor-pointer
                                    ${
                                        selectedJobType == jobType
                                            ? "bg-primary-60 text-white"
                                            : "bg-white text-primary-70"
                                    }
                                    `}
                                    >
                                        <BiPlus className="text-inherit" />
                                        <span className="text-inherit">
                                            {jobType}
                                        </span>
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            How many people do you want to hire for this job?
                        </label>
                        <select
                            value={noOfHires || emptySelectString}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value == emptySelectString) {
                                    setNoOfHires(null);
                                    return;
                                }
                                setNoOfHires(value);
                            }}
                            className="form-input py=2"
                            name="no_of_hires"
                        >
                            <option value={emptySelectString}>
                                {emptySelectString}
                            </option>
                            {Config.NO_OF_PEOPLE_TO_HIRE.map(
                                (noOfHire, index) => {
                                    return (
                                        <option
                                            key={index}
                                            className="text-sm text-my-gray-70 capitalize"
                                            value={noOfHire}
                                        >
                                            {noOfHire}
                                        </option>
                                    );
                                }
                            )}
                        </select>
                    </div>

                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            How quickly do you want to hire?
                        </label>
                        <select
                            value={hireSpeed || emptySelectString}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value == emptySelectString) {
                                    setHireSpeed(null);
                                    return;
                                }
                                setHireSpeed(value);
                            }}
                            className="form-input"
                            name="hiring_speed"
                        >
                            <option value={emptySelectString}>
                                {emptySelectString}
                            </option>
                            {Config.HIRE_SPEED.map((hirespeed, index) => {
                                return (
                                    <option
                                        key={index}
                                        className="text-sm text-my-gray-70 capitalize"
                                        value={hirespeed}
                                    >
                                        {hirespeed}
                                    </option>
                                );
                            })}
                        </select>
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
