export default function JobsCardsLoaderSkeleton() {
    return (
        <>
            <div className=" w-full flex flex-col md:flex-row justify-center items-center p-2">
                <p className="m-1 w-28 h-28 skeleton-loading "></p>
                <div className="w-full flex flex-col justify-center items-center md:block">
                    <p className="w-1/2 h-8 m-1 my-5 skeleton-loading"></p>
                    <p className="w-3/4 m-1 h-28 skeleton-loading"></p>
                </div>
            </div>
            <div className=" w-full flex flex-col md:flex-row justify-center items-center p-2">
                <p className="m-1 w-28 h-28 skeleton-loading "></p>
                <div className="w-full flex flex-col justify-center items-center md:block">
                    <p className="w-1/2 h-8 m-1 my-5 skeleton-loading"></p>
                    <p className="w-3/4 m-1 h-28 skeleton-loading"></p>
                </div>
            </div>
            <div className=" w-full flex flex-col md:flex-row justify-center items-center p-2">
                <p className="m-1 w-28 h-28 skeleton-loading "></p>
                <div className="w-full flex flex-col justify-center items-center md:block">
                    <p className="w-1/2 h-8 m-1 my-5 skeleton-loading"></p>
                    <p className="w-3/4 m-1 h-28 skeleton-loading"></p>
                </div>
            </div>
        </>
    );
}
