import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Footer from "../../../../components/Footer";
import RecruiterNavbar from "../../../../components/navbars/RecruiterNavbar";
import SecondaryBtn from "../../../../components/buttons/SecondaryBtn";
import Utils from "../../../../Utils";
import Config from "../../../../Config";
import axios from "axios";
import { BsBuilding } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiImageEditFill } from "react-icons/ri";
import { AuthContext } from "../../../_app";
import RecruiterProfileLoader from "../../../../components/skeleton-loaders/recruiter-profile-loader";

export default function Recruiter() {
    const router = useRouter();
    const [basicInfo, setBasicInfo] = useState({});
    const [links, setLinks] = useState({});
    const [aboutRecruiter, setAboutRecruiter] = useState({});
    const [moreAboutCompany, setMoreAboutCompany] = useState({});

    const [jobs, setJobs] = useState([]);

    const [hasContactInfo, setHasContactInfo] = useState(false);
    const [hasProfilePic, setHasProfilePic] = useState(false);
    const [hasCompanyInfo, setHasCompanyInfo] = useState(false);
    const [hasCompanyIntro, setHasCompanyIntro] = useState(false);
    const [hasCompanyCulture, setHasCompanyCulture] = useState(false);
    const [hasSocialMediaLinks, setHasSocialMediaLinks] = useState(false);

    const auth = useContext(AuthContext);

    const [hasRecruiterAvatar, setHasRecruiterAvatar] = useState(false);
    const [hasCompanyAvatar, setHasCompanyAvatar] = useState(false);

    const [recruiterAvatar, setRecruiterAvatar] = useState();
    const [companyAvatar, setCompanyAvatar] = useState();

    const [profileLoading, setProfileLoading] = useState(false);

    useEffect(() => {
        fetchRecruiter();
        fetchJobs();
    }, []);

    async function fetchRecruiter() {
        setProfileLoading(true);
        try {
            const userId = localStorage.getItem("user_id");
            const url = `${Config.API_URL}/users/${userId}`;
            let recruiter = await axios.get(url);

            recruiter = recruiter.data.data;

            if (recruiter.basic_info_recruiter) {
                setBasicInfo(recruiter.basic_info_recruiter);
                setHasCompanyInfo(true);

                if (recruiter.basic_info_recruiter.company_avatar_url) {
                    setHasCompanyAvatar(true);
                    setCompanyAvatar(
                        recruiter.basic_info_recruiter.company_avatar_url
                    );
                }

                if (recruiter.basic_info_recruiter.avatar_url) {
                    setHasRecruiterAvatar(true);
                    setRecruiterAvatar(
                        recruiter.basic_info_recruiter.avatar_url
                    );
                }
            }

            if (recruiter.recruiter_link) {
                setLinks(recruiter.recruiter_link);
                setHasSocialMediaLinks(true);
            }

            if (recruiter.about_recruiter) {
                setAboutRecruiter(recruiter.about_recruiter);
                setHasContactInfo(true);
            }

            if (recruiter.more_about_recruiter) {
                setMoreAboutCompany(recruiter.more_about_recruiter);
                if (recruiter.more_about_recruiter.company_intro) {
                    setHasCompanyIntro(true);
                }

                if (recruiter.more_about_recruiter.company_culture) {
                    setHasCompanyCulture(true);
                }
            }

            console.log("recruiter: ", recruiter);

            if (alreadyShowedIncompletePopups) {
                setProfileLoading(false);
                return;
            }

            if (
                !recruiter.basic_info_recruiter &&
                !recruiter.recruiter_link &&
                !recruiter.about_recruiter &&
                !recruiter.more_about_recruiter
            ) {
                setShowMissingCompanyProfilePopup(true);
            } else {
                if (!recruiter.basic_info_recruiter) {
                    setPathToIncompleteStep("/recruiter/profile-setup/step1");
                    setShowIncompleteRecruiterProfilePopup(true);
                } else if (!recruiter.recruiter_link) {
                    setPathToIncompleteStep("/recruiter/profile-setup/step2");
                    setShowIncompleteRecruiterProfilePopup(true);
                } else if (!recruiter.about_recruiter) {
                    setPathToIncompleteStep("/recruiter/profile-setup/step3");
                    setShowIncompleteRecruiterProfilePopup(true);
                } else if (!recruiter.more_about_recruiter) {
                    setPathToIncompleteStep("/recruiter/profile-setup/step4");
                    setShowIncompleteRecruiterProfilePopup(true);
                }
            }

            setAlreadyShowedIncompletePopups(true);
            setProfileLoading(false);
        } catch (error) {
            setProfileLoading(false);
            console.log("recruiter profile Error: ", error);
        }
    }

    async function fetchJobs(url) {
        if (!url) {
            const userId = localStorage.getItem("user_id");
            url = `${Config.API_URL}/get_user_jobs/${userId}`;
        }

        try {
            let theJobs = await axios.get(url);

            theJobs = theJobs.data.data;

            setJobs(theJobs);

            console.log("user Jobs: ", theJobs);
        } catch (error) {
            console.log("user Jobs request error: ", error);
        }
    }

    return (
        <>
            <RecruiterNavbar icon={"user"} dashboardLinks={false} />
            <div className="w-4/5 md:grid grid-cols-3 md:gap-4  mt-5 mb-32 mx-auto md:grid-flow-dense md:dire ">
                {profileLoading && (
                    <section className="col-span-2">
                        <RecruiterProfileLoader />
                    </section>
                )}
                {!profileLoading && (
                    <section className="col-span-2">
                        <div className="form-input-container ">
                            <p className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                                <label className="font-medium text-my-gray-70">
                                    Basic Info
                                </label>
                            </p>
                            {hasCompanyInfo && (
                                <div
                                    className={
                                        "mt-4 p-5 border border-solid border-my-gray-70  rounded-10 md:grid md:grid-cols-3 md:gap-3 "
                                    }
                                >
                                    <div className="text-dark-50 grid grid-rows-5 gap-1 justify-center">
                                        <p className="flex justify-center items-center row-span-5">
                                            {!hasCompanyAvatar && (
                                                <BsBuilding className="h-32 text-center block w-full" />
                                            )}

                                            {hasCompanyAvatar && (
                                                <Image
                                                    src={companyAvatar}
                                                    width={160}
                                                    height={120}
                                                    className="flex justify-center items-center rounded-sm"
                                                />
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex flex-col flex-nowrap justify-start items-start w-max md:w-full m-auto">
                                        <h3 className="font-medium text-xl text-dark-50 my-5"></h3>
                                        <p className="text-sm text-dark-50">
                                            {basicInfo.company_name || ""}
                                        </p>
                                        <p className="text-sm text-dark-50">
                                            {basicInfo.location || ""}
                                        </p>
                                        <p className="grid grid-cols-2 gap-2 w-fit mt-5 mb-2">
                                            <span className="text-primary-70 text-sm">
                                                Website
                                            </span>
                                            <Link
                                                target={"_blank"}
                                                className="underline"
                                                href={links.websites || ""}
                                            >
                                                {links.websites || ""}
                                            </Link>
                                        </p>

                                        <p className="grid grid-cols-2 gap-2 w-fit mt-5 mb-2">
                                            <span className="text-primary-70 text-sm">
                                                Founded
                                            </span>
                                            <span className="text-sm">
                                                {basicInfo.founded_on || ""}
                                            </span>
                                        </p>
                                        <p className="grid grid-cols-3 gap-2 w-fit mt-5 mb-2">
                                            <span className="text-primary-70 text-sm">
                                                Size
                                            </span>
                                            <span className="text-sm line row-span-2">
                                                {basicInfo.company_size || ""}
                                            </span>
                                        </p>
                                        <p className="grid grid-cols-2 gap-2 w-fit mt-5 mb-2">
                                            <span className="text-primary-70 text-sm">
                                                Revenue
                                            </span>
                                            <span className="text-sm">
                                                {basicInfo.revenue || ""}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex flex-row flex-nowrap justify-center items-start my-3">
                                        <div className="flex justify-center items-center  mx-2">
                                            <Link
                                                target={"_blank"}
                                                className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50"
                                                href={links.linked_in || ""}
                                            >
                                                <Image
                                                    src={"/linkedin.svg"}
                                                    width={14}
                                                    height={9}
                                                />
                                            </Link>
                                        </div>
                                        <div className="flex justify-center items-center mx-2">
                                            <Link
                                                target={"_blank"}
                                                className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50"
                                                href={links.twitter || ""}
                                            >
                                                <Image
                                                    src={"/twitter.svg"}
                                                    width={13}
                                                    height={11}
                                                />
                                            </Link>
                                        </div>
                                        <div className="flex justify-center items-center  mx-2">
                                            <Link
                                                target={"_blank"}
                                                className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50"
                                                href={links.facebook || ""}
                                            >
                                                <Image
                                                    src={"/facebook.svg"}
                                                    width={8}
                                                    height={6}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {!hasCompanyInfo && (
                            <div
                                className={
                                    "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                                }
                            >
                                <Image
                                    src={"/not-interested-active-icon.svg"}
                                    width={12}
                                    height={12}
                                    className="m-2"
                                />
                                <span className="text-xs text-primary-70">
                                    No company info
                                </span>
                            </div>
                        )}
                        <div className="form-input-container ">
                            <div className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                                <p className="text-my-gray-70 font-medium">
                                    Company introduction
                                </p>
                            </div>

                            {hasCompanyIntro && (
                                <div
                                    className={
                                        "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                                    }
                                >
                                    <p>
                                        {moreAboutCompany.company_intro || ""}
                                    </p>
                                </div>
                            )}
                            {!hasCompanyIntro && (
                                <div
                                    className={
                                        "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                                    }
                                >
                                    <Image
                                        src={"/not-interested-active-icon.svg"}
                                        width={12}
                                        height={12}
                                        className="m-2"
                                    />
                                    <span className="text-xs text-primary-70">
                                        No company intro
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="form-input-container ">
                            <div className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                                <p className="text-my-gray-70 font-medium">
                                    Culture & Values
                                </p>
                            </div>

                            {hasCompanyCulture && (
                                <div
                                    className={
                                        "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                                    }
                                >
                                    <p>
                                        {moreAboutCompany.company_culture || ""}
                                    </p>
                                </div>
                            )}
                            {!hasCompanyCulture && (
                                <div
                                    className={
                                        "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                                    }
                                >
                                    <Image
                                        src={"/not-interested-active-icon.svg"}
                                        width={12}
                                        height={12}
                                        className="m-2"
                                    />
                                    <span className="text-xs text-primary-70">
                                        No company culture
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                            <p className="text-my-gray-70 font-medium">
                                Jobs Available
                            </p>
                            {/* <span className="text-primary-70">Edit</span> */}
                        </div>
                        <div className="form-input-container border border-solid rounded-md border-my-gray-70 py-2 px-4 my-3">
                            {jobs &&
                                jobs.map((job, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="grid grid-cols-4 my-3 gap-1 items-center md:w-1/2"
                                        >
                                            {!hasCompanyAvatar && (
                                                <BsBuilding className="w-20 h-20 p-3" />
                                            )}

                                            {hasCompanyAvatar && (
                                                <Image
                                                    src={companyAvatar}
                                                    width={100}
                                                    height={80}
                                                    className="flex justify-center items-center rounded-sm"
                                                />
                                            )}
                                            <div className="col-span-3 flex flex-col flex-nowrap justify-start items-start ">
                                                <h2 className=" mb-2">
                                                    {job.title}
                                                </h2>
                                                <p className="text-sm text-my-gray-70">
                                                    {job.location} ({job.type})
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            {!jobs ||
                                (jobs.length < 1 && (
                                    <p className="text-primary-70 text-center py-2">
                                        No jobs posted yet!
                                    </p>
                                ))}
                        </div>
                        <div className="form-input-container ">
                            <p className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                                <label className=" font-medium text-my-gray-70">
                                    Contact Info
                                </label>
                            </p>
                            {hasContactInfo && (
                                <div
                                    className={
                                        "mt-4 p-5 border border-solid border-my-gray-70  rounded-10 md:grid md:grid-cols-3 md:gap-3 "
                                    }
                                >
                                    <div className="text-dark-50 grid grid-rows-5 gap-1 justify-center">
                                        <p className="flex justify-center items-center row-span-4">
                                            {!hasRecruiterAvatar && (
                                                <BiUserCircle className="h-32 text-center block w-full" />
                                            )}

                                            {hasRecruiterAvatar && (
                                                <Image
                                                    src={recruiterAvatar}
                                                    width={160}
                                                    height={120}
                                                    className="flex justify-center items-center rounded-sm"
                                                />
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex flex-col flex-nowrap justify-center items-center md:justify-start md:items-start">
                                        <h3 className="font-medium text-xl text-dark-50 my-5">
                                            {aboutRecruiter.fname}{" "}
                                            {aboutRecruiter.lname}
                                        </h3>
                                        <p className="text-sm text-dark-50">
                                            {aboutRecruiter.company_position}
                                        </p>

                                        <p className="flex flex-row flex-nowrap justify-between items-center my-5 ">
                                            <Image
                                                src={"/email.svg"}
                                                width={20}
                                                height={20}
                                                className="mr-3"
                                            />
                                            <Image
                                                src={"/phone.svg"}
                                                width={20}
                                                height={20}
                                                className="ml-3"
                                            />
                                        </p>
                                        <SecondaryBtn
                                            text={"Message"}
                                            path="/message"
                                        />
                                    </div>

                                    <div className="flex flex-row flex-nowrap justify-center items-start my-3">
                                        <div className="flex justify-center items-center  mx-2">
                                            <Link
                                                target={"_blank"}
                                                className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50"
                                                href={links.linked_in || ""}
                                            >
                                                <Image
                                                    src={"/linkedin.svg"}
                                                    width={14}
                                                    height={9}
                                                />
                                            </Link>
                                        </div>
                                        <div className="flex justify-center items-center  mx-2">
                                            <Link
                                                target={"_blank"}
                                                className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50"
                                                href={links.twitter || ""}
                                            >
                                                <Image
                                                    src={"/twitter.svg"}
                                                    width={13}
                                                    height={11}
                                                />
                                            </Link>
                                        </div>
                                        <div className="flex justify-center items-center  mx-2">
                                            <Link
                                                target={"_blank"}
                                                className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50"
                                                href={links.facebook || ""}
                                            >
                                                <Image
                                                    src={"/facebook.svg"}
                                                    width={8}
                                                    height={6}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {!hasContactInfo && (
                                <div
                                    className={
                                        "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center cursor-pointer"
                                    }
                                >
                                    <Image
                                        src={"/plus-icon.svg"}
                                        width={9}
                                        height={9}
                                        className="m-2"
                                    />
                                    <span className="text-xs text-primary-70">
                                        No contact info
                                    </span>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
            <Footer />
        </>
    );
}
