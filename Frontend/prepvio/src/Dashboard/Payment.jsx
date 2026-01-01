import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  Check, 
  X, 
  Zap, 
  Crown, 
  Rocket, 
  ShieldCheck, 
  Smartphone, 
  Globe,
  CheckCircle2,
  ArrowRight,
  Lock
} from "lucide-react";

// --- PLANS DATA ---
const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₹499',
    duration: '/month',
    icon: Zap,
    isRecommended: false, 
    color: 'bg-blue-50 text-blue-600',
    description: "Essential tools for casual learners.",
    features: [
      'Access to 10 courses',
      'Standard support',
      'Course certificates',
      'Mobile app access'
    ]
  },
  {
    id: 'premium',
    name: 'Pro Access',
    price: '₹999',
    duration: '/month',
    icon: Crown,
    isRecommended: true, 
    color: 'bg-[#D4F478] text-black', 
    description: "Best for serious students & job seekers.",
    features: [
      'Unlimited course access',
      'Priority 24/7 support',
      'Offline downloads',
      'Exclusive webinars',
      'Interview prep module'
    ]
  },
  {
    id: 'enterprise',
    name: 'Campus',
    price: '₹1,999',
    duration: '/month',
    icon: Rocket,
    isRecommended: false,
    color: 'bg-orange-50 text-orange-600',
    description: "For groups and intensive mentorship.",
    features: [
      'Everything in Pro',
      '1-on-1 Mentorship',
      'Live doubt sessions',
      'Job placement guarantee',
      'Custom learning path'
    ]
  }
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  }
};

function PaymentIntegrationPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', cardNumber: '', cvv: '', expiryMonth: '', expiryYear: '',
  });
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    setShowPaymentSuccess(true);
  };

  const handleClosePopup = () => {
    setSelectedPlan(null);
    setPaymentMethod(null);
    setShowPaymentSuccess(false);
    setFormData({ firstName: '', lastName: '', cardNumber: '', cvv: '', expiryMonth: '', expiryYear: '' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans selection:bg-[#D4F478] selection:text-black relative overflow-hidden">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="fixed inset-0 pointer-events-none -z-10">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-blob" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-16">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
           <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-full text-sm font-bold text-gray-600 shadow-sm mb-2">
              <Lock className="w-3.5 h-3.5" /> Secure & Encrypted Payment
           </div>
           <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
             Invest in your <br className="hidden md:block" />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Future Today.</span>
           </h1>
           <p className="text-gray-500 text-lg md:text-xl font-medium max-w-xl mx-auto">
             Unlock unlimited access to premium content, mentorship, and career-boosting tools.
           </p>
        </motion.div>

        {/* --- PRICING CARDS --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isDark = plan.isRecommended; // The "Popular" styling
            
            return (
              <motion.div 
                key={plan.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className={`
                  relative rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 flex flex-col h-full
                  ${isDark 
                    ? 'bg-[#1A1A1A] text-white shadow-2xl shadow-gray-900/40 lg:scale-110 z-10 ring-1 ring-white/10' 
                    : 'bg-white border border-gray-100 text-gray-900 shadow-xl shadow-gray-200/50 hover:border-gray-300'
                  }
                `}
              >
                {/* Popular Badge */}
                {isDark && (
                  <div className="absolute top-0 inset-x-0 flex justify-center -mt-4">
                    <div className="bg-[#D4F478] text-black text-xs font-black px-6 py-2 rounded-full shadow-lg tracking-widest uppercase border-4 border-[#FDFBF9]">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Card Header */}
                <div className="mb-8">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${plan.color}`}>
                      <Icon className="w-7 h-7" />
                   </div>
                   <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                   <p className={`text-sm font-medium mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                     {plan.description}
                   </p>
                   <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                      <span className={`text-lg font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {plan.duration}
                      </span>
                   </div>
                </div>

                {/* Divider */}
                <div className={`h-px w-full mb-8 ${isDark ? 'bg-white/10' : 'bg-gray-100'}`} />

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-1">
                   {plan.features.map((feature, idx) => (
                     <li key={idx} className="flex items-start gap-3">
                       <div className={`mt-0.5 rounded-full p-0.5 ${isDark ? 'bg-[#D4F478] text-black' : 'bg-green-100 text-green-600'}`}>
                          <Check className="w-3 h-3" strokeWidth={4} />
                       </div>
                       <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                     </li>
                   ))}
                </ul>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`
                    w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group
                    ${isDark 
                      ? 'bg-[#D4F478] text-black hover:bg-white hover:scale-[1.02]' 
                      : 'bg-[#1A1A1A] text-white hover:bg-gray-800'
                    }
                  `}
                >
                  Choose {plan.name}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* --- TRUST INDICATORS --- */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           <div className="flex items-center gap-2 font-bold text-gray-400"><ShieldCheck className="w-6 h-6" /> SSL Secure</div>
           <div className="flex items-center gap-2 font-bold text-gray-400"><Globe className="w-6 h-6" /> Global Access</div>
           <div className="flex items-center gap-2 font-bold text-gray-400"><Smartphone className="w-6 h-6" /> Mobile Ready</div>
        </div>

      </div>

      {/* --- PAYMENT MODAL --- */}
      <AnimatePresence>
        {selectedPlan && !showPaymentSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={handleClosePopup}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Checkout</h2>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    Purchasing <span className="text-indigo-600 font-bold">{plans.find(p => p.id === selectedPlan)?.name}</span>
                  </p>
                </div>
                <button 
                  onClick={handleClosePopup}
                  className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
                
                {/* Payment Methods */}
                <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Method</label>
                   <div className="grid grid-cols-3 gap-3">
                      {['creditCard', 'gpay', 'paypal'].map(method => (
                        <button
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all font-bold text-xs ${
                            paymentMethod === method 
                              ? 'border-black bg-black text-white shadow-lg scale-[1.02]' 
                              : 'border-gray-100 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {method === 'creditCard' && <CreditCard className="w-5 h-5" />}
                          {method === 'gpay' && <Smartphone className="w-5 h-5" />}
                          {method === 'paypal' && <Globe className="w-5 h-5" />}
                          {method === 'creditCard' ? 'Card' : method === 'gpay' ? 'GPay' : 'PayPal'}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Form Fields */}
                {paymentMethod === 'creditCard' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                  >
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-gray-900 ml-1">First Name</label>
                           <input 
                             name="firstName" 
                             onChange={handleInputChange}
                             className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                             placeholder="John"
                           />
                        </div>
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-gray-900 ml-1">Last Name</label>
                           <input 
                             name="lastName" 
                             onChange={handleInputChange}
                             className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                             placeholder="Doe"
                           />
                        </div>
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-900 ml-1">Card Number</label>
                        <div className="relative">
                           <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                           <input 
                              name="cardNumber" 
                              maxLength={19}
                              onChange={handleInputChange}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                              placeholder="0000 0000 0000 0000"
                           />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-gray-900 ml-1">Expiry</label>
                           <div className="flex gap-2">
                              <input 
                                name="expiryMonth" 
                                placeholder="MM" 
                                maxLength={2}
                                onChange={handleInputChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-center"
                              />
                              <input 
                                name="expiryYear" 
                                placeholder="YY" 
                                maxLength={2}
                                onChange={handleInputChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-center"
                              />
                           </div>
                        </div>
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-gray-900 ml-1">CVV</label>
                           <input 
                              name="cvv" 
                              placeholder="123" 
                              maxLength={3}
                              type="password"
                              onChange={handleInputChange}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-center"
                           />
                        </div>
                     </div>
                  </motion.div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                 <button
                    disabled={!paymentMethod}
                    onClick={handlePayment}
                    className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 ${
                      !paymentMethod 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-[#D4F478] text-black hover:scale-[1.02] hover:shadow-xl'
                    }`}
                  >
                    Pay {plans.find(p => p.id === selectedPlan)?.price}
                    {paymentMethod && <ArrowRight className="w-4 h-4" />}
                  </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SUCCESS MODAL --- */}
      <AnimatePresence>
        {showPaymentSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClosePopup}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 text-center shadow-2xl relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
               {/* Confetti effect placeholder or bg graphic */}
               <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-50 to-transparent pointer-events-none" />

               <div className="w-20 h-20 bg-[#D4F478] text-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100 relative z-10">
                  <Check className="w-10 h-10" strokeWidth={3} />
               </div>
               
               <h2 className="text-3xl font-black text-gray-900 mb-2">Success!</h2>
               <p className="text-gray-500 font-medium mb-8">
                 You are now subscribed to the <br/>
                 <span className="text-black font-bold">{plans.find(p => p.id === selectedPlan)?.name}</span>.
               </p>
               
               <button
                 onClick={handleClosePopup}
                 className="w-full bg-[#1A1A1A] text-white font-bold py-4 rounded-2xl hover:bg-black transition-colors shadow-lg"
               >
                 Start Learning Now
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default PaymentIntegrationPage;




//Backup code hai yeah
// import React, { useState } from "react";
// import { CreditCard, Check, X, Zap, Crown, Rocket } from "lucide-react";

// function PaymentIntegrationPage() {
//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const [paymentMethod, setPaymentMethod] = useState(null);
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         cardNumber: '',
//         cvv: '',
//         expiryMonth: '',
//         expiryYear: '',
//     });
//     const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

//     const plans = [
//         {
//             id: 'basic',
//             name: 'Basic Plan',
//             price: '₹499',
//             duration: '/month',
//             icon: Zap,
//             color: 'from-blue-400 to-blue-600',
//             features: [
//                 'Access to 10 courses',
//                 'Basic support',
//                 'Course certificates',
//                 'Mobile app access',
//                 'Community forum access'
//             ]
//         },
//         {
//             id: 'premium',
//             name: 'Premium Plan',
//             price: '₹999',
//             duration: '/month',
//             icon: Crown,
//             color: 'from-purple-400 to-purple-600',
//             popular: true,
//             features: [
//                 'Unlimited course access',
//                 'Priority support 24/7',
//                 'All certificates',
//                 'Download videos offline',
//                 'Exclusive webinars',
//                 'Interview preparation'
//             ]
//         },
//         {
//             id: 'enterprise',
//             name: 'Enterprise Plan',
//             price: '₹1,999',
//             duration: '/month',
//             icon: Rocket,
//             color: 'from-orange-400 to-red-600',
//             features: [
//                 'Everything in Premium',
//                 'Personal mentor support',
//                 '1-on-1 doubt sessions',
//                 'Job assistance',
//                 'Custom learning path',
//                 'Placement guarantee'
//             ]
//         }
//     ];

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handlePayment = () => {
//         console.log('Payment Data:', formData);
//         console.log('Payment Method:', paymentMethod);
//         console.log('Selected Plan:', selectedPlan);

//         setShowPaymentSuccess(true);
//         setFormData({
//             firstName: '',
//             lastName: '',
//             cardNumber: '',
//             cvv: '',
//             expiryMonth: '',
//             expiryYear: '',
//         });
//         setPaymentMethod(null);
//     };

//     const handleClosePopup = () => {
//         setSelectedPlan(null);
//         setPaymentMethod(null);
//         setShowPaymentSuccess(false);
//     };

//     const handlePlanSelect = (planId) => {
//         setSelectedPlan(planId);
//     };

//     return (
//         <div className="flex flex-col h-screen overflow-y-auto p-8">
//             {/* Header */}
//             <div className="mb-6">
//                 <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
//                     <CreditCard className="w-6 h-6 text-indigo-600" />
//                     Payment
//                 </h2>
//             </div>

//             {/* Main Payment Area - Plan Selection */}
//             <div className="flex-1 flex items-center justify-center">
//                 <div className="w-full max-w-6xl">
//                     <div className="text-center mb-8">
//                         <h3 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Plan, Bhidu!</h3>
//                         <p className="text-gray-600">Select the perfect plan for your learning journey</p>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         {plans.map((plan) => {
//                             const IconComponent = plan.icon;
//                             return (
//                                 <div
//                                     key={plan.id}
//                                     className={`relative bg-white/50 backdrop-blur-sm border ${
//                                         plan.popular ? 'border-purple-400 shadow-xl scale-105' : 'border-white/30'
//                                     } rounded-3xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer`}
//                                     onClick={() => handlePlanSelect(plan.id)}
//                                 >
//                                     {plan.popular && (
//                                         <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full">
//                                             MOST POPULAR
//                                         </div>
//                                     )}
                                    
//                                     <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-4`}>
//                                         <IconComponent className="w-6 h-6 text-white" />
//                                     </div>
                                    
//                                     <h4 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h4>
                                    
//                                     <div className="mb-4">
//                                         <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
//                                         <span className="text-gray-600">{plan.duration}</span>
//                                     </div>
                                    
//                                     <ul className="space-y-3 mb-6">
//                                         {plan.features.map((feature, index) => (
//                                             <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
//                                                 <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
//                                                 <span>{feature}</span>
//                                             </li>
//                                         ))}
//                                     </ul>
                                    
//                                     <button
//                                         onClick={() => handlePlanSelect(plan.id)}
//                                         className={`w-full bg-gradient-to-r ${plan.color} text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg`}
//                                     >
//                                         Select Plan
//                                     </button>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>

//             {/* Payment Method Popup */}
//             {selectedPlan && !showPaymentSuccess && (
//                 <div 
//                     className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//                     onClick={handleClosePopup}
//                 >
//                     <div 
//                         className="w-full max-w-md bg-white/90 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 space-y-4 shadow-2xl transition-all duration-300 animate-in"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         {/* Close Button */}
//                         <button
//                             type="button"
//                             onClick={handleClosePopup}
//                             className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition p-2 rounded-full hover:bg-white/30"
//                         >
//                             <X className="w-5 h-5" />
//                         </button>

//                         {/* Selected Plan Summary */}
//                         <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100 mb-4">
//                             <h4 className="text-sm text-gray-600 mb-1">Selected Plan</h4>
//                             <h3 className="text-xl font-bold text-gray-800">{plans.find(p => p.id === selectedPlan)?.name}</h3>
//                             <p className="text-2xl font-bold text-indigo-600 mt-1">
//                                 {plans.find(p => p.id === selectedPlan)?.price}
//                                 <span className="text-sm text-gray-600">{plans.find(p => p.id === selectedPlan)?.duration}</span>
//                             </p>
//                         </div>

//                         <h3 className="text-lg font-medium text-gray-900">Select Payment Method</h3>

//                         {/* Payment Method Selection */}
//                         <div className="flex gap-4">
//                             <button
//                                 type="button"
//                                 onClick={() => setPaymentMethod('creditCard')}
//                                 className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors duration-200
//                                     ${paymentMethod === 'creditCard'
//                                         ? 'bg-blue-500 text-white'
//                                         : 'text-gray-700 hover:bg-white/30 border border-white/30'
//                                     }`}
//                             >
//                                 <CreditCard className="w-5 h-5" />
//                                 Credit Card
//                             </button>

//                             <button
//                                 type="button"
//                                 onClick={() => setPaymentMethod('gpay')}
//                                 className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors duration-200
//                                     ${paymentMethod === 'gpay'
//                                         ? 'bg-green-500 text-white'
//                                         : 'text-gray-700 hover:bg-white/30 border border-white/30'
//                                     }`}
//                             >
//                                 GPay
//                             </button>

//                             <button
//                                 type="button"
//                                 onClick={() => setPaymentMethod('paypal')}
//                                 className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors duration-200
//                                     ${paymentMethod === 'paypal'
//                                         ? 'bg-yellow-500 text-white'
//                                         : 'text-gray-700 hover:bg-white/30 border border-white/30'
//                                     }`}
//                             >
//                                 PayPal
//                             </button>
//                         </div>

//                         {/* Credit Card Form */}
//                         {paymentMethod === 'creditCard' && (
//                             <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 space-y-4 border border-white/30 shadow-inner">
//                                 <h3 className="text-lg font-medium text-gray-900">Credit Card Details</h3>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div className="col-span-2">
//                                         <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
//                                         <input
//                                             type="text"
//                                             id="firstName"
//                                             name="firstName"
//                                             value={formData.firstName}
//                                             onChange={handleInputChange}
//                                             className="mt-1 block w-full p-2 border border-white/30 rounded-lg bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                     <div className="col-span-2">
//                                         <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
//                                         <input
//                                             type="text"
//                                             id="lastName"
//                                             name="lastName"
//                                             value={formData.lastName}
//                                             onChange={handleInputChange}
//                                             className="mt-1 block w-full p-2 border border-white/30 rounded-lg bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                     <div className="col-span-2">
//                                         <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
//                                         <input
//                                             type="text"
//                                             id="cardNumber"
//                                             name="cardNumber"
//                                             value={formData.cardNumber}
//                                             onChange={handleInputChange}
//                                             placeholder="1234 5678 9012 3456"
//                                             className="mt-1 block w-full p-2 border border-white/30 rounded-lg bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-700">Expiry Month</label>
//                                         <input
//                                             type="text"
//                                             id="expiryMonth"
//                                             name="expiryMonth"
//                                             value={formData.expiryMonth}
//                                             onChange={handleInputChange}
//                                             placeholder="MM"
//                                             className="mt-1 block w-full p-2 border border-white/30 rounded-lg bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-700">Expiry Year</label>
//                                         <input
//                                             type="text"
//                                             id="expiryYear"
//                                             name="expiryYear"
//                                             value={formData.expiryYear}
//                                             onChange={handleInputChange}
//                                             placeholder="YYYY"
//                                             className="mt-1 block w-full p-2 border border-white/30 rounded-lg bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                     <div className="col-span-2">
//                                         <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
//                                         <input
//                                             type="text"
//                                             id="cvv"
//                                             name="cvv"
//                                             value={formData.cvv}
//                                             onChange={handleInputChange}
//                                             placeholder="123"
//                                             className="mt-1 block w-full p-2 border border-white/30 rounded-lg bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* GPay / PayPal Info */}
//                         {(paymentMethod === 'gpay' || paymentMethod === 'paypal') && (
//                             <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 space-y-4 border border-white/30 shadow-inner">
//                                 <h3 className="text-lg font-medium text-gray-900">
//                                     {paymentMethod === 'gpay' ? 'GPay' : 'PayPal'} Details
//                                 </h3>
//                                 <p className="text-gray-700">
//                                     Click the button below to proceed with {paymentMethod === 'gpay' ? 'GPay' : 'PayPal'} payment.
//                                 </p>
//                             </div>
//                         )}

//                         {/* Confirm Payment Button */}
//                         {paymentMethod && (
//                             <button
//                                 onClick={handlePayment}
//                                 className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-2xl mt-4 transition-colors"
//                             >
//                                 Confirm Payment - {plans.find(p => p.id === selectedPlan)?.price}
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             )}

//             {/* Payment Success Popup */}
//             {showPaymentSuccess && (
//                 <div 
//                     className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//                     onClick={handleClosePopup}
//                 >
//                     <div 
//                         className="text-center p-8 bg-white/90 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl max-w-md w-full"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <button
//                             type="button"
//                             onClick={handleClosePopup}
//                             className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition p-2 rounded-full hover:bg-white/30"
//                         >
//                             <X className="w-5 h-5" />
//                         </button>

//                         <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <Check className="w-10 h-10 text-white" />
//                         </div>
//                         <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
//                         <p className="text-gray-700 mb-2">Your transaction has been completed.</p>
//                         <p className="text-sm text-gray-600 mb-6">Welcome to {plans.find(p => p.id === selectedPlan)?.name}, bhidu! 🎉</p>
//                         <button
//                             onClick={handleClosePopup}
//                             className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-2xl transition-colors"
//                         >
//                             Start Learning
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default PaymentIntegrationPage;