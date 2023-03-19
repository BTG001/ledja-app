import Link from "next/link";
import { useContext, useState } from "react";
import Image from "next/image";
import { AuthContext } from "../../pages/_app";
import { useRouter } from "next/router";

export default function JobSeekerProfileIcon() {
    const [showLinks, setShowLinks] = useState(false);
    const auth = useContext(AuthContext);
    const router = useRouter();

    const onShowLinks = () => {
        setShowLinks(true);
    };

    const onCloseLinks = () => {
        setShowLinks(false);
    };

    const onLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_type_id");
        localStorage.removeItem("email");
        localStorage.removeItem("avatar_url");
        localStorage.removeItem("company_avatar_url");
        auth.setAuth((prevValues) => {
            return {
                ...prevValues,
                isLoggedIn: false,
                avatarURL: null,
                companyAvatarURL: null,
            };
        });
        onCloseLinks();
        router.replace("/");
    };

    return (
        <div className="relative">
            <div onClick={onShowLinks} className="p-2 cursor-pointer">
                {!auth.avatarURL && (
                    <Image
                        className="rounded-full object-contain p-1"
                        src="/user-icon.svg"
                        width={46}
                        height={46}
                    />
                )}
                {auth.avatarURL && (
                    <Image
                        className="rounded-full object-contain p-1 w-full"
                        src={auth.avatarURL}
                        width={46}
                        height={46}
                    />
                )}
            </div>

            <div
                className={`
                ${showLinks ? "flex" : "hidden"}
                z-30 flex-row justify-between items-start p-3 absolute top-full -left-full -translate-x-1/2 bg-white m-5 rounded-md w-max shadow-sm border border-solid border-primary-40`}
            >
                <div className="grid grid-rows-4 gap-2 text-sm">
                    <Link
                        className="hover:bg-primary-40 py-1 px-2"
                        href={"/job-seeker/job-search"}
                    >
                        Search Jobs
                    </Link>
                    <Link
                        className="hover:bg-primary-40 py-1 px-2"
                        href={"/job-seeker/profile"}
                    >
                        Profile
                    </Link>
                    {/* <Link className="hover:bg-primary-40 py-1 px-2" href={"/"}>
                        Update Profile Image
                    </Link> */}
                    <Link className="hover:bg-primary-40 py-1 px-2" href={"/"}>
                        Reset Password
                    </Link>

                    <Link
                        onClick={onLogout}
                        className="hover:bg-primary-40 py-1 px-2 cursor-pointer"
                        href={"/"}
                    >
                        Log out
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
