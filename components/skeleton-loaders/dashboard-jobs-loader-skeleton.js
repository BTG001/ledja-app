export default function DashboardJobsLoaderSkeleton() {
    return (
        <div className="w-full">
            <div className="grid grid-cols-8 gap-1 w-full p-2 items-center justify-center">
                <div className="col-span-2 font-semibold text-left">
                    Job title
                </div>
                <p className="col-span-4 md:col-span-5 font-semibold text-center w-full">
                    Candidates
                </p>

                {/* <div className="col-span-2 font-semibold text-center">
                        Job credit status
                    </div> */}
                <div className="col-span-2 md:col-span-1 font-semibold text-center">
                    Job status
                </div>
            </div>

            <div className="grid grid-cols-8 gap-1 w-full p-2 items-center justify-center">
                <div className="col-span-2 font-semibold text-left text-sm mr-1 my-1  ">
                    <p className="w-32 m-1 h-6 skeleton-loading"></p>
                    <p className="w-20 m-1 h-4 skeleton-loading"></p>
                    <p className="w-32 m-1 h-4 skeleton-loading"></p>
                </div>
                <div className="col-span-2 font-semibold text-center text-sm m-1 flex flex-col justify-center items-center ">
                    <p className="w-16 m-1 h-4 skeleton-loading"> </p>
                    <p className="w-20 m-1 h-4 skeleton-loading"></p>
                </div>

                <div className=" m-1 justify-center items-center col-span-2 md:col-span-3 grid grid-cols-1 grid-rows-4 md:grid-rows-1 md:grid-cols-4">
                    <div className="text-my-dark-50 text-xs text-center m-1 flex flex-col justify-center items-center">
                        <p className="w-8 m-1 h-4 skeleton-loading"> </p>
                        <p className="w-16 m-1 h-4 skeleton-loading"></p>
                    </div>
                    <div className="text-my-dark-50 text-xs text-center m-1 flex flex-col justify-center items-center ">
                        <p className="w-8 m-1 h-4 skeleton-loading"> </p>
                        <p className="w-16 m-1 h-4 skeleton-loading"></p>
                    </div>
                    <div className="text-my-dark-50 text-xs text-center m-1 flex flex-col justify-center items-center ">
                        <p className="w-8 m-1 h-4 skeleton-loading"> </p>
                        <p className="w-16 m-1 h-4 skeleton-loading"></p>
                    </div>
                    <div className="text-my-dark-50 text-xs text-center m-1 flex flex-col justify-center items-center ">
                        <p className="w-8 m-1 h-4 skeleton-loading"> </p>
                        <p className="w-16 m-1 h-4 skeleton-loading"></p>
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1 text-center flex flex-row flex-nowrap justify-center items-center">
                    <p className="w-20 rounded-10 h-10 skeleton-loading"></p>
                </div>
            </div>
            <div className="grid grid-cols-8 gap-1 w-full p-2 items-center justify-center">
                <div className="col-span-2 font-semibold text-left text-sm mr-1 my-1  ">
                    <p className="w-32 m-1 h-6 skeleton-loading"></p>
                    <p className="w-20 m-1 h-4 skeleton-loading"></p>
                    <p className="w-32 m-1 h-4 skeleton-loading"></p>
                </div>
                <div className="col-span-2 font-semibold text-center text-sm m-1 flex flex-col justify-center items-center ">
                    <p className="w-16 m-1 h-4 skeleton-loading"> </p>
                    <p className="w-20 m-1 h-4 skeleton-loading"></p>
                </div>

                <div className=" m-1 justify-center items-center col-span-2 md:col-span-3 grid grid-cols-1 grid-rows-4 md:grid-rows-1 md:grid-cols-4">
                    <div className="text-my-dark-50 text-xs text-center m-1 flex flex-col justify-center items-center">
                        <p className="w-8 m-1 h-4 skeleton-loading"> </p>
                        <p className="w-16 m-1 h-4 skeleton-loading"></p>
                    </div>
                    <div className="text-my-dark-50 text-xs text-center m-1 flex flex-col justify-center items-center ">
                        <p className="w-8 m-1 h-4 skeleton-loading"> </p>
                        <p className="w-16 m-1 h-4 skeleton-loading"></p>
                    </div>
                    <div className="text-my-dark-50 text-xs text-center m-1 flex flex-col justify-center items-center ">
                        <p className="w-8 m-1 h-4 skeleton-loading"> </p>
                        <p className="w-16 m-1 h-4 skeleton-loading"></p>
                    </div>
                    <div className="text-my-dark-50 text-xs text-center m-1 flex flex-col justify-center items-center ">
                        <p className="w-8 m-1 h-4 skeleton-loading"> </p>
                        <p className="w-16 m-1 h-4 skeleton-loading"></p>
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1 text-center flex flex-row flex-nowrap justify-center items-center">
                    <p className="w-20 rounded-10 h-10 skeleton-loading"></p>
                </div>
            </div>
        </div>
    );
}
