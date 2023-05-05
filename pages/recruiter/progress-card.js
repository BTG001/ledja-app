import RecruiterNavbar from "../../components/navbars/RecruiterNavbar";
import Footer from "../../components/Footer";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PrimaryBtn from "../../components/buttons/PrimaryBtn";
import SecondaryBtn from "../../components/buttons/SecondaryBtn";
import Config from "../../Config";
import Utils from "../../Utils";
import axios from "axios";
import { AiOutlineSave } from "react-icons/ai";
import DashboardJobsLoaderSkeleton from "../../components/skeleton-loaders/progress-card-jobs-loader-skeleton";
import ProgressCardApplicationsLoaderSkeleton from "../../components/skeleton-loaders/progress-card-applications-loader-skeleton";
import JobSeekerProfilePopup from "../../components/recuriters/applicant-profile-popup";
import InterviewStartedPopup from "../../components/recuriters/interviewing-started-popup";
import { useRouter } from "next/router";
import Pagination from "../../components/pagination";

export default function () {
    const router = useRouter();

    const [jobsSearchFocus, setJobsSearchFocus] = useState(false);
    const [candidateSearchFocus, setCandidateSearchFocus] = useState(false);
    const [filterFocus, setFilterFocus] = useState(false);
    const [activeJob, setActiveJob] = useState({});
    const [jobs, setJobs] = useState();
    const [jobsLoading, setJobsLoading] = useState(true);
    const jobsContainer = useRef();
    const [jobsContainerMouseDown, setJobsContainerMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const [applications, setApplications] = useState();
    const [activeApplication, setActiveApplication] = useState({});
    const [applicationsLoading, setApplicationsLoading] = useState(true);

    const [showCurrentApplicantProfile, setShowCurrentApplicantProfile] =
        useState();
    const [showInterviewingStartedPopup, setShowInterviewingStartedPopup] =
        useState();

    const [activeApplicantId, setActiveApplicantId] = useState();

    const [loadingInterviewing, setLoadingInterviewing] = useState(false);

    const [filters, setFilters] = useState({});

    let hasLoadedOnce = false;

    const [jobsPaginationData, setJobsPaginationData] = useState({});
    const [applicationsPaginationData, setApplicationsPaginationData] =
        useState({});

    useEffect(() => {
        if (!hasLoadedOnce) {
            getJobs();
            hasLoadedOnce = true;
        }
    }, []);

    useEffect(() => {
        if (activeApplication.user) {
            setActiveApplicantId(activeApplication.user.id);
        }
    }, [activeApplication]);

    useEffect(() => {
        if (activeJob && activeJob.id) {
            filterActiveJobApplications();
        } else {
            setApplicationsLoading(false);
        }
    }, [filters, activeJob]);

    const onChangeJobsPage = (newPageURL) => {
        getJobs(newPageURL);
    };

    const onChangeApplicationsPage = (newPageURL) => {
        filterActiveJobApplications(newPageURL);
    };

    const onJobsContainerMouseMove = (e) => {
        if (!jobsContainerMouseDown) {
            return;
        }

        e.preventDefault();
        const x = e.pageX - jobsContainer.current.offsetLeft;
        const walk = x - startX;
        jobsContainer.current.scrollLeft = scrollLeft - walk;
    };

    const onJobsContainerMouseDown = (e) => {
        setJobsContainerMouseDown(true);
        const startX = e.pageX - jobsContainer.current.offsetLeft;
        console.log(startX);
        setStartX(startX);
        setScrollLeft(jobsContainer.current.scrollLeft);
    };

    async function getJobs(newPageURL) {
        setJobsLoading(true);
        const userId = localStorage.getItem("user_id");

        let url = newPageURL;

        if (!url) {
            url = `${Config.API_URL}/get_user_jobs/${userId}`;
        }

        try {
            const theJobs = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            console.log("jobs pagination data: ", theJobs);
            setJobsPaginationData(theJobs.data.data);

            setJobs(theJobs.data.data.data);

            // theJobs.data.data.map(async (job, index) => {
            //     if (job.skills_assessment_id) {
            //         const scoresCalculation = await axios.get(
            //             `${Config.API_URL}/calculate_scores/${job.skills_assessment_id}`,
            //             {
            //                 headers: Utils.getHeaders(),
            //             }
            //         );
            //         console.log(
            //             "scores calculation results: ",
            //             index + 1,
            //             ":- ",
            //             scoresCalculation
            //         );
            //     }
            // });

            setActiveJob(theJobs.data.data.data[0]);

            console.log("jobs: ", theJobs.data.data);
            setJobsLoading(false);
        } catch (error) {
            console.log("get jobs error: ", error);
            setJobsLoading(false);
        }
    }

    async function filterActiveJobApplications(newPageURL) {
        setApplicationsLoading(true);
        const userId = localStorage.getItem("user_id");

        let url = newPageURL;
        if (!url) {
            url = `${Config.API_URL}/applications/job/${activeJob.id}`;
        }

        const filterApplicationsFormData = new FormData();

        if (filters.name && filters.name.trim() != "") {
            filterApplicationsFormData.append("name", filters.name);
        }

        if (filters.status) {
            filterApplicationsFormData.append("status", filters.status);
        }

        Utils.makeRequest(async () => {
            try {
                if (activeJob.skills_assessment_id) {
                    const scoresCalculation = await axios.get(
                        `${Config.API_URL}/calculate_scores/${activeJob.skills_assessment_id}`,
                        {
                            headers: Utils.getHeaders(),
                        }
                    );
                    console.log(
                        "scores calculation results: ",
                        scoresCalculation
                    );
                }

                let theApplications = await Utils.postForm(
                    url,
                    filterApplicationsFormData
                );

                console.log(
                    "applications pagination data: ",
                    theApplications.data.data
                );
                setApplicationsPaginationData(theApplications.data.data);

                theApplications = theApplications.data.data.data;
                setApplications(theApplications);
                if (theApplications && theApplications.length > 0) {
                    setActiveApplication(theApplications[0]);

                    if (theApplications[0].status == "awaiting") {
                        updateStatus("reviewed", theApplications[0].id);
                    }
                }

                console.log("Applications: ", theApplications);
                setApplicationsLoading(false);
            } catch (error) {
                setApplicationsLoading(false);
                console.log("Filter Applications error: ", error);
            }
        });
    }

    const onChangeActiveJob = (job) => {
        setActiveJob(job);
        console.log("active job: ", job);
    };

    const showStatusIcon = (status) => {
        return (
            <Image
                src={`/${status}-icon.svg`}
                width={12}
                height={12}
                className="mr-3"
            />
        );
    };

    const updateStatus = (status, applicationId) => {
        const statusFormData = new FormData();
        statusFormData.append("status", status);

        if (status == "contacting") {
            if (loadingInterviewing) {
                return;
            } else {
                setLoadingInterviewing(true);
            }
        }

        Utils.makeRequest(async () => {
            try {
                const statusURL = `${Config.API_URL}/applications/${applicationId}`;

                let updateStatusResults = await Utils.putForm(
                    statusURL,
                    statusFormData
                );

                updateStatusResults = updateStatusResults.data.data;

                if (updateStatusResults.score) {
                    setActiveApplication(updateStatusResults);
                } else {
                    setActiveApplication((prevValues) => {
                        return {
                            ...prevValues,
                            status: updateStatusResults.status,
                        };
                    });
                }

                console.log("update status results: ", updateStatusResults);

                if (status == "contacting") {
                    setShowInterviewingStartedPopup(true);
                    setLoadingInterviewing(false);
                }
            } catch (error) {
                if (status == "contacting") {
                    setLoadingInterviewing(false);
                }
                console.log("updateStatus: ", error);
            }
        });
    };

    const onStartInterview = () => {
        updateStatus("contacting", activeApplication.id);
    };

    const onClose = () => {
        setShowCurrentApplicantProfile(false);
        setShowInterviewingStartedPopup(false);
    };

    return (
        <>
            <JobSeekerProfilePopup
                showPopup={showCurrentApplicantProfile}
                onClose={onClose}
                jobSeekerId={activeApplicantId}
            />
            <InterviewStartedPopup
                showPopup={showInterviewingStartedPopup}
                onClose={onClose}
            />
            <RecruiterNavbar active="progress-card" />
            <section className="w-4/5 mx-auto my-5">
                <div className="w-1/4">
                    <form className="form">
                        <div className="form-input-container">
                            <label className="form-label-light" for="websites">
                                Job
                            </label>
                            <div
                                className={`min-w-max md:w-auto mt-4 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                    jobsSearchFocus
                                        ? "border-primary-70"
                                        : "border-my-gray-70"
                                }`}
                            >
                                <input
                                    onFocus={() => setJobsSearchFocus(true)}
                                    onBlur={() => setJobsSearchFocus(false)}
                                    className="form-input-with-icon peer "
                                    type={"text"}
                                    placeholder="Search job title"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                    }}
                                />
                                <Image
                                    src={"/search-icon.svg"}
                                    width={17}
                                    height={9}
                                    className="m-2 cursor-pointer"
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div
                    ref={jobsContainer}
                    onMouseDown={onJobsContainerMouseDown}
                    onMouseUp={() => {
                        setJobsContainerMouseDown(false);
                    }}
                    onMouseMove={onJobsContainerMouseMove}
                    className="flex flex-row flex-nowrap overflow-x-auto justify-start items-center py-2 cursor-grab  "
                >
                    {(!jobs || jobs.length < 1) && !jobsLoading && (
                        <p className="text-sm text-dark-50 text-center flex justify-center items-center min-h-10-screen md:m-h-20-screen min-w-60-screen md:min-w-20-screen bg-primary-40 rounded-md py-2 px-6 mr-4 border border-primary-40 border-solid">
                            You have not posted any jobs yet
                        </p>
                    )}

                    {jobsLoading && <DashboardJobsLoaderSkeleton />}

                    {jobs &&
                        jobs.length > 0 &&
                        !jobsLoading &&
                        jobs.map((job, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        onChangeActiveJob(job);
                                    }}
                                    className={`cursor-pointer min-w-60-screen sm:min-w-20-screen  rounded-md py-2 px-6 mr-4 border border-primary-40 border-solid
                                    ${
                                        activeJob.id == job.id
                                            ? "bg-primary-40"
                                            : "bg-white"
                                    }`}
                                >
                                    <h3 className="font-semibold text-lg ">
                                        {job.title}
                                    </h3>
                                    <p className="my-1">{job.location || ""}</p>
                                    <p>
                                        Created:{" "}
                                        {
                                            Config.MONTH_NAMES[
                                                new Date(
                                                    job.created_at
                                                ).getMonth()
                                            ]
                                        }{" "}
                                        {new Date(job.created_at).getDate()}
                                        {", "}
                                        {new Date(job.created_at).getFullYear()}
                                    </p>
                                </div>
                            );
                        })}
                </div>
                <Pagination
                    data={jobsPaginationData}
                    onChangePage={onChangeJobsPage}
                />
                <label className="form-label-light" for="websites">
                    Candidate
                </label>
                <div className="flex flex-row justify-start items-center flex-wrap py-2 ">
                    <span
                        onClick={() => {
                            setFilters((prevValues) => {
                                return {
                                    ...prevValues,
                                    status: null,
                                };
                            });
                        }}
                        className={`hover:text-dark-50 pr-4 py-2 cursor-pointer ${
                            !filters.status ? "text-dark-50" : "text-my-gray-70"
                        }`}
                    >
                        All
                    </span>
                    {/* <span
                        onClick={() => {
                            setFilters((prevValues) => {
                                return {
                                    ...prevValues,
                                    status: "received",
                                };
                            });
                        }}
                        className={`p-4 cursor-pointer ${
                            filters.status == "received"
                                ? "text-dark-50"
                                : "text-my-gray-70"
                        }`}
                    >
                        Received
                    </span> */}
                    <span
                        onClick={() => {
                            setFilters((prevValues) => {
                                return {
                                    ...prevValues,
                                    status: "awaiting",
                                };
                            });
                        }}
                        className={`hover:text-dark-50 pr-4 py-2 cursor-pointer ${
                            filters.status == "awaiting"
                                ? "text-dark-50"
                                : "text-my-gray-70"
                        }`}
                    >
                        Awaiting
                    </span>
                    <span
                        onClick={() => {
                            setFilters((prevValues) => {
                                return {
                                    ...prevValues,
                                    status: "reviewed",
                                };
                            });
                        }}
                        className={`hover:text-dark-50 pr-4 py-2 cursor-pointer ${
                            filters.status == "reviewed"
                                ? "text-dark-50"
                                : "text-my-gray-70"
                        }`}
                    >
                        Reviewed
                    </span>
                    <span
                        onClick={() => {
                            setFilters((prevValues) => {
                                return {
                                    ...prevValues,
                                    status: "saved",
                                };
                            });
                        }}
                        className={`hover:text-dark-50 pr-4 py-2 cursor-pointer ${
                            filters.status == "saved"
                                ? "text-dark-50"
                                : "text-my-gray-70"
                        }`}
                    >
                        Saved
                    </span>
                    <span
                        onClick={() => {
                            setFilters((prevValues) => {
                                return {
                                    ...prevValues,
                                    status: "contacting",
                                };
                            });
                        }}
                        className={`hover:text-dark-50 pr-4 py-2 cursor-pointer ${
                            filters.status == "contacting"
                                ? "text-dark-50"
                                : "text-my-gray-70"
                        }`}
                    >
                        contacting
                    </span>
                </div>
                <div className="w-full">
                    <form className="form ">
                        <div className=" flex flex-row flex-wrap justify-between ">
                            <div
                                className={` max-w-max mt-4 p-0 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                    candidateSearchFocus
                                        ? "border-primary-70"
                                        : "border-my-gray-70"
                                }`}
                            >
                                <input
                                    onFocus={() =>
                                        setCandidateSearchFocus(true)
                                    }
                                    onBlur={() =>
                                        setCandidateSearchFocus(false)
                                    }
                                    className="form-input-with-icon"
                                    type={"text"}
                                    placeholder="Search candidate’s name"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFilters((prevValues) => {
                                            return {
                                                ...prevValues,
                                                name: value,
                                            };
                                        });
                                    }}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        filterActiveJobApplications();
                                    }}
                                />
                                {/* <Image
                                    onClick={filterActiveJobApplications}
                                    src={"/search-icon.svg"}
                                    width={17}
                                    height={9}
                                    className="mx-2 cursor-pointer"
                                /> */}
                            </div>
                            <div className="flex flex-row flex-wrap justify-between items-center">
                                {/* <div
                                    className={`mr-4  mt-4 border border-solid  rounded-md flex flex-row flex-nowrap justify-center items-center ${
                                        filterFocus
                                            ? "border-primary-70"
                                            : "border-my-gray-70"
                                    }`}
                                >
                                    <Image
                                        src={"/filter-icon.svg"}
                                        width={17}
                                        height={9}
                                        className="ml-2 cursor-pointer"
                                    />
                                    <select className="form-input-with-icon mr-1">
                                        <option>Filters</option>
                                    </select>
                                    <input
                                        onFocus={() => setFilterFocus(true)}
                                        onBlur={() => setFilterFocus(false)}
                                        className="form-input-with-icon max-w-max "
                                        type={"text"}
                                        placeholder="Filters"
                                    />
                                </div> */}

                                {/* <div className="form-input-container  rounded-md  ">
                                    <select className="form-input  py-3 mr-2">
                                        <option>
                                            Sort by: Score high to low
                                        </option>
                                    </select>
                                </div> */}
                            </div>
                        </div>
                    </form>
                </div>
                {(!applications || applications.length < 1) &&
                    !applicationsLoading && (
                        <p className="w-full text-center">No Applications !</p>
                    )}

                {applicationsLoading && (
                    <ProgressCardApplicationsLoaderSkeleton />
                )}

                {!applicationsLoading &&
                    applications &&
                    applications.length > 0 && (
                        <div className="md:grid md:grid-cols-3 gap-4 mt-5 mb-16">
                            <div>
                                <Pagination
                                    data={applicationsPaginationData}
                                    onChangePage={onChangeApplicationsPage}
                                />
                                <sidebar className=" flex flex-row flex-nowrap overflow-x-auto md:block cursor-grab md:cursor-context-menu">
                                    {applications &&
                                        applications.length > 0 &&
                                        applications.map((application) => {
                                            return (
                                                <div
                                                    onClick={() => {
                                                        console.log(
                                                            "old active application: ",
                                                            activeApplication
                                                        );
                                                        console.log(
                                                            "new Active Application",
                                                            application
                                                        );
                                                        console.log(
                                                            "activeJob: ",
                                                            activeJob
                                                        );
                                                        setActiveApplication(
                                                            application
                                                        );
                                                        if (
                                                            application.status ==
                                                            "awaiting"
                                                        ) {
                                                            updateStatus(
                                                                "reviewed",
                                                                application.id
                                                            );
                                                        }
                                                    }}
                                                    className={`cursor-pointer w-full p-3 md:mx-auto my-3 mx-1 min-w-60-screen sm:min-w-40-screen md:min-w-10-screen  border border-my-gray-50 border-solid rounded-10  
                                    ${
                                        activeApplication.id == application.id
                                            ? "bg-my-gray-50 "
                                            : "bg-white"
                                    }`}
                                                >
                                                    <div className="flex flex-row flex-nowrap justify-between items-center">
                                                        <h3 className="font-semibold text-xl my-1">
                                                            {application.jobseeker_basic_info
                                                                ? `${application.jobseeker_basic_info.fname} ${application.jobseeker_basic_info.lname}`
                                                                : ""}
                                                        </h3>
                                                        <h3 className="flex flex-row flex-nowrap justify-center items-center">
                                                            <Image
                                                                src={
                                                                    "/star-full-icon.svg"
                                                                }
                                                                width={17}
                                                                height={16}
                                                                className="m-1"
                                                            />
                                                            <span className="font-semibold text-xl m-1">
                                                                {application.score
                                                                    ? application
                                                                          .score
                                                                          .score
                                                                    : "N/A"}
                                                            </span>
                                                        </h3>
                                                    </div>
                                                    <p className="text-dark-50 flex flex-row flex-nowrap justify-start items-center">
                                                        {showStatusIcon(
                                                            application.status
                                                        )}
                                                        <span>
                                                            {application.status ||
                                                                ""}
                                                        </span>
                                                    </p>
                                                    <p className="text-my-gray-80 mt-2 mb-1">
                                                        Reviewed{" "}
                                                        {Utils.calculateTimeLapse(
                                                            application.updated_at
                                                        )}{" "}
                                                        ago
                                                    </p>
                                                </div>
                                            );
                                        })}
                                </sidebar>
                                {applications.length > 2 && (
                                    <Pagination
                                        data={applicationsPaginationData}
                                        onChangePage={onChangeApplicationsPage}
                                    />
                                )}
                            </div>
                            {activeApplication && activeApplication.id && (
                                <section className="col-span-2 ">
                                    <div className="bg-my-gray-50 p-5 my-5 rounded-10">
                                        <div className="flex flex-row flex-nowrap justify-between items-center">
                                            <h3 className="">
                                                {activeApplication.jobseeker_basic_info
                                                    ? `${activeApplication.jobseeker_basic_info.fname} ${activeApplication.jobseeker_basic_info.lname}`
                                                    : ""}
                                            </h3>
                                            {activeApplication.score && (
                                                <h3 className="font-semibold flex flex-row flex-nowrap justify-center items-center">
                                                    <Image
                                                        src={
                                                            "/star-full-icon.svg"
                                                        }
                                                        width={12}
                                                        height={12}
                                                        className="mr-3"
                                                    />
                                                    <span className="text-2xl m-2">
                                                        {activeApplication.score
                                                            ? activeApplication
                                                                  .score.score
                                                            : ""}
                                                    </span>
                                                    <span className="text-sm">
                                                        {" "}
                                                        out of{" "}
                                                        {activeApplication.score
                                                            ? activeApplication
                                                                  .score.out_of
                                                            : ""}
                                                    </span>
                                                </h3>
                                            )}
                                        </div>

                                        <div className="flex flex-row flex-nowrap justify-between items-center">
                                            <p className="flex flex-row flex-nowrap justify-start items-center my-1">
                                                <Image
                                                    src={"/location-icon.svg"}
                                                    width={12}
                                                    height={12}
                                                    className="mr-3"
                                                />
                                                <span>
                                                    {activeApplication.job
                                                        ? activeApplication.job
                                                              .location
                                                        : ""}
                                                </span>
                                            </p>
                                            <p className="text-right">
                                                {activeApplication.score && (
                                                    <span># </span>
                                                )}
                                                {activeApplication.score
                                                    ? activeApplication.score
                                                          .rank
                                                    : ""}
                                            </p>
                                        </div>
                                        <div className="flex flex-row flex-wrap justify-between items-center">
                                            <p className="flex flex-row flex-nowrap justify-start items-center">
                                                Applied on{" "}
                                                {`${
                                                    Config.MONTH_NAMES[
                                                        new Date(
                                                            activeApplication.created_at
                                                        ).getMonth()
                                                    ]
                                                } ${new Date(
                                                    activeApplication.created_at
                                                ).getDate()}`}
                                            </p>

                                            {activeApplication.score && (
                                                <p className=" flex flex-row flex-nowrap justify-end items-center my-2 ">
                                                    <AiOutlineInfoCircle />
                                                    <span className="text-xs m-1">
                                                        Rank is calculated based
                                                        on assessment scores
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                        <div className="my-3 flex flex-row flex-wrap justify-between items-center min-h-10-screen ">
                                            <div
                                                className="flex
                                                flex-row
                                                flex-nowrap
                                                justify-start
                                                items-center
                                                my-2"
                                            >
                                                <span
                                                    onClick={onStartInterview}
                                                    className="m-1 mr-2 bg-primary-70 px-4 py-3 rounded-10 text-white cursor-pointer w-32 text-center flex justify-center items-center  "
                                                >
                                                    {loadingInterviewing && (
                                                        <span className="loader"></span>
                                                    )}
                                                    {!loadingInterviewing && (
                                                        <span className="">
                                                            Interview
                                                        </span>
                                                    )}
                                                </span>
                                                <span
                                                    onClick={() => {
                                                        setShowCurrentApplicantProfile(
                                                            true
                                                        );
                                                    }}
                                                    className="mr-2 bg-white px-4 py-3 rounded-10 cursor-pointer w-max m-1 flex"
                                                >
                                                    View Profile
                                                </span>
                                            </div>
                                            <div
                                                className="flex
                                    flex-row
                                    flex-nowrap
                                    justify-end
                                    items-center"
                                            >
                                                <Image
                                                    onClick={() => {
                                                        if (
                                                            activeApplication.status ==
                                                                "saved" ||
                                                            activeApplication.status ==
                                                                "contacting"
                                                        ) {
                                                            updateStatus(
                                                                "reviewed",
                                                                activeApplication.id
                                                            );
                                                        } else {
                                                            updateStatus(
                                                                "saved",
                                                                activeApplication.id
                                                            );
                                                        }
                                                    }}
                                                    src={
                                                        activeApplication.status ==
                                                            "saved" ||
                                                        activeApplication.status ==
                                                            "contacting"
                                                            ? "/love-fill-icon.svg"
                                                            : "/love-icon.svg"
                                                    }
                                                    width={30}
                                                    height={26}
                                                    className="mr-3"
                                                />
                                                <Image
                                                    onClick={() => {
                                                        if (
                                                            activeApplication.status ==
                                                            "rejected"
                                                        ) {
                                                            updateStatus(
                                                                "reviewed",
                                                                activeApplication.id
                                                            );
                                                        } else {
                                                            updateStatus(
                                                                "rejected",
                                                                activeApplication.id
                                                            );
                                                        }
                                                    }}
                                                    src={
                                                        activeApplication.status ==
                                                        "rejected"
                                                            ? "/not-interested-active-icon.svg"
                                                            : "/not-interested-icon.svg"
                                                    }
                                                    width={30}
                                                    height={30}
                                                    className="mr-3"
                                                />
                                            </div>
                                        </div>
                                        <div className="bg-white p-3 mx-auto my-8 rounded-10 flex  ">
                                            {!activeApplication.score &&
                                                !applicationsLoading && (
                                                    <p className="w-full text-center p-6">
                                                        No Assessment!
                                                    </p>
                                                )}

                                            {activeApplication.score &&
                                                !applicationsLoading && (
                                                    <div>
                                                        <p className="grid grid-cols-2 gap-2 p-2 border-b border-my-gray-50">
                                                            <span className=" text-primary-70">
                                                                Assessment Title
                                                            </span>
                                                            <span className="text-primary-70 w-full text-center">
                                                                Applicant Score
                                                            </span>
                                                        </p>

                                                        <p className="grid grid-cols-2 gap-2 p-2">
                                                            <span className="">
                                                                {
                                                                    activeApplication
                                                                        .assessment
                                                                        .title
                                                                }
                                                            </span>
                                                            <span className="w-full text-center">
                                                                {
                                                                    activeApplication
                                                                        .score
                                                                        .score
                                                                }
                                                            </span>
                                                        </p>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
            </section>
            <Footer />
        </>
    );
}
