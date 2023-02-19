import { useEffect, useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import Image from "next/image";

export default function AddExperiencePopup({ showPopup, onClose, onSuccess }) {
    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);

    const onSave = (e) => {
        e.preventDefault();
        onSuccess();
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
                                Title
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Ex: Sales manager"
                            />
                        </div>

                        <div className="form-input-container my-3 p-2">
                            <label className="form-label-light">
                                Employment type
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Please select"
                            />
                        </div>

                        <div className="form-input-container my-3 p-2">
                            <label className="form-label-light form-label-required">
                                Company name
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Ex: Microsoft"
                            />
                        </div>

                        <div className="form-input-container my-3 p-2">
                            <label className="form-label-light">Location</label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="Ex: Nairobi, Kenya"
                            />
                        </div>
                        <div className="flex flex-row flex-nowrap justify-start items-center">
                            <input className="m-2" type={"checkbox"} />
                            <p>I am currently working in this role</p>
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

                            <div className="form-input-container form-input-container flex flex-row justify-center items-center first-line:">
                                <select className="form-input mr-2">
                                    <option>Year</option>
                                </select>
                                <select className="form-input ml-2">
                                    <option>Month</option>
                                </select>
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

                            <div className="form-input-container form-input-container flex flex-row justify-center items-center first-line:">
                                <select className="form-input mr-2">
                                    <option>Year</option>
                                </select>
                                <select className="form-input ml-2">
                                    <option>Month</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-input-container my-3 p-2">
                            <label className="form-label-light form-label-required">
                                Industry
                            </label>
                            <input
                                className="form-input"
                                type={"text"}
                                placeholder="IT development"
                            />
                        </div>

                        <div className="form-input-container p-2">
                            <label className="form-label-light">
                                Company Introduction
                            </label>

                            <textarea
                                className="form-input"
                                rows={4}
                                placeholder="Hi everyone! I’m a recruiter at ABC company...."
                            ></textarea>
                            <p className="text-right w-full text-sm">0/2,000</p>
                        </div>

                        <div className="flex flex-row justify-center items-center p-2">
                            <input
                                className="submit-btn-left ml-3"
                                type={"submit"}
                                value="Save"
                            />
                        </div>
                    </form>
                </div>
            </>
        )
    );
}
