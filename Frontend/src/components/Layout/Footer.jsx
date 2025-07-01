import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      className="bg-gray-900 text-white pt-12 pb-8 px-6 mt-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Garage Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">GarageX</h2>
          <p className="text-gray-400">
            Premium car services at your doorstep. Trusted by thousands of
            customers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Developer Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Meet the Developer</h3>
          <p className="text-gray-400 mb-4">
            Hi, I’m <span className="text-white font-bold">Abhaysinh DCP</span>{" "}
            — passionate about tech, cars & building amazing digital
            experiences.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/abhaysinh_dcp_/profilecard/?igsh=OXU2M2d0MWQ2dHRj"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://x.com/AbhaysinhDCP?t=YBiqj_sy8YB_DCHiEFpBCA&s=09"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.facebook.com/abhaysinh.chavan.792740?mibextid=ZbWKwL"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/abhay-dcp-/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://github.com/abhaydcp99"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Line + Back to Top */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-10 text-sm text-gray-500 gap-4">
        <span>
          &copy; {new Date().getFullYear()} Abhay DCP - GarageX. All rights
          reserved.
        </span>
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-2 text-blue-400 hover:text-white transition-colors"
        >
          <FaArrowUp />
          <span>Back to Top</span>
        </button>
      </div>
    </motion.footer>
  );
}

export default Footer;
