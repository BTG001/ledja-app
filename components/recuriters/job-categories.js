export default function JobCategories({
    jobCategory,
    onChangeJobCategory,
    showTitle = true,
}) {
    return (
        <>
            {showTitle && (
                <h3 className="font-medium text-xl mb-5">
                    Please select the type of job you want to post
                </h3>
            )}
            <div className="md:grid md:grid-cols-3 mb-10">
                <div
                    onClick={() => onChangeJobCategory("basic")}
                    className={`flex flex-col justify-center items-center border border-solid border-primary-70 py-2 px-8 m-4 rounded-10 cursor-pointer 
                        ${
                            jobCategory === "basic"
                                ? "bg-primary-60 text-white"
                                : " bg-white text-primary-70"
                        }`}
                >
                    <p className=" text-xl text-center text-inherits">
                        BASIC JOB
                    </p>
                    <p className="text-sm  text-center text-inherit">
                        Access to non-assessed list of applicants to interview
                        KSh 5,000
                    </p>
                </div>
                <div
                    onClick={() => onChangeJobCategory("standard")}
                    className={`flex flex-col justify-center items-center border border-solid border-primary-70   py-2 px-8 m-4 rounded-10 cursor-pointer
                    ${
                        jobCategory === "standard"
                            ? "bg-primary-60 text-white"
                            : " bg-white text-primary-70"
                    }`}
                >
                    <p className=" text-xl text-center text-inherit">
                        STANDARD JOB
                    </p>
                    <p className="text-sm text-center text-inherit">
                        Access to shortlist of applicants to interview KSh
                        11,000
                    </p>
                </div>
                <div
                    onClick={() => onChangeJobCategory("premium")}
                    className={`flex flex-col justify-center items-center border border-solid border-primary-70   py-2 px-8 m-4 rounded-10 cursor-pointer
                    ${
                        jobCategory === "premium"
                            ? "bg-primary-60 text-white"
                            : " bg-white text-primary-70"
                    }`}
                >
                    <p className="text-inherit text-xl text-center">
                        PREMIUM JOB
                    </p>
                    <p className="text-sm text-inherit text-center">
                        Curated list of 10 selected candidates to interview KSh
                        20,000
                    </p>
                </div>
            </div>
        </>
    );
}
