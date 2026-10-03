
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
import { InternationalNewsPage } from "./components/pages/InternationalNewsPage";
import { StartupSuccessPage } from "./components/pages/Startupsuccesspage";
import { ConsumerRetailPage } from "./components/pages/ConsumerRetailPage";

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
import { ArticleDetailPage } from "./components/pages/ArticleDetailPage";
import { LeadershipPage } from "./components/pages/LeadershipPage";
import { LeadershipGovernancePage } from "./components/pages/LeadershipGovernancePage";
import { InnovationPage } from "./components/pages/InnovationPage";
import { MagazinePage } from "./components/pages/MagazinePage";
import { CeoSpotlightPage } from "./components/pages/CeoSpotlightPage";
import { AboutUsPage } from "./components/pages/AboutUsPage";

// ============================================================
// MERGERS & ACQUISITIONS
// Separate editorial section with its own article routes.
// ============================================================

import {
  MergersAcquisitionsPage,
  MergersAcquisitionsArticlePage,
} from "./components/pages/MergersAcquisitionsPage";

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

import { LoginPage } from "./components/auth/LoginPage";
import { SignUpPage } from "./components/auth/SignUpPage";
import { DashboardPage } from "./components/auth/DashboardPage";

// ============================================================
// MAGAZINE LAYOUT
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
      <Header />

      <MarketsTicker />

      <PageLayout
        showLeftSidebar={showLeftSidebar}
        showRightSidebar={showRightSidebar}
        topBanner={topBanner}
      >
        {children}
      </PageLayout>

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

          <Route path="/login" element={<LoginPage />} />

          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/dashboard" element={<DashboardPage />} />

          <Route
            path="/reset-password"
            element={<ResetPasswordPage />}
          />

          {/* ==================================================
              LEGAL PAGES
              ================================================== */}

          <Route path="/privacy" element={<Privacy />} />

          <Route path="/terms" element={<Terms />} />

          <Route path="/cookiepolicy" element={<CookiePolicy />} />

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
              <MagazineLayout>
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
              <MagazineLayout>
                <TechnologyPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/finance"
            element={
              <MagazineLayout>
                <FinancePage />
              </MagazineLayout>
            }
          />

          <Route
            path="/billionaires"
            element={
              <MagazineLayout>
                <BillionairesPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/world"
            element={
              <MagazineLayout>
                <WorldPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/international-news"
            element={
              <MagazineLayout>
                <InternationalNewsPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/startup-success"
            element={
              <MagazineLayout>
                <StartupSuccessPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/consumer-retail"
            element={
              <MagazineLayout>
                <ConsumerRetailPage />
              </MagazineLayout>
            }
          />

          {/* ==================================================
              HEADER CATEGORY PAGES
              ================================================== */}

          <Route
            path="/cybersecurity"
            element={
              <MagazineLayout>
                <CybersecurityPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/energy"
            element={
              <MagazineLayout>
                <EnergyPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/healthcare"
            element={
              <MagazineLayout>
                <HealthcarePage />
              </MagazineLayout>
            }
          />

          <Route
            path="/manufacturing"
            element={
              <MagazineLayout>
                <ManufacturingPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/smart-cities"
            element={
              <MagazineLayout>
                <SmartCitiesPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/supply-chain"
            element={
              <MagazineLayout>
                <SupplyChainPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/magazine"
            element={
              <MagazineLayout>
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
              <MagazineLayout>
                <FeaturedPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/breaking-news"
            element={
              <MagazineLayout>
                <BreakingNewsPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/markets"
            element={
              <MagazineLayout>
                <MarketsPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/cover-stories"
            element={
              <MagazineLayout>
                <CoverStoriesPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/white-house-watch"
            element={
              <MagazineLayout>
                <WhiteHouseWatchPage />
              </MagazineLayout>
            }
          />

          {/* ==================================================
              BUSINESS NEWS
              Existing Business page remains unchanged.
              ================================================== */}

          <Route
            path="/business-news"
            element={
              <MagazineLayout>
                <BusinessNewsPage />
              </MagazineLayout>
            }
          />

          {/* ==================================================
              MERGERS & ACQUISITIONS
              Independent landing page and article details.
              ================================================== */}

          <Route
            path="/mergers-acquisitions"
            element={
              <MagazineLayout>
                <MergersAcquisitionsPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/mergers-acquisitions/:slug"
            element={
              <MagazineLayout>
                <MergersAcquisitionsArticlePage />
              </MagazineLayout>
            }
          />

          {/* ==================================================
              GENERAL ARTICLE DETAIL PAGES
              Homepage article cards navigate to:
              /article/<article-slug>
              ================================================== */}

          <Route
            path="/article/:id"
            element={
              <MagazineLayout>
                <ArticleDetailPage />
              </MagazineLayout>
            }
          />

          {/* ==================================================
              LEADERSHIP & INNOVATION
              ================================================== */}

          <Route
            path="/leadership"
            element={
              <MagazineLayout>
                <LeadershipPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/leadership-governance"
            element={
              <MagazineLayout>
                <LeadershipGovernancePage />
              </MagazineLayout>
            }
          />

          <Route
            path="/innovation"
            element={
              <MagazineLayout>
                <InnovationPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/ceospotlight"
            element={
              <MagazineLayout>
                <CeoSpotlightPage />
              </MagazineLayout>
            }
          />

          {/* ==================================================
              ABOUT US
              Standalone site-shell route.
              ================================================== */}

          <Route
            path="/about-us"
            element={
              <div className="min-h-screen bg-white flex flex-col">
                <Header />

                <MarketsTicker />

                <main className="flex-1">
                  <AboutUsPage />
                </main>

                <Footer />
              </div>
            }
          />

          {/* ==================================================
              MORE
              ================================================== */}

          <Route
            path="/more"
            element={
              <MagazineLayout>
                <FeaturedPage />
              </MagazineLayout>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
