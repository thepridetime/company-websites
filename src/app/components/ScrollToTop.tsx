// Target path: src/app/components/ScrollToTop.tsx
// Scrolls to the top whenever the page or its search changes, so links like the
// trending tags open at the top of the destination page instead of mid-page.
import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}
