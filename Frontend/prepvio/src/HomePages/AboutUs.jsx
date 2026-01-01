import React from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  BarChart3, 
  FileText, 
  Target, 
  Zap, 
  ShieldCheck 
} from "lucide-react";

// ✅ Updated Features Data with more aggressive, professional copy
const features = [
  {
    title: "Real-Time AI Avatar",
    description:
      "Engage with a high-fidelity digital twin that simulates real-world stress and body language cues, preparing you for the toughest panel rounds.",
    icon: <Bot className="w-7 h-7" />,
    color: "bg-blue-100",
  },
  {
    title: "Deep Speech Analysis",
    description:
      "Our neural engine decodes your filler words, sentiment, and technical accuracy, giving you a 'Confidence Score' that mirrors HR metrics.",
    icon: <BarChart3 className="w-7 h-7" />,
    color: "bg-[#D4F478]", // Using the signature lime-green
  },
  {
    title: "Automated Dossier",
    description:
      "Receive an exhaustive performance breakdown with timestamped suggestions and transcript corrections within seconds of finishing.",
    icon: <FileText className="w-7 h-7" />,
    color: "bg-purple-100",
  },
];

const FeatureCard = ({ icon, title, description, color }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.02 }}
    className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl shadow-gray-100 flex flex-col items-start text-left gap-4 hover:bg-white transition-all group"
  >
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-gray-800 shadow-sm group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-black text-gray-900 tracking-tight">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm font-medium">
      {description}
    </p>
  </motion.div>
);

const AboutUs = () => {
  return (
    <div className="bg-[#F8F9FB] py-20 overflow-hidden">
      {/* ✅ Dominate Your Interview Section */}
      <section id="features" className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm mb-6"
          >
            <Zap className="w-4 h-4 text-[#D4F478] fill-[#D4F478]" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Next-Gen Preparation</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter">
            Dominate Your <br />
            <span className="text-gray-400">Interview Process</span>
          </h2>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Everything you need to turn nervous energy into executive presence. We don't just help you practice; we help you win.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>

        {/* Bottom Social Proof / CTA (Matching New UI) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 p-10 bg-[#1A1A1A] rounded-[3.5rem] relative overflow-hidden text-center shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h4 className="text-2xl font-bold text-white mb-2 tracking-tight flex items-center gap-3">
                <ShieldCheck className="text-[#D4F478]" /> 
                Enterprise-Grade Coaching
              </h4>
              <p className="text-gray-400 max-w-md">
                Used by students at Stanford, MIT, and Oxford to secure offers at FAANG.
              </p>
            </div>
            <button className="bg-[#D4F478] text-black px-8 py-4 rounded-full font-black hover:scale-105 transition-transform shadow-lg shadow-[#D4F478]/20">
              Claim Your Free Session
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;




//backup code hai about us ka 
// import React from "react";

// // ✅ Centralized features data
// const features = [
//   {
//     title: "Real-Time AI Avatar",
//     description:
//       "Experience human-like interviews with our interactive AI avatar, making the process natural and engaging.",
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 10a4 4 0 01-6 0v6l5-5-5-5-6 6a6 6 0 009 5.197V21h6v-1a6 6 0 00-9-5.197z"/>
//       </svg>
//     ),
//   },
//   {
//     title: "AI-Powered Analysis",
//     description:
//       "Our AI evaluates speech clarity, sentiment, confidence, and relevance, providing deep performance insights.",
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6.2a.2.2 0 01.3-.18L13 8l4-2.18a.2.2 0 01.3.18V19"/>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M10 18v-8a2 2 0 012-2h0a2 2 0 012 2v8M16 18V9.8a2 2 0 012-2h0a2 2 0 012 2v8M4 18V8a2 2 0 012-2h0a2 2 0 012 2v10"/>
//       </svg>
//     ),
//   },
//   {
//     title: "Automated Report",
//     description:
//       "Get detailed AI-driven feedback on strengths, weaknesses, and improvement areas instantly after every session.",
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 12H7"/>
//       </svg>
//     ),
//   },
// ];

// const AboutUs = () => {
//   return (
//     <div >
//       {/* ✅ Features Section */}
//       <section id="features" className="py-12 sm:py-16 text-center fade-in container mx-auto px-4 sm:px-6">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-aquire font-bold text-gray-900 mb-3">Core Features</h2>
//         <p className="mt-1 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
//           These are the key features that set us apart and will help you succeed in your career.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4 mt-10">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
//             >
//               <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4 mx-auto">
//                 {feature.icon}
//               </div>
//               <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

      
//     </div>
//   );
// };

// export default AboutUs;