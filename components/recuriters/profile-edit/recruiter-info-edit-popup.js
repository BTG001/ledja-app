import { useEffect, useState } from "react";
import Image from "next/image";
import Utils from "../../../Utils";
import Config from "../../../Config";
import axios from "axios";

export default function RecruiterInfoEditPopup({
    showPopup,
    onClose,
    onSuccess,
    recruiterInfo: propRecruiterInfo,
}) {
    const [loading, setLoading] = useState(false);

    const [recruiterInfo, setRecruiterInfo] = useState({});

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);

    useEffect(() => {
        setRecruiterInfo(propRecruiterInfo);
    }, [propRecruiterInfo]);

    const onSubmit = (e) => {
        e.preventDefault();

        // const hasErrors = validateValues();

        // if (hasErrors) {
        //     setLoading(false);
        //     return;
        // }

        const recruiterInfoFormData = new FormData();

        Object.keys(recruiterInfo).map((key) => {
            if (recruiterInfo[key] != propRecruiterInfo[key]) {
                recruiterInfoFormData.append(key, recruiterInfo[key]);
            }
        });

        if (loading) {
            return;
        } else {
            setLoading(true);
        }

        Utils.makeRequest(async () => {
            try {
                const recruiterInfoURL = `${Config.API_URL}/about_recruiters/${recruiterInfo.id}`;

                let recruiterInfoUpdate = await Utils.putForm(
                    recruiterInfoURL,
                    recruiterInfoFormData
                );

                recruiterInfoUpdate = recruiterInfoUpdate.data.data;

                console.log(
                    "company culture update results: ",
                    recruiterInfoUpdate
                );
                onSuccess(recruiterInfoUpdate);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log("recruiter info update error: ", error);
            }
        });
    };

    const whenClosed = () => {
        onClose();
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
                            <div className="grid grid-cols-2 gap-6">
                                <div className="form-input-container">
                                    <label
                                        className="form-label-light form-label-required"
                                        for="firstName"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"text"}
                                        placeholder="Jennifer"
                                        name="fname"
                                        value={recruiterInfo.fname}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setRecruiterInfo((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    fname: value,
                                                };
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-input-container">
                                    <label
                                        className="form-label-light form-label-required"
                                        for="lastName"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"text"}
                                        placeholder="Smith"
                                        name="lname"
                                        value={recruiterInfo.lname}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setRecruiterInfo((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    lname: value,
                                                };
                                            });
                                        }}
                                    />
                                </div>
                            </div>

                            <div className=" md:grid md:grid-cols-2 md:gap-6">
                                <div className="form-input-container">
                                    <label
                                        className="form-label-light form-label-required"
                                        for="text"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"text"}
                                        placeholder="000-000-0000"
                                        name="phone_no"
                                        value={recruiterInfo.phone_no}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setRecruiterInfo((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    phone_no: value,
                                                };
                                            });
                                        }}
                                    />
                                </div>

                                {/* <div className="form-input-container">
                                    <label
                                        className="form-label-light form-label-required"
                                        for="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"email"}
                                        placeholder="Jennifer@abccompany.com"
                                        name="email"
                                        value={recruiterInfo.email}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setRecruiterInfo((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    email: value,
                                                };
                                            });
                                        }}
                                    />
                                </div> */}
                            </div>

                            <div className="form-input-container">
                                <label
                                    className="form-label-light form-label-required"
                                    for="position-title"
                                >
                                    Position / Title
                                </label>
                                <input
                                    className="form-input"
                                    type={"text"}
                                    placeholder="talent acquisition specialist"
                                    name="company_position"
                                    value={recruiterInfo.company_position}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        setRecruiterInfo((prevValues) => {
                                            return {
                                                ...prevValues,
                                                company_position: value,
                                            };
                                        });
                                    }}
                                />
                            </div>

                            {/* <div className="form-input-container">
                                <label
                                    className="form-label-light form-label-required"
                                    for="location"
                                >
                                    Location
                                </label>
                                <input
                                    className="form-input"
                                    type={"text"}
                                    name="location"
                                    placeholder="Nairobi, Kenya"
                                    value={recruiterInfo.location}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        setRecruiterInfo((prevValues) => {
                                            return {
                                                ...prevValues,
                                                location: value,
                                            };
                                        });
                                    }}
                                />
                            </div> */}
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
