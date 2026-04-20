import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import Scene from "./scene";
import { useViewportSize } from "../hooks/useViewportSize.js";

// Navigation links live in one array so labels, paths, and active-state checks
// stay in sync as the site grows.
const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Works" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

// The 3D logo frame is intentionally wider than it is tall. Keeping this as a
// named value makes the width calculation easier to understand below.
const LOGO_ASPECT_RATIO = 1.5;

// Breakpoints used by the nav sizing logic. They mirror the CSS breakpoint
// where the nav switches from a two-column grid to a stacked phone layout.
const PHONE_BREAKPOINT = 768;

// These values define the nav's collapsed size once the homepage hero has
// scrolled away. Phone portrait needs extra height because the links stack
// underneath the 3D scene.
const DESKTOP_COLLAPSED_NAV_HEIGHT = 72;
const PHONE_COLLAPSED_NAV_HEIGHT = 132;

// This keeps the scroll animation bounded. The nav finishes collapsing within
// the first 90% of the viewport, unless the document is shorter than that.
const COLLAPSE_DISTANCE_RATIO = 0.9;

function shouldHandleClientNavigation(event) {
  // Modified clicks should keep normal browser behavior, such as opening a link
  // in a new tab with cmd+click or ctrl+click.
  return !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function isWorkDetailRoute(pathname) {
  // All case studies are nested under /work, so the Work nav item should remain
  // highlighted while a user is reading an individual case study.
  return pathname.startsWith("/work/");
}

function getDocumentHeight(fallbackHeight) {
  // Guard the document access so this component can still render safely in
  // environments where document is not available during setup.
  if (typeof document === "undefined") {
    return fallbackHeight;
  }

  return document.documentElement.scrollHeight;
}

function getCollapseDistance(viewportHeight, documentHeight) {
  const maxScroll = Math.max(0, documentHeight - viewportHeight);
  const viewportCollapseDistance = viewportHeight * COLLAPSE_DISTANCE_RATIO;

  // If the page can scroll, use the smaller of the available scroll distance
  // and the target distance. If not, fall back to a viewport-based value so the
  // transform still has a valid input range.
  return Math.max(
    1,
    Math.min(viewportCollapseDistance, maxScroll || viewportCollapseDistance),
  );
}

function getExpandedLogoHeight(viewportWidth, viewportHeight, isPhonePortrait) {
  // Expanded size is constrained by height, width, and an absolute maximum. That
  // keeps the 3D logo dominant on the home page without letting it overflow on
  // narrow or short screens.
  const minHeight = isPhonePortrait ? 160 : 220;
  const viewportHeightLimit = viewportHeight * (isPhonePortrait ? 0.28 : 0.62);
  const viewportWidthLimit = viewportWidth * (isPhonePortrait ? 0.52 : 0.34);
  const maxHeight = isPhonePortrait ? 280 : 560;

  return Math.max(
    minHeight,
    Math.min(viewportHeightLimit, viewportWidthLimit, maxHeight),
  );
}

function getCollapsedLogoHeight(viewportWidth, minNavHeight, isPhonePortrait) {
  // The collapsed logo must fit inside the final nav height, with room left for
  // the links on phone portrait.
  const layoutReserve = isPhonePortrait ? 56 : 8;
  const responsiveCap = viewportWidth < PHONE_BREAKPOINT ? 52 : 60;

  return Math.max(44, Math.min(minNavHeight - layoutReserve, responsiveCap));
}

function Navigation({ currentPath, onNavigate }) {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  const { scrollY } = useScroll();

  const isHome = currentPath === "/";
  const isPhonePortrait =
    viewportWidth < PHONE_BREAKPOINT && viewportHeight > viewportWidth;

  const minNavHeight = isPhonePortrait
    ? PHONE_COLLAPSED_NAV_HEIGHT
    : DESKTOP_COLLAPSED_NAV_HEIGHT;
  const documentHeight = getDocumentHeight(viewportHeight);
  const collapseDistance = getCollapseDistance(viewportHeight, documentHeight);

  const expandedLogoHeight = getExpandedLogoHeight(
    viewportWidth,
    viewportHeight,
    isPhonePortrait,
  );
  const collapsedLogoHeight = getCollapsedLogoHeight(
    viewportWidth,
    minNavHeight,
    isPhonePortrait,
  );

  // On the home page, progress follows scroll position from expanded to
  // collapsed. On every other page, the nav starts and stays collapsed.
  const targetProgress = useTransform(
    scrollY,
    [0, collapseDistance],
    isHome ? [0, 1] : [1, 1],
    { clamp: true },
  );

  // Keeping this as its own variable makes the style transforms read like a
  // timeline: progress 0 is expanded, progress 1 is collapsed.
  const progress = targetProgress;

  // Fade the nav background out on the homepage hero. Interior pages use a
  // steady translucent background so the links remain legible.
  const navOpacity = useTransform(
    progress,
    [0, 1],
    isHome ? [0.1, 0] : [0.25, 0.25],
  );
  const navBackground = useMotionTemplate`rgba(0, 0, 0, ${navOpacity})`;

  // The nav itself creates the top hero space on the homepage. As it collapses,
  // the page content scrolls into view underneath it.
  const heroHeight = useTransform(
    progress,
    [0, 1],
    isHome ? [viewportHeight, minNavHeight] : [minNavHeight, minNavHeight],
  );

  // Vertical padding animates with the nav height so the links and logo do not
  // feel cramped at either end of the scroll transition.
  const paddingY = useTransform(
    progress,
    [0, 1],
    isHome
      ? [isPhonePortrait ? 20 : 28, isPhonePortrait ? 12 : 14]
      : [isPhonePortrait ? 12 : 16, isPhonePortrait ? 12 : 16],
  );

  // The invisible wrapper around the canvas changes size. The actual canvas
  // remains 100% width and height of that wrapper.
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
      className={`portfolio-nav fixed top-6 left-0 right-0 z-50 ${
        isPhonePortrait ? "portfolio-nav--phone" : ""
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
      {/* The scene cell is the left grid area on desktop and the top row on phone. */}
      <motion.div
        className="portfolio-nav__scene-cell"
        style={{
          alignSelf: "center",
        }}
      >
        {/* This frame is the responsive box. It scales with scroll, while the canvas inside remains 100% of it. */}
        <motion.div
          className="portfolio-nav__scene-frame drop-shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
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
            pointerEvents: "auto",
          }}
        >
          {/* The extra box makes the sizing relationship explicit for the canvas. */}
          <div className="portfolio-nav__canvas-box">
            <Scene />
          </div>
        </motion.div>
      </motion.div>

      {/* Links are laid out with CSS flex inside the nav grid column. */}
      <div className="portfolio-nav__links">
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
