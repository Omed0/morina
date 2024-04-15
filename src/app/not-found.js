import Link from "next/link"

export default function NotFound() {

    return (
        <div className="h-svh gap-6 flex flex-col justify-center items-center">
            <h1>Not Found</h1>
            <h3>Could not find requested resource</h3>
            <Link
                href="/"
                passHref
                className="bg-[#6668ab] hover:bg-[#555794] text-white text-semibold rounded-md"
            >
                Go Back</Link>
        </div>
    )
}
