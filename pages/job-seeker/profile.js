import { useState, useEffect, useRef, useContext } from "react";
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
import { RiImageEditFill } from "react-icons/ri";
import { AuthContext } from "../_app";
import { HiOutlineTrash } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import EditWorkExperiencePopup from "../../components/job-seekers/profile-edit/edit-experience-popup";
import EditEducationPopup from "../../components/job-seekers/profile-edit/edit-education-popup";
import { MdOutlineOpenInNew } from "react-icons/md";
import EditSkillPopup from "../../components/job-seekers/profile-edit/edit-skill-popup";
import JobSeekerProfileLoader from "../../components/skeleton-loaders/jobseeker-profile-loader";

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
    const auth = useContext(AuthContext);

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
    const profileImageInput = useRef();

    const [alreadyShowedIncompletePopups, setAlreadyShowedIncompletePopups] =
        useState(false);

    const [showBasicInfoEditPopup, setShowBasicInfoEditPopup] = useState(false);
    const [showProfilePicChangeform, setShowProfilePicChangeform] =
        useState(false);

    const [profileLoading, setProfileLoading] = useState(true);

    const [
        showMissingJobSeekerProfilePopup,
        setShowMissingJobSeekerProfilePopup,
    ] = useState(false);
    const [
        showIncompleteJobSeekerProfilePopup,
        setShowIncompleteJobSeekerProfilePopup,
    ] = useState(false);

    const [showWorkExperienceEditPopup, setShowWorkExperienceEditPopup] =
        useState();
    const [activeWorkExperience, setActiveWorkExperience] = useState();
    const [activeWorkExperienceIndex, setActiveWorkExperienceIndex] =
        useState();

    const [showEducationEditPopup, setShowEducationEditPopup] = useState();
    const [activeEducation, setActiveEducation] = useState();
    const [activeEducationIndex, setActiveEducationIndex] = useState();

    const [showSkillEditPopup, setShowSkillsEditPopup] = useState();
    const [activeSkill, setActiveSkill] = useState();
    const [activeSkillIndex, setActiveSkillIndex] = useState();

    const [pathToIncompleteStep, setPathToIncompleteStep] = useState();

    const resumeInput = useRef();
    const [uploadJobs, setUploadJobs] = useState();
    const [uploadJobsId, setUploadJobsId] = useState();

    const otherDocsInput = useRef();

    useEffect(() => {
        fetchJobSeeker();
    }, []);

    async function fetchJobSeeker() {
        setProfileLoading(true);
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

                if (jobSeeker.upload_job.other_docs) {
                    const otherDocsArray = jobSeeker.upload_job.other_docs_urls
                        .trim()
                        .split("|");
                    setOtherDocs(otherDocsArray);
                    setHasOtherDocs(true);
                }

                setUploadJobsId(jobSeeker.upload_job.id);
            }

            if (
                jobSeeker.work_experiences &&
                jobSeeker.work_experiences.length > 0
            ) {
                setWorkExperiences(jobSeeker.work_experiences);
                setHasWorkExperience(true);
            }

            if (jobSeeker.education && jobSeeker.education.length > 0) {
                setEducations(jobSeeker.education);
                setHasEducation(true);
            }

            if (jobSeeker.skills && jobSeeker.skills.length > 0) {
                setSkills(jobSeeker.skills);
                setHasSkills(true);
            }

            console.log("jobSeeker: ", jobSeeker);

            if (alreadyShowedIncompletePopups) {
                setProfileLoading(false);
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
            setProfileLoading(false);
        } catch (error) {
            setProfileLoading(false);
            console.log("jobSeeker profile Error: ", error);
        }
    }

    const afterBasicInfoUpdate = () => {
        // get the updated basic infos
        setShowBasicInfoEditPopup(false);
        fetchJobSeeker();
    };

    const onWantToChangeProfileImage = () => {
        profileImageInput.current.click();
    };

    const onChangeProfileImage = () => {
        const avatarFile = profileImageInput.current.files[0];
        console.log("avatar file: ", avatarFile);
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", avatarFile);
        const avatarEditURL = `${Config.API_URL}/basic_infos/${basicInfo.id}`;

        Utils.makeRequest(async () => {
            try {
                let avatarUpdateResults = await Utils.postForm(
                    avatarEditURL,
                    avatarFormData
                );

                avatarUpdateResults = avatarUpdateResults.data.data;
                setHasProfilePic(true);
                setProfilePic(avatarUpdateResults.avatar_url);

                auth.setAuth((prevValues) => {
                    return {
                        ...prevValues,
                        avatarURL: avatarUpdateResults.avatar_url,
                    };
                });

                localStorage.setItem(
                    "avatar_url",
                    avatarUpdateResults.avatar_url
                );

                console.log("avatar change results: ", avatarUpdateResults);
            } catch (error) {
                console.log("avatar change error: ", error);
            }
        });
    };

    const onClose = () => {
        setShowBasicInfoEditPopup(false);
        setShowMissingJobSeekerProfilePopup(false);
        setShowIncompleteJobSeekerProfilePopup(false);
        setShowWorkExperienceEditPopup(false);
        setShowEducationEditPopup(false);
        setShowSkillsEditPopup(false);
    };

    const onExperienceUpdated = (updatedWorkExperience) => {
        setShowWorkExperienceEditPopup(false);
        console.log("updated work experience", updatedWorkExperience);
        fetchJobSeeker();
    };

    const onEducationUpdate = (updatedEducation) => {
        setShowEducationEditPopup(false);
        console.log("updated education", updatedEducation);
        fetchJobSeeker();
    };

    const onSkillUpdate = (updatedSkill) => {
        setShowSkillsEditPopup(false);
        console.log("updated skill", updatedSkill);
        fetchJobSeeker();
    };

    const deleteWorkExperience = (itemIndex) => {
        console.log("work experience to delete", workExperiences[itemIndex]);
    };

    const deleteEducation = (itemIndex) => {
        console.log("education To Delete", educations[itemIndex]);
    };

    const deleteSkill = (itemIndex) => {
        console.log("delete Skill", skills[itemIndex]);
    };

    const updateResume = () => {
        const uploadJobsFormData = new FormData();

        uploadJobsFormData.append("resume", resumeInput.current.files[0]);

        // const userId = localStorage.getItem("user_id");

        // uploadJobsFormData.append("user_id", userId);

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.putForm(
                    `${Config.API_URL}/upload_jobs/${uploadJobsId}`,
                    uploadJobsFormData
                );

                const updatedResume = results.data.data.resume_url;

                console.log("update resume results: ", results, updateResume);

                setResume(updateResume);

                // setLoadingExit(false);
            } catch (error) {
                console.log("update resume Error: ", error);
                // setErrorMessage(error.message);
                // setShowErrorPopup(true);
                // setLoadingExit(false);
            }
        });
    };

    const updateOtherDocs = () => {
        const uploadJobsFormData = new FormData();

        for (const file of otherDocsInput.current.files) {
            uploadJobsFormData.append("other_docs[]", file);
        }

        // const userId = localStorage.getItem("user_id");

        // uploadJobsFormData.append("user_id", userId);

        Utils.makeRequest(async () => {
            try {
                const results = await Utils.putForm(
                    `${Config.API_URL}/upload_jobs/${uploadJobsId}`,
                    uploadJobsFormData
                );

                const updatedDocsArray = results.data.data.other_docs_urls
                    .trim()
                    .split("|");

                console.log(
                    "update other docs results: ",
                    results,
                    updatedDocsArray
                );

                setOtherDocs(updatedDocsArray);

                // setLoadingExit(false);
            } catch (error) {
                console.log("update resume Error: ", error);
                // setErrorMessage(error.message);
                // setShowErrorPopup(true);
                // setLoadingExit(false);
            }
        });
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
            <EditWorkExperiencePopup
                showPopup={showWorkExperienceEditPopup}
                onClose={onClose}
                onSuccess={onExperienceUpdated}
                workExperience={activeWorkExperience}
            />
            <EditEducationPopup
                showPopup={showEducationEditPopup}
                onClose={onClose}
                onSuccess={onEducationUpdate}
                education={activeEducation}
            />

            <EditSkillPopup
                showPopup={showSkillEditPopup}
                onClose={onClose}
                onSuccess={onSkillUpdate}
                skill={activeSkill}
            />

            <input
                ref={profileImageInput}
                type="file"
                name="avatar"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                onChange={onChangeProfileImage}
            />
            <JobSeekerNavbar />
            <div className="w-4/5 md:grid grid-cols-3 md:gap-4  mt-5 mb-32 mx-auto ">
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

                                        <p
                                            onClick={onWantToChangeProfileImage}
                                            className="mx-2 cursor-pointer text-white py-1 px-2 bg-primary-70 flex flex-row flex-nowrap justify-center items-center rounded-lg"
                                        >
                                            <RiImageEditFill
                                                className="text-3xl block cursor-pointer m-1"
                                                width={10}
                                                height={10}
                                            />
                                            <span>Change</span>
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
                                {/* {hasWorkExperience && (
                                <span
                                    onClick={() => {
                                        setShowWorkExperienceEditPopup(true);
                                    }}
                                    className="text-primary-70 cursor-pointer"
                                >
                                    Edit
                                </span>
                            )} */}
                            </div>
                            {hasWorkExperience && (
                                <div className="mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md">
                                    {workExperiences.map(
                                        (workExperience, index) => {
                                            return (
                                                <div
                                                    className="my-4"
                                                    key={index}
                                                >
                                                    <p className="text-lg my-1 ">
                                                        {workExperience.title}
                                                    </p>
                                                    <p className=" my-1">
                                                        {workExperience.company}
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
                                                    <div className="flex flex-row flex-nowrap justify-start items-center py-2">
                                                        <TbEdit
                                                            onClick={() => {
                                                                setActiveWorkExperience(
                                                                    workExperience
                                                                );
                                                                setActiveWorkExperienceIndex(
                                                                    index
                                                                );
                                                                setShowWorkExperienceEditPopup(
                                                                    true
                                                                );
                                                            }}
                                                            className="text-3xl p-1 mr-1 text-primary-70 cursor-pointer"
                                                        />
                                                        <HiOutlineTrash
                                                            onClick={() => {
                                                                setActiveWorkExperience(
                                                                    workExperience
                                                                );
                                                                setActiveWorkExperienceIndex(
                                                                    index
                                                                );
                                                                deleteWorkExperience(
                                                                    index
                                                                );
                                                            }}
                                                            className="text-3xl p-1 mx-1 text-red-500 cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            )}

                            {!hasWorkExperience && (
                                <div
                                    onClick={() => {
                                        router.push(
                                            "/job-seeker/profile-setup/step3"
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
                            <div className="flex flex-row justify-between p-2">
                                <label className="form-label-light">
                                    Education
                                </label>
                                {/* {hasEducation && (
                                <span
                                    onClick={() => {
                                        setShowEducationEditPopup(true);
                                    }}
                                    className="text-primary-70 cursor-pointer"
                                >
                                    Edit
                                </span>
                            )} */}
                            </div>

                            {hasEducation && (
                                <div
                                    className={
                                        "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md cursor-pointer "
                                    }
                                >
                                    {hasEducation &&
                                        educations.map((education, index) => {
                                            return (
                                                <div key={index}>
                                                    <p className="my-1 ">
                                                        {
                                                            education.certification
                                                        }
                                                    </p>
                                                    <p className="text-sm">
                                                        {education.institution}
                                                    </p>
                                                    <p className="my-1 text-my-gray-70 text-xs">
                                                        {education.duration}
                                                    </p>
                                                    <div className="flex flex-row flex-nowrap justify-start items-center py-2">
                                                        <TbEdit
                                                            onClick={() => {
                                                                setActiveEducation(
                                                                    education
                                                                );
                                                                setActiveEducationIndex(
                                                                    index
                                                                );
                                                                setShowEducationEditPopup(
                                                                    true
                                                                );
                                                            }}
                                                            className="text-3xl p-1 mr-1 text-primary-70 cursor-pointer"
                                                        />
                                                        <HiOutlineTrash
                                                            onClick={() => {
                                                                setActiveEducation(
                                                                    education
                                                                );
                                                                setActiveEducationIndex(
                                                                    index
                                                                );
                                                                deleteEducation(
                                                                    index
                                                                );
                                                            }}
                                                            className="text-3xl p-1 mx-1 text-red-500 cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            )}

                            {!hasEducation && (
                                <div
                                    onClick={() => {
                                        router.push(
                                            "/job-seeker/profile-setup/step3"
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
                            <div className="flex flex-row justify-between p-2">
                                <label className="form-label-light">
                                    Skills
                                </label>
                                {/* {hasSkills && (
                                <span
                                    onClick={() => {
                                        setShowSkillsEditPopup(true);
                                    }}
                                    className="text-primary-70 cursor-pointer"
                                >
                                    Edit
                                </span>
                            )} */}
                            </div>
                            {hasSkills && (
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
                                                <TbEdit
                                                    onClick={() => {
                                                        setActiveSkill(skill);
                                                        setActiveSkillIndex(
                                                            index
                                                        );

                                                        setShowSkillsEditPopup(
                                                            true
                                                        );
                                                    }}
                                                    className="text-3xl p-1 ml-2 text-primary-70 cursor-pointer"
                                                />
                                                <HiOutlineTrash
                                                    onClick={() => {
                                                        setActiveSkill(skill);
                                                        setActiveSkillIndex(
                                                            index
                                                        );
                                                        deleteSkill(index);
                                                    }}
                                                    className="text-3xl p-1  text-red-500 cursor-pointer"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {!hasSkills && (
                                <div
                                    onClick={() => {
                                        router.push(
                                            "/job-seeker/profile-setup/step3"
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
                                <label className="form-label-light">
                                    Resume
                                </label>
                                {hasResume && (
                                    <span
                                        onClick={() => {
                                            resumeInput.current.click();
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
                                    <input
                                        ref={resumeInput}
                                        className="hidden"
                                        name="resume"
                                        accept=".pdf,.doc,.docx"
                                        type={"file"}
                                        onChange={(e) => {
                                            const value = e.target.files[0];
                                            setUploadJobs((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    resume: value,
                                                };
                                            });

                                            updateResume();
                                        }}
                                    />
                                </div>
                            )}

                            {!hasResume && (
                                <div
                                    onClick={() => {
                                        router.push(
                                            "/job-seeker/profile-setup/step4"
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
                            <div className="flex flex-row justify-between p-2">
                                <label className="form-label-light">
                                    Cerficates / Other Documents
                                </label>
                                {hasOtherDocs && (
                                    <span
                                        onClick={() => {
                                            otherDocsInput.current.click();
                                        }}
                                        className="text-primary-70 cursor-pointer"
                                    >
                                        Edit
                                    </span>
                                )}
                            </div>

                            {hasOtherDocs && (
                                <div
                                    className={
                                        "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-col justify-start items-start"
                                    }
                                >
                                    {otherDocs.map((otherDoc, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                href={otherDoc}
                                                target="_blank"
                                                className="flex flex-row flex-nowrap justify-start items-center"
                                            >
                                                <AiOutlineFileText />
                                                <span className="text-xs text-primary-70 p-2">
                                                    Other Doc_{index + 1}
                                                </span>
                                                <MdOutlineOpenInNew className="ml-2 text-primary-70" />
                                            </Link>
                                        );
                                    })}
                                    <input
                                        ref={otherDocsInput}
                                        className="hidden"
                                        name="other_docs[]"
                                        accept=".pdf,.doc,.docx"
                                        type={"file"}
                                        multiple
                                        onChange={(e) => {
                                            const value = e.target.files;
                                            console.log(value);
                                            setUploadJobs((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    others: value,
                                                };
                                            });
                                            updateOtherDocs();
                                        }}
                                    />
                                </div>
                            )}

                            {!hasResume && (
                                <div
                                    onClick={() => {
                                        router.push(
                                            "/job-seeker/profile-setup/step4"
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
                    </section>
                )}

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
                                ${
                                    hasSkills && skills.length >= 3
                                        ? "line-through"
                                        : ""
                                }`}
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
