import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="grid grid-cols-1 grid-rows-6 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-6 lg:grid-rows-1 w-full px-auto py-5 bg-my-gray-50 min-h-40-screen text-dark-60 text-sm ">
            <div className="flex flex-col flex-nowrap justify-center items-center md:col-span-2">
                <Image
                    src="/Logo.svg"
                    width={117}
                    height={64}
                    className={"mb-5"}
                />
                <p className={"mb-3"}>&copy; {new Date().getFullYear()}</p>
                <p>
                    <Link href={"#"}>Privacy</Link>
                    <span> {" - "} </span>
                    <Link href={"#"}>Terms</Link>
                </p>
            </div>

            <div className="flex flex-col justify-center items-center mb-3 md:mb-0">
                <span className=" p-1 m-1 mb-2 font-semibold">Product</span>

                <Link className="p-1 m-1" href={"#"}>
                    Product
                </Link>
                <Link className="p-1 m-1" href={"#"}>
                    Product
                </Link>
                <Link className="p-1 m-1" href={"#"}>
                    Test
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center mb-3 md:mb-0">
                <span className=" p-1 m-1 mb-2 font-semibold">Features</span>

                <Link className="p-1 m-1" href={"#"}>
                    Feature
                </Link>
                <Link className="p-1 m-1" href={"#"}>
                    Feature
                </Link>
                <Link className="p-1 m-1" href={"#"}>
                    Test2
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center mb-3 md:mb-0">
                <span className=" p-1 m-1 mb-2 font-semibold">Resources</span>

                <Link className="p-1 m-1" href={"#"}>
                    Resources
                </Link>
                <Link className="p-1 m-1" href={"#"}>
                    Resources
                </Link>
                <Link className="p-1 m-1" href={"#"}>
                    Resources
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center mb-3 md:mb-0">
                <span className=" p-1 m-1 mb-2 font-semibold">Company</span>

                <Link className="p-1 m-1" href={"#"}>
                    Company
                </Link>
                <Link className="p-1 m-1" href={"#"}>
                    Company
                </Link>
                <Link className="p-1 m-1" href={"#"}>
                    Company
                </Link>
            </div>
        </footer>
    );
}
