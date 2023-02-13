import Link from "next/link";

export default function PrimaryBtn({ text, path, className, data }) {
    return (
        <Link
            href={{
                pathname: path,
                query: data,
            }}
            className={`text-white bg-primary-70 px-4 py-2 rounded-lg  ${className}`}
        >
            {text}
        </Link>
    );
}
