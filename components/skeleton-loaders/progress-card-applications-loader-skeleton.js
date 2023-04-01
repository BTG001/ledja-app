export default function ProgressCardApplicationsLoaderSkeleton() {
    return (
        <div className="md:grid md:grid-cols-3 gap-4 mt-5 mb-16">
            <sidebar className="flex flex-row flex-nowrap overflow-x-auto md:block cursor-grab">
                <div
                    className={`w-full p-3 md:mx-auto my-3 mx-1 min-w-60-screen sm:min-w-40-screen md:min-w-10-screen  border border-my-gray-50 border-solid rounded-10  `}
                >
                    <div className="flex flex-row flex-nowrap justify-between items-center">
                        <h3 className="font-semibold text-xl my-1 h-6 w-full skeleton-loading"></h3>
                        <h3 className="flex flex-row flex-nowrap justify-center items-center w-full">
                            <span className="font-semibold text-xl m-1 w-6 h-6 skeleton-loading"></span>
                            <span className="font-semibold text-xl m-1 w-6 h-6 skeleton-loading"></span>
                        </h3>
                    </div>
                    <p className="text-dark-50 flex flex-row flex-nowrap justify-start items-center w-1/3 h-4 skeleton-loading"></p>
                    <p className="text-my-gray-80 mt-2 mb-1 w-3/5 h-4 skeleton-loading"></p>
                </div>
                <div
                    className={`w-full p-3 md:mx-auto my-3 mx-1 min-w-60-screen sm:min-w-40-screen md:min-w-10-screen  border border-my-gray-50 border-solid rounded-10  `}
                >
                    <div className="flex flex-row flex-nowrap justify-between items-center">
                        <h3 className="font-semibold text-xl my-1 h-6 w-full skeleton-loading"></h3>
                        <h3 className="flex flex-row flex-nowrap justify-center items-center w-full">
                            <span className="font-semibold text-xl m-1 w-6 h-6 skeleton-loading"></span>
                            <span className="font-semibold text-xl m-1 w-6 h-6 skeleton-loading"></span>
                        </h3>
                    </div>
                    <p className="text-dark-50 flex flex-row flex-nowrap justify-start items-center w-1/3 h-4 skeleton-loading"></p>
                    <p className="text-my-gray-80 mt-2 mb-1 w-3/5h-4 skeleton-loading"></p>
                </div>
                <div
                    className={`w-full p-3 md:mx-auto my-3 mx-1 min-w-60-screen sm:min-w-40-screen md:min-w-10-screen  border border-my-gray-50 border-solid rounded-10  `}
                >
                    <div className="flex flex-row flex-nowrap justify-between items-center">
                        <h3 className="font-semibold text-xl my-1 h-6 w-full skeleton-loading"></h3>
                        <h3 className="flex flex-row flex-nowrap justify-center items-center w-full">
                            <span className="font-semibold text-xl m-1 w-6 h-6 skeleton-loading"></span>
                            <span className="font-semibold text-xl m-1 w-6 h-6 skeleton-loading"></span>
                        </h3>
                    </div>
                    <p className="text-dark-50 flex flex-row flex-nowrap justify-start items-center w-1/3 h-4 skeleton-loading"></p>
                    <p className="text-my-gray-80 mt-2 mb-1 w-3/5 h-4 skeleton-loading"></p>
                </div>
            </sidebar>
            <section className="col-span-2 ">
                <div className="bg-my-gray-40 p-5 my-5 rounded-10">
                    <div className="flex flex-row flex-nowrap justify-between items-center">
                        <p className=" text-xs m-1 w-60 h-6 skeleton-loading"></p>
                        <p className=" text-xs m-1 w-60 h-8 skeleton-loading"></p>
                    </div>

                    <div className="flex flex-row flex-nowrap justify-between items-center">
                        <p className=" text-xs m-1 w-60 h-4 skeleton-loading"></p>
                        <p className=" text-xs m-1 w-60 h-4 skeleton-loading"></p>
                    </div>
                    <div className="flex flex-row flex-wrap justify-between items-center">
                        <p className=" text-xs m-1 w-60 h-4 skeleton-loading"></p>
                        <p className=" text-xs m-1 w-60 h-4 skeleton-loading"></p>
                    </div>
                    <div className=" w-full my-3 flex flex-row flex-wrap justify-between items-center min-h-10-screen ">
                        <div
                            className="flex
                                    flex-row
                                    flex-nowrap
                                    justify-end
                                    items-center"
                        >
                            <span className="w-24 h-10 rounded-10 m-2 skeleton-loading"></span>
                            <span className="w-24 h-10 rounded-10 m-2 skeleton-loading"></span>
                        </div>
                        <div
                            className="flex
                                    flex-row
                                    flex-nowrap
                                    justify-end
                                    items-center"
                        >
                            <span className="w-10 h-10 rounded-10 m-2 skeleton-loading"></span>
                            <span className="w-10 h-10 rounded-10 m-2 skeleton-loading"></span>
                        </div>
                    </div>
                    <div className=" p-3 mx-auto my-8 rounded-10 flex  ">
                        <p className="w-full text-center h-20 p-6 skeleton-loading "></p>
                    </div>
                </div>
            </section>
        </div>
    );
}
