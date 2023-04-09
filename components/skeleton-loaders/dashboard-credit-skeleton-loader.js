export default function DashboardCreditLoaderSkeleton() {
    return (
        <div className=" w-full flex flex-col justify-center items-center">
            <p className="w-1/3 m-1 h-4 skeleton-loading"></p>
            <p className="w-1/2 m-1 h-8 skeleton-loading"></p>
            <div className="flex flex-row justify-center items-center">
                <p className="w-28  h-8 m-1 skeleton-loading"></p>
                <p className="w-28  h-8 m-1 skeleton-loading"></p>
            </div>
        </div>
    );
}
