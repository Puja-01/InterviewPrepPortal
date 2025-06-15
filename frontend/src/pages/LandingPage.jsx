import React, { useState, useContext } from 'react';
import HERO_IMG from "../assets/hero-image.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
import { LuSparkles } from "react-icons/lu";
import { motion } from 'framer-motion';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="w-full min-h-full bg-[#0E0E10] text-white">
        <div className="w-[500px] h-[500px] bg-indigo-500/10 blur-[80px] absolute top-0 left-0" />

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-16"
          >
            <div className="text-xl font-bold text-white">
              Interview Prep AI
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-[#1aa79a] to-[#43269c] text-lg font-semibold text-white px-7 py-2.5 rounded-full hover:opacity-90 transition-colors cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </motion.header>

          {/* Hero Content */}
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 pr-4 mb-8 md:mb-0"
            >
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] text-indigo-300 font-semibold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30">
                  <LuSparkles className="w-4 h-4 text-indigo-300" />
                  AI Powered
                </div>
              </div>

              <h1 className="text-5xl text-white font-medium mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7f5af0_0%,_#5eead4_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <p className="text-[17px] text-gray-300 mr-0 md:mr-20 mb-6">
                Easily save your interview sets, organize them neatly in your dashboard, and pick up your preparation right where you left off.
              </p>

              <button
                className="bg-gradient-to-r from-[#1aa79a] to-[#43269c] text-lg font-semibold text-white px-7 py-2.5 rounded-full hover:opacity-90 transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full min-h-full bg-[#0E0E10] relative z-10">
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center -mt-36"
        >
          <img
            src={HERO_IMG}
            alt="Hero Image"
            className="w-[80vw] rounded-lg shadow-lg"
          />
        </motion.section>

        {/* Features Section */}
        <div className="w-full min-h-full mt-10">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-2xl font-medium text-center text-white mb-12">
                Features That Make You Shine
              </h2>
              <div className="flex flex-col items-center gap-8">
                {/* First 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-[#1A1A1C] p-6 rounded-xl border border-[#7f5af0]/20 transition duration-300 hover:shadow-[0_8px_20px_-4px_#7f5af0,4px_0_20px_-4px_#7f5af0,-4px_0_20px_-4px_#7f5af0] hover:border-[#7f5af0]/40"
                    >
                      <h3 className="text-base font-semibold mb-3 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
                {/* Remaining 2 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-[#1A1A1C] p-6 rounded-xl border border-[#7f5af0]/20 transition duration-300 hover:shadow-[0_8px_20px_-4px_#7f5af0,4px_0_20px_-4px_#7f5af0,-4px_0_20px_-4px_#7f5af0] hover:border-[#7f5af0]/40"
                    >
                      <h3 className="text-base font-semibold mb-3 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm bg-[#141414] text-gray-500 text-center p-5 mt-5 border-t border-gray-700/30">
          Made with 💜 — Happy Learning!
        </div>
      </div>

      {/* Modal for Login/Sign Up */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
