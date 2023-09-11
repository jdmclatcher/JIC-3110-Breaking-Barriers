import { useState } from "react";
import list from "./list.json";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import React from "react";

function QuizDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="relative flex flex-col items-center w-[540px] h-[340px] rounded-lg">
        <button 
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-orange-400 p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white"
        >
          Active Quizzes
          {!isOpen ? (
            <AiOutlineCaretDown className="h-8" />
          ) : (
            <AiOutlineCaretUp className="h-8" />
          )
          }
          </button>

          {isOpen && (
            <div className="bg-orange-300 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full">
              {list.map((item, i) => (
                <div className="flex w-full justify-between p-2 hover:bg-orange-200 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4" key={i}>
                  <h3 className="font-bold">{item.quizName}</h3>
                  <h3>{item.instructorName}</h3>
                </div>
              ))}
            </div>
          )}
    </div>
  )
}

export default QuizDropdown;