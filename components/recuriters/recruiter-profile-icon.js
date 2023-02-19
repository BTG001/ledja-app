import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function RecruiterProfileIcon({ icon }) {
    const [showLinks, setShowLinks] = useState(false);

    const onShowLinks = () => {
        setShowLinks(true);
    };

    const onCloseLinks = () => {
        setShowLinks(false);
    };

    return (
        <div className="relative ">
            <div onClick={onShowLinks} className="p-2 cursor-pointer">
                {icon == "user" && (
                    <Image src="/user-icon.svg" width={46} height={46} />
                )}
                {icon == "company" && (
                    <Image src="/company-icon.svg" width={46} height={46} />
                )}
            </div>

            <div
                className={`
                ${showLinks ? "flex" : "hidden"}
                flex-row justify-between items-start p-3 absolute top-full -left-full -translate-x-1/2 bg-white m-5 rounded-md w-max shadow-sm border border-solid border-primary-40`}
            >
                <div className="grid grid-rows-4 gap-2 text-sm">
                    <Link className="hover:bg-primary-40 py-1 px-2" href={"/"}>
                        Log out
                    </Link>
                    <Link
                        className="hover:bg-primary-40 py-1 px-2"
                        href={"/recruiter/profile"}
                    >
                        Manage Profiles
                    </Link>
                    <Link className="hover:bg-primary-40 py-1 px-2" href={"/"}>
                        Reset Password
                    </Link>
                    <Link className="hover:bg-primary-40 py-1 px-2" href={"/"}>
                        Update Profile Image
                    </Link>
                </div>
                <div>
                    <Image
                        className="p-2 cursor-pointer"
                        src="/x-icon.svg"
                        width={28}
                        height={28}
                        onClick={onCloseLinks}
                    />
                </div>
            </div>
        </div>
    );
}
