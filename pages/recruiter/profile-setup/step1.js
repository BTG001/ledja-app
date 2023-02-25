import LogoNavbar from "../../../components/navbars/LogoNavbar";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import { useRef } from "react";
import axios from "axios";
import Utils from "../../../Utils";
import Config from "../../../Config";

export default function RecruiterProfileSetupStep1() {
    const router = useRouter();

    const R_Step1Form = useRef();

    const onNext = async (e) => {
        e.preventDefault();

        const userId = 2;

        const R_Step1FormData = new FormData(R_Step1Form.current);

        R_Step1FormData.append("user_id", userId);

        const results = await Utils.postForm(
            `${Config.BASE_URL}/recruiter_basic_infos`,
            R_Step1FormData
        );

        console.log(results);

        if (results.success) {
            router.push("/recruiter/profile-setup/step2");
        }
    };

    const onSaveAndExit = (e) => {
        e.preventDefault();
        alert("save and exit");
    };

    return (
        <>
            <LogoNavbar />
            <p
                className="back-btn"
                onClick={() => {
                    router.back();
                }}
            >
                <Image src="/back-icon.svg" width={6} height={11} />
                <span className="px-4">Back</span>
            </p>
            <div className="w-4/5 md:w-1/2 lg:w-2/5 mx-auto my-5 min-h-80-screen mb-24">
                <h3 className="form-title">Let’s set up your account now!</h3>
                <div className="w-3/4 my-10 mx-auto relative flex flex-row justify-center items-center">
                    <p className="absolute  w-full h-1-px bg-my-gray-50 z-0 "></p>
                    <div className="z-10 flex flex-row justify-between items-center w-full min-w-full">
                        <span className="w-8 h-8 bg-primary-70 text-white flex justify-center items-center rounded-full">
                            1
                        </span>

                        <span className="w-8 h-8 bg-my-gray-50 flex justify-center items-center  rounded-full">
                            2
                        </span>

                        <span className="w-8 h-8 bg-my-gray-50 flex justify-center items-center  rounded-full">
                            3
                        </span>

                        <span className="w-8 h-8 bg-my-gray-50 flex justify-center items-center rounded-full">
                            4
                        </span>
                    </div>
                </div>
                <h3 className="form-label">Basic information</h3>
                <form className="form" onSubmit={onNext} ref={R_Step1Form}>
                    <div className="form-input-container">
                        <label
                            className="form-label-light form-label-required"
                            for="company-name"
                        >
                            Company Name
                        </label>
                        <input
                            className="form-input"
                            type={"text"}
                            placeholder="ABC Company Inc."
                            name="company_name"
                            value={"ABC Company Inc"}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="form-input-container">
                            <label
                                className="form-label-light form-label-required"
                                for="industry"
                            >
                                Industry
                            </label>
                            <select
                                className="form-input"
                                name="industry"
                                required
                            >
                                <option value={"Banking"}>Banking</option>
                            </select>
                        </div>

                        <div className="form-input-container">
                            <label
                                className="form-label-light form-label-required"
                                for="headquarter"
                            >
                                Headquarter
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Nairobi, Kenya"
                                name="headquarters"
                                value={"CBD"}
                                required
                            />
                        </div>
                    </div>

                    <div className=" md:grid md:grid-cols-2 md:gap-6">
                        <div className="form-input-container">
                            <label
                                className="form-label-light "
                                for="company-size"
                            >
                                Company Size
                            </label>
                            <input
                                className="form-input"
                                type={"number"}
                                placeholder="25 (employees)"
                                name="company_size"
                                value={"2000"}
                            />
                        </div>

                        <div className="form-input-container">
                            <label className="form-label-light " for="revenue">
                                Revenue
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="2000000"
                                name="revenue"
                                value={"20000000"}
                            />
                        </div>
                    </div>

                    <div className=" md:grid md:grid-cols-2 md:gap-6">
                        <div className="form-input-container">
                            <label className="form-label-light " for="founded">
                                Founded
                            </label>
                            <input
                                className="form-input"
                                type={"number"}
                                min="1900"
                                max={new Date().getFullYear()}
                                placeholder="2003"
                                name="founded_on"
                                value={"2001"}
                            />
                        </div>

                        <div className="form-input-container">
                            <label className="form-label-light " for="revenue">
                                CEO
                            </label>
                            <input
                                className="form-input"
                                type={"email"}
                                placeholder="Frank Jessy"
                                name="ceo"
                                value={"Frank Jessy"}
                            />
                        </div>
                    </div>

                    <div>
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
