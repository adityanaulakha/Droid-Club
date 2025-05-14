import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import President from "../../assets/President.png";
import VicePresident from "../../assets/Vice-President.jpg";
import GeneralSecretary from "../../assets/General-Secretary.png";

const teamMembers = [
  {
    name: "Aditya Naulakha",
    position: "President",
    image: President,
  },
  {
    name: "Harshvardhan Gupta",
    position: "Vice President",
    image: VicePresident,
  },
  {
    name: "Vaishnav P Ramesh",
    position: "General Secretary",
    image: GeneralSecretary,
  },
];

export default function TeamSection() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const cardsRef = useRef([]);

  const handleCardClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cardsRef.current.every(
          (card) => card && !card.contains(event.target)
        )
      ) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="w-full bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-6xl font-extrabold text-center mb-6">
          <span className="text-[#9d4edd] underline">Meet Our Leads</span>
        </h2>

        {/* Animated Button */}
        <motion.div
          className="flex justify-end mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/team")}
            className="px-5 py-2 bg-[#9d4edd] text-white rounded-lg font-semibold hover:bg-[#7b2cbf] transition"
          >
            View Full Team
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center py-10">
          {teamMembers.map((member, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                onClick={() => handleCardClick(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group w-64 h-80 rounded-xl overflow-hidden shadow-lg border border-[#9d4edd]/50 cursor-pointer"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-[#9d4edd] mt-2">
                    {member.position}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
