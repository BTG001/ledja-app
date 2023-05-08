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
import ReloadCreditPopup from "../../components/payments/reload-credit-popup";
import ReloadSuccessPopup from "../../components/payments/reload-success-popup";
import CreditHistory from "../../components/recuriters/credit-history";
import { useRouter } from "next/router";
import Pagination from "../../components/pagination";

export default function RecruiterDashbaord() {
    const router = useRouter();
    const [jobs, setJobs] = useState();
    const [fname, setFname] = useState("");
    const [wallet, setWallet] = useState({});
    const [jobsLoading, setJobsLoading] = useState(true);

    const [messages, setMessages] = useState({});

    const [publicProfileURL, setPublicProfileURL] = useState();

    const [messagesLoading, setMessagesLoading] = useState(true);
    const [recruiterLoading, setRecruiterLoading] = useState(true);
    const [amountReloaded, setAmountReloaded] = useState(0);
    const [showReloadCreditPopup, setShowReloadCreditPopup] = useState(false);
    const [showReloadSuccessPopup, setShowReloadSuccessPopup] = useState(false);

    const [showCreditHistoryPopup, setShowCreditHistoryPopup] = useState(false);

    const [paginationData, setPaginationData] = useState({});

    let runOnce = false;

    useEffect(() => {
        // console.log("jobs: ", jobs);
        if (!runOnce) {
            runOnce = true;
            getJobs();
            fetchRecruiter();
            fetchRecruiterMessages();
        }
    }, []);

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        // console.log("query: ", router.query);
        if (router.query.transaction_id) {
            onVerifyPayment(router.query.transaction_id);
        }
    }, [router.isReady]);

    const onChangePage = (newPageURL) => {
        getJobs(newPageURL);
    };

    async function getJobs(newPageURL) {
        setJobsLoading(true);
        const userId = localStorage.getItem("user_id");
        let url = newPageURL;
        if (!newPageURL) {
            url = `${Config.API_URL}/get_user_jobs/${userId}`;
        }

        try {
            let theJobs = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            console.log("Pagination data: ", theJobs.data.data);

            setPaginationData(theJobs.data.data);

            theJobs = theJobs.data.data.data;

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
            const whenPaymentTheAmount = localStorage.getItem("payment_amount");

            setAmountReloaded(whenPaymentTheAmount);

            const whenPaymentTheAuthorizationId = localStorage.getItem(
                "payment_authorization_id"
            );

            // console.log(
            //     "when payment------",
            //     "Payment Authorization ID: ",
            //     whenPaymentTheAuthorizationId,
            //     "Amount: ",
            //     whenPaymentTheAmount
            // );

            const userId = localStorage.getItem("user_id");

            setPublicProfileURL(
                `${location.origin}/public/users/recruiters/${userId}`
            );

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
                // if (whenPaymentTheAmount && whenPaymentTheAuthorizationId) {
                //     onVerifyPayment(whenPaymentTheAuthorizationId);
                // }
            }

            setRecruiterLoading(false);
            console.log("recruiter: ", recruiter);
        } catch (error) {
            setRecruiterLoading(false);
            console.log("recruiter profile Error: ", error);
        }
    }

    const onVerifyPayment = (paymentId) => {
        setShowReloadSuccessPopup(true);

        Utils.makeRequest(async () => {
            try {
                const url = `${Config.API_URL}/verify_payment/${paymentId}`;

                let verification = await axios.post(
                    url,
                    {},
                    {
                        headers: Utils.getHeaders(),
                    }
                );

                verification = verification.data.data;

                console.log("Verification: ", verification);

                if (!verification.wallet) {
                    // setFailedMessage(verification);
                } else {
                    setWallet(verification.wallet);
                    setShowReloadSuccessPopup(true);
                }
            } catch (error) {
                console.log("transaction Error: ", error);
            }
        });
    };

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

    const onClose = () => {
        setShowReloadCreditPopup(false);
        setShowReloadSuccessPopup(false);
        setShowCreditHistoryPopup(false);
    };

    const onAfterPayment = () => {
        console.log("on after payment");
        setShowReloadSuccessPopup(false);
        localStorage.removeItem("payment_authorization_id");
        localStorage.removeItem("payment_method");
        history.pushState(
            { search: "" },
            "",
            location.origin + location.pathname
        );
    };
    const onReloaded = (wallet, theAmountReloaded) => {
        setWallet(wallet);
        setAmountReloaded(theAmountReloaded);
        setShowReloadCreditPopup(false);
        setShowReloadSuccessPopup(true);
    };

    return (
        <>
            <ReloadCreditPopup
                showPopup={showReloadCreditPopup}
                onClose={onClose}
                wallet={wallet}
                onReloaded={onReloaded}
            />

            <ReloadSuccessPopup
                showPopup={showReloadSuccessPopup}
                onAfterPayment={onAfterPayment}
                balance={wallet.amount}
                amountReloaded={amountReloaded}
            />
            <CreditHistory
                showPopup={showCreditHistoryPopup}
                onClose={onClose}
            />
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
                        <>
                            <Pagination
                                data={paginationData}
                                onChangePage={onChangePage}
                            />
                            <JobsTable jobs={jobs} jobsLoading={jobsLoading} />

                            <Pagination
                                data={paginationData}
                                onChangePage={onChangePage}
                            />
                        </>
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
                                    <p
                                        onClick={() => {
                                            setShowReloadCreditPopup(true);
                                        }}
                                        className="text-primary-70 border border-primary-70 border-solid hover:border-primary-60 bg-white rounded-lg py-1 px-4 m-2 cursor-pointer"
                                    >
                                        Add Credits
                                    </p>
                                    <p
                                        onClick={() => {
                                            setShowCreditHistoryPopup(true);
                                        }}
                                        className="text-primary-70 border border-primary-70 border-solid hover:border-primary-60 bg-white rounded-lg py-1 px-4 m-2 cursor-pointer"
                                    >
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
                                    Unread messages ({messages.unread_messages})
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
                                    You have{" "}
                                    {messages.messages
                                        ? messages.messages.length
                                        : "0"}{" "}
                                    messages
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <p className="text-dark-50 font-medium my-3">
                    Applicants management
                </p>
                {/* <div className="md:grid md:grid-cols-4 gap-4"> */}
                <div className="">
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

                    {/* <div className="col-span-1 shadow-md my-3 p-3 rounded-10 min-h-40-screen flex flex-col justify-center items-center border border-solid border-my-gray-40">
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
                    </div> */}
                    {/* <div className="col-span-1 shadow-md my-3 p-3 rounded-10 min-h-40-screen flex flex-col justify-center items-center border border-solid border-my-gray-40">
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
                    </div> */}
                </div>
                <div className="md:grid md:grid-cols-2 shadow-md my-3 p-4 rounded-10 min-h-20-screen border border-solid border-my-gray-40">
                    <div>
                        <p className="text-sm text-center md:text-left ">
                            Advertise your jobs in your social networks
                        </p>
                        <div className="border border-solid border-my-gray-70 my-3 px-4 py-2 rounded-md flex flex-row flex-wrap justify-between items-center">
                            <span className="text-my-gray-70 text-xs">
                                {publicProfileURL}
                            </span>
                            <span
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        publicProfileURL
                                    );
                                    alert("copied!");
                                }}
                                className="text-primary-70 text-sm cursor-pointer"
                            >
                                Copy link
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-center ">
                            Share your jobs on your social networks
                        </p>
                        <div className="flex flex-row flex-nowrap justify-center items-center my-3">
                            <Link target="_blank" href={"https://facebook.com"}>
                                <Image
                                    src={"/filled-fb-icon.svg"}
                                    width={18}
                                    height={20}
                                    className="m-2"
                                />
                            </Link>
                            <Link target="_blank" href={"https://linkedin.com"}>
                                <Image
                                    src={"/filled-linkedin-icon.svg"}
                                    width={16}
                                    height={18}
                                    className="m-2"
                                />
                            </Link>

                            <Link
                                target="_blank"
                                href={"https://web.telegram.org"}
                            >
                                <Image
                                    src={"/filled-telegram-icon.svg"}
                                    width={18}
                                    height={20}
                                    className="m-2"
                                />
                            </Link>

                            <Link target="_blank" href={"https://twitter.com"}>
                                <Image
                                    src={"/twitter.svg"}
                                    width={18}
                                    height={16}
                                    className="m-2"
                                />
                            </Link>

                            <Link
                                target="_blank"
                                href={"https://web.whatsapp.com"}
                            >
                                <Image
                                    src={"/whatsapp-icon.svg"}
                                    width={16}
                                    height={17}
                                    className="m-2"
                                />
                            </Link>
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
