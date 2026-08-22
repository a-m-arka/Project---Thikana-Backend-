import { useCallback, useEffect, useState } from 'react';
import { HiOutlineArrowLeft, HiOutlinePaperAirplane, HiOutlineXMark } from 'react-icons/hi2';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import './messagePanel.scss';

const formatTime = (value) => {
  if (!value) return '';
  return new Intl.DateTimeFormat([], { hour: 'numeric', minute: '2-digit' }).format(
    new Date(value),
  );
};

export default function MessagePanel({ onClose, initialConversation }) {
  const { apiUrl, token } = useAuth();
  const socket = useSocket();
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');

  const request = useCallback(
    async (path, options = {}) => {
      const response = await fetch(`${apiUrl}${path}`, {
        ...options,
        headers: { Authorization: `Bearer ${token}`, ...(options.headers || {}) },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to load messages');
      return data;
    },
    [apiUrl, token],
  );

  const loadConversations = useCallback(async () => {
    try {
      const data = await request('/messages/conversations');
      setConversations(data.data || []);
    } catch (err) {
      setError(err.message);
    }
  }, [request]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (!socket) return undefined;
    const receiveMessage = (message) => {
      loadConversations();
      if (
        selected &&
        (Number(message.sender_id) === Number(selected.other_user_id) ||
          Number(message.receiver_id) === Number(selected.other_user_id))
      ) {
        setMessages((current) =>
          current.some((item) => item.message_id === message.message_id)
            ? current
            : [...current, message],
        );
        if (Number(message.sender_id) === Number(selected.other_user_id)) {
          socket.emit('message:read', { otherUserId: selected.other_user_id });
        }
      }
    };
    socket.on('message:new', receiveMessage);
    return () => socket.off('message:new', receiveMessage);
  }, [socket, selected, loadConversations]);

  const openConversation = async (conversation) => {
    setSelected(conversation);
    setError('');
    try {
      const data = await request(`/messages/conversations/${conversation.other_user_id}`);
      setMessages(data.data || []);
      socket?.emit('message:read', { otherUserId: conversation.other_user_id });
      loadConversations();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (initialConversation) openConversation(initialConversation);
  }, [initialConversation]);

  const sendMessage = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !selected || !socket) return;
    setError('');
    socket.emit(
      'message:send',
      { receiverId: selected.other_user_id, postId: selected.post_id, text },
      (result) => {
        if (!result?.ok) setError(result?.message || 'Unable to send message');
      },
    );
    setDraft('');
  };

  const isMine = (message) => Number(message.sender_id) !== Number(selected?.other_user_id);

  return (
    <section className="message-panel" aria-label="Messages">
      <header className="message-panel__header">
        {selected ? (
          <button
            className="message-panel__back"
            onClick={() => setSelected(null)}
            title="All messages"
          >
            <HiOutlineArrowLeft />
          </button>
        ) : (
          <div>
            <p>Inbox</p>
            <h2>Messages</h2>
          </div>
        )}
        {selected && <h2>{selected.other_user_name}</h2>}
        <button className="message-panel__close" onClick={onClose} title="Close messages">
          <HiOutlineXMark />
        </button>
      </header>

      {error && <p className="message-panel__error">{error}</p>}

      {!selected ? (
        <div className="message-panel__list">
          {conversations.map((conversation) => (
            <button
              key={conversation.other_user_id}
              className="conversation"
              onClick={() => openConversation(conversation)}
            >
              <span className="conversation__avatar">
                {conversation.other_user_name?.slice(0, 1).toUpperCase()}
              </span>
              <span className="conversation__copy">
                <strong>{conversation.other_user_name}</strong>
                <small>{conversation.message_text}</small>
              </span>
              <time>{formatTime(conversation.sent_at)}</time>
            </button>
          ))}
          {!conversations.length && <p className="message-panel__empty">No conversations yet.</p>}
        </div>
      ) : (
        <>
          <div className="message-panel__thread">
            {messages.map((message) => (
              <div
                key={message.message_id}
                className={`message-bubble ${isMine(message) ? 'message-bubble--mine' : ''}`}
              >
                <span>{message.message_text}</span>
                <time>{formatTime(message.sent_at)}</time>
              </div>
            ))}
            {!messages.length && (
              <p className="message-panel__empty">
                Send the first message to {selected.other_user_name}.
              </p>
            )}
          </div>
          <form className="message-panel__composer" onSubmit={sendMessage}>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={`Message ${selected.other_user_name}`}
              maxLength="5000"
            />
            <button type="submit" disabled={!draft.trim() || !socket} title="Send message">
              <HiOutlinePaperAirplane />
            </button>
          </form>
        </>
      )}
    </section>
  );
}
