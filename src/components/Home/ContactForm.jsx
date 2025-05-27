'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || !email || !subject || !message) {
      showToast('error', 'All fields are required.');
      return;
    }

    setLoading(true);

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    try {
      const response = await fetch('https://sheetdb.io/api/v1/dubckkv2fwlkd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { name, email, subject, message, date, time },
        }),
      });

      if (response.ok) {
        setForm({ name: '', email: '', subject: '', message: '' });
        showToast('success', 'Message sent successfully!');
      } else {
        showToast('error', 'Failed to send message!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast('error', 'Something went wrong!');
    }

    setLoading(false);
  };

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-xl shadow-xl font-semibold text-white ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <section className="relative mt-10 bg-black text-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl text-center font-extrabold mb-12">
            <span className="text-[#9d4edd] underline">Let's Connect</span>
          </h1>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 border border-white/10">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              <div>
                <label className="block mb-1 text-sm text-gray-300">Your Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#9d4edd] transition"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-300">Email Address</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#9d4edd] transition"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-300">Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-[#9d4edd] transition"
                >
                  <option value="" disabled>
                    -- Select Subject --
                  </option>
                  <option>Joining the Club</option>
                  <option>Collaboration</option>
                  <option>Sponsorship</option>
                  <option>General Query</option>
                  <option>Technical Help</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-300">Your Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="What's on your mind?"
                  className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#9d4edd] transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#9d4edd] hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition w-fit mx-auto disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message 🚀'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
