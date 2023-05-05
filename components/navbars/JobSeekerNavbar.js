import Image from "next/image";
import Link from "next/link";
import JobSeekerProfileIcon from "../job-seekers/job-seeker-profile-icon";

export default function JobSeekerNavbar({ active }) {
    return (
        <>
            <div
                className="px-12 py-2 bg-my-gray-50
            flex
            flex-row
            flex-wrap
            justify-between
            items-center"
            >
                <Link href={"/"} className="">
                    <Image src="/Logo.svg" width={117} height={64} />
                </Link>
                <div className="hidden md:flex flex-row flex-nowrap justify-center items-center">
                    <Link
                        className={`text-dark-50 mx-3 p-2 ${
                            active == "job-search"
                                ? "border-b-2 border-dark-60 border-solid"
                                : ""
                        }`}
                        href={"/job-seeker/job-search"}
                    >
                        Search Jobs
                    </Link>
                    <Link
                        className={`text-dark-50 mx-3 p-2 ${
                            active == "my-jobs"
                                ? "border-b-2 border-dark-60 border-solid"
                                : ""
                        }`}
                        href={"/job-seeker/my-jobs"}
                    >
                        My Jobs
                    </Link>
                    <Link
                        className={`text-dark-50 mx-3 p-2 ${
                            active == "message"
                                ? "border-b-2 border-dark-60 border-solid"
                                : ""
                        }`}
                        href={"/job-seeker/messages"}
                    >
                        Messages
                    </Link>

                    <JobSeekerProfileIcon />
                </div>
                <div className="md:hidden">
                    <JobSeekerProfileIcon />
                </div>
            </div>

            <div className="md:hidden flex flex-row flex-nowrap justify-center items-center">
                <Link
                    className={`text-dark-50 mx-3 p-2 ${
                        active == "job-search"
                            ? "border-b-2 border-dark-60 border-solid"
                            : ""
                    }`}
                    href={"/job-seeker/job-search"}
                >
                    Search Jobs
                </Link>
                <Link
                    className={`text-dark-50 mx-3 p-2 ${
                        active == "my-jobs"
                            ? "border-b-2 border-dark-60 border-solid"
                            : ""
                    }`}
                    href={"/job-seeker/my-jobs"}
                >
                    My Jobs
                </Link>
                <Link
                    className={`text-dark-50 mx-3 p-2 ${
                        active == "message"
                            ? "border-b-2 border-dark-60 border-solid"
                            : ""
                    }`}
                    href={"/job-seeker/messages"}
                >
                    Messages
                </Link>

                {/* <JobSeekerProfileIcon /> */}
            </div>
        </>
    );
}
