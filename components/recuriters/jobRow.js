import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import Config from "../../Config";
import DashboardJobRowLoaderSkeleton from "../skeleton-loaders/job-row-skeleton-loader";
import axios from "axios";
import Utils from "../../Utils";
import LeftCaretSelect from "../LeftCaretSelect";

export default function JobsRow({ job }) {
    const [statsLoading, setStatsLoading] = useState(true);
    const [stats, setStats] = useState({});
    const [jobStatus, setJobStatus] = useState(job.job_status);
    let loadedOnce = false;

    useEffect(() => {
        if (!loadedOnce) {
            getJobStats();
            calculateAssessmentScores();
            loadedOnce = true;
        }
    }, []);

    async function getJobStats(jobId) {
        // const userId = localStorage.getItem("user_id");
        const url = `${Config.API_URL}/get_active_applications/${job.id}`;

        try {
            let thestats = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            thestats = thestats.data.data;

            setStats(thestats);
            setStatsLoading(false);

            console.log("stats : ", job.id, thestats);
        } catch (error) {
            setStatsLoading(false);
            console.log("get stats error: ", job.id, error);
        }
    }

    async function calculateAssessmentScores() {
        if (!job.skills_assessment_id) {
            return;
        }

        try {
            const scoresCalculation = await axios.get(
                `${Config.API_URL}/calculate_scores/${job.skills_assessment_id}`,
                {
                    headers: Utils.getHeaders(),
                }
            );

            console.log(
                "scores calculation results: ",
                job.skills_assessment_id,
                ":- ",
                scoresCalculation
            );
        } catch (error) {
            console.log("score calculation error: ", job.id, error);
        }
    }

    const updateStatus = (status) => {
        if (!status) {
            status = "draft";
        }

        console.log("status: ", status);

        const statusFormData = new FormData();
        statusFormData.append("job_status", status);

        setJobStatus(status);

        Utils.makeRequest(async () => {
            try {
                const statusURL = `${Config.API_URL}/jobs/${job.id}`;

                let updateStatusResults = await Utils.putForm(
                    statusURL,
                    statusFormData
                );

                updateStatusResults = updateStatusResults.data.data;

                setJobStatus(updateStatusResults.job_status);

                console.log("update status results: ", updateStatusResults);
            } catch (error) {
                console.log("updateStatus: ", error);
            }
        });
    };

    return (
        <>
            {statsLoading && <DashboardJobRowLoaderSkeleton />}
            {!statsLoading && (
                <div className="grid grid-cols-8 gap-1 w-full p-2 items-center justify-center">
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
                        <p>{stats.no_of_active_candidates} active </p>
                        <p>
                            {stats.no_of_active_candidates == 1
                                ? "candidate"
                                : "candidates"}
                        </p>
                    </div>

                    <div className="col-span-2 md:col-span-3 grid grid-cols-1 grid-rows-4 md:grid-rows-1 md:grid-cols-4">
                        <div className="text-my-dark-50 text-xs text-center">
                            <p>{stats.no_of_awaiting_candidates}</p>
                            <p>awaiting</p>
                        </div>
                        <div className="text-my-dark-50 text-xs text-center">
                            <p>{stats.no_of_reviewed_candidates}</p>
                            <p>reviewed</p>
                        </div>
                        <div className="text-my-dark-50 text-xs text-center">
                            <p>{stats.no_of_contacting_candidates}</p>
                            <p>contacting</p>
                        </div>

                        <div className="text-my-dark-50 text-xs text-center">
                            <p>{stats.no_of_hired_candidates}</p>
                            <p>hired</p>
                        </div>
                    </div>
                    {/* <div className="col-span-2 text-center text-xs text-dark-50">
                                <p>10000</p>
                                <p>KSh</p>
                            </div> */}
                    <div className="col-span-2 md:col-span-1 text-center flex flex-row flex-nowrap justify-center items-center">
                        {/* <p className="text-primary-70 px-2 py-1 text-sm border border-primary-70 border-solid flex flex-row flex-nowrap justify-center items-center rounded-lg cursor-pointer">
                            <FaAngleDown className="text-primary-70 mr-1 " />
                            <span>Active</span>
                        </p> */}

                        <LeftCaretSelect
                            onChangeActiveValue={updateStatus}
                            value={jobStatus}
                            placeholder={"draft"}
                            options={["active", "closed"]}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
