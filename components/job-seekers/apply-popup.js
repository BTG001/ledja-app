import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineFileText } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import Config from "../../Config";
import Utils from "../../Utils";

export default function ApplyPopup({
    showPopup,
    onClose,
    onSuccess,
    jobId,
    onFailure,
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

    const [loading, setLoading] = useState(false);

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
        applicationFormData.append("cover_letter", "the cover letter");

        Utils.makeRequest(async () => {
            try {
                const applicationResults = await Utils.postForm(
                    applicationURL,
                    applicationFormData
                );
                setLoading(false);
                console.log("application results: ", applicationResults);
                onSuccess();
            } catch (error) {
                console.log("applicatio error: ", error);
                setLoading(false);
                onFailure();
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
        } catch (error) {
            console.log("jobSeeker profile Error: ", error);
        }
    }

    return (
        showPopup && (
            <>
                <div
                    onClick={whenClosed}
                    className="fixed bg-my-gray-70 opacity-40 w-full h-full top-0 left-0 bottom-0 right-0 "
                ></div>
                <div className="z-50 fixed w-4/5 md:w-3/4 lg:w-2/3 left-1/2 -translate-x-1/2 top-0  p-10 bg-white opacity-100 rounded-10 shadow-md  my-10">
                    <p className="w-full flex flex-row justify-between flex-wrap-reverse items-center text-lg font-medium">
                        <span>Review your application</span>
                        <Image
                            onClick={onClose}
                            src={"/x-icon.svg"}
                            className="cursor-pointer"
                            width={27}
                            height={27}
                        />
                    </p>
                    <section className="col-span-2 h-max max-h-60-screen overflow-y-auto pl-6 pr-6 my-3">
                        <div className="form-input-container ">
                            <p className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                                <label className="form-label-light">
                                    About Me
                                </label>
                                {/* {hasBasicInfo && (
                                    <span
                                        onClick={() => {
                                            setShowBasicInfoEditPopup(true);
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
                                        "mt-4 p-5 border border-solid border-my-gray-70  rounded-10 grid grid-cols-3 gap-3 "
                                    }
                                >
                                    <div className="text-dark-50 grid grid-rows-4 gap-1 justify-center items-center w-full h-full">
                                        <p className="flex justify-center items-center row-span-4">
                                            {!hasProfilePic && (
                                                <BiUserCircle className="h-32 text-center block w-full" />
                                            )}

                                            {hasProfilePic && (
                                                <Image
                                                    src={profilePic}
                                                    width={160}
                                                    height={120}
                                                    className="flex justify-center items-center"
                                                />
                                            )}
                                        </p>

                                        {/* <p
                                            onClick={onWantToChangeProfileImage}
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
                                {/* {hasWorkExperience && (
                                    <span
                                        onClick={() => {
                                            setShowWorkExperienceEditPopup(
                                                true
                                            );
                                        }}
                                        className="text-primary-70 cursor-pointer"
                                    >
                                        Edit
                                    </span>
                                )} */}
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
                                                    Cras vehicula nisi at
                                                    euismod auctor. Duis sed mi
                                                    ut odio ornare euismod. Duis
                                                    eu lectus porttitor, aliquam
                                                    arcu vel, tincidunt diam.
                                                    Duis in purus nec eros
                                                    posuere tincidunt euismod
                                                    nec ex. Nunc at auctor
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
                                        "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md "
                                    }
                                >
                                    {hasEducation &&
                                        educations.map((education) => {
                                            return (
                                                <>
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
                                <label className="form-label-light">
                                    Resume
                                </label>
                                {/* {hasResume && (
                                    <span
                                        onClick={() => {
                                            setShowResumeEditPopup(true);
                                        }}
                                        className="text-primary-70 cursor-pointer"
                                    >
                                        Edit
                                    </span>
                                )} */}
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
                        <div
                            onClick={() => {
                                document.body.style.overflowY = "visible";
                            }}
                            className="flex flex-col justify-center items-center my-10 mx-auto"
                        >
                            <button
                                onClick={onSubmit}
                                className="submit-btn-left ml-3"
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
                                className="submit-btn-secondary mr-3"
                                type={"button"}
                            >
                                {/* {loading && <span className="loader"></span>} */}
                                {/* {!loading && <span className="">Cancel</span>} */}
                                <span className="">Cancel</span>
                            </button>

                            {/* <div className="w-full flex flex-row flex-wrap justify-center items-center ">
                            
                        </div> */}
                        </div>
                    </section>
                </div>
            </>
        )
    );
}
