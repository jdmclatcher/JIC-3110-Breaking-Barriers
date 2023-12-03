"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import "./Messages.css";
import MessageForm from "@/components/MessageForm";
import { revalidatePath } from "next/cache";

const MessagesPage = () => {
  const { data: session } = useSession();
  const user = session?.session?.user;
  const role = user?.role;

  const [messageList, setMessageList] = useState([]);

  const getMessages = async () => {
    const per_id = user?.per_id;
    if (role === "admin") {
      let response = await fetch(`/api/message/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response) {
        console.error("No response from fetch");
        return;
      }
      let responseData = await response.json();
      if (!responseData || !responseData.messageList) {
        console.error("Invalid or empty response data");
        return;
      }
      const messages = responseData.messageList;
      for (let id in messages) {
        const date = new Date(messages[id].created_at);
        messages[id].created_at = date.toLocaleString();
      }
      console.log(messages);
      setMessageList(messages);
    } else if (role === "instructor") {
      let response = await fetch(`/api/message?per_id=${per_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response) {
        console.error("No response from fetch");
        return;
      }
      let responseData = await response.json();
      if (!responseData || !responseData.messageList) {
        console.error("Invalid or empty response data");
        return;
      }
      const messages = responseData.messageList;
      for (let id in messages) {
        const date = new Date(messages[id].created_at);
        messages[id].created_at = date.toLocaleString();
      }
      console.log(messages);
      setMessageList(messages);
    }
  };

  const handleResolve = async (msg_id) => {
    const messageData = { message_id: msg_id };
    let response = await fetch(`/api/message`, {
      method: "PATCH",
      body: JSON.stringify(messageData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    alert(responseData.message);
    if (responseData.status === 200) {
      let newMessageList = [...messageList];

      for (var id in newMessageList) {
        if (newMessageList[id].message_id === msg_id) {
          newMessageList[id].resolved = true;
        }
      }
      setMessageList(newMessageList);
    }
  };

  const deleteMessage = async (msg_id) => {
    const messageData = { message_id: msg_id };
    let response = await fetch(`/api/message`, {
      method: "DELETE",
      body: JSON.stringify(messageData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    alert(responseData.message);
    console.log(responseData);
    if (responseData.status === 200) {
      setMessageList(messageList.filter((item) => item.message_id !== msg_id));
    }
  };

  const updateMessages = () => {
    getMessages();
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="messages-container">
      <Link href="/dashboard">Back to Dashboard</Link>
      <h1 className="messges-header">Messages</h1>
      <div className="messages-list">
        {messageList.map((message, idx) => {
          return (
            <div className="message-item" key={`message-${idx}`}>
              <h2>{message.instructor_id}</h2>
              <p className="message-text">{message.text_content}</p>
              <h2 className="message-date">{message.created_at}</h2>
              <button
                className="resolve-message-button"
                onClick={() => {
                  handleResolve(message.message_id);
                }}
              >
                Resolve
              </button>
              <p>{message.resolved ? "resolved" : "not resolved"}</p>
              <button
                className="delete-message-button"
                onClick={() => {
                  deleteMessage(message.message_id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      {role === "instructor" && (
        <MessageForm updateMessageList={updateMessages} />
      )}
    </div>
  );
};

export default MessagesPage;
