import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Image as ImageIcon,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  Tag,
  User,
  Shield,
  Upload,
} from "lucide-react";
import {
  EditorialArticle,
  NewArticlePayload,
  KeyFigure,
  createArticle,
  updateArticle,
  fetchArticleBySlug,
  listAllArticles,
  uploadArticleImage,
  generateSlug,
  calculateReadTime,
  DEFAULT_SECTIONS,
  DEFAULT_AUTHORS,
} from "../../../lib/editorialApi";

export function ArticleEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [sectionSlug, setSectionSlug] = useState("world");
  const [kicker, setKicker] = useState("REPORT");
  const [authorName, setAuthorName] = useState("The Pride Times Staff");
  const [authorTitle, setAuthorTitle] = useState("Senior Correspondent");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [imageCredit, setImageCredit] = useState("The Pride Times / Reuters");
  const [content, setContent] = useState("");
  const [keyFigures, setKeyFigures] = useState<KeyFigure[]>([
    { label: "Coverage", value: "Global Analysis" },
  ]);
  const [tagsInput, setTagsInput] = useState("World, Geopolitics");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [isEditorsPick, setIsEditorsPick] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("published");

  // UI state
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // When title changes, auto-generate slug unless user typed a custom slug
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManuallyEdited && !isEditing) {
      setSlug(generateSlug(val));
    }
  };

  // If editing an existing article, fetch its data
  useEffect(() => {
    if (!id) return;
    async function loadArticle() {
      const all = await listAllArticles();
      const existing = all.find((a) => a.id === id);
      if (existing) {
        setTitle(existing.title);
        setSlug(existing.slug);
        setSubheadline(existing.subheadline || "");
        setSectionSlug(existing.section_slug);
        setKicker(existing.kicker);
        setAuthorName(existing.author_name);
        setAuthorTitle(existing.author_title);
        setHeroImageUrl(existing.hero_image_url);
        setImageCaption(existing.image_caption || "");
        setImageCredit(existing.image_credit || "");
        setContent(existing.content);
        setKeyFigures(existing.key_figures || []);
        setTagsInput((existing.tags || []).join(", "));
        setIsFeatured(existing.is_featured);
        setIsBreaking(existing.is_breaking);
        setIsEditorsPick(existing.is_editors_pick);
        setIsPremium(existing.is_premium);
        setStatus(existing.status === "draft" ? "draft" : "published");
      }
    }
    loadArticle();
  }, [id]);

  // Key Figures Management
  const addKeyFigure = () => {
    setKeyFigures([...keyFigures, { label: "", value: "" }]);
  };

  const updateKeyFigure = (index: number, field: "label" | "value", val: string) => {
    const updated = [...keyFigures];
    updated[index][field] = val;
    setKeyFigures(updated);
  };

  const removeKeyFigure = (index: number) => {
    setKeyFigures(keyFigures.filter((_, i) => i !== index));
  };

  // Image Upload handler
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    setErrorMsg(null);
    const { url, error } = await uploadArticleImage(file);
    if (url) {
      setHeroImageUrl(url);
    } else {
      // Fallback: If Supabase storage is unmigrated, create a local object URL for preview
      const localUrl = URL.createObjectURL(file);
      setHeroImageUrl(localUrl);
      console.warn("Storage upload notice:", error);
    }
    setUploadingImage(false);
  };

  // Form Submit
  const handleSubmit = async (targetStatus: "draft" | "published") => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!title.trim()) {
      setErrorMsg("Please enter an article headline.");
      return;
    }
    if (!content.trim()) {
      setErrorMsg("Please enter article body text.");
      return;
    }

    setSubmitting(true);
    const finalSlug = slug.trim() || generateSlug(title);
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: NewArticlePayload = {
      title: title.trim(),
      slug: finalSlug,
      subheadline: subheadline.trim(),
      section_slug: sectionSlug,
      kicker: kicker.trim().toUpperCase() || "REPORT",
      author_name: authorName.trim(),
      author_title: authorTitle.trim(),
      hero_image_url:
        heroImageUrl.trim() ||
        "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80",
      image_caption: imageCaption.trim(),
      image_credit: imageCredit.trim(),
      content: content.trim(),
      key_figures: keyFigures.filter((kf) => kf.label && kf.value),
      tags,
      status: targetStatus,
      is_featured: isFeatured,
      is_breaking: isBreaking,
      is_lead_story: isFeatured,
      is_editors_pick: isEditorsPick,
      is_premium: isPremium,
      read_time: calculateReadTime(content),
    };

    if (isEditing && id) {
      const res = await updateArticle(id, payload);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("Article updated successfully!");
        setTimeout(() => navigate("/newsroom"), 1500);
      }
    } else {
      const res = await createArticle(payload);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("Story published to live feed successfully!");
        setTimeout(() => navigate("/newsroom"), 1500);
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans">
      {/* Editorial Studio Sticky Header */}
      <header className="bg-black text-white border-b-2 border-[#dc2626] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/newsroom"
              className="text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={14} /> Back to Newsroom
            </Link>
            <span className="text-gray-600">|</span>
            <span className="font-serif font-bold text-sm text-gray-200">
              {isEditing ? "Edit Dispatch" : "New Story Dispatch"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex bg-gray-900 border border-gray-800 rounded-xs p-0.5">
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors cursor-pointer ${
                  activeTab === "edit" ? "bg-white text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                Editor Form
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors flex items-center gap-1 cursor-pointer ${
                  activeTab === "preview" ? "bg-white text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                <Eye size={12} /> Live Preview
              </button>
            </div>

            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit("draft")}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold px-3.5 py-2 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Save size={13} /> Save Draft
            </button>

            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit("published")}
              className="bg-[#dc2626] hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Send size={13} /> {isEditing ? "Save & Publish" : "Publish to Site"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifications */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm rounded-xs flex items-center gap-2">
            <AlertCircle size={16} className="text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 text-xs sm:text-sm rounded-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {activeTab === "preview" ? (
          /* =========================================================
             BROADSHEET LIVE PREVIEW TAB
             ========================================================= */
          <div className="bg-white border border-gray-200 p-6 sm:p-12 max-w-4xl mx-auto shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#dc2626]">
                {kicker || "SPECIAL REPORT"}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                {sectionSlug}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-gray-950 leading-tight">
              {title || "Untitled Story Headline"}
            </h1>

            {subheadline && (
              <p className="font-serif text-lg text-gray-600 mt-3 leading-relaxed border-l-2 border-[#dc2626] pl-4 italic">
                {subheadline}
              </p>
            )}

            <div className="flex items-center justify-between border-y border-gray-200 py-3 mt-6 mb-8 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{authorName}</span>
                <span>•</span>
                <span>{authorTitle}</span>
              </div>
              <div className="flex items-center gap-3">
                <span>{calculateReadTime(content)}</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString("en-US", { dateStyle: "long" })}</span>
              </div>
            </div>

            {heroImageUrl && (
              <div className="mb-8">
                <img
                  src={heroImageUrl}
                  alt={title}
                  className="w-full max-h-[500px] object-cover rounded-xs"
                />
                {(imageCaption || imageCredit) && (
                  <p className="text-[11px] text-gray-500 mt-2 flex justify-between">
                    <span>{imageCaption}</span>
                    <span className="italic">{imageCredit}</span>
                  </p>
                )}
              </div>
            )}

            {keyFigures.length > 0 && keyFigures.some((kf) => kf.label && kf.value) && (
              <div className="bg-gray-50 border-l-4 border-black p-4 mb-8">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Key Figures
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {keyFigures.map(
                    (kf, i) =>
                      kf.label &&
                      kf.value && (
                        <div key={i}>
                          <p className="text-[10px] text-gray-500 uppercase">{kf.label}</p>
                          <p className="font-serif text-base font-bold text-gray-950">{kf.value}</p>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-serif text-base sm:text-lg space-y-4 whitespace-pre-line">
              {content || "Enter article body text in the editor to see it formatted here."}
            </div>
          </div>
        ) : (
          /* =========================================================
             EDITORIAL FORM TAB
             ========================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8 items-start">
            {/* Left Column: Headline, Lede, Body, Key Figures */}
            <div className="space-y-6">
              {/* Headline Card */}
              <div className="bg-white border border-gray-200 p-6 rounded-xs shadow-2xs">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Headline / Article Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Global Semiconductor Coalition Inks Historic $45B Transatlantic Pact"
                  className="w-full px-3.5 py-2.5 text-base sm:text-lg font-serif font-bold border border-gray-200 rounded-xs focus:outline-hidden focus:border-black"
                />

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[11px] text-gray-400 font-mono">Slug:</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setSlugManuallyEdited(true);
                    }}
                    placeholder="article-slug"
                    className="flex-1 px-2 py-1 text-xs font-mono border border-gray-200 rounded-xs focus:outline-hidden"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Subheadline / Editorial Lede (Deck)
                  </label>
                  <textarea
                    rows={2}
                    value={subheadline}
                    onChange={(e) => setSubheadline(e.target.value)}
                    placeholder="Brief 1-2 sentence summary displayed below the headline and on category feeds..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-gray-200 rounded-xs focus:outline-hidden focus:border-black"
                  />
                </div>
              </div>

              {/* Hero Image Card */}
              <div className="bg-white border border-gray-200 p-6 rounded-xs shadow-2xs">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Hero Image
                </label>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-3">
                  <input
                    type="text"
                    value={heroImageUrl}
                    onChange={(e) => setHeroImageUrl(e.target.value)}
                    placeholder="Paste image URL (https://...)"
                    className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-xs focus:outline-hidden"
                  />
                  <label className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-2 rounded-xs border border-gray-200 cursor-pointer flex items-center justify-center gap-1.5 transition-colors">
                    <Upload size={13} />
                    {uploadingImage ? "Uploading..." : "Upload File"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {heroImageUrl && (
                  <div className="relative mb-3 border border-gray-200 rounded-xs overflow-hidden max-h-52 bg-gray-50">
                    <img
                      src={heroImageUrl}
                      alt="Hero preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-[11px] text-gray-500 mb-1">Image Caption</label>
                    <input
                      type="text"
                      value={imageCaption}
                      onChange={(e) => setImageCaption(e.target.value)}
                      placeholder="e.g. World leaders convene in Geneva"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-xs focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-500 mb-1">Photo Credit</label>
                    <input
                      type="text"
                      value={imageCredit}
                      onChange={(e) => setImageCredit(e.target.value)}
                      placeholder="e.g. The Pride Times / Reuters"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-xs focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Body Content Card */}
              <div className="bg-white border border-gray-200 p-6 rounded-xs shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Article Body Text <span className="text-red-600">*</span>
                  </label>
                  <span className="text-[11px] text-gray-400">
                    {calculateReadTime(content)} ({content.trim().split(/\s+/).filter(Boolean).length} words)
                  </span>
                </div>
                <textarea
                  rows={14}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Draft your story here. Separate paragraphs with double enter. Use ## for section headings and > for pull quotes..."
                  className="w-full px-3.5 py-3 text-sm leading-relaxed border border-gray-200 rounded-xs font-serif focus:outline-hidden focus:border-black"
                />
              </div>

              {/* Key Figures Builder */}
              <div className="bg-white border border-gray-200 p-6 rounded-xs shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                      Key Figures & Data Callouts
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Display structured metrics in the broadsheet sidebar box.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addKeyFigure}
                    className="text-xs font-semibold text-[#dc2626] hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} /> Add Metric
                  </button>
                </div>

                <div className="space-y-2.5">
                  {keyFigures.map((kf, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={kf.label}
                        onChange={(e) => updateKeyFigure(i, "label", e.target.value)}
                        placeholder="Label (e.g. Deal Size)"
                        className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-xs focus:outline-hidden"
                      />
                      <input
                        type="text"
                        value={kf.value}
                        onChange={(e) => updateKeyFigure(i, "value", e.target.value)}
                        placeholder="Value (e.g. $45 Billion)"
                        className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-xs focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => removeKeyFigure(i)}
                        className="p-1.5 text-gray-400 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Taxonomy, Flags, Metadata */}
            <div className="space-y-6">
              {/* Publishing Destination */}
              <div className="bg-white border border-gray-200 p-6 rounded-xs shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Publishing Taxonomy
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Target Section / Category
                    </label>
                    <select
                      value={sectionSlug}
                      onChange={(e) => setSectionSlug(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xs bg-white text-gray-800 focus:outline-hidden"
                    >
                      {DEFAULT_SECTIONS.map((sec) => (
                        <option key={sec.slug} value={sec.slug}>
                          {sec.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Kicker Label (Red Uppercase Badge)
                    </label>
                    <input
                      type="text"
                      value={kicker}
                      onChange={(e) => setKicker(e.target.value.toUpperCase())}
                      placeholder="e.g. GEOPOLITICS, EXCLUSIVE"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xs font-semibold focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Author / Byline
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Author Name"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xs focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Author Title
                    </label>
                    <input
                      type="text"
                      value={authorTitle}
                      onChange={(e) => setAuthorTitle(e.target.value)}
                      placeholder="e.g. Senior Geopolitical Analyst"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xs focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Tags (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="Economy, AI, Diplomatic Treaty"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xs focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Priority & Feed Placement Flags */}
              <div className="bg-white border border-gray-200 p-6 rounded-xs shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Feed Placements & Priority
                </h3>

                <div className="space-y-3.5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="mt-0.5 rounded-xs text-[#dc2626] focus:ring-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-900">Featured Lead Hero</p>
                      <p className="text-[11px] text-gray-500">
                        Places this article in the top lead position of the section feed.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isBreaking}
                      onChange={(e) => setIsBreaking(e.target.checked)}
                      className="mt-0.5 rounded-xs text-[#dc2626] focus:ring-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-900">Breaking News Alert</p>
                      <p className="text-[11px] text-gray-500">
                        Highlights story with red breaking banner and ticker alert.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isEditorsPick}
                      onChange={(e) => setIsEditorsPick(e.target.checked)}
                      className="mt-0.5 rounded-xs text-[#dc2626] focus:ring-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-900">Editor's Pick</p>
                      <p className="text-[11px] text-gray-500">
                        Featured in the right sidebar "Editor's Picks" column.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPremium}
                      onChange={(e) => setIsPremium(e.target.checked)}
                      className="mt-0.5 rounded-xs text-[#dc2626] focus:ring-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-900">Subscriber Only (Premium)</p>
                      <p className="text-[11px] text-gray-500">
                        Gated for paying subscribers. Free readers see paywall preview.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Status and Actions Card */}
              <div className="bg-white border border-gray-200 p-6 rounded-xs shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Status
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-xs ${
                      status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => handleSubmit("published")}
                    className="w-full bg-[#dc2626] hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send size={14} /> {isEditing ? "Update & Publish" : "Publish to Section"}
                  </button>

                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => handleSubmit("draft")}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold py-2 rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Save size={13} /> Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ArticleEditorPage;

