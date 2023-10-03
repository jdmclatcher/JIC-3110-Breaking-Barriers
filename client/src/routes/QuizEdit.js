import { useState } from "react";
import list from "./list.json";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import React from "react";

function QuizEdit() {

  return (
    <div className="relative flex flex-col items-center w-[540px] h-[340px] rounded-lg">
      <div className="bg-orange-300 font-bold rounded-lg p-4">Current Quizzes</div>
            <div className="bg-orange-300 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full">
              {list.map((item, i) => (
                <div className="flex w-full justify-between p-2 hover:bg-orange-200 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4" key={i}>
                  <h3 className="font-bold">{item.quizName}</h3>
                  <h3 className="font-bold">EDIT</h3>

                </div>
              ))}
            </div>

    </div>
  )
}

export default QuizEdit;