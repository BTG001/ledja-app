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

export default function ApplyPopup({
    showPopup,
    onClose,
    onSuccess,
    jobId,
    onFailure,
    job,
}) {
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
    const [coverLetter, setCoverLetter] = useState("");
    const [errors, setErrors] = useState({});

    const [uploadJobs, setUploadJobs] = useState();
    const [uploadJobsId, setUploadJobsId] = useState();

    const [loading, setLoading] = useState(false);

    const [profileLoading, setProfileLoading] = useState(true);

    const [showResumeRequiredPopup, setShowResumeRequiredPopup] =
        useState(false);

    // useEffect(() => {
    //     if (job && job.with_resume && job.with_resume.toLowerCase() == "yes" && (upload_job || !job.upload_job.resume_url)) {
    //         setShowResumeRequiredPopup(true);
    //     }
    // }, [job,uploadJobs]);

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);

    const onSubmit = () => {
        if (loading) {
            return;
        } else {
            setLoading(true);
        }

        const applicationURL = `${Config.API_URL}/applications`;

        const userId = localStorage.getItem("user_id");
        const applicationFormData = new FormData();

        applicationFormData.append("user_id", userId);
        applicationFormData.append("job_id", jobId);
        applicationFormData.append("status", "awaiting");

        applicationFormData.append("cover_letter", coverLetter);

        Utils.makeRequest(async () => {
            try {
                const applicationResults = await Utils.postForm(
                    applicationURL,
                    applicationFormData
                );
                setLoading(false);
                console.log("application results: ", applicationResults);
                setCoverLetter("");
                setErrors({});

                onSuccess();
            } catch (error) {
                extractErrors(error);
                console.log("application error: ", error);
                setLoading(false);
            }
        });
    };

    const whenClosed = () => {
        onClose();
    };

    useEffect(() => {
        fetchJobSeeker();
    }, []);

    async function fetchJobSeeker() {
        console.log("fetching job seeker");
        try {
            setProfileLoading(true);

            console.log("fetching job seeker after loading");

            const userId = localStorage.getItem("user_id");
            const url = `${Config.API_URL}/users/${userId}`;
            let jobSeeker = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            console.log("jobseeker request returned");

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
                setUploadJobsId(jobSeeker.upload_job.id);
            } else {
                console.log("no resume..............");
                if (
                    job &&
                    job.with_resume &&
                    job.with_resume.toLowerCase() == "yes"
                ) {
                    console.log("resume is required....");
                    setShowResumeRequiredPopup(true);
                }
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

            console.log("jobSeeker in apply popup: ", jobSeeker);
            setProfileLoading(false);
            console.log("finished fetching job seeker");
        } catch (error) {
            setProfileLoading(false);
            console.log("jobSeeker profile Error: ", error);
        }
    }

    const extractErrors = (error) => {
        try {
            let errorMessages = {};
            const errors = error.response.data.data;

            Object.keys(errors).map((errorKey) => {
                errorMessages[errorKey] = errors[errorKey][0];
            });

            console.log("errors: ", errorMessages);
            setErrors(errorMessages);

            if (errors.length < 1 && error.response.data.error) {
                onFailure();
            }
        } catch (error) {
            console.log("Error Generating Error Message: ", error);
        }
    };

    const onCloseResumeRequiredPopup = () => {
        setShowResumeRequiredPopup(false);
    };
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
                <ResumeRequiredPopup
                    showPopup={showResumeRequiredPopup}
                    onClose={onCloseResumeRequiredPopup}
                />
                <div
                    onClick={whenClosed}
                    className="fixed bg-my-gray-70 opacity-40 w-full h-full top-0 left-0 bottom-0 right-0 "
                ></div>
                <div className="z-30 fixed w-4/5 md:w-3/4 lg:w-2/3 left-1/2 -translate-x-1/2 top-0  p-5 bg-white opacity-100 rounded-10 shadow-md  my-5">
                    <p className="w-full flex flex-row justify-between flex-wrap-reverse items-center text-lg font-medium">
                        <span>Review your application</span>
                        <Image
                            onClick={onClose}
                            src={"/x-icon.svg"}
                            className="cursor-pointer mb-2 translate-x-1/3"
                            width={16}
                            height={16}
                        />
                    </p>

                    <section className="col-span-2 h-max max-h-70-screen overflow-y-auto pl-6 pr-6 my-1">
                        <h3 className="text-xl font-medium p-2 pl-0">
                            Cover Letter
                        </h3>

                        <div className="form-input-container p-2">
                            <textarea
                                className="form-input"
                                rows={7}
                                placeholder="This is why you should hire me...."
                                name="end_year"
                                value={coverLetter}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setCoverLetter(value);
                                }}
                            ></textarea>
                            <p className="text-right w-full text-sm">0/2,000</p>
                            <p className="text-red-500 text-left  ">
                                {errors.cover_letter || ""}
                            </p>
                        </div>

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

                                                {/* <p
                                                    onClick={
                                                        onWantToChangeProfileImage
                                                    }
                                                    className="mx-2 cursor-pointer text-white py-1 px-2 bg-primary-70 flex flex-row flex-nowrap justify-center items-center rounded-lg"
                                                >
                                                    <RiImageEditFill
                                                        className="text-3xl block cursor-pointer m-1"
                                                        width={10}
                                                        height={10}
                                                    />
                                                    <span>Change</span>
                                                </p> */}
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

                                        {/* <span
                                            onClick={() => {
                                                setShowAddExperiencePopup(true);
                                            }}
                                            className="text-primary-70 test-sm cursor-pointer flex flex-row flex-nowrap justify-center items-center"
                                        >
                                            <Image
                                                src={"/plus-icon.svg"}
                                                width={12}
                                                height={12}
                                                className="m-2"
                                            />
                                            Add
                                        </span> */}
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
                                        {/* <span
                                            onClick={() => {
                                                setShowAddEducationPopup(true);
                                            }}
                                            className="text-primary-70 test-sm cursor-pointer flex flex-row flex-nowrap justify-center items-center"
                                        >
                                            <Image
                                                src={"/plus-icon.svg"}
                                                width={12}
                                                height={12}
                                                className="m-2"
                                            />
                                            Add
                                        </span> */}
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
                                        {/* <span
                                            onClick={() => {
                                                setShowAddSkillPopup(true);
                                            }}
                                            className="text-primary-70 test-sm cursor-pointer flex flex-row flex-nowrap justify-center items-center"
                                        >
                                            <Image
                                                src={"/plus-icon.svg"}
                                                width={12}
                                                height={12}
                                                className="m-2"
                                            />
                                            Add
                                        </span> */}
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
                                        {/* {hasResume && (
                                            <span
                                                onClick={() => {
                                                    resumeInput.current.click();
                                                }}
                                                className="text-primary-70 cursor-pointer flex justify-center items-center flex-nowrap"
                                            >
                                                <AiOutlineSwap className="mr-2 text-primary-70" />
                                                Replace
                                            </span>
                                        )} */}
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
                                        {/* {hasOtherDocs && (
                                            <span
                                                onClick={() => {
                                                    otherDocsInput.current.click();
                                                }}
                                                className="text-primary-70 cursor-pointer flex flex-nowrap justify-center items-center"
                                            >
                                                <AiOutlineSwap className="mr-2 text-primary-70" />
                                                Replace all
                                            </span>
                                        )} */}
                                        {/* <span
                                            onClick={() => {
                                                addOtherDocsInput.current.click();
                                            }}
                                            className="text-primary-70 test-sm cursor-pointer flex flex-row flex-nowrap justify-center items-center"
                                        >
                                            <Image
                                                src={"/plus-icon.svg"}
                                                width={12}
                                                height={12}
                                                className="m-2"
                                            />
                                            Add
                                        </span> */}
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
                            onClick={onSubmit}
                            className="submit-btn-left mx-3"
                            type={"submit"}
                        >
                            {loading && <span className="loader"></span>}
                            {!loading && (
                                <span className="">
                                    Submit your application
                                </span>
                            )}
                        </button>
                        <button
                            onClick={whenClosed}
                            className="submit-btn-secondary mx-3"
                            type={"button"}
                        >
                            <span className="">Cancel</span>
                        </button>
                    </div>
                </div>
            </>
        )
    );
}
