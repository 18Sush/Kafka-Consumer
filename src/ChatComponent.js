import React, { useEffect, useState } from "react";
import axios from "axios";
import { connectKafka, receiveKafkaMessage } from "./KafkaService";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch chat history from the backend
    axios
      .get("/api/chat-history", { params: { sender: "senderId", receiver: "receiverId" } })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching chat history:", error);
      });

    // Connect to Kafka
    //connectKafka();

    // Receive Kafka messages
    /*receiveKafkaMessage((messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });*/
  }, []);

  const handleSendMessage = () => {
    const newMessageData = {
      sender: "senderId",
      receiver: "receiverId",
      content: newMessage,
    };

    // Send the message to Kafka
    //sendKafkaMessage(newMessageData);

    // Add the message to the UI
    setMessages((prevMessages) => [...prevMessages, newMessageData]);

    // Clear the input field
    setNewMessage("");
  };

  return (
    <div>
      <h1>Chat Application</h1>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <p>Sender: {message.sender}</p>
              <p>Content: {message.content}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Send Message</h2>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default ChatComponent;