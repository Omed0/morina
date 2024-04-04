"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()

    const goback = () => {
        //if have history go back else go to home
        router.back() ? router.back() : router.push('/')
    }

    return (
        <div className="h-svh gap-6 flex flex-col justify-center items-center">
            <h1>Not Found</h1>
            <h3>Could not find requested resource</h3>
            <Button
                className="bg-[#6668ab] hover:bg-[#555794] text-white text-semibold rounded-md "
                onClick={goback}
            >Go Back</Button>
        </div>
    )
}
