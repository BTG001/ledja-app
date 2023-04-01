import { useEffect, useState } from "react";

import Image from "next/image";
import Config from "../../../Config";
import Utils from "../../../Utils";

export default function AddSkillPopup({ showPopup, onClose, onSuccess }) {
    const selectEmptyValue = "Please Select";

    const [skill, setSkill] = useState({
        // name: "Javascript",
        // certification: "BSC. Computer Science",
        // proficiency: "Expert",
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

        // const hasErrors = validateValues();

        // if (hasErrors) {
        //     setLoading(false);
        //     return;
        // }

        const userId = localStorage.getItem("user_id");

        const skillsFormData = new FormData();

        skillsFormData.append("user_id", userId || "");
        skillsFormData.append("name", skill.name || "");
        skillsFormData.append("certification", skill.certification || "");
        skillsFormData.append("proficiency", skill.proficiency || "");

        Utils.makeRequest(async () => {
            try {
                const skillsURL = `${Config.API_URL}/skills`;

                let addSkillResults = await Utils.postForm(
                    skillsURL,
                    skillsFormData
                );

                addSkillResults = addSkillResults.data.data;

                console.log("Add Skill Results: ", addSkillResults);

                setLoading(false);

                onSuccess(addSkillResults);
            } catch (error) {
                console.log("Add Skill Error: ", error);
                extractErrors(error);
                setLoading(false);
            }
        });
    };

    const validateValues = () => {
        const theErrors = {};
        let hasErrors = false;
        if (!skill.name) {
            hasErrors = true;
            theErrors.name = "Name is required";
        }

        if (!skill.certification) {
            hasErrors = true;
            theErrors.certification = "Cerfication is required";
        }

        if (!skill.proficiency || skill.proficiency == selectEmptyValue) {
            hasErrors = true;
            theErrors.proficiency = "Proficiency is required";
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
                        <span>Add Skill</span>
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
                                Name
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Ex: Javascript"
                                name="name"
                                value={skill.name}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setSkill((prevValues) => {
                                        return {
                                            ...prevValues,
                                            name: value,
                                        };
                                    });
                                }}
                            />
                            <p className="text-red-500 text-left  ">
                                {errors.name || ""}
                            </p>
                        </div>

                        <div className="form-input-container my-3 p-2">
                            <label className="form-label-light">
                                Proficiency
                            </label>
                            <select
                                className="form-input"
                                type={"text"}
                                placeholder="Please select"
                                name="employment_type"
                                value={skill.proficiency}
                                onChange={(e) => {
                                    let value = e.target.value;

                                    if (value == selectEmptyValue) {
                                        value = undefined;
                                    }

                                    setSkill((prevValues) => {
                                        return {
                                            ...prevValues,
                                            proficiency: value,
                                        };
                                    });
                                }}
                            >
                                <option value={selectEmptyValue}>
                                    {selectEmptyValue}
                                </option>
                                <option value={"Beginner"}>Beginner</option>
                                <option value={"Intermediate"}>
                                    Intermediate
                                </option>
                                <option value={"Expert"}>Expert</option>
                            </select>
                            <p className="text-red-500 text-left  ">
                                {errors.proficiency || ""}
                            </p>
                        </div>

                        <div className="form-input-container my-3 p-2">
                            <label className="form-label-light form-label-required">
                                Certification
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Ex: BSC. IT"
                                name="company_name"
                                value={skill.certification}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setSkill((prevValues) => {
                                        return {
                                            ...prevValues,
                                            certification: value,
                                        };
                                    });
                                }}
                            />
                            <p className="text-red-500 text-left">
                                {errors.certification || ""}
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
