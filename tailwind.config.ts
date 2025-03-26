import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                inria: ["Inria Serif", "serif"],
            },
            backgroundImage: {
                "banner-gradient":
                    "linear-gradient(rgba(50, 50, 50, 0.73), rgba(50, 50, 50, 0.73)), url('/banner.jpeg')",
            },
            keyframes: {
                mobileSideBarSlideRight: {
                    "0%": { left: "-300px", opacity: "0" },
                    "100%": { left: "0px", opacity: "1" },
                },
            },
            animation: {
                mobileSideBarSlideRight: "mobileSideBarSlideRight 750ms",
            },
        },
    },
    plugins: [],
} satisfies Config;
