import { useEffect } from "react";

export function useModal(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    // Get original body style
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
}
