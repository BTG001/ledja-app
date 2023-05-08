import { useEffect, useState } from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import axios from "axios";
import Utils from "../../Utils";
import Config from "../../Config";
import Image from "next/image";
import TransactionsSkeletonLoader from "../skeleton-loaders/transactions-skeleton-loader";
import Pagination from "../../components/pagination";

export default function CreditHistory({ showPopup, onClose }) {
    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const [transactions, setTransactions] = useState();
    const [transactionsLoading, setTransactionsLoading] = useState(true);
    const [paginationData, setPaginationData] = useState({});

    const onChangePage = (newPageURL) => {
        fetchTransactions(newPageURL);
    };

    async function fetchTransactions(url) {
        setTransactionsLoading(true);
        try {
            const userId = localStorage.getItem("user_id");

            if (!url) {
                url = `${Config.API_URL}/transactions/user/${userId}`;
            }

            let transactions = await axios.get(url, {
                headers: Utils.getHeaders(),
            });

            console.log("pagination transaction data", transactions.data.data);

            setPaginationData(transactions.data.data);

            transactions = transactions.data.data.data;

            setTransactions(transactions);

            setTransactionsLoading(false);
            console.log("transactions: ", transactions);
        } catch (error) {
            setTransactionsLoading(false);
            console.log("get upload jobs Error: ", error);
        }
    }

    return (
        showPopup && (
            <>
                <div
                    onClick={onClose}
                    className="fixed bg-my-gray-70 opacity-40 w-full h-full top-0 left-0 bottom-0 right-0 "
                ></div>
                <div className="z-50 fixed w-4/5 md:w-2/3 lg:w-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2    top-1/2 p-10 bg-white opacity-100 rounded-10 shadow-md">
                    <p className="w-full flex flex-row justify-between flex-wrap-reverse items-center text-lg font-medium">
                        <span>Credit History</span>
                        <Image
                            onClick={onClose}
                            src={"/x-icon.svg"}
                            className="cursor-pointer mb-2 translate-x-1/3"
                            width={16}
                            height={16}
                        />
                    </p>

                    {!transactionsLoading &&
                        transactions &&
                        transactions.length > 0 && (
                            <Pagination
                                data={paginationData}
                                onChangePage={onChangePage}
                            />
                        )}

                    <div className="col-span-2 h-max max-h-50-screen min-h-50-screen   overflow-y-auto pl-6 pr-6 my-5">
                        {transactionsLoading && <TransactionsSkeletonLoader />}
                        {!transactionsLoading &&
                            transactions &&
                            transactions.length > 0 &&
                            transactions.map((transaction) => {
                                return (
                                    <div className="rounded-lg m-2 p-2 border border-my-gray-50 shadow-sm hover:shadow:lg">
                                        <p className="flex flex-row justify-between items-center ">
                                            <span className="p-2 text-my-gray-70">
                                                {transaction.trx_ref}
                                            </span>
                                            <span className="p-2 text-my-gray-70 capitalize">
                                                {transaction.trx_status}
                                            </span>
                                            <span className="p-2 text-my-gray-70 capitalize">
                                                {transaction.payment_mode}
                                            </span>
                                        </p>
                                        <p className="flex flex-row justify-start items-center ">
                                            <span className="p-2 text-primary-70">
                                                Ksh
                                            </span>
                                            <span className="p-2 text-my-gray-70">
                                                {transaction.amount}
                                            </span>
                                        </p>
                                        <p className="flex flex-row justify-start items-center ">
                                            <span className="p-2 text-primary-70">
                                                Made on
                                            </span>
                                            <span className="p-2 text-my-gray-70">
                                                {new Date(
                                                    transaction.updated_at
                                                ).toLocaleString()}
                                            </span>
                                        </p>
                                    </div>
                                );
                            })}
                    </div>

                    {!transactionsLoading &&
                        transactions &&
                        transactions.length > 0 && (
                            <Pagination
                                data={paginationData}
                                onChangePage={onChangePage}
                            />
                        )}

                    <div
                        onClick={() => {
                            document.body.style.overflowY = "visible";
                        }}
                        className="flex flex-row flex-wrap justify-center items-center my-2 mx-auto"
                    >
                        <PrimaryBtn
                            text={"Done"}
                            onClick={(e) => {
                                e.preventDefault();
                                onclose();
                            }}
                            className={"my-5 mx-4 w-max"}
                        />
                    </div>
                </div>
            </>
        )
    );
}
