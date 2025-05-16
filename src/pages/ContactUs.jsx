import ContactForm from "../components/Home/ContactForm";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black">
      <div className="w-full max-w-lg ">
        <ContactForm />
      </div>
      <div className="relative bg-[#221a38] rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center space-y-6 overflow-hidden mb-10">
        {/* Subtle Glow Circles */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#9d4edd]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#a4508b]/20 rounded-full blur-2xl pointer-events-none" />
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#9d4edd] via-[#5f0a87] to-[#a4508b] mb-2 tracking-wide drop-shadow-lg">
          Connect with Droid Club
        </h2>
        <p className="text-gray-300 text-center max-w-xs mb-2">
          Join our vibrant tech community and stay updated with the latest events, projects, and opportunities!
        </p>
        <div className="flex flex-col md:flex-row items-center gap-6 mt-10">
          {/* WhatsApp */}
          <a
            href="https://chat.whatsapp.com/DpEQCRcjRMc7cjG5CcLId7"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center px-6 py-4 rounded-2xl bg-gradient-to-br from-green-400/20 to-green-700/10 hover:scale-105 transition-transform shadow-lg overflow-hidden"
          >
            <span className="absolute -top-2 -right-2 animate-ping w-4 h-4 bg-green-400 rounded-full opacity-40"></span>
            <FaWhatsapp className="text-3xl text-green-400 group-hover:text-green-300 transition-colors drop-shadow" />
            <span className="mt-2 text-green-300 font-semibold">WhatsApp</span>
            <span className="text-xs text-gray-400">Community</span>
            <span className="mt-1 text-xs text-green-200 bg-green-900/30 px-2 py-0.5 rounded-full">Fastest Response</span>
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/droid_glau/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center px-6 py-4 rounded-2xl bg-gradient-to-br from-pink-400/20 to-pink-700/10 hover:scale-105 transition-transform shadow-lg overflow-hidden"
          >
            <span className="absolute -bottom-2 -left-2 animate-pulse w-4 h-4 bg-pink-400 rounded-full opacity-30"></span>
            <FaInstagram className="text-3xl text-pink-400 group-hover:text-pink-300 transition-colors drop-shadow" />
            <span className="mt-2 text-pink-300 font-semibold">@droid_glau</span>
            <span className="text-xs text-gray-400">Instagram</span>
            <span className="mt-1 text-xs text-pink-200 bg-pink-900/30 px-2 py-0.5 rounded-full">Stories & Updates</span>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/droid-glau/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center px-6 py-4 rounded-2xl bg-gradient-to-br from-blue-400/20 to-blue-700/10 hover:scale-105 transition-transform shadow-lg overflow-hidden"
          >
            <span className="absolute top-2 right-2 animate-pulse w-4 h-4 bg-blue-400 rounded-full opacity-30"></span>
            <FaLinkedin className="text-3xl text-blue-400 group-hover:text-blue-300 transition-colors drop-shadow" />
            <span className="mt-2 text-blue-300 font-semibold">Droid Club</span>
            <span className="text-xs text-gray-400">LinkedIn</span>
            <span className="mt-1 text-xs text-blue-200 bg-blue-900/30 px-2 py-0.5 rounded-full">Professional Network</span>
          </a>
        </div>
        <div className="mt-6 text-xs text-gray-500 text-center">
          <span>We love to connect with passionate techies! 🚀</span>
        </div>
      </div>
    </div>
  );
}