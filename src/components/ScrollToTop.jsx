import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      //   behavior: "smooth", // This enables smooth scrolling
    });
  }, [location]);

  return null;
};

export default ScrollToTop;
