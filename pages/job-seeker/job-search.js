import JobSeekerNavbar from "../../components/navbars/JobSeekerNavbar";
import Footer from "../../components/Footer";
import LeftCaretSelect from "../../components/LeftCaretSelect";
import LeftIconLocationInput from "../../components/navbars/LeftIconLocationInput";
import LeftIconSearch from "../../components/LeftIconSearch";
import Image from "next/image";
import ApplyPopup from "../../components/job-seekers/apply-popup";
import { useEffect, useState } from "react";
import ApplySuccessPopup from "../../components/job-seekers/apply-success-popup";
import Config from "../../Config";
import Utils from "../../Utils";
import axios from "axios";

export default function JobSearch() {
    const [showApplyPopup, setShowApplyPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const onApply = (e) => {
        e.preventDefault();
        setShowApplyPopup(true);
    };

    async function fetchJobs(url) {
        if (!url) {
            url = `${Config.API_URL}/jobs`;
        }

        try {
            let theJobs = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            theJobs = theJobs.data.data;

            setJobs(theJobs);

            console.log("user Jobs: ", theJobs);
        } catch (error) {
            console.log("user Jobs request error: ", error);
        }
    }

    const onCloseApplyPopup = () => {
        setShowApplyPopup(false);
    };

    const onSuccessfullApplication = () => {
        setShowApplyPopup(false);
        setShowSuccessPopup(true);
    };

    const onCloseSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    return (
        <>
            <JobSeekerNavbar active="job-search" />

            <div className="w-4/5 mx-auto my-5">
                <div className="flex flex-row flex-wrap justify-start items-start ">
                    <div>
                        <div className="md:grid grid-cols-2 items-start justify-start gap-4">
                            <LeftIconSearch
                                placeholder={"Job title or keyword"}
                            />
                            <LeftIconLocationInput placeholder={"Location"} />
                        </div>

                        <div className="flex flex-row flex-wrap justify-start items-center">
                            <LeftCaretSelect placeholder={"Date posted"} />
                            <LeftCaretSelect placeholder={"Location"} />
                            <LeftCaretSelect placeholder={"Salary"} />
                            <LeftCaretSelect placeholder={"Job type"} />
                            <LeftCaretSelect placeholder={"Experience level"} />
                            <LeftCaretSelect placeholder={"Other"} />
                        </div>
                    </div>

                    <p className="text-center px-4 py-1 m-2 w-max bg-primary-70 rounded-10 text-white">
                        Search
                    </p>
                </div>
            </div>
            <p className="w-full h-1-px bg-my-gray-70 mt-5 mb-8"></p>
            <div className="w-4/5 mx-auto my-5">
                <p className="text-dark-50">Recently posted jobs</p>
                <div className="grid grid-cols-5 border border-solid border-my-gray-70 min-h-40-screen rounded-sm mb-16">
                    <sidebar className="col-span-2 h-full">
                        <div className="flex flex-row flex-nowrap justify-start items-center p-2 bg-my-gray-50  border-b border-r border-solid border-my-gray-70">
                            <Image
                                className="m-3"
                                src="/dl-logo.png"
                                width={64}
                                height={64}
                            />
                            <div>
                                <h3 className="font-medium text-xl mb-1">
                                    Software engineer
                                </h3>
                                <p className="text-sm">ABC company</p>
                                <p className="text-sm">Nairobi</p>
                            </div>
                        </div>
                        <div className="flex flex-row flex-nowrap justify-start items-center p-2   border-b border-r border-solid border-my-gray-70">
                            <Image
                                className="m-3"
                                src="/dl-logo.png"
                                width={64}
                                height={64}
                            />
                            <div>
                                <h3 className="font-medium text-xl mb-1">
                                    Software engineer
                                </h3>
                                <p className="text-sm">ABC company</p>
                                <p className="text-sm">Nairobi</p>
                            </div>
                        </div>
                        <div className="flex flex-row flex-nowrap justify-start items-center p-2   border-b border-r border-solid border-my-gray-70">
                            <Image
                                className="m-3"
                                src="/dl-logo.png"
                                width={64}
                                height={64}
                            />
                            <div>
                                <h3 className="font-medium text-xl mb-1">
                                    Software engineer
                                </h3>
                                <p className="text-sm">ABC company</p>
                                <p className="text-sm">Nairobi</p>
                            </div>
                        </div>
                        <div className="flex flex-row flex-nowrap justify-start items-center p-2   border-b border-r border-solid border-my-gray-70">
                            <Image
                                className="m-3"
                                src="/dl-logo.png"
                                width={64}
                                height={64}
                            />
                            <div>
                                <h3 className="font-medium text-xl mb-1">
                                    Software engineer
                                </h3>
                                <p className="text-sm">ABC company</p>
                                <p className="text-sm">Nairobi</p>
                            </div>
                        </div>
                        <div className="flex flex-row flex-nowrap justify-start items-center p-2 border-r border-solid border-my-gray-70 ">
                            <Image
                                className="m-3"
                                src="/dl-logo.png"
                                width={64}
                                height={64}
                            />
                            <div>
                                <h3 className="font-medium text-xl mb-1">
                                    Software engineer
                                </h3>
                                <p className="text-sm">ABC company</p>
                                <p className="text-sm">Nairobi</p>
                            </div>
                        </div>
                    </sidebar>
                    <section className="col-span-3 p-4">
                        <h3 className="font-medium text-xl">
                            Software engineer
                        </h3>
                        <p className="text-sm text-my-gray-70">ABC comapny</p>
                        <p className="text-sm text-my-gray-70 flex flex-row flex-nowrap justify-start items-center">
                            <Image
                                className="mr-3"
                                src="/map-icon.svg"
                                width={12}
                                height={15}
                            />
                            <span>Nairobi, Kenia • Remote </span>
                        </p>
                        <p className="text-sm text-my-gray-70 flex flex-row flex-nowrap justify-start items-center">
                            <Image
                                className="mr-3"
                                src="/money-icon.svg"
                                width={15}
                                height={11}
                            />
                            <span>$50,000 - $60,000 / year • Fulltime </span>
                        </p>
                        <div className="flex flex-row flex-wrap justify-start items-center my-3">
                            <p
                                className="w-max my-2 mx-4 py-2 px-5 bg-primary-70 text-white rounded-10 cursor-pointer"
                                onClick={onApply}
                            >
                                Apply
                            </p>
                            <p className="w-max my-2 mx-4 py-2 px-5 bg-white text-primary-70 border border-solid border-primary-70 hover:border-primary-60 rounded-10">
                                Save
                            </p>
                        </div>
                        <p className="text-lg">Job Description</p>
                        <p className="mt-5 mb-12">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec vehicula ac dui in feugiat. Etiam id
                            risus porttitor ligula accumsan dapibus. Ut mollis
                            vitae enim fringilla lobortis. Donec ut ipsum sed
                            felis volutpat interdum non id nulla. Nullam sit
                            amet urna non massa vestibulum pretium. <br />{" "}
                            <br /> Curabitur ac nisl vel sapien mollis maximus.
                            Etiam volutpat congue mi, ut pellentesque lectus
                            viverra vel. Quisque sollicitudin tempus augue, eu
                            efficitur tellus luctus sed.
                        </p>
                    </section>
                </div>
            </div>
            <ApplyPopup
                showPopup={showApplyPopup}
                onClose={onCloseApplyPopup}
                onSuccess={onSuccessfullApplication}
            />
            <ApplySuccessPopup
                showPopup={showSuccessPopup}
                onClose={onCloseSuccessPopup}
            />
            <Footer />
        </>
    );
}
