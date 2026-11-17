import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle,
  Clock,
  Archive,
  ArrowLeft,
  RefreshCw,
  Globe,
  Sliders,
  MessageSquare,
  Mail,
  AlertCircle,
  Inbox,
  X,
} from "lucide-react";
import {
  EditorialArticle,
  listAllArticles,
  deleteArticle,
  DEFAULT_SECTIONS,
} from "../../../lib/editorialApi";
import {
  listFeedback,
  updateFeedbackStatus,
  FeedbackRecord,
} from "../../../lib/feedbackApi";

export function NewsroomDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"articles" | "feedback">("articles");
  const [articles, setArticles] = useState<EditorialArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Feedback states
  const [feedbackList, setFeedbackList] = useState<FeedbackRecord[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackCategory, setFeedbackCategory] = useState("all");
  const [feedbackStatusFilter, setFeedbackStatusFilter] = useState("all");
  const [selectedFeedbackItem, setSelectedFeedbackItem] = useState<FeedbackRecord | null>(null);

  const loadFeedbackData = async () => {
    setFeedbackLoading(true);
    const res = await listFeedback({
      category: feedbackCategory,
      status: feedbackStatusFilter,
    });
    if (res.success) {
      setFeedbackList(res.data);
    }
    setFeedbackLoading(false);
  };

  useEffect(() => {
    if (activeTab === "feedback") {
      loadFeedbackData();
    }
  }, [activeTab, feedbackCategory, feedbackStatusFilter]);

  const handleFeedbackStatusChange = async (
    id: string,
    newStatus: "new" | "in_review" | "resolved" | "archived"
  ) => {
    const res = await updateFeedbackStatus(id, newStatus);
    if (res.success) {
      setFeedbackList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedFeedbackItem?.id === id) {
        setSelectedFeedbackItem((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      setNotification(`Feedback submission status updated to "${newStatus}".`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const loadData = async () => {
    setLoading(true);
    const data = await listAllArticles({
      section: selectedSection,
      status: selectedStatus,
      search: searchQuery,
    });
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [selectedSection, selectedStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    setDeletingId(id);
    const res = await deleteArticle(id);
    if (res.success) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
      setNotification(`"${title}" was removed.`);
      setTimeout(() => setNotification(null), 4000);
    } else {
      alert(`Could not delete: ${res.error}`);
    }
    setDeletingId(null);
  };

  const publishedCount = articles.filter((a) => a.status === "published").length;
  const draftCount = articles.filter((a) => a.status === "draft").length;
  const featuredCount = articles.filter((a) => a.is_featured).length;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans">
      {/* Top Header Bar */}
      <header className="bg-black text-white border-b-2 border-[#dc2626] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="font-serif font-black text-xl tracking-tight text-white flex items-center gap-1.5"
            >
              <span>THE PRIDE TIMES</span>
              <span className="text-[10px] tracking-widest font-sans uppercase bg-[#dc2626] text-white px-1.5 py-0.5 rounded-xs font-bold">
                CMS
              </span>
            </Link>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <span className="text-xs font-medium text-gray-400 hidden sm:inline">
              Newsroom Editorial Studio
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={13} /> Exit to Site
            </Link>
            <Link
              to="/newsroom/new"
              className="bg-[#dc2626] hover:bg-red-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus size={15} /> Write New Story
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Alert Notification */}
        {notification && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 text-sm rounded-xs flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              {notification}
            </span>
            <button
              onClick={() => setNotification(null)}
              className="text-green-600 hover:text-green-800 text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Studio Navigation Tabs */}
        <div className="flex items-center gap-4 border-b border-gray-200 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("articles")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === "articles"
                ? "border-[#dc2626] text-black"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            <FileText size={14} />
            <span>Articles &amp; Stories ({articles.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("feedback")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === "feedback"
                ? "border-[#dc2626] text-black"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            <Inbox size={14} />
            <span>Inquiries &amp; Reader Feedback</span>
            {feedbackList.filter((f) => f.status === "new").length > 0 && (
              <span className="px-1.5 py-0.2 bg-[#dc2626] text-white text-[10px] rounded-full font-bold">
                {feedbackList.filter((f) => f.status === "new").length}
              </span>
            )}
          </button>
        </div>

        {activeTab === "articles" ? (
          <div>
            {/* Dashboard Title & Overview Stats */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-gray-200">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-950">
                    Editorial Dispatch & Stories
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Upload, edit, and publish breaking news and sector reports directly to live category feeds.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={loadData}
                  disabled={loading}
                  className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xs transition-colors cursor-pointer"
                >
                  <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh Feed
                </button>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white border border-gray-200 p-4 rounded-xs shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                    Total Stories
                  </span>
                  <span className="font-serif text-2xl font-bold text-gray-950 mt-1 block">
                    {articles.length}
                  </span>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-xs shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 block">
                    Live Published
                  </span>
                  <span className="font-serif text-2xl font-bold text-green-700 mt-1 block">
                    {publishedCount}
                  </span>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-xs shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                    Drafts
                  </span>
                  <span className="font-serif text-2xl font-bold text-amber-700 mt-1 block">
                    {draftCount}
                  </span>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-xs shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 block">
                    Featured Lead Stories
                  </span>
                  <span className="font-serif text-2xl font-bold text-red-700 mt-1 block">
                    {featuredCount}
                  </span>
                </div>
              </div>
            </div>

        {/* Filters and Search Bar */}
        <div className="bg-white border border-gray-200 rounded-xs p-4 mb-6 shadow-2xs">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3"
          >
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by headline or keyword..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xs focus:outline-hidden focus:border-black"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400 font-medium">Section:</span>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="text-xs border border-gray-200 rounded-xs px-2.5 py-1.5 bg-white text-gray-800 focus:outline-hidden"
                >
                  <option value="all">All Sections</option>
                  {DEFAULT_SECTIONS.map((sec) => (
                    <option key={sec.slug} value={sec.slug}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400 font-medium">Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="text-xs border border-gray-200 rounded-xs px-2.5 py-1.5 bg-white text-gray-800 focus:outline-hidden"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Drafts</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xs transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          </form>
        </div>

        {/* Articles Table */}
        <div className="bg-white border border-gray-200 rounded-xs overflow-hidden shadow-2xs">
          {loading ? (
            <div className="py-20 text-center">
              <RefreshCw size={24} className="animate-spin text-[#dc2626] mx-auto mb-3" />
              <p className="text-xs text-gray-500 font-medium">Loading news dispatch feed...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="py-16 text-center px-4">
              <FileText size={32} className="text-gray-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-gray-800">No articles found</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                No stories match your current filters. Clear the search query or write a new article.
              </p>
              <Link
                to="/newsroom/new"
                className="inline-flex items-center gap-1.5 mt-4 bg-[#dc2626] text-white text-xs font-semibold px-4 py-2 rounded-xs hover:bg-red-700 transition-colors"
              >
                <Plus size={14} /> Create First Story
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Headline & Kicker</th>
                    <th className="py-3 px-4">Section</th>
                    <th className="py-3 px-4">Author</th>
                    <th className="py-3 px-4">Flags</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-xs text-gray-700">
                  {articles.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/80 transition-colors group"
                    >
                      <td className="py-3.5 px-4 max-w-md">
                        <div className="flex items-start gap-3">
                          {item.hero_image_url && (
                            <img
                              src={item.hero_image_url}
                              alt=""
                              className="w-14 h-11 object-cover rounded-xs border border-gray-200 shrink-0 mt-0.5 bg-gray-100"
                            />
                          )}
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#dc2626] block truncate">
                              {item.kicker}
                            </span>
                            <span className="font-serif font-bold text-gray-950 block text-[13px] leading-snug line-clamp-2 mt-0.5">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-gray-400 mt-0.5 block truncate">
                              Slug: /{item.section_slug}/{item.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-gray-100 text-gray-700 rounded-xs">
                          {item.section_slug}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="font-medium text-gray-900">{item.author_name}</p>
                        <p className="text-[10px] text-gray-400">{item.author_title}</p>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {item.is_featured && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-xs">
                              HERO
                            </span>
                          )}
                          {item.is_breaking && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-red-50 text-red-700 border border-red-200 rounded-xs">
                              BREAKING
                            </span>
                          )}
                          {item.is_editors_pick && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-xs">
                              PICK
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-xs uppercase tracking-wider ${
                            item.status === "published"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.status === "published" ? "bg-green-600" : "bg-amber-500"
                            }`}
                          />
                          {item.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            to={`/${item.section_slug}`}
                            target="_blank"
                            title="View section feed"
                            className="p-1.5 text-gray-400 hover:text-black transition-colors"
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <Link
                            to={`/newsroom/edit/${item.id}`}
                            title="Edit story"
                            className="p-1.5 text-gray-500 hover:text-[#dc2626] transition-colors"
                          >
                            <Edit3 size={14} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.title)}
                            disabled={deletingId === item.id}
                            title="Delete story"
                            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    ) : (
      <div>
        {/* Feedback Header & Overview */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-gray-200">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-950">
                Reader Inquiries &amp; Editorial Feedback Queue
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Triage incoming story pitches, editorial corrections, advertising inquiries, and reader sentiment ratings.
              </p>
            </div>
            <button
              type="button"
              onClick={loadFeedbackData}
              disabled={feedbackLoading}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xs transition-colors cursor-pointer"
            >
              <RefreshCw size={13} className={feedbackLoading ? "animate-spin" : ""} /> Refresh Inquiries
            </button>
          </div>

          {/* Feedback Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white border border-gray-200 p-4 rounded-xs shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                Total Submissions
              </span>
              <span className="font-serif text-2xl font-bold text-gray-950 mt-1 block">
                {feedbackList.length}
              </span>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-xs shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 block">
                New / Unread
              </span>
              <span className="font-serif text-2xl font-bold text-red-700 mt-1 block">
                {feedbackList.filter((f) => f.status === "new").length}
              </span>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-xs shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                In Review
              </span>
              <span className="font-serif text-2xl font-bold text-amber-700 mt-1 block">
                {feedbackList.filter((f) => f.status === "in_review").length}
              </span>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-xs shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 block">
                Resolved
              </span>
              <span className="font-serif text-2xl font-bold text-green-700 mt-1 block">
                {feedbackList.filter((f) => f.status === "resolved").length}
              </span>
            </div>
          </div>
        </div>

        {/* Feedback Filters */}
        <div className="bg-white border border-gray-200 p-4 rounded-xs shadow-2xs mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400 font-medium">Category:</span>
                <select
                  value={feedbackCategory}
                  onChange={(e) => setFeedbackCategory(e.target.value)}
                  className="text-xs border border-gray-200 rounded-xs px-2.5 py-1.5 bg-white text-gray-800 focus:outline-hidden"
                >
                  <option value="all">All Inquiries</option>
                  <option value="General inquiry">General Inquiry</option>
                  <option value="Editorial & Story Pitch">Editorial &amp; Pitch</option>
                  <option value="Corrections & Fact-Checking">Fact-Checking</option>
                  <option value="Advertising & Partnerships">Advertising</option>
                  <option value="Magazine & Subscriptions">Subscriptions</option>
                  <option value="Press & Media Requests">Press</option>
                  <option value="article_feedback">Article Feedback</option>
                  <option value="correction">Reader Correction</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400 font-medium">Status:</span>
                <select
                  value={feedbackStatusFilter}
                  onChange={(e) => setFeedbackStatusFilter(e.target.value)}
                  className="text-xs border border-gray-200 rounded-xs px-2.5 py-1.5 bg-white text-gray-800 focus:outline-hidden"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="in_review">In Review</option>
                  <option value="resolved">Resolved</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <span className="text-xs text-gray-400">
              Showing <span className="font-semibold text-gray-800">{feedbackList.length}</span> entries
            </span>
          </div>
        </div>

        {/* Feedback List Table */}
        <div className="bg-white border border-gray-200 rounded-xs shadow-2xs overflow-hidden">
          {feedbackLoading ? (
            <div className="py-16 text-center">
              <RefreshCw size={24} className="animate-spin text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Querying Supabase submissions...</p>
            </div>
          ) : feedbackList.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              <Inbox size={32} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm font-semibold text-gray-800">No submissions found</p>
              <p className="text-xs text-gray-400 mt-1">
                New contact inquiries and article notes will appear here once submitted.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider text-[10.5px]">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Sender</th>
                    <th className="py-3 px-4">Subject &amp; Excerpt</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {feedbackList.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-4 whitespace-nowrap text-gray-500">
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                          {item.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-900">{item.name || "Anonymous Reader"}</div>
                        <div className="text-[11px] text-gray-500 font-mono">{item.email}</div>
                      </td>

                      <td className="py-3.5 px-4 max-w-md">
                        <div className="font-bold text-gray-950 truncate">{item.subject}</div>
                        <div className="text-gray-500 truncate text-[11px] mt-0.5">{item.message}</div>
                        {item.article_title && (
                          <div className="text-[10px] text-red-600 font-medium mt-1 truncate">
                            Story: {item.article_title}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={item.status}
                          onChange={(e) => handleFeedbackStatusChange(item.id, e.target.value as any)}
                          className={`text-[11px] font-semibold rounded-full px-2.5 py-0.5 border cursor-pointer ${
                            item.status === "new"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : item.status === "in_review"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : item.status === "resolved"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-50 text-gray-600 border-gray-200"
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="in_review">In Review</option>
                          <option value="resolved">Resolved</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setSelectedFeedbackItem(item)}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-black text-white hover:bg-[#dc2626] transition-colors rounded-xs cursor-pointer"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Selected Feedback Detail Modal */}
        {selectedFeedbackItem && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white max-w-2xl w-full border border-gray-200 shadow-2xl p-6 rounded-xs relative">
              <button
                type="button"
                onClick={() => setSelectedFeedbackItem(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black p-1"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-gray-100 text-gray-800 rounded-full border border-gray-200">
                  {selectedFeedbackItem.category}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {new Date(selectedFeedbackItem.created_at).toLocaleString()}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-gray-950 mb-2">
                {selectedFeedbackItem.subject}
              </h3>

              <div className="p-3 bg-gray-50 border border-gray-200 text-xs space-y-1 mb-4">
                <div>
                  <span className="text-gray-500 font-medium">Sender:</span>{" "}
                  <span className="font-semibold text-gray-900">{selectedFeedbackItem.name || "Anonymous"}</span> (
                  <a href={`mailto:${selectedFeedbackItem.email}`} className="text-red-600 hover:underline">
                    {selectedFeedbackItem.email}
                  </a>
                  )
                </div>
                {selectedFeedbackItem.article_title && (
                  <div>
                    <span className="text-gray-500 font-medium">Article Context:</span>{" "}
                    <span className="font-semibold text-gray-900">{selectedFeedbackItem.article_title}</span>
                  </div>
                )}
                {selectedFeedbackItem.page_url && (
                  <div>
                    <span className="text-gray-500 font-medium">Page URL:</span>{" "}
                    <a
                      href={selectedFeedbackItem.page_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline font-mono text-[11px]"
                    >
                      {selectedFeedbackItem.page_url}
                    </a>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Message Content
                </label>
                <div className="p-4 bg-white border border-gray-300 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                  {selectedFeedbackItem.message}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Change Status:</span>
                  {(["new", "in_review", "resolved", "archived"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleFeedbackStatusChange(selectedFeedbackItem.id, st)}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-xs border capitalize transition-colors ${
                        selectedFeedbackItem.status === st
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedFeedbackItem(null)}
                  className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )}
      </main>
    </div>
  );
}

export default NewsroomDashboard;

