import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import Config from "../../Config";
import Utils from "../../Utils";
import Link from "next/link";
import axios from "axios";
import { BiUserCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import { AiOutlineFileText } from "react-icons/ai";
import { MdOutlineOpenInNew } from "react-icons/md";
import JobSeekerProfileLoader from "../../components/skeleton-loaders/jobseeker-profile-loader";
import ResumeRequiredPopup from "../../components/job-seekers/resume-required-popup";

export default function ApplyPopup({ showPopup, onClose, jobSeekerId }) {
    const router = useRouter();
    const [hasWorkExperience, setHasWorkExperience] = useState();
    const [hasEducation, setHasEducation] = useState();
    const [hasSkills, setHasSkills] = useState();
    const [hasAssessment, setHasAssessment] = useState();
    const [hasResume, setHasResume] = useState();
    const [hasOtherDocs, setHasOtherDocs] = useState();
    const [hasBasicInfo, setHasBasicInfo] = useState(false);
    const [hasProfilePic, setHasProfilePic] = useState(false);
    const [hasSocialMediaLinks, setHasSocialMediaLinks] = useState(false);
    const [hasAboutJobSeeker, setHasAboutJobSeeker] = useState(false);
    const [basicInfo, setBasicInfo] = useState({});
    const [links, setLinks] = useState({});
    const [aboutJobSeeker, setAboutJobSeeker] = useState({});
    const [workExperiences, setWorkExperiences] = useState();
    const [educations, setEducations] = useState();
    const [skills, setSkills] = useState();
    const [email, setEmail] = useState();
    const [resume, setResume] = useState();
    const [otherDocs, setOtherDocs] = useState();
    const [profilePic, setProfilePic] = useState();

    const [errors, setErrors] = useState({});

    const [uploadJobs, setUploadJobs] = useState();
    const [uploadJobsId, setUploadJobsId] = useState();

    const [loading, setLoading] = useState(false);

    const [profileLoading, setProfileLoading] = useState(true);

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);

    useEffect(() => {
        clear();
    }, [jobSeekerId]);

    const whenClosed = () => {
        clear();
        onClose();
    };

    const clear = () => {
        setHasWorkExperience(null);
        setHasEducation(null);
        setHasSkills(null);
        setHasAssessment(null);
        setHasResume(null);
        setHasOtherDocs(null);
        setHasBasicInfo(false);
        setHasProfilePic(false);
        setHasSocialMediaLinks(false);
        setHasAboutJobSeeker(false);
        setBasicInfo({});
        setLinks({});
        setAboutJobSeeker({});
        setWorkExperiences(null);
        setEducations(null);
        setSkills(null);
        setEmail(null);
        setResume(null);
        setOtherDocs(null);
        setProfilePic(null);
    };

    useEffect(() => {
        if (jobSeekerId) {
            fetchJobSeeker();
        }
    }, [jobSeekerId]);

    async function fetchJobSeeker() {
        setProfileLoading(true);
        try {
            console.log("fetching job seeker............", jobSeekerId);
            const url = `${Config.API_URL}/users/${jobSeekerId}`;
            let jobSeeker = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            jobSeeker = jobSeeker.data.data;

            setEmail(jobSeeker.email);

            if (jobSeeker.basic_info_jobseeker) {
                setBasicInfo(jobSeeker.basic_info_jobseeker);
                setHasBasicInfo(true);

                if (jobSeeker.basic_info_jobseeker.avatar_url) {
                    setProfilePic(jobSeeker.basic_info_jobseeker.avatar_url);
                    setHasProfilePic(true);
                }
            }

            if (jobSeeker.job_seeker_link) {
                setLinks(jobSeeker.job_seeker_link);
                setHasSocialMediaLinks(true);
            }

            if (jobSeeker.about_job_seeker) {
                setAboutJobSeeker(jobSeeker.about_job_seeker);
                setHasAboutJobSeeker(true);
            }

            if (jobSeeker.upload_job) {
                if (jobSeeker.upload_job.resume) {
                    setResume(jobSeeker.upload_job.resume_url);
                    setHasResume(true);
                }

                fetchUPloadJob(jobSeeker.upload_job.id);
            }
            if (jobSeeker.work_experiences) {
                setWorkExperiences(jobSeeker.work_experiences);
                setHasWorkExperience(true);
            }

            if (jobSeeker.education) {
                setEducations(jobSeeker.education);
                setHasEducation(true);
            }

            if (jobSeeker.skills) {
                setSkills(jobSeeker.skills);
                setHasSkills(true);
            }

            console.log(
                "jobSeeker: ",
                jobSeeker,
                jobSeeker.basic_info_jobseeker
            );
            setProfileLoading(false);
        } catch (error) {
            setProfileLoading(false);
            console.log("jobSeeker profile Error: ", error);
        }
    }

    async function fetchUPloadJob(id) {
        setProfileLoading(true);
        try {
            const url = `${Config.API_URL}/upload_jobs/${id}`;
            let theUploadJob = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            theUploadJob = theUploadJob.data.data;

            if (theUploadJob.other_documents) {
                setOtherDocs(theUploadJob.other_documents);
                setHasOtherDocs(true);
            }

            setProfileLoading(false);
        } catch (error) {
            setProfileLoading(false);
            console.log("get upload jobs Error: ", error);
        }
    }

    return (
        showPopup && (
            <>
                <div
                    onClick={whenClosed}
                    className="fixed bg-my-gray-70 opacity-40 w-full h-full top-0 left-0 bottom-0 right-0 "
                ></div>
                <div className="z-30 fixed w-4/5 md:w-3/4 lg:w-2/3 left-1/2 -translate-x-1/2 top-0  p-5 bg-white opacity-100 rounded-10 shadow-md  my-5">
                    <p className="w-full flex flex-row justify-between flex-wrap-reverse items-center text-lg font-medium">
                        <span>Review your application</span>
                        <Image
                            onClick={whenClosed}
                            src={"/x-icon.svg"}
                            className="cursor-pointer mb-2 translate-x-1/3"
                            width={16}
                            height={16}
                        />
                    </p>

                    <section className="col-span-2 h-max max-h-70-screen overflow-y-auto pl-6 pr-6 my-1">
                        <h3 className="text-xl font-medium p-2 pl-0">
                            Your Profile
                        </h3>

                        {profileLoading && (
                            <div className="col-span-2">
                                <JobSeekerProfileLoader />
                            </div>
                        )}

                        {!profileLoading && (
                            <section className="col-span-2">
                                <div className="form-input-container ">
                                    <p className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                                        <label className="form-label-light">
                                            About Me
                                        </label>
                                        {/* {hasBasicInfo && (
                                            <span
                                                onClick={() => {
                                                    setShowBasicInfoEditPopup(
                                                        true
                                                    );
                                                }}
                                                className="text-primary-70 cursor-pointer"
                                            >
                                                Edit
                                            </span>
                                        )} */}
                                    </p>
                                    {hasBasicInfo && (
                                        <div
                                            className={
                                                "mt-4 p-5 border border-solid border-my-gray-70  rounded-10 md:grid md:grid-cols-3 md:gap-3 "
                                            }
                                        >
                                            <div className="text-dark-50 grid grid-rows-4 gap-1 justify-center">
                                                <p className="flex justify-center items-center row-span-3">
                                                    {!hasProfilePic && (
                                                        <BiUserCircle className="h-32 text-center block w-full" />
                                                    )}

                                                    {hasProfilePic && (
                                                        <Image
                                                            src={profilePic}
                                                            width={160}
                                                            height={120}
                                                            className="flex justify-center items-center rounded-sm"
                                                        />
                                                    )}
                                                </p>
                                            </div>
                                            <div className="flex flex-col flex-nowrap justify-center items-center md:justify-start md:items-start">
                                                <h3 className="font-medium text-xl text-dark-50 my-5">
                                                    {basicInfo.fname || ""}{" "}
                                                    {basicInfo.lname || ""}
                                                </h3>
                                                <p className="text-sm text-dark-50">
                                                    {basicInfo.position || ""}
                                                </p>
                                                <p className="text-sm text-dark-50">
                                                    {basicInfo.location || ""}
                                                </p>
                                                <p className="flex flex-row flex-nowrap justify-between items-center mt-5 mb-2">
                                                    <Image
                                                        src={"/email.svg"}
                                                        width={15}
                                                        height={15}
                                                        className="mr-3"
                                                    />
                                                    <span>{email}</span>
                                                </p>
                                                <p className="flex flex-row flex-nowrap justify-between items-center">
                                                    <Image
                                                        src={"/phone.svg"}
                                                        width={15}
                                                        height={15}
                                                        className="mr-3"
                                                    />
                                                    <span>
                                                        {basicInfo.phone_no}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="flex flex-row flex-nowrap justify-center items-start my-3">
                                                <div className="flex justify-center items-center mx-2">
                                                    <Link
                                                        target={"_blank"}
                                                        href={
                                                            links.linked_in ||
                                                            ""
                                                        }
                                                        className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50"
                                                    >
                                                        <Image
                                                            src={
                                                                "/linkedin.svg"
                                                            }
                                                            width={14}
                                                            height={9}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="flex justify-center items-center mx-2">
                                                    <Link
                                                        target={"_blank"}
                                                        href={
                                                            links.twitter || ""
                                                        }
                                                        className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50"
                                                    >
                                                        <Image
                                                            src={"/twitter.svg"}
                                                            width={13}
                                                            height={11}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="flex justify-center items-cente mx-2">
                                                    <Link
                                                        target={"_blank"}
                                                        href={
                                                            links.facebook || ""
                                                        }
                                                        className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50"
                                                    >
                                                        <Image
                                                            src={
                                                                "/facebook.svg"
                                                            }
                                                            width={8}
                                                            height={6}
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {!hasBasicInfo && (
                                        <div
                                            className={
                                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center cursor-pointer"
                                            }
                                        >
                                            <Image
                                                src={
                                                    "/not-interested-active-icon.svg"
                                                }
                                                width={13}
                                                height={13}
                                                className="m-2"
                                            />
                                            <span className="text-xs text-primary-70">
                                                No Basic Infos Added
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="form-input-container ">
                                    <div className="flex flex-row justify-between p-2">
                                        <label className="form-label-light">
                                            Work Experience
                                        </label>
                                    </div>
                                    {hasWorkExperience &&
                                        workExperiences.length > 0 && (
                                            <div className="mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md">
                                                {workExperiences.map(
                                                    (workExperience, index) => {
                                                        return (
                                                            <div
                                                                className="my-4"
                                                                key={index}
                                                            >
                                                                <p className="text-lg my-1 ">
                                                                    {
                                                                        workExperience.title
                                                                    }
                                                                </p>
                                                                <p className=" my-1">
                                                                    {
                                                                        workExperience.company
                                                                    }
                                                                </p>
                                                                <p className="my-1 text-my-gray-70 text-sm">
                                                                    {
                                                                        workExperience.duration
                                                                    }
                                                                </p>
                                                                {/* <p classname="text-sm">{workExperience.description}</p> */}
                                                                <p className="text-sm">
                                                                    {workExperience.description ||
                                                                        ""}
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        )}

                                    {(!hasWorkExperience ||
                                        workExperiences.length < 1) && (
                                        <div
                                            className={
                                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center cursor-pointer"
                                            }
                                        >
                                            <Image
                                                src={
                                                    "/not-interested-active-icon.svg"
                                                }
                                                width={13}
                                                height={13}
                                                className="m-2"
                                            />
                                            <span className="text-xs text-primary-70">
                                                No Experience Added
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="form-input-container ">
                                    <div className="flex flex-row justify-between p-2">
                                        <label className="form-label-light">
                                            Education
                                        </label>
                                    </div>

                                    {hasEducation && educations.length > 0 && (
                                        <div
                                            className={
                                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md cursor-pointer "
                                            }
                                        >
                                            {hasEducation &&
                                                educations.map(
                                                    (education, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="my-2"
                                                            >
                                                                <p className="">
                                                                    {
                                                                        education.certification
                                                                    }
                                                                </p>
                                                                <p className="text-sm">
                                                                    {
                                                                        education.institution
                                                                    }
                                                                </p>
                                                                <p className=" text-my-gray-70 text-xs">
                                                                    {
                                                                        education.duration
                                                                    }
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                        </div>
                                    )}

                                    {(!hasEducation ||
                                        educations.length < 1) && (
                                        <div
                                            className={
                                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center cursor-pointer"
                                            }
                                        >
                                            <Image
                                                src={
                                                    "/not-interested-active-icon.svg"
                                                }
                                                width={13}
                                                height={13}
                                                className="m-2"
                                            />
                                            <span className="text-xs text-primary-70">
                                                No Education Added
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="form-input-container ">
                                    <div className="flex flex-row justify-between p-2">
                                        <label className="form-label-light">
                                            Skills
                                        </label>
                                    </div>
                                    {hasSkills && skills.length > 0 && (
                                        <div
                                            className={
                                                "mt-4 border border-solid border-my-gray-70  rounded-md p-4 flex flex-row justify-start items-center "
                                            }
                                        >
                                            {skills.map((skill, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex flex-row flex-nowrap justify-start items-center  px-4 bg-my-gray-50 rounded-lg m-2 py-2 w-max"
                                                    >
                                                        <span className="">
                                                            {skill.name}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {(!hasSkills || skills.length < 1) && (
                                        <div
                                            className={
                                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center cursor-pointer"
                                            }
                                        >
                                            <Image
                                                src={
                                                    "/not-interested-active-icon.svg"
                                                }
                                                width={13}
                                                height={13}
                                                className="m-2"
                                            />
                                            <span className="text-xs text-primary-70">
                                                No Skill Added
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="form-input-container ">
                                    <div className="flex flex-row justify-between p-2">
                                        <label className="form-label-light">
                                            Resume
                                        </label>
                                    </div>

                                    {hasResume && (
                                        <div
                                            className={
                                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                                            }
                                        >
                                            <Link
                                                href={resume}
                                                target="_blank"
                                                className="flex flex-row flex-nowrap justify-start items-center"
                                            >
                                                <AiOutlineFileText />
                                                <span className="text-xs text-primary-70 p-2">
                                                    Resume_{basicInfo.fname}
                                                </span>
                                                <MdOutlineOpenInNew className="ml-2 text-primary-70" />
                                            </Link>
                                        </div>
                                    )}

                                    {!hasResume && (
                                        <div
                                            className={
                                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center cursor-pointer"
                                            }
                                        >
                                            <Image
                                                src={
                                                    "/not-interested-active-icon.svg"
                                                }
                                                width={13}
                                                height={13}
                                                className="m-2"
                                            />
                                            <span className="text-xs text-primary-70">
                                                No Resume Added
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="form-input-container ">
                                    <div className="flex flex-row justify-between p-2">
                                        <label className="form-label-light">
                                            Cerficates / Other Documents
                                        </label>
                                    </div>

                                    {hasOtherDocs && (
                                        <div
                                            className={
                                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-col justify-start items-start"
                                            }
                                        >
                                            {otherDocs.map(
                                                (otherDoc, index) => {
                                                    return (
                                                        <div className="flex flex-row flex-nowrap">
                                                            <Link
                                                                key={index}
                                                                href={
                                                                    otherDoc.document_url
                                                                }
                                                                target="_blank"
                                                                className="flex flex-row flex-nowrap justify-start items-center"
                                                            >
                                                                <AiOutlineFileText />
                                                                <span className="text-xs text-primary-70 p-2">
                                                                    Other Doc_
                                                                    {index + 1}
                                                                </span>
                                                                <MdOutlineOpenInNew className="ml-2 text-primary-70" />
                                                            </Link>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}

                                    {!hasOtherDocs && (
                                        <div
                                            className={
                                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center cursor-pointer"
                                            }
                                        >
                                            <Image
                                                src={
                                                    "/not-interested-active-icon.svg"
                                                }
                                                width={13}
                                                height={13}
                                                className="m-2"
                                            />
                                            <span className="text-xs text-primary-70">
                                                No Documents Added
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}
                    </section>
                    <div
                        onClick={() => {
                            document.body.style.overflowY = "visible";
                        }}
                        className="flex flex-row justify-center items-center my-1 mx-auto border-t border-solid border-my-gray-50"
                    >
                        <button
                            onClick={whenClosed}
                            className="submit-btn mx-3"
                            type={"button"}
                        >
                            <span className="">Done</span>
                        </button>
                    </div>
                </div>
            </>
        )
    );
}
