import { motion } from "motion/react";
import { Mail, Instagram, Linkedin, MapPin } from "lucide-react";

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2H21l-6.514 7.447L22.14 22h-5.987l-4.69-6.13L6.09 22H3.33l6.966-7.96L1.86 2h6.14l4.24 5.587L18.244 2Zm-1.03 18.24h1.528L7.18 3.66H5.54L17.214 20.24Z" />
    </svg>
  );
}

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@amolwalia.com",
    href: "mailto:contact@amolwalia.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Vancouver, BC",
    href: "#",
  },
];

const SOCIALS = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/amol_walia",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/manjot-walia/",
  },
  {
    icon: XIcon,
    label: "X",
    href: "https://x.com/badtameezfella",
  },
];

function ContactPage() {
  return (
    <section className="min-h-screen py-24 md:py-32 px-4 sm:px-6 md:px-8 relative flex items-start md:items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 uppercase tracking-wider"
              style={{ fontFamily: "Akira Expanded, sans-serif", fontWeight: 800 }}
            >
              Let&apos;s Collaborate
              <br />
              On What&apos;s Next
            </h1>

            <p
              className="text-base sm:text-lg md:text-xl text-neutral-400 mb-8 md:mb-12 leading-relaxed"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
            >
              Available for select visual design and marketing projects. Share
              your goals, and I&apos;ll shape the system around them.
            </p>

            <div className="space-y-5 md:space-y-6 mb-8 md:mb-12">
              {CONTACT_INFO.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="flex items-center gap-3 md:gap-4 text-neutral-300 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 border border-neutral-700 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>

                  <div>
                    <div
                      className="text-sm text-neutral-500 mb-1"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-base md:text-lg break-all sm:break-normal"
                      style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
                    >
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div
                className="text-sm text-neutral-500 mb-4 uppercase tracking-wider"
                style={{ fontFamily: "Akira Expanded, sans-serif" }}
              >
                Elsewhere
              </div>

              <div className="flex gap-3 md:gap-4">
                {SOCIALS.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 md:w-12 md:h-12 border border-neutral-700 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-neutral-800 rounded-2xl p-5 sm:p-6 md:p-8 bg-black/40 backdrop-blur-sm"
          >
            <h2
              className="text-xl md:text-2xl mb-5 md:mb-6 uppercase tracking-wide"
              style={{ fontFamily: "Akira Expanded, sans-serif", fontWeight: 700 }}
            >
              Send a Message
            </h2>

            <form className="space-y-6">
              <div>
                <label
                  className="block text-sm mb-2 text-neutral-400"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border border-neutral-700 rounded-lg px-4 py-3 focus:border-white focus:outline-none transition-colors"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  className="block text-sm mb-2 text-neutral-400"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border border-neutral-700 rounded-lg px-4 py-3 focus:border-white focus:outline-none transition-colors"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  className="block text-sm mb-2 text-neutral-400"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border border-neutral-700 rounded-lg px-4 py-3 focus:border-white focus:outline-none transition-colors"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label
                  className="block text-sm mb-2 text-neutral-400"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full bg-transparent border border-neutral-700 rounded-lg px-4 py-3 focus:border-white focus:outline-none transition-colors resize-none"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors duration-300"
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { ContactPage };
