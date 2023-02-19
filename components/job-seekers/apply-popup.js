import { useEffect, useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import Image from "next/image";

export default function ApplyPopup({ showPopup, onClose, onSuccess }) {
    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);

    const onSubmit = () => {
        onSuccess();
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
                    <p className="w-full flex flex-row justify-between flex-wrap-reverse items-center text-lg font-medium">
                        <span>Review your application</span>
                        <Image
                            onClick={onClose}
                            src={"/x-icon.svg"}
                            className="cursor-pointer"
                            width={27}
                            height={27}
                        />
                    </p>
                    <section className=" h-max max-h-60-screen overflow-y-scroll pr-6 my-3">
                        <div className="form-input-container ">
                            <p className="flex flex-row flex-nowrap justify-between items-center w-full p-2">
                                <label
                                    className="form-label-light"
                                    for="websites"
                                >
                                    About Me
                                </label>
                                <span className="text-primary-70">Edit</span>
                            </p>
                            <div
                                className={
                                    "mt-4 p-5 border border-solid border-my-gray-70  rounded-10 grid grid-cols-3 gap-3 "
                                }
                            >
                                <Image
                                    src={"/user.png"}
                                    width={145}
                                    height={175}
                                />
                                <div className="flex flex-col flex-nowrap justify-start items-start">
                                    <h3 className="font-medium text-xl text-dark-50 my-5">
                                        Jennifer Musugu
                                    </h3>
                                    <p className="text-sm text-dark-50">
                                        Software Engineer
                                    </p>
                                    <p className="text-sm text-dark-50">
                                        Nairobi, Kenya
                                    </p>
                                    <p className="flex flex-row flex-nowrap justify-between items-center mt-5 mb-2">
                                        <Image
                                            src={"/email.svg"}
                                            width={15}
                                            height={15}
                                            className="mr-3"
                                        />
                                        <span>Jennifer@gmail.com</span>
                                    </p>
                                    <p className="flex flex-row flex-nowrap justify-between items-center">
                                        <Image
                                            src={"/phone.svg"}
                                            width={15}
                                            height={15}
                                            className="mr-3"
                                        />
                                        <span>123-123-1234</span>
                                    </p>
                                </div>

                                <div className="flex flex-row flex-nowrap justify-center items-start my-3">
                                    <div className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50 mx-2">
                                        <Image
                                            src={"/linkedin.svg"}
                                            width={14}
                                            height={9}
                                        />
                                    </div>
                                    <div className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50 mx-2">
                                        <Image
                                            src={"/twitter.svg"}
                                            width={13}
                                            height={11}
                                        />
                                    </div>
                                    <div className="flex justify-center items-center w-8 h-8 rounded-full bg-my-gray-50 mx-2">
                                        <Image
                                            src={"/facebook.svg"}
                                            width={8}
                                            height={6}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-input-container ">
                            <div className="flex flex-row flex-nowrap justify-between items-center">
                                <label
                                    className="form-label-light"
                                    for="websites"
                                >
                                    Work Experience
                                </label>
                                <span className="text-primary-70 cursor-pointer text-sm">
                                    Edit
                                </span>
                            </div>
                            <div className="mt-4 border border-solid border-my-gray-70  rounded-md">
                                <div
                                    className={
                                        "my-3 px-4 py-1  flex flex-col flex-nowrap justify-start items-start"
                                    }
                                >
                                    <p className="text-lg text-dark-50 my-1">
                                        Software Engineer
                                    </p>
                                    <p className="text-dark-50 text-sm my-1">
                                        ABC Tech Inc
                                    </p>
                                    <p className="text-my-gray-70 text-xs my-1">
                                        Apr. 2019 - Sep. 2022
                                    </p>
                                    <p className="text-dark-50 text-xs">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Cras vehicula nisi at
                                        euismod auctor. Duis sed mi ut odio
                                        ornare euismod. Duis eu lectus
                                        porttitor, aliquam arcu vel, tincidunt
                                        diam. Duis in purus nec eros posuere
                                        tincidunt euismod nec ex. Nunc at auctor
                                        nulla.{" "}
                                    </p>
                                </div>
                                <div
                                    className={
                                        "my-3 px-4 py-1  flex flex-col flex-nowrap justify-start items-start"
                                    }
                                >
                                    <p className="text-lg text-dark-50 my-1">
                                        Software Engineer Intern
                                    </p>
                                    <p className="text-dark-50 text-sm my-1">
                                        ABC Systems Inc
                                    </p>
                                    <p className="text-my-gray-70 text-xs my-1">
                                        Jan. 2019 - Mar. 2019
                                    </p>
                                    <p className="text-dark-50 text-xs">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Cras vehicula nisi at
                                        euismod auctor. Duis sed mi ut odio
                                        ornare euismod. Duis eu lectus
                                        porttitor, aliquam arcu vel, tincidunt
                                        diam. Duis in purus nec eros posuere
                                        tincidunt euismod nec ex. Nunc at auctor
                                        nulla.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="form-input-container ">
                            <div className="flex flex-row flex-nowrap justify-between items-center">
                                <label
                                    className="form-label-light"
                                    for="websites"
                                >
                                    Education
                                </label>
                                <span className="text-primary-70 cursor-pointer text-sm">
                                    Edit
                                </span>
                            </div>
                            <div
                                className={
                                    "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                                }
                            >
                                <Image
                                    src={"/plus-icon.svg"}
                                    width={9}
                                    height={9}
                                    className="m-2"
                                />
                                <span className="text-xs text-primary-70">
                                    Add
                                </span>
                            </div>
                        </div>

                        <div className="form-input-container ">
                            <div className="flex flex-row flex-nowrap justify-between items-center">
                                <label
                                    className="form-label-light"
                                    for="websites"
                                >
                                    Skills
                                </label>
                                <span className="text-primary-70 cursor-pointer text-sm">
                                    Edit
                                </span>
                            </div>
                            <div
                                className={
                                    "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                                }
                            >
                                <Image
                                    src={"/plus-icon.svg"}
                                    width={9}
                                    height={9}
                                    className="m-2"
                                />
                                <span className="text-xs text-primary-70">
                                    Add
                                </span>
                            </div>
                        </div>

                        <div className="form-input-container ">
                            <div className="flex flex-row flex-nowrap justify-between items-center">
                                <label
                                    className="form-label-light"
                                    for="websites"
                                >
                                    Assessment Text
                                </label>
                                <span className="text-primary-70 cursor-pointer text-sm">
                                    Edit
                                </span>
                            </div>
                            <div
                                className={
                                    "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                                }
                            >
                                <Image
                                    src={"/plus-icon.svg"}
                                    width={9}
                                    height={9}
                                    className="m-2"
                                />
                                <span className="text-xs text-primary-70">
                                    Add
                                </span>
                            </div>
                        </div>

                        <div className="form-input-container ">
                            <div className="flex flex-row flex-nowrap justify-between items-center">
                                <label
                                    className="form-label-light"
                                    for="websites"
                                >
                                    Resume
                                </label>
                                <span className="text-primary-70 cursor-pointer text-sm">
                                    Edit
                                </span>
                            </div>
                            <div
                                className={
                                    "mt-4 px-4 py-1 border border-solid border-my-gray-70  rounded-md flex flex-row flex-nowrap justify-start items-center"
                                }
                            >
                                <Image
                                    src={"/plus-icon.svg"}
                                    width={9}
                                    height={9}
                                    className="m-2"
                                />
                                <span className="text-xs text-primary-70">
                                    Add
                                </span>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                document.body.style.overflowY = "visible";
                            }}
                            className="flex flex-col justify-center items-center my-10 mx-auto"
                        >
                            <p
                                className="w-max my-2 mx-4 py-2 px-5 bg-primary-70 text-white rounded-10 cursor-pointer"
                                onClick={onSubmit}
                            >
                                Submit your application
                            </p>
                            <p
                                className="cursor-pointer w-max my-2 mx-4 py-2 px-5 bg-white text-primary-70  rounded-10"
                                onClick={whenClosed}
                            >
                                Cancel
                            </p>
                        </div>
                    </section>
                </div>
            </>
        )
    );
}
