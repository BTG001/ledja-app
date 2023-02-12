import Link from "next/link";

export default function PrimaryBtn({ text, path, className }) {
    return (
        <Link
            href={path}
            className={`text-white bg-primary-70 px-4 py-2 rounded-lg  ${className}`}
        >
            {text}
        </Link>
    );
}
