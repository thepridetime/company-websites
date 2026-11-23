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
} from "lucide-react";
import {
  EditorialArticle,
  listAllArticles,
  deleteArticle,
  DEFAULT_SECTIONS,
} from "../../../lib/editorialApi";

export function NewsroomDashboard() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<EditorialArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

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
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-xs uppercase tracking-wider ${item.status === "published"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${item.status === "published" ? "bg-green-600" : "bg-amber-500"
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
      </main>
    </div>
  );
}

export default NewsroomDashboard;

