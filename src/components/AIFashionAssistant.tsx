import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaShoppingBag,
  FaCheck,
  FaRedo,
  FaLightbulb,
  FaMinus,
  FaExpandAlt
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { generateStylistAdvice, type ChatMessage, type CuratedOutfit } from '../utils/aiStylist';

const STARTER_PROMPTS = [
  { label: '💍 What should I wear for a wedding?', query: 'What should I wear for a wedding?' },
  { label: '💼 Smart Business Casual Outfit', query: 'Recommend a smart business casual outfit' },
  { label: '✨ Date Night & Cocktail Look', query: 'What should I wear for a romantic date night dinner?' },
  { label: '☀️ Summer Vacation Coordinates', query: 'Suggest a stylish summer vacation outfit' },
  { label: '🧥 Match Classic Men’s Jacket', query: 'What pants and shoes match the Classic Men’s Jacket?' },
  { label: '👗 Match Silk Midi Dress', query: 'What should I pair with the Silk Midi Evening Dress?' }
];

export const AIFashionAssistant: React.FC = () => {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addedOutfitId, setAddedOutfitId] = useState<string | null>(null);
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

  // Initial welcome message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hello! I'm your **Fashion World AI Stylist** 🤖✨\n\nTell me about an occasion (e.g. *"What should I wear for a wedding?"*), ask for color matching, or explore head-to-toe curated ensembles!`,
      suggestions: [
        'What should I wear for a wedding?',
        'Recommend a business casual look',
        'Date night outfit ideas',
        'Summer vacation styles'
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Listen for global 'open-ai-stylist' custom event
  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string }>;
      setIsOpen(true);
      setIsMinimized(false);
      if (customEvent.detail?.prompt) {
        handleUserSend(customEvent.detail.prompt);
      }
    };
    window.addEventListener('open-ai-stylist', handleOpenEvent);
    return () => window.removeEventListener('open-ai-stylist', handleOpenEvent);
  }, []);

  // Auto scroll chat to bottom when messages update
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        chatInputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, isMinimized]);

  const handleUserSend = (queryToSend?: string) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI thinking and styling consultation
    setTimeout(() => {
      const advice = generateStylistAdvice(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: advice.text,
        outfits: advice.outfits,
        suggestions: advice.suggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: `Chat reset. I am ready for your next styling request! What occasion are you dressing for today?`,
        suggestions: [
          'What should I wear for a wedding?',
          'Recommend a business casual look',
          'Date night outfit ideas',
          'Summer vacation styles'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Add individual item to cart
  const handleAddSingleItem = (product: any, color: string) => {
    const key = `${product.id}-${color}`;
    addToCart(product, 1, product.sizes?.[0] || 'M', color);
    setAddedItemKey(key);
    setTimeout(() => {
      setAddedItemKey(null);
    }, 1800);
  };

  // Add complete outfit bundle to cart in 1 click
  const handleAddFullOutfit = (outfit: CuratedOutfit) => {
    outfit.items.forEach((item) => {
      addToCart(item.product, 1, item.product.sizes?.[0] || 'M', item.selectedColor);
    });
    setAddedOutfitId(outfit.id);
    setTimeout(() => {
      setAddedOutfitId(null);
    }, 2200);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="ai-stylist-floating-launcher">
        {!isOpen && (
          <button
            type="button"
            className="ai-stylist-trigger-btn shadow-lg"
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            aria-label="Open AI Fashion Stylist"
            title="Ask AI Fashion Stylist for Outfit Recommendations"
          >
            <div className="ai-stylist-icon-pulse">
              <FaRobot size={20} />
            </div>
            <span className="ai-stylist-btn-label d-none d-md-inline">AI Stylist</span>
            <span className="ai-stylist-live-dot" />
          </button>
        )}
      </div>

      {/* Main AI Chat Window Modal / Drawer */}
      {isOpen && (
        <div className={`ai-stylist-modal-card ${isMinimized ? 'minimized' : ''} shadow-2xl`}>
          {/* Header Bar */}
          <div className="ai-stylist-header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <div className="ai-avatar-badge">
                <FaRobot size={15} />
              </div>
              <div>
                <h6 className="mb-0 fw-bold text-white d-flex align-items-center gap-1">
                  <span>AI Fashion Stylist</span>
                  <span className="badge bg-warning text-dark font-monospace py-0 px-1" style={{ fontSize: '0.65rem' }}>
                    PRO
                  </span>
                </h6>
                <span className="ai-status-indicator text-white-50 small" style={{ fontSize: '0.72rem' }}>
                  <span className="online-green-dot" /> Ready to recommend outfits
                </span>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="d-flex align-items-center gap-1">
              <button
                type="button"
                className="ai-header-btn"
                onClick={handleResetChat}
                title="Restart Conversation"
                aria-label="Restart Conversation"
              >
                <FaRedo size={12} />
              </button>
              <button
                type="button"
                className="ai-header-btn"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand Chat' : 'Minimize Chat'}
                aria-label={isMinimized ? 'Expand Chat' : 'Minimize Chat'}
              >
                {isMinimized ? <FaExpandAlt size={12} /> : <FaMinus size={12} />}
              </button>
              <button
                type="button"
                className="ai-header-btn"
                onClick={() => setIsOpen(false)}
                title="Close AI Stylist"
                aria-label="Close AI Stylist"
              >
                <FaTimes size={14} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Message List Area */}
              <div className="ai-stylist-body custom-scrollbar">
                {messages.map((msg) => (
                  <div key={msg.id} className={`ai-chat-bubble-wrap ${msg.sender}`}>
                    {msg.sender === 'ai' && (
                      <div className="ai-chat-avatar">
                        <FaRobot size={12} />
                      </div>
                    )}

                    <div className="ai-bubble-content">
                      {/* Text content with formatted bold / paragraphs */}
                      <div className="ai-bubble-text">
                        {msg.text.split('\n\n').map((paragraph, pIdx) => (
                          <p key={pIdx} className="mb-2 last-mb-0">
                            {paragraph.split('**').map((chunk, cIdx) =>
                              cIdx % 2 === 1 ? <strong key={cIdx}>{chunk}</strong> : chunk
                            )}
                          </p>
                        ))}
                      </div>

                      {/* Curated Outfit Recommendations Embed */}
                      {msg.outfits && msg.outfits.length > 0 && (
                        <div className="ai-outfits-container mt-3">
                          {msg.outfits.map((outfit) => {
                            const outfitPrice = outfit.items.reduce(
                              (sum, item) => sum + item.product.price,
                              0
                            );
                            const isOutfitAdded = addedOutfitId === outfit.id;

                            return (
                              <div key={outfit.id} className="ai-outfit-card mb-3">
                                {/* Outfit Title & Description */}
                                <div className="ai-outfit-card-header p-3 border-bottom">
                                  <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                                    <h6 className="fw-bold mb-0 text-dark" style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem' }}>
                                      {outfit.title}
                                    </h6>
                                    <span className="badge bg-dark text-warning small px-2 py-1 flex-shrink-0">
                                      {outfit.items.length} Pieces
                                    </span>
                                  </div>
                                  <p className="text-muted small mb-0" style={{ fontSize: '0.78rem', lineHeight: '1.35' }}>
                                    {outfit.description}
                                  </p>
                                </div>

                                {/* Outfit Items Grid */}
                                <div className="ai-outfit-items-list p-2">
                                  {outfit.items.map((item, idx) => {
                                    const itemImg =
                                      (item.product.colorImages &&
                                        item.selectedColor &&
                                        item.product.colorImages[item.selectedColor]?.[0]) ||
                                      item.product.image;
                                    const itemKey = `${item.product.id}-${item.selectedColor}`;
                                    const isItemAdded = addedItemKey === itemKey;

                                    return (
                                      <div key={idx} className="ai-outfit-item-row p-2 rounded-2 mb-1">
                                        <div className="d-flex align-items-center gap-2">
                                          {/* Item Image with Fallback */}
                                          <div className="ai-outfit-item-thumb">
                                            <img
                                              src={itemImg}
                                              alt={item.product.name}
                                              onError={(e) => {
                                                const target = e.currentTarget;
                                                target.onerror = null;
                                                target.src = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80';
                                              }}
                                            />
                                          </div>

                                          {/* Details */}
                                          <div className="flex-grow-1 min-w-0">
                                            <div className="d-flex align-items-center gap-1 mb-1">
                                              <span className="ai-item-role-badge">
                                                {item.role}
                                              </span>
                                              <span className="text-muted small" style={{ fontSize: '0.7rem' }}>
                                                Color: <strong>{item.selectedColor}</strong>
                                              </span>
                                            </div>
                                            <Link
                                              to={`/products/${item.product.id}`}
                                              className="ai-item-name text-truncate d-block fw-semibold text-dark text-decoration-none"
                                              title={item.product.name}
                                              onClick={() => setIsOpen(false)}
                                            >
                                              {item.product.name}
                                            </Link>
                                            <div className="d-flex align-items-center justify-content-between mt-1">
                                              <span className="fw-bold text-dark small" style={{ fontSize: '0.82rem' }}>
                                                ${item.product.price.toFixed(2)}
                                              </span>
                                              <button
                                                type="button"
                                                className={`btn btn-xs py-0 px-2 rounded-pill d-inline-flex align-items-center gap-1 ${
                                                  isItemAdded ? 'btn-success text-white' : 'btn-outline-secondary'
                                                }`}
                                                style={{ fontSize: '0.72rem', height: '22px' }}
                                                onClick={() => handleAddSingleItem(item.product, item.selectedColor)}
                                                title={`Add ${item.product.name} (${item.selectedColor}) to bag`}
                                              >
                                                {isItemAdded ? (
                                                  <>
                                                    <FaCheck size={9} />
                                                    <span>Added</span>
                                                  </>
                                                ) : (
                                                  <>
                                                    <FaShoppingBag size={9} />
                                                    <span>Add Item</span>
                                                  </>
                                                )}
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Full Outfit 1-Click Action Footer */}
                                <div className="ai-outfit-card-footer p-2 bg-light border-top d-flex align-items-center justify-content-between">
                                  <div>
                                    <span className="text-muted small d-block" style={{ fontSize: '0.7rem' }}>
                                      Complete Outfit Price:
                                    </span>
                                    <span className="fw-bold text-dark fs-6">
                                      ${outfitPrice.toFixed(2)}
                                    </span>
                                  </div>

                                  <button
                                    type="button"
                                    className={`btn btn-sm px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1 fw-semibold shadow-xs ${
                                      isOutfitAdded ? 'btn-success text-white' : 'btn-fashion-primary'
                                    }`}
                                    onClick={() => handleAddFullOutfit(outfit)}
                                  >
                                    {isOutfitAdded ? (
                                      <>
                                        <FaCheck size={11} />
                                        <span>Full Outfit Added!</span>
                                      </>
                                    ) : (
                                      <>
                                        <FaShoppingBag size={11} />
                                        <span>Add Full Outfit to Bag</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Follow-up Suggestion Chips */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="ai-suggestions-wrap mt-2">
                          <span className="ai-suggestions-label small text-muted d-block mb-1" style={{ fontSize: '0.72rem' }}>
                            <FaLightbulb className="text-warning me-1" size={10} />
                            Suggested questions:
                          </span>
                          <div className="d-flex flex-wrap gap-1">
                            {msg.suggestions.map((sug, sIdx) => (
                              <button
                                key={sIdx}
                                type="button"
                                className="ai-suggestion-chip"
                                onClick={() => handleUserSend(sug)}
                              >
                                {sug}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <span className="ai-bubble-time">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}

                {/* Live Typing Animation Indicator */}
                {isTyping && (
                  <div className="ai-chat-bubble-wrap ai">
                    <div className="ai-chat-avatar">
                      <FaRobot size={12} />
                    </div>
                    <div className="ai-typing-indicator">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                      <span className="ai-typing-text">Stylist is curating your outfit...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Starter Quick Pills (if only 1 message exists) */}
              {messages.length <= 1 && (
                <div className="ai-starter-pills-bar p-2 border-top bg-light">
                  <span className="text-muted small fw-semibold d-block mb-1" style={{ fontSize: '0.72rem' }}>
                    Popular Styling Requests:
                  </span>
                  <div className="d-flex flex-wrap gap-1">
                    {STARTER_PROMPTS.map((sp, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="btn btn-sm btn-outline-secondary rounded-pill py-0 px-2"
                        style={{ fontSize: '0.74rem' }}
                        onClick={() => handleUserSend(sp.query)}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input Bar */}
              <div className="ai-stylist-footer p-2 border-top bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUserSend();
                  }}
                  className="d-flex align-items-center gap-2"
                >
                  <input
                    ref={chatInputRef}
                    type="text"
                    className="form-control form-control-sm rounded-pill ai-input-field"
                    placeholder="Ask: 'What should I wear for a wedding?' or match colors..."
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    className="btn btn-fashion-primary rounded-circle ai-send-btn p-0 d-inline-flex align-items-center justify-content-center"
                    disabled={!inputQuery.trim() || isTyping}
                    title="Send styling question"
                    aria-label="Send question"
                  >
                    <FaPaperPlane size={12} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AIFashionAssistant;
