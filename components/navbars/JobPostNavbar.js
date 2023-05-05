import Image from "next/image";
import Link from "next/link";
import RecruiterProfileIcon from "../recuriters/recruiter-profile-icon";

import SecondaryBtn from "../../components/buttons/SecondaryBtn";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Utils from "../../Utils";

export default function RecruiterNavbar({ currentStepText }) {
    const router = useRouter();

    useEffect(() => {
        if (!Utils.isLoggedIn()) {
            router.push("/login");
        }
    }, []);
    return (
        <>
            <div
                className="px-12 py-4 bg-my-gray-50
            flex
            flex-row
            flex-wrap
            justify-between
            items-center border-b border-solid border-my-gray-70"
            >
                <Link href={"/"}>
                    <Image src="/Logo.svg" width={117} height={64} />
                </Link>

                <p className="hidden md:block text-xl  text-dark-50">
                    {currentStepText}
                </p>

                <div className="flex flex-row flex-wrap justify-center items-center">
                    {/* <Link
                        className="cursor-pointer w-max mx-4 px-4 py-2 bg-my-gray-50 text-primary-70 border border-solid border-primary-70 rounded-md"
                        href={"/recruiter/job-posting/step1"}
                    >
                        Post a job
                    </Link> */}

                    <div className="flex flex-row flex-nowrap justify-center items-center rounded-full w-12 h-12">
                        {/* <Image
                            className="mx-3 p-2 "
                            src={"/user-icon.svg"}
                            width={46}
                            height={46}
                        /> */}
                        <RecruiterProfileIcon icon={"user"} />
                    </div>
                </div>
                <p className="block md:hidden text-xl font-medium text-dark-50 w-full text-center py-2">
                    {currentStepText}
                </p>
            </div>
        </>
    );
}
