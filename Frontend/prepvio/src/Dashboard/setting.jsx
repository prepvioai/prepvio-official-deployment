import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  Settings, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Briefcase, 
  Save,
  Camera,
  ExternalLink
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1, ease: "easeOut" },
  },
};

const itemUpVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

// --- REUSABLE INPUT COMPONENT ---
const InputGroup = ({ label, icon: Icon, type = "text", placeholder, name, value, onChange, disabled = false, fullWidth = false }) => (
  <div className={`space-y-2 ${fullWidth ? "md:col-span-2" : ""}`}>
    <label className="text-sm font-bold text-gray-900 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 rounded-xl pl-12 pr-4 py-3.5 outline-none transition-all placeholder:text-gray-400 font-medium text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  </div>
);

function Account() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    bio: "",
  });

  // -------------------------
  // Fetch profile from backend
  // -------------------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/me",
          { withCredentials: true }
        );

        const u = res.data.user;

        setUser(u);
        setFormData({
          firstName: u.firstName || "",
          lastName: u.lastName || "",
          phone: u.phone || "",
          email: u.email || "",
          city: u.location?.city || "",
          state: u.location?.state || "",
          country: u.location?.country || "",
          pincode: u.location?.pincode || "",
          bio: u.bio || "",
        });
      } catch (err) {
        console.error("Failed to load profile", err);
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // -------------------------
  // Input handler
  // -------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------------------------
  // Save profile
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "http://localhost:5000/api/users/me",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          bio: formData.bio,
          location: {
            city: formData.city,
            state: formData.state,
            country: formData.country,
            pincode: formData.pincode,
          },
        },
        { withCredentials: true }
      );

      alert("Account updated successfully ✅");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans selection:bg-[#D4F478] selection:text-black p-4 md:p-8 pb-20">
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-8"
      >
        
        {/* Page Header */}
        <motion.div variants={itemUpVariants}>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Account Settings</h1>
          <p className="text-gray-500 font-medium mt-2">Manage your personal information and preferences.</p>
        </motion.div>

        {/* Profile Card (Dark Theme) */}
        <motion.div 
          variants={itemUpVariants}
          className="w-full bg-[#1A1A1A] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-gray-200 flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full blur-[100px] opacity-30 pointer-events-none" />

          {/* Avatar Section */}
          <div className="relative group shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-white/20 to-white/5 border border-white/10 shadow-2xl">
              <img
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=800"}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <button className="absolute bottom-2 right-2 bg-[#D4F478] text-black p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Info Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left relative z-10 flex-1">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-3 border border-white/10 text-[#D4F478]">
              <Briefcase className="w-3 h-3" /> 
              Software Intern
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-gray-400 max-w-md text-lg leading-relaxed mb-6">
              {formData.bio || "Passionate about coding and building modern web apps. Ready to tackle the next big challenge."}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <button className="bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2">
                 <Settings className="w-4 h-4" /> Preferences
               </button>
               <button className="bg-[#D4F478] text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,244,120,0.3)] flex items-center gap-2">
                 <ExternalLink className="w-4 h-4" /> View Portfolio
               </button>
            </div>
          </div>
        </motion.div>

        {/* Form Section (Light Theme) */}
        <motion.div 
          variants={itemUpVariants}
          className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-6">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
               <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>
              <p className="text-sm text-gray-500 font-medium">Update your identity information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <InputGroup 
                 label="First Name" 
                 icon={User} 
                 placeholder="Enter your first name"
                 name="firstName"
                 value={formData.firstName}
                 onChange={handleChange}
               />
               <InputGroup 
                 label="Last Name" 
                 icon={User} 
                 placeholder="Enter your last name"
                 name="lastName"
                 value={formData.lastName}
                 onChange={handleChange}
               />
               
               <InputGroup 
                 label="Email Address" 
                 icon={Mail} 
                 type="email" 
                 placeholder="swaroop@email.com"
                 name="email"
                 value={formData.email}
                 onChange={handleChange}
                 disabled={true}
               />
               <InputGroup 
                 label="Phone Number" 
                 icon={Phone} 
                 type="tel" 
                 placeholder="+91 98765 43210"
                 name="phone"
                 value={formData.phone}
                 onChange={handleChange}
               />
               
               <InputGroup 
                 label="City" 
                 icon={MapPin} 
                 placeholder="Enter your city"
                 name="city"
                 value={formData.city}
                 onChange={handleChange}
               />
               <InputGroup 
                 label="State" 
                 icon={Globe} 
                 placeholder="Enter your state"
                 name="state"
                 value={formData.state}
                 onChange={handleChange}
               />
               
               <InputGroup 
                 label="Pin Code" 
                 icon={MapPin} 
                 placeholder="Enter pincode"
                 name="pincode"
                 value={formData.pincode}
                 onChange={handleChange}
               />
               <InputGroup 
                 label="Country" 
                 icon={Globe} 
                 placeholder="India"
                 name="country"
                 value={formData.country}
                 onChange={handleChange}
               />

               {/* Bio Text Area */}
               <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-900 ml-1">Bio</label>
                  <textarea
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 rounded-xl p-4 outline-none transition-all placeholder:text-gray-400 font-medium text-gray-800 resize-none"
                    placeholder="Tell us a little about yourself..."
                  />
               </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="bg-[#1A1A1A] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-black hover:scale-105 transition-all shadow-xl shadow-gray-200"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>

      </motion.div>
    </div>
  );
}

export default Account;