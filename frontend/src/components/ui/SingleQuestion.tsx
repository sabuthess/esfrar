"use client";

import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

export const SingleQuestion = ({ question, answer }: {question: string, answer: string}) => {
    const [btnQuestion, setBtnQuestion] = useState(false)

    const handleClickBtnQuestion = () => {
        setBtnQuestion(!btnQuestion)
    }



    return (

        <div className="w-full  lg:w-[80%] flex gap-5 flex-col lg:justify-between lg:gap-5  border border-neutral-200 rounded-2xl   p-5 ">
            <div
                className=" text-2xl flex justify-between items-center cursor-pointer"
                onClick={handleClickBtnQuestion}>
                <h2 className="font-medium">{question}</h2>

                <div className="hidden lg:block">

                    {btnQuestion === true ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </div>


            </div>
            <div className="">

                {btnQuestion && <p className={``}>{answer}</p>}
            </div>
            <div className="block lg:hidden  justify-center">

                <button className="cursor-pointer text-teal-500 hover:text-teal-600 p-2.5 rounded-xl" onClick={handleClickBtnQuestion}>
                    {!btnQuestion ? "Show" : "Hidden"}
                </button>
            </div>
        </div>
    )
}
/* 
SingleQuestion.propTypes = {
    question: PropTypes.string,
    answer: PropTypes.string
}

 */