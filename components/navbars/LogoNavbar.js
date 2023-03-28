import Image from "next/image";
import Link from "next/link";

export default function LogoNavbar() {
    return (
        <div
            className="px-12 py-4 bg-my-gray-50
            flex
            flex-row
            flex-nowrap
            justify-start
            items-center"
        >
            <Link href={"/"}>
                <Image src="/Logo.svg" width={117} height={64} />
            </Link>
        </div>
    );
}
