
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  showLeftSidebar?: boolean;
  showRightSidebar?: boolean;
  topBanner?: boolean;
}

/**
 * PageLayout
 *
 * Global content wrapper for The Pride Times magazine pages.
 *
 * This component intentionally does not contain:
 * - Advertisement components
 * - Sponsored content
 * - Ad Manager
 * - Page-specific content
 *
 * Individual pages are responsible for their own editorial layouts.
 */
export function PageLayout({
  children,
  showLeftSidebar = false,
  showRightSidebar = false,
  topBanner = false,
}: PageLayoutProps) {
  /*
   * These props are retained because App.tsx already passes them
   * to PageLayout. Keeping them here prevents route/layout
   * compatibility problems.
   *
   * The current magazine design uses full-width content, so
   * sidebars and banners are not rendered by this wrapper.
   */
  void showLeftSidebar;
  void showRightSidebar;
  void topBanner;

  return (
    <main
      className="
        w-full
        min-w-0
        flex-1
        bg-white
        text-gray-900
      "
    >
      <div
        className="
          w-full
          min-w-0
          overflow-x-hidden
        "
      >
        {children}
      </div>
    </main>
  );
}

export default PageLayout;

