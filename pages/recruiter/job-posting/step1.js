import JobPostNavbar from "../../../components/navbars/JobPostNavbar";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";

export default function () {
    const router = useRouter();
    const onNext = (e) => {
        e.preventDefault();
        router.push("/recruiter/job-posting/step2");
    };

    const onSaveAndExit = (e) => {
        e.preventDefault();
        router.push("/recruiter/job-posting/step1");
    };
    return (
        <>
            <JobPostNavbar currentStepText={"Step 1 of 6 - Job details"} />

            <div className="w-3/4 mt-5 mb-10 mx-auto">
                <h3 className="font-medium text-xl mb-5">
                    Please select the type of job you want to post
                </h3>
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
                            Your Company’s industry
                        </label>
                        <select className="form-input">
                            <option className="text-sm text-my-gray-70">
                                Please Select
                            </option>
                        </select>
                    </div>

                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            Job title
                        </label>
                        <select className="form-input">
                            <option className="text-sm text-my-gray-70">
                                Please Select
                            </option>
                        </select>
                    </div>

                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="industry">
                            Job location description
                        </label>
                        <select className="form-input">
                            <option className="text-sm text-my-gray-70">
                                Please Select
                            </option>
                        </select>
                    </div>
                    <div className="form-input-container my-5">
                        <label className="form-label-light" for="company-name">
                            Job description
                        </label>
                        <p className="text-xs my-3">
                            Save time by adding a job description now.
                        </p>

                        <textarea className="form-input" rows={8}></textarea>
                    </div>

                    <div className="w-full flex flex-row flex-wrap justify-center items-center ">
                        <input
                            className="submit-btn-secondary mr-3"
                            value={"Back"}
                            type={"submit"}
                            onClick={onSaveAndExit}
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
