import JobPostNavbar from "../../../components/navbars/JobPostNavbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useRouter } from "next/router";

export default function () {
    const router = useRouter();
    const onNext = (e) => {
        e.preventDefault();
        router.push("/recruiter/job-posting/step6");
    };

    const onBack = (e) => {
        e.preventDefault();
        router.back();
    };
    return (
        <>
            <JobPostNavbar
                currentStepText={"Step 5 of 6 - Customize application process"}
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
                    <div className="form-input-container mb-5">
                        <label className="form-label-light">
                            Communication preferences
                        </label>

                        <div className="text-sm my-2 text-my-gray-70 border border-solid border-my-gray-70 rounded-sm p-2 ">
                            <p>
                                A skills assessment will help you detemine
                                whether applicants meet your needs.
                                <br /> It significantly increases your chances
                                of finding the right applicant.
                                <br /> This option is available for the premium
                                job selection
                            </p>
                            <p className="flex flex-row flex-nowrap justify-end items-center p-2 ">
                                <span className="text-xs my-1 mx-2 text-my-gray-70   ">
                                    Add a skills assessment for this job
                                </span>
                                <Image
                                    src={"/switch-off-icon.svg"}
                                    width={34}
                                    height={20}
                                />
                            </p>
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
