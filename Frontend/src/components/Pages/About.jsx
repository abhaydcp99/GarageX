import React from "react";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const team = [
    {
      name: "Abhay Chavan",
      role: "Frontend Developer",
      tags: ["React", "Tailwind"],
      image: "/images/abhay.jpeg",
      github: "https://github.com/abhaydcp99",
      linkedin: "https://www.linkedin.com/in/abhay-dcp-/",
    },
    {
      name: "Kalyani Tonchar",
      role: "Backend Developer",
      tags: [".Net", "DB"],
      image: "/images/kalyani.jpg",
      github: "https://github.com/Kalyani-Tonchar",
      linkedin: "https://www.linkedin.com/in/kalyani-tonchar--",
    },
    {
      name: "Yogendra Upadhye",
      role: "DevOps Engineer",
      tags: ["CI/CD", "AWS"],
      image: "/images/yogendra.jpg",
      github: "https://github.com/yogendra-dev",
      linkedin: "https://www.linkedin.com/in/yogendra-upadhye/",
    },
  ];

  return (
    <div className="px-6 py-12 md:px-20 space-y-20 font-sans bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white min-h-screen">
      {/* Company Intro */}
      <section className="text-center space-y-4">
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Journey
        </motion.h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          At <span className="font-semibold text-cyan-400">GarageX</span>, we
          believe in transforming car care with trust, speed, and technology.
          Every ride has a story, and we're here to service it smoothly.
        </p>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-100">
          Meet Our Dream Team
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              className="bg-[#1e293b] rounded-3xl p-6 shadow-xl hover:shadow-purple-500/30 border border-slate-700 hover:border-purple-400 transform transition hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="h-32 w-32 mx-auto rounded-full object-cover border-4 border-cyan-400 shadow-md mb-4"
              />
              <h3 className="text-2xl font-bold text-white">{member.name}</h3>
              <p className="text-purple-400">{member.role}</p>
              <div className="flex justify-center flex-wrap gap-2 mt-3">
                {member.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-purple-600/20 text-purple-200 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-center gap-5 mt-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white text-gray-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-500 text-blue-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid md:grid-cols-3 gap-6 text-center">
        {[
          { label: "Cars Serviced", value: "10,000+" },
          { label: "Partners", value: "250+" },
          { label: "Cities Covered", value: "30+" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="bg-[#1e293b] rounded-xl p-8 shadow-md border border-gray-700 hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl font-extrabold text-cyan-400">
              {stat.value}
            </div>
            <div className="text-gray-400 mt-2">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Values Section */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Integrity",
              desc: "We operate with transparency and honesty.",
            },
            {
              title: "Innovation",
              desc: "We thrive on modern solutions to old problems.",
            },
            {
              title: "Customer First",
              desc: "Your satisfaction drives everything we do.",
            },
          ].map((val, i) => (
            <motion.div
              key={i}
              className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 hover:shadow-md hover:shadow-cyan-500/20"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl font-bold text-cyan-400">{val.title}</h3>
              <p className="text-gray-400 mt-2">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
