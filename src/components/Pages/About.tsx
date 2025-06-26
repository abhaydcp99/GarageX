import React from "react";
import { Github, Linkedin } from "lucide-react";

export default function About() {
  const team = [
    {
      name: "Abhay Chavan",
      role: "Frontend Developer",
      tags: ["React", "Tailwind"],
      image: "/team/abhay.jpg",
      github: "https://github.com/abhaydcp99",
      linkedin: "https://www.linkedin.com/in/abhay-dcp-/",
    },
    {
      name: "Kalyani Tonchar",
      role: "Backend Developer",
      tags: ["Spring Boot", "MySQL"],
      image: "/team/kalyani.jpg",
      github: "https://github.com/kalyani123",
      linkedin: "https://www.linkedin.com/in/kalyani-tonchar/",
    },
    {
      name: "Yogendra Upadhye",
      role: "DevOps Engineer",
      tags: ["CI/CD", "AWS"],
      image: "/team/yogendra.jpg",
      github: "https://github.com/yogendra-dev",
      linkedin: "https://www.linkedin.com/in/yogendra-upadhye/",
    },
  ];

  return (
    <div className="p-6 md:p-12 space-y-16 max-w-6xl mx-auto font-sans">
      {/* Company Story */}
      <section className="text-center space-y-4">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Our Story
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
          At <span className="font-semibold text-blue-700">GarageX</span>, we
          aim to revolutionize vehicle servicing with unmatched trust,
          transparency, and tech-driven solutions. From humble beginnings to
          thousands served—our journey is about passion and purpose.
        </p>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Meet Our Dream Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl hover:scale-105 transition-transform p-6 text-center border border-gray-200"
            >
              <img
                src={member.image}
                alt={member.name}
                className="h-24 w-24 mx-auto rounded-full object-cover border-4 border-blue-500 shadow-md mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-800">
                {member.name}
              </h3>
              <p className="text-blue-600 font-medium mb-2">{member.role}</p>
              <div className="flex justify-center gap-2 flex-wrap mb-3">
                {member.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium bg-gradient-to-tr from-blue-200 to-blue-400 text-blue-900 px-3 py-1 rounded-full shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-center gap-5 mt-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-900 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="grid md:grid-cols-3 gap-6 text-center">
        {[
          { label: "Cars Serviced", value: "10,000+" },
          { label: "Partners", value: "250+" },
          { label: "Cities Covered", value: "30+" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all"
          >
            <div className="text-4xl font-extrabold text-blue-800">
              {stat.value}
            </div>
            <div className="text-gray-700 mt-2 font-medium">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Values */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
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
          ].map((value, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold text-blue-700">{value.title}</h3>
              <p className="text-gray-600 mt-2">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
