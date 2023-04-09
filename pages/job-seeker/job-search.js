import JobSeekerNavbar from "../../components/navbars/JobSeekerNavbar";
import Footer from "../../components/Footer";
import LeftCaretSelect from "../../components/LeftCaretSelect";
import LeftIconLocationInput from "../../components/LeftIconLocationInput";
import LeftIconSearch from "../../components/LeftIconSearch";
import Image from "next/image";
import ApplyPopup from "../../components/job-seekers/apply-popup";
import { useEffect, useState } from "react";
import ApplySuccessPopup from "../../components/job-seekers/apply-success-popup";
import Config from "../../Config";
import Utils from "../../Utils";
import axios from "axios";
import { BsBuilding } from "react-icons/bs";
import ErrorPopup from "../../components/errorPopup";
import SearchJobsJobsSkeletonLoader from "../../components/skeleton-loaders/search-jobs-jobs-loader";
import HasAssessmentPopup from "../../components/job-seekers/has-assessment-popup";
import ComingSoon from "../../components/coming-soon-popup";
import TakeTestPopup from "../../components/job-seekers/take-test-popup";

export default function JobSearch() {
    const [showApplyPopup, setShowApplyPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [activeJob, setActiveJob] = useState({});
    const [activeJobIndex, setActiveJobIndex] = useState(0);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [jobsLoading, setJobsLoading] = useState(true);

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");

    const [showHasAssessmentPopup, setShowHasAssessmentPopup] = useState(false);

    const [showTakeTestPopup, setShowTakeTestPopup] = useState(false);
    const [showComingSoonPopup, setShowComingSoonPopup] = useState(false);

    const [activeAssessmentId, setActiveAssessmentId] = useState();

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        if (activeJob) {
            setActiveAssessmentId(activeJob.skills_assessment_id);
        }
    }, [activeJob]);

    const onApply = (e) => {
        e.preventDefault();

        setShowApplyPopup(true);
    };

    const onSearch = () => {
        setJobsLoading(true);
        if (loading) {
            return;
        } else {
            setLoading(true);
        }

        const filtersFormData = new FormData();
        filtersFormData.append("title", filters.title || "");
        filtersFormData.append("location", filters.location || "");
        filtersFormData.append("type", filters.jobType || "");
        filtersFormData.append("salary", filters.salary || "");
        filtersFormData.append(
            "experience_level",
            filters.experienceLevel || ""
        );
        filtersFormData.append("date_posted", filters.datePosted || "");

        Utils.makeRequest(async () => {
            try {
                const filterURL = `${Config.API_URL}/filter_jobs`;
                let filterResults = await Utils.postForm(
                    filterURL,
                    filtersFormData
                );

                filterResults = filterResults.data.data;

                setJobs(filterResults);

                if (filterResults.length > 0) {
                    console.log("setting active job", filterResults[0]);
                    setActiveJob(filterResults[0]);
                }

                console.log("filter results: ", filterResults);
                setJobsLoading(false);
                setLoading(false);
            } catch (error) {
                console.log("filter Error: ", error);
                setLoading(false);
                setJobsLoading(false);
            }
        });
    };

    async function fetchJobs(url) {
        setJobsLoading(true);
        if (!url) {
            url = `${Config.API_URL}/jobs`;
        }

        try {
            let theJobs = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            theJobs = theJobs.data.data.data;

            setJobs(theJobs);

            if (theJobs.length > 0) {
                setActiveJob(theJobs[0]);
            }

            console.log("user Jobs: ", theJobs);
            setJobsLoading(false);
        } catch (error) {
            setJobsLoading(false);
            console.log("user Jobs request error: ", error);
        }
    }

    const onCloseApplyPopup = () => {
        setShowApplyPopup(false);
    };

    const onSuccessfullApplication = () => {
        setShowApplyPopup(false);

        if (activeJob.skills_assessment_id) {
            setShowHasAssessmentPopup(true);
            return;
        }
        setShowSuccessPopup(true);
    };

    const onFailedApplication = () => {
        setShowApplyPopup(false);
        setErrorMessage("Application Failed");
        setShowErrorPopup(true);
    };

    const onCloseSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    const onCloseError = () => {
        setShowErrorPopup(false);
    };

    const onTakeTestNow = () => {
        setShowHasAssessmentPopup(false);
        setShowTakeTestPopup(true);
    };

    const onTestAssessmentSuccess = () => {
        setShowTakeTestPopup(false);
        setShowSuccessPopup(true);
    };

    const onClose = () => {
        setShowTakeTestPopup(false);
        setShowHasAssessmentPopup(false);
        setShowComingSoonPopup(false);
    };

    return (
        <>
            <ComingSoon showPopup={showComingSoonPopup} onClose={onClose} />
            <TakeTestPopup
                showPopup={showTakeTestPopup}
                onClose={onClose}
                assessmentId={activeJob.skills_assessment_id}
                onSuccess={onTestAssessmentSuccess}
            />
            <ApplyPopup
                showPopup={showApplyPopup}
                onClose={onCloseApplyPopup}
                onSuccess={onSuccessfullApplication}
                onFailure={onFailedApplication}
                jobId={activeJob.id}
                job={activeJob}
            />
            <ApplySuccessPopup
                showPopup={showSuccessPopup}
                onClose={onCloseSuccessPopup}
            />

            <HasAssessmentPopup
                showPopup={showHasAssessmentPopup}
                onClose={onClose}
                onTakeTestNow={onTakeTestNow}
            />

            <ErrorPopup
                showPopup={showErrorPopup}
                onClose={onCloseError}
                message={errorMessage}
            />

            <JobSeekerNavbar active="job-search" />

            <div className="w-4/5 mx-auto my-5">
                <div className="flex flex-row flex-wrap justify-start items-start ">
                    <div>
                        <div className="md:grid grid-cols-2 items-start justify-start gap-4">
                            <LeftIconSearch
                                placeholder={"Job title or keyword"}
                                value={filters.title}
                                onTextChange={(value) => {
                                    setFilters((prevValues) => {
                                        return {
                                            ...prevValues,
                                            title: value,
                                        };
                                    });
                                }}
                            />
                            <LeftIconLocationInput
                                placeholder={"Location"}
                                value={filters.location}
                                onChange={(value) => {
                                    setFilters((prevValues) => {
                                        return {
                                            ...prevValues,
                                            location: value,
                                        };
                                    });
                                }}
                            />
                        </div>

                        <div className="flex flex-row flex-wrap justify-start items-center">
                            {/* <LeftCaretSelect placeholder={"Date posted"} /> */}

                            <input
                                className="border border-solid border-primary-70 outline-none focus:outline focus:border-primary-60 m-2 rounded-md p-2 text-primary-70 placeholder:primary-50"
                                type={"date"}
                                placeholder="Date Posted"
                                value={filters.datePosted}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setFilters((prevValues) => {
                                        return {
                                            ...prevValues,
                                            datePosted: value,
                                        };
                                    });
                                }}
                            />

                            {/* <LeftCaretSelect placeholder={"Salary"} /> */}

                            <input
                                className="border border-solid border-primary-70 outline-none focus:outline focus:border-primary-60 m-2 rounded-md p-2 text-primary-70 placeholder:primary-50"
                                type={"number"}
                                placeholder="Salary e.g. 10000"
                                min={1}
                                value={filters.salary}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setFilters((prevValues) => {
                                        return {
                                            ...prevValues,
                                            salary: value,
                                        };
                                    });
                                }}
                            />

                            <LeftCaretSelect
                                placeholder={"Select Job type"}
                                options={Config.JOB_TYPES}
                                value={filters.jobType}
                                className={
                                    "w-max min-w-50-screen md:min-w-20-screen"
                                }
                                onChangeActiveValue={(value) => {
                                    setFilters((prevValues) => {
                                        return {
                                            ...prevValues,
                                            jobType: value,
                                        };
                                    });
                                }}
                            />
                            {/* <LeftCaretSelect placeholder={"Experience level"} /> */}

                            <input
                                className="border border-solid border-primary-70 outline-none focus:outline focus:border-primary-60 m-2 rounded-md p-2 text-primary-70 placeholder:primary-50"
                                type={"number"}
                                placeholder="Experience Level (Years)"
                                min={0}
                                value={filters.experienceLevel}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setFilters((prevValues) => {
                                        return {
                                            ...prevValues,
                                            experienceLevel: value,
                                        };
                                    });
                                }}
                            />

                            {/* <LeftCaretSelect placeholder={"Other"} /> */}
                        </div>
                    </div>

                    {/* <p
                        onClick={onSearch}
                        className="text-center px-4 py-1 m-2 w-max bg-primary-70 rounded-10 text-white cursor-pointer"
                    >
                        Search
                    </p> */}
                    <button
                        onClick={onSearch}
                        className="submit-btn-left ml-3"
                        type={"submit"}
                    >
                        {loading && <span className="loader"></span>}
                        {!loading && <span className="">Search</span>}
                    </button>
                </div>
            </div>
            <p className="w-full h-1-px bg-my-gray-70 mt-5 mb-8"></p>
            <div className="w-4/5 mx-auto my-5">
                {jobsLoading && <SearchJobsJobsSkeletonLoader />}
                {(!jobs || jobs.length <= 0) && !jobsLoading && (
                    <p className="w-full text-center text-lg">No Jobs Yet!</p>
                )}

                {jobs && jobs.length > 0 && (
                    <>
                        {" "}
                        <p className="text-dark-50 py-3">
                            Recently posted jobs
                        </p>
                        <div className="md:grid md:grid-cols-5  md:border-x md:border-t  md:border-solid border-my-gray-70 min-h-40-screen rounded-sm mb-16">
                            <sidebar className="col-span-2 h-full flex flex-row flex-nowrap overflow-x-auto md:block p-2 pl-0 md:p-0 md:border-b  md:border-solid border-my-gray-70 ">
                                {jobs.map((job, index) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                setActiveJob(job);
                                                setActiveJobIndex(index);
                                            }}
                                            key={index}
                                            className={`min-w-60-screen sm:min-w-40-screen md:min-w-10-screen hover:bg-primary-40 cursor-pointer flex flex-row flex-nowrap justify-start items-center p-2 border md:border-0   border-solid border-my-gray-70 mr-2 md:mr-auto
                                        ${
                                            activeJobIndex == index
                                                ? "bg-my-gray-50"
                                                : ""
                                        }
                                        ${
                                            index < jobs.length - 1
                                                ? "md:border-b"
                                                : ""
                                        }
                                        `}
                                        >
                                            <p className="flex justify-center items-center row-span-3 p-2">
                                                {(!job.user ||
                                                    !job.user
                                                        .basic_info_recruiter ||
                                                    !job.user
                                                        .basic_info_recruiter
                                                        .company_avatar_url) && (
                                                    <BsBuilding className="text-8xl text-center block" />
                                                )}

                                                {job.user &&
                                                    job.user
                                                        .basic_info_recruiter &&
                                                    job.user
                                                        .basic_info_recruiter
                                                        .company_avatar_url && (
                                                        <Image
                                                            src={
                                                                job.user
                                                                    .basic_info_recruiter
                                                                    .company_avatar_url
                                                            }
                                                            width={100}
                                                            height={80}
                                                            className="flex justify-center items-center"
                                                        />
                                                    )}
                                            </p>
                                            <div>
                                                <h3 className="font-medium text-xl mb-1">
                                                    {job.title}
                                                </h3>
                                                <p className="text-sm">
                                                    {job.recruiter_basic_info
                                                        ? job
                                                              .recruiter_basic_info
                                                              .company_name
                                                        : ""}
                                                </p>
                                                <p className="text-sm">
                                                    {job.location}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </sidebar>
                            <section className="col-span-3 p-4 border-l border-t border-b border-r md:border-r-0 md:border-t-0 border-my-gray-70 border-solid">
                                <h3 className="font-medium text-xl">
                                    {activeJob.title || ""}
                                </h3>
                                <p className="text-sm text-my-gray-70">
                                    {activeJob.recruiter_basic_info
                                        ? activeJob.recruiter_basic_info
                                              .company_name
                                        : ""}
                                </p>
                                <p className="text-sm text-my-gray-70 flex flex-row flex-nowrap justify-start items-center">
                                    <Image
                                        className="mr-3"
                                        src="/map-icon.svg"
                                        width={12}
                                        height={15}
                                    />
                                    <span>
                                        {activeJob.location || ""} •{" "}
                                        {activeJob.type || ""}
                                    </span>
                                </p>
                                <p className="text-sm text-my-gray-70 flex flex-row flex-nowrap justify-start items-center">
                                    <Image
                                        className="mr-3"
                                        src="/money-icon.svg"
                                        width={15}
                                        height={11}
                                    />
                                    <span>{activeJob.salary || ""} </span>
                                </p>

                                <div className="flex flex-row flex-wrap justify-start items-center my-3">
                                    <p
                                        className="w-max my-2 mr-4 py-2 px-5 bg-primary-70 text-white rounded-10 cursor-pointer"
                                        onClick={onApply}
                                    >
                                        Apply
                                    </p>
                                    <p
                                        onClick={() => {
                                            setShowComingSoonPopup(true);
                                        }}
                                        className="cursor-pointer w-max my-2 mr-4 py-2 px-5 bg-white text-primary-70 border border-solid border-primary-70 hover:border-primary-60 rounded-10"
                                    >
                                        Save
                                    </p>
                                </div>
                                <p className="text-lg">Job Description</p>
                                <p className="mt-5 mb-12">
                                    {activeJob.description || "No Description"}
                                </p>
                            </section>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </>
    );
}
