import { useState, useEffect } from "react";

//
// mobile: 480,
// tablet: 800,
// desktop: 1000,
// largeDesktop: 1600
const mobileWidth = 480;
const desktopWidth = 1024; // xl -1280

export default function useScreenWidth() {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  const isWindow = typeof window !== "undefined";

  const getWidth = () => (isWindow ? window.innerWidth : windowWidth);

  const resize = () => setWindowWidth(getWidth());

  const isMobile = windowWidth! <= mobileWidth;
  const isDesktop = windowWidth! <= desktopWidth;

  useEffect(() => {
    if (isWindow) {
      setWindowWidth(getWidth());

      window.addEventListener("resize", resize);

      return () => window.removeEventListener("resize", resize);
    }
    //eslint-disable-next-line
  }, [isWindow]);

  return { width: windowWidth, isMobile };
}
