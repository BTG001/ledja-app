export default function JobCategoriesLoaderSkeleton() {
    return (
        <>
            <div
                className={`flex flex-col justify-center items-center border border-solid border-primary-70 py-2 px-8 m-4 rounded-10 cursor-pointer`}
            >
                <p className="my-1  text-xl text-center text-inherits capitalize w-2/3 h-6 skeleton-loading"></p>
                {/* <p className="my-1 text-sm  text-center text-inherit w-1/2 h-8 skeleton-loading"></p> */}
                <p className="my-1 text-sm  text-center text-inherit w-1/2 h-4 skeleton-loading"></p>
            </div>

            <div
                className={`flex flex-col justify-center items-center border border-solid border-primary-70 py-2 px-8 m-4 rounded-10 cursor-pointer`}
            >
                <p className="my-1  text-xl text-center text-inherits capitalize w-2/3 h-6 skeleton-loading"></p>
                {/* <p className="my-1 text-sm  text-center text-inherit w-1/2 h-8 skeleton-loading"></p> */}
                <p className="my-1 text-sm  text-center text-inherit w-1/2 h-4 skeleton-loading"></p>
            </div>
            <div
                className={`flex flex-col justify-center items-center border border-solid border-primary-70 py-2 px-8 m-4 rounded-10 cursor-pointer`}
            >
                <p className="my-1  text-xl text-center text-inherits capitalize w-2/3 h-6 skeleton-loading"></p>
                {/* <p className="my-1 text-sm  text-center text-inherit w-1/2 h-8 skeleton-loading"></p> */}
                <p className="my-1 text-sm  text-center text-inherit w-1/2 h-4 skeleton-loading"></p>
            </div>
        </>
    );
}
