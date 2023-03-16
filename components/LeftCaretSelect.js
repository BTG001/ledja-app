import Image from "next/image";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
export default function LeftCaretSelect({
    placeholder,
    options,
    value,
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
                className={`relative cursor-pointer border border-solid border-primary-70 rounded-md flex flex-row flex-nowrap justify-center items-center m-1
            ${selectFocus ? "border-primary-70" : "border-primary-60"}`}
            >
                <FaAngleDown className="text-primary-70 ml-3 mr-1" />
                {/* <input
                    onFocus={() => setSelectFocus(true)}
                    onBlur={() => setSelectFocus(false)}
                    placeholder={placeholder}
                    disabled
                    className="w-max text-xs outline-none border-none focus:outline-none focus:border-none px-3 py-2 placeholder:text-primary-70"
                /> */}
                {!value && (
                    <span className="pl-1 pr-3 py-2 text-primary-70 w-max">
                        {placeholder}
                    </span>
                )}

                {value && (
                    <span className="pl-1 pr-3 py-2 text-primary-70 w-max">
                        {value}
                    </span>
                )}

                <div
                    className={`absolute top-full left-0 bg-white text-primary-70 w-full p-2 rounded-sm shadow-md border border-primary-40
                    ${
                        showOptions
                            ? "flex flex-col justify-top items-center"
                            : "hidden"
                    }`}
                >
                    {options.map((option) => {
                        return (
                            <span
                                onClick={() => {
                                    onChangeActiveValue(option);
                                }}
                                className="px-3 py-2 hover:text-white hover:bg-primary-70 rounded-md"
                            >
                                {option}
                            </span>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
