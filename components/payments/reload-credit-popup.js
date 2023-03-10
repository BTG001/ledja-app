import { useEffect, useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SecondaryBtn from "../buttons/SecondaryBtn";
import Image from "next/image";
import PaymentOptions from "./payment-options";
import Config from "../../Config";
import Utils from "../../Utils";
import axios from "axios";

export default function ReloadCreditPopup({
    showPopup,
    onClose,
    onReloaded,
    wallet,
}) {
    const [currentBalance, setCurrentBalance] = useState(0);
    const [jobCategories, setJobCategories] = useState();
    const [requestFinished, setRequestFinished] = useState(false);
    const [amountType, setamountType] = useState("fixed");
    const [amount, setAmount] = useState(10000);
    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);

    useEffect(() => {
        if (wallet && wallet.amount) {
            setCurrentBalance(wallet.amount);
        }
    }, [wallet]);

    useEffect(() => {
        getJobCategories();
    }, []);

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

        const transactionFormData = new FormData();

        transactionFormData.append("user_id", localStorage.getItem("user_id"));
        transactionFormData.append("type", "Debit");
        transactionFormData.append("amount", amount);
        transactionFormData.append("wallet_id", wallet.id);

        const url = `${Config.API_URL}/transactions`;

        Utils.makeRequest(async () => {
            try {
                const transaction = await Utils.postForm(
                    url,
                    transactionFormData
                );

                console.log("transaction results: ", transaction);

                // onReloaded();
            } catch (error) {
                console.log("transaction Error: ", error);
            }
        });

        onReloaded(); // should be called only when reload is successful. not here.
    };

    async function getJobCategories() {
        const url = `${Config.API_URL}/job_categories`;

        try {
            let jobCategories = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            jobCategories = jobCategories.data.data.data;

            console.log("job categories: ", jobCategories);
            setJobCategories(jobCategories);
            setRequestFinished(true);
        } catch (error) {
            // setErrorMessage("Could not resolve job categories");
            // setShowErrorPopup(true);
            console.log("getting job categories error: ", error);
        }
    }

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
                        Current balance: KSh {currentBalance}
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
                            <p
                                onClick={() => {
                                    setamountType("fixed");
                                    setAmount(2000);
                                }}
                                className={`cursor-pointer text-sm mx-2 px-4 py-1  border border-solid border-primary-70 rounded-md my-2
                            ${
                                amountType == "fixed" && amount == 2000
                                    ? "bg-primary-70 text-white"
                                    : "bg-white text-primary-70"
                            }`}
                            >
                                2,000 KSh
                            </p>
                            <p
                                onClick={() => {
                                    setamountType("fixed");
                                    setAmount(5000);
                                }}
                                className={`cursor-pointer text-sm mx-2 px-4 py-1  border border-solid border-primary-70 rounded-md my-2
                            ${
                                amountType == "fixed" && amount == 5000
                                    ? "bg-primary-70 text-white"
                                    : "bg-white text-primary-70"
                            }`}
                            >
                                5,000 KSh
                            </p>
                            <p
                                onClick={() => {
                                    setamountType("fixed");
                                    setAmount(10000);
                                }}
                                className={`cursor-pointer text-sm  px-4 py-1  border border-solid border-primary-70 rounded-md my-2
                        ${
                            amountType == "fixed" && amount == 10000
                                ? "bg-primary-70 text-white"
                                : "bg-white text-primary-70"
                        }`}
                            >
                                10,000 KSh
                            </p>
                            <p
                                onClick={() => {
                                    setamountType("fixed");
                                    setAmount(20000);
                                }}
                                className={`cursor-pointer text-sm mx-2 px-4 py-1  border border-solid border-primary-70 rounded-md my-2
                            ${
                                amountType == "fixed" && amount == 20000
                                    ? "bg-primary-70 text-white"
                                    : "bg-white text-primary-70"
                            }`}
                            >
                                20,000 KSh
                            </p>
                            <input
                                value={
                                    amountType == "custom" ? amount : undefined
                                }
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setamountType("custom");
                                    setAmount(value);
                                }}
                                type={"number"}
                                className="text-primary-70 px-4 py-1 border border-solid border-primary-70 rounded-md m-2 outline-none focus:outline-solid focus:outline-primary-60 placeholder:text-sm"
                                placeholder="Enter an amount in KSh..."
                            />
                        </div>
                        <p className="text-xs text-dark-50">
                            Or you can reload credit based on the plan you want
                            to choose:
                        </p>
                        <div className="flex flex-row justify-start items-center my-3">
                            {/* <p className="w-max text-sm text-primary-70 px-4 py-2 border border-solid border-primary-70 rounded-md m-2">
                                1 Basic plan =2,000 KSh
                            </p>
                            <p className="w-max text-sm text-primary-70 px-4 py-2 border border-solid border-primary-70 rounded-md m-2">
                                1 Standard plan =11,000 KSh
                            </p>
                            <p className="w-max text-sm text-primary-70 px-4 py-2 border border-solid border-primary-70 rounded-md m-2">
                                1 Premium plan =20,000 KSh
                            </p> */}

                            {!jobCategories && requestFinished && (
                                <p className="text-center w-full text-red-500 border border-solid border-red-500 rounded-lg">
                                    No Job Categories!
                                </p>
                            )}

                            {jobCategories &&
                                jobCategories.map((jobCategory, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setamountType("plan");
                                                setAmount(jobCategory.cost);
                                            }}
                                            className={` cursor-pointer w-max text-sm text-primary-70 px-4 py-2 border border-solid border-primary-70 rounded-md m-2
                                            ${
                                                amountType == "plan" &&
                                                amount == jobCategory.cost
                                                    ? "bg-primary-70 text-white"
                                                    : "bg-white text-primary-70"
                                            }`}
                                        >
                                            1 {jobCategory.type} plan ={" "}
                                            {jobCategory.cost}
                                        </div>
                                    );
                                })}
                        </div>

                        <p className="text-dark-50 text-normal text-left my-3">
                            2. Select a Payment method
                        </p>
                        <PaymentOptions
                            amount={amount}
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
                                Reload KSh {amount || "0"}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}
