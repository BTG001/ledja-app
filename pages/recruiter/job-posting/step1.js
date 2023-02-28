import JobPostNavbar from "../../../components/navbars/JobPostNavbar";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Config from "../../../Config";
import Utils from "../../../Utils";
import JobCategories from "../../../components/recuriters/job-categories";

export default function () {
    const router = useRouter();

    const emptySelectString = "Please Select";
    const [localJobPost, setLocalJobPost] = useState();
    const [jobCategory, setJobCategory] = useState("standard");
    const [subIndustries, setSubIndustries] = useState([]);
    const [companyIndustry, setCompanyIndustry] = useState();
    const [companySubIndustry, setcompanySubIndustry] = useState();
    const [jobTitle, setJobTitle] = useState();
    const [jobLocation, setJobLocation] = useState();
    const [jobDescription, setJobDescription] = useState();

    useEffect(() => {
        const theLocalJobPost = Utils.getLocalJobPost();

        console.log("running post lookup", theLocalJobPost);

        setLocalJobPost(theLocalJobPost);

        const tehJobCategory = localStorage.getItem("job_category");

        if (tehJobCategory) {
            setJobCategory(tehJobCategory);
        }

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
        setJobDescription(theLocalJobPost.description);
    }, []);

    const onChangeJobCategory = (newJobCategory) => {
        setJobCategory(newJobCategory);
    };

    const updateSubIndustries = (industryKey) => {
        setSubIndustries(Config.COMPANY_INDUSTRIES[industryKey].subIndustries);
    };

    const onNext = async (e) => {
        e.preventDefault();

        localJobPost.job_category_id = Config.JOB_CATEGORIES[jobCategory].id;
        localJobPost.company_industry = companyIndustry;
        localJobPost.company_sub_industry = companySubIndustry;
        localJobPost.title = jobTitle;
        localJobPost.location = jobLocation;
        localJobPost.description = jobDescription;

        console.log(localJobPost);

        localStorage.setItem("job_category", jobCategory);

        localStorage.setItem("job_post", JSON.stringify(localJobPost));

        router.push("/recruiter/job-posting/step2");
    };

    const onSaveAndExit = (e) => {
        e.preventDefault();
        router.push("/recruiter/job-posting/step1");
    };

    return (
        <>
            <JobPostNavbar currentStepText={"Step 1 of 6 - Job details"} />

            <div className="w-3/4 mt-5 mb-10 mx-auto">
                <JobCategories
                    jobCategory={jobCategory}
                    onChangeJobCategory={onChangeJobCategory}
                />
                <form className="form">
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
                    </div>

                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="title">
                            Job title
                        </label>
                        <select
                            value={jobTitle || emptySelectString}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value == emptySelectString) {
                                    setJobTitle(null);
                                    return;
                                }
                                setJobTitle(value);
                            }}
                            className="form-input"
                            name="title"
                            required
                        >
                            <option value={emptySelectString}>
                                {emptySelectString}
                            </option>
                            {Config.JOB_TITLES.map((title, index) => {
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
                        </select>
                    </div>

                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            Job location
                        </label>
                        <select
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
                        </select>
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
                            onChange={(e) => {
                                setJobDescription(e.target.value);
                            }}
                        >
                            {jobDescription}
                        </textarea>
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
