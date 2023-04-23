import { useEffect, useState } from "react";
import PrimaryBtn from "../../buttons/PrimaryBtn";
import SecondaryBtn from "../../buttons/SecondaryBtn";
import Image from "next/image";
import Config from "../../../Config";
import Utils from "../../../Utils";
import ErrorPopup from "../../errorPopup";

export default function AddExperiencePopup({ showPopup, onClose, onSuccess }) {
    const selectEmptyValue = "Please Select";
    const yearEmptyValue = "Year";
    const monthEmptyValue = "Month";

    const [workExperience, setWorkExperience] = useState({
        // currentlyOnJob: false,
        // title: "Sales Manager",
        // companyName: "ABC LTD.",
        // employmentType: "Type 1",
        // startYear: 2020,
        // startMonth: "0",
        // endYear: 2018,
        // endMonth: "11",
        // industry: "IT Services",
        // description: "This is a description",
        // location: "Nairobi, Kenya",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);

    const onSave = (e) => {
        e.preventDefault();
        if (loading) {
            return;
        } else {
            setLoading(true);
        }

        const hasErrors = validateValues();

        if (hasErrors) {
            setLoading(false);
            return;
        }

        const userId = localStorage.getItem("user_id");

        // const duration = `${workExperience.startMonth} ${workExperience.startYear} - ${workExperience.endMonth} ${workExperience.endYear}`;

        const startDate = Utils.getTime(
            new Date(workExperience.startYear, workExperience.startMonth)
        );

        const endDate = Utils.getTime(
            new Date(workExperience.endYear, workExperience.endMonth)
        );

        // console.log("work experience: ", workExperience, startDate, endDate);
        // setLoading(false);
        // return;
        const experienceFormData = new FormData();

        experienceFormData.append("user_id", userId || "");
        experienceFormData.append("title", workExperience.title || "");
        experienceFormData.append("company", workExperience.companyName || "");
        experienceFormData.append("start_date", startDate);
        experienceFormData.append("end_date", endDate);
        // experienceFormData.append("duration", duration || "");
        experienceFormData.append(
            "description",
            workExperience.description || ""
        );

        Utils.makeRequest(async () => {
            try {
                const experienceURL = `${Config.API_URL}/work_experiences`;

                let addExperienceResults = await Utils.postForm(
                    experienceURL,
                    experienceFormData
                );

                addExperienceResults = addExperienceResults.data.data;

                console.log("Add Experience Results: ", addExperienceResults);

                setLoading(false);

                onSuccess(addExperienceResults);
                setWorkExperience({});
            } catch (error) {
                console.log("Add Experience Error: ", error);
                extractErrors(error);
                setLoading(false);
            }
        });
    };

    const validateValues = () => {
        const theErrors = {};
        let hasErrors = false;
        console.log("in validator: ", workExperience);
        if (!workExperience.title) {
            hasErrors = true;
            theErrors.title = "Title is required";
        }

        if (!workExperience.companyName) {
            hasErrors = true;
            theErrors.companyName = "Company Name is required";
        }

        // if (!workExperience.employmentType) {
        //     hasErrors = true;
        //     theErrors.employmentType = "Employment type is required";
        // }

        // if (!workExperience.location) {
        //     hasErrors = true;
        //     theErrors.location = "Location is required";
        // }

        if (!workExperience.startYear) {
            hasErrors = true;
            theErrors.startYear = "Start year is required";
        }

        if (!workExperience.startMonth) {
            hasErrors = true;
            theErrors.startMonth = "Start month is required";
        }

        if (!workExperience.endYear) {
            hasErrors = true;
            theErrors.endYear = "End year is required";
        }

        if (!workExperience.endMonth) {
            hasErrors = true;
            theErrors.endMonth = "End month is required";
        }

        if (
            (workExperience.startYear &&
                workExperience.startMonth &&
                workExperience.endYear &&
                workExperience.endMonth &&
                parseInt(workExperience.startYear) >
                    parseInt(workExperience.endYear)) ||
            (parseInt(workExperience.startYear) ==
                parseInt(workExperience.endYear) &&
                parseInt(workExperience.startMonth) >
                    parseInt(workExperience.endMonth))
        ) {
            hasErrors = true;
            theErrors.endYear =
                "The End Period Must be Smaller than Start Period";
        }

        // if (!workExperience.industry) {
        //     hasErrors = true;
        //     theErrors.industry = "Industry is required";
        // }

        if (!workExperience.description) {
            hasErrors = true;
            theErrors.description = "Description is required";
        }

        if (!workExperience.endMonth) {
            hasErrors = true;
            theErrors.endMonth = "End month is required";
        }

        setErrors(theErrors);

        return hasErrors;
    };

    const extractErrors = (error) => {
        try {
            let errorMessages = {};
            const errors = error.response.data.data;

            Object.keys(errors).map((errorKey) => {
                errorMessages[errorKey] = errors[errorKey][0];
            });

            console.log("errors: ", errorMessages);
            setErrors(errorMessages);

            if (errors.length < 1 && error.response.data.error) {
                console.log("unknown error: ", error.response.data.error);
            }
        } catch (error) {
            // setErrorMessage(`Unknown Error:  ${error.message}`);
            // setShowErrorPopup(true);
            console.log("Error Generating Error Message: ", error);
        }
    };

    return (
        showPopup && (
            <>
                <div className="fixed bg-my-gray-70 opacity-40 w-full h-full top-0 left-0 bottom-0 right-0 "></div>
                <div className="z-50 fixed w-4/5 md:w-3/4 lg:w-2/3 left-1/2 -translate-x-1/2 top-0  p-10 bg-white opacity-100 rounded-10 shadow-md  my-10">
                    <p className="w-full flex flex-row justify-between flex-wrap-reverse items-center text-lg font-medium">
                        <span>Add Experience</span>
                        <Image
                            onClick={onClose}
                            src={"/x-icon.svg"}
                            className="cursor-pointer mb-2 translate-x-1/3"
                            width={16}
                            height={16}
                        />
                    </p>

                    <form
                        className="form h-max max-h-60-screen overflow-y-scroll pr-6 my-3 "
                        onSubmit={onSave}
                    >
                        <div className="form-input-container my-3 p-2">
                            <label className="form-label-light form-label-required">
                                Title
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Ex: Sales manager"
                                name="title"
                                value={workExperience.title}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setWorkExperience((prevValues) => {
                                        return {
                                            ...prevValues,
                                            title: value,
                                        };
                                    });
                                }}
                            />
                            <p className="text-red-500 text-left  ">
                                {errors.title || ""}
                            </p>
                        </div>

                        {/* <div className="form-input-container my-3 p-2">
                            <label className="form-label-light">
                                Employment type
                            </label>
                            <select
                                className="form-input"
                                type={"text"}
                                placeholder="Please select"
                                name="employment_type"
                                value={workExperience.employmentType}
                                onChange={(e) => {
                                    let value = e.target.value;

                                    if (value == selectEmptyValue) {
                                        value = undefined;
                                    }

                                    setWorkExperience((prevValues) => {
                                        return {
                                            ...prevValues,
                                            employmentType: value,
                                        };
                                    });
                                }}
                            >
                                <option value={selectEmptyValue}>
                                    {selectEmptyValue}
                                </option>
                                <option value={"type1"}>Type 1</option>
                                <option value={"type2"}>Type 2</option>
                            </select>
                            <p className="text-red-500 text-left  ">
                                {errors.employmentType || ""}
                            </p>
                        </div> */}

                        <div className="form-input-container my-3 p-2">
                            <label className="form-label-light form-label-required">
                                Company name
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Ex: Microsoft"
                                name="company_name"
                                value={workExperience.companyName}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setWorkExperience((prevValues) => {
                                        return {
                                            ...prevValues,
                                            companyName: value,
                                        };
                                    });
                                }}
                            />
                            <p className="text-red-500 text-left">
                                {errors.companyName || errors.company || ""}
                            </p>
                        </div>

                        {/* <div className="form-input-container my-3 p-2">
                            <label className="form-label-light">Location</label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Ex: Nairobi, Kenya"
                                name="location"
                                value={workExperience.location}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setWorkExperience((prevValues) => {
                                        return {
                                            ...prevValues,
                                            location: value,
                                        };
                                    });
                                }}
                            />
                            <p className="text-red-500 text-left  ">
                                {errors.location || ""}
                            </p>
                        </div> */}
                        {/* <div className="flex flex-row flex-nowrap justify-start items-center">
                            <input
                                className="m-2"
                                type={"checkbox"}
                                onChange={(e) => {
                                    let value = false;

                                    if (!workExperience.currentlyOnJob) {
                                        value = true;
                                    }

                                    console.log("value: ", value);

                                    setWorkExperience((prevValues) => {
                                        return {
                                            ...prevValues,
                                            currentlyOnJob: value,
                                        };
                                    });
                                }}
                            />
                            <p>I am currently working in this role</p>
                        </div> */}
                        <div className="my-3 p-2">
                            <div className="form-input-container">
                                <label
                                    className="form-label-light form-label-required"
                                    for="firstName"
                                >
                                    Start date
                                </label>
                            </div>

                            <div className="form-input-container form-input-container flex flex-row justify-center items-start first-line:">
                                <div className="w-full justify-center items-start">
                                    <input
                                        className="form-input"
                                        type={"number"}
                                        min={1900}
                                        max={new Date().getFullYear()}
                                        placeholder="2020"
                                        name="start_year"
                                        value={workExperience.startYear}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setWorkExperience((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    startYear: value,
                                                };
                                            });
                                        }}
                                    />
                                    <p className="text-red-500 text-left  ">
                                        {errors.startYear || ""}
                                    </p>
                                </div>
                                <div className="w-full justify-center items-start">
                                    <select
                                        className="form-input ml-2"
                                        name="start_month"
                                        value={workExperience.startMonth}
                                        onChange={(e) => {
                                            let value = e.target.value;

                                            if (value == monthEmptyValue) {
                                                value = undefined;
                                            }

                                            setWorkExperience((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    startMonth: value,
                                                };
                                            });
                                        }}
                                    >
                                        <option value={monthEmptyValue}>
                                            {monthEmptyValue}
                                        </option>
                                        {Config.MONTH_NAMES.map(
                                            (monthName, index) => {
                                                return (
                                                    <option value={index}>
                                                        {monthName}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                    <p className="text-red-500 text-left ml-2  ">
                                        {errors.startMonth || ""}
                                    </p>
                                </div>
                            </div>
                            <p className="text-red-500 text-left  ">
                                {errors.start_date || ""}
                            </p>
                        </div>
                        <div className="my-3 p-2">
                            <div className="form-input-container">
                                <label
                                    className="form-label-light form-label-required"
                                    for="firstName"
                                >
                                    End date
                                </label>
                            </div>

                            <div className="form-input-container form-input-container flex flex-row justify-center items-start ">
                                <div className="w-full justify-center items-start">
                                    <input
                                        className="form-input"
                                        type={"number"}
                                        min={1900}
                                        max={new Date().getFullYear()}
                                        placeholder="2020"
                                        name="end_year"
                                        value={workExperience.endYear}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setWorkExperience((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    endYear: value,
                                                };
                                            });
                                        }}
                                    />
                                    <p className="text-red-500 text-left  ">
                                        {errors.endYear || ""}
                                    </p>
                                </div>
                                <div className="w-full justify-center items-start">
                                    <select
                                        className="form-input ml-2"
                                        name="end_month"
                                        value={workExperience.endMonth}
                                        onChange={(e) => {
                                            let value = e.target.value;

                                            if (value == monthEmptyValue) {
                                                value = undefined;
                                            }

                                            setWorkExperience((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    endMonth: value,
                                                };
                                            });
                                        }}
                                    >
                                        <option value={monthEmptyValue}>
                                            {monthEmptyValue}
                                        </option>
                                        {Config.MONTH_NAMES.map(
                                            (monthName, index) => {
                                                return (
                                                    <option value={index}>
                                                        {monthName}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                    <p className="text-red-500 text-left ml-2 ">
                                        {errors.endMonth || ""}
                                    </p>
                                </div>
                            </div>
                            <p className="text-red-500 text-left  ">
                                {errors.end_date || ""}
                            </p>
                        </div>
                        {/* <div className="form-input-container my-3 p-2">
                            <label className="form-label-light form-label-required">
                                Industry
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="IT development"
                                name="industry"
                                value={workExperience.industry}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setWorkExperience((prevValues) => {
                                        return {
                                            ...prevValues,
                                            industry: value,
                                        };
                                    });
                                }}
                            />
                            <p className="text-red-500 text-left  ">
                                {errors.industry || ""}
                            </p>
                        </div> */}

                        <div className="form-input-container p-2">
                            <label className="form-label-light">
                                Description
                            </label>

                            <textarea
                                className="form-input"
                                rows={4}
                                placeholder="This is my experience description...."
                                name="end_year"
                                value={workExperience.description}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setWorkExperience((prevValues) => {
                                        return {
                                            ...prevValues,
                                            description: value,
                                        };
                                    });
                                }}
                            ></textarea>
                            <p className="text-right w-full text-sm">0/2,000</p>
                            <p className="text-red-500 text-left  ">
                                {errors.description || ""}
                            </p>
                        </div>

                        <div className="flex flex-row justify-center items-center p-2">
                            <button
                                onClick={onSave}
                                className="submit-btn-left ml-3"
                                type={"submit"}
                            >
                                {loading && <span className="loader"></span>}
                                {!loading && <span className="">Save</span>}
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    );
}
