import { use, useEffect, useState } from "react";
import Config from "../../Config";
import Utils from "../../Utils";
import axios from "axios";
import ErrorPopup from "../errorPopup";
import JobCategoriesLoaderSkeleton from "../skeleton-loaders/job-categories-loader-skeleton";

export default function JobCategories({
    activeJobCategoryId,
    onChangeJobCategory,
    showTitle = true,
}) {
    const [jobCategories, setJobCategories] = useState();
    const [showErrorPopup, setShowErrorPopup] = useState();
    const [errorMessage, setErrorMessage] = useState(" an Error Occured");

    const [categoriesLoading, setCategoriesLoading] = useState(true);

    useEffect(() => {
        let storedJobCategories = localStorage.getItem("jobcategories");

        if (storedJobCategories) {
            setCategoriesLoading(true);
            storedJobCategories = JSON.parse(storedJobCategories);
            setJobCategories(storedJobCategories);
            setCategoriesLoading(false);
        } else {
            getJobCategories();
        }
    }, []);

    async function getJobCategories() {
        setCategoriesLoading(true);
        const url = `${Config.API_URL}/job_categories`;

        try {
            let jobCategories = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            jobCategories = jobCategories.data.data.data;

            console.log("job categories: ", jobCategories);
            setJobCategories(jobCategories);
            localStorage.setItem(
                "jobcategories",
                JSON.stringify(jobCategories)
            );
            setCategoriesLoading(false);
        } catch (error) {
            setErrorMessage("Could not resolve job categories");
            setShowErrorPopup(false);
            console.log("getting job categories error: ", error);
        }
    }
    const onClose = () => {
        setShowErrorPopup(false);
    };

    const onChangeTheJobCategory = (id) => {
        const activeCategory = jobCategories.filter((category) => {
            return category.id == id;
        });
        console.log("active category: ", activeCategory);
        localStorage.setItem(
            "active_job_category_cost",
            activeCategory[0].cost
        );
        onChangeJobCategory(id);
    };
    return (
        <>
            <ErrorPopup
                showPopup={showErrorPopup}
                onClose={onClose}
                message={errorMessage}
            />
            {showTitle && (
                <h3 className="font-medium text-xl mb-5">
                    Please select the type of job you want to post
                </h3>
            )}
            <div className="md:grid md:grid-cols-3 mb-10">
                {!jobCategories && !categoriesLoading && (
                    <p className="text-center w-full text-red-500 border border-solid border-red-500 rounded-lg">
                        No Job Categories!
                    </p>
                )}
                {categoriesLoading && <JobCategoriesLoaderSkeleton />}
                {jobCategories &&
                    !categoriesLoading &&
                    jobCategories.map((jobCategory, index) => {
                        if (!activeJobCategoryId) {
                            onChangeTheJobCategory(2);
                        }
                        return (
                            <div
                                key={index}
                                onClick={() =>
                                    onChangeTheJobCategory(jobCategory.id)
                                }
                                className={`flex flex-col justify-center items-center border border-solid border-primary-70 py-2 px-8 m-4 rounded-10 cursor-pointer 
                        ${
                            activeJobCategoryId === jobCategory.id
                                ? "bg-primary-60 text-white"
                                : " bg-white text-primary-70"
                        }`}
                            >
                                <p className=" text-xl text-center text-inherits capitalize">
                                    {jobCategory.type}
                                </p>
                                <p className="text-sm  text-center text-inherit">
                                    {/* Access to non-assessed list of applicants to
                                interview KSh 5,000 */}
                                    KSh {jobCategory.cost}
                                </p>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
