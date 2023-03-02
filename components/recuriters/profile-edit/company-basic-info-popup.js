import { useEffect, useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import Image from "next/image";

export default function CompanyBasicInfoPopup({
    showPopup,
    onClose,
    onSuccess,
}) {
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
                            Save
                        </p>
                        <p
                            className="cursor-pointer w-max my-2 mx-4 py-2 px-5 bg-white text-primary-70  rounded-10"
                            onClick={whenClosed}
                        >
                            Cancel
                        </p>
                    </div>
                </div>
            </>
        )
    );
}
