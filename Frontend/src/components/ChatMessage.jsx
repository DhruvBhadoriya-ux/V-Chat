import { BotIcon, UserIcon, BookOpenIcon } from './Icons';

export default function ChatMessage({ message }) {
  const isAi = message.sender === 'ai';

  return (
    <div className={`message-row ${isAi ? 'message-ai' : 'message-user'}`}>
      <div className="message-container">
        {/* Avatar */}
        <div className={`message-avatar ${isAi ? 'avatar-ai' : 'avatar-user'}`}>
          {isAi ? <BotIcon className="avatar-icon" /> : <UserIcon className="avatar-icon" />}
        </div>

        {/* Message Bubble & Content */}
        <div className="message-content-wrapper">
          <div className="message-header-meta">
            <span className="sender-name">{isAi ? 'V-CHAT' : 'You'}</span>
            {message.time && <span className="message-timestamp">{message.time}</span>}
          </div>

          <div className="message-bubble">
            <div className="message-body">
              {message.text.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="message-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Lecture Sources */}
            {isAi && message.sources?.length > 0 && (
              <div className="source-citation-card">
                <div className="source-citation-header">
                  <BookOpenIcon className="source-icon" />
                  <span className="source-label">Lecture Sources</span>
                </div>

                {message.sources.map((source, index) => (
                  <div className="source-citation-text" key={index}>
                    <strong>{source.title}</strong>
                    <br />
                    Video {source.video_number} • {source.start_time} - {source.end_time}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
