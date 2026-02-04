import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  LayoutGrid,
  List,
  MessageSquare,
  Heart,
  Eye,
  Trash2,
  UserCheck,
  CalendarDays,
  Ticket,
  Bell,
  Settings
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = "http://localhost:5000/api";

// --- Mock Data ---
// This would normally come from your MERN backend API

const mockTicket = {
  id: 1,
  user: {
    name: "John lui",
    avatar: "https://placehold.co/48x48/6366f1/ffffff?text=JL",
    tickets: 1,
    likes: 3,
  },
  status: "Replied",
  assignedTo: "Robert alia",
  updated: "22 hours ago",
  comments: 9,
  title: "Theme customisation issue",
  lastComment: {
    user: "Robert alia",
    avatar: "https://placehold.co/32x32/ec4899/ffffff?text=RA",
    text: "hello John lui, \n\nyou need to create “toolbar-options” div only once in a page in your code, this div fill found every “td” tag in your page, \njust remove those things and also in option button add"
  }
};

const mockCategories = [
  { name: "Piaf able", tag1: 1, tag2: 3, color: "bg-green-100 text-green-700", initial: "A" },
  { name: "Pro able", tag1: null, tag2: 3, color: "bg-blue-100 text-blue-700", initial: "B" },
  { name: "CRM admin", tag1: 1, tag2: 3, color: "bg-purple-100 text-purple-700", initial: "C" },
  { name: "Alpha pro", tag1: null, tag2: 3, color: "bg-yellow-100 text-yellow-700", initial: "D" },
  { name: "Carbon able", tag1: null, tag2: 3, color: "bg-gray-100 text-gray-700", initial: "E" },
];

const mockAgents = [
  { name: "Tom Cook", avatar: "https://placehold.co/32x32/f43f5e/ffffff?text=TC", tag1: 1, tag2: 3 },
  { name: "Robert alia", avatar: "https://placehold.co/32x32/ec4899/ffffff?text=RA", tag1: null, tag2: 3 },
];

// --- Glass Card Component ---
// Reusable component for the glassmorphism effect
const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 ${className}`}>
    {children}
  </div>
);

// --- Individual Components ---

const Breadcrumbs = () => (
  <nav className="flex items-center text-sm text-gray-100 mb-4" aria-label="Breadcrumb">
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
          <a href="#" className="ml-1 text-gray-100 hover:text-white md:ml-2">Helpdesk</a>
        </div>
      </li>
      <li aria-current="page">
        <div className="flex items-center">
          <ChevronRight className="w-4 h-4" />
          <span className="ml-1 text-gray-300 md:ml-2">Ticket list</span>
        </div>
      </li>
    </ol>
  </nav>
);

const TicketCard = ({ conversation, onClick }) => (
  <GlassCard className="flex flex-col md:flex-row gap-6 cursor-pointer hover:bg-white/40 transition-all" onClick={onClick}>
    {/* Left Info Bar */}
    <div className="flex flex-col items-center p-4 rounded-lg w-full md:w-32 flex-shrink-0">
      {conversation.userId?.avatar ? (
        <img src={conversation.userId.avatar} alt={conversation.userId.name} className="w-16 h-16 rounded-full border-2 border-white/50 shadow-md object-cover" />
      ) : (
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-2xl border-2 border-white/50 shadow-md">
          {conversation.userId?.name?.charAt(0) || 'U'}
        </div>
      )}
      <div className="text-center mt-4 text-gray-800">
        <div className="flex items-center justify-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-700" />
          <span className="font-semibold">{conversation.unreadCount > 0 ? `${conversation.unreadCount} New` : 'Read'}</span>
        </div>
      </div>
    </div>

    {/* Main Ticket Content */}
    <div className="flex-grow">
      {/* Ticket Header */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-700">
        <h3 className="text-xl font-bold text-gray-900">{conversation.userId?.name || 'Unknown User'}</h3>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${conversation.unreadCount > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {conversation.unreadCount > 0 ? 'Action Required' : 'Replied'}
        </span>
        <div className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <span>Last active {new Date(conversation.lastMessageTime).toLocaleString()}</span>
        </div>
      </div>

      {/* Ticket Body */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Support Conversation</h4>

        {/* Last Message Preview */}
        <div className="bg-white/50 rounded-lg p-4 border border-white/30 truncate">
          <p className="text-gray-700 text-sm">
            <span className="font-bold">Last message:</span> {conversation.lastMessage}
          </p>
        </div>
      </div>

      {/* Ticket Footer Actions */}
      <div className="flex items-center gap-4 mt-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300">
          <Eye className="w-5 h-5" />
          <span>View Conversation</span>
        </button>
      </div>
    </div>
  </GlassCard>
);

const MainContent = () => {
  const [viewMode, setViewMode] = useState('list');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(`${API_BASE}/chat/admin/conversations`, { withCredentials: true });
        if (res.data.success) {
          setConversations(res.data.conversations);
        }
      } catch (err) {
        console.error("Failed to fetch conversations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <Breadcrumbs />
      <h1 className="text-4xl font-bold text-white mb-6">Conversation List</h1>

      {/* Ticket List Header */}
      <GlassCard className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">User Messages</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white/50 text-gray-700 hover:bg-white/80'}`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white/50 text-gray-700 hover:bg-white/80'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </GlassCard>

      {/* Conversations */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-white text-center py-10">Loading conversations...</div>
        ) : conversations.length === 0 ? (
          <div className="text-white text-center py-10">No conversations found.</div>
        ) : (
          conversations.map((conv) => (
            <TicketCard
              key={conv._id}
              conversation={conv}
              onClick={() => conv.userId?._id && navigate(`/help-desk/ticket/details?userId=${conv.userId._id}`)}
            />
          ))
        )}
      </div>
    </main>
  );
};

const Sidebar = () => (
  <aside className="w-full lg:w-80 flex-shrink-0 p-6 space-y-6 overflow-y-auto">
    {/* Ticket Categories */}
    <GlassCard>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Ticket Categories</h3>
      <ul className="space-y-3">
        {mockCategories.map((cat) => (
          <li key={cat.name} className="flex items-center justify-between text-gray-800">
            <div className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${cat.color}`}>
                {cat.initial}
              </span>
              <span className="font-medium">{cat.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {cat.tag1 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-100 text-red-700">
                  {cat.tag1}
                </span>
              )}
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gray-200 text-gray-700">
                {cat.tag2}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </GlassCard>

    {/* Support Agents */}
    <GlassCard>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Support Agent</h3>
      <ul className="space-y-3">
        {mockAgents.map((agent) => (
          <li key={agent.name} className="flex items-center justify-between text-gray-800">
            <div className="flex items-center gap-3">
              <img src={agent.avatar} alt={agent.name} className="w-8 h-8 rounded-full" />
              <span className="font-medium">{agent.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {agent.tag1 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-100 text-red-700">
                  {agent.tag1}
                </span>
              )}
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gray-200 text-gray-700">
                {agent.tag2}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </GlassCard>
  </aside>
);

// --- Main App Component ---
export default function App() {
  // A background is needed to see the glass effect
  const appStyle = {
    // Updated background to a mix of red, yellow, orange, pink
    backgroundImage: "linear-gradient(to right top, #ff6b6b, #ffb347, #ffe780, #ffccb3, #ff8c8c)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensure it covers the full height
  };

  return (
    <div style={appStyle} className="font-inter flex flex-col lg:flex-row min-h-screen">
      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <MainContent />
        <Sidebar />
      </div>

      {/* Placeholder for the purple button in the corner */}
      <button className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all">
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
}