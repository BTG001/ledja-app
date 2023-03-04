export default {
    BASE_URL: "http://localhost:8000/api",
    BASE_URL_NON_API: "http://localhost:8000",
    RECRUITER_USER_TYPE_ID: 2,
    JOB_SEEKER_USER_TYPE_ID: 1,
    JOB_CATEGORIES: {
        basic: { name: "basic", id: 1 },
        standard: { name: "standard", id: 2 },
        premium: { name: "premium", id: 3 },
    },
    COMPANY_INDUSTRIES: {
        Financial: { subIndustries: ["Banking"] },
        Industry2: { subIndustries: ["Sub Industry 2"] },
    },
    JOB_TITLES: ["CEO", "COO", "CTO"],
    JOB_LOCATIONS: ["Mombasa", "Nairobi"],
    JOB_TYPES: [
        "Full-time",
        "Part-time",
        "Contract",
        "Temporary",
        "Internship",
        "Seasonal",
    ],
    NO_OF_PEOPLE_TO_HIRE: ["1", "2", "5", "10"],
    HIRE_SPEED: ["Immediately", "In a week", "In a month"],
    MONTH_NAMES: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    TOKEN: "",
};
