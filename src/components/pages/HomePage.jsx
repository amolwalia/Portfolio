import { useEffect, useState } from "react";
import { motion } from "motion/react";

function HomePage({ onNavigate }) {
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1440,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });
  useEffect(() => {
    const handleResize = () =>
      setViewportSize({
        width: window.innerWidth || 1440,
        height: window.innerHeight || 800,
      });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isPhonePortrait =
    viewportSize.width < 768 && viewportSize.height > viewportSize.width;
  const heroSpacer = Math.round(
    isPhonePortrait
      ? Math.max(viewportSize.height * 0.92, viewportSize.height + 24)
      : Math.max(viewportSize.height * 1.15, viewportSize.height + 160),
  );

  return (
    <section
      className="min-h-screen px-4 sm:px-6 md:px-8 relative pb-24 md:pb-32"
      style={{ paddingTop: `${heroSpacer}px` }}
    >
      <div className="max-w-6xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <motion.h1
            className={`tracking-[0.05em] leading-[0.96] uppercase ${
              isPhonePortrait
                ? ""
                : "text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
            }`}
            style={{
              fontFamily: "Akira Expanded, sans-serif",
              fontWeight: 800,
              fontSize: isPhonePortrait ? "3rem" : undefined,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Visual Designer
            <br />
            <span>&amp; Digital Marketer</span>
          </motion.h1>

          <motion.p
            className={`max-w-2xl ${
              isPhonePortrait
                ? "text-[0.95rem] leading-8"
                : "text-base sm:text-lg md:text-xl"
            }`}
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I use marketing to bring people in, and design to help them
            understand and take action.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`flex gap-3 md:gap-4 ${
              isPhonePortrait ? "flex-col" : "flex-row flex-wrap"
            } ${isPhonePortrait ? "pt-4 pb-6 mb-8" : "pt-6 pb-8 mb-10 md:pt-8 md:pb-10 md:mb-12"}`}
          >
            <motion.a
              className={`border border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300 ${
                isPhonePortrait
                  ? "w-full px-5 py-3 text-[0.9rem]"
                  : "w-auto px-8 py-4 text-sm sm:text-base"
              }`}
              href="/Amol_Walia_Resume.pdf"
              download="Amol_Walia_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              DOWNLOAD RESUME
            </motion.a>
            <motion.button
              className={`bg-white text-black rounded-full hover:bg-neutral-200 transition-colors duration-300 ${
                isPhonePortrait
                  ? "w-full px-5 py-3 text-[0.9rem]"
                  : "w-auto px-8 py-4 text-sm sm:text-base"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
              }}
              onClick={() => onNavigate?.("/contact")}
            >
              GET IN TOUCH
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
export { HomePage };
