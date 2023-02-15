import JobPostNavbar from "../../../components/navbars/JobPostNavbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useRouter } from "next/router";

export default function () {
    const router = useRouter();
    const onNext = (e) => {
        e.preventDefault();
        router.push("/recruiter/job-posting/step5");
    };

    const onBack = (e) => {
        e.preventDefault();
        router.back();
    };
    return (
        <>
            <JobPostNavbar
                currentStepText={"Step 4 of 6 - Application preferences"}
            />

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
                        <label className="form-label-light" for="industry">
                            Would you like candidates to submit a resume?
                        </label>
                        <div className="flex flex-row flex-nowrap justify-start items-center border border-solid border-my-gray-70 px-2 rounded-md text-dark-50 mb-8">
                            <p className="w-4 h-4 rounded-full border border-primary-70"></p>
                            <p className="mx-4 my-1 text-xs">
                                Yes <br />
                                People will be required to submit a resume
                            </p>
                        </div>
                        <div className="flex flex-row flex-nowrap justify-start items-center border border-solid border-my-gray-70 px-2 rounded-md text-dark-50 mb-8">
                            <p className="w-4 h-4 rounded-full border border-primary-70"></p>
                            <p className="mx-4 my-1 text-xs">
                                No
                                <br />
                                People will not be required to submit a resume
                            </p>
                        </div>
                        <div className="flex flex-row flex-nowrap justify-start items-center border border-solid border-my-gray-70 px-2 rounded-md text-dark-50 mb-8">
                            <p className="w-4 h-4 rounded-full border border-primary-70"></p>
                            <p className="mx-4 my-1 text-xs">
                                Optional <br></br>
                                People have the option of including resume
                            </p>
                        </div>
                    </div>
                    <div className="form-input-container">
                        <label className="form-label-light">
                            Communication preferences
                        </label>
                        <p className="text-sm my-2 text-my-gray-70">
                            Receive daily updates about this job and
                            applications at;
                        </p>
                        <input
                            className="form-input"
                            type={"text"}
                            placeholder=""
                        />
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
