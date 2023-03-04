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
    const [activeJobCategoryId, setActiveJobCategoryId] = useState();
    const [selectedJobType, setSelectedJobType] = useState();
    const [noOfHires, setNoOfHires] = useState();
    const [hireSpeed, setHireSpeed] = useState();
    const [salary, setSalary] = useState();
    const [experienceLevel, setExperienceLevel] = useState();

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const theLocalJobPost = Utils.getLocalJobPost();

        console.log("local Job post: ", theLocalJobPost);

        setLocalJobPost(theLocalJobPost);

        setActiveJobCategoryId(theLocalJobPost.job_category_id);

        setSelectedJobType(theLocalJobPost.type);

        setNoOfHires(theLocalJobPost.no_of_hires);
        setHireSpeed(theLocalJobPost.hiring_speed);
        setSalary(theLocalJobPost.salary);
        setExperienceLevel(theLocalJobPost.experience_level);
    }, []);

    const onNext = async (e) => {
        e.preventDefault();

        setErrors({});

        const hasErrors = handleErrors();

        if (hasErrors) {
            setErrorMessage("Please resolve the errors");
            setShowErrorPopup(true);
            return;
        }

        localJobPost.job_category_id = activeJobCategoryId;

        localJobPost.type = selectedJobType;

        localJobPost.no_of_hires = noOfHires;
        localJobPost.hiring_speed = hireSpeed;
        localJobPost.salary = salary;
        localJobPost.experience_level = experienceLevel;

        console.log(localJobPost);

        localStorage.setItem("job_post", JSON.stringify(localJobPost));

        router.push("/recruiter/job-posting/step3");
    };

    const onChangeJobCategory = (newJobCategoryId) => {
        setActiveJobCategoryId(newJobCategoryId);
    };

    const onBack = (e) => {
        e.preventDefault();
        router.back();
    };

    const handleErrors = () => {
        let hasErrors = false;

        if (!activeJobCategoryId) {
            hasErrors = true;
            setErrors((prevValues) => {
                return {
                    ...prevValues,
                    jobCategory: "Job category is required",
                };
            });
        }

        if (!selectedJobType) {
            hasErrors = true;
            setErrors((prevValues) => {
                return { ...prevValues, jobType: "Job type is required" };
            });
        }

        if (!noOfHires) {
            hasErrors = true;
            setErrors((prevValues) => {
                return { ...prevValues, noOfHires: "No of hires is required" };
            });
        }

        if (!hireSpeed) {
            hasErrors = true;
            setErrors((prevValues) => {
                return { ...prevValues, hireSpeed: "Hire speed is required" };
            });
        }

        if (!salary) {
            hasErrors = true;
            setErrors((prevValues) => {
                return { ...prevValues, salary: "salary is required" };
            });
        }

        if (!experienceLevel) {
            hasErrors = true;
            setErrors((prevValues) => {
                return {
                    ...prevValues,
                    experienceLevel: "Experience level is required",
                };
            });
        }

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
            <JobPostNavbar currentStepText={"Step 2 of 6 - Job type"} />

            <div className="w-3/4 mt-5 mb-10 mx-auto">
                <JobCategories
                    activeJobCategoryId={activeJobCategoryId}
                    onChangeJobCategory={onChangeJobCategory}
                    showTitle={false}
                />
                <p className="text-red-500 text-left py-2 px-4 ">
                    {errors.jobCategory}
                </p>

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
                            <p className="text-red-500 text-left py-2 ">
                                {errors.jobType}
                            </p>
                        </div>
                    </div>

                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            How many people do you want to hire for this job?
                        </label>

                        <input
                            className="form-input"
                            type={"number"}
                            min={1}
                            name="no_of_hires"
                            placeholder="e.g. 5"
                            value={noOfHires}
                            onChange={(e) => {
                                const value = e.target.value;
                                setNoOfHires(value);
                            }}
                        />

                        <p className="text-red-500 text-left py-2 ">
                            {errors.noOfHires}
                        </p>
                    </div>

                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            Salary
                        </label>

                        <input
                            className="form-input"
                            type={"number"}
                            min={1}
                            name="no_of_hires"
                            placeholder="e.g. 10000"
                            value={salary}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSalary(value);
                            }}
                        />

                        <p className="text-red-500 text-left py-2 ">
                            {errors.salary}
                        </p>
                    </div>

                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            Experience level (Years)
                        </label>

                        <input
                            className="form-input"
                            type={"number"}
                            min={1}
                            name="no_of_hires"
                            placeholder="e.g. 3"
                            value={experienceLevel}
                            onChange={(e) => {
                                const value = e.target.value;
                                setExperienceLevel(value);
                            }}
                        />

                        <p className="text-red-500 text-left py-2 ">
                            {errors.experienceLevel}
                        </p>
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
                        <p className="text-red-500 text-left py-2 ">
                            {errors.hireSpeed}
                        </p>
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
