import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './ChatInterface.css';

// 假设你的服务器运行在端口3000
const socket = io('http://localhost:3000');

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // 当组件加载完成后，监听socket的消息
    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, { content: message, sender: 'bot' }]);
    });

    // 组件卸载时取消监听
    return () => {
      socket.off('chat message');
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      // 发送消息到服务器
      socket.emit('chat message', inputValue);
      // 也可以选择在这里将消息添加到messages数组中，如果你想在发送后立即看到它
      // setMessages(prevMessages => [...prevMessages, { content: inputValue, sender: 'user' }]);
      setInputValue('');
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <span>{message.content}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default ChatInterface;
