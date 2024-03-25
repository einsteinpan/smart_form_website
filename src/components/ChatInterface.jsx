import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const endOfMessagesRef = useRef(null); // 添加这一行

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // 添加这个effect来处理滚动

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    const newMessage = { id: Date.now(), text: inputValue };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="chat-container">
      <h1>聊天助理</h1>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">{message.text}</div>
        ))}
        <div ref={endOfMessagesRef} /> {/* 在消息列表末尾添加这个元素 */}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="請輸入..." />
        <button type="submit">發送</button>
      </form>
    </div>
  );
}

export default ChatInterface;
