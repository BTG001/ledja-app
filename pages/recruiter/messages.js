import { useState, useEffect } from "react";
import RecruiterNavbar from "../../components/navbars/RecruiterNavbar";
import Config from "../../Config";
import Utils from "../../Utils";
import axios from "axios";
import RecruiterMessagesLoaderSkeleton from "../../components/skeleton-loaders/recruiter-messages-skeleton-loader";

export default function RecruiterMessages() {
    const [messages, setMessages] = useState({});

    const [messagesLoading, setMessagesLoading] = useState(true);

    useEffect(() => {
        fetchRecruiterMessages();
    }, []);

    async function fetchRecruiterMessages() {
        setMessagesLoading(true);
        try {
            const userId = localStorage.getItem("user_id");
            const url = `${Config.API_URL}/messages/user/${userId}`;
            let recruiterMessages = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            recruiterMessages = recruiterMessages.data.data.messages;

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
            <RecruiterNavbar active="message" />
            <section className="md:w-4/5 w-5/6 mx-auto my-5">
                {messagesLoading && <RecruiterMessagesLoaderSkeleton />}
                {messages &&
                    !messagesLoading &&
                    messages.map((message) => {
                        return (
                            <div className="my-2 bg-my-gray-50 p-2 rounded-sm">
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
                                        {message.recruiter_message}
                                    </span>
                                </p>
                            </div>
                        );
                    })}
            </section>
        </>
    );
}
