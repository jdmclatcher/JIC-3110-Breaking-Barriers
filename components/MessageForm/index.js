"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import "./MessageForm.css";
import { revalidatePath } from "next/cache";

const MessageForm = ({ updateMessageList }) => {
  const { data: session } = useSession();
  const user = session?.session?.user;

  const messageSubject = useRef("");
  const messageContent = useRef();
  const instructorId = user.per_id;

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
    <form className="message-form" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="message-subject">
        <p>Subject:</p>
        <input ref={messageSubject} required type="text" />
      </label>
      <label htmlFor="message-content">
        <p>Message:</p>
        <textarea
          className="message-content-input"
          ref={messageContent}
          required
          type="text"
        />
      </label>
      <div>
        <button className="submit-message-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
