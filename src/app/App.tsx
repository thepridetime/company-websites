import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MarketsTicker } from "./components/MarketsTicker";
import { PageLayout } from "./components/PageLayout";

// Pages
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
import { InternationalNewsPage } from "./components/pages/InternationalNewsPage";
import { Privacy } from "./components/pages/Privacy";
import { Terms } from "./components/pages/Terms";
import { CookiePolicy } from "./components/pages/CookiePolicy";
import { Accessibility } from "./components/pages/Accessibility";
import { ResetPasswordPage } from "./components/pages/ResetPasswordPage";
import { CeoSpotlightPage } from "./components/pages/CeoSpotlightPage";
import { AboutUsPage } from "./components/pages/AboutUsPage";
import { AdvertisePage } from "./components/pages/AdvertisePage";
import { CareersPage } from "./components/pages/CareersPage";
import { ContactPage } from "./components/pages/ContactPage";
import { PressRoomPage } from "./components/pages/PressRoomPage";

// Auth
import { LoginPage } from "./components/auth/LoginPage";
import { SignUpPage } from "./components/auth/SignUpPage";
import { DashboardPage } from "./components/auth/DashboardPage";

function MagazineLayout({
  children,
  showLeftSidebar = true,
  showRightSidebar = true,
  topBanner = true,
}: {
  children: React.ReactNode;
  showLeftSidebar?: boolean;
  showRightSidebar?: boolean;
  topBanner?: boolean;
}) {
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

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone pages (no mag layout) */}

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookiepolicy" element={<CookiePolicy />} />
          <Route path="/accessibility" element={<Accessibility />} />

          {/* Main magazine routes */}

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

          {/* Header category pages */}

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

          {/* Subheader / More pages */}

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
            path="/international-news"
            element={
              <MagazineLayout>
                <InternationalNewsPage />
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

          <Route
            path="/business-news"
            element={
              <MagazineLayout>
                <BusinessNewsPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/leadership"
            element={
              <MagazineLayout>
                <LeadershipPage />
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

          <Route
            path="/about-us"
            element={
              <MagazineLayout>
                <AboutUsPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/advertise"
            element={
              <MagazineLayout>
                <AdvertisePage />
              </MagazineLayout>
            }
          />

          <Route
            path="/careers"
            element={
              <MagazineLayout>
                <CareersPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/contact"
            element={
              <MagazineLayout>
                <ContactPage />
              </MagazineLayout>
            }
          />

          <Route
            path="/press-room"
            element={
              <MagazineLayout>
                <PressRoomPage />
              </MagazineLayout>
            }
          />

          {/* "More" catch-all → redirect to featured */}

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
