import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Config from "../../Config";
import JobSeekerProfileIcon from "../job-seekers/job-seeker-profile-icon";
import RecruiterProfileIcon from "../recuriters/recruiter-profile-icon";

export default function AuthenticatedNavbar() {
    const [userTypeId, setUserTypeId] = useState(1);

    useEffect(() => {
        setUserTypeId(localStorage.getItem("user_type_id"));
    }, []);
    return (
        <div
            className="px-12 py-6 bg-my-gray-50
            flex
            flex-row
            flex-nowrap
            justify-between
            items-center"
        >
            <Link href={"/"}>
                <Image src="/Logo.svg" width={117} height={64} />
            </Link>
            <div className="flex flex-row flex-nowrap justify-center items-center">
                {userTypeId == Config.JOB_SEEKER_USER_TYPE_ID && (
                    <JobSeekerProfileIcon />
                )}
                {userTypeId == Config.RECRUITER_USER_TYPE_ID && (
                    <RecruiterProfileIcon icon={"user"} />
                )}
            </div>
        </div>
    );
}
