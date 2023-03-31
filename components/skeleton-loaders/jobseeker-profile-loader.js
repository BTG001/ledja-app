export default function JobSeekerProfileLoader() {
    return (
        <>
            <div className=" w-full ">
                <p className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                    <label className="form-label-light">About Me</label>

                    <span className="text-primary-70 cursor-pointer">Edit</span>
                </p>

                <div
                    className={
                        "w-full mt-4 p-5 border border-solid border-my-gray-70  rounded-10 md:grid md:grid-cols-3 md:gap-3 "
                    }
                >
                    <div className="text-dark-50 grid grid-rows-4 gap-1 justify-center w-full">
                        <p className="row-span-3 w-44 h-full skeleton-loading"></p>

                        <p className=" py-2 px-2 rounded-lg w-full h-full skeleton-loading"></p>
                    </div>
                    <div className="flex flex-col flex-nowrap justify-center items-center md:justify-start md:items-start">
                        <h3 className=" my-5 w-full h-8  skeleton-loading"></h3>
                        <p className="w-full h-4 my-1 skeleton-loading"></p>
                        <p className="w-full h-4 my-1 mb-2 skeleton-loading"></p>
                        <p className="w-full h-6 my-1 mt-2 skeleton-loading"></p>
                        <p className="w-full h-6 my-1 skeleton-loading"></p>
                    </div>

                    <div className="flex flex-row flex-nowrap justify-center items-start my-3 w-full">
                        <div className="m-1 w-8 h-8 rounded-full  skeleton-loading"></div>
                        <div className="m-1 w-8 h-8 rounded-full  skeleton-loading"></div>
                        <div className="m-1 w-8 h-8 rounded-full  skeleton-loading"></div>
                    </div>
                </div>

                <p className="form-label-light my-2 mt-5">Work Experience</p>
                <div
                    className={
                        "w-full h-full mt-4 px-4 py-1 border border-solid border-my-gray-70 justify-start items-center cursor-pointer rounded-10"
                    }
                >
                    <h3 className=" my-2 w-60 h-8  skeleton-loading"></h3>
                    <p className="w-52 h-4 my-2 skeleton-loading"></p>
                    <p className="w-64 h-4 my-2  skeleton-loading"></p>
                    <p className="w-60 h-6 my-2  skeleton-loading"></p>
                    <p className="w-full flex flex-row flex-nowrap">
                        <span className="w-10 h-10 my-2 mr-2 skeleton-loading rounded-10"></span>
                        <span className="w-10 h-10 my-2 skeleton-loading rounded-10"></span>
                    </p>
                </div>
            </div>
        </>
    );
}
