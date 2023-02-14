import Image from "next/image";

import { useState } from "react";

export default function LeftIconSearch({ placeholder, value }) {
    const [searchFocus, setSearchFocus] = useState(false);
    return (
        <div>
            <div className="form-input-container">
                <div
                    className={` border border-solid  rounded-md flex flex-row flex-nowrap justify-startitems-center ${
                        searchFocus ? "border-primary-70" : "border-my-gray-70"
                    }`}
                >
                    <Image
                        src={"/search-icon.svg"}
                        width={17}
                        height={9}
                        className="ml-4 cursor-pointer text-primary-70"
                    />
                    <input
                        onFocus={() => setSearchFocus(true)}
                        onBlur={() => setSearchFocus(false)}
                        className="w-full block outline-none border-none focus:outline-none focus:border-none pr-4 py-1 m-2 placeholder:text-dark-50"
                        type={"text"}
                        value={value}
                        placeholder={placeholder}
                    />
                </div>
            </div>
        </div>
    );
}
