import GuestNavbar from "../components/navbars/GuestNavbar";
import Image from "next/image";
import PrimaryBtn from "../components/buttons/PrimaryBtn";

export default function Home() {
    return (
        <div className="w-screen">
            <GuestNavbar />
            <div className="w-full h-80-screen relative">
                <Image
                    className="object-cover max-w-full max-h-full z-0 absolute"
                    src={"/hero-image.jpg"}
                    width={1440}
                    height={650}
                />
                <div className="w-full h-full flex flex-col flex-nowrap justify-center items-center z-20 absolute ">
                    <h1 className="text-center text-dark-60 text-5xl font-normal font-zilla-slab mb-6">
                        Make Job Hunting Easy
                    </h1>

                    <h5 className=" text-md text-center leading-6">
                        Are you frustrated by applying and <br /> recruiting?
                        LEDJA makes it easy for you
                    </h5>
                    <div className="flex flex-row flex-nowrap justify-center items-center mt-7 ">
                        <PrimaryBtn
                            className="mr-3"
                            text="I'm a job seeker"
                            path="/register"
                        />
                        <PrimaryBtn
                            className="ml-3"
                            text="I'm a recruiter"
                            path="/register"
                        />
                    </div>
                </div>
                <div className="min-h-full min-w-full bg-white z-10 absolute opacity-60"></div>
            </div>
        </div>
    );
}
