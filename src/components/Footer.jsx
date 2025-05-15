import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: <FaInstagram />, url: "https://www.instagram.com/droid_glau/" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/company/droid-glau/" },
    { icon: <FaTwitter />, url: "#" },
    { icon: <FaGithub />, url: "#" },
  ];

  const quickLinks = [
    { label: "Home", href: "#" },
    { label: "Projects", href: "#" },
    { label: "Teams", href: "#" },
    { label: "Events", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  return (
    <footer className="bg-[#1e1e1e] text-gray-300 py-10 rounded-t-4xl">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          <img src="https://res.cloudinary.com/dqdtbavzj/image/upload/v1747304610/DroidWhite_sueaek.png" alt="Droid Logo" className="w-20 h-auto" />
          <p className="mt-2 text-sm">
            Innovate. Build. Create. Join the revolution in tech and robotics with Droid Club.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          {quickLinks.map(({ label, href }) => (
            <a href={href} className="hover:text-white" key={label}>
              {label}
            </a>
          ))}
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            {socialLinks.map(({ icon, url }, index) => (
              <a href={url} target="_blank" rel="noopener noreferrer" key={index}>
                {icon && <div className="text-xl hover:text-white cursor-pointer">{icon}</div>}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright & Terms */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>Made with 💻 by Tech Paglus!!</p>
        <p>© 2025 Droid Club. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
