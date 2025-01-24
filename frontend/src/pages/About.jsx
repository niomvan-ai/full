import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Nimit Jalan",
    role: "Full-Stack Developer",
    bio: "Passionate about building beautiful interfaces and designing scalable efficient, scalable systems.",
    image: "127.0.0.1:8000/media/about_images/nimit.png",
    type: "team", // Added to distinguish regular team members
  },
  {
    name: "Vansh Agarwal",
    role: "Test Engineer",
    bio: "Loves testing the robust APIs, ensuring the quality of the product, and providing feedback and improvements, every step of the way.",
    image: "127.0.0.1:8000/media/about_images/vansh.png",
    type: "team", // Added to distinguish regular team members
  },
  {
    name: "Omisha Shetty",
    role: "Marketing Specialist",
    bio: "Focuses on creating attractive visuals and engaging content to promote and showcase the product.",
    image: "127.0.0.1:8000/media/about_images/omisha.png",
    type: "team", // Added to distinguish regular team members
  },
  {
    name: "Dr. Puneet Jalan",
    role: "Radiologist",
    bio: "Professional Radiologist working at Sheikh Khalifa Speciality Hospital.",
    image: "127.0.0.1:8000/media/about_images/puneet.png",
    type: "doctor", // Marked as doctor type
  },
];

const About = () => {
  return (
    <div className="about-page bg-gradient-to-b from-gray-100 via-white to-gray-100 min-h-screen py-10 px-6">
      {/* Header Section */}
      <motion.header
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold text-indigo-600 mb-4">
          About Us
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          We are a passionate team dedicated to delivering exceptional digital
          experiences. Get to know the people behind the code and designs.
        </p>
      </motion.header>

      {/* Team Members Section */}
      <motion.section
        className="team-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        {/* Loop through all team members and the doctor */}
        {teamMembers.map((member, index) => {
          // Render only the team members in the grid
          if (member.type === "team") {
            return (
              <motion.div
                key={index}
                className="team-card bg-white rounded-lg shadow-xl transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={member.image || "/path/to/default-avatar.png"}
                  alt={`${member.name}`}
                  className="team-image w-full h-[40rem] object-cover object-center rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-indigo-500 text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            );
          }
          return null; // Skip doctor if rendering only team members here
        })}
      </motion.section>

      {/* Text between team and doctor */}
      <motion.h2
        className="text-4xl font-semibold text-center text-gray-800 mt-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Endorsed by our esteemed radiologist...
      </motion.h2>

      {/* Doctor Section */}
      <motion.section
        className="team-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        <motion.div
          className="team-card bg-white rounded-lg shadow-xl transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={teamMembers.find((member) => member.type === "doctor")?.image}
            alt={teamMembers.find((member) => member.type === "doctor")?.name}
            className="team-image w-full h-[40rem] object-cover object-center rounded-t-lg"
          />
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800">
              {teamMembers.find((member) => member.type === "doctor")?.name}
            </h3>
            <p className="text-indigo-500 text-sm font-medium mb-2">
              {teamMembers.find((member) => member.type === "doctor")?.role}
            </p>
            <p className="text-gray-600">
              {teamMembers.find((member) => member.type === "doctor")?.bio}
            </p>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default About;