/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "storage.googleapis.com",
            },
        ],
    },
    //eslint: {
    //    ignoreDuringBuilds: true,
    //},
    env: {
        //NEXT_PUBLIC_API_URL: "https://api.morinamenu.com/",
        NEXT_PUBLIC_API_URL: "https://apitest.morinamenu.com/api/v1/",
        NEXT_PUBLIC_GOOGLE_ANALYTICS: "G-1LG9WW06CL",
        NEXT_PUBLIC_TOKEN: "RWI_BABI_AWA_RASHBE_KA_HACKMAN_AKAT-DWR_La.XOSHMI+tia-NAbet...",
    },

}

module.exports = nextConfig
