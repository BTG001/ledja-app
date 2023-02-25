import LogoNavbar from "../components/navbars/LogoNavbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Config from "../Config";
import axios from "axios";

export default function login() {
    const router = useRouter();

    const signupForm = useRef();

    const { role } = router.query;

    useEffect(() => {
        if (!role) {
            router.back();
        }
    }, []);

    const afterSubmit = async (e) => {
        e.preventDefault();

        let userTypeID = Config.JOB_SEEKER_USER_TYPE_ID;

        if (role == "recruiter") {
            userTypeID = Config.RECRUITER_USER_TYPE_ID;
        }

        const signupFormData = new FormData(signupForm.current);
        signupFormData.append("user_type_id", userTypeID);

        // for (const [key, value] of signupFormData) {
        //     console.log(key, ": ", value);
        // }

        const results = await axios.postForm(
            `${Config.BASE_URL}/register`,
            signupFormData
        );

        if (results.success) {
            if (role == "recruiter") {
                router.push("/recruiter/profile-setup/step1");
            } else {
                router.push("/job-seeker/profile-setup/step1");
            }
        }
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
                <h3 className="form-title">Create your account</h3>
                <form className="form" onSubmit={afterSubmit} ref={signupForm}>
                    <div className="form-input-container">
                        <label className="form-label" for="email">
                            Email Address
                        </label>
                        <input
                            className="form-input"
                            type={"email"}
                            placeholder="email@example.com"
                            name="email"
                            // value={"testuser2@gmail.com"}
                            required
                        />
                    </div>

                    <div className="form-input-container">
                        <label className="form-label" for="password">
                            Password
                        </label>
                        <input
                            className="form-input"
                            type={"password"}
                            placeholder="6 characters minimum"
                            name="password"
                            value={"secret"}
                            required
                        />
                    </div>
                    <div className="form-input-container">
                        <label className="form-label" for="password">
                            Confirm Password
                        </label>
                        <input
                            className="form-input"
                            type={"password"}
                            placeholder="Password should match"
                            name="c_password"
                            value="secret"
                            required
                        />
                    </div>

                    <div className="form-input-container mb-8">
                        <input type={"checkbox"} required />{" "}
                        <p className="text-xs inline">
                            <span>By signing up, I agree to the</span>{" "}
                            <Link href={"/terms"} className="underline">
                                Terms of Service and Privacy Policy
                            </Link>
                        </p>
                    </div>

                    <input
                        className="submit-btn"
                        type={"submit"}
                        value="Sign up"
                    />
                </form>
                <p className="text-center">
                    <span className="text-sm text-dark-50 mr-4">
                        Already have an account?
                    </span>
                    <Link href="/login" className="text-sm text-primary-70">
                        login
                    </Link>
                </p>
            </div>
            <Footer />
        </>
    );
}
