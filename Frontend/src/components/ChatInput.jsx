import { useState } from 'react';
import { SendIcon, MicIcon } from './Icons';

export default function ChatInput({ onSendMessage, disabled = false }) {
  const [inputText, setInputText] = useState('');
  const [isMicActive, setIsMicActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleMicClick = () => {
    // Simulated UI toggle for microphone
    setIsMicActive((prev) => !prev);
  };

  return (
    <div className="chat-input-wrapper">
      <form onSubmit={handleSubmit} className="chat-input-card">
        {/* Microphone action button */}
        <button
          type="button"
          className={`input-action-btn mic-btn ${isMicActive ? 'mic-active' : ''}`}
          onClick={handleMicClick}
          title={isMicActive ? 'Microphone listening (visual demo)' : 'Use microphone'}
          aria-label="Microphone input"
        >
          <MicIcon className="icon-svg" />
        </button>

        {/* Text Input */}
        <input
          type="text"
          className="chat-text-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask V-CHAT anything..."
          disabled={disabled}
        />

        {/* Send Action Button */}
        <button
          type="submit"
          className="input-action-btn send-btn"
          disabled={!inputText.trim() || disabled}
          title="Send message"
          aria-label="Send message"
        >
          <SendIcon className="icon-svg" />
        </button>
      </form>

      {/* University RAG Platform disclaimer */}
      <div className="input-disclaimer">
        <span>V-CHAT searches across your course lecture slides and transcripts.</span>
      </div>
    </div>
  );
}
