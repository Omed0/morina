'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col gap-7 justify-center items-center h-svh w-full">
            <div className='space-y-3 mx-auto'>
                <h2>Something went wrong!</h2>
                <p>{error}</p>
            </div>
            <Button
                onClick={() => reset()}
                className='bg-[#6668ab] hover:bg-[#555794] text-white border-none outline-none ring-0 cursor-pointer'
            >
                Try again
            </Button>
        </div>
    )
}