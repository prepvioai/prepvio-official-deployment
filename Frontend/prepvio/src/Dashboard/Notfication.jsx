import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Check, 
  X, 
  Trash2, 
  CheckCheck, 
  Info, 
  AlertTriangle, 
  PartyPopper, 
  Zap,
  Mail
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100, transition: { duration: 0.2 } }
};

// --- HELPER: GET ICON & COLOR BASED ON TYPE ---
const getNotificationStyle = (type) => {
  switch (type) {
    case "success":
      return { 
        icon: PartyPopper, 
        bg: "bg-green-100", 
        text: "text-green-700", 
        border: "border-green-500" 
      };
    case "warning":
      return { 
        icon: AlertTriangle, 
        bg: "bg-orange-100", 
        text: "text-orange-700", 
        border: "border-orange-500" 
      };
    case "error":
      return { 
        icon: Zap, 
        bg: "bg-red-100", 
        text: "text-red-700", 
        border: "border-red-500" 
      };
    default: // info
      return { 
        icon: Mail, 
        bg: "bg-blue-100", 
        text: "text-blue-700", 
        border: "border-blue-500" 
      };
  }
};

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to Prepvio!",
      message: "Chal aja bhidu, let's start your learning journey together!",
      timestamp: "2 hours ago",
      read: false,
      type: "info"
    },
    {
      id: 2,
      title: "New Course Available",
      message: "Check out the new Web Development course we just added!",
      timestamp: "5 hours ago",
      read: false,
      type: "success"
    },
    {
      id: 3,
      title: "Subscription Reminder",
      message: "Your premium subscription will expire in 3 days.",
      timestamp: "1 day ago",
      read: true,
      type: "warning"
    },
    {
      id: 4,
      title: "Achievement Unlocked",
      message: "Congratulations! You've completed 10 courses. Keep it up!",
      timestamp: "2 days ago",
      read: true,
      type: "success"
    },
    {
      id: 5,
      title: "New Message",
      message: "You have a new message from support team.",
      timestamp: "3 days ago",
      read: false,
      type: "info"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans selection:bg-[#D4F478] selection:text-black p-4 md:p-8">
      
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
             <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
               Notifications
               {unreadCount > 0 && (
                 <span className="bg-[#D4F478] text-black text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                   {unreadCount} New
                 </span>
               )}
             </h1>
             <p className="text-gray-500 font-medium mt-1">Stay updated with your latest alerts.</p>
          </div>

          <div className="flex gap-3">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                <CheckCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Mark all read</span>
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-bold text-red-600 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear all</span>
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-[2.5rem] p-2 md:p-6 shadow-sm border border-gray-100 min-h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center px-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                 <Bell className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">All caught up!</h3>
              <p className="text-gray-500 mt-1">You have no new notifications at the moment.</p>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <AnimatePresence mode="popLayout">
                {notifications.map((notif) => {
                   const style = getNotificationStyle(notif.type);
                   const Icon = style.icon;

                   return (
                    <motion.div
                      key={notif.id}
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`
                        group relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-200
                        ${!notif.read 
                           ? "bg-white border-l-4 border-l-[#1A1A1A] border-y-gray-100 border-r-gray-100 shadow-md" 
                           : "bg-gray-50/50 border-transparent hover:bg-white hover:shadow-sm"
                        }
                      `}
                    >
                      {/* Icon Box */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className={`text-base font-bold truncate ${notif.read ? 'text-gray-600' : 'text-gray-900'}`}>
                            {notif.title}
                          </h4>
                          <span className="text-xs font-medium text-gray-400 whitespace-nowrap">
                            {notif.timestamp}
                          </span>
                        </div>
                        <p className={`text-sm leading-relaxed ${notif.read ? 'text-gray-500' : 'text-gray-700'}`}>
                          {notif.message}
                        </p>
                      </div>

                      {/* Actions (Hover to show on Desktop, Always visible logic can be added for mobile if needed) */}
                      <div className="flex flex-col gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notif.read && (
                          <button
                            onClick={() => handleMarkAsRead(notif.id)}
                            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-[#D4F478] hover:text-black transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notif.id)}
                          className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Unread Dot Indicator */}
                      {!notif.read && (
                        <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-indigo-500 md:hidden" />
                      )}
                    </motion.div>
                   );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Notifications;




//Backup code hai yeah
// import React, { useState } from "react";
// import { Bell, Check, X, Trash2, CheckCheck } from "lucide-react";

// function Notifications() {
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       title: "Welcome to Prepvio!",
//       message: "Chal aja bhidu, let's start your learning journey together!",
//       timestamp: "2 hours ago",
//       read: false,
//       type: "info"
//     },
//     {
//       id: 2,
//       title: "New Course Available",
//       message: "Check out the new Web Development course we just added!",
//       timestamp: "5 hours ago",
//       read: false,
//       type: "success"
//     },
//     {
//       id: 3,
//       title: "Subscription Reminder",
//       message: "Your premium subscription will expire in 3 days.",
//       timestamp: "1 day ago",
//       read: true,
//       type: "warning"
//     },
//     {
//       id: 4,
//       title: "Achievement Unlocked",
//       message: "Congratulations! You've completed 10 courses. Keep it up!",
//       timestamp: "2 days ago",
//       read: true,
//       type: "success"
//     },
//     {
//       id: 5,
//       title: "New Message",
//       message: "You have a new message from support team.",
//       timestamp: "3 days ago",
//       read: false,
//       type: "info"
//     }
//   ]);

//   const unreadCount = notifications.filter(n => !n.read).length;

//   const handleMarkAsRead = (id) => {
//     setNotifications(notifications.map(notif =>
//       notif.id === id ? { ...notif, read: true } : notif
//     ));
//   };

//   const handleMarkAllAsRead = () => {
//     setNotifications(notifications.map(notif => ({ ...notif, read: true })));
//   };

//   const handleDelete = (id) => {
//     setNotifications(notifications.filter(notif => notif.id !== id));
//   };

//   const handleClearAll = () => {
//     setNotifications([]);
//   };

//   const getNotificationColor = (type, read) => {
//     if (read) return "bg-white/30";
    
//     switch(type) {
//       case "success":
//         return "bg-green-100/50";
//       case "warning":
//         return "bg-yellow-100/50";
//       case "error":
//         return "bg-red-100/50";
//       default:
//         return "bg-indigo-100/50";
//     }
//   };

//   return (
//     <div className="flex h-screen overflow-x-hidden p-6">
//       <div className="flex-1">
//         <div className="bg-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-lg flex flex-col h-full transition-all duration-300">
          
//           <div className="p-6 border-b border-white/50">
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
//                 <Bell className="w-6 h-6 text-indigo-600" />
//                 Notifications
//                 {unreadCount > 0 && (
//                   <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                     {unreadCount}
//                   </span>
//                 )}
//               </h2>
//               <div className="flex gap-2">
//                 {unreadCount > 0 && (
//                   <button
//                     onClick={handleMarkAllAsRead}
//                     className="text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-lg hover:bg-white/20 transition flex items-center gap-2 text-sm font-medium"
//                   >
//                     <CheckCheck className="w-4 h-4" />
//                     Mark all as read
//                   </button>
//                 )}
//                 {notifications.length > 0 && (
//                   <button
//                     onClick={handleClearAll}
//                     className="text-red-600 hover:text-red-800 px-3 py-2 rounded-lg hover:bg-white/20 transition flex items-center gap-2 text-sm font-medium"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Clear all
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="flex-1 flex flex-col p-6 space-y-4 overflow-y-auto">
//             {notifications.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-gray-500">
//                 <Bell className="w-16 h-16 mb-4 opacity-30" />
//                 <p className="text-lg font-medium">No notifications</p>
//                 <p className="text-sm">You're all caught up, bhidu!</p>
//               </div>
//             ) : (
//               notifications.map((notif) => (
//                 <div
//                   key={notif.id}
//                   className={`p-4 rounded-2xl ${getNotificationColor(notif.type, notif.read)} backdrop-blur-sm text-gray-800 shadow-md transition-all duration-300 hover:shadow-lg ${
//                     !notif.read ? "border-l-4 border-indigo-500" : ""
//                   }`}
//                 >
//                   <div className="flex items-start justify-between gap-3">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <p className="text-base font-semibold text-gray-900">
//                           {notif.title}
//                         </p>
//                         {!notif.read && (
//                           <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
//                         )}
//                       </div>
//                       <p className="text-sm text-gray-700 mb-2">
//                         {notif.message}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {notif.timestamp}
//                       </p>
//                     </div>
//                     <div className="flex gap-1">
//                       {!notif.read && (
//                         <button
//                           onClick={() => handleMarkAsRead(notif.id)}
//                           className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-white/30 transition"
//                           title="Mark as read"
//                         >
//                           <Check className="w-4 h-4" />
//                         </button>
//                       )}
//                       <button
//                         onClick={() => handleDelete(notif.id)}
//                         className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-white/30 transition"
//                         title="Delete"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Notifications;