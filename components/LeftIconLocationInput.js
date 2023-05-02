import Image from "next/image";

import { useState } from "react";

export default function LeftIconLocationInput({
    value,
    placeholder,
    onTextChange,
}) {
    const [locationFocus, setLocationFocus] = useState(false);
    return (
        <>
            <div className="form-input-container">
                <div
                    className={` border border-solid  rounded-md flex flex-row flex-nowrap justify-start items-center ${
                        locationFocus
                            ? "border-primary-70"
                            : "border-my-gray-70"
                    }`}
                >
                    <Image
                        src={"/map-icon.svg"}
                        width={16}
                        height={19}
                        className="ml-4 cursor-pointer text-primary-70"
                    />
                    <input
                        value={value}
                        onFocus={() => setLocationFocus(true)}
                        onBlur={() => setLocationFocus(false)}
                        className="w-full block outline-none border-none focus:outline-none focus:border-none pr-4 py-1 m-2 placeholder:text-dark-50"
                        type={"text"}
                        onChange={(e) => {
                            const value = e.target.value;
                            onTextChange(value);
                        }}
                        placeholder={placeholder}
                    />
                </div>
            </div>
        </>
    );
}
