import { FaAngleDown } from "react-icons/fa";
import Config from "../../Config";
export default function JobsTable({ jobs }) {
    return (
        <>
            <div>
                <div className="grid grid-cols-12 gap-1 w-full p-2 items-center justify-center">
                    <div className="col-span-2 font-semibold text-left">
                        Job title
                    </div>
                    <div className="col-span-2 font-semibold text-center">
                        Candidates
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className="col-span-2 font-semibold text-center">
                        Job credit status
                    </div>
                    <div className="col-span-2 font-semibold text-center">
                        Job status
                    </div>
                </div>

                {jobs.map((job) => {
                    return (
                        <div className="grid grid-cols-12 gap-1 w-full p-2 items-center justify-center">
                            <div className="col-span-2 font-semibold text-left text-sm">
                                <p>{job.title}</p>
                                <p className="text-my-gray-70 text-xs">
                                    {job.location}
                                </p>
                                <p className="text-my-gray-70 text-xs">
                                    created:{" "}
                                    {
                                        Config.MONTH_NAMES[
                                            new Date(job.created_at).getMonth()
                                        ]
                                    }{" "}
                                    {new Date(job.created_at).getDate()}
                                    {", "}
                                    {new Date(job.created_at).getFullYear()}
                                </p>
                            </div>
                            <div className="col-span-2 font-semibold text-center text-sm">
                                <p>5 active </p>
                                <p>candidates</p>
                            </div>
                            <div className="text-my-dark-50 text-xs text-center">
                                <p>0</p>
                                <p>awaiting</p>
                            </div>
                            <div className="text-my-dark-50 text-xs text-center">
                                <p>0</p>
                                <p>reviewed</p>
                            </div>
                            <div className="text-my-dark-50 text-xs text-center">
                                <p>0</p>
                                <p>contacting</p>
                            </div>
                            <div className="text-my-dark-50 text-xs text-center">
                                <p>0</p>
                                <p>hired</p>
                            </div>
                            <div className="col-span-2 text-center text-xs text-dark-50">
                                <p>10000</p>
                                <p>KSh</p>
                            </div>
                            <div className="col-span-2 text-center flex flex-row flex-nowrap justify-center items-center">
                                <p className="text-primary-70 px-5 py-1 text-sm border border-primary-70 border-solid flex flex-row flex-nowrap justify-center items-center rounded-lg cursor-pointer">
                                    <FaAngleDown className="text-primary-70 mr-1 " />
                                    <span>Active</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
