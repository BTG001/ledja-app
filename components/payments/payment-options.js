import { useState } from "react";
import Image from "next/image";

export default function PaymentOptions({ onSelectedPaymentMethod }) {
    const [enterMpesaDetails, setEnterMpesaDetails] = useState(false);

    const onPayWithMpesa = () => {
        setEnterMpesaDetails(true);
        onSelectedPaymentMethod();
    };

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
                            placeholder="Ksh 10,000"
                            className="py-2 px-4 border-solid border border-my-gray-70 outline-none placeholder:text-my-gray-70 placeholder:text-sm focus:outline-primary-70 rounded-tr-md rounded-br-md w-1/2"
                        />
                    </div>
                </div>
            )}
            {!enterMpesaDetails && (
                <div>
                    <p className="text-dark-50 text-normal text-left my-3">
                        Mobile money
                    </p>
                    <div className="flex flex-row flex-nowrap justify-start items-center w-24 h-24 shadow-md rounded-md">
                        <Image
                            onClick={onPayWithMpesa}
                            src={"/mpesa.png"}
                            className="cursor-pointer"
                            width={79}
                            height={56}
                        />
                    </div>

                    <p className="text-dark-50 text-normal text-left my-3">
                        Credit card
                    </p>
                    <div className="flex flex-row flex-nowrap justify-start items-center w-24 h-24 shadow-md rounded-md">
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
        </>
    );
}
