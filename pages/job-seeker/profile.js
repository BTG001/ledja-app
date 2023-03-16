import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import JobSeekerNavbar from "../../components/navbars/JobSeekerNavbar";
import Config from "../../Config";
import Utils from "../../Utils";
import MissingJobSeekerProfilePopup from "../../components/job-seekers/MissingJobSeekerProfilePopup";
import IncompleteJobSeekerProfilePopup from "../../components/job-seekers/incomplete-jobseeker-profile-popup";
import Link from "next/link";
import axios from "axios";
import { BiUserCircle } from "react-icons/bi";
import JobSeekerEditBasicInfoPopup from "../../components/job-seekers/profile-edit/JobSeekerEditBasicInfoPopup";
import { useRouter } from "next/router";
import { AiOutlineFileText } from "react-icons/ai";

export default function Profile() {
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

    const [alreadyShowedIncompletePopups, setAlreadyShowedIncompletePopups] =
        useState(false);

    const [showBasicInfoEditPopup, setShowBasicInfoEditPopup] = useState(false);
    const [showProfilePicChangeform, setShowProfilePicChangeform] =
        useState(false);

    const [
        showMissingJobSeekerProfilePopup,
        setShowMissingJobSeekerProfilePopup,
    ] = useState(false);
    const [
        showIncompleteJobSeekerProfilePopup,
        setShowIncompleteJobSeekerProfilePopup,
    ] = useState(false);

    const [pathToIncompleteStep, setPathToIncompleteStep] = useState();

    useEffect(() => {
        fetchJobSeeker();
    }, []);

    async function fetchJobSeeker() {
        try {
            const userId = localStorage.getItem("user_id");
            const url = `${Config.API_URL}/users/${userId}`;
            let jobSeeker = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            jobSeeker = jobSeeker.data.data;

            setEmail(jobSeeker.email);

            if (jobSeeker.basic_info_jobseeker) {
                setBasicInfo(jobSeeker.basic_info_jobseeker);
                setHasBasicInfo(true);

                if (jobSeeker.basic_info_jobseeker.avatar) {
                    setProfilePic(jobSeeker.basic_info_jobseeker.avatar);
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
                    setResume(jobSeeker.upload_job.resume);
                    setHasResume(true);
                }

                if (jobSeeker.upload_job.other_docs) {
                    setOtherDocs(jobSeeker.upload_job.resume);
                    setHasOtherDocs(true);
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

            console.log("jobSeeker: ", jobSeeker);

            if (alreadyShowedIncompletePopups) {
                return;
            }

            if (
                !jobSeeker.basic_info_jobseeker &&
                !jobSeeker.job_seeker_link &&
                !jobSeeker.about_job_seeker &&
                !jobSeeker.upload_job &&
                !jobSeeker.work_experiences &&
                !jobSeeker.education &&
                !jobSeeker.skills
            ) {
                setShowMissingJobSeekerProfilePopup(true);
            } else {
                if (!jobSeeker.basic_info_jobseeker) {
                    setPathToIncompleteStep("/job-seeker/profile-setup/step1");
                    setShowIncompleteJobSeekerProfilePopup(true);
                } else if (!jobSeeker.job_seeker_link) {
                    setPathToIncompleteStep("/job-seeker/profile-setup/step2");
                    setShowIncompleteJobSeekerProfilePopup(true);

                    // } else if (!jobSeeker.about_job_seeker) {
                    //     setPathToIncompleteStep("/job-seeker/profile-setup/step3");
                    //     setShowIncompleteJobSeekerProfilePopup(true);
                } else if (!jobSeeker.upload_job) {
                    setPathToIncompleteStep("/job-seeker/profile-setup/step4");
                    setShowIncompleteJobSeekerProfilePopup(true);
                } else if (
                    !jobSeeker.work_experiences ||
                    !jobSeeker.education ||
                    !jobSeeker.skills
                ) {
                    setPathToIncompleteStep("/job-seeker/profile-setup/step3");
                    setShowIncompleteJobSeekerProfilePopup(true);
                }
            }

            setAlreadyShowedIncompletePopups(true);
        } catch (error) {
            console.log("jobSeeker profile Error: ", error);
        }
    }

    const afterBasicInfoUpdate = () => {
        // get the updated basic infos
        setShowBasicInfoEditPopup(false);
        fetchJobSeeker();
    };

    const onClose = () => {
        setShowBasicInfoEditPopup(false);
        setShowMissingJobSeekerProfilePopup(false);
        setShowIncompleteJobSeekerProfilePopup(false);
    };

    return (
        <>
            <MissingJobSeekerProfilePopup
                onClose={onClose}
                showPopup={showMissingJobSeekerProfilePopup}
            />
            <IncompleteJobSeekerProfilePopup
                onClose={onClose}
                showPopup={showIncompleteJobSeekerProfilePopup}
                pathToIncompleteStep={pathToIncompleteStep}
            />
            <JobSeekerEditBasicInfoPopup
                showPopup={showBasicInfoEditPopup}
                onClose={onClose}
                onSuccess={afterBasicInfoUpdate}
                basicInfos={basicInfo}
                links={links}
            />
            <JobSeekerNavbar />
            <div className="w-4/5 md:grid grid-cols-3 md:gap-4  mt-5 mb-32 mx-auto ">
                <section className="col-span-2">
                    <div className="form-input-container ">
                        <p className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                            <label className="form-label-light">About Me</label>
                            {hasBasicInfo && (
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
                        {hasBasicInfo && (
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
                                        <span>{basicInfo.phone_no}</span>
                                    </p>
                                </div>

                                <div className="flex flex-row flex-nowrap justify-center items-start my-3">
                                    <div className="flex justify-center items-center mx-2">
                                        <Link
                                            target={"_blank"}
                                            href={links.linked_in || ""}
                                            className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50"
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
                                            href={links.twitter || ""}
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
                                            href={links.facebook || ""}
                                            className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50"
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
                        {!hasBasicInfo && (
                            <div
                                onClick={() => {
                                    router.push(
                                        "/job-seeker/profile-setup/step1"
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
                                    Add your basic info and social links
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="form-input-container ">
                        <div className="flex flex-row justify-between p-2">
                            <label className="form-label-light">
                                Work Experience
                            </label>
                            {hasWorkExperience && (
                                <span
                                    onClick={() => {
                                        setShowWorkExperienceEditPopup(true);
                                    }}
                                    className="text-primary-70 cursor-pointer"
                                >
                                    Edit
                                </span>
                            )}
                        </div>
                        {hasWorkExperience && (
                            <div className="mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md">
                                {workExperiences.map((workExperience) => {
                                    return (
                                        <div className="my-2">
                                            <p className="text-lg my-1 ">
                                                {workExperience.title}
                                            </p>
                                            <p className=" my-1">
                                                {workExperience.company}
                                            </p>
                                            <p className="my-1 text-my-gray-70 text-sm">
                                                {workExperience.duration}
                                            </p>
                                            {/* <p classname="text-sm">{workExperience.description}</p> */}
                                            <p className="text-sm">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit.
                                                Cras vehicula nisi at euismod
                                                auctor. Duis sed mi ut odio
                                                ornare euismod. Duis eu lectus
                                                porttitor, aliquam arcu vel,
                                                tincidunt diam. Duis in purus
                                                nec eros posuere tincidunt
                                                euismod nec ex. Nunc at auctor
                                                nulla.{" "}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {!hasWorkExperience && (
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
                                    Add
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="form-input-container ">
                        <div className="flex flex-row justify-between p-2">
                            <label className="form-label-light">
                                Education
                            </label>
                            {hasEducation && (
                                <span
                                    onClick={() => {
                                        setShowEducationEditPopup(true);
                                    }}
                                    className="text-primary-70 cursor-pointer"
                                >
                                    Edit
                                </span>
                            )}
                        </div>

                        {hasEducation && (
                            <div
                                className={
                                    "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md "
                                }
                            >
                                {hasEducation &&
                                    educations.map((education) => {
                                        return (
                                            <>
                                                <p className="my-1 ">
                                                    {education.certification}
                                                </p>
                                                <p className="text-sm">
                                                    {education.institution}
                                                </p>
                                                <p className="my-1 text-my-gray-70 text-xs">
                                                    {education.duration}
                                                </p>
                                            </>
                                        );
                                    })}
                            </div>
                        )}

                        {!hasEducation && (
                            <div
                                className={
                                    "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
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
                        <div className="flex flex-row justify-between p-2">
                            <label className="form-label-light">Skills</label>
                            {hasSkills && (
                                <span
                                    onClick={() => {
                                        setShowSkillsEditPopup(true);
                                    }}
                                    className="text-primary-70 cursor-pointer"
                                >
                                    Edit
                                </span>
                            )}
                        </div>
                        {hasSkills && (
                            <div
                                className={
                                    "mt-4 border border-solid border-my-gray-70  rounded-md p-4 flex- flex-row justify-start items-center "
                                }
                            >
                                {skills.map((skill) => {
                                    return (
                                        <span className="px-4 py-2 bg-my-gray-50 rounded-lg m-2">
                                            {skill.name}
                                        </span>
                                    );
                                })}
                            </div>
                        )}

                        {!hasSkills && (
                            <div
                                className={
                                    "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
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

                    {/* <div className="form-input-container ">
                        <label className="form-label-light">
                            Assessment Text
                        </label>
                        <div
                            className={
                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                            }
                        >
                            <Image
                                src={"/plus-icon.svg"}
                                width={9}
                                height={9}
                                className="m-2"
                            />
                            <span className="text-xs text-primary-70">Add</span>
                        </div>
                    </div> */}

                    <div className="form-input-container ">
                        <div className="flex flex-row justify-between p-2">
                            <label className="form-label-light">Resume</label>
                            {hasResume && (
                                <span
                                    onClick={() => {
                                        setShowResumeEditPopup(true);
                                    }}
                                    className="text-primary-70 cursor-pointer"
                                >
                                    Edit
                                </span>
                            )}
                        </div>

                        {hasResume && (
                            <div
                                className={
                                    "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                                }
                            >
                                <AiOutlineFileText />
                                <span className="text-xs text-primary-70 p-2">
                                    Resumer_{basicInfo.fname}
                                </span>
                            </div>
                        )}

                        {!hasResume && (
                            <div
                                className={
                                    "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
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
                </section>

                <sidebar className="py-16 hidden md:block">
                    <div className="border border-my-gray-70 border-solid rounded-10 p-5">
                        <p className="text-dark-50 w-full">
                            Complete your setup to boost <br /> your chance to
                            get hired!
                        </p>
                        <p className="bg-my-gray-50 w-full h-2-px my-5"></p>
                        <div>
                            <p
                                className={`flex flex-row flex-nowrap justify-start items-center`}
                            >
                                <span
                                    className={`block w-4 h-4  bg-white rounded-full border border-grey-70 m-2`}
                                >
                                    {hasBasicInfo && (
                                        <Image
                                            src={"/tick-icon.svg"}
                                            width={16}
                                            height={16}
                                        />
                                    )}
                                </span>
                                <span
                                    className={`text-dark-50 text-sm 
                                ${hasBasicInfo ? "line-through" : ""}`}
                                >
                                    Add basic info
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
                                    {hasWorkExperience && (
                                        <Image
                                            src={"/tick-icon.svg"}
                                            width={16}
                                            height={16}
                                        />
                                    )}
                                </span>
                                <span
                                    className={`text-dark-50 text-sm 
                                ${hasWorkExperience ? "line-through" : ""}`}
                                >
                                    Add work experience
                                </span>
                            </p>

                            <p
                                className={`flex flex-row flex-nowrap justify-start items-center`}
                            >
                                <span
                                    className={`block w-4 h-4  bg-white rounded-full border border-grey-70 m-2`}
                                >
                                    {hasEducation && (
                                        <Image
                                            src={"/tick-icon.svg"}
                                            width={16}
                                            height={16}
                                        />
                                    )}
                                </span>
                                <span
                                    className={`text-dark-50 text-sm 
                                ${hasEducation ? "line-through" : ""}`}
                                >
                                    Add education
                                </span>
                            </p>
                            <p
                                className={`flex flex-row flex-nowrap justify-start items-center`}
                            >
                                <span
                                    className={`block w-4 h-4  bg-white rounded-full border border-grey-70 m-2`}
                                >
                                    {hasSkills && (
                                        <Image
                                            src={"/tick-icon.svg"}
                                            width={16}
                                            height={16}
                                        />
                                    )}
                                </span>
                                <span
                                    className={`text-dark-50 text-sm 
                                ${hasSkills ? "line-through" : ""}`}
                                >
                                    Add at least 3 skills
                                </span>
                            </p>
                        </div>
                    </div>
                    <p className="my-5 px-3 py-2 mx-auto bg-primary-70 text-white w-4/5 rounded-10 text-center">
                        Upload resume to autofill
                    </p>
                </sidebar>
            </div>
            <Footer />
        </>
    );
}
