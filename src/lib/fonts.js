import { Poppins } from "next/font/google";
import LocalFont from "next/font/local";

export const rabar = LocalFont({
    src: [
        {
            path: "../../public/fonts/Rabar_021.woff",
            style: "normal",
            weight: "500",
        },
    ],
    variable: "--font-rabar",
    display: "swap",
    fallback: "serif",
    preload: true,
});

export const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    display: "swap",
    preload: true,
    weight: ["400", "500", "600"],
    fallback: "sans-serif",
});

