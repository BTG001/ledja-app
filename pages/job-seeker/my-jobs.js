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
import MyJobsApplicationsSkeleton from "../../components/skeleton-loaders/my-jobs-applications-skeleton-loader";

export default function MyJobs() {
    const [showApplyPopup, setShowApplyPopup] = useState(false);
    // const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    // const [jobs, setJobs] = useState([]);
    // const [activeJob, setActiveJob] = useState({});
    // const [activeJobIndex, setActiveJobIndex] = useState(0);
    // const [filters, setFilters] = useState({});
    // const [loading, setLoading] = useState(false);
    // const [jobsLoading, setJobsLoading] = useState(true);

    const [applications, setApplications] = useState();
    const [activeApplication, setActiveApplication] = useState({});
    const [applicationsLoading, setApplicationsLoading] = useState(false);

    const [activeApplicantId, setActiveApplicantId] = useState();

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");

    // const [showHasAssessmentPopup, setShowHasAssessmentPopup] = useState(false);

    const [showTakeTestPopup, setShowTakeTestPopup] = useState(false);
    const [showComingSoonPopup, setShowComingSoonPopup] = useState(false);

    const [activeAssessmentId, setActiveAssessmentId] = useState();
    const [activeTab, setActiveTab] = useState("applied");

    // useEffect(() => {
    //     fetchJobs();
    // }, []);

    useEffect(() => {
        filterActiveJobApplications();
    }, [activeTab]);

    // useEffect(() => {
    //     if (activeJob) {
    //         setActiveAssessmentId(activeJob.skills_assessment_id);
    //     }
    // }, [activeJob]);

    // const onApply = (e) => {
    //     e.preventDefault();

    //     setShowApplyPopup(true);
    // };

    // const onSearch = () => {
    //     setJobsLoading(true);
    //     if (loading) {
    //         return;
    //     } else {
    //         setLoading(true);
    //     }

    //     const filtersFormData = new FormData();
    //     filtersFormData.append("title", filters.title || "");
    //     filtersFormData.append("location", filters.location || "");
    //     filtersFormData.append("type", filters.jobType || "");
    //     filtersFormData.append("salary", filters.salary || "");
    //     filtersFormData.append(
    //         "experience_level",
    //         filters.experienceLevel || ""
    //     );
    //     filtersFormData.append("date_posted", filters.datePosted || "");

    //     Utils.makeRequest(async () => {
    //         try {
    //             const filterURL = `${Config.API_URL}/filter_jobs`;
    //             let filterResults = await Utils.postForm(
    //                 filterURL,
    //                 filtersFormData
    //             );

    //             filterResults = filterResults.data.data;

    //             setJobs(filterResults);

    //             if (filterResults.length > 0) {
    //                 console.log("setting active job", filterResults[0]);
    //                 setActiveJob(filterResults[0]);
    //             }

    //             console.log("filter results: ", filterResults);
    //             setJobsLoading(false);
    //             setLoading(false);
    //         } catch (error) {
    //             console.log("filter Error: ", error);
    //             setLoading(false);
    //             setJobsLoading(false);
    //         }
    //     });
    // };

    // async function fetchJobs(url) {
    //     setJobsLoading(true);
    //     if (!url) {
    //         url = `${Config.API_URL}/jobs`;
    //     }

    //     try {
    //         let theJobs = await axios.get(url, {
    //             headers: Utils.getHeaders(),
    //         });

    //         theJobs = theJobs.data.data.data;

    //         setJobs(theJobs);

    //         if (theJobs.length > 0) {
    //             setActiveJob(theJobs[0]);
    //         }

    //         console.log("user Jobs: ", theJobs);
    //         setJobsLoading(false);
    //     } catch (error) {
    //         setJobsLoading(false);
    //         console.log("user Jobs request error: ", error);
    //     }
    // }

    // const onCloseApplyPopup = () => {
    //     setShowApplyPopup(false);
    // };

    // const onSuccessfullApplication = () => {
    //     setShowApplyPopup(false);

    //     if (activeJob.skills_assessment_id) {
    //         setShowHasAssessmentPopup(true);
    //         return;
    //     }
    //     setShowSuccessPopup(true);
    // };

    // const onFailedApplication = () => {
    //     setShowApplyPopup(false);
    //     setErrorMessage("Application Failed");
    //     setShowErrorPopup(true);
    // };

    const onCloseSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    const onCloseError = () => {
        setShowErrorPopup(false);
    };

    // const onTakeTestNow = () => {
    //     setShowHasAssessmentPopup(false);
    //     setShowTakeTestPopup(true);
    // };

    const onTestAssessmentSuccess = () => {
        setShowTakeTestPopup(false);
        // setShowSuccessPopup(true);
    };

    const onClose = () => {
        setShowTakeTestPopup(false);
        // setShowHasAssessmentPopup(false);
        setShowComingSoonPopup(false);
    };

    async function filterActiveJobApplications() {
        setApplicationsLoading(true);
        const userId = localStorage.getItem("user_id");
        const url = `${Config.API_URL}/applications/jobseeker/${userId}`;

        const filterApplicationsFormData = new FormData();

        filterApplicationsFormData.append("jobseeker_id", userId);

        if (activeTab == "interview") {
            filterApplicationsFormData.append("status", "contacting");
        }

        Utils.makeRequest(async () => {
            try {
                // let theApplications = await Utils.postForm(
                //     url,
                //     filterApplicationsFormData
                // );

                let theApplications = await Utils.postForm(
                    url,
                    filterApplicationsFormData
                );

                theApplications = theApplications.data.data;
                setApplications(theApplications);

                console.log("Applications: ", theApplications);
                setApplicationsLoading(false);
            } catch (error) {
                setApplicationsLoading(false);
                console.log("Filter Applications error: ", error);
            }
        });
    }

    return (
        <>
            <ComingSoon showPopup={showComingSoonPopup} onClose={onClose} />
            <TakeTestPopup
                showPopup={showTakeTestPopup}
                onClose={onClose}
                assessmentId={activeAssessmentId}
                onSuccess={onTestAssessmentSuccess}
            />
            {/* <ApplyPopup
                showPopup={showApplyPopup}
                onClose={onCloseApplyPopup}
                onSuccess={onSuccessfullApplication}
                onFailure={onFailedApplication}
                jobId={activeJob.id}
                job={activeJob}
            /> */}
            {/* <ApplySuccessPopup
                showPopup={showSuccessPopup}
                onClose={onCloseSuccessPopup}
            /> */}

            {/* <HasAssessmentPopup
                showPopup={showHasAssessmentPopup}
                onClose={onClose}
                onTakeTestNow={onTakeTestNow}
            /> */}

            <ErrorPopup
                showPopup={showErrorPopup}
                onClose={onCloseError}
                message={errorMessage}
            />

            <JobSeekerNavbar active="my-jobs" />

            <div className="w-4/5 md:w-3/4 lg:w-2/3 mx-auto my-5 min-h-70-screen ">
                <p className="flex flex-row justify-start items-center w-full mt-8 mb-5">
                    <span
                        onClick={() => {
                            setShowComingSoonPopup(true);
                            setActiveTab("saved");
                        }}
                        className={`px-6  py-3  mx-3 rounded-3xl cursor-pointer hover:bg-my-gray-50
                    ${activeTab == "saved" ? "bg-my-gray-50" : "bg-white"}`}
                    >
                        Saved Jobs{" "}
                    </span>

                    <span
                        onClick={() => {
                            setActiveTab("applied");
                        }}
                        className={`px-6  py-3 mx-3 rounded-3xl cursor-pointer hover:bg-my-gray-50
                    ${activeTab == "applied" ? "bg-my-gray-50" : "bg-white"}`}
                    >
                        Applied
                    </span>
                    <span
                        onClick={() => {
                            setActiveTab("interview");
                        }}
                        className={`px-6  py-3 mx-3 rounded-3xl cursor-pointer hover:bg-my-gray-50
                    ${activeTab == "interview" ? "bg-my-gray-50" : "bg-white"}`}
                    >
                        Interview
                    </span>
                </p>

                {activeTab == "applied" && applicationsLoading && (
                    <MyJobsApplicationsSkeleton />
                )}

                {activeTab == "applied" &&
                    !applicationsLoading &&
                    !applications && <p>No Applications</p>}

                {(activeTab == "applied" || activeTab == "interview") &&
                    !applicationsLoading &&
                    applications &&
                    applications.length > 0 && (
                        <div className="min-h-30-screen border border-my-gray-70">
                            {applications.map((application, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`p-2 md:grid md:grid-cols-4 md:gap-2 justify-center items-center
                                        ${
                                            index != applications.length - 1
                                                ? "border-b border-my-gray-70"
                                                : ""
                                        }`}
                                    >
                                        <div className="w-full md:flex md:col-span-2">
                                            <p className="flex justify-center items-center row-span-5">
                                                {(!application.recruiter_basic_infos ||
                                                    !application
                                                        .recruiter_basic_infos
                                                        .company_avatar_url) && (
                                                    <BsBuilding className="h-28 text-center block w-full p-2" />
                                                )}

                                                {application.recruiter_basic_infos &&
                                                    application
                                                        .recruiter_basic_infos
                                                        .company_avatar_url && (
                                                        <Image
                                                            src={
                                                                application
                                                                    .recruiter_basic_infos
                                                                    .company_avatar_url
                                                            }
                                                            width={80}
                                                            height={60}
                                                            className="flex justify-center items-center rounded-sm"
                                                        />
                                                    )}
                                            </p>
                                            {/* <p className=" mx-3 w-20 h-16 bg-my-gray-50"></p> */}
                                            <div className="w-full">
                                                <p className="my-2 text-lg font-medium">
                                                    {application.job.title}
                                                </p>
                                                {application.recruiter_basic_infos &&
                                                    application
                                                        .recruiter_basic_infos
                                                        .company_name && (
                                                        <p className="">
                                                            {
                                                                application
                                                                    .recruiter_basic_infos
                                                                    .company_name
                                                            }
                                                        </p>
                                                    )}
                                                <p className="">
                                                    {application.job.location}
                                                </p>
                                                <p className="">
                                                    Applied on{" "}
                                                    {new Date(
                                                        application.created_at
                                                    ).getDate()}{" "}
                                                    {
                                                        Config.MONTH_NAMES[
                                                            new Date(
                                                                application.created_at
                                                            ).getMonth()
                                                        ]
                                                    }{" "}
                                                    {new Date(
                                                        application.created_at
                                                    ).getFullYear()}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="">{application.status}</p>
                                        {application.job
                                            .skills_assessment_id && (
                                            <p
                                                onClick={() => {
                                                    setActiveAssessmentId(
                                                        application.job
                                                            .skills_assessment_id
                                                    );
                                                    setShowTakeTestPopup(true);
                                                }}
                                                className="cursor-pointer text-primary-70 underline"
                                            >
                                                Take test
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
            </div>
            <Footer />
        </>
    );
}
