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
import axios from "axios";
import JobTypesSkeletonLoader from "../../../components/skeleton-loaders/job-types-skeleton-loader";
import { AiOutlineMinus } from "react-icons/ai";

export default function () {
    const router = useRouter();

    const emptySelectString = "Please Select";

    const [localJobPost, setLocalJobPost] = useState();
    const [activeJobCategoryId, setActiveJobCategoryId] = useState();
    const [selectedJobType, setSelectedJobType] = useState([]);
    const [noOfHires, setNoOfHires] = useState();
    const [hireSpeed, setHireSpeed] = useState();
    const [salary, setSalary] = useState();
    const [experienceLevel, setExperienceLevel] = useState();

    const [jobTypes, setJobTypes] = useState();
    const [jobTypesLoading, setJobTypesLoading] = useState(false);

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const theLocalJobPost = Utils.getLocalJobPost();

        fetchJobTypes();

        console.log("local Job post: ", theLocalJobPost);

        setLocalJobPost(theLocalJobPost);

        setActiveJobCategoryId(theLocalJobPost.job_category_id);

        // setSelectedJobType(theLocalJobPost.type);

        setNoOfHires(theLocalJobPost.no_of_hires);
        setHireSpeed(theLocalJobPost.hiring_speed);
        setSalary(theLocalJobPost.salary);
        setExperienceLevel(theLocalJobPost.experience_level);
        if (theLocalJobPost.job_type_ids) {
            setSelectedJobType(theLocalJobPost.job_type_ids.split(","));
        }
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

        // localJobPost.type = selectedJobType;

        localJobPost.no_of_hires = noOfHires;
        localJobPost.hiring_speed = hireSpeed;
        localJobPost.salary = salary || null;
        localJobPost.experience_level = experienceLevel;
        localJobPost.job_type_ids = selectedJobType.join(",");

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

        // if (!selectedJobType) {
        //     hasErrors = true;
        //     setErrors((prevValues) => {
        //         return { ...prevValues, jobType: "Job type is required" };
        //     });
        // }

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

        // if (!salary) {
        //     hasErrors = true;
        //     setErrors((prevValues) => {
        //         return { ...prevValues, salary: "salary is required" };
        //     });
        // }

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

    const fetchJobTypes = async () => {
        setJobTypesLoading(true);
        const url = `${Config.API_URL}/job_types`;

        try {
            let jobTypes = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            jobTypes = jobTypes.data.data.data;

            console.log("job types: ", jobTypes);
            setJobTypes(jobTypes);

            setJobTypesLoading(false);
        } catch (error) {
            setJobTypesLoading(false);
            setErrorMessage("Could not resolve job types");
            setShowErrorPopup(true);
            console.log("getting job types error: ", error);
        }
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
                            {jobTypesLoading && <JobTypesSkeletonLoader />}

                            {jobTypes &&
                                !jobTypesLoading &&
                                jobTypes.map((jobType) => {
                                    return (
                                        <p
                                            onClick={() => {
                                                setSelectedJobType(
                                                    (prevValues) => {
                                                        const alreadyExists =
                                                            prevValues.find(
                                                                (id) => {
                                                                    return (
                                                                        id ==
                                                                        jobType.id
                                                                    );
                                                                }
                                                            ) == jobType.id;

                                                        if (alreadyExists) {
                                                            const newValues =
                                                                prevValues.filter(
                                                                    (value) => {
                                                                        return (
                                                                            value !=
                                                                            jobType.id
                                                                        );
                                                                    }
                                                                );

                                                            return newValues;
                                                        } else {
                                                            return [
                                                                ...prevValues,
                                                                jobType.id,
                                                            ];
                                                        }
                                                    }
                                                );
                                            }}
                                            className={`mx-3 flex flex-row flex-nowrap justify-center items-center p-2 text-primary-70 border border-solid border-primary-2 rounded-10 cursor-pointer
                                    ${
                                        selectedJobType.find((id) => {
                                            return id == jobType.id;
                                        }) == jobType.id
                                            ? "bg-primary-60 text-white"
                                            : "bg-white text-primary-70"
                                    }
                                    `}
                                        >
                                            {selectedJobType.find((id) => {
                                                return id == jobType.id;
                                            }) != jobType.id && (
                                                <BiPlus className="text-inherit" />
                                            )}
                                            {selectedJobType.find((id) => {
                                                return id == jobType.id;
                                            }) == jobType.id && (
                                                <AiOutlineMinus className="text-inherit font-semibold pr-1" />
                                            )}
                                            <span className="text-inherit">
                                                {jobType.title}
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
