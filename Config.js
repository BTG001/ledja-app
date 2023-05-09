const ALL_INDUSTRIES = [
    "Healthcare and Medical Services",
    "Finance and Banking",
    "Technology and Software",
    "Education and Training",
    "Retail and Consumer Goods",
    "Hospitality and Tourism",
    "Manufacturing and Production",
    "Transportation and Logistics",
    "Construction and Engineering",
    "Government and Public Administration",
    "Non-profit and Social Services",
    "Energy and Utilities",
    "Media and Communications",
    "Legal Services",
    "Agriculture and Farming",
    "Creative and Performing Arts",
    "Consulting and Business Services",
    "Real Estate and Property Management",
    "Sports and Recreation",
    "Environmental Services",
];
const ALL_SUB_INDUSTRIES = [
    "Hospitals and Clinics",
    "Health Insurance",
    "Pharmaceuticals",
    "Biotechnology",
    "Medical Devices",
    "Telehealth and Telemedicine",
    "Home Health and Hospice",
    "Rehabilitation Services",
    "Mental Health and Counseling",
    "Investment Banking",
    "Commercial Banking",
    "Wealth Management",
    "Accounting and Auditing",
    "Financial Planning",
    "Insurance",
    "Real Estate Finance",
    "Venture Capital",
    "Private Equity",
    "Software Development",
    "Information Technology (IT) Services",
    "Hardware Manufacturing",
    "Artificial Intelligence (AI) and Machine Learning",
    "Cybersecurity",
    "E-commerce",
    "Mobile App Development",
    "Cloud Computing",
    "Social Media",
    "K-12 Education",
    "Higher Education",
    "Online Education",
    "Vocational Training",
    "Corporate Training",
    "Educational Publishing",
    "Test Preparation",
    "Tutoring and Coaching",
    "Education Technology (EdTech)",
    "E-commerce and Online Retail",
    "Brick-and-Mortar Retail",
    "Food and Beverage",
    "Fashion and Apparel",
    "Home Goods and Furnishings",
    "Consumer Electronics",
    "Beauty and Personal Care",
    "Toys and Games",
    "Sporting Goods",
    "Hotels and Lodging",
    "Restaurants and Food Service",
    "Travel and Tourism",
    "Event Planning and Management",
    "Attractions and Theme Parks",
    "Cruise Lines",
    "Airline Industry",
    "Car Rental and Transportation",
    "Vacation Rentals and Home Sharing",
    "Aerospace and Defense",
    "Automotive Manufacturing",
    "Chemicals and Plastics",
    "Electronics and Computer Manufacturing",
    "Food and Beverage Processing",
    "Machinery and Equipment",
    "Metals and Mining",
    "Paper and Packaging",
    "Textile and Apparel",
    "Shipping and Freight",
    "Warehousing and Distribution",
    "Rail and Freight Transport",
    "Air Transport and Cargo",
    "Trucking and Delivery Services",
    "Postal and Courier Services",
    "Supply Chain Management",
    "Reverse Logistics",
    "Fleet Management",
    "Building and Construction",
    "Architecture and Design",
    "Civil Engineering",
    "Environmental Engineering",
    "Geotechnical Engineering",
    "Mechanical and Electrical Engineering",
    "Land Surveying",
    "Project Management",
    "Facilities Management",
    "Federal Government",
    "State and Local Government",
    "Public Administration and Management",
    "National Security and Defense",
    "Public Safety and Law Enforcement",
    "Regulatory Agencies",
    "Social Services",
    "Public Health",
    "Education and Training",
    "Charitable Organizations",
    "Foundations and Grantmaking",
    "Religious Organizations",
    "Social Advocacy Groups",
    "Environmental Organizations",
    "International Development",
    "Health and Human Services",
    "Arts and Culture",
    "Animal Welfare",
    "Oil and Gas Exploration and Production",
    "Renewable Energy",
    "Electric Power and Utilities",
    "Natural Gas Utilities",
    "Water Utilities",
    "Waste Management and Recycling",
    "Energy Consulting",
    "Energy Trading",
    "Energy Storage",
    "Publishing and Printing",
    "Broadcasting and Cable",
    "Advertising and Marketing",
    "Public Relations",
    "Film and Video Production",
    "Music and Entertainment",
    "Journalism and News",
    "Internet Publishing and Broadcasting",
    "Social Media and Networking",
    "Law Firms",
    "Corporate Legal Departments",
    "Government Legal Departments",
    "Legal Aid and Pro Bono Services",
    "Court Systems and Judiciary",
    "Alternative Dispute Resolution",
    "Intellectual Property Law",
    "International Law",
    "Labor and Employment Law",
    "Crop Production",
    "Livestock and Poultry Farming",
    "Agricultural Machinery and Equipment",
    "Aquaculture and Fish Farming",
    "Horticulture and Floriculture",
    "Agricultural Research and Development",
    "Agribusiness and Farm Management",
    "Agricultural Financing and Insurance",
    "Sustainable Agriculture",
    "Fine Arts",
    "Music",
    "Theatre and Drama",
    "Film and Video",
    "Writing and Publishing",
    "Graphic Design and Advertising",
    "Fashion Design and Merchandising",
    "Photography and Visual Arts",
    "Dance and Choreography",
    "Management Consulting",
    "Human Resources and Recruitment",
    "Marketing and Advertising",
    "Accounting and Tax Services",
    "Information Technology (IT) Consulting",
    "Legal Consulting",
    "Financial Consulting",
    "Strategy Consulting",
    "Public Relations",
    "Residential Real Estate",
    "Commercial Real Estate",
    "Property Management",
    "Real Estate Investment and Development",
    "Real Estate Brokerage",
    "Real Estate Appraisal and Valuation",
    "Real Estate Finance and Mortgage",
    "Real Estate Marketing and Sales",
    "Real Estate Law",
    "Professional Sports Leagues and Teams",
    "Amateur and Youth Sports",
    "Sports Equipment and Apparel",
    "Fitness and Wellness",
    "Recreation and Leisure Activities",
    "Sporting Events and Conferences",
    "Sports Marketing and Sponsorship",
    "Sports Media and Broadcasting",
    "Sports Science and Medicine",
    "Environmental Consulting",
    "Waste Management and Recycling",
    "Pollution Control and Remediation",
    "Renewable Energy",
    "Environmental Testing and Analysis",
    "Sustainable Design and Engineering",
    "Conservation and Wildlife Management",
    "Environmental Education and Advocacy",
    "Green Building and Development",
];

export default {
    // API_URL: "http://localhost:8000/api",
    // BASE_URL: "http://localhost:8000",
    // API_URL: "http://34.118.66.234/api",
    // BASE_URL: "http://34.118.66.234",
    API_URL: "https://api.direktory.biz/api",
    BASE_URL: "https://api.direktory.biz",
    RECRUITER_USER_TYPE_ID: 2,
    JOB_SEEKER_USER_TYPE_ID: 1,
    JOB_CATEGORIES: {
        basic: { name: "basic", id: 1 },
        standard: { name: "standard", id: 2 },
        premium: { name: "premium", id: 3 },
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
    ALL_INDUSTRIES: ALL_INDUSTRIES,
    ALL_SUB_INDUSTRIES: ALL_SUB_INDUSTRIES,
    COMPANY_INDUSTRIES: {
        "Healthcare and Medical Services": {
            subIndustries: [
                "Hospitals and Clinics",
                "Health Insurance",
                "Pharmaceuticals",
                "Biotechnology",
                "Medical Devices",
                "Telehealth and Telemedicine",
                "Home Health and Hospice",
                "Rehabilitation Services",
                "Mental Health and Counseling",
            ],
        },
        "Finance and Banking": {
            subIndustries: [
                "Investment Banking",
                "Commercial Banking",
                "Wealth Management",
                "Accounting and Auditing",
                "Financial Planning",
                "Insurance",
                "Real Estate Finance",
                "Venture Capital",
                "Private Equity",
            ],
        },
        "Technology and Software": {
            subIndustries: [
                "Software Development",
                "Information Technology (IT) Services",
                "Hardware Manufacturing",
                "Artificial Intelligence (AI) and Machine Learning",
                "Cybersecurity",
                "E-commerce",
                "Mobile App Development",
                "Cloud Computing",
                "Social Media",
            ],
        },
        "Education and Training": {
            subIndustries: [
                "K-12 Education",
                "Higher Education",
                "Online Education",
                "Vocational Training",
                "Corporate Training",
                "Educational Publishing",
                "Test Preparation",
                "Tutoring and Coaching",
                "Education Technology (EdTech)",
            ],
        },
        "Retail and Consumer Goods": {
            subIndustries: [
                "E-commerce and Online Retail",
                "Brick-and-Mortar Retail",
                "Food and Beverage",
                "Fashion and Apparel",
                "Home Goods and Furnishings",
                "Consumer Electronics",
                "Beauty and Personal Care",
                "Toys and Games",
                "Sporting Goods",
            ],
        },
        "Hospitality and Tourism": {
            subIndustries: [
                "Hotels and Lodging",
                "Restaurants and Food Service",
                "Travel and Tourism",
                "Event Planning and Management",
                "Attractions and Theme Parks",
                "Cruise Lines",
                "Airline Industry",
                "Car Rental and Transportation",
                "Vacation Rentals and Home Sharing",
            ],
        },
        "Manufacturing and Production": {
            subIndustries: [
                "Aerospace and Defense",
                "Automotive Manufacturing",
                "Chemicals and Plastics",
                "Electronics and Computer Manufacturing",
                "Food and Beverage Processing",
                "Machinery and Equipment",
                "Metals and Mining",
                "Paper and Packaging",
                "Textile and Apparel",
            ],
        },
        "Transportation and Logistics": {
            subIndustries: [
                "Shipping and Freight",
                "Warehousing and Distribution",
                "Rail and Freight Transport",
                "Air Transport and Cargo",
                "Trucking and Delivery Services",
                "Postal and Courier Services",
                "Supply Chain Management",
                "Reverse Logistics",
                "Fleet Management",
            ],
        },
        "Construction and Engineering": {
            subIndustries: [
                "Building and Construction",
                "Architecture and Design",
                "Civil Engineering",
                "Environmental Engineering",
                "Geotechnical Engineering",
                "Mechanical and Electrical Engineering",
                "Land Surveying",
                "Project Management",
                "Facilities Management",
            ],
        },
        "Government and Public Administration": {
            subIndustries: [
                "Federal Government",
                "State and Local Government",
                "Public Administration and Management",
                "National Security and Defense",
                "Public Safety and Law Enforcement",
                "Regulatory Agencies",
                "Social Services",
                "Public Health",
                "Education and Training",
            ],
        },
        "Non-profit and Social Services": {
            subIndustries: [
                "Charitable Organizations",
                "Foundations and Grantmaking",
                "Religious Organizations",
                "Social Advocacy Groups",
                "Environmental Organizations",
                "International Development",
                "Health and Human Services",
                "Arts and Culture",
                "Animal Welfare",
            ],
        },
        "Energy and Utilities": {
            subIndustries: [
                "Oil and Gas Exploration and Production",
                "Renewable Energy",
                "Electric Power and Utilities",
                "Natural Gas Utilities",
                "Water Utilities",
                "Waste Management and Recycling",
                "Energy Consulting",
                "Energy Trading",
                "Energy Storage",
            ],
        },
        "Media and Communications": {
            subIndustries: [
                "Publishing and Printing",
                "Broadcasting and Cable",
                "Advertising and Marketing",
                "Public Relations",
                "Film and Video Production",
                "Music and Entertainment",
                "Journalism and News",
                "Internet Publishing and Broadcasting",
                "Social Media and Networking",
            ],
        },
        "Legal Services": {
            subIndustries: [
                "Law Firms",
                "Corporate Legal Departments",
                "Government Legal Departments",
                "Legal Aid and Pro Bono Services",
                "Court Systems and Judiciary",
                "Alternative Dispute Resolution",
                "Intellectual Property Law",
                "International Law",
                "Labor and Employment Law",
            ],
        },
        "Agriculture and Farming": {
            subIndustries: [
                "Crop Production",
                "Livestock and Poultry Farming",
                "Agricultural Machinery and Equipment",
                "Aquaculture and Fish Farming",
                "Horticulture and Floriculture",
                "Agricultural Research and Development",
                "Agribusiness and Farm Management",
                "Agricultural Financing and Insurance",
                "Sustainable Agriculture",
            ],
        },
        "Creative and Performing Arts": {
            subIndustries: [
                "Fine Arts",
                "Music",
                "Theatre and Drama",
                "Film and Video",
                "Writing and Publishing",
                "Graphic Design and Advertising",
                "Fashion Design and Merchandising",
                "Photography and Visual Arts",
                "Dance and Choreography",
            ],
        },
        "Consulting and Business Services": {
            subIndustries: [
                "Management Consulting",
                "Human Resources and Recruitment",
                "Marketing and Advertising",
                "Accounting and Tax Services",
                "Information Technology (IT) Consulting",
                "Legal Consulting",
                "Financial Consulting",
                "Strategy Consulting",
                "Public Relations",
            ],
        },
        "Real Estate and Property Management": {
            subIndustries: [
                "Residential Real Estate",
                "Commercial Real Estate",
                "Property Management",
                "Real Estate Investment and Development",
                "Real Estate Brokerage",
                "Real Estate Appraisal and Valuation",
                "Real Estate Finance and Mortgage",
                "Real Estate Marketing and Sales",
                "Real Estate Law",
            ],
        },
        "Sports and Recreation": {
            subIndustries: [
                "Professional Sports Leagues and Teams",
                "Amateur and Youth Sports",
                "Sports Equipment and Apparel",
                "Fitness and Wellness",
                "Recreation and Leisure Activities",
                "Sporting Events and Conferences",
                "Sports Marketing and Sponsorship",
                "Sports Media and Broadcasting",
                "Sports Science and Medicine",
            ],
        },
        "Environmental Services": {
            subIndustries: [
                "Environmental Consulting",
                "Waste Management and Recycling",
                "Pollution Control and Remediation",
                "Renewable Energy",
                "Environmental Testing and Analysis",
                "Sustainable Design and Engineering",
                "Conservation and Wildlife Management",
                "Environmental Education and Advocacy",
                "Green Building and Development",
            ],
        },
    },
};
