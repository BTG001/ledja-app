import { useEffect, useState } from "react";

import Image from "next/image";
import Config from "../../Config";
import Utils from "../../Utils";
import axios from "axios";

export default function TakeTestPopup({
    showPopup,
    onClose,
    onSuccess,
    assessmentId,
}) {
    const selectEmptyValue = "Please Select";

    const [skillsAssessment, setSkillsAssessment] = useState({});
    const [answer, setAnswer] = useState();

    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState({});

    const [questions, setQuestions] = useState([]);

    const [results, setResults] = useState([]);

    const [errors, setErrors] = useState({});
    const [loadingNext, setloadingNext] = useState(false);
    const [loadingPrevious, setloadingPrevious] = useState(false);

    const [action, setAction] = useState();

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);

    useEffect(() => {
        console.log("assessment id: ", assessmentId);
        if (assessmentId) {
            getSkillsAssessment();
        }
    }, [assessmentId]);

    const getQuestionResult = (questionId) => {
        for (let index = 0; index < results.length; index++) {
            const result = results[index];

            if (result.question_id == questionId) {
                // return { resultIndex: index, result: result };
                return result;
            }
        }

        return false;
    };

    const getSkillsAssessment = async () => {
        try {
            const url = `${Config.API_URL}/skills_assessments/${assessmentId}`;
            let theSkillsAssessment = await axios.get(url, {
                headers: Utils.getHeaders(),
            });
            theSkillsAssessment = theSkillsAssessment.data.data;

            console.log("the skills assessment", theSkillsAssessment);

            setSkillsAssessment(theSkillsAssessment);
            if (theSkillsAssessment.questions) {
                setQuestions(theSkillsAssessment.questions);
                // if (theSkillsAssessment.results) {
                //     // setResults(theSkillsAssessment.results);
                //     let theResult;

                //     const questionId = theSkillsAssessment.questions[0].id;

                //     console.log("question id: ", questionId);

                //     for (
                //         let index = 0;
                //         index < theSkillsAssessment.results.length;
                //         index++
                //     ) {
                //         const result = theSkillsAssessment.results[index];

                //         if (result.question_id == questionId) {
                //             // return { resultIndex: index, result: result };
                //             theResult = result;
                //             break;
                //         }
                //     }

                //     console.log("the result: ", theResult);

                //     if (theResult) {
                //         console.log("setting answer: ", theResult);
                //         setAnswer(theResult.answer);
                //     }
                // }
            }
        } catch (error) {
            console.log("getting skills assessment error: ", error);
        }
    };

    const onSaveResult = (action, complete) => {
        //answer a question

        console.log("save..... ", action);
        if (action == "previous" && !answer) {
            console.log("not answer save previous...");

            changeQuestion(action);
            setloadingNext(false);
            setloadingPrevious(false);
            return;
        }

        const hasErrors = validateResult();

        if (hasErrors) {
            setloadingNext(false);
            setloadingPrevious(false);

            return;
        } else {
            setErrors({});
        }

        const userId = localStorage.getItem("user_id");

        const resultFormData = new FormData();
        resultFormData.append("skills_assessment_id", skillsAssessment.id);
        resultFormData.append("question_id", questions[activeQuestionIndex].id);
        resultFormData.append("user_id", userId || "");
        resultFormData.append("answer", answer);

        Utils.makeRequest(async () => {
            try {
                const resultURL = `${Config.API_URL}/results`;

                let saveResultResults = await Utils.postForm(
                    resultURL,
                    resultFormData
                );

                saveResultResults = saveResultResults.data.data;

                console.log("save result: ", saveResultResults);

                // setResults((prevValues) => {
                //     return [saveResultResults, ...prevValues];
                // });

                if (complete) {
                    onSuccess();
                    setloadingNext(false);
                    setloadingPrevious(false);
                    return;
                }

                changeQuestion(action);

                setloadingNext(false);
                setloadingPrevious(false);
            } catch (error) {
                console.log("saveresult error: ", error);
                extractErrors(error);
                setloadingNext(false);
                setloadingPrevious(false);
            }
        });
    };

    const onUpdateResult = (action, complete) => {
        //answer a question
        console.log("update..... ", action);
        const activeResult = getQuestionResult(
            questions[activeQuestionIndex].id
        );

        console.log("active result...on update", activeResult);

        if (action == "previous" && !answer) {
            console.log("update previous no answer...");
            changeQuestion(action);
            setloadingNext(false);
            setloadingPrevious(false);
            return;
        }

        // console.log("active result: ", activeResult);

        const resultFormData = new FormData();

        resultFormData.append("answer", answer);

        const hasErrors = validateResult();

        if (hasErrors) {
            setloadingNext(false);
            setloadingPrevious(false);
            return;
        } else {
            setErrors({});
        }

        if (answer == activeResult.answer) {
            if (complete) {
                onSuccess();
                setloadingNext(false);
                setloadingPrevious(false);
                return;
            }
            console.log("answer not changed...moving", action);
            setloadingNext(false);
            setloadingPrevious(false);

            changeQuestion(action);

            return;
        }

        Utils.makeRequest(async () => {
            try {
                const resultURL = `${Config.API_URL}/results/${activeResult.id}`;

                let saveResultResults = await Utils.putForm(
                    resultURL,
                    resultFormData
                );

                saveResultResults = saveResultResults.data.data;

                console.log("save result: ", saveResultResults);
                setResults((prevValues) => {
                    const filteredResults = prevValues.filter((result) => {
                        return result.id != activeResult.id;
                    });

                    return {
                        saveResultResults,
                        ...prevValues,
                    };
                });

                if (complete) {
                    onSuccess();
                    setloadingNext(false);
                    setloadingPrevious(false);
                    return;
                }

                changeQuestion(action);
                setloadingNext(false);
                setloadingPrevious(false);
            } catch (error) {
                console.log("save result error: ", error);
                extractErrors(error);
                setloadingNext(false);
                setloadingPrevious(false);
            }
        });
    };

    const changeQuestion = (action) => {
        console.log("change question...", action);
        if (action == "previous" && activeQuestionIndex > 0) {
            const theResult = getQuestionResult(
                questions[activeQuestionIndex - 1].id
            );

            console.log(
                "existing result: ",
                theResult,
                results,
                questions[activeQuestionIndex - 1]
            );

            if (theResult && theResult.id) {
                setAnswer(theResult.answer);
            } else {
                setAnswer(null);
            }
            setActiveQuestionIndex((prevValues) => {
                return prevValues - 1;
            });
        } else if (
            action == "next" &&
            activeQuestionIndex < questions.length - 1
        ) {
            const theResult = getQuestionResult(
                questions[activeQuestionIndex + 1].id
            );

            console.log(
                "existing result: ",
                theResult,
                results,
                questions[activeQuestionIndex + 1]
            );

            if (theResult && theResult.id) {
                setAnswer(theResult.answer);
            } else {
                setAnswer(null);
            }

            setActiveQuestionIndex((prevValues) => {
                return prevValues + 1;
            });
        }
    };

    const validateResult = () => {
        const theErrors = {};
        let hasErrors = false;
        if (!answer) {
            hasErrors = true;
            theErrors.answer = `An answer is required for question ${
                activeQuestionIndex + 1
            }`;
        }

        setErrors(theErrors);

        return hasErrors;
    };

    const extractErrors = (error) => {
        try {
            let errorMessages = {};
            const errors = error.response.data.data;

            Object.keys(errors).map((errorKey) => {
                errorMessages[errorKey] = errors[errorKey][0];
            });

            console.log("errors: ", errorMessages);
            setErrors(errorMessages);

            if (errors.length < 1 && error.response.data.error) {
                console.log("unknown error: ", error.response.data.error);
            }
        } catch (error) {
            // setErrorMessage(`Unknown Error:  ${error.message}`);
            // setShowErrorPopup(true);
            console.log("Error Generating Error Message: ", error);
        }
    };

    return (
        showPopup && (
            <>
                <div className="fixed bg-my-gray-70 opacity-40 w-full h-full top-0 left-0 bottom-0 right-0 "></div>
                <div className="z-50 fixed w-4/5 md:w-3/4 lg:w-2/3 left-1/2 -translate-x-1/2 top-0  p-10 md:p-5 bg-white opacity-100 rounded-10 shadow-md  my-10 md:my-5">
                    <div className="w-full flex flex-row justify-between flex-wrap-reverse items-center text-lg font-medium">
                        <h3 className="text-xl font-medium">
                            {skillsAssessment.id
                                ? skillsAssessment.title
                                : "Take Skills Assessment Test"}
                        </h3>
                        <Image
                            onClick={onClose}
                            src={"/x-icon.svg"}
                            className="cursor-pointer mb-2 translate-x-1/3"
                            width={16}
                            height={16}
                        />
                    </div>
                    <h3 className=" font-medium my-3 border-b border-solid border-my-gray-50 p-2 pl-0 ">
                        Question {activeQuestionIndex + 1} of {questions.length}
                    </h3>

                    <div className="form h-max max-h-50-screen min-h-50-screen md:max-h-60-screen md:min-h-60-screen overflow-y-scroll pr-6 my-3 ">
                        {questions && questions.length > 0 && (
                            <>
                                <p className="">
                                    <span className="p-2">
                                        {questions[activeQuestionIndex].content}{" "}
                                    </span>
                                    <span className="p-2 text-primary-70">
                                        {questions[activeQuestionIndex].marks}{" "}
                                        Marks
                                    </span>
                                </p>
                                <div className="form-input-container my-3 p-2">
                                    <div className="flex fle-row flex-nowrap justify-start items-center">
                                        <span className="mr-2">A.</span>
                                        <input
                                            className="border-none outline-none block p-2 m-3 ml-0 pl-0"
                                            type={"radio"}
                                            name="answer"
                                            checked={answer == "choice_a"}
                                            value={"choice_a"}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                console.log("value: ", value);

                                                setAnswer(value);
                                            }}
                                        />
                                        <span>
                                            {
                                                questions[activeQuestionIndex]
                                                    .choice_a
                                            }
                                        </span>
                                    </div>

                                    <div className="flex fle-row flex-nowrap justify-start items-center">
                                        <span className="mr-2">B. </span>
                                        <input
                                            className="border-none outline-none block p-2 m-3 ml-0 pl-0"
                                            type={"radio"}
                                            name="answer"
                                            value={"choice_b"}
                                            checked={answer == "choice_b"}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                console.log("value: ", value);

                                                setAnswer(value);
                                            }}
                                        />
                                        <span>
                                            {
                                                questions[activeQuestionIndex]
                                                    .choice_b
                                            }
                                        </span>
                                    </div>

                                    <div className="flex fle-row flex-nowrap justify-start items-center">
                                        <span className="mr-2">C. </span>
                                        <input
                                            className="border-none outline-none block p-2 m-3 ml-0 pl-0"
                                            type={"radio"}
                                            name="answer"
                                            value={"choice_c"}
                                            checked={answer == "choice_c"}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                console.log("value: ", value);

                                                setAnswer(value);
                                            }}
                                        />
                                        <span>
                                            {
                                                questions[activeQuestionIndex]
                                                    .choice_c
                                            }
                                        </span>
                                    </div>

                                    <div className="flex fle-row flex-nowrap justify-start items-center">
                                        <span className="mr-2">D. </span>
                                        <input
                                            className="border-none outline-none block p-2 m-3 ml-0 pl-0"
                                            type={"radio"}
                                            name="answer"
                                            checked={answer == "choice_d"}
                                            value={"choice_d"}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                console.log("value: ", value);

                                                setAnswer(value);
                                            }}
                                        />
                                        <span>
                                            {
                                                questions[activeQuestionIndex]
                                                    .choice_d
                                            }
                                        </span>
                                    </div>
                                </div>
                                <p className="text-red-500 text-left  ">
                                    {errors.answer || ""}
                                </p>
                            </>
                        )}
                    </div>
                    <div className="flex flex-row flex-wrap justify-center items-center pt-4 mt-4 border-t border-my-gray-50 border-solid">
                        {/* <p
                            className={` w-max text-center px-4 py-2 rounded-10 border border-solid border-primary-70 text-primary-70 mr-3  ${
                                activeQuestionIndex == 0
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                            }`}
                        >
                            {loadingPrevious && (
                                <span className="loader-secondary"></span>
                            )}
                            {!loadingPrevious && (
                                <span
                                    onClick={() => {
                                        if (activeQuestionIndex > 0) {
                                            setloadingPrevious(true);

                                            if (
                                                questions &&
                                                questions.length > 0
                                            ) {
                                                const theResult =
                                                    getQuestionResult(
                                                        questions[
                                                            activeQuestionIndex
                                                        ].id
                                                    );
                                                if (theResult && theResult.id) {
                                                    onUpdateResult("previous");
                                                } else {
                                                    onSaveResult("previous");
                                                }
                                            }
                                        }
                                    }}
                                >
                                    Previous Question
                                </span>
                            )}
                        </p> */}
                        <p
                            className={`cursor-pointer my-6 md:my-0 w-max text-center px-4 py-2 rounded-10 bg-primary-70 text-white flex justify-center items-center
                                                           `}
                        >
                            {loadingNext && <span className="loader"></span>}
                            {!loadingNext && (
                                <span
                                    onClick={(e) => {
                                        setloadingNext(true);
                                        if (questions && questions.length > 0) {
                                            const theResult = getQuestionResult(
                                                questions[activeQuestionIndex]
                                                    .id
                                            );
                                            // console.log(
                                            //     "the result in next: ",
                                            //     theResult
                                            // );
                                            if (theResult && theResult.id) {
                                                if (
                                                    activeQuestionIndex ==
                                                    results.length - 1
                                                ) {
                                                    onUpdateResult(
                                                        "next",
                                                        true
                                                    );
                                                } else {
                                                    onUpdateResult("next");
                                                }
                                            } else {
                                                if (
                                                    activeQuestionIndex ==
                                                    questions.length - 1
                                                ) {
                                                    onSaveResult("next", true);
                                                } else {
                                                    onSaveResult("next");
                                                }
                                            }
                                        }
                                    }}
                                >
                                    {activeQuestionIndex == questions.length - 1
                                        ? "Complete Assessment"
                                        : "Next Question"}
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            </>
        )
    );
}
