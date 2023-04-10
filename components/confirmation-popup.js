import { useEffect, useState } from "react";
import Image from "next/image";

export default function ConfirmationPopup({
    showPopup,
    onYes,
    onClose,
    message = "Are you sure you want to delete this item?",
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
                    <p className="w-full flex flex-row justify-end items-end text-lg font-medium">
                        <Image
                            onClick={onClose}
                            src={"/x-icon.svg"}
                            className="cursor-pointer translate-x-1/3"
                            width={16}
                            height={16}
                        />
                    </p>
                    <Image
                        src={"/warning-icon.svg"}
                        width={80}
                        height={80}
                        className="my-5 mx-auto"
                    />
                    <h3 className="text-xl font-medium text-center w-full">
                        Please Confirm!
                    </h3>
                    <p className="text-dark-50 text-lg  text-center my-3">
                        {message}
                    </p>

                    <div
                        onClick={() => {
                            document.body.style.overflowY = "visible";
                        }}
                        className="flex flex-row flex-wrap justify-center items-center my-10 mx-auto"
                    >
                        <p
                            onClick={onYes}
                            className={
                                "cursor-pointer my-5 mx-4 w-max px-4 py-2  bg-primary-70 rounded-10 text-white "
                            }
                        >
                            Yes
                        </p>

                        <p
                            onClick={onClose}
                            className={
                                "cursor-pointer my-5 mx-4 w-max px-4 py-2  bg-primary-70 rounded-10 text-white "
                            }
                        >
                            No
                        </p>
                    </div>
                </div>
            </>
        )
    );
}
