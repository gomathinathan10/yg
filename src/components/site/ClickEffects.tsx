import { useEffect } from "react";

/**
 * Global tactile click feedback component.
 * Provides micro-animations (visual primary-tinted ripple burst) and optional haptic
 * feedback on every interactive click across buttons, links, cards, tabs, and toggles.
 */
export function ClickEffects() {
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Only fire for left/primary click or touch
      if (e.button !== 0) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Identify interactive targets
      const isClickable = Boolean(
        target.closest(
          "button, a, input, select, textarea, [role='button'], [role='tab'], [role='menuitem'], [data-clickable], .clickable, summary, label, .surface-card"
        )
      );

      if (!isClickable) return;

      // Subtle haptic response on supported mobile devices
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate(8);
        } catch {
          // ignore
        }
      }

      // Create lightweight visual ripple burst
      const ripple = document.createElement("div");
      ripple.className = "click-ripple-burst";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;

      document.body.appendChild(ripple);

      ripple.addEventListener(
        "animationend",
        () => {
          ripple.remove();
        },
        { once: true }
      );

      // Fallback cleanup
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.remove();
        }
      }, 600);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return null;
}
