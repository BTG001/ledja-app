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
import { useRouter } from "next/router";
import JobLoaderSkeleton from "../../../components/skeleton-loaders/job-skeleton-loader";

export default function Jobs() {
    const router = useRouter();
    const { jobId } = router.query;

    const [job, setJob] = useState();
    const [jobLoading, setJobLoading] = useState(true);

    useEffect(() => {
        if (!router.isReady) return;
        fetchJob();
    }, [router.isReady]);

    async function fetchJob() {
        setJobLoading(true);

        console.log("jobId: ", jobId);

        const url = `${Config.API_URL}/jobs/${jobId}`;

        console.log("url: ", url);

        try {
            let theJob = await axios.get(url);

            theJob = theJob.data.data;

            setJob(theJob);

            console.log("Job: ", theJob);
            setJobLoading(false);
        } catch (error) {
            setJobLoading(false);
            console.log("Jobs request error: ", error);
        }
    }

    return (
        <>
            <GuestNavbar />

            <div className="md:w-2/3 w-3/4 mx-auto my-5">
                <div className="min-h-80-screen">
                    {jobLoading && <JobLoaderSkeleton />}
                    {!jobLoading && job && (
                        <>
                            <div className="flex flex-col justify-center items-center p-2  my-3">
                                <p className="flex justify-center items-center row-span-3 p-2">
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
                                                width={200}
                                                height={160}
                                                className="flex justify-center items-center"
                                            />
                                        )}
                                </p>
                                <div>
                                    <p className="text-2xl font-semibold  md:w-3/4 p-2 px-5 text-center m-auto ">
                                        {job.title}
                                    </p>
                                    <p className="text-justify md:w-3/4 p-2 px-5 m-auto">
                                        {job.description.substr(0, 250)}
                                        ...
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
