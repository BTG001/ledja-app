import { HiOutlineUserCircle } from "react-icons/hi";

import { useEffect, useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import Image from "next/image";

export default function IncompleteRecruiterProfilePopup({
    showPopup,
    onClose,
    pathToIncompleteStep,
}) {
    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);
    return (
        showPopup && (
            <>
                <div
                    onClick={onClose}
                    className="fixed bg-my-gray-70 opacity-40 w-full h-full top-0 left-0 bottom-0 right-0 "
                ></div>
                <div className="z-50 fixed w-4/5 md:w-2/3 lg:w-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2    top-1/2 p-10 bg-white opacity-100 rounded-10 shadow-md">
                    <div className="flex flex-row justify-center items-center p-2">
                        <HiOutlineUserCircle
                            className="text-primary-70 bg-white text-6xl"
                            width={80}
                            height={80}
                        />
                    </div>
                    <h3 className="text-dark-50 text-xl font-medium text-center my-3">
                        Incomplete profile
                    </h3>
                    <p className="text-dark-50 font-normal text-md text-center my-3">
                        You haven’t finished your company profile.
                        <br /> Do you want to finish it now?
                    </p>

                    <div
                        onClick={() => {
                            document.body.style.overflowY = "visible";
                        }}
                        className="flex flex-row flex-wrap justify-center items-center my-10 mx-auto"
                    >
                        <p
                            className="cursor-pointer w-max my-2 mx-4 py-2 px-5 bg-white text-primary-70  rounded-10 border border-primary-70 border-solid"
                            onClick={onClose}
                        >
                            I’ll do it later
                        </p>
                        <PrimaryBtn
                            text={"Finish now"}
                            path={pathToIncompleteStep}
                            className={"my-5 mx-4 w-max"}
                        />
                    </div>
                </div>
            </>
        )
    );
}
