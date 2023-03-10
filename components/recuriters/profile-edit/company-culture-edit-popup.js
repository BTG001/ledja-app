import { useEffect, useState } from "react";
import Image from "next/image";
import Utils from "../../../Utils";
import Config from "../../../Config";
import axios from "axios";

export default function CompanyCultureEditPopup({
    showPopup,
    onClose,
    onSuccess,
    moreAboutCompany: propMoreAboutCompany,
}) {
    const [loading, setLoading] = useState(false);

    const [moreAboutCompany, setMoreAboutCompany] = useState({});

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);

    useEffect(() => {
        setMoreAboutCompany(propMoreAboutCompany);
    }, [propMoreAboutCompany]);

    const onSubmit = (e) => {
        e.preventDefault();

        const hasErrors = validateValues();

        if (hasErrors) {
            setLoading(false);
            return;
        }

        if (loading) {
            return;
        } else {
            setLoading(true);
        }

        Utils.makeRequest(async () => {
            try {
                const moreAboutCompanyUrl = `${Config.API_URL}/more_about_recruiters/${moreAboutCompany.id}`;
                const params = {
                    company_culture: moreAboutCompany.company_culture,
                };

                const cultureFormData = new FormData();
                let cultureUpdate = await Utils.putForm(
                    moreAboutCompanyUrl,
                    cultureFormData,
                    params
                );

                cultureUpdate = cultureUpdate.data.data;
                setMoreAboutCompany(cultureUpdate);
                console.log("company culture update results: ", cultureUpdate);
                onSuccess(moreAboutCompany);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log("company culture update error: ", error);
            }
        });
    };

    const whenClosed = () => {
        onClose();
    };

    const validateValues = () => {
        let hasErrors = false;
        const theErrors = {};

        if (
            moreAboutCompany.company_culture ==
            propMoreAboutCompany.company_culture
        ) {
            theErrors.company_culture = "Company Culture has not changed";
            hasErrors = true;
        }

        setErrors(theErrors);

        return hasErrors;
    };

    return (
        showPopup && (
            <>
                <div
                    onClick={whenClosed}
                    className="fixed bg-my-gray-70 opacity-40 w-full h-full top-0 left-0 bottom-0 right-0 "
                ></div>
                <div className="z-50 fixed w-4/5 md:w-3/4 lg:w-2/3 left-1/2 -translate-x-1/2 top-0  p-10 bg-white opacity-100 rounded-10 shadow-md  my-10">
                    <form className="form">
                        <div className="h-max max-h-60-screen overflow-y-auto pl-6 pr-6 my-3">
                            <h3 className="form-label">Company Culture</h3>

                            <div className="form-input-container">
                                <textarea
                                    className="form-input"
                                    name="company_culture"
                                    rows={8}
                                    value={
                                        moreAboutCompany.company_culture || ""
                                    }
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        setMoreAboutCompany((prevValues) => {
                                            return {
                                                ...prevValues,
                                                company_culture: value,
                                            };
                                        });
                                    }}
                                ></textarea>
                                <p className="text-red-500 text-left  ">
                                    {errors.company_culture || ""}
                                </p>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                document.body.style.overflowY = "visible";
                            }}
                            className="flex flex-row justify-center items-center my-10 mx-auto"
                        >
                            <button
                                onClick={whenClosed}
                                className="submit-btn-secondary mr-3"
                                type={"button"}
                            >
                                {/* {loading && <span className="loader"></span>} */}
                                {/* {!loading && <span className="">Cancel</span>} */}
                                <span className="">Cancel</span>
                            </button>
                            <button
                                onClick={onSubmit}
                                className="submit-btn-left ml-3"
                                type={"submit"}
                            >
                                {loading && <span className="loader"></span>}
                                {!loading && <span className="">Save</span>}
                            </button>
                            {/* <div className="w-full flex flex-row flex-wrap justify-center items-center ">
                            
                        </div> */}
                        </div>
                    </form>
                </div>
            </>
        )
    );
}
