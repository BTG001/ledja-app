import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
                {userTypeId == 1 && <JobSeekerProfileIcon />}
                {userTypeId == 2 && <RecruiterProfileIcon icon={"user"} />}
            </div>
        </div>
    );
}
