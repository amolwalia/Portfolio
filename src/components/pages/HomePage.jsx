import { motion } from "motion/react";
import { useViewportSize } from "../../hooks/useViewportSize.js";

// The home headline needs a fixed phone size because the desktop utility
// classes are too large for narrow portrait screens.
const PHONE_PORTRAIT_HERO_FONT_SIZE = "3rem";
const PHONE_BREAKPOINT = 768;

function isPhonePortraitViewport({ width, height }) {
  // This layout check is used by both spacing and typography decisions.
  return width < PHONE_BREAKPOINT && height > width;
}

function getHeroSpacer(viewportSize, isPhonePortrait) {
  // The navigation component acts like the home hero. This spacer pushes the
  // text content below the expanded 3D logo so the first screen has breathing
  // room before the user scrolls.
  const phoneSpacer = Math.max(
    viewportSize.height * 0.92,
    viewportSize.height + 24,
  );
  const desktopSpacer = Math.max(
    viewportSize.height * 1.15,
    viewportSize.height + 160,
  );

  return Math.round(isPhonePortrait ? phoneSpacer : desktopSpacer);
}

function HomePage({ onNavigate }) {
  const viewportSize = useViewportSize();
  const isPhonePortrait = isPhonePortraitViewport(viewportSize);
  const heroSpacer = getHeroSpacer(viewportSize, isPhonePortrait);

  return (
    <section
      className="min-h-screen px-4 sm:px-6 md:px-8 relative pb-24 md:pb-32"
      style={{ paddingTop: `${heroSpacer}px` }}
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Main intro block. The delayed animations stagger the headline, copy, and buttons. */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Quiet identity line. It introduces the person without competing with the main role statement. */}
          <motion.p
            className={`text-white/65 ${
              isPhonePortrait ? "text-3xl" : "text-3xl md:text-5xl"
            }`}
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 300,
              letterSpacing: "0.04em",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            Hi, I'm Amol Walia
          </motion.p>

          {/* Primary positioning statement. Desktop uses Tailwind sizes, phone portrait uses the fixed size above. */}
          <motion.h1
            className={`tracking-[0.05em] leading-[0.96] uppercase ${
              isPhonePortrait
                ? ""
                : "text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
            }`}
            style={{
              fontFamily: "Akira Expanded, sans-serif",
              fontWeight: 800,
              fontSize: isPhonePortrait
                ? PHONE_PORTRAIT_HERO_FONT_SIZE
                : undefined,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Visual Designer
            <br />
            <span>&amp; Digital Marketer</span>
          </motion.h1>

          {/* Short supporting copy under the headline. */}
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
            I build visual systems, campaigns, and digital experiences that help
            people understand, trust, and act.
          </motion.p>

          {/* Primary actions. The resume is a normal file link; contact uses client-side navigation. */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`flex gap-3 md:gap-4 ${
              isPhonePortrait ? "flex-col" : "flex-row flex-wrap"
            } ${
              isPhonePortrait
                ? "pt-4 pb-6 mb-8"
                : "pt-6 pb-8 mb-10 md:pt-8 md:pb-10 md:mb-12"
            }`}
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
