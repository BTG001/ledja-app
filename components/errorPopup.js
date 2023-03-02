import { useEffect, useState } from "react";
import { MdError } from "react-icons/md";

export default function ErrorPopup({
    showPopup,
    onClose,
    message,
    messageArray,
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
                <div className="z-50 fixed w-3/4 md:w-1/2 lg:w-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2    top-1/2 p-5 bg-white opacity-100 rounded-10 shadow-md">
                    <MdError className="my-5 mx-auto text-red-500 text-8xl" />
                    <h3 className="text-dark-50 text-xl font-medium text-center my-3">
                        Error
                    </h3>
                    <div className="text-dark-50 font-medium text-md text-center my-3">
                        {messageArray &&
                            messageArray.map((message) => {
                                return (
                                    <p className="text-red-500 border border-solid border-red-5-500 my-1">
                                        {message}
                                    </p>
                                );
                            })}

                        {message && !messageArray && (
                            <p className="text-red-500 border border-solid border-red-5-500 my-1">
                                {message}
                            </p>
                        )}
                    </div>
                    <div
                        onClick={() => {
                            document.body.style.overflowY = "visible";
                        }}
                        className="flex flex-row flex-wrap justify-center items-center my-5 mx-auto"
                    >
                        <p
                            className="w-max my-2 mx-4 py-2 px-5 bg-primary-70 text-white rounded-10 cursor-pointer"
                            onClick={onClose}
                        >
                            Okay
                        </p>
                    </div>
                </div>
            </>
        )
    );
}
