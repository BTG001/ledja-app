import { useState, useEffect } from "react";

import Config from "../../Config";
import Utils from "../../Utils";
import axios from "axios";
import userMessagesLoaderSkeleton from "../../components/skeleton-loaders/recruiter-messages-skeleton-loader";
import JobSeekerNavbar from "../../components/navbars/JobSeekerNavbar";
import Image from "next/image";
import Pagination from "../../components/pagination";

export default function JobSeekerMessages() {
    const [messages, setMessages] = useState({});

    const [messagesLoading, setMessagesLoading] = useState(true);

    const [activeTab, setActiveTab] = useState("unread");
    const [paginationData, setPaginationData] = useState({});

    useEffect(() => {
        fetchUserMessages();
    }, []);

    const onChangePage = (newPageURL) => {
        fetchUserMessages(newPageURL);
    };

    async function fetchUserMessages() {
        setMessagesLoading(true);
        try {
            const userId = localStorage.getItem("user_id");
            const url = `${Config.API_URL}/messages/user/${userId}`;
            let userMessages = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            console.log("pagination data", userMessages.data.data);

            setPaginationData(userMessages.data.data);

            userMessages = userMessages.data.data.data.messages;
            console.log("jobseeker messages: ", userMessages);

            setMessages(userMessages);
            setMessagesLoading(false);
        } catch (error) {
            setMessagesLoading(false);
            console.log("jobseeker messages Error: ", error);
        }
    }

    async function dismissMessage(message) {
        const updateReadURL = `${Config.API_URL}/messages/${message.id}`;
        const formData = new FormData();
        formData.append("has_jobseeker_read", 1);

        Utils.makeRequest(async () => {
            try {
                let readResults = await Utils.putForm(updateReadURL, formData);
                fetchUserMessages();
                console.log(
                    "message: ",
                    message.id,
                    "read results: ",
                    readResults
                );
            } catch (error) {
                console.log("message: ", message.id, "read results: ", error);
            }
        });
    }

    return (
        <>
            <JobSeekerNavbar active={"message"} />
            <section className="md:w-4/5 w-5/6 mx-auto my-5">
                <p className="flex flex-row justify-center items-center p-2">
                    <span
                        onClick={() => {
                            setActiveTab("unread");
                        }}
                        className={`cursor-pointer p-2 px-4 
                    ${activeTab == "unread" ? "bg-my-gray-50" : ""} rounded-10
                    `}
                    >
                        Unread
                    </span>
                    <span
                        onClick={() => {
                            setActiveTab("read");
                        }}
                        className={`cursor-pointer p-2 px-4 
                    ${activeTab == "read" ? "bg-my-gray-50" : ""} rounded-10
                    `}
                    >
                        Read
                    </span>
                </p>

                {messages && messages.length > 0 && (
                    <Pagination
                        data={paginationData}
                        onChangePage={onChangePage}
                    />
                )}

                {!messagesLoading && (!messages || messages.length < 1) && (
                    <p className="text-center">No Messages</p>
                )}
                {messagesLoading && <userMessagesLoaderSkeleton />}
                {messages &&
                    !messagesLoading &&
                    messages.map((message) => {
                        if (
                            activeTab == "unread" &&
                            message.has_jobseeker_read
                        ) {
                            return <></>;
                        }
                        if (
                            activeTab == "read" &&
                            !message.has_jobseeker_read
                        ) {
                            return <></>;
                        }
                        return (
                            <div className="my-3 bg-my-gray-50 p-2 rounded-lg">
                                {activeTab != "read" && (
                                    <p
                                        className="flex justify-end "
                                        title="dismiss"
                                    >
                                        <Image
                                            onClick={() => {
                                                dismissMessage(message);
                                            }}
                                            src={"/x-icon.svg"}
                                            className="cursor-pointer p-1 bg-white text-red-500 rounded-full"
                                            width={20}
                                            height={20}
                                        />
                                    </p>
                                )}
                                <p className="flex flex-cols justify-start md:grid md:grid-cols-5">
                                    <span className="text-lg font-medium text-dark p-2 mr-3">
                                        Job
                                    </span>
                                    <span className="p-2 text-my-gray-70 col-span-4">
                                        {message.application.job.title}
                                    </span>
                                </p>
                                <p className="flex flex-cols justify-start md:grid md:grid-cols-5">
                                    <span className="text-lg font-medium text-dark p-2 mr-3">
                                        Applicant
                                    </span>
                                    <span className="p-2 text-my-gray-70 col-span-4">
                                        {message.application.user.email}
                                    </span>
                                </p>
                                <p className="flex flex-cols justify-start md:grid md:grid-cols-5">
                                    <span className="text-lg font-medium text-dark p-2 mr-3">
                                        Message
                                    </span>
                                    <span className="p-2 text-my-gray-70 col-span-4">
                                        {message.jobseeker_message}
                                    </span>
                                </p>
                            </div>
                        );
                    })}
            </section>
            {messages && messages.length > 0 && (
                <Pagination data={paginationData} onChangePage={onChangePage} />
            )}
        </>
    );
}
