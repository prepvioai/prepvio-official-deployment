import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TrendingUp, TrendingDown, Users, MessageSquare,
  ChevronRight, Home, Clock, CheckCircle, AlertCircle,
  Eye, Gift, User, ArrowUp, ArrowDown, Activity,
  BarChart3, LifeBuoy
} from "lucide-react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { Link } from 'react-router-dom';

const API_BASE = "http://localhost:5000/api";

// --- Glass Components ---
const GlassCard = ({ title, children, info, className = "" }) => (
  <div className={`bg-white/40 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 ${className}`}>
    {(title || info) && (
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        {info && <span className="text-sm text-slate-600 font-medium px-3 py-1 bg-white/50 rounded-full">{info}</span>}
      </div>
    )}
    {children}
  </div>
);

const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
  <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className={`flex items-center px-2.5 py-1 rounded-full text-sm font-bold ${trend === 'up' ? 'bg-emerald-100/50 text-emerald-700' : 'bg-rose-100/50 text-rose-700'}`}>
        {trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
        {change}
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-3xl font-black text-slate-800 tracking-tight">{value}</h3>
      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
    </div>
  </div>
);

const Breadcrumbs = () => (
  <nav className="flex items-center text-sm mb-6" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-2">
      <li className="inline-flex items-center text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
        <Home className="w-4 h-4 mr-2" />
        Home
      </li>
      <li className="flex items-center text-slate-400">
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="hover:text-indigo-600 transition-colors cursor-pointer">Helpdesk</span>
      </li>
      <li className="flex items-center text-indigo-600 font-bold">
        <ChevronRight className="w-4 h-4 mx-1" />
        <span>Dashboard</span>
      </li>
    </ol>
  </nav>
);

export default function HDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    closed: 0,
    messagesToday: 0
  });
  const [latestActivity, setLatestActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE}/chat/admin/stats`, { withCredentials: true });
        if (res.data.success) {
          setStats(res.data.stats);
          setLatestActivity(res.data.latestConversations.map(conv => ({
            id: conv.id,
            userId: conv.userId, // Store the actual user ID
            userName: conv.userName,
            text: `Replied with: "${conv.lastMessage || '...'}"`,
            time: new Date(conv.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            icon: <MessageSquare className="w-4 h-4 text-white" />,
            color: "bg-blue-500"
          })));
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Synthetic trend data for charts
  const chatVolumeData = [
    { name: 'Mon', volume: 45, resolved: 32 },
    { name: 'Tue', volume: 52, resolved: 41 },
    { name: 'Wed', volume: 38, resolved: 35 },
    { name: 'Thu', volume: 65, resolved: 58 },
    { name: 'Fri', volume: 48, resolved: 42 },
    { name: 'Sat', volume: 24, resolved: 20 },
    { name: 'Sun', volume: 30, resolved: 28 },
  ];

  const resolutionData = [
    { name: 'Active', value: stats.active || 0, color: '#3b82f6' },
    { name: 'Pending', value: stats.pending || 0, color: '#f59e0b' },
    { name: 'Closed', value: stats.closed || 0, color: '#10b981' },
  ];

  const COLORS = ['#3b82f6', '#f59e0b', '#10b981'];

  const appStyle = {
    backgroundImage: "linear-gradient(to right top, #ff6b6b, #ffb347, #ffe780, #ffccb3, #ff8c8c)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
  };

  return (
    <div style={appStyle} className="font-inter flex flex-col min-h-screen p-8">
      <div className="max-w-7xl mx-auto w-full">
        <Breadcrumbs />
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black text-slate-800 drop-shadow-sm">Helpdesk Analytics</h1>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-white/60 backdrop-blur-md rounded-xl font-bold text-slate-700 shadow-md border border-white hover:bg-white transition-all">Refresh</button>
            <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all">Download Report</button>
          </div>
        </div>

        {/* --- Top Metrics Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Conversations"
            value={stats.total}
            change="+12.5%"
            trend="up"
            icon={Activity}
            color="from-blue-500 to-indigo-600"
          />
          <StatCard
            title="Messages Today"
            value={stats.messagesToday}
            change="+18.2%"
            trend="up"
            icon={MessageSquare}
            color="from-emerald-500 to-teal-600"
          />
          <StatCard
            title="Active Chats"
            value={stats.active}
            change="-4.1%"
            trend="down"
            icon={User}
            color="from-orange-500 to-rose-600"
          />
          <StatCard
            title="Resolved Tickets"
            value={stats.closed}
            change="+23.5%"
            trend="up"
            icon={CheckCircle}
            color="from-purple-500 to-pink-600"
          />
        </div>

        {/* --- Main Analytics Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chat Volume Chart */}
          <GlassCard title="Chat Volume vs Resolution" info="Last 7 Days" className="lg:col-span-2">
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chatVolumeData}>
                  <defs>
                    <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#CBD5E1" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="volume" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVol)" />
                  <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRes)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Resolution Status Distribution */}
          <GlassCard title="Status Distribution" info="Real-time">
            <div className="h-[300px] w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resolutionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {resolutionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-slate-800">{stats.total}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Total</span>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              {resolutionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-bold text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* --- Bottom Section: Activity & Quick Actions --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Feed */}
          <GlassCard title="Latest Conversations" info="Live Feed">
            <div className="space-y-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <Activity className="w-8 h-8 text-indigo-600 animate-spin" />
                  <p className="text-slate-500 font-medium">Fetching live updates...</p>
                </div>
              ) : latestActivity.length === 0 ? (
                <p className="text-slate-500 text-center py-10 font-medium italic">No recent messages.</p>
              ) : (
                latestActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex gap-4 group cursor-pointer hover:translate-x-1 transition-transform"
                    onClick={() => activity.userId && navigate(`/help-desk/ticket/details?userId=${activity.userId}`)}
                  >
                    <div className={`w-12 h-12 rounded-2xl ${activity.color} flex items-center justify-center shadow-lg shrink-0`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1 border-b border-slate-200 pb-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-800">{activity.userName}</h4>
                        <span className="text-xs font-semibold text-slate-400">{activity.time}</span>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-1">{activity.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Link
              to="/help-desk/ticket/list"
              className="mt-8 w-full py-4 bg-white/50 backdrop-blur-md rounded-2xl text-indigo-600 font-black uppercase text-sm tracking-widest hover:bg-white hover:text-indigo-700 transition-all border border-white flex justify-center items-center"
            >
              Manage All Tickets
            </Link>
          </GlassCard>

          {/* Quick Stats Grid */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6 flex-1">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <LifeBuoy className="w-12 h-12 mb-6 opacity-80" />
                <h3 className="text-5xl font-black mb-1">{stats.closed}</h3>
                <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Total Resolved</p>
              </div>
              <div className="bg-gradient-to-br from-orange-400 to-rose-500 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <BarChart3 className="w-12 h-12 mb-6 opacity-80" />
                <h3 className="text-5xl font-black mb-1">92%</h3>
                <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Efficiency Rate</p>
              </div>
            </div>
            <GlassCard title="System Wellness" className="flex-1">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                    <span>API Uptime</span>
                    <span>99.9%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[99.9%] rounded-full shadow-sm"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                    <span>Avg Response Time</span>
                    <span>2.4m</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[85%] rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
