import LogoNavbar from "../components/navbars/LogoNavbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import UserRequests from "../requests/UserRequets";

export default function login() {
    const router = useRouter();
    const loginForm = useRef();

    const onLoginSubmit = async (e) => {
        const loginFormData = new FormData(loginForm.current);
        e.preventDefault();

        const loginResults = await UserRequests.login(loginFormData);

        console.log("login: ", loginResults);

        // const userResults = await UserRequests.getOneUser(2);

        // console.log(userResults);

        // for (const [key, value] of loginFormData) {
        //     console.log(key, ": ", value);
        // }
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
                <h3 className="form-title">Login to LEDJA</h3>
                <form className="form" ref={loginForm} onSubmit={onLoginSubmit}>
                    <div className="form-input-container">
                        <label className="form-label" for="email">
                            Email Address
                        </label>
                        <input
                            className="form-input"
                            type={"email"}
                            name="email"
                            value="testuser1@gmail.com"
                            placeholder="email@example.com"
                            required
                        />
                    </div>

                    <div className="form-input-container" required>
                        <label className="form-label" for="password">
                            Password
                        </label>
                        <input
                            className="form-input"
                            type={"password"}
                            name="password"
                            placeholder="6 characters minimum"
                            required
                            value={"secret"}
                        />
                    </div>

                    <input
                        className="submit-btn"
                        type={"submit"}
                        value="Login"
                    />
                </form>
                <p className="text-center">
                    <span className="text-sm text-dark-50 mr-4">
                        Dont have an account?
                    </span>
                    <Link href="/signup" className="text-sm text-primary-70">
                        Sign up
                    </Link>
                </p>
            </div>
            <Footer />
        </>
    );
}
