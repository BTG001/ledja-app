import { useEffect, useState } from "react";

import Image from "next/image";
import Config from "../../../Config";
import Utils from "../../../Utils";

export default function AddSkillsAssessmentPopup({
    showPopup,
    onClose,
    onSuccess,
}) {
    const selectEmptyValue = "Please Select";

    const [skillsAssessment, setSkillsAssessment] = useState({
        // title: "Test assessement title",
    });
    const [activeQuestion, setActiveQuestion] = useState({
        // content: "Who is the CEO for Apple?",
        // choice_a: "Steve Jobs",
        // choice_b: "Tim Cook",
        // choice_c: "Sean Kings",
        // choice_d: "Myles Stevens",
        // marks: "14",
        // correct_answer: "choice_b",
    });
    const [questions, setQuestions] = useState([]);

    const [answers, setAnswers] = useState([]);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showPopup]);

    const getQuestionAnswer = (questionId) => {
        for (let index = 0; index < answers.length; index++) {
            const answer = answers[index];

            if (answer.question_id == questionId) {
                return answer;
            }
        }
    };

    const onCreateAssessment = (e) => {
        e.preventDefault();
        if (loading) {
            return;
        } else {
            setLoading(true);
        }

        const hasErrors = validateAssessment();

        if (hasErrors) {
            setLoading(false);
            return;
        }

        const userId = localStorage.getItem("user_id");

        const assessmentFormData = new FormData();

        assessmentFormData.append("user_id", userId || "");
        assessmentFormData.append("title", skillsAssessment.title);

        Utils.makeRequest(async () => {
            try {
                const assessmentURL = `${Config.API_URL}/skills_assessments`;

                let createAssessmentresults = await Utils.postForm(
                    assessmentURL,
                    assessmentFormData
                );

                createAssessmentresults = createAssessmentresults.data.data;

                console.log("Add Skill Results: ", createAssessmentresults);

                setLoading(false);

                setSkillsAssessment(createAssessmentresults);
            } catch (error) {
                console.log("create assessment error: ", error);
                extractErrors(error);
                setLoading(false);
            }
        });
    };

    const onSaveQuestion = (e) => {
        e.preventDefault();
        if (loading) {
            return;
        } else {
            setLoading(true);
        }

        // console.log("add question: ", activeQuestion);
        // setLoading(false);
        // return;

        const hasErrors = validateQuestion();

        if (hasErrors) {
            setLoading(false);
            return;
        }

        const userId = localStorage.getItem("user_id");

        const questionFormData = new FormData();
        questionFormData.append("skills_assessment_id", skillsAssessment.id);
        questionFormData.append("user_id", userId || "");
        questionFormData.append("content", activeQuestion.content);
        questionFormData.append("choice_a", activeQuestion.choice_a);
        questionFormData.append("choice_b", activeQuestion.choice_b);
        questionFormData.append("choice_c", activeQuestion.choice_c);
        questionFormData.append("choice_d", activeQuestion.choice_d);
        questionFormData.append("marks", activeQuestion.marks);

        Utils.makeRequest(async () => {
            try {
                const questionURL = `${Config.API_URL}/questions`;

                let saveQuestionresults = await Utils.postForm(
                    questionURL,
                    questionFormData
                );

                saveQuestionresults = saveQuestionresults.data.data;

                console.log("save question results: ", saveQuestionresults);

                setLoading(false);

                setQuestions((prevValues) => {
                    return [saveQuestionresults, ...prevValues];
                });

                setActiveQuestion({});
                onSaveAnswer(saveQuestionresults.id);
            } catch (error) {
                console.log("save question error: ", error);
                extractErrors(error);
                setLoading(false);
            }
        });
    };

    const onSaveAnswer = (questionId) => {
        if (loading) {
            return;
        } else {
            setLoading(true);
        }

        const userId = localStorage.getItem("user_id");

        const answerFormData = new FormData();
        answerFormData.append("question_id", questionId);
        answerFormData.append("user_id", userId || "");
        answerFormData.append("correct_answer", activeQuestion.correct_answer);

        Utils.makeRequest(async () => {
            try {
                const answerURL = `${Config.API_URL}/answers`;

                let saveAnswerResults = await Utils.postForm(
                    answerURL,
                    answerFormData
                );

                saveAnswerResults = saveAnswerResults.data.data;

                console.log("save answer: ", saveAnswerResults);

                setLoading(false);

                setAnswers((prevValues) => {
                    return [saveAnswerResults, ...prevValues];
                });

                setAnswers((prevValues) => {
                    return [saveAnswerResults, ...prevValues];
                });
            } catch (error) {
                console.log("save answer error: ", error);
                extractErrors(error);
                setLoading(false);
            }
        });
    };

    const validateAssessment = () => {
        const theErrors = {};
        let hasErrors = false;
        if (!skillsAssessment.title) {
            hasErrors = true;
            theErrors.title = "Skill Title is required";
        }

        setErrors(theErrors);

        return hasErrors;
    };

    const validateQuestion = () => {
        const theErrors = {};
        let hasErrors = false;
        if (!activeQuestion.content) {
            hasErrors = true;
            theErrors.content = "The Question is required";
        }
        if (!activeQuestion.choice_a) {
            hasErrors = true;
            theErrors.choice_a = "Choice A is required";
        }
        if (!activeQuestion.choice_b) {
            hasErrors = true;
            theErrors.choice_b = "Choice B is required";
        }
        if (!activeQuestion.choice_c) {
            hasErrors = true;
            theErrors.choice_c = "Choice C is required";
        }
        if (!activeQuestion.choice_d) {
            hasErrors = true;
            theErrors.choice_d = "The Choice D is required";
        }
        if (!activeQuestion.marks) {
            hasErrors = true;
            theErrors.marks = "The Marks value is required";
        }

        if (!activeQuestion.correct_answer) {
            hasErrors = true;
            theErrors.correct_answer = "The correct answer is required";
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
                <div className="z-50 fixed w-4/5 md:w-3/4 lg:w-2/3 left-1/2 -translate-x-1/2 top-0  p-10 bg-white opacity-100 rounded-10 shadow-md  my-10 h-max min-h-60-screen">
                    <p className="w-full flex flex-row justify-between flex-wrap-reverse items-center text-lg font-medium">
                        <h3 className="text-2xl font-medium">
                            {skillsAssessment.id
                                ? skillsAssessment.title
                                : "Add Skills Assessment"}
                        </h3>
                        <Image
                            onClick={onClose}
                            src={"/x-icon.svg"}
                            className="cursor-pointer mb-2 translate-x-1/3"
                            width={16}
                            height={16}
                        />
                    </p>

                    <div className="form h-max max-h-60-screen overflow-y-scroll pr-6 my-3 ">
                        <div className="my-3">
                            {questions.length > 0 && (
                                <p className="grid grid-cols-3 px-3 py-1 bg-primary-70 text-white">
                                    <span className="col-span-2">Question</span>
                                    <span>Answer</span>
                                </p>
                            )}
                            {questions.map((question, index) => {
                                return (
                                    <div className="grid grid-cols-3 px-3 py-1 border-b border-solid border-my-gray-50">
                                        <div className="col-span-2">
                                            <p>{question.content}</p>
                                            <p className="text-my-gray-70">
                                                {"A. "} {question.choice_a} |{" "}
                                                {"B. "} {question.choice_b} |{" "}
                                                {"C. "} {question.choice_c} |{" "}
                                                {"D. "} {question.choice_d}
                                            </p>
                                        </div>
                                        <span>
                                            {getQuestionAnswer(question.id)
                                                ? getQuestionAnswer(question.id)
                                                      .correct_answer
                                                : ""}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {!skillsAssessment.id && (
                            <form onSubmit={onCreateAssessment}>
                                <div className="form-input-container my-3 p-2">
                                    <label className="form-label-light form-label-required">
                                        Title
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"text"}
                                        placeholder="E.g. Software Developer Assessment"
                                        name="name"
                                        value={skillsAssessment.title}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setSkillsAssessment(
                                                (prevValues) => {
                                                    return {
                                                        ...prevValues,
                                                        title: value,
                                                    };
                                                }
                                            );
                                        }}
                                    />
                                    <p className="text-red-500 text-left  ">
                                        {errors.title || ""}
                                    </p>
                                </div>

                                <div className="flex flex-row justify-center items-center p-2">
                                    <button
                                        onClick={onCreateAssessment}
                                        className="submit-btn-left ml-3"
                                        type={"submit"}
                                    >
                                        {loading && (
                                            <span className="loader"></span>
                                        )}
                                        {!loading && (
                                            <span className="">
                                                Save Assessment
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}

                        {skillsAssessment.id && (
                            <form onSubmit={onCreateAssessment}>
                                <h3 className="text-xl font-medium my-3">
                                    Add a question
                                </h3>
                                <div className="form-input-container my-3 p-2">
                                    <label className="form-label-light form-label-required">
                                        The Question
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"text"}
                                        placeholder="E.g. Who is the CEO of Apple"
                                        value={activeQuestion.content || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setActiveQuestion((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    content: value,
                                                };
                                            });
                                        }}
                                    />
                                    <p className="text-red-500 text-left  ">
                                        {errors.content || ""}
                                    </p>
                                </div>
                                <div className="form-input-container my-3 p-2">
                                    <label className="form-label-light form-label-required">
                                        Choice A
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"text"}
                                        placeholder="E.g. Steve Jobs"
                                        value={activeQuestion.choice_a || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setActiveQuestion((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    choice_a: value,
                                                };
                                            });
                                        }}
                                    />
                                    <p className="text-red-500 text-left  ">
                                        {errors.choice_a || ""}
                                    </p>
                                </div>
                                <div className="form-input-container my-3 p-2">
                                    <label className="form-label-light form-label-required">
                                        Choice B
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"text"}
                                        placeholder="E.g. Tim Cook"
                                        value={activeQuestion.choice_b || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setActiveQuestion((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    choice_b: value,
                                                };
                                            });
                                        }}
                                    />
                                    <p className="text-red-500 text-left  ">
                                        {errors.choice_b || ""}
                                    </p>
                                </div>
                                <div className="form-input-container my-3 p-2">
                                    <label className="form-label-light form-label-required">
                                        Choice C
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"text"}
                                        placeholder="E.g. Elon Musk"
                                        value={activeQuestion.choice_c || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setActiveQuestion((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    choice_c: value,
                                                };
                                            });
                                        }}
                                    />
                                    <p className="text-red-500 text-left  ">
                                        {errors.choice_c || ""}
                                    </p>
                                </div>
                                <div className="form-input-container my-3 p-2">
                                    <label className="form-label-light form-label-required">
                                        Choice D
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"text"}
                                        placeholder="E.g. Jef Bezos"
                                        value={activeQuestion.choice_d || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setActiveQuestion((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    choice_d: value,
                                                };
                                            });
                                        }}
                                    />
                                    <p className="text-red-500 text-left  ">
                                        {errors.choice_d || ""}
                                    </p>
                                </div>

                                <div className="form-input-container my-3 p-2">
                                    <label className="form-label-light form-label-required">
                                        Marks
                                    </label>
                                    <input
                                        className="form-input"
                                        type={"number"}
                                        placeholder="E.g. 5"
                                        min={1}
                                        value={activeQuestion.marks || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            setActiveQuestion((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    marks: value,
                                                };
                                            });
                                        }}
                                    />
                                    <p className="text-red-500 text-left  ">
                                        {errors.marks || ""}
                                    </p>
                                </div>

                                <div className="form-input-container my-3 p-2">
                                    <label className="form-label-light">
                                        Correct Answer
                                    </label>
                                    <select
                                        className="form-input"
                                        type={"text"}
                                        placeholder="Please select"
                                        name="employment_type"
                                        value={
                                            activeQuestion.correct_answer || ""
                                        }
                                        onChange={(e) => {
                                            let value = e.target.value;
                                            if (value == selectEmptyValue) {
                                                value = undefined;
                                            }
                                            // switch (value) {
                                            //     case "Choice A":

                                            //         break;

                                            //     default:
                                            //         break;
                                            // }

                                            setActiveQuestion((prevValues) => {
                                                return {
                                                    ...prevValues,
                                                    correct_answer: value,
                                                };
                                            });
                                        }}
                                    >
                                        <option value={selectEmptyValue}>
                                            {selectEmptyValue}
                                        </option>
                                        <option value={"choice_a"}>
                                            Choice A
                                        </option>
                                        <option value={"choice_b"}>
                                            Choice B
                                        </option>
                                        <option value={"choice_c"}>
                                            Choice C
                                        </option>
                                        <option value={"choice_d"}>
                                            Choice D
                                        </option>
                                    </select>
                                    <p className="text-red-500 text-left  ">
                                        {errors.correct_answer || ""}
                                    </p>
                                </div>

                                <div className="flex flex-row justify-center items-center p-2">
                                    <button
                                        onClick={onSaveQuestion}
                                        className="submit-btn-left ml-3"
                                        type={"submit"}
                                    >
                                        {loading && (
                                            <span className="loader"></span>
                                        )}
                                        {!loading && (
                                            <span className="">
                                                Save Question
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    <div
                        className={`flex justify-center items-centerp-2 m-auto w-full border-t border-solid border-my-gray-50
                        `}
                    >
                        <p
                            onClick={() => {
                                const theAssessment = { ...skillsAssessment };
                                onSuccess(theAssessment);
                                setActiveQuestion({});
                                setSkillsAssessment({});
                                setQuestions([]);
                                setAnswers([]);
                            }}
                            className={`px-4 py-2 border border-solid border-primary-70 rounded-lg text-center mt-3 cursor-pointer
                            ${
                                skillsAssessment.id &&
                                questions.length > 0 &&
                                answers.length > 0
                                    ? ""
                                    : "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            {/* {loading && <span className="loader"></span>} */}
                            {/* {!loading && <span className="">Save Question</span>} */}
                            <span className="w-full text-center">
                                Complete The Assessment
                            </span>
                        </p>
                    </div>
                </div>
            </>
        )
    );
}
