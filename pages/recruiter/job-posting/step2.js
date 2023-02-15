import JobPostNavbar from "../../../components/navbars/JobPostNavbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useRouter } from "next/router";

export default function () {
    const router = useRouter();
    const onNext = (e) => {
        e.preventDefault();
        router.push("/recruiter/job-posting/step3");
    };

    const onBack = (e) => {
        e.preventDefault();
        router.back();
    };
    return (
        <>
            <JobPostNavbar currentStepText={"Step 2 of 6 - Job type"} />

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

                <form className="form">
                    <div className="form-input-container my-5">
                        <label className="form-label-light " for="industry">
                            Please select the job type
                        </label>
                        <div className="my-4 flex">
                            <p className="mx-3 flex flex-row flex-nowrap justify-center items-center p-2 text-primary-70 border border-solid border-primary-2 rounded-10">
                                <Image
                                    src={"/plus-icon.svg"}
                                    width={14}
                                    height={14}
                                    className="m-2"
                                />
                                <span>Full-time</span>
                            </p>
                            <p className="mx-3 flex flex-row flex-nowrap justify-center items-center p-2 text-primary-70 border border-solid border-primary-2 rounded-10">
                                <Image
                                    src={"/plus-icon.svg"}
                                    width={14}
                                    height={14}
                                    className="m-2"
                                />
                                <span>Part-time</span>
                            </p>
                            <p className="text-sm mx-3 flex flex-row flex-nowrap justify-center items-center py-2 px-4 text-primary-70 border border-solid border-primary-2 rounded-10">
                                <Image
                                    src={"/plus-icon.svg"}
                                    width={14}
                                    height={14}
                                    className="m-2"
                                />
                                <span>Contract</span>
                            </p>

                            <p className="text-sm mx-3 flex flex-row flex-nowrap justify-center items-center py-2 px-4 text-primary-70 border border-solid border-primary-2 rounded-10">
                                <Image
                                    src={"/plus-icon.svg"}
                                    width={14}
                                    height={14}
                                    className="m-2"
                                />
                                <span>Temporary</span>
                            </p>
                            <p className="text-sm mx-3 flex flex-row flex-nowrap justify-center items-center py-2 px-4 text-primary-70 border border-solid border-primary-2 rounded-10">
                                <Image
                                    src={"/plus-icon.svg"}
                                    width={14}
                                    height={14}
                                    className="m-2"
                                />
                                <span>Internship</span>
                            </p>
                            <p className="text-sm mx-3 flex flex-row flex-nowrap justify-center items-center py-2 px-4 text-primary-70 border border-solid border-primary-2 rounded-10">
                                <Image
                                    src={"/plus-icon.svg"}
                                    width={14}
                                    height={14}
                                    className="m-2"
                                />
                                <span>Seasonal</span>
                            </p>
                        </div>
                    </div>

                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            How many people do you want to hire for this job?
                        </label>
                        <select className="form-input py=2">
                            <option className="text-sm text-my-gray-70">
                                Please Select
                            </option>
                        </select>
                    </div>

                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            How quickly do you want to hire?
                        </label>
                        <select className="form-input">
                            <option className="text-sm text-my-gray-70">
                                Please Select
                            </option>
                        </select>
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
                            value="Save and continue"
                            onClick={onNext}
                        />
                    </div>
                </form>
            </div>

            <Footer />
        </>
    );
}
