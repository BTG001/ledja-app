export default function MyJobsApplicationsSkeleton() {
    return (
        <div className="border border-my-gray-70 p-2">
            <div className="md:grid md:grid-cols-4 justify-center items-center">
                <div className="w-full md:flex md:col-span-2 ">
                    <p className="skeleton-loading w-20 h-16 mx-2"></p>
                    <div className="w-full">
                        <p className="skeleton-loading w-3/4 h-6 my-2"></p>
                        <p className="skeleton-loading w-2/3 h-4 my-2"></p>
                        <p className="skeleton-loading w-1/4 h-4 my-2"></p>
                        <p className="skeleton-loading w-3/4 h-4 my-2"></p>
                    </div>
                </div>
                <p className="skeleton-loading w-1/2 h-4"></p>
                <p className="skeleton-loading w-1/2 h-4"></p>
            </div>
        </div>
    );
}
