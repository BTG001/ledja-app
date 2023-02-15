import JobPostNavbar from "../../../components/navbars/JobPostNavbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useRouter } from "next/router";

export default function () {
    const router = useRouter();
    const onNext = (e) => {
        e.preventDefault();
        router.push("/recruiter/job-posting/step4");
    };

    const onBack = (e) => {
        e.preventDefault();
        router.back();
    };
    return (
        <>
            <JobPostNavbar
                currentStepText={"Step 3 of 6 - Complete job post"}
            />

            <div className="w-3/4 mt-5 mb-10 mx-auto">
                <form className="form">
                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            How many people do you want to hire for this job?
                        </label>
                        <div className="flex flex-row flex-nowrap justify-start items-center border border-solid border-my-gray-70 p-2 rounded-md">
                            <p className="w-4 h-4 rounded-full border border-primary-70"></p>
                            <p className="m-4">Complete job post on my own</p>
                        </div>
                    </div>
                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            How many people do you want to hire for this job?
                        </label>
                        <div className="flex flex-row flex-nowrap justify-start items-start border border-solid border-my-gray-70 p-2 rounded-md">
                            <p className="w-4 h-4 rounded-full border border-primary-70 mt-1"></p>
                            <div className="flex flex-col flex-nowrap justify-start items-center p-0 m-0">
                                <p className="mx-4 p-0 my-0">
                                    Complete my job post with recommendations
                                </p>
                                <ul className="list-disc list-inside pl-4 text-sm">
                                    <li>
                                        Options to increase your job post
                                        visibility
                                    </li>
                                    <li>
                                        A tailored job template you can edit
                                    </li>
                                    <li>Suggested job post improvements</li>
                                </ul>
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
