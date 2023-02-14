import Image from "next/image";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
export default function LeftCaretSelect({ placeholder, options }) {
    const [selectFocus, setSelectFocus] = useState(false);
    return (
        <>
            <div
                className={` cursor-pointer border border-solid border-primary-70 rounded-md flex flex-row flex-nowrap justify-center items-center m-1
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
                <span className="pl-1 pr-3 py-2 text-primary-70 w-max">
                    {placeholder}
                </span>
                <div>{/* options */}</div>
            </div>
        </>
    );
}
