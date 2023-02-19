import Footer from "../../components/Footer";
import RecruiterNavbar from "../../components/navbars/RecruiterNavbar";
import PrimaryBtn from "../../components/buttons/PrimaryBtn";
import Image from "next/image";
import Link from "next/link";

export default function RecruiterDashbaord() {
    return (
        <>
            <RecruiterNavbar />
            <section className="w-4/5 mx-auto my-5">
                <div className="my-16">
                    <h1 className="text-dark-50 text-3xl text-left font-zilla-slab   my-3">
                        Welcome, Jennifer!
                    </h1>
                    <p className="font-medium text-dark-50">
                        Post a job and hire talents now
                    </p>
                </div>
                <div className="flex flex-row flex-nowrap justify-between items-center my-3 mx-auto">
                    <p className="text-dark-50 font-medium">
                        Position management
                    </p>
                    <PrimaryBtn
                        text={"Post a job"}
                        path="/recruiter/job-posting/step1"
                    />
                </div>
                <div className="shadow-md my-3 p-3 rounded-10 min-h-40-screen flex flex-col justify-center items-center border border-solid border-my-gray-40">
                    <h3 className="font-semibold text-dark-50 text-center">
                        Job listings
                    </h3>
                    <p className="text-sm text-dark-50 text-center ">
                        You have not posted any jobs yet
                    </p>
                </div>
                <div className="md:grid md:grid-cols-2 gap-4">
                    <div className="shadow-md my-3 p-3 rounded-10 min-h-40-screen flex flex-col justify-center items-center border border-solid border-my-gray-40">
                        <h3 className="font-medium">Job listing credit </h3>
                        <p className="my-3">
                            <span className="text-dark-50 text-sm">Ksh</span>
                            <span className="text-4xl text-dark-50">
                                {" "}
                                0,00{" "}
                            </span>
                        </p>
                        <div className="flex flex-row flex-wrap justify-center items-center">
                            <p className="text-primary-70 border border-primary-70 border-solid hover:border-primary-60 bg-white rounded-lg py-1 px-4 m-2 cursor-pointer">
                                Add Credits
                            </p>
                            <p className="text-primary-70 border border-primary-70 border-solid hover:border-primary-60 bg-white rounded-lg py-1 px-4 m-2 cursor-pointer">
                                Credit history
                            </p>
                        </div>
                    </div>
                    <div className="shadow-md my-3 p-3 rounded-10 min-h-40-screen flex flex-col justify-center items-center border border-solid border-my-gray-40">
                        <h3 className="font-medium text-center">
                            Unread messages (0)
                        </h3>
                        <Image
                            src={"/message-icon.svg"}
                            width={60}
                            height={50}
                            className="my-3 p-2"
                        />
                        <p className="text-sm text-center">
                            You have no messages
                        </p>
                    </div>
                </div>
                <p className="text-dark-50 font-medium my-3">
                    Applicants management
                </p>
                <div className="md:grid md:grid-cols-4 gap-4">
                    <Link
                        href={"/recruiter/progress-card"}
                        className="col-span-2 shadow-md my-3 p-3 rounded-10 min-h-40-screen flex flex-col justify-center items-center border border-solid border-my-gray-40 hover:border hover:border-primary-40"
                    >
                        <h3 className="font-medium flex flex-row flex-nowrap justify-center items-center">
                            <span>Progress card</span>
                            <Image
                                src={"/progress-card-icon.svg"}
                                width={24}
                                height={24}
                                className=" p-1 m-1"
                            />
                        </h3>
                        <p className="my-3 text-xs text-dark-50 text-center">
                            one-sentence description about the progress card
                        </p>
                    </Link>

                    <div className="col-span-1 shadow-md my-3 p-3 rounded-10 min-h-40-screen flex flex-col justify-center items-center border border-solid border-my-gray-40">
                        <h3 className="font-medium text-center">
                            Upcoming interview
                        </h3>
                        <p className="text-4xl text-dark-50 my-5">0</p>
                        <p className="text-sm text-center flex flex-row justify-center items-center">
                            <span className="underline text-dark-50">
                                Click to see
                            </span>
                            <Image
                                src={"/next-icon.svg"}
                                width={7}
                                height={15}
                                className="m-2"
                            />
                        </p>
                    </div>
                    <div className="col-span-1 shadow-md my-3 p-3 rounded-10 min-h-40-screen flex flex-col justify-center items-center border border-solid border-my-gray-40">
                        <h3 className="font-medium text-center">
                            Waiting to confirm
                        </h3>
                        <p className="text-4xl text-dark-50 my-5">0</p>
                        <p className="text-sm text-center flex flex-row justify-center items-center">
                            <span className="underline text-dark-50">
                                Click to see
                            </span>
                            <Image
                                src={"/next-icon.svg"}
                                width={7}
                                height={15}
                                className="m-2"
                            />
                        </p>
                    </div>
                </div>
                <div className="md:grid md:grid-cols-2 shadow-md my-3 p-4 rounded-10 min-h-20-screen flex border border-solid border-my-gray-40">
                    <div>
                        <p className="text-sm left ">
                            Advertise your jobs in your social networks
                        </p>
                        <div className="border border-solid border-my-gray-70 my-3 px-4 py-2 rounded-md flex flex-row flex-nowrap justify-between items-center">
                            <span className="text-my-gray-70 text-xs">
                                https://www.ledja.co.ke/employer/sign-up?ref=064d8569
                            </span>
                            <span className="text-primary-70 text-sm cursor-pointer">
                                Copy link
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-center ">
                            Share your jobs on your social networks
                        </p>
                        <div className="flex flex-row flex-nowrap justify-center items-center my-3">
                            <Image
                                src={"/filled-fb-icon.svg"}
                                width={18}
                                height={20}
                                className="m-2"
                            />
                            <Image
                                src={"/filled-linkedin-icon.svg"}
                                width={16}
                                height={18}
                                className="m-2"
                            />
                            <Image
                                src={"/filled-telegram-icon.svg"}
                                width={18}
                                height={20}
                                className="m-2"
                            />
                            <Image
                                src={"/twitter.svg"}
                                width={18}
                                height={16}
                                className="m-2"
                            />
                            <Image
                                src={"/whatsapp-icon.svg"}
                                width={16}
                                height={17}
                                className="m-2"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
