import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 280);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="floating-back-to-top-btn fixed z-50 h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white border-2 border-[#E8DEC8] text-[#181206] hover:bg-[#FFC700] hover:border-[#D8A700] hover:scale-110 flex items-center justify-center shadow-lg transition-all duration-200 active:scale-95 cursor-pointer group"
      aria-label="Scroll back to top"
      title="Back to top"
    >
      <ChevronUp className="h-5 w-5 text-[#181206] group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}
