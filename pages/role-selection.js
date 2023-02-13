import PrimaryBtn from "../components/buttons/PrimaryBtn";
import LogoNavbar from "../components/navbars/LogoNavbar";
import Footer from "../components/Footer";
export default function RoleSelection() {
    return (
        <>
            <LogoNavbar />

            <div className="w-3/4 mx-auto my-32">
                <h3 className="text-xl font-medium text-center">
                    Please tell us your role
                </h3>
                <p className="text-center mt-5 mb-7">
                    Are you looking for a job or are you recruiting people?
                </p>
                <div className="flex flex-row flex-nowrap justify-center items-center mt-7 ">
                    <PrimaryBtn
                        className="mr-3"
                        text="I'm a job seeker"
                        path="/signup"
                        data={{ role: "job-seeker" }}
                    />
                    <PrimaryBtn
                        className="ml-3"
                        text="I'm a recruiter"
                        path="/signup"
                        data={{ role: "recruiter" }}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}
