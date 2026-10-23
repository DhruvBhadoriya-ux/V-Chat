import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { INITIAL_CONVERSATIONS } from './mockData';
import './App.css';

export default function App() {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState('html-basics');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Get currently active conversation
  const activeChat = conversations.find((chat) => chat.id === activeChatId) || conversations[0];

  // Handler: Switching between chat history items
  const handleSelectChat = (id) => {
    setActiveChatId(id);
  };

  // Handler: Starting a new chat
  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat = {
      id: newChatId,
      title: 'New Discussion',
      course: 'Course Notes',
      messages: []
    };

    setConversations((prev) => [newChat, ...prev]);
    setActiveChatId(newChatId);
  };

  // Handler: Sending a message (client-side simulation for beginner-friendly UI)
  const handleSendMessage = async (text) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: timeString
    };

    // Add user's message immediately
    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChat.id) {
          const updatedTitle =
            chat.title === 'New Discussion'
              ? text.slice(0, 24) + (text.length > 24 ? '...' : '')
              : chat.title;

          return {
            ...chat,
            title: updatedTitle,
            messages: [...chat.messages, userMessage]
          };
        }

        return chat;
      })
    );

    // Show AI typing indicator
    setIsAiTyping(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: text
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from V-CHAT backend');
      }

      const data = await response.json();

      const aiReply = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.answer,
        sources: data.sources || [],
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setConversations((prev) =>
        prev.map((chat) => {
          if (chat.id === activeChat.id) {
            return {
              ...chat,
              messages: [...chat.messages, aiReply]
            };
          }

          return chat;
        })
      );
    } catch (error) {
      console.error('V-CHAT API Error:', error);

      const errorMessage = {
        id: `error-${Date.now()}`,
        sender: 'ai',
        text: 'Sorry, I could not connect to the V-CHAT AI backend. Please make sure the backend server is running.',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setConversations((prev) =>
        prev.map((chat) => {
          if (chat.id === activeChat.id) {
            return {
              ...chat,
              messages: [...chat.messages, errorMessage]
            };
          }

          return chat;
        })
      );
    } finally {
      setIsAiTyping(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Left Sidebar */}
      <Sidebar
        conversations={conversations}
        activeChatId={activeChat?.id}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Chat Area */}
      <ChatArea
        activeChat={activeChat}
        onSendMessage={handleSendMessage}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isAiTyping={isAiTyping}
      />
    </div>
  );
}
