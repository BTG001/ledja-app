import LogoNavbar from "../../../components/navbars/LogoNavbar";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RecruiterProfileSetupStep2() {
    const router = useRouter();

    const onNext = (e) => {
        e.preventDefault();
        router.push("/recruiter/profile-setup/step3");
    };

    const [websiteFocus, setWebsiteFocus] = useState(false);
    const [linkedinFocus, setLinkedinFocus] = useState(false);
    const [twitterFocus, setTwitterFocus] = useState(false);
    const [facebookFocus, setFacebookFocus] = useState(false);

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
                        <p className="z-0 col-span-2 w-full h-1-px bg-my-gray-50"></p>

                        <span className="z-10 w-8 h-8 bg-my-gray-50 flex justify-center items-center  rounded-full">
                            3
                        </span>

                        <p className="z-0 col-span-2 w-full h-1-px bg-my-gray-50"></p>

                        <span className="z-10 w-8 h-8 bg-my-gray-50 flex justify-center items-center rounded-full">
                            4
                        </span>
                    </div>
                </div>
                <h3 className="form-label">Links</h3>
                <form className="form">
                    <div className="form-input-container">
                        <label className="form-label-light" for="websites">
                            Websites
                        </label>
                        <div
                            className={`mt-4 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                websiteFocus
                                    ? "border-primary-70"
                                    : "border-my-gray-70"
                            }`}
                        >
                            <input
                                onFocus={() => setWebsiteFocus(true)}
                                onBlur={() => setWebsiteFocus(false)}
                                className="form-input-with-icon peer"
                                type={"text"}
                                placeholder="abccompany.com"
                            />
                            <Image
                                src={"/website-icon.svg"}
                                width={17}
                                height={9}
                                className="m-2"
                            />
                        </div>
                    </div>

                    <div className="form-input-container">
                        <label className="form-label-light " for="social-media">
                            Social Media
                        </label>
                        <div
                            className={`mt-4 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                linkedinFocus
                                    ? "border-primary-70"
                                    : "border-my-gray-70"
                            }`}
                        >
                            <input
                                onFocus={() => setLinkedinFocus(true)}
                                onBlur={() => setLinkedinFocus(false)}
                                className="form-input-with-icon peer"
                                type={"text"}
                                placeholder="abccompany/linkedin.com"
                            />
                            <Image
                                src={"/linkedin.svg"}
                                width={14}
                                height={9}
                                className="m-2"
                            />
                        </div>
                        <div
                            className={`mt-4 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                twitterFocus
                                    ? "border-primary-70"
                                    : "border-my-gray-70"
                            }`}
                        >
                            <input
                                onFocus={() => setTwitterFocus(true)}
                                onBlur={() => setTwitterFocus(false)}
                                className="form-input-with-icon peer"
                                type={"text"}
                                placeholder="abccompany/twitter.com"
                            />
                            <Image
                                src={"/twitter.svg"}
                                width={13}
                                height={11}
                                className="m-2"
                            />
                        </div>
                        <div
                            className={`mt-4 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                facebookFocus
                                    ? "border-primary-70"
                                    : "border-my-gray-70"
                            }`}
                        >
                            <input
                                onFocus={() => setFacebookFocus(true)}
                                onBlur={() => setFacebookFocus(false)}
                                className="form-input-with-icon peer"
                                type={"text"}
                                placeholder="abccompany/facebook.com"
                            />
                            <Image
                                src={"/facebook.svg"}
                                width={8}
                                height={6}
                                className="m-2"
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
