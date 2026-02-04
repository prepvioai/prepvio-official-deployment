import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  ChevronRight,
  MessageSquare,
  ChevronDown,
  Check,
  Tag,
  Users,
  Calendar,
  Flag,
  User,
  Mail,
  List,
  UserCheck as AssigneeIcon,
  Clock,
  Printer,
  Trash2,
  Paperclip,
  Smile,
  Mic,
  Send,
  Link as LinkIcon,
  Image as ImageIcon,
  ArrowLeft
} from 'lucide-react';
import axios from 'axios';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import socket from '../../socket';

const API_BASE = "http://localhost:5000/api";

// --- Mock Data ---
const mockTicketDetails = {
  title: "Theme customisation issue",
  status: "Open",
  priority: "High Priority",
  customer: "Customer Name",
  conversation: [
    {
      type: "comment",
      user: { name: "Tivo", avatar: "https://placehold.co/40x40/f43f5e/ffffff?text=T" },
      time: "added a comment - 23 minutes ago",
      text: [
        "hello John lui,",
        "you need to create “toolbar-options” div only once in a page in your code, this div fill found every “td” tag in your page, just remove those things",
        "and also in option button add “btn-sm” class in it."
      ],
      code: `<tbody>\n  <tr class="“toolbar-options”">\n    <td>...</td>\n  </tr>\n</tbody>`,
      images: []
    },
    {
      type: "comment",
      user: { name: "User", avatar: "https://placehold.co/40x40/3b82f6/ffffff?text=U" },
      time: "added a comment - 15 minutes ago",
      text: [
        "hello Tivo,",
        "i tried to resolve this issue, but i couldn't, you can see in the screenshot below",
        "please try to resolve this issue, and also in option button add “btn-sm” class in it."
      ],
      code: null,
      images: [
        "https://placehold.co/150x100/4d7c0f/ffffff?text=Image+1",
        "https://placehold.co/150x100/581c87/ffffff?text=Image+2",
        "https://placehold.co/150x100/f59e0b/ffffff?text=Image+3",
        "https://placehold.co/150x100/0d9488/ffffff?text=Image+4",
        "https://placehold.co/150x100/1d4ed8/ffffff?text=Image+5",
      ]
    },
    {
      type: "comment",
      user: { name: "Tivo", avatar: "https://placehold.co/40x40/f43f5e/ffffff?text=T" },
      time: "added a comment - 5 minutes ago",
      text: [
        "hello John lui,",
        "you need to create “toolbar-options” div only once in a page in your code, this div fill found every “td” tag in your page, just remove those things",
        "and also in option button add “btn-sm” class in it."
      ],
      code: `<tbody>\n  <tr class="“toolbar-options”">\n    <td>...</td>\n  </tr>\n</tbody>`,
      images: []
    }
  ]
};

const mockDetailOptions = {
  status: [{ value: 'open', label: 'Open' }, { value: 'closed', label: 'Closed' }],
  assignee: [{ value: 'jack', label: 'Jack P.' }, { value: 'sara', label: 'Sara K.' }],
  customer: [{ value: 'john', label: 'John Lui' }, { value: 'jane', label: 'Jane Doe' }],
  category: [{ value: 'alpha', label: 'Alpha' }, { value: 'beta', label: 'Beta' }],
  assignGroup: [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }],
  created: [{ value: 'today', label: 'Today' }, { value: 'yesterday', label: 'Yesterday' }],
  response: [{ value: 'due', label: 'Due' }, { value: 'overdue', label: 'Overdue' }],
};

// --- Glass Card Component ---
const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 ${className}`}>
    {children}
  </div>
);

// --- Breadcrumbs Component ---
const Breadcrumbs = () => (
  <nav className="flex items-center text-sm text-gray-100 mb-6" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-2">
      <li className="inline-flex items-center">
        <a href="#" className="inline-flex items-center text-gray-100 hover:text-white">
          <Home className="w-4 h-4 mr-2" />
          Home
        </a>
      </li>
      <li>
        <div className="flex items-center">
          <ChevronRight className="w-4 h-4" />
          <a href="#" className="ml-1 text-gray-100 hover:text-white md:ml-2">Ticket</a>
        </div>
      </li>
      <li aria-current="page">
        <div className="flex items-center">
          <ChevronRight className="w-4 h-4" />
          <span className="ml-1 text-gray-300 md:ml-2">Ticket Details</span>
        </div>
      </li>
    </ol>
  </nav>
);

// --- CustomSelect Component (from create-ticket) ---
const CustomSelect = ({ label, options, selected, onSelect, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = icon;

  const handleBlur = () => { setTimeout(() => { setIsOpen(false); }, 150); };

  return (
    <div className="relative mb-4">
      {label && <label className="block text-gray-800 text-sm font-medium mb-1">{label}</label>}
      <button
        type="button"
        className="w-full p-2.5 bg-white/50 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={handleBlur}
      >
        <div className="flex items-center">
          {Icon && <Icon className="w-4 h-4 text-gray-600 mr-2" />}
          <span className="text-sm">{selected ? selected.label : 'Select...'}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 max-h-48 overflow-auto">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-3 py-2 text-sm text-gray-800 hover:bg-indigo-100 cursor-pointer flex justify-between items-center"
                onMouseDown={() => { onSelect(option); setIsOpen(false); }}
              >
                {option.label}
                {selected && selected.value === option.value && <Check className="w-5 h-5 text-indigo-600" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// --- Comment Card Component ---
const CommentCard = ({ comment }) => {
  const isMe = comment.sender === 'Prepvio'; // Based on toClientFormat mapping
  return (
    <div className={`flex gap-4 ${isMe ? 'flex-row-reverse' : ''}`}>
      {comment.avatar ? (
        <div className={`w-10 h-10 rounded-full flex-shrink-0 mt-1 flex items-center justify-center font-bold border ${isMe ? 'bg-indigo-600 text-white' : 'bg-[#D4F478] text-black'}`}>
          {comment.avatar}
        </div>
      ) : (
        <img src={isMe ? "https://placehold.co/40x40/6366f1/ffffff?text=P" : "https://placehold.co/40x40/3b82f6/ffffff?text=U"} alt={comment.sender} className="w-10 h-10 rounded-full flex-shrink-0 mt-1" />
      )}
      <div className={`flex-1 max-w-[80%] ${isMe ? 'text-right' : ''}`}>
        <div className={`border border-white/30 rounded-lg shadow-sm ${isMe ? 'bg-indigo-50/50' : 'bg-white/50'}`}>
          {/* Comment Header */}
          <div className="px-4 py-2 border-b border-white/30 flex justify-between items-center">
            <span className="font-semibold text-gray-900">{comment.sender}</span>
            <span className="text-[10px] text-gray-600">{comment.timestamp}</span>
          </div>
          {/* Comment Body */}
          <div className="p-4">
            <p className="text-gray-800 text-sm whitespace-pre-wrap">{comment.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Reply Box Component ---
const ReplyBox = ({ onSend, loading }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="flex gap-4 mt-6">
      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-1">
        P
      </div>
      <div className="flex-1">
        <GlassCard className="p-0">
          <textarea
            rows="4"
            placeholder="Type your reply..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="w-full p-4 bg-transparent focus:outline-none resize-none text-gray-800 placeholder-gray-600"
          ></textarea>
          {/* Reply Toolbar */}
          <div className="p-3 bg-white/30 border-t border-white/40 flex justify-between items-center rounded-b-2xl">
            <div className="flex items-center gap-3">
              <button className="text-gray-600 hover:text-indigo-600"><Paperclip className="w-5 h-5" /></button>
            </div>
            <button
              onClick={handleSend}
              disabled={loading || !text.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Sending...' : 'Reply'}</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};


// --- Main App Component ---
export default function TicketDetails() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendLoading, setSendLoading] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const appStyle = {
    backgroundImage: "linear-gradient(to right top, #ff6b6b, #ffb347, #ffe780, #ffccb3, #ff8c8c)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  useEffect(() => {
    if (!userId) return;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_BASE}/chat/admin/messages/${userId}`, { withCredentials: true });
        if (res.data.success) {
          setMessages(res.data.messages);
        }
      } catch (err) {
        console.error("Failed to fetch messages", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();

    // Join room for real-time updates
    socket.emit('join_conversation', { userId });

    socket.on("new_message", (message) => {
      setMessages((prev) => {
        if (prev.find(m => m.id === message.id)) return prev;
        return [...prev, message];
      });
    });

    return () => {
      socket.off("new_message");
    };
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendReply = async (text) => {
    setSendLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/chat/send`, { text, receiverId: userId }, { withCredentials: true });
      if (res.data.success) {
        setMessages([...messages, res.data.message]);
      }
    } catch (err) {
      console.error("Failed to send reply", err);
      alert("Failed to send reply");
    } finally {
      setSendLoading(false);
    }
  };

  return (
    <div style={appStyle} className="font-inter flex min-h-screen p-6">
      <div className="flex-1 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Breadcrumbs />

          {/* Ticket Header */}
          <GlassCard className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <Link
                to="/help-desk/ticket/list"
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Tickets</span>
              </Link>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Support Conversation</h1>
              <span className="text-xs text-gray-600">User ID: {userId}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">Student</span>
            </div>
          </GlassCard>

          {/* Conversation Thread */}
          <div className="space-y-6 mb-10">
            {loading ? (
              <div className="text-white text-center py-10">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="text-white text-center py-10">No messages yet.</div>
            ) : (
              messages.map((msg, index) => (
                <CommentCard key={msg.id || index} comment={msg} />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Reply Box */}
          <ReplyBox onSend={handleSendReply} loading={sendLoading} />

        </main>

        {/* Sidebar (Simplified) */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-6">
            <GlassCard>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="mb-4">
                <label className="block text-gray-800 text-sm font-medium mb-1">Status</label>
                <div className="flex items-center p-2.5 bg-white/50 border border-white/30 rounded-lg">
                  <span className="text-sm text-gray-800">Active Chat</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">Admin responses are sent as 'Prepvio Support' to the student.</p>
            </GlassCard>
          </div>
        </aside>
      </div>
    </div>
  );
}
