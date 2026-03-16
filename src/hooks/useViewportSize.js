import { useEffect, useState } from "react";

const DEFAULT_VIEWPORT = {
  width: 1440,
  height: 800,
};

function getViewportSize() {
  if (typeof window === "undefined") {
    return DEFAULT_VIEWPORT;
  }

  return {
    width: window.innerWidth || DEFAULT_VIEWPORT.width,
    height: window.innerHeight || DEFAULT_VIEWPORT.height,
  };
}

function useViewportSize() {
  const [viewportSize, setViewportSize] = useState(getViewportSize);

  useEffect(() => {
    const handleResize = () => setViewportSize(getViewportSize());

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewportSize;
}

export { useViewportSize };
