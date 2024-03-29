import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import { useState } from "react";
import AddExperiencePopup from "../../../components/job-seekers/profile-setup-step-3/add-experience-popup";
import AddEducationPopup from "../../../components/job-seekers/profile-setup-step-3/add-education-popup";
import AddSkillPopup from "../../../components/job-seekers/profile-setup-step-3/add-skill-popup";
import AuthenticatedNavbar from "../../../components/navbars/authenticatedNavbar";

export default function JobSeekerProfileSetupStep3() {
    const router = useRouter();

    const [showAddExperiencePopup, setShowAddExperiencePopup] = useState(false);
    const [workExperiences, setWorkExperiences] = useState([]);

    const [showAddEducationPopup, setShowAddEducationPopup] = useState(false);
    const [educations, setEducations] = useState([]);

    const [showAddSkillPopup, setShowAddSkillPopup] = useState(false);
    const [skills, setSkills] = useState([]);

    const onNext = (e) => {
        e.preventDefault();
        router.push("/job-seeker/profile-setup/step4");
    };

    const onSaveAndExit = (e) => {
        e.preventDefault();
        alert("save and exit");
    };
    const onClose = () => {
        setShowAddExperiencePopup(false);
        setShowAddEducationPopup(false);
        setShowAddSkillPopup(false);
    };

    const onAddExperience = () => {
        setShowAddExperiencePopup(true);
    };

    const onAddEducation = () => {
        setShowAddEducationPopup(true);
    };

    const onAddSkill = () => {
        setShowAddSkillPopup(true);
    };

    const onSuccess = (workExperience) => {
        // e.preventDefault();
        setShowAddExperiencePopup(false);

        setWorkExperiences((prevValues) => {
            return [...prevValues, workExperience];
        });
    };

    const onSuccessEducation = (education) => {
        setShowAddEducationPopup(false);
        setEducations((prevValues) => {
            return [...prevValues, education];
        });
    };

    const onSuccessSkill = (skill) => {
        setShowAddSkillPopup(false);
        setSkills((prevValues) => {
            return [...prevValues, skill];
        });
    };

    return (
        <>
            <AddExperiencePopup
                showPopup={showAddExperiencePopup}
                onClose={onClose}
                onSuccess={onSuccess}
            />

            <AddEducationPopup
                showPopup={showAddEducationPopup}
                onClose={onClose}
                onSuccess={onSuccessEducation}
            />
            <AddSkillPopup
                showPopup={showAddSkillPopup}
                onClose={onClose}
                onSuccess={onSuccessSkill}
            />

            <AuthenticatedNavbar />
            <p
                className="back-btn"
                onClick={() => {
                    router.back();
                }}
            >
                <Image src="/back-icon.svg" width={6} height={11} />
                <span className="px-4">Back</span>
            </p>
            <div className="w-4/5 md:w-1/2 lg:w-1/3 mx-auto my-5 min-h-80-screen mb-24">
                <h3 className="form-title">Let’s set up your account now!</h3>
                <div className="w-3/4 my-10 mx-auto relative flex flex-row justify-center items-center">
                    <div className="grid grid-cols-10 gap-0 w-full min-w-full items-center">
                        <span className=" z-10 w-8 h-8 bg-primary-70 text-white flex justify-center items-center rounded-full">
                            1
                        </span>
                        <p className=" z-0 col-span-2 w-full h-1-px bg-primary-70 "></p>

                        <span className="z-10 w-8 h-8 bg-primary-70 text-white flex justify-center items-center  rounded-full">
                            2
                        </span>
                        <p className="z-0 col-span-2 w-full h-1-px bg-primary-70"></p>

                        <span className="z-10 w-8 h-8 bg-primary-70 text-white flex justify-center items-center  rounded-full">
                            3
                        </span>

                        <p className="z-0 col-span-2 w-full h-1-px bg-my-gray-50"></p>

                        <span className="z-10 w-8 h-8 bg-my-gray-50 flex justify-center items-center rounded-full">
                            4
                        </span>
                    </div>
                </div>
                <h3 className="form-label">Tell me more about yourself</h3>
                <form className="form">
                    <div className="form-input-container">
                        <label className="form-label-light">
                            Work Experience
                        </label>

                        <div
                            className={` my-2 ${
                                workExperiences && workExperiences.length > 0
                                    ? "border-t border-x border-primary-40 border-solid"
                                    : ""
                            }`}
                        >
                            {workExperiences.map((workExperience, index) => {
                                return (
                                    <p
                                        key={index}
                                        className="text-primary-70 border-b border-primary-40 p-1"
                                    >
                                        <span className="p-2 pl-0">
                                            {workExperience.duration}
                                        </span>
                                        <span className="p-2 pl-0">
                                            {workExperience.title}
                                        </span>
                                    </p>
                                );
                            })}
                        </div>

                        <div
                            className={
                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-sm flex flex-row flex-nowrap justify-start items-center cursor-pointer"
                            }
                            onClick={onAddExperience}
                        >
                            <Image
                                src={"/plus-icon.svg"}
                                width={9}
                                height={9}
                                className="m-2"
                            />
                            <span className="text-xs text-primary-70">Add</span>
                        </div>
                    </div>

                    <div className="form-input-container">
                        <label className="form-label-light">Education</label>
                        <div
                            className={` my-2 ${
                                educations && educations.length > 0
                                    ? "border-t border-x border-primary-40 border-solid"
                                    : ""
                            }`}
                        >
                            {educations.map((education, index) => {
                                return (
                                    <p
                                        key={index}
                                        className="text-primary-70 border-b border-primary-40 p-1"
                                    >
                                        <span className="p-2 pl-0">
                                            {education.duration}
                                        </span>
                                        <span className="p-2 pl-0">
                                            {education.certification}
                                        </span>
                                        <span className="p-2 pl-0">
                                            at {education.institution}
                                        </span>
                                    </p>
                                );
                            })}
                        </div>
                        <div
                            onClick={onAddEducation}
                            className={
                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-sm flex flex-row flex-nowrap justify-start items-center cursor-pointer"
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
                    </div>

                    <div className="form-input-container">
                        <label className="form-label-light">Skills</label>
                        <div
                            className={` my-2 ${
                                skills && skills.length > 0
                                    ? "border-t border-x border-primary-40 border-solid"
                                    : ""
                            }`}
                        >
                            {skills.map((skill, index) => {
                                return (
                                    <p
                                        key={index}
                                        className="text-primary-70 border-b border-primary-40 p-1"
                                    >
                                        <span className="p-2 pl-0">
                                            {skill.proficiency}
                                        </span>
                                        <span className="p-2 pl-0">
                                            in {skill.name}
                                        </span>
                                    </p>
                                );
                            })}
                        </div>
                        <div
                            onClick={onAddSkill}
                            className={
                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-sm flex flex-row flex-nowrap justify-start items-center cursor-pointer"
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
                    </div>

                    <div className="flex flex-row justify-start items-center">
                        <input
                            className="submit-btn-secondary mr-3"
                            value={"Save and Exit"}
                            type={"submit"}
                            onClick={onSaveAndExit}
                        />
                        <input
                            className="submit-btn-left ml-3"
                            type={"submit"}
                            value="Next"
                            onClick={onNext}
                        />
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}
