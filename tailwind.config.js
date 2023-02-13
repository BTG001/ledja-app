/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ["Work Sans", "sans-serif"],
        },
        extend: {
            fontFamily: {
                "work-sans": ["Work Sans", "sans-serif"],
                "zilla-slab": ["Zilla Slab", "serif"],
            },
            colors: {
                primary: {
                    50: "#3399FF",
                    60: "#2877C7",
                    70: "#2163A6",
                },
                "my-gray": {
                    50: "#E7EDF2",
                },
                dark: {
                    50: "#050F19",
                    60: "#02080D",
                },
            },
            borderWidth: {
                1: "1px",
            },
            borderRadius: {
                10: "10px",
            },
            height: {
                "90-screen": "90vh",
                "80-screen": "80vh",
                "70-screen": "70vh",
                "60-screen": "60vh",
                "50-screen": "50vh",
                "40-screen": "40vh",
                "30-screen": "30vh",
                "20-screen": "20vh",
                "10-screen": "10vh",
            },
            maxHeight: {
                "90-screen": "90vh",
                "80-screen": "80vh",
                "70-screen": "70vh",
                "60-screen": "60vh",
                "50-screen": "50vh",
                "40-screen": "40vh",
                "30-screen": "30vh",
                "20-screen": "20vh",
                "10-screen": "10vh",
            },
            minHeight: {
                "90-screen": "90vh",
                "80-screen": "80vh",
                "70-screen": "70vh",
                "60-screen": "60vh",
                "50-screen": "50vh",
                "40-screen": "40vh",
                "30-screen": "30vh",
                "20-screen": "20vh",
                "10-screen": "10vh",
            },
        },
    },
    plugins: [],
};
