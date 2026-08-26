import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchChatStatus, sendChatMessage } from '../api';
import { contactInfo } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { ApiError, ChatMessage } from '../types';

function createMessage(role: ChatMessage['role'], content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    createdAt: Date.now(),
  };
}

export default function LiveChat() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMessages([createMessage('assistant', t.liveChat.welcome)]);
  }, [t.liveChat.welcome]);

  useEffect(() => {
    fetchChatStatus()
      .then((status) => setIsOnline(status.available))
      .catch(() => setIsOnline(false));
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isSending]);

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isSending) {
      return;
    }

    setError('');
    setIsSending(true);

    const userMessage = createMessage('user', trimmed);
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');

    try {
      const response = await sendChatMessage(
        nextMessages.map(({ role, content: messageContent }) => ({
          role,
          content: messageContent,
        }))
      );

      setMessages((current) => [...current, createMessage('assistant', response.reply)]);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || t.contact.genericError);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await sendMessage(input);
  };

  const handleQuickPrompt = async (prompt: string) => {
    await sendMessage(prompt);
  };

  return (
    <div className={`live-chat${isOpen ? ' live-chat--open' : ''}`}>
      {isOpen && (
        <section className="live-chat-panel" id="live-chat-panel" aria-label={t.liveChat.title}>
          <header className="live-chat-header">
            <div className="live-chat-header-copy">
              <h2>{t.liveChat.title}</h2>
              <p className="live-chat-status">
                <span
                  className={`live-chat-status-dot${isOnline ? ' live-chat-status-dot--online' : ''}`}
                  aria-hidden="true"
                />
                {isOnline ? t.liveChat.liveNow : t.liveChat.offline}
              </p>
            </div>
            <button
              type="button"
              className="live-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label={t.liveChat.close}
            >
              ×
            </button>
          </header>

          <div className="live-chat-messages" role="log" aria-live="polite" aria-relevant="additions">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`live-chat-message live-chat-message--${message.role}`}
              >
                <div className="live-chat-bubble">{message.content}</div>
              </div>
            ))}

            {isSending && (
              <div className="live-chat-message live-chat-message--assistant">
                <div className="live-chat-bubble live-chat-bubble--typing" aria-label={t.liveChat.typing}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && !isSending && (
            <div className="live-chat-quick-prompts">
              {t.liveChat.prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="live-chat-quick-prompt"
                  onClick={() => handleQuickPrompt(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {error && <p className="live-chat-error">{error}</p>}

          <footer className="live-chat-footer">
            <form className="live-chat-form" onSubmit={handleSubmit}>
              <label htmlFor="live-chat-input" className="sr-only">
                {t.liveChat.inputLabel}
              </label>
              <textarea
                id="live-chat-input"
                ref={inputRef}
                className="live-chat-input"
                rows={2}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t.liveChat.placeholder}
                disabled={isSending}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage(input);
                  }
                }}
              />
              <button type="submit" className="live-chat-send" disabled={isSending || !input.trim()}>
                {t.liveChat.send}
              </button>
            </form>
            <p className="live-chat-footer-note">
              {t.liveChat.preferCall}{' '}
              <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`}>{contactInfo.phone}</a>{' '}
              {t.liveChat.or}{' '}
              <Link to="/contact">{t.liveChat.requestQuote}</Link>.
            </p>
          </footer>
        </section>
      )}

      <button
        type="button"
        className="live-chat-launcher"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="live-chat-panel"
        aria-label={isOpen ? t.liveChat.close : t.liveChat.open}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
        )}
        {!isOpen && <span className="live-chat-launcher-badge" aria-hidden="true" />}
      </button>
    </div>
  );
}
