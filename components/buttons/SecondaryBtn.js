import Link from "next/link";

export default function SecondaryBtn({ text, path, className, data }) {
    return (
        <Link
            href={{
                pathname: path,
                query: data,
            }}
            className={`text-primary-70 bg-white px-4 py-2 rounded-lg border border-primary-70  ${className}`}
        >
            {text}
        </Link>
    );
}
