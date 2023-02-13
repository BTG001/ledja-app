import GuestNavbar from "../components/navbars/GuestNavbar";
import Image from "next/image";
import PrimaryBtn from "../components/buttons/PrimaryBtn";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <>
            <GuestNavbar />
            <div className="w-full h-80-screen relative">
                <Image
                    className="object-cover max-w-full min-h-full max-h-full z-0 absolute"
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
                            path="/signup"
                        />
                        <PrimaryBtn
                            className="ml-3"
                            text="I'm a recruiter"
                            path="/signup"
                        />
                    </div>
                </div>
                <div className="min-h-full min-w-full bg-white z-10 absolute opacity-60"></div>
            </div>
            <div className="w-full flex flex-row flex-wrap-reverse justify-between items-center md:w-4/5 m-auto p-4">
                <div className="flex flex-col md:w-1/2 justify-center items-center flex-nowrap">
                    <h3 className="font-medium text-2xl mb-3 w-full">
                        What LEDJA offers?
                    </h3>
                    <article>
                        <p>
                            LEDJA aims to connect African talents with companies
                            around the world with all commited services:
                        </p>
                        <ul className="list-disc list-inside mt-4">
                            <li>
                                Connect you with real job opportunities and
                                applicants
                            </li>
                            <li>
                                Speed-up the job-searching and recruiting
                                process
                            </li>
                            <li>
                                Offer valid trust through LEDJA’s
                                authentification system
                            </li>
                        </ul>
                    </article>
                </div>
                <div className="w-full flex justify-center items-center md:w-1/3 ">
                    <Image
                        className="object-contain  p-5"
                        src="/connected-world-amico.png"
                        width={384}
                        height={384}
                    />
                </div>
            </div>
            <div className="flex flex-col flex-nowrap justify-center items-center text-center w-3/4 m-auto my-32">
                <h3 className="font-medium">
                    “The unique report card provided by LEDJA significantly
                    speed up my CV screening <br /> speed, and connect fabulous
                    applicants with my company”
                </h3>
                <Image
                    className="my-5"
                    src={"/jennifer.jpg"}
                    width={80}
                    height={80}
                />
                <p className="text-sm">
                    Jennifer Musugu, Recruiting Specialist
                </p>
            </div>
            <div className="flex flex-col justify-center items-center w-3/4 m-auto">
                <h3 className="font-medium text-2xl text-center w-full">
                    Why LEDJA stands out?
                </h3>
                <p className="text-sm text-center w-full my-3 ">
                    Take a look at LEDJA’s unique and competitive services
                </p>
                <div className="grid grid-rows-3 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-2">
                    <div className=" m-2 pt-16 shadow-lg rounded-lg">
                        <div className="flex justify-center items-center bg-primary-60 w-full h-28 ">
                            <Image
                                src={"/send.svg"}
                                width={73}
                                height={63}
                                className="py-2 px-3"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="font-semibold text-lg">BASIC</h3>
                            <p className="text-xs">Free</p>
                            <h3 className="font-normal font-zilla-slab text-2xl mt-3 mb-5">
                                KSh 0
                            </h3>
                            <ul className="list-disc list-inside text-xs">
                                <li>Email blast subscribers</li>
                                <li>Highlight your ads</li>
                                <li>Pinned for 7 days</li>
                                <li>
                                    Extend to partner network (15k+ talents)
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className=" m-2 pt-16 shadow-lg rounded-lg">
                        <div className="flex justify-center items-center bg-primary-60 w-full h-28 ">
                            <Image
                                src={"/flight.svg"}
                                width={73}
                                height={63}
                                className="py-2 px-3"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="font-semibold text-lg">STANDARD</h3>
                            <p className="text-xs">Everything from Basic</p>
                            <h3 className="font-normal font-zilla-slab text-2xl mt-3 mb-5">
                                KSh 99
                            </h3>
                            <ul className="list-disc list-inside text-xs">
                                <li>Display company logo</li>
                                <li>Share on social media</li>
                                <li>Share on Slack channel</li>
                                <li>30 days listing</li>
                            </ul>
                        </div>
                    </div>
                    <div className=" m-2 pt-16 shadow-lg rounded-lg">
                        <div className="flex justify-center items-center bg-primary-60 w-full h-28 ">
                            <Image
                                src={"/rocket.svg"}
                                width={73}
                                height={63}
                                className="py-2 px-3"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="font-semibold text-lg">PREMIUM</h3>
                            <p className="text-xs">Everything from Standard</p>
                            <h3 className="font-normal font-zilla-slab text-2xl mt-3 mb-5">
                                KSh 199
                            </h3>
                            <ul className="list-disc list-inside text-xs">
                                <li>Email blast subscribers</li>
                                <li>Highlight your ads</li>
                                <li>Pinned for 7 days</li>
                                <li>
                                    Extend to partner network (15k+ talents)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-3/4 my-10 mx-auto  p-5">
                <h3 className="w-full font-medium text-2xl text-center my-5">
                    Trusted by the world’s best companies
                </h3>
                <div className="flex flex-row flex-nowrap justify-center items-center">
                    <Image
                        className="m-3 p-2"
                        src={"/eden.png"}
                        width={76}
                        height={48}
                    />
                    <Image
                        className="m-3 p-2"
                        src={"/lykdat.png"}
                        width={159}
                        height={52}
                    />
                    <Image
                        className="m-3 p-2"
                        src={"/corna.png"}
                        width={60}
                        height={60}
                    />
                    <Image
                        className="m-3 p-2"
                        src={"/iohubs.png"}
                        width={142}
                        height={40}
                    />
                </div>
            </div>
            <div className="w-3/4 my-3 mx-auto">
                <h2 className="font-medium text-2xl text-center">
                    Explore Now!
                </h2>
                <p className="text-sm text-center mt-4 mb-12">
                    Don’t lose your chance to find jobs or connect with talents
                    now!
                </p>
                <p className="flex flex-row nowrap w-full justify-center items-center mb-8">
                    <span className="m-3 md:mr-8 p-2 font-medium  text-center border-b-4 border-solid border-black">
                        Find Jobs
                    </span>
                    <span className="m-3 md:ml-8 p-2 font-normal text-center">
                        Find Talents
                    </span>
                </p>

                <div className="w-3/4 my-3 mx-auto">
                    <div className="grid grid-cols-4 mb-10 gap-2 items-center">
                        <Image
                            className="col-span-1"
                            src={"/job-1.png"}
                            width={120}
                            height={120}
                        />
                        <div className="col-span-3 flex flex-col flex-nowrap justify-start items-start">
                            <h2 className="font-semibold text-lg mb-4">
                                Front-end Developer
                            </h2>
                            <p>
                                amazee.io is looking for front-end developer who
                                will work with the UI team to implement design
                                system, future iterations, and a set of
                                components on our...
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 mb-10 gap-2 items-center">
                        <Image
                            className="col-span-1"
                            src={"/job-2.png"}
                            width={120}
                            height={120}
                        />
                        <div className="col-span-3 flex flex-col flex-nowrap justify-start items-start">
                            <h2 className="font-semibold text-lg mb-4">
                                Product Designer
                            </h2>
                            <p>
                                We are seeking a talented and passionate Product
                                Designer to join our team to be responsible for
                                driving user experience across our new mobile
                                app and other dig...
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 mb-10 gap-2  items-center">
                        <Image
                            className="col-span-1"
                            src={"/job-3.png"}
                            width={120}
                            height={120}
                        />
                        <div className="col-span-3 flex flex-col flex-nowrap justify-start items-start">
                            <h2 className="font-semibold text-lg mb-4">
                                Experienced SEO Generalist
                            </h2>
                            <p>
                                We’re looking for someone well-rounded, who can
                                optimize processes, identify opportunities, and
                                prevent issues in all 4 main areas of SEO:
                                on-page, off-page...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-3/4 mx-auto py-10 flex justify-center items-center">
                <PrimaryBtn
                    text={"Sign up to see more"}
                    path="/role-selection"
                />
            </div>

            <Footer />
        </>
    );
}
