import JobPostNavbar from "../../../components/navbars/JobPostNavbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useRouter } from "next/router";

export default function () {
    const router = useRouter();
    const onNext = (e) => {
        e.preventDefault();
        alert("Completed");
    };

    const onBack = (e) => {
        e.preventDefault();
        router.back();
    };
    return (
        <>
            <JobPostNavbar currentStepText={"Step 6 of 6 - Job post review"} />

            <div className="w-3/4 mt-5 mb-10 mx-auto">
                <div className="md:grid md:grid-cols-3 mb-10">
                    <div className="flex flex-col justify-center items-center border border-solid border-primary-70 py-2 px-8 m-4 rounded-10">
                        <p className="text-primary-70 text-xl text-center">
                            BASIC JOB
                        </p>
                        <p className="text-sm text-primary-70 text-center">
                            Access to non-assessed list of applicants to
                            interview KSh 5,000
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-primary-60  py-2 px-8 m-4 rounded-10">
                        <p className=" text-xl text-center text-white">
                            STANDARD JOB
                        </p>
                        <p className="text-sm text-center text-white">
                            Access to shortlist of applicants to interview KSh
                            11,000
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center border border-solid border-primary-70 py-2 px-8 m-4 rounded-10">
                        <p className="text-primary-70 text-xl text-center">
                            PREMIUM JOB
                        </p>
                        <p className="text-sm text-primary-70 text-center">
                            Curated list of 10 selected candidates to interview
                            KSh 20,000
                        </p>
                    </div>
                </div>

                <div>
                    <div>
                        <p className="text-lg text-dark-50">Job details</p>
                        <div className="md:grid md:grid-cols-2 w-full">
                            <div>
                                <p className="flex flex-col flex-nowrap justify-start items-start my-3">
                                    <span className="text-dark-50">
                                        Job title
                                    </span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            Software Engineer
                                        </span>
                                        <Image
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1"
                                        />
                                    </span>
                                </p>
                                <p className="flex flex-col flex-nowrap justify-start items-start my-3">
                                    <span className="text-dark-50">
                                        Company
                                    </span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            ABC Group LTD
                                        </span>
                                        <Image
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1"
                                        />
                                    </span>
                                </p>
                                <p className="flex flex-col flex-nowrap justify-start items-start my-3">
                                    <span className="text-dark-50">
                                        Industry
                                    </span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            IT, Technology services
                                        </span>
                                        <Image
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1"
                                        />
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p className="flex flex-col flex-nowrap justify-start items-start my-3">
                                    <span className="text-dark-50">
                                        Location
                                    </span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            Nairobi, Kenya
                                        </span>
                                        <Image
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1"
                                        />
                                    </span>
                                </p>
                                <p className="flex flex-col flex-nowrap justify-start items-start my-3">
                                    <span className="text-dark-50">
                                        Work type
                                    </span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            Fulltime
                                        </span>
                                        <Image
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1"
                                        />
                                    </span>
                                </p>
                                <p className="flex flex-col flex-nowrap justify-start items-start my-3">
                                    <span className="text-dark-50">
                                        Experience
                                    </span>
                                    <span className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-my-gray-70">
                                            Minimum 1 year
                                        </span>
                                        <Image
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1"
                                        />
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="flex flex-row flex-nowrap justify-start items-center">
                                <span className="text-dark-50 my-3 text-lg">
                                    Job description
                                </span>
                                <Image
                                    src={"/edit-icon.svg"}
                                    width={18}
                                    height={18}
                                    className="m-1"
                                />
                            </p>
                            <p>
                                Our company is seeking to hire a skilled
                                software Engineer to help with the development
                                of our current projects. Your duties will
                                primarily revolve around building software by
                                writing code, as well as modifying software to
                                fix errors, adapt it to new hardware, improve
                                its performance, or upgrade interfaces. You will
                                also be involved in directing system testing and
                                validation procedures, and also working with
                                customers or departments on technical issues
                                including software system design and
                                maintenance.
                            </p>
                        </div>
                        <div>
                            <p className="flex flex-row flex-nowrap justify-start items-center">
                                <span className="text-dark-50 my-3 text-lg">
                                    Application settings
                                </span>
                            </p>
                            <div className="mb-16">
                                <div>
                                    <p className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-dark-50 my-2">
                                            Apply method
                                        </span>
                                        <Image
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1"
                                        />
                                    </p>
                                    <ul className="text-dark-50 list-disc list-inside ml-3">
                                        <li>Email</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-dark-50 my-2">
                                            Resume required
                                        </span>
                                        <Image
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1"
                                        />
                                    </p>
                                    <ul className="text-dark-50 list-disc list-inside ml-3">
                                        <li>Yes</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="flex flex-row flex-nowrap justify-start items-center">
                                        <span className="text-dark-50 my-2">
                                            Send application updates to
                                        </span>
                                        <Image
                                            src={"/edit-icon.svg"}
                                            width={18}
                                            height={18}
                                            className="m-1"
                                        />
                                    </p>
                                    <ul className="text-dark-50 list-disc list-inside ml-3">
                                        <li>email@email.com</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-row flex-wrap justify-center items-center ">
                    <input
                        className="submit-btn-secondary mr-3"
                        value={"Back"}
                        type={"submit"}
                        onClick={onBack}
                    />
                    <input
                        className="submit-btn-left ml-3"
                        type={"submit"}
                        value="Post a Job"
                        onClick={onNext}
                    />
                </div>
            </div>

            <Footer />
        </>
    );
}
