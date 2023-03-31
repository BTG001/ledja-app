export default function SearchJobsJobsSkeletonLoader() {
    return (
        <>
            <p className="text-dark-50 py-3">Recently posted jobs</p>
            <div className="md:grid md:grid-cols-5 border-b border-x border-t  border-solid border-my-gray-70 min-h-40-screen rounded-sm mb-16">
                <sidebar className="col-span-2 h-full flex flex-row flex-nowrap overflow-x-auto md:block p-2 md:p-0">
                    <div
                        className={` w-full cursor-pointer flex flex-row flex-nowrap justify-start items-center p-2  md:border-b border-solid border-my-gray-70
                                `}
                    >
                        <p className="flex justify-center items-center row-span-3 p-2 w-32 h-24 skeleton-loading"></p>
                        <div className="w-full p-2">
                            <h3 className="mb-1 p-2 w-full h-8 skeleton-loading"></h3>
                            <p className="mb-1 w-3/4 h-4 skeleton-loading"></p>
                            <p className="text-sm w-1/2 h-4 skeleton-loading"></p>
                        </div>
                    </div>
                    <div
                        className={` w-full cursor-pointer flex flex-row flex-nowrap justify-start items-center p-2  md:border-b border-solid border-my-gray-70
                                `}
                    >
                        <p className="flex justify-center items-center row-span-3 p-2 w-32 h-24 skeleton-loading"></p>
                        <div className="w-full p-2">
                            <h3 className="mb-1 p-2 w-full h-8 skeleton-loading"></h3>
                            <p className="mb-1 w-3/4 h-4 skeleton-loading"></p>
                            <p className="text-sm w-1/2 h-4 skeleton-loading"></p>
                        </div>
                    </div>
                </sidebar>
                <section className="w-full col-span-3 p-4 md:border-l border-t md:border-t-0 border-my-gray-70 border-solid">
                    <h3 className="w-72 h-10 my-1 skeleton-loading "></h3>
                    <p className="w-48 h-6 my-1 skeleton-loading"></p>
                    <p className="w-60 h-6 my-1 skeleton-loading"></p>
                    <div className="flex flex-row flex-wrap justify-start items-center my-3">
                        <p className=" my-2 mr-4 py-2 px-5 bg-primary-70 text-white rounded-10 cursor-pointer w-20 h-10 skeleton-loading"></p>
                        <p className="my-2 mr-4 py-2 px-5  rounded-10 w-20 h-10 skeleton-loading"></p>
                    </div>
                    <p className="text-lg">Job Description</p>
                    <p className="mt-5 mb-12 w-5/6 h-32 skeleton-loading"></p>
                </section>
            </div>
        </>
    );
}
