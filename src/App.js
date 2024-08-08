import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [leftMessages, setLeftMessages] = useState([]);
  const [rightMessages, setRightMessages] = useState([]);
  const [leftLang, setLeftLang] = useState('English');
  const [rightLang, setRightLang] = useState('English');
  const [inputMessage, setInputMessage] = useState('');

  const translateMessage = async (msg, langPref) => {
    const sourceLang = 'en';
    const targetLang = langPref.toLowerCase() === 'english' ? 'en' : langPref.toLowerCase() === 'urdu' ? 'ur' : 'sd';
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(msg)}`;
    try {
      const response = await axios.get(url);
      return response.data[0][0][0];
    } catch (error) {
      console.error('Error translating message:', error);
      return msg; // Return original message if translation fails
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const translatedLeft = await translateMessage(inputMessage, leftLang);
    const translatedRight = await translateMessage(inputMessage, rightLang);

    setLeftMessages([...leftMessages, translatedLeft]);
    setRightMessages([...rightMessages, translatedRight]);
    setInputMessage('');
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-box">
          {leftMessages.map((msg, index) => (
            <div key={index} className="message">
              {msg}
            </div>
          ))}
          <div className="language-select">
            <label>Language: </label>
            <select value={leftLang} onChange={(e) => setLeftLang(e.target.value)}>
              <option>English</option>
              <option>Urdu</option>
              <option>Sindhi</option>
            </select>
          </div>
        </div>
        <div className="chat-box">
          {rightMessages.map((msg, index) => (
            <div key={index} className="message">
              {msg}
            </div>
          ))}
          <div className="language-select">
            <label>Language: </label>
            <select value={rightLang} onChange={(e) => setRightLang(e.target.value)}>
              <option>English</option>
              <option>Urdu</option>
              <option>Sindhi</option>
            </select>
          </div>
        </div>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
