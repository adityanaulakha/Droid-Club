import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-gray-300 py-10 rounded-t-4xl">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          {/* <h2 className="text-2xl font-bold text-white">Droid Club</h2> */}
          <img src="/DroidWhite.png" alt="Droid Logo" className="w-24 h-auto"/>
          <p className="mt-2 text-sm">
            Innovate. Build. Create. Join the revolution in tech and robotics with Droid Club.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">About Us</a>
          <a href="#" className="hover:text-white">Projects</a>
          <a href="#" className="hover:text-white">Events</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>

        {/* Social Media & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <FaFacebookF className="text-xl hover:text-white cursor-pointer" />
            <FaInstagram className="text-xl hover:text-white cursor-pointer" />
            <FaTwitter className="text-xl hover:text-white cursor-pointer" />
            <FaLinkedin className="text-xl hover:text-white cursor-pointer" />
          </div>
          {/* <h3 className="text-lg font-semibold text-white mt-4">Subscribe to Newsletter</h3>
          <div className="mt-2 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 w-full text-white rounded-l-md focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md text-white hover:bg-blue-500">
              Subscribe
            </button>
          </div> */}
        </div>

      </div>

      {/* Copyright & Terms */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>© 2025 Droid Club. All rights reserved.</p>
        {/* <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
