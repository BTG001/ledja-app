import { useState, useEffect } from "react";
import Utils from "../../../Utils";
import Config from "../../../Config";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import GuestNavbar from "../../../components/navbars/GuestNavbar";
import Footer from "../../../components/Footer";
import { BsBuilding } from "react-icons/bs";
import JobsCardsLoaderSkeleton from "../../../components/skeleton-loaders/jobs-cards-skeleton-loader";

export default function Jobs() {
    const [jobs, setJobs] = useState();
    const [jobsLoading, setJobsLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
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

    return (
        <>
            <GuestNavbar />

            <div className="md:w-2/3 w-3/4 mx-auto my-5">
                <div className="min-h-80-screen">
                    {jobsLoading && <JobsCardsLoaderSkeleton />}
                    {!jobsLoading &&
                        jobs &&
                        jobs.length > 0 &&
                        jobs.map((job) => {
                            return (
                                <>
                                    <Link
                                        href={`/public/jobs/${job.id}`}
                                        className="flex flex-col md:flex-row justify-start items-center p-2 border border-my-gray-50 hover:shadow-md my-3"
                                    >
                                        <p className="flex justify-center items-center row-span-3 p-2">
                                            {(!job.user ||
                                                !job.user
                                                    .basic_info_recruiter ||
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
                                        <div>
                                            <p className="text-2xl font-semibold  md:w-3/4 p-2 px-5 text-center md:text-left ">
                                                {job.title}
                                            </p>
                                            <p className="text-justify md:w-3/4 p-2 px-5">
                                                {job.description.substr(0, 250)}
                                                ...
                                            </p>
                                        </div>
                                    </Link>
                                </>
                            );
                        })}
                </div>
            </div>
            <Footer />
        </>
    );
}
