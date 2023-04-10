export default function JobLoaderSkeleton() {
    return (
        <div className=" w-full flex flex-col justify-center items-center p-2">
            <p className="m-1 w-28 h-28 skeleton-loading "></p>
            <div className="w-full flex flex-col justify-center items-center ">
                <p className="w-1/2 h-8 my-5 skeleton-loading m-auto"></p>
                <p className="w-3/4 h-28 skeleton-loading m-auto"></p>
            </div>
        </div>
    );
}
