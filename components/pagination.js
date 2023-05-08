import Link from "next/link";
import Image from "next/image";
import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaAngleLeft,
    FaAngleRight,
} from "react-icons/fa";

export default function Pagination({ data, onChangePage }) {
    const getURLFor = (pageNumber) => {
        data.links.map((link) => {
            if (link.label == pageNumber) {
                console.log("the link: ", link);
                return link.url;
            }
        });
    };

    return (
        <>
            <div className="flex flex-row justify-center items-center py-2">
                <FaAngleDoubleLeft
                    onClick={() => {
                        if (!data.first_page_url) {
                            return;
                        }
                        onChangePage(data.first_page_url);
                    }}
                    className={`text-4xl  p-2 m-1  rounded-full  flex justify-center items-center
                    ${
                        !data.first_page_url || data.current_page == 1
                            ? "text-my-gray-50 cursor-not-allowed"
                            : "text-my-gray-70 cursor-pointer"
                    }
                    `}
                />

                <FaAngleLeft
                    onClick={() => {
                        if (!data.prev_page_url) {
                            return;
                        }

                        onChangePage(data.prev_page_url);
                    }}
                    className={`text-4xl  p-2 m-1  rounded-full  flex justify-center items-center
                    ${
                        !data.prev_page_url
                            ? "text-my-gray-50 cursor-not-allowed"
                            : "text-my-gray-70 cursor-pointer"
                    }
                    `}
                />

                {/* {data.current_page > 3 && (
                    <span
                        onClick={() => {
                            onChangePage(data.links[data.current_page - 3].url);
                        }}
                        className={`text-xl  w-10 h-10 m-1 cursor-pointer rounded-full text-my-gray-70 flex justify-center items-center
                
                `}
                    >
                        {data.current_page - 3}
                    </span>
                )} */}

                {data.current_page > 2 && (
                    <span
                        onClick={() => {
                            onChangePage(data.links[data.current_page - 2].url);
                        }}
                        className={`text-xl  w-10 h-10 m-1 cursor-pointer rounded-full text-my-gray-70 flex justify-center items-center
                
                `}
                    >
                        {data.current_page - 2}
                    </span>
                )}

                {data.current_page > 1 && (
                    <span
                        onClick={() => {
                            onChangePage(data.links[data.current_page - 1].url);
                        }}
                        className={`text-xl  w-10 h-10 m-1 cursor-pointer rounded-full text-my-gray-70 flex justify-center items-center

`}
                    >
                        {data.current_page - 1}
                    </span>
                )}
                <span
                    className={`text-xl  w-10 h-10 m-1 cursor-pointer rounded-full flex justify-center items-center c text-white bg-dark-50
                
                `}
                >
                    {data.current_page}
                </span>

                {data.last_page >= data.current_page + 1 && (
                    <span
                        onClick={() => {
                            onChangePage(data.links[data.current_page + 1].url);
                        }}
                        className={`text-xl  w-10 h-10 m-1 cursor-pointer rounded-full text-my-gray-70 flex justify-center items-center
    
    `}
                    >
                        {data.current_page + 1}
                    </span>
                )}

                {data.last_page >= data.current_page + 2 && (
                    <span
                        onClick={() => {
                            onChangePage(data.links[data.current_page + 2].url);
                        }}
                        className={`text-xl  w-10 h-10 m-1 cursor-pointer rounded-full text-my-gray-70 flex justify-center items-center
    
    `}
                    >
                        {data.current_page + 2}
                    </span>
                )}
                {/* {data.last_page >= data.current_page + 3 && (
                    <span
                        onClick={() => {
                            onChangePage(data.links[data.current_page + 3].url);
                        }}
                        className={`text-xl  w-10 h-10 m-1 cursor-pointer rounded-full text-my-gray-70 flex justify-center items-center
    
    `}
                    >
                        {data.current_page + 3}
                    </span>
                )} */}

                <FaAngleRight
                    onClick={() => {
                        if (!data.next_page_url) {
                            return;
                        }
                        onChangePage(data.next_page_url);
                    }}
                    className={`text-4xl  p-2 m-1  rounded-full  flex justify-center items-center
                    ${
                        !data.next_page_url
                            ? "text-my-gray-50 cursor-not-allowed"
                            : "text-my-gray-70 cursor-pointer"
                    }
                    `}
                />
                <FaAngleDoubleRight
                    onClick={() => {
                        if (!data.last_page_url) {
                            return;
                        }

                        onChangePage(data.last_page_url);
                    }}
                    className={`text-4xl  p-2 m-1  rounded-full  flex justify-center items-center
                    ${
                        !data.last_page_url ||
                        data.current_page == data.last_page
                            ? "text-my-gray-50 cursor-not-allowed"
                            : "text-my-gray-70 cursor-pointer"
                    }
                    `}
                />
            </div>
        </>
    );
}
