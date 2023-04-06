import Image from "next/image";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
export default function SkillsAssessmentSelect({
    placeholder,
    options,
    value,
    className,
    onChangeActiveValue,
}) {
    const [selectFocus, setSelectFocus] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    return (
        <>
            <div
                onClick={() => {
                    setShowOptions((prevValue) => {
                        return !prevValue;
                    });
                }}
                className={`text-left relative cursor-pointer border border-solid border-primary-70 rounded-md flex flex-row flex-nowrap justify-center items-center
            ${
                selectFocus ? "border-primary-70" : "border-primary-60"
            } ${className}`}
            >
                {/* <input
                    onFocus={() => setSelectFocus(true)}
                    onBlur={() => setSelectFocus(false)}
                    placeholder={placeholder}
                    disabled
                    className="w-max text-xs outline-none border-none focus:outline-none focus:border-none px-3 py-2 placeholder:text-primary-70"
                /> */}
                {!value && (
                    <span className="px-4 pr-3 py-2 text-my-gray-70  w-full">
                        {placeholder}
                    </span>
                )}

                {value && (
                    <span className="px-4 pr-3 py-2 text-primary-70 w-full">
                        {value.title}
                    </span>
                )}

                <FaAngleDown className="text-primary-70 ml-3 mr-1" />

                <div
                    className={`absolute top-full translate-y-2 left-0 bg-white text-primary-70 w-full p-2 rounded-sm shadow-md border border-primary-40 max-h-20-screen md:max-h-30-screen overflow-y-auto
                    ${
                        showOptions
                            ? "flex flex-col justify-top items-center"
                            : "hidden"
                    }`}
                >
                    <span
                        onClick={() => {
                            onChangeActiveValue(null);
                        }}
                        className="text-my-gray-70 px-3 py-2 hover:text-white hover:bg-primary-70 rounded-md w-full"
                    >
                        {placeholder}
                    </span>
                    {options.map((option) => {
                        return (
                            <span
                                onClick={() => {
                                    onChangeActiveValue(option);
                                }}
                                className="px-3 py-2 hover:text-white hover:bg-primary-70 rounded-md w-full"
                            >
                                {option.title}
                            </span>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
