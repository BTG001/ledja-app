import JobPostNavbar from "../../../components/navbars/JobPostNavbar";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Config from "../../../Config";
import Utils from "../../../Utils";
import JobCategories from "../../../components/recuriters/job-categories";
import axios from "axios";
import ErrorPopup from "../../../components/errorPopup";

export default function ({ jobCategories }) {
    const router = useRouter();

    const emptySelectString = "Please Select";
    const [localJobPost, setLocalJobPost] = useState();
    const [activeJobCategoryId, setActiveJobCategoryId] = useState();
    const [subIndustries, setSubIndustries] = useState([]);
    const [companyIndustry, setCompanyIndustry] = useState();
    const [companySubIndustry, setcompanySubIndustry] = useState();
    const [jobTitle, setJobTitle] = useState();
    const [jobLocation, setJobLocation] = useState();
    const [jobDescription, setJobDescription] = useState("");
    const [category, setCategory] = useState();
    const [showErrorPopup, setShowErrorPopup] = useState();
    const [errorMessage, setErrorMessage] = useState(" an Error Occured");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const theLocalJobPost = Utils.getLocalJobPost();

        console.log("running post lookup", theLocalJobPost);

        setLocalJobPost(theLocalJobPost);

        setActiveJobCategoryId(theLocalJobPost.job_category_id);

        setCompanyIndustry(theLocalJobPost.company_industry);
        setcompanySubIndustry(theLocalJobPost.company_sub_industry);
        const theIndustry = theLocalJobPost.company_industry;
        if (theIndustry) {
            const subIndustries =
                Config.COMPANY_INDUSTRIES[theIndustry].subIndustries;
            setSubIndustries(subIndustries);
        }
        setJobTitle(theLocalJobPost.title);
        setJobLocation(theLocalJobPost.location);
        setJobDescription(theLocalJobPost.description || "");
        if (theLocalJobPost.category) {
            setCategory(theLocalJobPost.category);
        }
    }, []);

    const onChangeJobCategory = (newJobCategoryId) => {
        setActiveJobCategoryId(newJobCategoryId);
    };

    const updateSubIndustries = (industryKey) => {
        setSubIndustries(Config.COMPANY_INDUSTRIES[industryKey].subIndustries);
    };

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
        localJobPost.company_industry = companyIndustry;
        localJobPost.company_sub_industry = companySubIndustry;
        localJobPost.title = jobTitle;
        localJobPost.location = jobLocation;
        localJobPost.description = jobDescription;
        localJobPost.category = category;

        console.log(localJobPost);

        localStorage.setItem("job_post", JSON.stringify(localJobPost));

        router.push("/recruiter/job-posting/step2");
    };

    const handleErrors = () => {
        let hasErrors = false;
        if (!activeJobCategoryId) {
            hasErrors = true;

            setErrors((previousValues) => {
                return {
                    ...previousValues,
                    jobCategory: "Job category is required",
                };
            });
        }

        if (!companyIndustry) {
            hasErrors = true;
            setErrors((previousValues) => {
                return {
                    ...previousValues,
                    companyIndustry: "Company industry is required",
                };
            });
        }
        if (!companySubIndustry) {
            hasErrors = true;
            setErrors((previousValues) => {
                return {
                    ...previousValues,
                    companySubIndustry: "Company sub industry is required",
                };
            });
        }
        if (!jobTitle) {
            hasErrors = true;
            setErrors((previousValues) => {
                return { ...previousValues, jobTitle: "Job title is required" };
            });
        }

        if (!jobLocation) {
            hasErrors = true;
            setErrors((previousValues) => {
                return {
                    ...previousValues,
                    jobLocation: "Job location is required",
                };
            });
        }

        if (!jobDescription) {
            hasErrors = true;
            setErrors((previousValues) => {
                return {
                    ...previousValues,
                    jobDescription: "Job description is required",
                };
            });
        }

        if (!category) {
            hasErrors = true;
            setErrors((previousValues) => {
                return {
                    ...previousValues,
                    category: "Category is required",
                };
            });
        }

        return hasErrors;
    };

    const onSaveAndExit = (e) => {
        e.preventDefault();
        router.push("/recruiter/job-posting/step1");
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
            <JobPostNavbar currentStepText={"Step 1 of 6 - Job details"} />

            <div className="w-3/4 mt-5 mb-10 mx-auto">
                <JobCategories
                    activeJobCategoryId={activeJobCategoryId}
                    onChangeJobCategory={onChangeJobCategory}
                />
                <p className="text-red-500 text-left py-2 px-4 ">
                    {errors.jobCategory}
                </p>
                <form className="form">
                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="title">
                            Job title
                        </label>

                        <input
                            className="form-input"
                            type={"text"}
                            name="title"
                            placeholder="e.g. Software Developer"
                            value={jobTitle}
                            onChange={(e) => {
                                const value = e.target.value;
                                setJobTitle(value);
                            }}
                        />

                        <p className="text-red-500 text-left py-2 ">
                            {errors.jobTitle}
                        </p>
                    </div>
                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            Your Company’s industry
                        </label>
                        <select
                            value={companyIndustry || emptySelectString}
                            onChange={(e) => {
                                setcompanySubIndustry(null);
                                if (e.target.value == emptySelectString) {
                                    setSubIndustries([]);
                                    setCompanyIndustry(null);

                                    return;
                                }

                                setCompanyIndustry(e.target.value);
                                updateSubIndustries(e.target.value);
                            }}
                            className="form-input"
                            name="company_industry"
                            required
                        >
                            <option value={emptySelectString}>
                                {emptySelectString}
                            </option>
                            {Object.keys(Config.COMPANY_INDUSTRIES).map(
                                (industry, index) => {
                                    return (
                                        <option
                                            key={index}
                                            className="text-sm text-my-gray-70 capitalize"
                                            value={industry}
                                        >
                                            {industry}
                                        </option>
                                    );
                                }
                            )}
                        </select>
                        <p className="text-red-500 text-left py-2 ">
                            {errors.companyIndustry}
                        </p>
                    </div>

                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="sub_industry">
                            Your company’s sub-industry
                        </label>
                        <select
                            className="form-input"
                            name="company_sub_industry"
                            value={companySubIndustry || emptySelectString}
                            onChange={(e) => {
                                if (e.target.value == emptySelectString) {
                                    setcompanySubIndustry(null);
                                    return;
                                }
                                // console.log("new value: ", e.target.value);
                                setcompanySubIndustry(e.target.value);
                            }}
                        >
                            <option value={emptySelectString}>
                                {emptySelectString}
                            </option>
                            {subIndustries.map((sub_industry, index) => {
                                return (
                                    <option
                                        key={index}
                                        className="text-sm text-my-gray-70 capitalize"
                                        value={sub_industry}
                                    >
                                        {sub_industry}
                                    </option>
                                );
                            })}
                        </select>
                        <p className="text-red-500 text-left py-2 ">
                            {errors.companySubIndustry}
                        </p>
                    </div>

                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            Job location
                        </label>
                        {/* <select
                            value={jobLocation || emptySelectString}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value == emptySelectString) {
                                    setJobLocation(null);
                                    return;
                                }
                                setJobLocation(value);
                            }}
                            className="form-input"
                            name="location"
                            required
                        >
                            <option value={emptySelectString}>
                                {emptySelectString}
                            </option>
                            {Config.JOB_LOCATIONS.map((title, index) => {
                                return (
                                    <option
                                        key={index}
                                        className="text-sm text-my-gray-70 capitalize"
                                        value={title}
                                    >
                                        {title}
                                    </option>
                                );
                            })}
                        </select> */}
                        <input
                            value={jobLocation || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value == emptySelectString) {
                                    setJobLocation(null);
                                    return;
                                }
                                setJobLocation(value);
                            }}
                            className="form-input"
                            name="location"
                            type="text"
                            placeholder="Nairobi, Kenya"
                            required
                        />
                        <p className="text-red-500 text-left py-2 ">
                            {errors.jobLocation}
                        </p>
                    </div>
                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            Category
                        </label>
                        <select
                            value={category || emptySelectString}
                            onChange={(e) => {
                                if (e.target.value == emptySelectString) {
                                    setCategory(null);
                                    return;
                                }

                                setCategory(e.target.value);
                            }}
                            className="form-input"
                            name="category"
                            required
                        >
                            <option value={emptySelectString}>
                                {emptySelectString}
                            </option>

                            <option
                                className="text-sm text-my-gray-70 capitalize"
                                value={"Skilled"}
                            >
                                Skilled
                            </option>
                            <option
                                className="text-sm text-my-gray-70 capitalize"
                                value={"Unskilled"}
                            >
                                Unskilled
                            </option>
                        </select>
                        <p className="text-red-500 text-left py-2 ">
                            {errors.category}
                        </p>
                    </div>

                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="company-name">
                            Job description
                        </label>
                        <p className="text-xs my-3">
                            Save time by adding a job description now.
                        </p>

                        <textarea
                            className="form-input"
                            name="description"
                            rows={8}
                            value={jobDescription}
                            placeholder="I need a software developer to..."
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length > 2000) {
                                    return;
                                }
                                setJobDescription(value);
                            }}
                        ></textarea>
                        <p
                            className={`text-right p-2  ${
                                jobDescription.length >= 2000
                                    ? "text-red-400"
                                    : "text-my-gray-70"
                            }`}
                        >
                            {jobDescription.length}/2000
                        </p>
                        <p className="text-red-500 text-left py-2 ">
                            {errors.jobDescription}
                        </p>
                    </div>

                    <div className="w-full flex flex-row flex-wrap justify-center items-center ">
                        <input
                            className="submit-btn-secondary mr-3"
                            value={"Back"}
                            type={"submit"}
                            onClick={onSaveAndExit}
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

// export async function getServerSideProps(context) {
//     const url = `${Config.API_URL}/job_categories`;

//     console.log("token: ", Config.TOKEN);

//     let jobCategories;
//     try {
//         jobCategories = await axios.get(url, {
//             headers: {
//                 Authorization: Config.TOKEN,
//             },
//         });
//         console.log("job categories: ", jobCategories);
//     } catch (error) {
//         console.log("getting job categories error: ", error);
//     }
//     return {
//         props: { jobCategories: jobCategories || null }, // will be passed to the page component as props
//     };
// }
