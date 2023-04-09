import { useEffect, useState } from "react";
import Image from "next/image";
import Config from "../../../Config";
import Utils from "../../../Utils";

export default function AddEducationPopup({ showPopup, onClose, onSuccess }) {
    const monthEmptyValue = "Month";

    const [education, setEducation] = useState({
        // certification: "BSC. Law",
        // institution: "Harvard UNiversity",
        // startYear: 2020,
        // startMonth: "January",
        // endYear: 2021,
        // endMonth: "December",
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

        const startDate = Utils.getTime(
            new Date(education.startYear, education.startMonth)
        );

        const endDate = Utils.getTime(
            new Date(education.endYear, education.endMonth)
        );

        // const duration = `${education.startMonth} ${education.startYear}  - ${education.endMonth} ${education.endYear}`;

        const educationFormData = new FormData();

        educationFormData.append("user_id", userId || "");
        educationFormData.append(
            "certification",
            education.certification || ""
        );
        educationFormData.append("institution", education.institution || "");
        educationFormData.append("start_date", startDate);
        educationFormData.append("end_date", endDate);
        // educationFormData.append("duration", duration || "");

        Utils.makeRequest(async () => {
            try {
                const educationURL = `${Config.API_URL}/education`;

                let addEducationResults = await Utils.postForm(
                    educationURL,
                    educationFormData
                );

                addEducationResults = addEducationResults.data.data;

                console.log("Add Education Results: ", addEducationResults);

                setLoading(false);

                onSuccess(addEducationResults);
            } catch (error) {
                console.log("Add Education Error: ", error);
                extractErrors(error);
                setLoading(false);
            }
        });
    };

    const validateValues = () => {
        const theErrors = {};
        let hasErrors = false;
        if (!education.certification) {
            hasErrors = true;
            theErrors.certification = "Certification is required";
        }

        if (!education.institution) {
            hasErrors = true;
            theErrors.institution = "Institution Name is required";
        }

        if (!education.startYear) {
            hasErrors = true;
            theErrors.startYear = "Start year is required";
        }

        if (!education.startMonth) {
            hasErrors = true;
            theErrors.startMonth = "Start month is required";
        }

        if (!education.endYear) {
            hasErrors = true;
            theErrors.endYear = "End year is required";
        }

        if (!education.endMonth) {
            hasErrors = true;
            theErrors.endMonth = "End month is required";
        }

        if (!education.endMonth) {
            hasErrors = true;
            theErrors.title = "End month is required";
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
                        <span>Add Education</span>
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
                                Certification
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="BSC. Information Security"
                                name="certification"
                                value={education.certification}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setEducation((prevValues) => {
                                        return {
                                            ...prevValues,
                                            certification: value,
                                        };
                                    });
                                }}
                            />
                            <p className="text-red-500 text-left  ">
                                {errors.certification || ""}
                            </p>
                        </div>

                        <div className="form-input-container my-3 p-2">
                            <label className="form-label-light form-label-required">
                                Institution
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Ex: Harvard University"
                                name="company_name"
                                value={education.institution}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setEducation((prevValues) => {
                                        return {
                                            ...prevValues,
                                            institution: value,
                                        };
                                    });
                                }}
                            />
                            <p className="text-red-500 text-left">
                                {errors.institution || ""}
                            </p>
                        </div>

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
                                        value={education.startYear}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setEducation((prevValues) => {
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
                                        value={education.startMonth}
                                        onChange={(e) => {
                                            let value = e.target.value;

                                            if (value == monthEmptyValue) {
                                                value = undefined;
                                            }

                                            setEducation((prevValues) => {
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
                                        value={education.endYear}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setEducation((prevValues) => {
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
                                        value={education.endMonth}
                                        onChange={(e) => {
                                            let value = e.target.value;

                                            if (value == monthEmptyValue) {
                                                value = undefined;
                                            }

                                            setEducation((prevValues) => {
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
