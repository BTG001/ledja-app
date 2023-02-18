import { useEffect, useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import Image from "next/image";
import PaymentOptions from "./payment-options";

export default function ReloadCreditPopup({ showPopup, onClose, onReloaded }) {
    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);

    const onBack = () => {
        if (selectedPaymentMethod) {
            setSelectedPaymentMethod(false);
            return;
        }
        document.body.style.overflowY = "visible";
        onClose();
    };

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(false);

    const onSelectedPaymentMethod = () => {
        setSelectedPaymentMethod(true);
    };

    const onReloadCredit = () => {
        if (!selectedPaymentMethod) {
            return;
        }
        document.body.style.overflowY = "visible";
        onReloaded();
    };

    return (
        showPopup && (
            <>
                <div
                    onClick={onClose}
                    className="fixed bg-my-gray-70 opacity-40 w-full h-full top-0 left-0 bottom-0 right-0 "
                ></div>
                <div className="z-50 fixed w-4/5 md:w-3/4 lg:w-2/3 left-1/2 -translate-x-1/2 top-0  p-10 bg-white opacity-100 rounded-10 shadow-md  my-10">
                    <p className="w-full flex flex-row justify-end items-center text-lg font-medium">
                        <Image
                            onClick={onClose}
                            src={"/x-icon.svg"}
                            className="cursor-pointer"
                            width={27}
                            height={27}
                        />
                    </p>
                    <h3 className="text-dark-70 text-xl font-medium text-left my-3">
                        Reload Your Credit
                    </h3>
                    <p className="text-dark-50 font-medium text-md text-left my-3">
                        Current balance: KSh 4,000
                    </p>
                    <div className="h-max max-h-50-screen overflow-y-auto pr-6 my-3">
                        <p className="text-dark-50 text-normal text-left my-3">
                            1. Select your amount
                        </p>
                        <p className="text-xs text-dark-50">
                            How much do you want to add to your LEDJA account
                            balance?
                        </p>
                        <div className="flex flex-row justify-start items-center my-3">
                            <p className="text-sm text-white px-4 py-1 bg-primary-70 border border-solid border-primary-70 rounded-md my-2">
                                2,000 KSh
                            </p>
                            <p className="text-sm text-primary-70 px-4 py-1 border border-solid border-primary-70 rounded-md m-2">
                                5,000 KSh
                            </p>
                            <p className="text-sm text-primary-70 px-4 py-1 border border-solid border-primary-70 rounded-md m-2">
                                10,000 KSh
                            </p>
                            <p className="text-sm text-primary-70 px-4 py-1 border border-solid border-primary-70 rounded-md m-2">
                                20,000 KSh
                            </p>
                            <input
                                className="text-primary-70 px-4 py-1 border border-solid border-primary-70 rounded-md m-2 outline-none focus:outline-solid focus:outline-primary-60 placeholder:text-sm"
                                placeholder="Enter an amount in KSh..."
                            />
                        </div>
                        <p className="text-xs text-dark-50">
                            Or you can reload credit based on the plan you want
                            to choose:
                        </p>
                        <div className="flex flex-row justify-start items-center my-3">
                            <p className="w-max text-sm text-primary-70 px-4 py-2 border border-solid border-primary-70 rounded-md m-2">
                                1 Basic plan =2,000 KSh
                            </p>
                            <p className="w-max text-sm text-primary-70 px-4 py-2 border border-solid border-primary-70 rounded-md m-2">
                                1 Standard plan =11,000 KSh
                            </p>
                            <p className="w-max text-sm text-primary-70 px-4 py-2 border border-solid border-primary-70 rounded-md m-2">
                                1 Premium plan =20,000 KSh
                            </p>
                        </div>
                        <p className="text-dark-50 text-normal text-left my-3">
                            2. Select a Payment method
                        </p>
                        <PaymentOptions
                            onSelectedPaymentMethod={onSelectedPaymentMethod}
                        />

                        <div className="flex flex-row flex-wrap justify-center items-center my-10 mx-auto">
                            <p
                                className="w-max my-2 mx-4 py-2 px-5  bg-white border border-solid border-primary-70 rounded-10 cursor-pointer"
                                onClick={onBack}
                            >
                                Back
                            </p>
                            <p
                                className={`w-max my-2 mx-4 py-2 px-5 ${
                                    selectedPaymentMethod
                                        ? "bg-primary-70 text-white"
                                        : "bg-my-gray-60 text-my-gray-70"
                                } rounded-10 cursor-pointer`}
                                onClick={onReloadCredit}
                            >
                                Reload KSh 2,000
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}
