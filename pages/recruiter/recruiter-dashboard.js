import Footer from "../../components/Footer";
import RecruiterNavbar from "../../components/navbars/RecruiterNavbar";
import PrimaryBtn from "../../components/buttons/PrimaryBtn";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Config from "../../Config";
import axios from "axios";
import Utils from "../../Utils";
import JobsTable from "../../components/recuriters/jobsTable";
import DashboardJobsLoaderSkeleton from "../../components/skeleton-loaders/dashboard-jobs-loader-skeleton";
import DashboardCreditLoaderSkeleton from "../../components/skeleton-loaders/dashboard-credit-skeleton-loader";
import DashboardMessageCounterLoaderSkeleton from "../../components/skeleton-loaders/dashboard-messages-counter-skeleton-loader";

export default function RecruiterDashbaord() {
    const [jobs, setJobs] = useState();
    const [fname, setFname] = useState("");
    const [wallet, setWallet] = useState({});
    const [jobsLoading, setJobsLoading] = useState(true);

    const [messages, setMessages] = useState({});

    const [messagesLoading, setMessagesLoading] = useState(true);
    const [recruiterLoading, setRecruiterLoading] = useState(true);

    useEffect(() => {
        // console.log("jobs: ", jobs);
        getJobs();
        fetchRecruiter();
        fetchRecruiterMessages();
    }, []);

    async function getJobs() {
        setJobsLoading(true);
        const userId = localStorage.getItem("user_id");
        const url = `${Config.API_URL}/get_user_jobs/${userId}`;

        try {
            let theJobs = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            theJobs = theJobs.data.data;

            if (theJobs && theJobs.length > 0) {
                setJobs(theJobs);
            }

            setJobsLoading(false);

            console.log("jobs: ", theJobs);
        } catch (error) {
            setJobsLoading(false);
            console.log("get jobs error: ", error);
        }
    }

    async function fetchRecruiter() {
        setRecruiterLoading(true);
        try {
            const userId = localStorage.getItem("user_id");
            const url = `${Config.API_URL}/users/${userId}`;
            let recruiter = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            recruiter = recruiter.data.data;

            if (recruiter.about_recruiter) {
                setFname(recruiter.about_recruiter.fname);
            }

            if (recruiter.wallet) {
                setWallet(recruiter.wallet);
            }

            setRecruiterLoading(false);
            console.log("recruiter: ", recruiter);
        } catch (error) {
            setRecruiterLoading(false);
            console.log("recruiter profile Error: ", error);
        }
    }

    async function fetchRecruiterMessages() {
        setMessagesLoading(true);
        try {
            const userId = localStorage.getItem("user_id");
            const url = `${Config.API_URL}/messages/user/${userId}`;
            let recruiterMessages = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            recruiterMessages = recruiterMessages.data.data;

            setMessages(recruiterMessages);

            console.log("recruiter messages: ", recruiterMessages);
            setMessagesLoading(false);
        } catch (error) {
            setMessagesLoading(false);
            console.log("recruiter messages Error: ", error);
        }
    }

    return (
        <>
            <RecruiterNavbar />
            <section className="md:w-4/5 w-5/6 mx-auto my-5">
                <div className="my-16">
                    <h1 className="text-dark-50 text-3xl text-left font-zilla-slab capitalize my-3">
                        {fname ? ` Welcome, ${fname}!` : "Welcome!"}
                    </h1>
                    <p className="font-medium text-dark-50">
                        Post a job and hire talents now
                    </p>
                </div>
                <div className="flex flex-row flex-nowrap justify-between items-center my-3 mx-auto">
                    <p className="text-dark-50 font-medium">
                        Position management
                    </p>
                    <PrimaryBtn
                        text={"Post a job"}
                        path="/recruiter/job-posting/step1"
                    />
                </div>
                <div className="shadow-md my-3 p-3 rounded-10 min-h-40-screen flex flex-col justify-center items-center border border-solid border-my-gray-40">
                    {jobsLoading && <DashboardJobsLoaderSkeleton />}
                    {!jobsLoading && jobs && (
                        <JobsTable jobs={jobs} jobsLoading={jobsLoading} />
                    )}

                    {!jobs && !jobsLoading && (
                        <>
                            <h3 className="font-semibold text-dark-50 text-center">
                                Job listings
                            </h3>
                            <p className="text-sm text-dark-50 text-center ">
                                You have not posted any jobs yet
                            </p>
                        </>
                    )}
                </div>
                <div className="md:grid md:grid-cols-2 gap-4">
                    <div className="shadow-md my-3 p-3 rounded-10 min-h-40-screen flex flex-col justify-center items-center border border-solid border-my-gray-40">
                        {recruiterLoading && <DashboardCreditLoaderSkeleton />}

                        {wallet && !recruiterLoading && (
                            <>
                                <h3 className="font-medium">
                                    Job listing credit{" "}
                                </h3>
                                <p className="my-3">
                                    <span className="text-dark-50 text-sm">
                                        Ksh
                                    </span>
                                    <span className="text-4xl text-dark-50">
                                        {" "}
                                        {wallet.amount
                                            ? wallet.amount.toFixed(2)
                                            : "0,00"}{" "}
                                    </span>
                                </p>
                                <div className="flex flex-row flex-wrap justify-center items-center">
                                    <p className="text-primary-70 border border-primary-70 border-solid hover:border-primary-60 bg-white rounded-lg py-1 px-4 m-2 cursor-pointer">
                                        Add Credits
                                    </p>
                                    <p className="text-primary-70 border border-primary-70 border-solid hover:border-primary-60 bg-white rounded-lg py-1 px-4 m-2 cursor-pointer">
                                        Credit history
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className=" shadow-md my-3 p-3 rounded-10 min-h-40-screen flex flex-col justify-center items-center border border-solid border-my-gray-40">
                        {messagesLoading && (
                            <DashboardMessageCounterLoaderSkeleton />
                        )}

                        {messages && !messagesLoading && (
                            <>
                                <Link
                                    href={"/recruiter/messages"}
                                    className="font-medium text-center"
                                >
                                    Unread messages ({messages.length})
                                </Link>
                                <Image
                                    src={"/message-icon.svg"}
                                    width={60}
                                    height={50}
                                    className="my-3 p-2"
                                />
                                <Link
                                    href={"/recruiter/messages"}
                                    className="text-sm text-center"
                                >
                                    You have {messages.length} messages
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <p className="text-dark-50 font-medium my-3">
                    Applicants management
                </p>
                <div className="md:grid md:grid-cols-4 gap-4">
                    <Link
                        href={"/recruiter/progress-card"}
                        className="col-span-2 shadow-md my-3 p-3 rounded-10 min-h-40-screen flex flex-col justify-center items-center border border-solid border-my-gray-40 hover:border hover:border-primary-40"
                    >
                        <h3 className="font-medium flex flex-row flex-nowrap justify-center items-center">
                            <span>Progress card</span>
                            <Image
                                src={"/progress-card-icon.svg"}
                                width={24}
                                height={24}
                                className=" p-1 m-1"
                            />
                        </h3>
                        <p className="my-3 text-xs text-dark-50 text-center">
                            {jobs && jobs.length != 1
                                ? `${jobs.length} active jobs`
                                : ""}
                            {jobs && jobs.length == 1 ? `1 active job ` : ""}
                        </p>
                    </Link>

                    <div className="col-span-1 shadow-md my-3 p-3 rounded-10 min-h-40-screen flex flex-col justify-center items-center border border-solid border-my-gray-40">
                        <h3 className="font-medium text-center">
                            Upcoming interview
                        </h3>
                        <p className="text-4xl text-dark-50 my-5">0</p>
                        <p className="text-sm text-center flex flex-row justify-center items-center">
                            <span className="underline text-dark-50">
                                Click to see
                            </span>
                            <Image
                                src={"/next-icon.svg"}
                                width={7}
                                height={15}
                                className="m-2"
                            />
                        </p>
                    </div>
                    <div className="col-span-1 shadow-md my-3 p-3 rounded-10 min-h-40-screen flex flex-col justify-center items-center border border-solid border-my-gray-40">
                        <h3 className="font-medium text-center">
                            Waiting to confirm
                        </h3>
                        <p className="text-4xl text-dark-50 my-5">0</p>
                        <p className="text-sm text-center flex flex-row justify-center items-center">
                            <span className="underline text-dark-50">
                                Click to see
                            </span>
                            <Image
                                src={"/next-icon.svg"}
                                width={7}
                                height={15}
                                className="m-2"
                            />
                        </p>
                    </div>
                </div>
                <div className="md:grid md:grid-cols-2 shadow-md my-3 p-4 rounded-10 min-h-20-screen border border-solid border-my-gray-40">
                    <div>
                        <p className="text-sm text-center md:text-left ">
                            Advertise your jobs in your social networks
                        </p>
                        <div className="border border-solid border-my-gray-70 my-3 px-4 py-2 rounded-md flex flex-row flex-wrap justify-between items-center">
                            <span className="text-my-gray-70 text-xs">
                                https://www.ledja.co.ke/employer/sign-up?ref=064d8569
                            </span>
                            <span className="text-primary-70 text-sm cursor-pointer">
                                Copy link
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-center ">
                            Share your jobs on your social networks
                        </p>
                        <div className="flex flex-row flex-nowrap justify-center items-center my-3">
                            <Image
                                src={"/filled-fb-icon.svg"}
                                width={18}
                                height={20}
                                className="m-2"
                            />
                            <Image
                                src={"/filled-linkedin-icon.svg"}
                                width={16}
                                height={18}
                                className="m-2"
                            />
                            <Image
                                src={"/filled-telegram-icon.svg"}
                                width={18}
                                height={20}
                                className="m-2"
                            />
                            <Image
                                src={"/twitter.svg"}
                                width={18}
                                height={16}
                                className="m-2"
                            />
                            <Image
                                src={"/whatsapp-icon.svg"}
                                width={16}
                                height={17}
                                className="m-2"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

// export async function getServerSideProps(context) {
//     console.log("context: ", context);
//     // const userId = localStorage.getItem("user_id");
//     const userId = 2;
//     const url = `${Config.API_URL}/get_user_jobs/${userId}`;

//     try {
//         let theJobs = await axios.get(url, {
//             // headers: Utils.getHeaders(),
//         });

//         theJobs = theJobs.data.data;

//         // if (theJobs && theJobs.length > 0) {
//         //     setJobs(theJobs);
//         // }

//         console.log("jobs: ", theJobs);
//         return {
//             props: { jobs: theJobs || null }, // will be passed to the page component as props
//         };
//     } catch (error) {
//         console.log("get jobs error: ", error);
//         return {
//             props: { jobs: null }, // will be passed to the page component as props
//         };
//     }
// }
