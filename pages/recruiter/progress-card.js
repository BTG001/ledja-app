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

export default function () {
    const [jobsSearchFocus, setJobsSearchFocus] = useState(false);
    const [candidateSearchFocus, setCandidateSearchFocus] = useState(false);
    const [filterFocus, setFilterFocus] = useState(false);
    const [activeJob, setActiveJob] = useState({});
    const [jobs, setJobs] = useState();
    const jobsContainer = useRef();
    const [jobsContainerMouseDown, setJobsContainerMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const [applications, setApplications] = useState();
    const [activeApplication, setActiveApplication] = useState({});

    const [filters, setFilters] = useState({});

    useEffect(() => {
        getJobs();
    }, []);

    useEffect(() => {
        if (activeJob.id) {
            filterActiveJobApplications();
        }
    }, [filters, activeJob]);

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

    async function getJobs() {
        const userId = localStorage.getItem("user_id");
        const url = `${Config.API_URL}/get_user_jobs/${userId}`;

        try {
            const theJobs = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            setJobs(theJobs.data.data);

            setActiveJob(theJobs.data.data[0]);

            console.log("jobs: ", theJobs.data.data);
        } catch (error) {
            console.log("get jobs error: ", error);
        }
    }

    async function filterActiveJobApplications() {
        const userId = localStorage.getItem("user_id");
        const url = `${Config.API_URL}/applications/job/${activeJob.id}`;

        const filterApplicationsFormData = new FormData();

        if (filters.name) {
            filterApplicationsFormData.append("fname", filters.name);
            filterApplicationsFormData.append("lname", filters.name);
        }

        if (filters.status) {
            filterApplicationsFormData.append("status", filters.status);
        }

        Utils.makeRequest(async () => {
            try {
                let theApplications = await Utils.postForm(
                    url,
                    filterApplicationsFormData
                );

                theApplications = theApplications.data.data;
                setApplications(theApplications);
                if (theApplications && theApplications.length > 0) {
                    setActiveApplication(theApplications[0]);

                    if (theApplications[0].status == "awaiting") {
                        updateStatus("reviewed", theApplications[0].id);
                    }
                }

                console.log("Applications: ", theApplications);
            } catch (error) {
                console.log("Filter Applications error: ", error);
            }
        });
    }

    const onChangeActiveJob = (job) => {
        setActiveJob(job);
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

        Utils.makeRequest(async () => {
            try {
                const statusURL = `${Config.API_URL}/applications/${applicationId}`;

                let updateStatusResults = await Utils.putForm(
                    statusURL,
                    statusFormData
                );

                updateStatusResults = updateStatusResults.data.data;

                setActiveApplication(updateStatusResults);

                console.log("update status results: ", updateStatusResults);
            } catch (error) {
                console.log("updateStatus: ", error);
            }
        });
    };

    return (
        <>
            <RecruiterNavbar active="progress-card" />
            <section className="w-4/5 mx-auto my-5">
                <div className="w-1/4">
                    <form className="form">
                        <div className="form-input-container">
                            <label className="form-label-light" for="websites">
                                Job
                            </label>
                            <div
                                className={`mt-4 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                    jobsSearchFocus
                                        ? "border-primary-70"
                                        : "border-my-gray-70"
                                }`}
                            >
                                <input
                                    onFocus={() => setJobsSearchFocus(true)}
                                    onBlur={() => setJobsSearchFocus(false)}
                                    className="form-input-with-icon peer"
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
                    className="flex flex-row flex-nowrap overflow-x-hidden justify-start items-center py-2 cursor-grab "
                >
                    {!jobs && (
                        <p className="text-sm text-dark-50 text-center flex justify-center items-center min-h-20-screen min-w-20-screen bg-primary-40 rounded-md py-2 px-6 mr-4 border border-primary-40 border-solid">
                            You have not posted any jobs yet
                        </p>
                    )}

                    {jobs &&
                        jobs.map((job, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        onChangeActiveJob(job);
                                    }}
                                    className={`min-w-20-screen  rounded-md py-2 px-6 mr-4 border border-primary-40 border-solid
                                    ${
                                        activeJob.id == job.id
                                            ? "bg-primary-40"
                                            : "bg-white"
                                    }`}
                                >
                                    <h3 className="font-semibold text-lg ">
                                        {job.title}
                                    </h3>
                                    <p className="my-1">Nairobi, Kenya</p>
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
                <label className="form-label-light" for="websites">
                    Candidate
                </label>
                <div className="flex flex-row justify-start items-center ">
                    <span
                        onClick={() => {
                            setFilters((prevValues) => {
                                return {
                                    ...prevValues,
                                    status: null,
                                };
                            });
                        }}
                        className={`p-4 cursor-pointer ${
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
                        className={`p-4 cursor-pointer ${
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
                        className={`p-4 cursor-pointer ${
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
                        className={`p-4 cursor-pointer ${
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
                        className={`p-4 cursor-pointer ${
                            filters.status == "contacting"
                                ? "text-dark-50"
                                : "text-my-gray-70"
                        }`}
                    >
                        Contacting
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

                                <div className="form-input-container  rounded-md  ">
                                    <select className="form-input  py-3 mr-2">
                                        <option>
                                            Sort by: Score high to low
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="md:grid md:grid-cols-3 gap-4 mt-5 mb-16">
                    <sidebar>
                        {!applications && (
                            <p className="w-full text-center">
                                No Applications !
                            </p>
                        )}
                        {applications &&
                            applications.length > 0 &&
                            applications.map((application) => {
                                return (
                                    <div
                                        onClick={() => {
                                            setActiveApplication(application);
                                            if (
                                                application.status == "awaiting"
                                            ) {
                                                updateStatus(
                                                    "reviewed",
                                                    application.id
                                                );
                                            }
                                        }}
                                        className={`w-full p-3 mx-auto my-3  border border-my-gray-50 border-solid rounded-10  
                                    ${
                                        activeApplication.id == application.id
                                            ? "bg-my-gray-50 "
                                            : "bg-white"
                                    }`}
                                    >
                                        <div className="flex flex-row flex-nowrap justify-between items-center">
                                            <h3 className="font-semibold text-xl my-2">
                                                {application.jobseeker_basic_info
                                                    ? `${application.jobseeker_basic_info.fname} ${application.jobseeker_basic_info.lname}`
                                                    : ""}
                                            </h3>
                                            <h3 className="flex flex-row flex-nowrap justify-center items-center">
                                                <Image
                                                    src={"/star-full-icon.svg"}
                                                    width={17}
                                                    height={16}
                                                    className="m-2"
                                                />
                                                <span className="font-semibold text-xl m-2">
                                                    8.7
                                                </span>
                                            </h3>
                                        </div>
                                        <p className="text-dark-50 flex flex-row flex-nowrap justify-start items-center">
                                            {showStatusIcon(application.status)}
                                            <span>
                                                {application.status || ""}
                                            </span>
                                        </p>
                                        <p className="text-my-gray-80 mt-5 mb-2">
                                            {Utils.calculateTimeLapse(
                                                application.updated_at
                                            )}{" "}
                                            ago
                                        </p>
                                    </div>
                                );
                            })}
                        {/* <div className="w-full p-3 mx-auto my-3 bg-white border border-my-gray-50 border-solid rounded-10 ">
                            <div className="flex flex-row flex-nowrap justify-between items-center">
                                <h3 className="font-semibold text-xl my-2">
                                    Jennifer Musugu
                                </h3>
                                <h3 className="flex flex-row flex-nowrap justify-center items-center">
                                    <Image
                                        src={"/star-full-icon.svg"}
                                        width={17}
                                        height={16}
                                        className="m-2"
                                    />
                                    <span className="font-semibold text-xl m-2">
                                        8.7
                                    </span>
                                </h3>
                            </div>
                            <p className="text-dark-50 flex flex-row flex-nowrap justify-start items-center">
                                <Image
                                    src={"/contacting-icon.svg"}
                                    width={12}
                                    height={12}
                                    className="mr-3"
                                />
                                <span>contacting</span>
                            </p>
                            <p className="text-my-gray-80 mt-5 mb-2">
                                Reviewed 2 min ago
                            </p>
                        </div>
                        <div className="w-full p-3 mx-auto my-3 bg-my-gray-50 border border-my-gray-50 border-solid rounded-10 ">
                            <div className="flex flex-row flex-nowrap justify-between items-center">
                                <h3 className="font-semibold text-xl my-2">
                                    Kaison Nolan
                                </h3>
                                <h3 className="flex flex-row flex-nowrap justify-center items-center">
                                    <Image
                                        src={"/star-half-icon.svg"}
                                        width={17}
                                        height={16}
                                        className="m-2"
                                    />
                                    <span className="font-semibold text-xl m-2">
                                        6.2
                                    </span>
                                </h3>
                            </div>
                            <p className="text-dark-50 flex flex-row flex-nowrap justify-start items-center">
                                <Image
                                    src={"/awaiting-icon.svg"}
                                    width={12}
                                    height={12}
                                    className="mr-3"
                                />
                                <span>awaiting</span>
                            </p>
                            <p className="text-my-gray-80 mt-5 mb-2">
                                Applied 12 min ago
                            </p>
                        </div>
                        <div className="w-full p-3 mx-auto my-3 bg-white border border-my-gray-50 border-solid rounded-10 ">
                            <div className="flex flex-row flex-nowrap justify-between items-center">
                                <h3 className="font-semibold text-xl my-2">
                                    Griff Mills
                                </h3>
                                <h3 className="flex flex-row flex-nowrap justify-center items-center">
                                    <Image
                                        src={"/star-half-icon.svg"}
                                        width={17}
                                        height={16}
                                        className="m-2"
                                    />
                                    <span className="font-semibold text-xl m-2">
                                        5.7
                                    </span>
                                </h3>
                            </div>
                            <p className="text-dark-50 flex flex-row flex-nowrap justify-start items-center">
                                <Image
                                    src={"/reviewed-icon.svg"}
                                    width={12}
                                    height={12}
                                    className="mr-3"
                                />
                                <span>reviewed</span>
                            </p>
                            <p className="text-my-gray-80 mt-5 mb-2">
                                Reviewed 29 min ago
                            </p>
                        </div>
                        <div className="w-full p-3 mx-auto my-3 bg-white border border-my-gray-50 border-solid rounded-10 ">
                            <div className="flex flex-row flex-nowrap justify-between items-center">
                                <h3 className="font-semibold text-xl m-2">
                                    Josie Lindsay
                                </h3>
                                <h3 className="flex flex-row flex-nowrap justify-center items-center">
                                    <Image
                                        src={"/star-empty-icon.svg"}
                                        width={17}
                                        height={16}
                                        className="m-2"
                                    />
                                    <span className="font-semibold text-xl m-2">
                                        2.4
                                    </span>
                                </h3>
                            </div>
                            <p className="text-dark-50 flex flex-row flex-nowrap justify-start items-center">
                                <Image
                                    src={"/awaiting-icon.svg"}
                                    width={12}
                                    height={12}
                                    className="mr-3"
                                />
                                <span>awaiting</span>
                            </p>
                            <p className="text-my-gray-80 mt-5 mb-2">
                                Applied 14 min ago
                            </p>
                        </div>
                        <div className="w-full p-3 mx-auto my-3 bg-white border border-my-gray-50 border-solid rounded-10 ">
                            <div className="flex flex-row flex-nowrap justify-between items-center">
                                <h3 className="font-semibold text-xl m-2">
                                    Jennifer Musugu
                                </h3>
                                <h3 className="flex flex-row flex-nowrap justify-center items-center">
                                    <Image
                                        src={"/star-full-icon.svg"}
                                        width={17}
                                        height={16}
                                        className="m-2"
                                    />
                                    <span className="font-semibold text-xl m-2">
                                        8.7
                                    </span>
                                </h3>
                            </div>
                            <p className="text-dark-50 flex flex-row flex-nowrap justify-start items-center">
                                <Image
                                    src={"/contacting-icon.svg"}
                                    width={12}
                                    height={12}
                                    className="mr-3"
                                />
                                <span>contacting</span>
                            </p>
                            <p className="text-my-gray-80 mt-5 mb-2">
                                Reviewed 2 min ago
                            </p>
                        </div> */}
                    </sidebar>
                    <section className="col-span-2 ">
                        <div className="bg-my-gray-50 p-5 my-5 rounded-10">
                            <div className="flex flex-row flex-nowrap justify-between items-center">
                                <h3 className="">
                                    {activeApplication.jobseeker_basic_info
                                        ? `${activeApplication.jobseeker_basic_info.fname} ${activeApplication.jobseeker_basic_info.lname}`
                                        : ""}
                                </h3>
                                <h3 className="font-semibold flex flex-row flex-nowrap justify-end items-center">
                                    <Image
                                        src={"/star-full-icon.svg"}
                                        width={12}
                                        height={12}
                                        className="mr-3"
                                    />
                                    <span className="text-2xl m-2">8.7</span>
                                    <span className="text-sm"> out of 10</span>
                                </h3>
                            </div>

                            <div className="flex flex-row flex-nowrap justify-between items-center">
                                <p className="flex flex-row flex-nowrap justify-start items-center">
                                    <Image
                                        src={"/location-icon.svg"}
                                        width={12}
                                        height={12}
                                        className="mr-3"
                                    />
                                    <span>
                                        {activeApplication.job
                                            ? activeApplication.job.location
                                            : ""}
                                    </span>
                                </p>
                                <p className="text-right"># 09/100</p>
                            </div>
                            <div className="flex flex-row flex-nowrap justify-between items-center">
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
                                <p className=" flex flex-row flex-nowrap justify-end items-center my-2">
                                    <AiOutlineInfoCircle />
                                    <span className="text-xs m-1">
                                        Rank is calculated based on assessment
                                        scores
                                    </span>
                                </p>
                            </div>
                            <div className="my-3 flex flex-row flex-nowrap justify-between items-center ">
                                <div
                                    flex
                                    flex-row
                                    flex-nowrap
                                    justify-start
                                    items-center
                                >
                                    <PrimaryBtn
                                        text={"Interview"}
                                        path="/interview"
                                        className={"m-2"}
                                    />
                                    <SecondaryBtn
                                        text={"View profile"}
                                        path="user-profile"
                                        className={"m-2"}
                                    />
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
                            <div className="bg-white p-3 mx-auto my-8 rounded-10 ">
                                <div className="grid grid-cols-5 p-4 border-b border-solid border-my-gray-50">
                                    <span className="col-span-2">Skills</span>
                                    <span>Rank</span>
                                    <span>Score</span>
                                </div>
                                <div className="grid grid-cols-5 p-4 border-b border-solid border-my-gray-50">
                                    <span className="col-span-2">
                                        Java coding skill{" "}
                                    </span>
                                    <span>04/100</span>
                                    <span>8.6 </span>
                                    <Image
                                        src={"/caret-min-icon.svg"}
                                        width={7}
                                        height={4}
                                    />
                                </div>

                                <div className="grid grid-cols-5 p-4 ">
                                    <span className="col-span-2">
                                        C++ coding skill
                                    </span>
                                    <span>16/100</span>
                                    <span>7.9 </span>
                                    <Image
                                        src={"/caret-max-icon.svg"}
                                        width={7}
                                        height={4}
                                    />
                                </div>
                                <div className="grid grid-cols-5 px-5 py-3 ">
                                    <span className="text-sm col-span-2">
                                        Section A
                                    </span>
                                    <span className="text-sm">08/100</span>
                                    <span className="text-sm">8.2 </span>
                                </div>
                                <div className="grid grid-cols-5 px-5 py-3 ">
                                    <span className="text-sm col-span-2">
                                        Section B
                                    </span>
                                    <span className="text-sm">16/100</span>
                                    <span className="text-sm">7.2</span>
                                </div>
                                <div className="grid grid-cols-5 px-5 py-3 ">
                                    <span className="text-sm col-span-2">
                                        Section C
                                    </span>
                                    <span className="text-sm">25/100</span>
                                    <span className="text-sm">7.5 </span>
                                </div>
                                <div className="grid grid-cols-5 p-4 ">
                                    <span className="col-span-2">
                                        HTML coding skill{" "}
                                    </span>
                                    <span>02/100</span>
                                    <span>8.8 </span>
                                    <Image
                                        src={"/caret-min-icon.svg"}
                                        width={7}
                                        height={4}
                                    />
                                </div>
                                <div className="grid grid-cols-5 p-4 font-semibold text-lg">
                                    <span className="col-span-2">Total</span>
                                    <span>09/100</span>
                                    <span>8.7 </span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <Footer />
        </>
    );
}
