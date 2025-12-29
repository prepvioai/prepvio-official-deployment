import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp,
  Play,
  X,
  User,
  ChartLine,
  Sparkles,
  Award,
  Target,
  Zap,
  Globe,
  MonitorCheck,
  ShieldCheck,
  FileText,
  Star,
  Heart,
} from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { useAuthStore } from "../store/authstore";
import { formatDate } from "../utils/date";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const USER_API = "http://localhost:5000/api";

// Motivational quotes
const motivationalQuotes = [
  "Keep pushing forward! 💪",
  "Every course is a new skill! 🚀",
  "You're doing amazing! ⭐",
  "Progress leads to results! 🎯",
  "Today is your day! 🔥"
];

// Chart configuration
const chartData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Learning Hours",
      data: [12, 19, 15, 25],
      backgroundColor: "rgba(139, 92, 246, 0.7)",
      borderRadius: 8,
      borderSkipped: false,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: false }, ticks: { color: "#6b7280" } },
    y: { grid: { color: "rgba(200,200,200,0.2)" }, ticks: { color: "#6b7280" } },
  },
  plugins: {
    legend: { display: false },
    tooltip: { 
      backgroundColor: "rgba(0,0,0,0.8)",
      padding: 12,
      cornerRadius: 8
    },
  },
};

// Service configurations
const serviceConfigs = [
  { key: 'checkYourAbility', name: 'Check Your Ability', icon: MonitorCheck, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { key: 'jobPortal', name: 'Job Portal Access', icon: Globe, color: 'text-green-600', bg: 'bg-green-100' },
  { key: 'aiSystem', name: 'AI System Tools', icon: Sparkles, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { key: 'resumeAnalyzer', name: 'Resume Analyzer', icon: FileText, color: 'text-red-600', bg: 'bg-red-100' },
];

// Achievements
const achievements = [
  { title: "Speed Learner", icon: Zap, desc: "Completed 5 courses in a week!" },
  { title: "Consistent", icon: Target, desc: "15 day learning streak!" },
  { title: "Top Performer", icon: Award, desc: "Scored 95%+ in 3 courses" }
];

/* ======================================================
   DASHBOARD MODAL (USED BY HEADER)
====================================================== */
export function DashboardModal({ onClose }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const handleManageAccount = () => {
    onClose();
    navigate("/dashboard");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-md w-full mx-4 p-8 bg-white/70 backdrop-blur-xl 
          rounded-2xl shadow-2xl border border-white relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100/50 transition-colors"
            aria-label="Close dashboard"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="text-center mb-8">
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 
            flex items-center justify-center shadow-lg">
              <User className="text-white h-9 w-9" />
            </div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 
            text-transparent bg-clip-text">
              Dashboard
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back, {user.name}
            </p>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-5 rounded-xl bg-white/60 border border-white shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3 text-indigo-600">
                <ShieldCheck size={20} />
                <h3 className="text-lg font-semibold">Profile Information</h3>
              </div>

              <p className="text-gray-800">
                <span className="font-semibold">Name:</span> {user.name}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-xl bg-white/60 border border-white shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3 text-indigo-600">
                <Clock size={20} />
                <h3 className="text-lg font-semibold">Account Activity</h3>
              </div>

              <p className="text-gray-800">
                <span className="font-semibold">Joined:</span>{" "}
                {formatDate(user.createdAt)}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Last Login:</span>{" "}
                {formatDate(user.lastlogin)}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 space-y-3"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Manage account"
              onClick={handleManageAccount}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 
              text-white font-bold rounded-xl shadow-lg
              hover:from-blue-600 hover:to-indigo-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              View Full Dashboard
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Logout from account"
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-white/60 border border-gray-300
              text-gray-700 font-bold rounded-xl shadow-lg
              hover:bg-white/80
              focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Logout
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ======================================================
   SERVICE CARD COMPONENT
====================================================== */
const ServiceCard = ({ icon: Icon, name, active, color, bg }) => (
  <div 
    className={`p-4 rounded-2xl shadow-md transition-all duration-300 ${
      active 
        ? `bg-white/80 border border-white/90 hover:shadow-xl cursor-pointer`
        : `bg-gray-100/60 border border-gray-200 cursor-not-allowed opacity-70`
    }`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${active ? bg : 'bg-gray-300'}`}>
          <Icon className={`w-5 h-5 ${active ? color : 'text-gray-500'}`} />
        </div>
        <h3 className="font-semibold text-gray-800">{name}</h3>
      </div>
      
      {active ? (
        <span className="text-sm font-bold text-green-700 bg-green-200 px-3 py-1 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" /> Active
        </span>
      ) : (
        <span className="text-sm font-medium text-gray-600 bg-gray-300 px-3 py-1 rounded-full">
          Inactive
        </span>
      )}
    </div>
    <p className="text-xs text-gray-500 mt-2">
      {active 
        ? `Status: Enabled. Click to access the ${name} portal.` 
        : "Status: Disabled. Contact administrator for access."
      }
    </p>
  </div>
);

/* ======================================================
   MAIN DASHBOARD PAGE
====================================================== */
export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("");
  const [userStats, setUserStats] = useState({
    streak: 15,
    level: 12,
    points: 2450
  });

  // Set greeting and quote on mount
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          `${USER_API}/users/dashboard`,
          { withCredentials: true }
        );
        setDashboard(res.data);
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleContinue = () => {
    if (!dashboard?.resume) return;

    const { courseId, channelId, videoId } = dashboard.resume;

    navigate(
      `/course/${channelId}/${courseId}${
        videoId ? `?video=${videoId}` : ""
      }`
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-indigo-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Failed to load dashboard
      </div>
    );
  }

  const { stats, courses } = dashboard;
  const displayName = user?.name?.split(' ')[0] || 'User';
  const userAvatar = user?.profilePic || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'User')}`;

  const statCards = [
    { label: "Total Courses", value: stats.totalCourses, icon: BookOpen, color: "from-blue-400 to-blue-600", trend: `${stats.totalCourses} enrolled` },
    { label: "Completed", value: stats.completedCourses, icon: CheckCircle, color: "from-green-400 to-green-600", trend: "Great progress!" },
    { label: "In Progress", value: stats.inProgressCourses, icon: Clock, color: "from-yellow-400 to-yellow-600", trend: "Keep going!" },
    { label: "Hours Learned", value: stats.totalWatchedHours, icon: TrendingUp, color: "from-purple-400 to-purple-600", trend: "Time invested" },
  ];

  return (
    <div className="min-h-screen overflow-y-auto px-4 md:px-8 py-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-75"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={userAvatar}
                  alt={user?.name || "User"}
                  className="rounded-full w-24 h-24 object-cover ring-4 ring-white/60 shadow-2xl"
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'User')}`; 
                  }}
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-extrabold text-white mb-1">
                  {greeting}, {displayName}! 👋
                </h1>
                <p className="text-white/90 text-lg font-medium mb-3">{quote}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-300" />
                    <span className="text-white font-semibold">Level {userStats.level}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Zap className="w-4 h-4 text-orange-300" />
                    <span className="text-white font-semibold">{userStats.streak} Day Streak</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Heart className="w-4 h-4 text-red-300" />
                    <span className="text-white font-semibold">{userStats.points} Points</span>
                  </div>
                </div>
              </div>
            </div>
            
            {dashboard.resume && (
              <button 
                onClick={handleContinue}
                className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 whitespace-nowrap flex items-center gap-2"
              >
                <Play size={16} />
                Continue Learning
              </button>
            )}
          </div>
        </div>
        
        {/* Available Services Section */}
        {user && (
          <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MonitorCheck className="w-6 h-6 text-indigo-500" />
              <h2 className="text-xl font-bold text-gray-800">Available Services Access</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceConfigs.map(service => (
                <ServiceCard
                  key={service.key}
                  icon={service.icon}
                  name={service.name}
                  active={user[service.key] || false}
                  color={service.color}
                  bg={service.bg}
                />
              ))}
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg p-5 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-extrabold text-gray-800 mb-1">{card.value}</div>
                <div className="text-sm font-medium text-gray-600 mb-1">{card.label}</div>
                <div className="text-xs text-gray-500">{card.trend}</div>
              </div>
            );
          })}
        </div>

        {/* Achievements Section */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-800">Recent Achievements 🏆</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-yellow-50/50 to-orange-50/50 border border-yellow-200/50 rounded-2xl p-4 hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800">{achievement.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{achievement.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Graph & Events Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <ChartLine className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-800">Your Learning Journey 📈</h2>
            </div>
            <div className="h-64">
              <Bar data={chartData} options={chartOptions} />
            </div>
            <p className="text-sm text-gray-600 mt-3 text-center">
              You've learned <span className="font-bold text-indigo-600">{stats.totalWatchedHours} hours</span> in total! Keep it up! 🔥
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events 📅</h2>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-200/50 rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer">
                <p className="font-semibold text-indigo-700">AI Workshop</p>
                <p className="text-sm text-gray-600">Oct 15 – 10:00 AM</p>
              </div>
              <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 border border-purple-200/50 rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer">
                <p className="font-semibold text-purple-700">Hackathon Meetup</p>
                <p className="text-sm text-gray-600">Oct 18 – 6:00 PM</p>
              </div>
              <div className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 border border-green-200/50 rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer">
                <p className="font-semibold text-green-700">ReactJS Seminar</p>
                <p className="text-sm text-gray-600">Oct 22 – 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Courses */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">Your Courses 📚</h2>
          </div>

          {courses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              You haven't started any courses yet.
            </p>
          ) : (
            <div className="space-y-3">
              {courses.map((course) => {
                const progress =
                  course.totalSeconds > 0
                    ? Math.round(
                        (course.watchedSeconds / course.totalSeconds) * 100
                      )
                    : 0;

                return (
                  <div
                    key={`${course.courseId}-${course.channelName}`}
                    className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-4 hover:bg-white/80 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      {course.channelThumbnail && (
                        <img
                          src={course.channelThumbnail}
                          alt={course.channelName}
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                      )}

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-gray-800">
                              {course.courseTitle}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {course.channelName}
                            </p>
                          </div>
                          {course.completed && (
                            <CheckCircle className="text-green-600" />
                          )}
                        </div>

                        <div className="mt-2">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className={`h-2 rounded-full ${
                                course.completed ? 'bg-green-500' : 'bg-indigo-600'
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {progress}% completed
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}