import GuestNavbar from "../components/navbars/GuestNavbar";
import Image from "next/image";
import PrimaryBtn from "../components/buttons/PrimaryBtn";
import Footer from "../components/Footer";
import Utils from "../Utils";
import { useContext, useEffect, useState } from "react";
import AuthenticatedNavbar from "../components/navbars/authenticatedNavbar";
import { AuthContext } from "./_app";
import JobsCardsLoaderSkeleton from "../components/skeleton-loaders/jobs-cards-skeleton-loader";
import Config from "../Config";
import axios from "axios";
import Link from "next/link";
import { BsBuilding } from "react-icons/bs";

export default function Home() {
    const auth = useContext(AuthContext);

    const [jobs, setJobs] = useState();
    const [jobsLoading, setJobsLoading] = useState(true);

    const [users, setUsers] = useState();
    const [usersLoading, setUsersLoading] = useState();
    const [activeTab, setActiveTab] = useState("jobs");

    useEffect(() => {
        fetchJobs();
        fetchUsers();
    }, []);

    async function fetchJobs(url) {
        setJobsLoading(true);
        if (!url) {
            url = `${Config.API_URL}/jobs`;
        }

        try {
            let theJobs = await axios.get(url);

            theJobs = theJobs.data.data.data;

            setJobs(theJobs);

            console.log("Jobs: ", theJobs);
            setJobsLoading(false);
        } catch (error) {
            setJobsLoading(false);
            console.log("Jobs request error: ", error);
        }
    }

    async function fetchUsers(url) {
        setUsersLoading(true);
        if (!url) {
            url = `${Config.API_URL}/users`;
        }

        try {
            let theUsers = await axios.get(url);

            theUsers = theUsers.data.data.data;

            setUsers(theUsers);

            console.log("Users: ", theUsers);
            setUsersLoading(false);
        } catch (error) {
            setUsersLoading(false);
            console.log("users request error: ", error);
        }
    }

    return (
        <>
            {auth.isLoggedIn && <AuthenticatedNavbar />}
            {!auth.isLoggedIn && <GuestNavbar />}
            <div className="w-full h-80-screen relative">
                <Image
                    className="object-cover max-w-full min-h-full max-h-full z-0 absolute"
                    src={"/hero-image.jpg"}
                    width={1440}
                    height={650}
                />
                <div className="w-full h-full flex flex-col flex-nowrap justify-center items-center z-20 absolute ">
                    <h1 className="text-center text-dark-60 text-5xl font-normal font-zilla-slab mb-6">
                        Make Job Hunting Easy
                    </h1>

                    <h5 className=" text-md text-center leading-6">
                        Are you frustrated by applying and <br /> recruiting?
                        LEDJA makes it easy for you
                    </h5>
                    <div className="flex flex-row flex-nowrap justify-center items-center mt-7 ">
                        <PrimaryBtn
                            className="mr-3"
                            text="I'm a job seeker"
                            path="/signup"
                            data={{ role: "job-seeker" }}
                        />
                        <PrimaryBtn
                            className="ml-3"
                            text="I'm a recruiter"
                            path="/signup"
                            data={{ role: "recruiter" }}
                        />
                    </div>
                </div>
                <div className="min-h-full min-w-full bg-white z-10 absolute opacity-60"></div>
            </div>
            <div className="w-full flex flex-row flex-wrap-reverse justify-between items-center md:w-4/5 m-auto p-4">
                <div className="flex flex-col md:w-1/2 justify-center items-center flex-nowrap">
                    <h3 className="font-medium text-2xl mb-3 w-full">
                        What LEDJA offers?
                    </h3>
                    <article>
                        <p>
                            LEDJA aims to connect African talents with companies
                            around the world with all commited services:
                        </p>
                        <ul className="list-disc list-inside mt-4">
                            <li>
                                Connect you with real job opportunities and
                                applicants
                            </li>
                            <li>
                                Speed-up the job-searching and recruiting
                                process
                            </li>
                            <li>
                                Offer valid trust through LEDJA’s
                                authentification system
                            </li>
                        </ul>
                    </article>
                </div>
                <div className="w-full flex justify-center items-center md:w-1/3 ">
                    <Image
                        className="object-contain  p-5"
                        src="/connected-world-amico.png"
                        width={384}
                        height={384}
                    />
                </div>
            </div>
            <div className="flex flex-col flex-nowrap justify-center items-center text-center w-3/4 m-auto my-32">
                <h3 className="font-medium">
                    “The unique report card provided by LEDJA significantly
                    speed up my CV screening <br /> speed, and connect fabulous
                    applicants with my company”
                </h3>
                <Image
                    className="my-5"
                    src={"/jennifer.jpg"}
                    width={80}
                    height={80}
                />
                <p className="text-sm">
                    Jennifer Musugu, Recruiting Specialist
                </p>
            </div>
            <div className="flex flex-col justify-center items-center w-3/4 m-auto">
                <h3 className="font-medium text-2xl text-center w-full">
                    Why LEDJA stands out?
                </h3>
                <p className="text-sm text-center w-full my-3 ">
                    Take a look at LEDJA’s unique and competitive services
                </p>
                <div className="grid grid-rows-3 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-2">
                    <div className=" m-2 pt-16 shadow-lg rounded-lg">
                        <div className="flex justify-center items-center bg-primary-60 w-full h-28 ">
                            <Image
                                src={"/send.svg"}
                                width={73}
                                height={63}
                                className="py-2 px-3"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="font-semibold text-lg">BASIC</h3>
                            <p className="text-xs">Free</p>
                            <h3 className="font-normal font-zilla-slab text-2xl mt-3 mb-5">
                                KSh 0
                            </h3>
                            <ul className="list-disc list-inside text-xs">
                                <li>Email blast subscribers</li>
                                <li>Highlight your ads</li>
                                <li>Pinned for 7 days</li>
                                <li>
                                    Extend to partner network (15k+ talents)
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className=" m-2 pt-16 shadow-lg rounded-lg">
                        <div className="flex justify-center items-center bg-primary-60 w-full h-28 ">
                            <Image
                                src={"/flight.svg"}
                                width={73}
                                height={63}
                                className="py-2 px-3"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="font-semibold text-lg">STANDARD</h3>
                            <p className="text-xs">Everything from Basic</p>
                            <h3 className="font-normal font-zilla-slab text-2xl mt-3 mb-5">
                                KSh 99
                            </h3>
                            <ul className="list-disc list-inside text-xs">
                                <li>Display company logo</li>
                                <li>Share on social media</li>
                                <li>Share on Slack channel</li>
                                <li>30 days listing</li>
                            </ul>
                        </div>
                    </div>
                    <div className=" m-2 pt-16 shadow-lg rounded-lg">
                        <div className="flex justify-center items-center bg-primary-60 w-full h-28 ">
                            <Image
                                src={"/rocket.svg"}
                                width={73}
                                height={63}
                                className="py-2 px-3"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="font-semibold text-lg">PREMIUM</h3>
                            <p className="text-xs">Everything from Standard</p>
                            <h3 className="font-normal font-zilla-slab text-2xl mt-3 mb-5">
                                KSh 199
                            </h3>
                            <ul className="list-disc list-inside text-xs">
                                <li>Email blast subscribers</li>
                                <li>Highlight your ads</li>
                                <li>Pinned for 7 days</li>
                                <li>
                                    Extend to partner network (15k+ talents)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-3/4 my-10 mx-auto  p-5">
                <h3 className="w-full font-medium text-2xl text-center my-5">
                    Trusted by the world’s best companies
                </h3>
                <div className="flex flex-row flex-nowrap justify-center items-center">
                    <Image
                        className="m-3 p-2"
                        src={"/eden.png"}
                        width={76}
                        height={48}
                    />
                    <Image
                        className="m-3 p-2"
                        src={"/lykdat.png"}
                        width={159}
                        height={52}
                    />
                    <Image
                        className="m-3 p-2"
                        src={"/corna.png"}
                        width={60}
                        height={60}
                    />
                    <Image
                        className="m-3 p-2"
                        src={"/iohubs.png"}
                        width={142}
                        height={40}
                    />
                </div>
            </div>
            <div className="w-3/4 md:w-2/3 my-3 mx-auto">
                <h2 className="font-medium text-2xl text-center">
                    Explore Now!
                </h2>
                <p className="text-sm text-center mt-4 mb-12">
                    Don’t lose your chance to find jobs or connect with talents
                    now!
                </p>
                <p className="flex flex-row nowrap w-full justify-center items-center mb-8">
                    <span
                        onClick={() => {
                            setActiveTab("jobs");
                        }}
                        className={`cursor-pointer m-3 md:mr-8 p-2 font-medium  text-center 
                    ${
                        activeTab == "jobs"
                            ? "border-b-4 border-solid border-dark-50"
                            : ""
                    }`}
                    >
                        Find Jobs
                    </span>
                    <span
                        onClick={() => {
                            setActiveTab("users");
                        }}
                        className={`cursor-pointer m-3 md:ml-8 p-2 font-normal text-center
                        ${
                            activeTab == "users"
                                ? "border-b-4 border-solid border-dark-50"
                                : ""
                        }`}
                    >
                        Find Talents
                    </span>
                </p>

                {jobsLoading && activeTab == "jobs" && (
                    <JobsCardsLoaderSkeleton />
                )}
                {!jobsLoading &&
                    activeTab == "jobs" &&
                    jobs &&
                    jobs.length > 0 &&
                    jobs.map((job, index) => {
                        if (index > 2) {
                            return;
                        }
                        return (
                            <>
                                <div
                                    // href={`/public/jobs/${job.id}`}
                                    className="flex flex-col md:grid md:grid-cols-10  justify-start items-center p-2 border border-white hover:border-my-gray-50 hover:shadow-md my-3"
                                >
                                    <p className="flex justify-center items-center row-span-3 p-2 col-span-2">
                                        {(!job.user ||
                                            !job.user.basic_info_recruiter ||
                                            !job.user.basic_info_recruiter
                                                .company_avatar_url) && (
                                            <BsBuilding className="text-8xl text-center block" />
                                        )}

                                        {job.user &&
                                            job.user.basic_info_recruiter &&
                                            job.user.basic_info_recruiter
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
                                    <div className="col-span-8">
                                        <p className="text-2xl font-semibold  md:w-3/4 p-2 px-5 text-center md:text-left ">
                                            {job.title}
                                        </p>
                                        <p className="text-justify md:w-3/4 p-2 px-5">
                                            {job.description.substr(0, 250)}
                                            ...
                                        </p>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                {/* {usersLoading && activeTab == "users" && (
                    <JobsCardsLoaderSkeleton />
                )} */}
                {!usersLoading &&
                    activeTab == "users" &&
                    users &&
                    users.length > 0 &&
                    users.map((user, index) => {
                        if (index > 2) {
                            return;
                        }
                        return (
                            <>
                                <div
                                    // href={`/public/users/${user.id}`}
                                    className="flex flex-col md:grid md:grid-cols-10  justify-start items-center p-2 border border-white hover:border-my-gray-50 hover:shadow-md my-3"
                                >
                                    <p className="flex justify-center items-center row-span-3 p-2 col-span-2 ">
                                        {(!user ||
                                            !user.basic_info_recruiter ||
                                            !user.basic_info_recruiter
                                                .avatar_url) &&
                                            (!user ||
                                                !user.basic_info_jobseeker ||
                                                !user.basic_info_jobseeker
                                                    .avatar_url) && (
                                                <BsBuilding className="text-8xl text-center block" />
                                            )}

                                        {user &&
                                            user.basic_info_recruiter &&
                                            user.basic_info_recruiter
                                                .avatar_url && (
                                                <Image
                                                    src={
                                                        user
                                                            .basic_info_recruiter
                                                            .avatar_url
                                                    }
                                                    width={100}
                                                    height={80}
                                                    className="flex justify-center items-center"
                                                />
                                            )}
                                        {user &&
                                            user.basic_info_jobseeker &&
                                            user.basic_info_jobseeker
                                                .avatar_url && (
                                                <Image
                                                    src={
                                                        user
                                                            .basic_info_jobseeker
                                                            .avatar_url
                                                    }
                                                    width={100}
                                                    height={80}
                                                    className="flex justify-center items-center"
                                                />
                                            )}
                                    </p>
                                    <div className="col-span-8">
                                        <p className="text-2xl font-semibold  md:w-3/4 p-2 px-5 text-center md:text-left capitalize ">
                                            {user.basic_info_jobseeker
                                                ? `${user.basic_info_jobseeker.fname} ${user.basic_info_jobseeker.lname}`
                                                : ""}
                                            {user.about_recruiter
                                                ? `${user.about_recruiter.fname} ${user.about_recruiter.lname}`
                                                : ""}
                                        </p>
                                        <p className="text-justify md:w-3/4 p-2 px-5 capitalize">
                                            {user.user_type.name}
                                        </p>
                                        <p className="text-justify md:w-3/4 p-2 px-5 capitalize text-my-gray-70">
                                            Member Since{" "}
                                            {
                                                Config.MONTH_NAMES[
                                                    new Date(
                                                        user.created_at
                                                    ).getMonth()
                                                ]
                                            }{" "}
                                            {new Date(
                                                user.created_at
                                            ).getFullYear()}
                                        </p>
                                    </div>
                                </div>
                            </>
                        );
                    })}
            </div>
            <div className="w-3/4 mx-auto py-10 flex justify-center items-center">
                <PrimaryBtn
                    text={"Sign up to see more"}
                    path="/role-selection"
                />
            </div>

            <Footer />
        </>
    );
}
