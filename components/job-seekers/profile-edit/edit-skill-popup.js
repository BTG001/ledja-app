import { useEffect, useState } from "react";

import Image from "next/image";
import Config from "../../../Config";
import Utils from "../../../Utils";

export default function EditSkillPopup({
    showPopup,
    onClose,
    onSuccess,
    skill: propSkill,
}) {
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

    useEffect(() => {
        if (propSkill) {
            setSkill(propSkill);
        }
    }, [propSkill]);

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

        const skillsFormData = new FormData();

        skillsFormData.append("user_id", userId);
        skillsFormData.append("name", skill.name);
        skillsFormData.append("certification", skill.certification);
        skillsFormData.append("proficiency", skill.proficiency);

        Utils.makeRequest(async () => {
            try {
                const skillsURL = `${Config.API_URL}/skills/${propSkill.id}`;

                let editSkillResults = await Utils.putForm(
                    skillsURL,
                    skillsFormData
                );

                editSkillResults = editSkillResults.data.data;

                console.log("edit Skill Results: ", editSkillResults);

                setLoading(false);

                setSkill(editSkillResults);

                onSuccess(editSkillResults);
            } catch (error) {
                console.log("edit Skill Error: ", error);

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

    return (
        showPopup && (
            <>
                <div className="fixed bg-my-gray-70 opacity-40 w-full h-full top-0 left-0 bottom-0 right-0 "></div>
                <div className="z-50 fixed w-4/5 md:w-3/4 lg:w-2/3 left-1/2 -translate-x-1/2 top-0  p-10 bg-white opacity-100 rounded-10 shadow-md  my-10">
                    <p className="w-full flex flex-row justify-between flex-wrap-reverse items-center text-lg font-medium">
                        <span>Edit Skill</span>
                        <Image
                            onClick={onClose}
                            src={"/x-icon.svg"}
                            className="cursor-pointer mb-2"
                            width={27}
                            height={27}
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
                                placeholder="Ex: Sales manager"
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
                                placeholder="Ex: Microsoft"
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
