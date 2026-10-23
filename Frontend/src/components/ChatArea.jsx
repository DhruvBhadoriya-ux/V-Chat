import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { MenuIcon, SparklesIcon } from './Icons';
import { WELCOME_MESSAGE } from '../mockData';

export default function ChatArea({
  activeChat,
  onSendMessage,
  onToggleSidebar,
  isAiTyping
}) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, isAiTyping]);

  return (
    <main className="main-chat-area">
      {/* Top Header */}
      <header className="chat-header">
        <div className="chat-header-left">
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation menu"
          >
            <MenuIcon className="icon-svg" />
          </button>

          <div className="chat-header-titles">
            <h1 className="chat-main-heading">V-CHAT</h1>
            <p className="chat-sub-heading">Ask anything about your lectures</p>
          </div>
        </div>

        <div className="chat-header-right">
          <div className="status-badge">
            <span className="status-dot"></span>
            <span className="status-text">Lectures Indexed</span>
          </div>
        </div>
      </header>

      {/* Messages Scroll Area */}
      <div className="chat-messages-container">
        <div className="chat-messages-inner">
          {/* Welcome Card & Suggestions if at the start or in a new chat */}
          {(!activeChat?.messages || activeChat.messages.length === 0) && (
            <div className="welcome-card">
              <div className="welcome-icon-box">
                <SparklesIcon className="welcome-sparkle-icon" />
              </div>
              <h2 className="welcome-title">{WELCOME_MESSAGE.title}</h2>
              <p className="welcome-subtitle">{WELCOME_MESSAGE.subtitle}</p>
              <p className="welcome-desc">{WELCOME_MESSAGE.description}</p>

              <div className="suggestions-grid">
                {WELCOME_MESSAGE.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    className="suggestion-chip"
                    onClick={() => onSendMessage(suggestion)}
                  >
                    <span>{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* List of Messages */}
          {activeChat?.messages?.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* AI Typing Indicator */}
          {isAiTyping && (
            <div className="typing-indicator-row">
              <div className="typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Bottom Message Input Area */}
      <ChatInput onSendMessage={onSendMessage} disabled={isAiTyping} />
    </main>
  );
}
