"use client";
import { useRef, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

const MessageForm = ({ updateMessageList }) => {
  const user = useContext(UserContext);

  const messageSubject = useRef("");
  const messageContent = useRef();
  const instructorId = user?.per_id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageData = {
      message_content: messageContent.current.value,
      instructor_id: instructorId,
    };

    let response = await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify(messageData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    alert(responseData.message);

    updateMessageList();
  };

  return (
    <form
      className="flex flex-col bg-orange-200 m-6 p-6 rounded-xl"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 className="m1 pb-3 border-b-2 border-amber-100">Create Message:</h1>
      <div className="m-1">
        <label htmlFor="message-subject">
          <p>Subject:</p>
          <input
            className="w-1/3 rounded-md px-2"
            ref={messageSubject}
            required
            type="text"
          />
        </label>
      </div>
      <div className="m-1">
        <label htmlFor="message-content">
          <p>Message:</p>
          <textarea
            className="message-content-input w-full rounded-md px-1"
            ref={messageContent}
            required
            type="text"
          />
        </label>
      </div>
      <div className="">
        <button
          className="submit-message-button rounded-md bg-secondary px-3 py-1"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
