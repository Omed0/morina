
import { config } from "@/lib/axiosConfig";
import { Fragment } from "react";

export async function generateMetadata({ params }) {
    const { id } = params;
    //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/venues/details/${id}`)
    //const venue = await res.json().then((data) => data.venue);
    try {
        const res = await config.get(`/venues/details/${id}`);
        const venue = await res.data?.venue;
        return {
            title: venue?.name,
            description: "View " + venue?.name + " Menu.",
            alternates: {
                canonical: `https://morinamenu.com/${venue?.username}`,
            },
            icons: {
                icon: venue?.profile_image,
                apple: venue?.profile_image,
            },
            openGraph: {
                title: venue?.name,
                description: "View " + venue?.name + " Menu.",
                url: `https://morinamenu.com/${venue?.username}`,
                siteName: venue?.name,
                images: [
                    {
                        url: venue?.profile_image,
                        width: 800,
                        height: 600,
                        alt: "icon " + venue?.name,
                    },
                ],
                locale: "en_US",
                type: "website",
            },
            twitter: {
                handle: venue?.username,
                site: venue?.username,
                cardType: "summary_large_image",
            },
        }
    } catch (error) {
        console.error(error.response);
    }
}

export default function layout({ children }) {

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}
