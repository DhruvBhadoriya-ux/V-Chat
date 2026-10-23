import { LogoIcon, PlusIcon, ChatIcon, CloseIcon } from './Icons';

export default function Sidebar({
  conversations,
  activeChatId,
  onSelectChat,
  onNewChat,
  isOpen,
  onClose
}) {
  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Top Header Branding */}
        <div className="sidebar-header">
          <div className="brand-wrapper">
            <div className="brand-logo-icon">
              <LogoIcon className="icon-svg" />
            </div>
            <div className="brand-text-container">
              <span className="brand-title">V-CHAT</span>
              <span className="brand-badge">RAG AI</span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button 
            type="button" 
            className="mobile-close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <CloseIcon className="icon-svg" />
          </button>
        </div>

        {/* New Chat Action Button */}
        <div className="sidebar-action">
          <button 
            type="button" 
            className="new-chat-btn"
            onClick={() => {
              onNewChat();
              if (onClose) onClose();
            }}
          >
            <PlusIcon className="btn-icon" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat History Section */}
        <div className="sidebar-history-section">
          <div className="section-label">
            <span>Chat History</span>
          </div>

          <div className="history-list">
            {conversations.map((chat) => {
              const isActive = activeChatId === chat.id;
              return (
                <button
                  key={chat.id}
                  type="button"
                  className={`history-item ${isActive ? 'history-item-active' : ''}`}
                  onClick={() => {
                    onSelectChat(chat.id);
                    if (onClose) onClose();
                  }}
                >
                  <ChatIcon className="history-icon" />
                  <div className="history-details">
                    <span className="history-title">{chat.title}</span>
                    {chat.course && (
                      <span className="history-subtitle">{chat.course}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Academic / Student Profile Footer */}
        <div className="sidebar-footer">
          <div className="student-profile">
            <div className="student-avatar">
              <span>CS</span>
            </div>
            <div className="student-info">
              <span className="student-name">Student Portal</span>
              <span className="student-course">Fall Semester 2026</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
