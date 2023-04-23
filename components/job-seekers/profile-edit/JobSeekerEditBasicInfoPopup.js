import { useEffect, useState } from "react";
import Image from "next/image";
import Utils from "../../../Utils";
import Config from "../../../Config";
import axios from "axios";

export default function JobSeekerEditBasicInfoPopup({
    showPopup,
    onClose,
    onSuccess,
    basicInfos: propBasicInfos,
    links: propLinks,
}) {
    const [loading, setLoading] = useState(false);

    const [websiteFocus, setWebsiteFocus] = useState(false);
    const [linkedinFocus, setLinkedinFocus] = useState(false);
    const [twitterFocus, setTwitterFocus] = useState(false);
    const [facebookFocus, setFacebookFocus] = useState(false);

    const [basicInfos, setBasicInfos] = useState(propBasicInfos);

    const [links, setLinks] = useState(propLinks);

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);

    useEffect(() => {
        setBasicInfos(propBasicInfos);
        setLinks(propLinks);
    }, [propBasicInfos, propLinks]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (loading) {
            return;
        } else {
            setLoading(true);
        }
        const basicInfosFormData = new FormData();
        Object.keys(basicInfos).map((key) => {
            if (basicInfos[key] != propBasicInfos[key]) {
                basicInfosFormData.append(key, basicInfos[key]);
            }
        });

        const linksFormData = new FormData();

        Object.keys(links).map((key) => {
            if (links[key] != propLinks[key]) {
                linksFormData.append(key, links[key]);
            }
        });

        Utils.makeRequest(async () => {
            try {
                const basicInfosUrl = `${Config.API_URL}/basic_infos/${basicInfos.id}`;
                const basicInfosUpdate = await Utils.postForm(
                    basicInfosUrl,
                    basicInfosFormData
                );
                setBasicInfos(basicInfosUpdate.data.data);
                onSuccess();
                setLoading(false);
                console.log("basic infos update: ", basicInfosUpdate);
            } catch (error) {
                console.log("basic infos update error: ", error);
            }
        });

        Utils.makeRequest(async () => {
            try {
                const linksUrl = `${Config.API_URL}/job_seeker_links/${links.id}`;

                const linksUpdate = await Utils.putForm(
                    linksUrl,
                    linksFormData
                );
                // axios.defaults.headers = {
                //     "Content-Type": "application/x-www-form-urlencoded",
                //     Authorization: Utils.getAuthorization(),
                // };
                // const linksUpdate = axios(linksUrl, {
                //     method: "PUT",
                //     headers: {
                //         Authorization: Utils.getAuthorization(),
                //         "Content-Type": "application/x-www-form-urlencoded",
                //     },
                //     data: linksFormData,
                // });
                // const data = {
                //     websites: "website.com",
                //     linkedin: "linkedin.com/abcc",
                // };

                // await axios.putForm(linksUrl, data, {
                //     headers: {
                //         "Content-Type": "application/x-www-form-urlencoded",
                //         Authorization: Utils.getAuthorization(),
                //     },
                // });

                // const linksUpdate = await fetch(linksUrl, {
                //     method: "PUT", // *GET, POST, PUT, DELETE, etc.
                //     mode: "cors", // no-cors, *cors, same-origin
                //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                //     credentials: "include", // include, *same-origin, omit
                //     headers: {
                //         //   "Content-Type": "application/json",
                //         "Content-Type": "application/x-www-form-urlencoded",
                //         Authorization: Utils.getAuthorization(),
                //     },
                //     redirect: "follow", // manual, *follow, error
                //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                //     body: linksFormData,
                // });

                setLinks(linksUpdate.data.data);
                console.log("links update: ", await linksUpdate.data.data);

                onSuccess();
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log("links update error: ", error);
            }
        });
    };

    const whenClosed = () => {
        onClose();
    };

    return (
        showPopup && (
            <>
                <div
                    onClick={whenClosed}
                    className="fixed bg-my-gray-70 opacity-40 w-full h-full top-0 left-0 bottom-0 right-0 "
                ></div>
                <div className="z-50 fixed w-4/5 md:w-3/4 lg:w-2/3 left-1/2 -translate-x-1/2 top-0  p-10 bg-white opacity-100 rounded-10 shadow-md  my-10">
                    <form className="form">
                        <div className="h-max max-h-60-screen overflow-y-auto pl-6 pr-6 my-3">
                            <h3 className="form-label">Basic information</h3>

                            {/* <div className="form-input-container">
                                <label className="form-label-light">
                                    Company Name
                                </label>
                                <input
                                    className="form-input"
                                    type={"text"}
                                    placeholder="ABC Company Inc."
                                    name="company_name"
                                    value={basicInfos.company_name || ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setBasicInfos((prevValues) => {
                                            return {
                                                ...prevValues,
                                                company_name: value,
                                            };
                                        });
                                    }}
                                />
                            </div> */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="form-input-container">
                                    <label className="form-label-light ">
                                        First Name
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"text"}
                                        placeholder="Nairobi, Kenya"
                                        name="fname"
                                        value={basicInfos.fname || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setBasicInfos((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    fname: value,
                                                };
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-input-container">
                                    <label className="form-label-light ">
                                        Last Name
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"text"}
                                        placeholder="Nairobi, Kenya"
                                        name="lname"
                                        value={basicInfos.lname || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setBasicInfos((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    lname: value,
                                                };
                                            });
                                        }}
                                    />
                                </div>
                            </div>

                            <div className=" md:grid md:grid-cols-2 md:gap-6">
                                {/* <div className="form-input-container">
                                    <label className="form-label-light ">
                                        Phone Number
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"number"}
                                        placeholder="25 (employees)"
                                        name="phone_no"
                                        min={1}
                                        value={basicInfos.phone_no || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setBasicInfos((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    phone_no: value,
                                                };
                                            });
                                        }}
                                    />
                                </div> */}

                                {/* <div className="form-input-container">
                                    <label className="form-label-light ">
                                        Email
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"email"}
                                        placeholder="email@example.com"
                                        name="revenue"
                                        value={`${basicInfos.email || ""}`}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setBasicInfos((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    email: value,
                                                };
                                            });
                                        }}
                                    />
                                </div> */}
                            </div>

                            <div className=" md:grid md:grid-cols-2 md:gap-6">
                                <div className="form-input-container">
                                    <label className="form-label-light ">
                                        Position
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"text"}
                                        placeholder="CEO"
                                        name="position"
                                        value={`${basicInfos.position || ""}`}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setBasicInfos((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    position: value,
                                                };
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-input-container">
                                    <label className="form-label-light ">
                                        Location
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"text"}
                                        placeholder="Nairobi, kenya"
                                        name="location"
                                        value={`${basicInfos.location || ""}`}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setBasicInfos((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    location: value,
                                                };
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-input-container">
                                <label className="form-label-light">
                                    Website
                                </label>
                                <div
                                    className={`mt-4 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                        websiteFocus
                                            ? "border-primary-70"
                                            : "border-my-gray-70"
                                    }`}
                                >
                                    <input
                                        onFocus={() => setWebsiteFocus(true)}
                                        onBlur={() => setWebsiteFocus(false)}
                                        className="form-input-with-icon peer"
                                        type={"url"}
                                        placeholder="abccompany.com"
                                        name="websites"
                                        value={`${links.websites || ""}`}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setLinks((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    websites: value,
                                                };
                                            });
                                        }}
                                    />
                                    <Image
                                        src={"/website-icon.svg"}
                                        width={17}
                                        height={9}
                                        className="m-2"
                                    />
                                </div>
                            </div>

                            <div className="form-input-container">
                                <label className="form-label-light ">
                                    Social Media
                                </label>
                                <div
                                    className={`mt-4 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                        linkedinFocus
                                            ? "border-primary-70"
                                            : "border-my-gray-70"
                                    }`}
                                >
                                    <input
                                        onFocus={() => setLinkedinFocus(true)}
                                        onBlur={() => setLinkedinFocus(false)}
                                        className="form-input-with-icon peer"
                                        type={"url"}
                                        placeholder="linkedin.com/abccompany/"
                                        name="linked_in"
                                        value={`${links.linked_in || ""}`}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setLinks((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    linked_in: value,
                                                };
                                            });
                                        }}
                                    />
                                    <Image
                                        src={"/linkedin.svg"}
                                        width={14}
                                        height={9}
                                        className="m-2"
                                    />
                                </div>
                                <div
                                    className={`mt-4 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                        twitterFocus
                                            ? "border-primary-70"
                                            : "border-my-gray-70"
                                    }`}
                                >
                                    <input
                                        onFocus={() => setTwitterFocus(true)}
                                        onBlur={() => setTwitterFocus(false)}
                                        className="form-input-with-icon peer"
                                        type={"text"}
                                        placeholder="twitter.com/abccompany/"
                                        name="twitter"
                                        value={`${links.twitter || ""}`}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setLinks((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    twitter: value,
                                                };
                                            });
                                        }}
                                    />
                                    <Image
                                        src={"/twitter.svg"}
                                        width={13}
                                        height={11}
                                        className="m-2"
                                    />
                                </div>
                                <div
                                    className={`mt-4 border border-solid  rounded-sm flex flex-row flex-nowrap justify-center items-center ${
                                        facebookFocus
                                            ? "border-primary-70"
                                            : "border-my-gray-70"
                                    }`}
                                >
                                    <input
                                        onFocus={() => setFacebookFocus(true)}
                                        onBlur={() => setFacebookFocus(false)}
                                        className="form-input-with-icon peer"
                                        type={"text"}
                                        placeholder="facebook.com/abccompany/"
                                        name="facebook"
                                        value={`${links.facebook || ""}`}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setLinks((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    facebook: value,
                                                };
                                            });
                                        }}
                                    />
                                    <Image
                                        src={"/facebook.svg"}
                                        width={8}
                                        height={6}
                                        className="m-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => {
                                document.body.style.overflowY = "visible";
                            }}
                            className="flex flex-row justify-center items-center my-10 mx-auto"
                        >
                            <button
                                onClick={whenClosed}
                                className="submit-btn-secondary mr-3"
                                type={"button"}
                            >
                                {/* {loading && <span className="loader"></span>} */}
                                {/* {!loading && <span className="">Cancel</span>} */}
                                <span className="">Cancel</span>
                            </button>
                            <button
                                onClick={onSubmit}
                                className="submit-btn-left ml-3"
                                type={"submit"}
                            >
                                {loading && <span className="loader"></span>}
                                {!loading && <span className="">Save</span>}
                            </button>
                            {/* <div className="w-full flex flex-row flex-wrap justify-center items-center ">
                            
                        </div> */}
                        </div>
                    </form>
                </div>
            </>
        )
    );
}
