import { useEffect, useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import Image from "next/image";

export default function NotEnoughCreditPopup({
    showPopup,
    onClose,
    onReloadCredit,
}) {
    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);

    const onChooseOtherPlan = () => {
        onClose();
    };

    return (
        showPopup && (
            <>
                <div
                    onClick={onClose}
                    className="fixed bg-my-gray-70 opacity-40 w-full h-full top-0 left-0 bottom-0 right-0 "
                ></div>
                <div className="z-50 fixed w-4/5 md:w-2/3 lg:w-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2    top-1/2 p-10 bg-white opacity-100 rounded-10 shadow-md">
                    <Image
                        src={"/not-enough-credit-icon.svg"}
                        width={91}
                        height={91}
                        className="my-5 mx-auto"
                    />
                    <h3 className="text-dark-50 text-xl font-medium text-center my-3">
                        Not enough credit
                    </h3>
                    <p className="text-dark-50 font-medium text-md text-center my-3">
                        You don’t have enough credit to publish a job with your
                        selected plan Deposit at least 5,000 Ksh to post a basic
                        job
                    </p>
                    <p className="text-dark-50 text-normal text-center my-3">
                        Current balance: 4,000 KSh
                    </p>

                    <div
                        onClick={() => {
                            document.body.style.overflowY = "visible";
                        }}
                        className="flex flex-row flex-wrap justify-center items-center my-10 mx-auto"
                    >
                        <p
                            className="cursor-pointer w-max my-2 mx-4 py-2 px-5 bg-white text-primary-70  rounded-10 border border-primary-70 border-solid"
                            onClick={onChooseOtherPlan}
                        >
                            Choose other plan
                        </p>
                        <p
                            className="w-max my-2 mx-4 py-2 px-5 bg-primary-70 text-white rounded-10 cursor-pointer"
                            onClick={onReloadCredit}
                        >
                            Reload your credit
                        </p>
                    </div>
                </div>
            </>
        )
    );
}
