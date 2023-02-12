import Image from "next/image";
import Link from "next/link";

export default function GuestNavbar() {
    return (
        <div
            className="px-12 py-6 bg-my-grey-50
            flex
            flex-row
            flex-nowrap
            justify-between
            items-center"
        >
            <Image src="/Logo.svg" width={117} height={64} />

            <div className="flex flex-row flex-nowrap justify-center items-center space-x-2 h-full">
                <Link href={"/login"} className="text-primary-70 px-4 py-2">
                    Login
                </Link>
                <Link
                    href={"/register"}
                    className="text-primary-70 px-4 py-2 border-primary-70 border-solid rounded-10 border-1"
                >
                    Sign up
                </Link>
            </div>
        </div>
    );
}
