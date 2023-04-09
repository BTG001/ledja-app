import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import Config from "../../Config";
import JobsRow from "./jobRow";

export default function JobsTable({ jobs }) {
    return (
        <>
            <div className="w-full">
                <div className="grid grid-cols-8 gap-1 w-full p-2 items-center justify-center">
                    <div className="col-span-2 font-semibold text-left">
                        Job title
                    </div>
                    <div className="col-span-4 md:col-span-5 font-semibold text-center w-full">
                        Candidates
                    </div>

                    {/* <div className="col-span-2 font-semibold text-center">
                        Job credit status
                    </div> */}
                    <div className="col-span-2 md:col-span-1 font-semibold text-center">
                        Job status
                    </div>
                </div>

                {jobs.map((job, index) => {
                    return <JobsRow job={job} key={index} />;
                })}
            </div>
        </>
    );
}
