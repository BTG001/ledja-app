import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Utils from "../../Utils";
import Config from "../../Config";

export default function PaymentOptions({
    onSelectedPaymentMethod,
    amount,
    selectedPaymentMethod,
    onBack,
    onReloaded,
    recruiter,
    scrollableContainer,
}) {
    const [enterMpesaDetails, setEnterMpesaDetails] = useState(false);
    const [enterCardDetails, setEnterCardDetails] = useState(false);

    const [mpesaDetails, setMpesaDetails] = useState({});
    const [cardDetails, setCardDetails] = useState({});

    const [paymentLoading, setPaymentLoading] = useState(false);

    const [OTPCode, setOTPCode] = useState(null);
    const [paymentInitiated, setPaymentInitiated] = useState(false);
    const OTPContainer = useRef();

    const [failedMessage, setFailedMessage] = useState("");

    const onPayWithMpesa = () => {
        setEnterMpesaDetails(true);
        setEnterCardDetails(false);
        onSelectedPaymentMethod("mpesa");
    };

    const monthEmptyValue = "Select Month";
    const onPayWithCard = () => {
        setCardDetails({});
        setPaymentInitiated(false);
        setOTPCode(null);
        setEnterMpesaDetails(false);
        setEnterCardDetails(true);
        onSelectedPaymentMethod("card");
    };

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!selectedPaymentMethod) {
            setEnterMpesaDetails(false);
            setEnterCardDetails(false);
        }
    }, [selectedPaymentMethod]);

    const onReloadCreditWithCard = () => {
        if (!selectedPaymentMethod) {
            return;
        }

        if (paymentLoading) {
            return;
        } else {
            setPaymentLoading(true);
        }

        const hasErrors = verifyCardDetails();

        if (hasErrors) {
            setPaymentLoading(false);
            return;
        }

        document.body.style.overflowY = "visible";

        const url = `${Config.API_URL}/intiate_payment`;
        console.log("card Details: ", cardDetails);

        const values = {
            amount: `${amount}`,
            currency: "KES",
            email: recruiter.email,
            card_number: cardDetails.card_number,
            cvv: cardDetails.cvv,
            expiry_month: "04", //parseInt(cardDetails.expiry_month) + 1,
            expiry_year: cardDetails.expiry_year,
            redirect_url: location.href,
        };

        if (recruiter && recruiter.about_recruiter) {
            values.fullname = `${recruiter.about_recruiter.fname} ${recruiter.about_recruiter.lname}`;
            values.phone_number = recruiter.about_recruiter.phone_no;
        }

        console.log("values: ", values);

        Utils.makeRequest(async () => {
            try {
                let transaction = await axios.post(url, values, {
                    headers: Utils.getHeaders(),
                });

                transaction = transaction.data.data;

                console.log("transaction results: ", transaction);

                setPaymentLoading(false);
                setPaymentInitiated(true);
                setFailedMessage("");
                // OTPContainer.current.scrollIntoView(false);
            } catch (error) {
                setPaymentLoading(false);
                console.log("transaction Error: ", error);
            }
        });
    };

    const onAuthorizePayment = () => {
        if (paymentLoading) {
            return;
        } else {
            setPaymentLoading(true);
        }

        const hasErrors = verifyCardDetails();

        if (hasErrors) {
            setPaymentLoading(false);
            return;
        }

        document.body.style.overflowY = "visible";

        const url = `${Config.API_URL}/authorize_payment`;
        console.log("card Details: ", cardDetails);

        const values = {
            amount: `${amount}`,
            currency: "KES",
            email: recruiter.email,
            card_number: cardDetails.card_number,
            cvv: cardDetails.cvv,
            expiry_month: parseInt(cardDetails.expiry_month) + 1,
            expiry_year: cardDetails.expiry_year,
            redirect_url: location.href,
        };

        if (recruiter && recruiter.about_recruiter) {
            values.fullname = `${recruiter.about_recruiter.fname} ${recruiter.about_recruiter.lname}`;
            values.phone_number = recruiter.about_recruiter.phone_no;
        }

        values.authorization = {
            mode: "pin",
            pin: `${OTPCode}`,
        };

        console.log("values: ", values);

        Utils.makeRequest(async () => {
            try {
                const authorizationURL = `${Config.API_URL}/authorize_payment`;

                let authorization = await axios.post(authorizationURL, values, {
                    headers: Utils.getHeaders(),
                });

                console.log("authorization Result: ", authorization);

                authorization = authorization.data.data;

                console.log("Authorization: ", authorization);
                setPaymentLoading(false);

                if (!authorization.data) {
                    setFailedMessage(authorization);
                } else {
                    setFailedMessage("");
                    localStorage.setItem(
                        "payment_authorization_id",
                        authorization.data.id
                    );
                    localStorage.setItem("payment_amount", amount);
                    const redirectURL =
                        authorization.meta.authorization.redirect;
                    location.href = redirectURL;

                    // onVerifyPayment(authorization.data.id);
                }
            } catch (error) {
                setPaymentLoading(false);
                console.log("transaction Error: ", error);
            }
        });
    };

    const onReloadCreditWithMPesa = () => {
        if (!selectedPaymentMethod) {
            return;
        }

        if (paymentLoading) {
            return;
        } else {
            setPaymentLoading(true);
        }

        const hasErrors = verifyMpesaDetails();

        if (hasErrors) {
            setPaymentLoading(false);
            return;
        }

        document.body.style.overflowY = "visible";

        const url = `${Config.API_URL}/mpesa_pay`;

        const values = {
            phone_number: `254${mpesaDetails.phone_number}`,
            amount: amount,
            currency: "KES",
            email: recruiter.email,
        };

        if (recruiter && recruiter.about_recruiter) {
            values.fullname = `${recruiter.about_recruiter.fname} ${recruiter.about_recruiter.lname}`;
        }

        console.log("values: ", values);

        Utils.makeRequest(async () => {
            try {
                let transaction = await axios.post(url, values, {
                    headers: Utils.getHeaders(),
                });

                transaction = transaction.data.data;

                console.log("transaction results: ", transaction);

                setMpesaDetails({});

                onReloaded(transaction.wallet || {}, amount);
            } catch (error) {
                console.log("transaction Error: ", error);
            }
        });
    };

    function verifyMpesaDetails() {
        const theErrors = {};
        let hasErrors = false;

        if (!mpesaDetails.phone_number) {
            hasErrors = true;
            theErrors.phone_number = "Phone number is required";
        }

        if (!amount) {
            hasErrors = true;
            theErrors.amount = "Amount is Required";
        }

        setErrors(theErrors);
        return hasErrors;
    }

    function verifyCardDetails() {
        const theErrors = {};
        let hasErrors = false;

        if (!cardDetails.card_number) {
            theErrors.card_number = "Card number is required";
        }

        if (!cardDetails.cvv) {
            theErrors.cvv = "CVV is required";
        }

        if (!cardDetails.expiry_month) {
            theErrors.expiry_month = "Expiry month is required";
        }

        if (!cardDetails.expiry_year) {
            theErrors.expiry_year = "Expiry Year is required";
        }

        if (!amount) {
            theErrors.amount = "Amount is Required";
        }

        setErrors(theErrors);
        return hasErrors;
    }
    return (
        <>
            {enterMpesaDetails && (
                <div>
                    <p className="text-dark-50 text-normal text-left my-3">
                        Pay via M-Pesa
                    </p>
                    <p className="text-dark-50 text-sm text-left my-3">
                        Enter your payment details
                    </p>
                    <div className="flex flex-row flex-nowrap justify-start items-enter m-2 ml-0 rounded-md">
                        <p className="text-dark-50 p-2 border border-solid border-r-0 border-my-gray-70  rounded-tl-md rounded-bl-md">
                            +254
                        </p>
                        <input
                            value={mpesaDetails.phone_number}
                            onChange={(e) => {
                                const value = e.target.value;

                                setMpesaDetails((prevValues) => {
                                    return {
                                        ...prevValues,
                                        phone_number: value,
                                    };
                                });
                            }}
                            placeholder="M-Pesa business mobile number"
                            className="py-2 px-4 border-solid border border-my-gray-70 outline-none placeholder:text-my-gray-70 placeholder:text-sm focus:border-primary-70 rounded-tr-md rounded-br-md w-1/2"
                        />
                    </div>
                    <p className="text-dark-50 text-sm text-left my-3">
                        Total Amount
                    </p>
                    <div className="flex flex-row flex-nowrap justify-start items-enter m-2 ml-0">
                        <p className="text-dark-50 p-2 pl-4 border border-r-0 border-solid border-my-gray-70 rounded-tl-md rounded-bl-md">
                            KSh
                        </p>
                        <input
                            disabled
                            placeholder="e.g Ksh 10,000"
                            value={amount}
                            className="py-2 px-4 border-solid border border-my-gray-70 outline-none placeholder:text-my-gray-70 placeholder:text-sm focus:outline-primary-70 rounded-tr-md rounded-br-md w-1/2"
                        />
                    </div>
                    <p className="text-red-500 text-left">
                        {errors.phone_number || ""}
                    </p>
                </div>
            )}

            {enterCardDetails && (
                <div>
                    <p className="text-dark-50 text-normal text-left my-3">
                        Pay via Card
                    </p>
                    <p className="text-dark-50 text-sm text-left my-3">
                        Enter your payment details
                    </p>
                    <div className="flex flex-row flex-nowrap justify-start items-enter m-2 ml-0 rounded-md">
                        <p className="text-dark-50 p-2 border border-solid border-r-0 border-my-gray-70  rounded-tl-md rounded-bl-md">
                            Card Number
                        </p>
                        <input
                            value={cardDetails.card_number}
                            onChange={(e) => {
                                const value = e.target.value;

                                setCardDetails((prevValues) => {
                                    return {
                                        ...prevValues,
                                        card_number: value,
                                    };
                                });
                            }}
                            placeholder="Card Number"
                            className="py-2 px-4 border-solid border border-my-gray-70 outline-none placeholder:text-my-gray-70 placeholder:text-sm focus:border-primary-70 rounded-tr-md rounded-br-md w-1/2"
                        />
                    </div>
                    <p className="text-red-500 text-left">
                        {errors.card_number || ""}
                    </p>
                    <div className="flex flex-row flex-nowrap justify-start items-enter m-2 ml-0 rounded-md">
                        <p className="text-dark-50 p-2 border border-solid border-r-0 border-my-gray-70  rounded-tl-md rounded-bl-md">
                            CVV
                        </p>
                        <input
                            value={cardDetails.cvv}
                            onChange={(e) => {
                                const value = e.target.value;

                                setCardDetails((prevValues) => {
                                    return {
                                        ...prevValues,
                                        cvv: value,
                                    };
                                });
                            }}
                            placeholder="CVV"
                            className="w-max py-2 px-4 border-solid border border-my-gray-70 outline-none placeholder:text-my-gray-70 placeholder:text-sm focus:border-primary-70 rounded-tr-md rounded-br-md"
                        />
                    </div>
                    <p className="text-red-500 text-left">{errors.cvv || ""}</p>
                    <div className="flex flex-row flex-nowrap justify-start items-enter m-2 ml-0 rounded-md">
                        <p className="text-dark-50 my-2  p-2 border border-solid border-r-0 border-my-gray-70  rounded-tl-md rounded-bl-md">
                            Expiry
                        </p>
                        {/* <input
                            value={cardDetails.expiry_month}
                            onChange={(e) => {
                                const value = e.target.value;

                                setCardDetails((prevValues) => {
                                    return {
                                        ...prevValues,
                                        expiry_month: value,
                                    };
                                });
                            }}
                            placeholder="Month"
                            type="month"
                            className=" w-max m-2 ml-0 py-2 px-4 border-solid border border-my-gray-70 outline-none placeholder:text-my-gray-70 placeholder:text-sm focus:border-primary-70 rounded-tr-md rounded-br-md"
                        /> */}
                        <select
                            className="w-max m-2 ml-0 py-2 px-4 border-solid border border-my-gray-70 outline-none placeholder:text-my-gray-70 placeholder:text-sm focus:border-primary-70 rounded-tr-md rounded-br-md"
                            value={cardDetails.expiry_month}
                            onChange={(e) => {
                                const value = e.target.value;

                                console.log(
                                    "changed month: ",
                                    value,
                                    cardDetails
                                );

                                if (value == monthEmptyValue) {
                                    setCardDetails((prevValues) => {
                                        return {
                                            ...prevValues,
                                            expiry_month: null,
                                        };
                                    });
                                    return;
                                }

                                setCardDetails((prevValues) => {
                                    return {
                                        ...prevValues,
                                        expiry_month: value,
                                    };
                                });
                            }}
                        >
                            <option value={monthEmptyValue}>
                                {monthEmptyValue}
                            </option>
                            {Config.MONTH_NAMES.map((monthName, index) => {
                                return (
                                    <option value={index}>{monthName}</option>
                                );
                            })}
                        </select>

                        <input
                            value={cardDetails.expiry_year}
                            onChange={(e) => {
                                const value = e.target.value;

                                setCardDetails((prevValues) => {
                                    return {
                                        ...prevValues,
                                        expiry_year: value,
                                    };
                                });
                            }}
                            placeholder="Year"
                            type="Number"
                            min={new Date().getFullYear()}
                            className="m-2 w-max py-2 px-4 border-solid border border-my-gray-70 outline-none placeholder:text-my-gray-70 placeholder:text-sm focus:border-primary-70 rounded-md "
                        />
                    </div>
                    <p className="text-red-500 text-left">
                        {errors.expiry_month || ""}
                    </p>
                    <p className="text-red-500 text-left">
                        {errors.expiry_year || ""}
                    </p>
                    <p className="text-dark-50 text-sm text-left my-3">
                        Total Amount
                    </p>
                    <div className="flex flex-row flex-nowrap justify-start items-enter m-2 ml-0">
                        <p className="text-dark-50 p-2 pl-4 border border-r-0 border-solid border-my-gray-70 rounded-tl-md rounded-bl-md">
                            KSh
                        </p>
                        <input
                            disabled
                            placeholder="e.g Ksh 10,000"
                            value={amount}
                            className="py-2 px-4 border-solid border border-my-gray-70 outline-none placeholder:text-my-gray-70 placeholder:text-sm focus:outline-primary-70 rounded-tr-md rounded-br-md w-1/2"
                        />
                    </div>
                    {paymentInitiated && (
                        <div>
                            <p className="text-dark-50 text-sm text-left my-3">
                                Code Sent to your Email and Phone Number
                            </p>
                            <div
                                ref={OTPContainer}
                                className="flex flex-row flex-nowrap justify-start items-enter m-2 ml-0"
                            >
                                <p className="text-dark-50 p-2 pl-4 border border-r-0 border-solid border-my-gray-70 rounded-tl-md rounded-bl-md">
                                    OTP Code
                                </p>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setOTPCode(value);
                                    }}
                                    placeholder="e.g 7919"
                                    value={OTPCode}
                                    className="py-2 px-4 border-solid border border-my-gray-70 outline-none placeholder:text-my-gray-70 placeholder:text-sm focus:border-primary-70 rounded-tr-md rounded-br-md w-1/2"
                                />
                            </div>
                            <p className="text-red-500 text-left">
                                {failedMessage || ""}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {!enterMpesaDetails && !enterCardDetails && (
                <div>
                    <p className="text-dark-50 text-normal text-left my-3">
                        Mobile money
                    </p>
                    <div
                        onClick={onPayWithMpesa}
                        className="cursor-pointer flex flex-row flex-nowrap justify-start items-center w-24 h-24 shadow-md rounded-md"
                    >
                        <Image
                            src={"/mpesa.png"}
                            className="cursor-pointer"
                            width={79}
                            height={56}
                        />
                    </div>

                    <p className="text-dark-50 text-normal text-left my-3">
                        Credit card
                    </p>
                    <div
                        onClick={onPayWithCard}
                        className="cursor-pointer flex flex-row flex-nowrap justify-start items-center w-24 h-24 shadow-md rounded-md"
                    >
                        <Image
                            src={"/visa.png"}
                            className="cursor-pointer"
                            width={49}
                            height={16}
                        />
                        <Image
                            src={"/mastercard.png"}
                            className="cursor-pointer"
                            width={39}
                            height={30}
                        />
                    </div>
                </div>
            )}

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
                    onClick={() => {
                        if (paymentInitiated) {
                            onAuthorizePayment(OTPCode);
                        } else {
                            if (selectedPaymentMethod == "mpesa") {
                                onReloadCreditWithMPesa();
                            } else if (selectedPaymentMethod == "card") {
                                onReloadCreditWithCard();
                            }
                        }
                    }}
                >
                    {paymentLoading && <span className="loader"></span>}
                    {!paymentLoading && (
                        <span className="">
                            {paymentInitiated ? "Authorize payment to " : ""}
                            Reload KSh {amount || "0"}
                        </span>
                    )}
                </p>
            </div>
        </>
    );
}
