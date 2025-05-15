'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const timestamp = new Date().toLocaleString();

    try {
      const response = await fetch('https://sheetdb.io/api/v1/dubckkv2fwlkd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            name: form.name,
            email: form.email,
            message: form.message,
            timestamp,
          },
        }),
      });

      if (response.ok) {
        setForm({ name: '', email: '', message: '' });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000); // hide success after 3s
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    setLoading(false);
  };

  return (
    <section className="relative mt-10 bg-black text-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl text-center font-extrabold mb-12">
          <span className="text-[#9d4edd] underline">Connect with Droid</span>
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Your Name"
            required
            className="p-4 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none focus:border-[#9d4edd] transition"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Your Email"
            required
            className="p-4 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none focus:border-[#9d4edd] transition"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={6}
            required
            className="p-4 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none focus:border-[#9d4edd] transition resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#9d4edd] text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition w-fit mx-auto disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message 🚀'}
          </button>

          {success && (
            <p className="text-center text-green-400">Message sent successfully!</p>
          )}
        </form>
      </div>
    </section>
  );
}
