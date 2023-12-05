"use client";
import { useState, useEffect, useRef, useContext } from "react";
import MessageForm from "@/components/MessageForm";
import { UserContext } from "@/contexts/UserContext";
import "./Messages.css";

const MessagesPage = () => {
  const user = useContext(UserContext);
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
      <h1 className="quizzes-header uppercase tracking-wide ml-5 mt-5 text-gray-700 text-3xl p-2 font-bold">
        Messages
      </h1>
      <div className="messages-body">
        <div className="messages-list grid grid-flow-row auto-rows-max gap-4">
          {messageList.map((message, idx) => {
            return (
              <div
                className="message-item grid grid-rows-3 grid-flow-col bg-gray-100 ml-6 mr-6 p-4 rounded-xl border-2 border-gray-200"
                key={`message-${idx}`}
              >
                <div className="message-header grid grid-cols-2 border-b-2">
                  <h2 className="message-instructor">
                    {"Instructor: " + message.instructor_id}
                  </h2>
                  <h2 className="grid justify-items-end">
                    {message.created_at}
                  </h2>
                </div>
                <div className="message-body bg-gray-50 rounded-md mt-2">
                  <p className="message-text p-2">{message.text_content}</p>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    className="resolve-message-button pr-3 mx-2 rounded-md bg-secondary px-3"
                    onClick={() => {
                      handleResolve(message.message_id);
                    }}
                  >
                    Resolve
                  </button>

                  <button
                    className="delete-message-button rounded-md bg-[#ef4444] px-3"
                    onClick={() => {
                      deleteMessage(message.message_id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {role === "instructor" && (
          <MessageForm updateMessageList={updateMessages} />
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
