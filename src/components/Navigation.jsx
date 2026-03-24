import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import Scene from "./scene";
import { useViewportSize } from "../hooks/useViewportSize.js";

const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Works" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const LOGO_ASPECT_RATIO = 1.5;

function shouldHandleClientNavigation(event) {
  return !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function isWorkDetailRoute(pathname) {
  return pathname.startsWith("/work/");
}

function Navigation({ currentPath, onNavigate }) {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  const { scrollY } = useScroll();

  const isHome = currentPath === "/";
  const isPhonePortrait = viewportWidth < 768 && viewportHeight > viewportWidth;
  const documentHeight =
    typeof document !== "undefined"
      ? document.documentElement.scrollHeight
      : viewportHeight;
  const maxScroll = Math.max(0, documentHeight - viewportHeight);
  const collapseDistance = Math.max(
    1,
    Math.min(viewportHeight * 0.9, maxScroll || viewportHeight * 0.9),
  );

  // On the home page, the nav doubles as a hero area and collapses as the user scrolls.
  const minNavHeight = isPhonePortrait ? 132 : 72;
  const expandedLogoHeight = Math.max(
    isPhonePortrait ? 160 : 220,
    Math.min(
      viewportHeight * (isPhonePortrait ? 0.28 : 0.62),
      viewportWidth * (isPhonePortrait ? 0.52 : 0.34),
      isPhonePortrait ? 280 : 560,
    ),
  );

  const collapsedLogoHeight = Math.max(
    44,
    Math.min(
      minNavHeight - (isPhonePortrait ? 56 : 8),
      viewportWidth < 768 ? 52 : 60,
    ),
  );

  const targetProgress = useTransform(
    scrollY,
    [0, collapseDistance],
    isHome ? [0, 1] : [1, 1],
    { clamp: true },
  );
  const progress = targetProgress;
  const navOpacity = useTransform(
    progress,
    [0, 1],
    isHome ? [0.1, 0] : [0.25, 0.25],
  );
  const navBackground = useMotionTemplate`rgba(0, 0, 0, ${navOpacity})`;

  const heroHeight = useTransform(
    progress,
    [0, 1],
    isHome ? [viewportHeight, minNavHeight] : [minNavHeight, minNavHeight],
  );

  const paddingY = useTransform(
    progress,
    [0, 1],
    isHome
      ? [isPhonePortrait ? 20 : 28, isPhonePortrait ? 12 : 14]
      : [isPhonePortrait ? 12 : 16, isPhonePortrait ? 12 : 16],
  );
  const logoHeight = useTransform(
    progress,
    [0, 1],
    isHome
      ? [expandedLogoHeight, collapsedLogoHeight]
      : [collapsedLogoHeight, collapsedLogoHeight],
  );
  const logoWidth = useTransform(
    logoHeight,
    (value) => value * LOGO_ASPECT_RATIO,
  );

  const isActivePath = (itemPath) =>
    currentPath === itemPath ||
    (itemPath === "/work" && isWorkDetailRoute(currentPath));

  const handleLinkClick = (event, path) => {
    // Let the browser handle modified clicks like cmd+click or ctrl+click.
    if (!shouldHandleClientNavigation(event)) {
      return;
    }

    event.preventDefault();
    onNavigate(path);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-6 left-0 right-0 z-50 ${
        isPhonePortrait
          ? "px-4 flex flex-col items-center justify-center gap-3"
          : "px-8 flex justify-between items-center"
      }`}
      style={{
        backgroundColor: navBackground,
        height: heroHeight,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        backdropFilter: isHome ? "none" : "blur(8px)",
        WebkitBackdropFilter: isHome ? "none" : "blur(8px)",
      }}
    >
      <motion.div
        className={
          isPhonePortrait
            ? "flex w-full items-center justify-center"
            : "flex min-w-0 flex-1 items-center justify-start pl-0 pr-6"
        }
        style={{
          alignSelf: "center",
        }}
      >
        <motion.div
          className="drop-shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
          // Keep the embedded scene interactive without bubbling into parent nav handlers.
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
          style={{
            height: logoHeight,
            width: logoWidth,
            maxWidth: "100%",
            pointerEvents: "auto",
            flex: "0 0 auto",
          }}
        >
          <Scene />
        </motion.div>
      </motion.div>

      <div
        className={
          isPhonePortrait
            ? "flex w-full max-w-[24rem] items-center justify-between px-5"
            : "flex shrink-0 gap-8"
        }
      >
        {NAV_ITEMS.map((item) => (
          <motion.a
            key={item.path}
            href={item.path}
            onClick={(event) => handleLinkClick(event, item.path)}
            className={`uppercase transition-colors tracking-wider text-xs md:text-sm lg:text-base ${
              isActivePath(item.path)
                ? "text-white"
                : "text-neutral-400 hover:text-white"
            }`}
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
}

export { Navigation };
