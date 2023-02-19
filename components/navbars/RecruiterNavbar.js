import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RecruiterProfileIcon from "../recuriters/recruiter-profile-icon";

export default function RecruiterNavbar({
    active = "dashboard",
    icon = "company",
    dashboardLinks = true,
}) {
    return (
        <>
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
                <div className="flex flex-row flex-nowrap justify-center items-center rounded-full bg-white w-12 h-12">
                    {/* <Image
                        className="mx-3 p-2 "
                        src={"/company-icon.svg"}
                        width={46}
                        height={46}
                    /> */}
                    <RecruiterProfileIcon icon={icon} />
                </div>
            </div>
            {dashboardLinks && (
                <div
                    className="px-12 py-3 bg-my-gray-40
            flex
            flex-row
            flex-nowrap
            justify-start
            items-center"
                >
                    <Link
                        className={`text-dark-60  mx-3 p-2 ${
                            active == "dashboard"
                                ? " font-semibold border-b-2 border-dark-60 border-solid"
                                : ""
                        }`}
                        href={"/recruiter/recruiter-dashboard"}
                    >
                        Dashboard
                    </Link>
                    <Link
                        className={`text-dark-50 mx-3 p-2
                    ${
                        active == "progress-card"
                            ? " font-semibold border-b-2 border-dark-60 border-solid"
                            : ""
                    }
                    `}
                        href={"/recruiter/progress-card"}
                    >
                        Progress card
                    </Link>
                    <Link
                        className={`text-dark-60 mx-3 p-2
                ${
                    active == "message"
                        ? " font-semibold border-b-2 border-dark-60 border-solid"
                        : ""
                }
                `}
                        href={"/message"}
                    >
                        Message
                    </Link>
                </div>
            )}
        </>
    );
}
