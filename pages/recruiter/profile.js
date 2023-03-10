import { useEffect, useState } from "react";
false;
import Image from "next/image";
import Footer from "../../components/Footer";
import RecruiterNavbar from "../../components/navbars/RecruiterNavbar";
import SecondaryBtn from "../../components/buttons/SecondaryBtn";
import Utils from "../../Utils";
import Config from "../../Config";
import axios from "axios";
import { BsBuilding } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";
import CompanyBasicInfoPopup from "../../components/recuriters/profile-edit/company-basic-info-popup";
import MissingcompanyProfilePopup from "../../components/recuriters/MissingCompanyProfilePopup";
import IncompleteRecruiterProfilePopup from "../../components/recuriters/IncompleteRecruiterProfilePopup";
import { useRouter } from "next/router";
import CompanyIntroEditPopup from "../../components/recuriters/profile-edit/company-intro-edit-popup";
import CompanyCultureEditPopup from "../../components/recuriters/profile-edit/company-culture-edit-popup";
import RecruiterInfoEditPopup from "../../components/recuriters/profile-edit/recruiter-info-edit-popup";

export default function Profile() {
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

    const [alreadyShowedIncompletePopups, setAlreadyShowedIncompletePopups] =
        useState(false);

    const [showBasicInfoEditPopup, setShowBasicInfoEditPopup] = useState(false);
    const [showCompanyIntroEditPopup, setShowCompanyIntroEditPopup] =
        useState(false);
    const [showCompanyCultureEditPopup, setShowCompanyCultureEditPopup] =
        useState(false);
    const [showProfilePicChangeform, setShowProfilePicChangeform] =
        useState(false);
    const [showContactInfoEditPopup, setShowContactInfoEditPopup] =
        useState(false);

    const [showMissingCompanyProfilePopup, setShowMissingCompanyProfilePopup] =
        useState(false);
    const [
        showIncompleteRecruiterProfilePopup,
        setShowIncompleteRecruiterProfilePopup,
    ] = useState(false);

    const [pathToIncompleteStep, setPathToIncompleteStep] = useState();

    const [basicInfoUpdateSuccess, setBasicInfoUpdateSuccess] = useState(false);
    const [linksUpdateSuccess, setLinksUpdateSuccess] = useState(false);

    useEffect(() => {
        if (basicInfoUpdateSuccess && linksUpdateSuccess) {
            setShowBasicInfoEditPopup(false);
            setBasicInfoUpdateSuccess(false);
            setLinksUpdateSuccess(false);
        }
    }, [basicInfoUpdateSuccess, linksUpdateSuccess]);

    useEffect(() => {
        fetchRecruiter();
        fetchJobs();
    }, []);

    async function fetchRecruiter() {
        try {
            const userId = localStorage.getItem("user_id");
            const url = `${Config.API_URL}/users/${userId}`;
            let recruiter = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            recruiter = recruiter.data.data;

            if (recruiter.basic_info_recruiter) {
                setBasicInfo(recruiter.basic_info_recruiter);
                setHasCompanyInfo(true);
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
        } catch (error) {
            console.log("recruiter profile Error: ", error);
        }
    }

    async function fetchJobs(url) {
        if (!url) {
            const userId = localStorage.getItem("user_id");
            url = `${Config.API_URL}/get_user_jobs/${userId}`;
        }

        try {
            let theJobs = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            theJobs = theJobs.data.data;

            setJobs(theJobs);

            console.log("user Jobs: ", theJobs);
        } catch (error) {
            console.log("user Jobs request error: ", error);
        }
    }

    const afterBasicInfoUpdate = (updatedBasicInfos) => {
        setBasicInfo(updatedBasicInfos);
        setBasicInfoUpdateSuccess(true);
    };

    const afterLinksUpdate = (updatedLinks) => {
        // get the updated basic infos
        setLinks(updatedLinks);
        setLinksUpdateSuccess(true);
    };

    const afterCompanyIntroUpdate = (updatedMoreAboutCompany) => {
        setShowCompanyIntroEditPopup(false);
        setMoreAboutCompany(updatedMoreAboutCompany);
    };

    const afterCompanyCultureUpdate = (updatedMoreAboutCompany) => {
        setShowCompanyCultureEditPopup(false);
        setMoreAboutCompany(updatedMoreAboutCompany);
    };

    const afterRecruiterInfoUpdate = (updatedRecruiterInfo) => {
        setShowContactInfoEditPopup(false);
        setAboutRecruiter(updatedRecruiterInfo);
    };

    const onClose = () => {
        setShowBasicInfoEditPopup(false);
        setShowMissingCompanyProfilePopup(false);
        setShowIncompleteRecruiterProfilePopup(false);
        setShowCompanyIntroEditPopup(false);
        setShowCompanyCultureEditPopup(false);
    };

    return (
        <>
            <CompanyBasicInfoPopup
                showPopup={showBasicInfoEditPopup}
                onClose={onClose}
                onBasicInfosUpdateSuccess={afterBasicInfoUpdate}
                onLinksUpdateSuccess={afterLinksUpdate}
                basicInfos={basicInfo}
                links={links}
            />

            <CompanyIntroEditPopup
                showPopup={showCompanyIntroEditPopup}
                onClose={onClose}
                onSuccess={afterCompanyIntroUpdate}
                moreAboutCompany={moreAboutCompany}
            />

            <CompanyCultureEditPopup
                showPopup={showCompanyCultureEditPopup}
                onClose={onClose}
                onSuccess={afterCompanyCultureUpdate}
                moreAboutCompany={moreAboutCompany}
            />

            <RecruiterInfoEditPopup
                showPopup={showContactInfoEditPopup}
                onClose={onClose}
                onSuccess={afterRecruiterInfoUpdate}
                recruiterInfo={aboutRecruiter}
            />

            <MissingcompanyProfilePopup
                onClose={onClose}
                showPopup={showMissingCompanyProfilePopup}
            />

            <IncompleteRecruiterProfilePopup
                onClose={onClose}
                showPopup={showIncompleteRecruiterProfilePopup}
                pathToIncompleteStep={pathToIncompleteStep}
            />
            <RecruiterNavbar icon={"user"} dashboardLinks={false} />
            <div className="w-4/5 md:grid grid-cols-3 md:gap-4  mt-5 mb-32 mx-auto md:grid-flow-dense md:dire ">
                <section className="col-span-2">
                    <div className="form-input-container ">
                        <p className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                            <label className="font-medium text-my-gray-70">
                                Basic Info
                            </label>
                            {hasCompanyInfo && (
                                <span
                                    onClick={() => {
                                        setShowBasicInfoEditPopup(true);
                                    }}
                                    className="text-primary-70 cursor-pointer"
                                >
                                    Edit
                                </span>
                            )}
                        </p>
                        {hasCompanyInfo && (
                            <div
                                className={
                                    "mt-4 p-5 border border-solid border-my-gray-70  rounded-10 grid grid-cols-3 gap-3 "
                                }
                            >
                                <BsBuilding className="w-32 h-32" />
                                <div className="flex flex-col flex-nowrap justify-start items-start">
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
                            onClick={() => {
                                router.push("/recruiter/profile-setup/step1");
                            }}
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
                                Add company basic information and social links
                            </span>
                        </div>
                    )}
                    <div className="form-input-container ">
                        <div className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                            <p className="text-my-gray-70 font-medium">
                                Company introduction
                            </p>
                            {hasCompanyIntro && (
                                <span
                                    onClick={() => {
                                        setShowCompanyIntroEditPopup(true);
                                    }}
                                    className="text-primary-70 cursor-pointer"
                                >
                                    Edit
                                </span>
                            )}
                        </div>

                        {hasCompanyIntro && (
                            <div
                                className={
                                    "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                                }
                            >
                                <p>{moreAboutCompany.company_intro || ""}</p>
                            </div>
                        )}
                        {!hasCompanyIntro && (
                            <div
                                onClick={() => {
                                    router.push(
                                        "/recruiter/profile-setup/step3"
                                    );
                                }}
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
                                    Add
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="form-input-container ">
                        <div className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                            <p className="text-my-gray-70 font-medium">
                                Culture & Values
                            </p>
                            {hasCompanyCulture && (
                                <span
                                    onClick={() => {
                                        setShowCompanyCultureEditPopup(true);
                                    }}
                                    className="text-primary-70 cursor-pointer"
                                >
                                    Edit
                                </span>
                            )}
                        </div>

                        {hasCompanyCulture && (
                            <div
                                className={
                                    "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                                }
                            >
                                <p>{moreAboutCompany.company_culture || ""}</p>
                            </div>
                        )}
                        {!hasCompanyCulture && (
                            <div
                                onClick={() => {
                                    router.push(
                                        "/recruiter/profile-setup/step3"
                                    );
                                }}
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
                                    Add
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
                                        <BsBuilding className="w-20 h-20 p-3" />
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
                                    You have not posted any jobs yet!
                                </p>
                            ))}

                        <div
                            onClick={() => {
                                router.push("/recruiter/job-posting/step1");
                            }}
                            className={
                                "mt-4 px-4 py-1 flex flex-row flex-nowrap justify-start items-center cursor-pointer"
                            }
                        >
                            <Image
                                src={"/plus-icon.svg"}
                                width={9}
                                height={9}
                                className="m-2"
                            />
                            <span className="text-xs text-primary-70">
                                Post new jobs
                            </span>
                        </div>
                    </div>
                    <div className="form-input-container ">
                        <p className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                            <label className=" font-medium text-my-gray-70">
                                Contact Info
                            </label>
                            {hasContactInfo && (
                                <span
                                    onClick={() => {
                                        setShowContactInfoEditPopup(true);
                                    }}
                                    className="text-primary-70 cursor-pointer"
                                >
                                    Edit
                                </span>
                            )}
                        </p>
                        {hasContactInfo && (
                            <div
                                className={
                                    "mt-4 p-5 border border-solid border-my-gray-70  rounded-10 grid grid-cols-3 gap-3 "
                                }
                            >
                                {!hasProfilePic && (
                                    <BiUserCircle className="w-32 h-32" />
                                )}

                                {hasProfilePic && (
                                    <BiUserCircle className="w-32 h-32" />
                                )}
                                <div className="flex flex-col flex-nowrap justify-start items-start">
                                    <h3 className="font-medium text-xl text-dark-50 my-5">
                                        {aboutRecruiter.fname}{" "}
                                        {aboutRecruiter.lname}
                                    </h3>
                                    <p className="text-sm text-dark-50">
                                        {aboutRecruiter.company_position}
                                    </p>
                                    {/* <p className="text-sm text-dark-50">
                                    Nairobi, Kenya
                                </p> */}
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
                                onClick={() => {
                                    router.push(
                                        "/recruiter/profile-setup/step4"
                                    );
                                }}
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
                                    Add your contact info
                                </span>
                            </div>
                        )}
                    </div>
                </section>

                <sidebar className="py-16 hidden md:block">
                    <div className="border border-my-gray-70 border-solid rounded-10 p-5">
                        <p className="text-dark-50 w-full">
                            Let’s complete your setup!
                        </p>
                        <p className="bg-my-gray-50 w-full h-2-px my-5"></p>
                        <div>
                            <p
                                className={`flex flex-row flex-nowrap justify-start items-center`}
                            >
                                <span
                                    className={`block w-4 h-4  bg-white rounded-full border border-grey-70 m-2`}
                                >
                                    {hasContactInfo && (
                                        <Image
                                            src={"/tick-icon.svg"}
                                            width={16}
                                            height={16}
                                        />
                                    )}
                                </span>
                                <span
                                    className={`text-dark-50 text-sm 
                                ${hasContactInfo ? "line-through" : ""}`}
                                >
                                    Add contact info
                                </span>
                            </p>
                            <p
                                className={`flex flex-row flex-nowrap justify-start items-center`}
                            >
                                <span
                                    className={`block w-4 h-4  bg-white rounded-full border border-grey-70 m-2`}
                                >
                                    {hasProfilePic && (
                                        <Image
                                            src={"/tick-icon.svg"}
                                            width={16}
                                            height={16}
                                        />
                                    )}
                                </span>
                                <span
                                    className={`text-dark-50 text-sm 
                                ${hasProfilePic ? "line-through" : ""}`}
                                >
                                    Add profile picture
                                </span>
                            </p>
                            <p
                                className={`flex flex-row flex-nowrap justify-start items-center`}
                            >
                                <span
                                    className={`block w-4 h-4  bg-white rounded-full border border-grey-70 m-2`}
                                >
                                    {hasSocialMediaLinks && (
                                        <Image
                                            src={"/tick-icon.svg"}
                                            width={16}
                                            height={16}
                                        />
                                    )}
                                </span>
                                <span
                                    className={`text-dark-50 text-sm 
                                ${hasSocialMediaLinks ? "line-through" : ""}`}
                                >
                                    Linked with social media
                                </span>
                            </p>
                            <p
                                className={`flex flex-row flex-nowrap justify-start items-center`}
                            >
                                <span
                                    className={`block w-4 h-4  bg-white rounded-full border border-grey-70 m-2`}
                                >
                                    {hasCompanyInfo && (
                                        <Image
                                            src={"/tick-icon.svg"}
                                            width={16}
                                            height={16}
                                        />
                                    )}
                                </span>
                                <span
                                    className={`text-dark-50 text-sm 
                                ${hasCompanyInfo ? "line-through" : ""}`}
                                >
                                    Add basic company information
                                </span>
                            </p>
                            <p
                                className={`flex flex-row flex-nowrap justify-start items-center`}
                            >
                                <span
                                    className={`block w-4 h-4  bg-white rounded-full border border-grey-70 m-2`}
                                >
                                    {hasCompanyIntro && (
                                        <Image
                                            src={"/tick-icon.svg"}
                                            width={16}
                                            height={16}
                                        />
                                    )}
                                </span>
                                <span
                                    className={`text-dark-50 text-sm 
                                ${hasCompanyIntro ? "line-through" : ""}`}
                                >
                                    Add company introduction
                                </span>
                            </p>
                            <p
                                className={`flex flex-row flex-nowrap justify-start items-center`}
                            >
                                <span
                                    className={`block w-4 h-4  bg-white rounded-full border border-grey-70 m-2`}
                                >
                                    {hasCompanyCulture && (
                                        <Image
                                            src={"/tick-icon.svg"}
                                            width={16}
                                            height={16}
                                        />
                                    )}
                                </span>
                                <span
                                    className={`text-dark-50 text-sm 
                                ${hasCompanyCulture ? "line-through" : ""}`}
                                >
                                    Add company culture
                                </span>
                            </p>
                        </div>
                    </div>
                    {/* <p className="my-5 px-3 py-2 mx-auto bg-primary-70 text-white w-4/5 rounded-10 text-center">
                        Upload resume to autofill
                    </p> */}
                </sidebar>
            </div>
            <Footer />
        </>
    );
}
