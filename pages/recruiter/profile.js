import { useState } from "react";
false;
import Image from "next/image";
import Footer from "../../components/Footer";
import RecruiterNavbar from "../../components/navbars/RecruiterNavbar";
import SecondaryBtn from "../../components/buttons/SecondaryBtn";

export default function Profile() {
    const [hasWorkExperience, setHasWorkExperience] = useState();
    const [hasEducation, setHasEducation] = useState();
    const [hasSkills, setHasSkills] = useState();
    const [hasAssessment, setHasAssessment] = useState();
    const [hasResume, setHasResume] = useState();

    return (
        <>
            <RecruiterNavbar icon={"user"} dashboardLinks={false} />
            <div className="w-4/5 md:grid grid-cols-3 md:gap-4  mt-5 mb-32 mx-auto ">
                <section className="col-span-2">
                    <div className="form-input-container ">
                        <p className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                            <label className="font-medium text-my-gray-70">
                                Basic Info
                            </label>
                            <span className="text-primary-70">Edit</span>
                        </p>
                        <div
                            className={
                                "mt-4 p-5 border border-solid border-my-gray-70  rounded-10 grid grid-cols-3 gap-3 "
                            }
                        >
                            <Image
                                src={"/job-2.png"}
                                width={145}
                                height={175}
                            />
                            <div className="flex flex-col flex-nowrap justify-start items-start">
                                <h3 className="font-medium text-xl text-dark-50 my-5">
                                    Generation Group Inc.
                                </h3>
                                <p className="text-sm text-dark-50">
                                    Software development
                                </p>
                                <p className="text-sm text-dark-50">
                                    Nairobi, Kenya
                                </p>
                                <p className="grid grid-cols-2 gap-2 w-fit mt-5 mb-2">
                                    <span className="text-primary-70 text-sm">
                                        Website
                                    </span>
                                    <span></span>
                                </p>
                                <p className="grid grid-cols-2 gap-2 w-fit mt-5 mb-2">
                                    <span className="text-primary-70 text-sm">
                                        Founded
                                    </span>
                                    <span className="text-sm">2003</span>
                                </p>
                                <p className="grid grid-cols-3 gap-2 w-fit mt-5 mb-2">
                                    <span className="text-primary-70 text-sm">
                                        Size
                                    </span>
                                    <span className="text-sm line row-span-2">
                                        23 employees
                                    </span>
                                </p>
                                <p className="grid grid-cols-2 gap-2 w-fit mt-5 mb-2">
                                    <span className="text-primary-70 text-sm">
                                        Revenue
                                    </span>
                                    <span className="text-sm">$ 1M</span>
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
                        <div className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                            <p className="text-my-gray-70 font-medium">
                                Company introduction
                            </p>
                            <span className="text-primary-70">Edit</span>
                        </div>

                        <div
                            className={
                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                            }
                        >
                            <p>
                                Generation group is a commercial is a
                                fast-growing Series C startup with classic
                                two-sided network effects. We have
                                product-market fit, generate substantial
                                revenue.
                            </p>
                        </div>
                    </div>

                    <div className="form-input-container ">
                        <div className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                            <p className="text-my-gray-70 font-medium">
                                Culture & Values
                            </p>
                            <span className="text-primary-70">Edit</span>
                        </div>

                        <div
                            className={
                                "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                            }
                        >
                            <p>
                                Generation group is a commercial is a
                                fast-growing Series C startup with classic
                                two-sided network effects. We have
                                product-market fit, generate substantial
                                revenue. <br /> <br />
                                Generation group is a commercial is a
                                fast-growing Series C startup two-sided network
                                effects. We have product-market fit, generate.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                        <p className="text-my-gray-70 font-medium">
                            Jobs Available
                        </p>
                        <span className="text-primary-70">Edit</span>
                    </div>
                    <div className="form-input-container border border-solid rounded-md border-my-gray-70 py-2 px-4 my-3">
                        <div className="grid grid-cols-4 my-3 gap-2 items-center md:w-1/2">
                            <Image
                                className="col-span-1"
                                src={"/job-2.png"}
                                width={48}
                                height={48}
                            />
                            <div className="col-span-3 flex flex-col flex-nowrap justify-start items-start ">
                                <h2 className=" mb-2">Technical Writer</h2>
                                <p className="text-sm text-my-gray-70">
                                    London (Remote)
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 my-3 gap-2 items-center md:w-1/2">
                            <Image
                                className="col-span-1"
                                src={"/job-2.png"}
                                width={48}
                                height={48}
                            />
                            <div className="col-span-3 flex flex-col flex-nowrap justify-start items-start ">
                                <h2 className=" mb-2">HR Specialist </h2>
                                <p className="text-sm text-my-gray-70">
                                    Hybrid, Spain
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 my-3 gap-2 items-center md:w-1/2">
                            <Image
                                className="col-span-1"
                                src={"/job-2.png"}
                                width={48}
                                height={48}
                            />
                            <div className="col-span-3 flex flex-col flex-nowrap justify-start items-start ">
                                <h2 className=" mb-2">
                                    Customer Service Specialist{" "}
                                </h2>
                                <p className="text-sm text-my-gray-70">
                                    London (Remote)
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 my-3 gap-2 items-center md:w-1/2">
                            <Image
                                className="col-span-1"
                                src={"/job-2.png"}
                                width={48}
                                height={48}
                            />
                            <div className="col-span-3 flex flex-col flex-nowrap justify-start items-start ">
                                <h2 className=" mb-2">Technical Engineer </h2>
                                <p className="text-sm text-my-gray-70">
                                    Technical Engineer
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row flex-nowrap justify-start items-center text-primary-70 text-sm my-3">
                            <Image
                                className="m-2"
                                src={"/plus-icon.svg"}
                                width={9}
                                height={9}
                            />
                            <span>Post new jobs</span>
                        </div>
                    </div>
                    <div className="form-input-container ">
                        <p className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                            <label
                                className=" font-medium text-my-gray-70"
                                for="websites"
                            >
                                Contact Info
                            </label>
                            <span className="text-primary-70">Edit</span>
                        </p>
                        <div
                            className={
                                "mt-4 p-5 border border-solid border-my-gray-70  rounded-10 grid grid-cols-3 gap-3 "
                            }
                        >
                            <Image
                                src={"/recruiter.png"}
                                width={145}
                                height={175}
                            />
                            <div className="flex flex-col flex-nowrap justify-start items-start">
                                <h3 className="font-medium text-xl text-dark-50 my-5">
                                    Jennifer Eva
                                </h3>
                                <p className="text-sm text-dark-50">
                                    Recruitment Specialist
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
                </section>

                <sidebar className="py-16">
                    <div className="border border-my-gray-70 border-solid rounded-10 p-5">
                        <p className="text-dark-50 w-full">
                            Let’s complete your setup!
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
                    {/* <p className="my-5 px-3 py-2 mx-auto bg-primary-70 text-white w-4/5 rounded-10 text-center">
                        Upload resume to autofill
                    </p> */}
                </sidebar>
            </div>
            <Footer />
        </>
    );
}
