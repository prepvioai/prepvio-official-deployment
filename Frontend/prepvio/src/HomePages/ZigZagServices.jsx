import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Activity } from "lucide-react";

const ZigZagServices = () => {
  // ==========================================
  // 1. BACKEND & LOGIC (Strictly Preserved)
  // ==========================================
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const serviceRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/services");
        setServices(res.data);
        const initialIndexes = {};
        res.data.forEach((service, idx) => {
          initialIndexes[idx] = 0;
        });
        setActiveImageIndex(initialIndexes);
      } catch (err) {
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const intervals = services.map((service, index) => {
      if (service.images && service.images.length > 1) {
        return setInterval(() => {
          setActiveImageIndex((prev) => ({
            ...prev,
            [index]: ((prev[index] || 0) + 1) % service.images.length,
          }));
        }, 3000);
      }
      return null;
    });
    return () => intervals.forEach(i => i && clearInterval(i));
  }, [services]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );
    serviceRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => serviceRefs.current.forEach((ref) => ref && observer.unobserve(ref));
  }, [services]);

  const handleNavigate = (slug) => {
    navigate(`/services/${slug}`);
  };

  // ==========================================
  // 2. UI RENDER (Compact Layout + Premium Typography)
  // ==========================================

  if (loading) return <div className="flex justify-center items-center h-96"><div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div></div>;
  if (error) return <div className="text-center mt-20 text-red-600 font-bold">{error}</div>;
  if (services.length === 0) return <div className="text-center mt-20 text-gray-400">No services found.</div>;

  return (
    <section id="services" className="py-20 relative bg-[#FDFBF9] overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/40 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-20 px-4">
        <div className="inline-block bg-[#D4F478] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-black/5 shadow-sm transform -rotate-1">
          Our Capabilities
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-[#1A1A1A] tracking-tighter leading-[0.9] mb-4">
          Master Your <br/>
          <span className="text-gray-400">Digital Presence</span>
        </h2>
      </div>

      {/* Services List - COMPACT CONTAINER (max-w-6xl) */}
      <div className="space-y-24 max-w-6xl mx-auto px-4 md:px-6">
        {services.map((service, index) => {
          const currentImageIndex = activeImageIndex[index] || 0;
          const isReverse = index % 2 !== 0;
          const isIntersecting = isVisible[`service-${index}`];

          return (
            <div
              key={service._id}
              id={`service-${index}`}
              ref={(el) => (serviceRefs.current[index] = el)}
              className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
                isReverse ? "md:flex-row-reverse" : ""
              } transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu ${
                isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
              }`}
            >
              
              {/* --- IMAGE SIDE (Compact Height: h-72) --- */}
              <div 
                onClick={() => handleNavigate(service.slug)}
                className="w-full md:w-1/2 relative group cursor-pointer perspective-1000"
              >
                {/* Decorative floating blob */}
                <div className={`absolute -top-6 ${isReverse ? '-left-6' : '-right-6'} w-24 h-24 bg-[#D4F478]/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />

                <div className="relative h-64 md:h-72 lg:h-80 w-full rounded-[2.5rem] overflow-hidden border border-white/50 shadow-2xl shadow-gray-200/50 bg-white transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
                   {/* Images */}
                   {service.images && service.images.length > 0 ? (
                      service.images.map((img, imgIdx) => (
                        <img
                          key={imgIdx}
                          src={img}
                          alt={service.title}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                            imgIdx === currentImageIndex ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      ))
                   ) : service.image ? (
                     <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                   ) : (
                     <div className="flex items-center justify-center h-full bg-[#EAE6F5] text-gray-400">
                       <Activity size={40} />
                     </div>
                   )}
                   
                   {/* Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   
                   {/* "App" Badge */}
                   <div className="absolute top-5 right-5 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl shadow-sm border border-white flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">Live</span>
                   </div>
                </div>
              </div>

              {/* --- TEXT SIDE (Rich Typography) --- */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                
                {/* Styled Number Box (From New UI) */}
                <div className="flex justify-center md:justify-start mb-6">
                  <div className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                    {index < 9 ? `0${index + 1}` : index + 1}
                  </div>
                </div>

                {/* Heavy, Tight Heading */}
                <h3 className="text-4xl lg:text-5xl font-black text-[#1A1A1A] mb-5 tracking-tighter leading-[0.95]">
                  {service.title}
                </h3>

                {/* Medium Weight Description */}
                <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                  {service.description}
                </p>

                {/* The "Split Pill" Button (From New UI) */}
                <div className="flex justify-center md:justify-start">
                  <button 
                    onClick={() => handleNavigate(service.slug)}
                    className="flex items-center gap-0 group cursor-pointer"
                  >
                    <span className="bg-[#1A1A1A] text-white px-8 py-4 rounded-l-full font-bold text-base shadow-xl shadow-gray-300/40 relative z-10 transition-transform group-hover:translate-x-1">
                      View Service
                    </span>
                    <span className="w-14 h-[3.5rem] flex items-center justify-center rounded-r-full bg-[#D4F478] border-l-2 border-[#1A1A1A] group-hover:bg-[#cbf060] transition-colors origin-left">
                      <ArrowRight className="w-5 h-5 text-black transform group-hover:-rotate-45 transition-transform duration-300" />
                    </span>
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ZigZagServices;




//Backup code hai yeah 
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ZigZagServices = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isVisible, setIsVisible] = useState({});
//   const [activeImageIndex, setActiveImageIndex] = useState({});
//   const serviceRefs = useRef([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/api/services");
//         setServices(res.data);
        
//         // Initialize active image index for each service
//         const initialIndexes = {};
//         res.data.forEach((service, idx) => {
//           initialIndexes[idx] = 0;
//         });
//         setActiveImageIndex(initialIndexes);
//       } catch (err) {
//         setError("Failed to load services. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   // Auto-rotate images every 3 seconds
//   useEffect(() => {
//     const intervals = services.map((service, index) => {
//       if (service.images && service.images.length > 1) {
//         return setInterval(() => {
//           setActiveImageIndex((prev) => ({
//             ...prev,
//             [index]: ((prev[index] || 0) + 1) % service.images.length,
//           }));
//         }, 3000);
//       }
//       return null;
//     });

//     return () => {
//       intervals.forEach(interval => {
//         if (interval) clearInterval(interval);
//       });
//     };
//   }, [services]);

//   // IntersectionObserver for animations
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           setIsVisible((prev) => ({
//             ...prev,
//             [entry.target.id]: entry.isIntersecting,
//           }));
//         });
//       },
//       { threshold: 0.2 }
//     );

//     serviceRefs.current.forEach((ref) => {
//       if (ref) observer.observe(ref);
//     });

//     return () => {
//       serviceRefs.current.forEach((ref) => {
//         if (ref) observer.unobserve(ref);
//       });
//     };
//   }, [services]);

//   if (loading) return <div className="text-center mt-20">Loading...</div>;
//   if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
//   if (services.length === 0) return <div className="text-center mt-20">No services found.</div>;

//   const handleNavigate = (slug) => {
//     navigate(`/services/${slug}`);
//   };

//   return (
//     <section id="services" className="py-20 md:py-24 relative">
//       {/* Section Header */}
//       <div className="text-center mb-14">
//         <h2 className="text-3xl md:text-4xl font-aquire font-extrabold text-gray-900">
//           Our Services
//         </h2>
//         <p className="mt-3 text-lg text-gray-600">
//           A full suite of tools to guide you from start to finish.
//         </p>
//       </div>

//       {/* Services List */}
//       <div className="space-y-20 lg:space-y-28 max-w-6xl mx-auto px-4">
//         {services.map((service, index) => {
//           const currentImageIndex = activeImageIndex[index] || 0;
//           const hasMultipleImages = service.images && service.images.length > 1;

//           return (
//             <div
//               key={service._id}
//               id={`service-${index}`}
//               ref={(el) => (serviceRefs.current[index] = el)}
//               className={`flex flex-col md:flex-row items-center gap-10 ${
//                 index % 2 !== 0 ? "md:flex-row-reverse" : ""
//               } transform transition-all duration-700 ${
//                 isVisible[`service-${index}`]
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-20"
//               }`}
//             >
//               {/* Graphic / Image (Clickable) */}
//               <div
//                 onClick={() => handleNavigate(service.slug)}
//                 className="relative rounded-2xl w-full md:w-1/2 h-60 md:h-64 lg:h-72 shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 bg-white flex items-center justify-center"
//               >
//                 {service.images && service.images.length > 0 ? (
//                   <>
//                     {/* Multiple images with crossfade animation */}
//                     {service.images.map((img, imgIdx) => (
//                       <img
//                         key={imgIdx}
//                         src={img}
//                         alt={service.title}
//                         className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
//                           imgIdx === currentImageIndex ? "opacity-100" : "opacity-0"
//                         }`}
//                       />
//                     ))}
                    
//                     {/* Image indicators (only show if multiple images) */}
//                     {hasMultipleImages && (
//                       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
//                         {service.images.map((_, imgIdx) => (
//                           <div
//                             key={imgIdx}
//                             className={`rounded-full transition-all duration-300 ${
//                               imgIdx === currentImageIndex
//                                 ? "bg-white w-6 h-2"
//                                 : "bg-white/50 w-2 h-2"
//                             }`}
//                           ></div>
//                         ))}
//                       </div>
//                     )}
//                   </>
//                 ) : service.image ? (
//                   <img
//                     src={service.image}
//                     alt={service.title}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : service.icon ? (
//                   <div className="flex items-center justify-center h-full">
//                     <span className="text-6xl text-indigo-600">{service.icon}</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center h-full">
//                     <span className="text-lg text-indigo-400">
//                       [Service Graphic {index + 1}]
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Service Content */}
//               <div className="w-full md:w-1/2 text-center md:text-left">
//                 <div className="flex items-center justify-center md:justify-start text-indigo-600 mb-3 cursor-pointer">
//                   <span className="text-2xl font-bold mr-2">
//                     {index < 9 ? `0${index + 1}` : index + 1}
//                   </span>
//                   <button onClick={() => handleNavigate(service.slug)}>
//                     <svg
//                       className="w-8 h-8"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M17 8l4 4m0 0l-4 4m4-4H3"
//                       ></path>
//                     </svg>
//                   </button>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                   {service.title}
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   {service.description}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default ZigZagServices;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

//  const ZigZagServices = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/api/services");
//         setServices(res.data);
//       } catch (err) {
//         setError("Failed to load services. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   if (loading) return <div className="text-center mt-20">Loading...</div>;
//   if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
//   if (services.length === 0) return <div className="text-center mt-20">No services found.</div>;

//   const handleArrowClick = (slug) => {
//     navigate(`/services/${slug}`);
//   };

//   return (
//     <div className="flex flex-col items-center mt-20 space-y-10">
//       {services.map((service, index) => (
//         <div key={service._id} className={`w-[90%] md:w-[70%] lg:w-[60%] flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
//           <div className={`w-full md:w-[80%] lg:w-[70%] bg-white border rounded-2xl shadow-xl overflow-hidden h-auto transition-transform duration-500 ${index % 2 === 0 ? "md:-translate-x-10" : "md:translate-x-10"}`}>
//             <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-yellow-100 h-[200px] relative mt-40">
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full opacity-70 shadow-md"></div>
//             </div>

//             <div onClick={() => handleArrowClick(service.slug)} className="p-6 relative cursor-pointer">
//               <h3 className="text-2xl font-semibold flex items-center">
//                 <span className="mr-3 text-indigo-600 font-bold text-3xl">{index < 9 ? `0${index + 1}` : index + 1}</span>
//                 {service.title}
//               </h3>
//               <p className="text-lg text-gray-600 mt-1 leading-relaxed">{service.description}</p>

//               <button onClick={() => handleArrowClick(service.slug)} className="mt-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default ZigZagServices ;