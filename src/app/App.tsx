import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MarketsTicker } from "./components/MarketsTicker";
import { PageLayout } from "./components/PageLayout";

// ============================================================
// MAIN PAGES
// ============================================================

import { HomePage } from "./components/pages/HomePage";
import { TechnologyPage } from "./components/pages/TechnologyPage";
import { FinancePage } from "./components/pages/FinancePage";
import { BillionairesPage } from "./components/pages/BillionairesPage";
import { WorldPage } from "./components/pages/WorldPage";

import { CybersecurityPage } from "./components/pages/CybersecurityPage";
import { EnergyPage } from "./components/pages/EnergyPage";
import { HealthcarePage } from "./components/pages/HealthcarePage";
import { ManufacturingPage } from "./components/pages/ManufacturingPage";
import { SmartCitiesPage } from "./components/pages/SmartCitiesPage";
import { SupplyChainPage } from "./components/pages/SupplyChainPage";

import { FeaturedPage } from "./components/pages/FeaturedPage";
import { BreakingNewsPage } from "./components/pages/BreakingNewsPage";
import { MarketsPage } from "./components/pages/MarketsPage";
import { CoverStoriesPage } from "./components/pages/CoverStoriesPage";
import { WhiteHouseWatchPage } from "./components/pages/WhiteHouseWatchPage";
import { BusinessNewsPage } from "./components/pages/BusinessNewsPage";
import { LeadershipPage } from "./components/pages/LeadershipPage";
import { InnovationPage } from "./components/pages/InnovationPage";
import { MagazinePage } from "./components/pages/MagazinePage";
import { CeoSpotlightPage } from "./components/pages/CeoSpotlightPage";

// ============================================================
// LEGAL / SYSTEM PAGES
// ============================================================

import { Privacy } from "./components/pages/Privacy";
import { Terms } from "./components/pages/Terms";
import { CookiePolicy } from "./components/pages/CookiePolicy";
import { Accessibility } from "./components/pages/Accessibility";
import { ResetPasswordPage } from "./components/pages/ResetPasswordPage";

// ============================================================
// AUTH PAGES
// ============================================================

import { SignInPage } from "./components/auth/SignInPage";
import { DashboardPage } from "./components/auth/DashboardPage";

// ============================================================
// MAGAZINE LAYOUT
// Ads are disabled throughout the website.
// ============================================================

interface MagazineLayoutProps {
  children: React.ReactNode;
  showLeftSidebar?: boolean;
  showRightSidebar?: boolean;
  topBanner?: boolean;
}

function MagazineLayout({
  children,
  showLeftSidebar = false,
  showRightSidebar = false,
  topBanner = false,
}: MagazineLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Website Header */}
      <Header />

      {/* Market ticker */}
      <MarketsTicker />

      {/* Main page content */}
      <PageLayout
        showLeftSidebar={showLeftSidebar}
        showRightSidebar={showRightSidebar}
        topBanner={topBanner}
      >
        {children}
      </PageLayout>

      {/* Website Footer */}
      <Footer />

    </div>
  );
}

// ============================================================
// APPLICATION
// ============================================================

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ==================================================
              AUTH / STANDALONE PAGES
              ================================================== */}

          <Route
            path="/signin"
            element={<SignInPage />}
          />

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/reset-password"
            element={<ResetPasswordPage />}
          />

          {/* ==================================================
              LEGAL PAGES
              ================================================== */}

          <Route
            path="/privacy"
            element={<Privacy />}
          />

          <Route
            path="/terms"
            element={<Terms />}
          />

          <Route
            path="/cookiepolicy"
            element={<CookiePolicy />}
          />

          <Route
            path="/accessibility"
            element={<Accessibility />}
          />

          {/* ==================================================
              HOME
              ================================================== */}

          <Route
            path="/"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <HomePage />
              </MagazineLayout>
            }
          />

          {/* ==================================================
              MAIN CATEGORY PAGES
              ================================================== */}

          <Route
            path="/technology"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <TechnologyPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/finance"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <FinancePage />
              </MagazineLayout>
            }
          />

          <Route
            path="/billionaires"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <BillionairesPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/world"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <WorldPage />
              </MagazineLayout>
            }
          />

          {/* ==================================================
              HEADER CATEGORY PAGES
              ================================================== */}

          <Route
            path="/cybersecurity"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <CybersecurityPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/energy"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <EnergyPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/healthcare"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <HealthcarePage />
              </MagazineLayout>
            }
          />

          <Route
            path="/manufacturing"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <ManufacturingPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/smart-cities"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <SmartCitiesPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/supply-chain"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <SupplyChainPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/magazine"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <MagazinePage />
              </MagazineLayout>
            }
          />

          {/* ==================================================
              ADDITIONAL NEWS PAGES
              ================================================== */}

          <Route
            path="/featured"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <FeaturedPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/breaking-news"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <BreakingNewsPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/markets"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <MarketsPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/cover-stories"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <CoverStoriesPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/white-house-watch"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <WhiteHouseWatchPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/business-news"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <BusinessNewsPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/leadership"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <LeadershipPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/innovation"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <InnovationPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/ceospotlight"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <CeoSpotlightPage />
              </MagazineLayout>
            }
          />

          {/* ==================================================
              MORE
              ================================================== */}

          <Route
            path="/more"
            element={
              <MagazineLayout
                showLeftSidebar={false}
                showRightSidebar={false}
                topBanner={false}
              >
                <FeaturedPage />
              </MagazineLayout>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
