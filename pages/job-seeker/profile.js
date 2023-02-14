import { useState } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import JobSeekerNavbar from "../../components/navbars/JobSeekerNavbar";

export default function Profile() {
    const [hasWorkExperience, setHasWorkExperience] = useState();
    const [hasEducation, setHasEducation] = useState();
    const [hasSkills, setHasSkills] = useState();
    const [hasAssessment, setHasAssessment] = useState();
    const [hasResume, setHasResume] = useState();

    return (
        <>
            <JobSeekerNavbar />
            <div className="w-4/5 md:grid grid-cols-3 md:gap-4  mt-5 mb-32 mx-auto ">
                <section className="col-span-2">
                    <div className="form-input-container ">
                        <p className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                            <label className="form-label-light" for="websites">
                                About Me
                            </label>
                            <span className="text-primary-70">Edit</span>
                        </p>
                        <div
                            className={
                                "mt-4 p-5 border border-solid border-my-gray-70  rounded-10 grid grid-cols-3 gap-3 "
                            }
                        >
                            <Image src={"/user.png"} width={145} height={175} />
                            <div className="flex flex-col flex-nowrap justify-start items-start">
                                <h3 className="font-medium text-xl text-dark-50 my-5">
                                    Jennifer Musugu
                                </h3>
                                <p className="text-sm text-dark-50">
                                    Software Engineer
                                </p>
                                <p className="text-sm text-dark-50">
                                    Nairobi, Kenya
                                </p>
                                <p className="flex flex-row flex-nowrap justify-between items-center mt-5 mb-2">
                                    <Image
                                        src={"/email.svg"}
                                        width={15}
                                        height={15}
                                        className="mr-3"
                                    />
                                    <span>Jennifer@gmail.com</span>
                                </p>
                                <p className="flex flex-row flex-nowrap justify-between items-center">
                                    <Image
                                        src={"/phone.svg"}
                                        width={15}
                                        height={15}
                                        className="mr-3"
                                    />
                                    <span>123-123-1234</span>
                                </p>
                            </div>

                            <div className="flex flex-row flex-nowrap justify-center items-start my-3">
                                <div className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50 mx-2">
                                    <Image
                                        src={"/linkedin.svg"}
                                        width={14}
                                        height={9}
                                    />
                                </div>
                                <div className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50 mx-2">
                                    <Image
                                        src={"/twitter.svg"}
                                        width={13}
                                        height={11}
                                    />
                                </div>
                                <div className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50 mx-2">
                                    <Image
                                        src={"/facebook.svg"}
                                        width={8}
                                        height={6}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-input-container ">
                        <label className="form-label-light" for="websites">
                            Work Experience
                        </label>
                        <div
                            className={
                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-sm flex flex-row flex-nowrap justify-start items-center"
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

                    <div className="form-input-container ">
                        <label className="form-label-light">Education</label>
                        <div
                            className={
                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-sm flex flex-row flex-nowrap justify-start items-center"
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

                    <div className="form-input-container ">
                        <label className="form-label-light">Skills</label>
                        <div
                            className={
                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-sm flex flex-row flex-nowrap justify-start items-center"
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

                    <div className="form-input-container ">
                        <label className="form-label-light">
                            Assessment Text
                        </label>
                        <div
                            className={
                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-sm flex flex-row flex-nowrap justify-start items-center"
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

                    <div className="form-input-container ">
                        <label className="form-label-light">Resume</label>
                        <div
                            className={
                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-sm flex flex-row flex-nowrap justify-start items-center"
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
                </section>

                <sidebar className="py-16">
                    <div className="border border-my-gray-70 border-solid rounded-10 p-5">
                        <p className="text-dark-50 w-full">
                            Complete your setup to boost <br /> your chance to
                            get hired!
                        </p>
                        <p className="bg-my-gray-50 w-full h-2-px my-5"></p>
                        <div>
                            <p className="flex flex-row flex-nowrap justify-start items-center">
                                <span className="block w-4 h-4  bg-white rounded-full border border-grey-70 m-2"></span>
                                <span className="text-dark-50 text-sm">
                                    Add contact info
                                </span>
                            </p>
                            <p className="flex flex-row flex-nowrap justify-start items-center">
                                <span className="block w-4 h-4  bg-white rounded-full border border-grey-70 m-2"></span>
                                <span className="text-dark-50 text-sm">
                                    Add profile picture
                                </span>
                            </p>
                            <p className="flex flex-row flex-nowrap justify-start items-center">
                                <span className="block w-4 h-4  bg-white rounded-full border border-grey-70 m-2"></span>
                                <span className="text-dark-50 text-sm">
                                    Linked with social media
                                </span>
                            </p>
                            <p className="flex flex-row flex-nowrap justify-start items-center">
                                <span className="block w-4 h-4  bg-white rounded-full border border-grey-70 m-2"></span>
                                <span className="text-dark-50 text-sm">
                                    Add work experience
                                </span>
                            </p>
                            <p className="flex flex-row flex-nowrap justify-start items-center">
                                <span className="block w-4 h-4  bg-white rounded-full border border-grey-70 m-2"></span>
                                <span className="text-dark-50 text-sm">
                                    Add education
                                </span>
                            </p>
                            <p className="flex flex-row flex-nowrap justify-start items-center">
                                <span className="block w-4 h-4  bg-white rounded-full border border-grey-70 m-2"></span>
                                <span className="text-dark-50 text-sm">
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
