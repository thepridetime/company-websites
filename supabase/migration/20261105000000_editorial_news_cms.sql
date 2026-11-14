-- ============================================================
-- THE PRIDE TIMES — EDITORIAL NEWS CMS SCHEMA
-- Migration: 20261105000000_editorial_news_cms.sql
-- Enables dynamic news publishing, authoring, and section feeds
-- ============================================================

-- 1. Editorial Sections / Categories
CREATE TABLE IF NOT EXISTS public.editorial_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed existing publication sections
INSERT INTO public.editorial_sections (slug, name, description, display_order) VALUES
('world', 'World & Geopolitics', 'Global diplomacy, international conflicts, treaties, and macro geopolitics.', 1),
('business-news', 'Business News', 'Corporate strategies, enterprise earnings, industry developments, and global commerce.', 2),
('markets', 'Markets & Finance', 'Stock exchanges, central banks, bonds, commodities, and currency movements.', 3),
('tech', 'Technology & AI', 'Artificial intelligence, semiconductor manufacturing, enterprise software, and robotics.', 4),
('manufacturing', 'Manufacturing & Industry', 'Reshoring, supply chains, automated factories, and heavy industrial production.', 5),
('healthcare', 'Healthcare & Pharma', 'Biotech breakthroughs, pharmaceutical clinical pipelines, medical devices, and health policy.', 6),
('energy', 'Energy & Commodities', 'Clean energy transition, oil and gas, nuclear power, LNG markets, and energy security.', 7),
('sustainability', 'Sustainability & ESG', 'Climate transition finance, corporate decarbonization, carbon credits, and environmental governance.', 8),
('leadership', 'Leadership & Governance', 'Executive profiles, board governance, CEO strategy, and institutional leadership.', 9),
('mergers-acquisitions', 'Deals & M&A', 'Cross-border buyouts, private equity transactions, corporate mergers, and divestitures.', 10),
('startups', 'Startups & Venture Capital', 'Seed to growth investments, unicorn valuations, tech incubators, and founder stories.', 11)
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order;

-- 2. Editorial Authors
CREATE TABLE IF NOT EXISTS public.editorial_authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    title TEXT DEFAULT 'Senior Editorial Staff',
    avatar_url TEXT,
    bio TEXT,
    email TEXT,
    twitter_handle TEXT,
    linkedin_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.editorial_authors (name, title, bio) VALUES
('Editorial Board', 'The Pride Times Editorial Board', 'Official collective voice and institutional analysis of The Pride Times.'),
('Alexander Wright', 'Senior Geopolitical Analyst', 'Covering diplomacy, defense pacts, and international treaties across Europe and Asia.'),
('Priya Sharma', 'Chief Financial Correspondent', 'Focusing on central bank policies, sovereign debt, and global currency dynamics.'),
('Marcus Vance', 'Technology & AI Bureau Chief', 'Reporting on advanced semiconductor lithography, frontier AI models, and enterprise robotics.'),
('Elena Rostova', 'Energy Transition Lead', 'Tracking global LNG trade routes, nuclear energy expansion, and renewable infrastructure.')
ON CONFLICT DO NOTHING;

-- 3. Articles Table
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subheadline TEXT,
    kicker TEXT NOT NULL DEFAULT 'REPORT',
    section_slug TEXT NOT NULL REFERENCES public.editorial_sections(slug) ON UPDATE CASCADE ON DELETE RESTRICT,
    author_id UUID REFERENCES public.editorial_authors(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL DEFAULT 'The Pride Times Staff',
    author_title TEXT DEFAULT 'Staff Correspondent',
    
    -- Visual Assets
    hero_image_url TEXT NOT NULL,
    image_caption TEXT,
    image_credit TEXT,
    
    -- Content Body
    content TEXT NOT NULL,
    key_figures JSONB DEFAULT '[]'::jsonb,
    tags TEXT[] DEFAULT '{}',
    
    -- Status & Priority
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_breaking BOOLEAN NOT NULL DEFAULT FALSE,
    is_lead_story BOOLEAN NOT NULL DEFAULT FALSE,
    is_editors_pick BOOLEAN NOT NULL DEFAULT FALSE,
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Metrics & Timestamps
    read_time TEXT DEFAULT '4 min read',
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_articles_section_status_pub ON public.articles(section_slug, status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON public.articles(is_featured, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_breaking ON public.articles(is_breaking, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);

-- Row-Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editorial_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editorial_authors ENABLE ROW LEVEL SECURITY;

-- Public can read all published sections, authors, and articles
DROP POLICY IF EXISTS "Public can view sections" ON public.editorial_sections;
CREATE POLICY "Public can view sections" ON public.editorial_sections FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view authors" ON public.editorial_authors;
CREATE POLICY "Public can view authors" ON public.editorial_authors FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view published articles" ON public.articles;
CREATE POLICY "Public can view published articles" ON public.articles FOR SELECT USING (status = 'published');

-- Authenticated staff can insert/update/delete articles
DROP POLICY IF EXISTS "Staff can manage articles" ON public.articles;
CREATE POLICY "Staff can manage articles" ON public.articles FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can manage sections" ON public.editorial_sections;
CREATE POLICY "Staff can manage sections" ON public.editorial_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can manage authors" ON public.editorial_authors;
CREATE POLICY "Staff can manage authors" ON public.editorial_authors FOR ALL TO authenticated USING (true) WITH CHECK (true);

