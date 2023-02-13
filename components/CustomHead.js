import Head from "next/head";

const CustomHead = ({ title, keywords, description }) => {
    return (
        <Head>
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta charSet="utf-8" />
            <meta name="author" content="Evans Munene" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <link rel="icon" href="/favicon.ico" />
            <title>{title}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossorigin
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@200;300;400;500;600;700&family=Zilla+Slab:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />
        </Head>
    );
};

CustomHead.defaultProps = {
    title: "Ledja",
    keywords: "Job Seeker, Recruiter",
    description: "Job Matching Web Application",
};

export default CustomHead;
