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
import { BsBuilding, BsHourglassSplit } from "react-icons/bs";
import ErrorPopup from "../../components/errorPopup";
import SearchJobsJobsSkeletonLoader from "../../components/skeleton-loaders/search-jobs-jobs-loader";
import HasAssessmentPopup from "../../components/job-seekers/has-assessment-popup";
import ComingSoon from "../../components/coming-soon-popup";
import TakeTestPopup from "../../components/job-seekers/take-test-popup";
import MyJobsApplicationsSkeleton from "../../components/skeleton-loaders/my-jobs-applications-skeleton-loader";
import { MdWorkOutline } from "react-icons/md";
import Pagination from "../../components/pagination";

export default function MyJobs() {
    const [showApplyPopup, setShowApplyPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [activeJob, setActiveJob] = useState({});
    const [activeJobIndex, setActiveJobIndex] = useState(0);
    // const [filters, setFilters] = useState({});
    // const [loading, setLoading] = useState(false);
    const [jobsLoading, setJobsLoading] = useState(true);

    const [applications, setApplications] = useState();
    const [activeApplication, setActiveApplication] = useState({});
    const [applicationsLoading, setApplicationsLoading] = useState(false);

    const [activeApplicantId, setActiveApplicantId] = useState();

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error Occured");

    const [showHasAssessmentPopup, setShowHasAssessmentPopup] = useState(false);

    const [showTakeTestPopup, setShowTakeTestPopup] = useState(false);
    const [showComingSoonPopup, setShowComingSoonPopup] = useState(false);

    const [activeAssessmentId, setActiveAssessmentId] = useState();
    const [activeTab, setActiveTab] = useState("applied");

    const [paginationData, setPaginationData] = useState({});
    const [appliedPaginationData, setAppliedPaginationData] = useState({});

    const [unSaveLoading, setUnSaveLoading] = useState(false);

    useEffect(() => {
        if (activeTab == "saved") {
            fetchSavedJobs();
        } else {
            filterActiveJobApplications();
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeJob) {
            setActiveAssessmentId(activeJob.skills_assessment_id);
        }
    }, [activeJob]);

    const onApply = (e) => {
        e.preventDefault();

        setShowApplyPopup(true);
    };

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
        filterActiveJobApplications();
        // setShowSuccessPopup(true);
    };

    const onChangePage = (newPageURL) => {
        fetchSavedJobs(newPageURL);
    };

    const onChangeAppliedJobsPage = (newPageURL) => {
        filterActiveJobApplications(newPageURL);
    };

    const onClose = () => {
        setShowTakeTestPopup(false);
        setShowHasAssessmentPopup(false);
        setShowComingSoonPopup(false);
    };

    async function filterActiveJobApplications(newPageURL) {
        setApplicationsLoading(true);
        const userId = localStorage.getItem("user_id");

        let url = newPageURL;

        if (!url) {
            url = `${Config.API_URL}/applications/jobseeker/${userId}`;
        }

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

                console.log("applied pagination data: ", theApplications.data);

                setAppliedPaginationData(theApplications.data);

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

    async function fetchSavedJobs(newPageUrl) {
        setJobsLoading(true);

        const userId = localStorage.getItem("user_id");

        let url = newPageUrl;

        if (!url) {
            url = `${Config.API_URL}/get_user_saved_jobs/user/${userId}`;
        }

        try {
            let theJobs = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            console.log("Pagintion data: ", theJobs.data.data);
            setPaginationData(theJobs.data.data);

            theJobs = theJobs.data.data.data;

            if (theJobs.length > 0) {
                setActiveJob(theJobs[0].the_job);
            }

            setJobs(theJobs);

            console.log("user saved Jobs: ", theJobs);
            setJobsLoading(false);
        } catch (error) {
            setJobsLoading(false);
            console.log("user saved Jobs request error: ", error);
        }
    }

    const unSaveJob = () => {
        if (unSaveLoading) {
            return;
        } else {
            setUnSaveLoading(true);
        }

        const userId = localStorage.getItem("user_id");

        const saveFormData = new FormData();

        saveFormData.append("status", "deleted");

        Utils.makeRequest(async () => {
            try {
                const saveURL = `${Config.API_URL}/saved_jobs/user/${userId}/job/${activeJob.id}`;
                let saveResults = await Utils.postForm(saveURL, saveFormData);

                saveResults = saveResults.data.data;

                fetchSavedJobs();

                console.log("unsave results: ", saveResults);
                setUnSaveLoading(false);
                // setLoading(false);
            } catch (error) {
                console.log("unsave Error: ", error);
                // setLoading(false);
                setUnSaveLoading(false);
            }
        });
    };

    function checkHasTakenAssessment(assessmentTestObj) {
        let hasTakenAssessment = false;
        const userId = localStorage.getItem("user_id");
        assessmentTestObj.scores.map((score) => {
            if (score.user_id == userId) {
                hasTakenAssessment = true;
            }
        });

        console.log("has taken assessment: ", hasTakenAssessment);
        return hasTakenAssessment;
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

            <JobSeekerNavbar active="my-jobs" />

            <div className="w-4/5 md:w-3/4 lg:w-2/3 mx-auto my-5 min-h-70-screen ">
                <p className="flex flex-row justify-start items-center w-full mt-8 mb-5">
                    <span
                        onClick={() => {
                            // setShowComingSoonPopup(true);
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

                {(activeTab == "applied" || activeTab == "interview") &&
                    applicationsLoading && <MyJobsApplicationsSkeleton />}

                {(activeTab == "applied" || activeTab == "interview") &&
                    !applicationsLoading &&
                    (!applications || applications.length < 1) && (
                        <p className="text-center">No Applications</p>
                    )}

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
                                        {application.job.skills_assessment_id &&
                                            application.assessment_tests &&
                                            application.assessment_tests[0] &&
                                            !checkHasTakenAssessment(
                                                application.assessment_tests[0]
                                            ) && (
                                                <p
                                                    onClick={() => {
                                                        setActiveAssessmentId(
                                                            application.job
                                                                .skills_assessment_id
                                                        );
                                                        setShowTakeTestPopup(
                                                            true
                                                        );
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

                {activeTab == "saved" && (
                    <>
                        <div className="w-full mx-auto my-5">
                            {jobsLoading && <SearchJobsJobsSkeletonLoader />}
                            {(!jobs || jobs.length <= 0) && !jobsLoading && (
                                <p className="w-full text-center text-lg">
                                    No Saved Jobs Yet!
                                </p>
                            )}

                            {jobs && jobs.length > 0 && (
                                <>
                                    <div className="md:grid md:grid-cols-5  md:border-x md:border-t  md:border-solid border-my-gray-70 min-h-40-screen rounded-sm mb-16">
                                        <sidebar className="col-span-2 h-full flex flex-row flex-nowrap overflow-x-auto md:block p-2 pl-0 md:p-0 md:border-b  md:border-solid border-my-gray-70 ">
                                            {jobs.map((job, index) => {
                                                job = job.the_job;
                                                return (
                                                    <div
                                                        onClick={() => {
                                                            setActiveJob(job);
                                                            setActiveJobIndex(
                                                                index
                                                            );
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
                                                                            job
                                                                                .user
                                                                                .basic_info_recruiter
                                                                                .company_avatar_url
                                                                        }
                                                                        width={
                                                                            100
                                                                        }
                                                                        height={
                                                                            80
                                                                        }
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
                                                    ? activeJob
                                                          .recruiter_basic_info
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
                                                    {activeJob.job_types.map(
                                                        (type, index) => {
                                                            if (
                                                                index ==
                                                                activeJob
                                                                    .job_types
                                                                    .length -
                                                                    1
                                                            ) {
                                                                return type.title;
                                                            } else {
                                                                return `${type.title} | `;
                                                            }
                                                        }
                                                    )}
                                                </span>
                                            </p>
                                            <p className="text-sm text-my-gray-70 flex flex-row flex-nowrap justify-start items-center">
                                                <Image
                                                    className="mr-3"
                                                    src="/money-icon.svg"
                                                    width={15}
                                                    height={11}
                                                />
                                                <span>
                                                    {activeJob.salary || ""}{" "}
                                                </span>
                                                <BsHourglassSplit className="pl-2 text-lg text-primary-70" />
                                                <span className="pl-1 text-primary-70">
                                                    Posted{" "}
                                                    {Utils.calculateTimeLapse(
                                                        activeJob.created_at
                                                    )}{" "}
                                                    ago
                                                </span>
                                            </p>
                                            <p className="text-sm text-my-gray-70 flex flex-row flex-nowrap justify-start items-center">
                                                <MdWorkOutline className=" text-lg text-primary-70" />
                                                <span className="pl-1 text-primary-70">
                                                    {activeJob.experience_level}{" "}
                                                    years experience required
                                                </span>
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
                                                        unSaveJob();
                                                    }}
                                                    className="cursor-pointer w-max my-2 mr-4 py-2 px-5 bg-white text-primary-70 border border-solid border-primary-70 hover:border-primary-60 rounded-10"
                                                >
                                                    {unSaveLoading && (
                                                        <span className="loader-secondary"></span>
                                                    )}
                                                    {!unSaveLoading && (
                                                        <span className="">
                                                            Unsave
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                            <p className="text-lg">
                                                Job Description
                                            </p>
                                            <p className="mt-5 mb-12">
                                                {activeJob.description ||
                                                    "No Description"}
                                            </p>
                                        </section>
                                    </div>
                                    <Pagination
                                        data={paginationData}
                                        onChangePage={onChangePage}
                                    />
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}
