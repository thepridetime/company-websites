// ============================================================
// THE PRIDE TIMES — ARTICLE FEEDBACK & CORRECTIONS COMPONENT
// src/app/components/feedback/ArticleFeedback.tsx
// Financial Times / Bloomberg standard reader interaction panel.
// ============================================================

import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Check, AlertCircle, ChevronDown, Send } from "lucide-react";
import { submitFeedback } from "../../../lib/feedbackApi";

interface ArticleFeedbackProps {
  articleTitle: string;
  articleSlug: string;
}

export function ArticleFeedback({ articleTitle, articleSlug }: ArticleFeedbackProps) {
  const [sentiment, setSentiment] = useState<"positive" | "negative" | null>(null);
  const [sentimentSubmitted, setSentimentSubmitted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form fields
  const [category, setCategory] = useState("correction");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSentimentClick = async (val: "positive" | "negative") => {
    if (sentimentSubmitted) return;
    setSentiment(val);
    setSentimentSubmitted(true);

    // Record anonymous sentiment rating
    await submitFeedback({
      email: "anonymous-reader@pridetimes.internal",
      category: "article_feedback",
      subject: `Reader Sentiment: ${val.toUpperCase()} on "${articleTitle}"`,
      message: `Reader indicated that this piece was ${val === "positive" ? "helpful and well-sourced" : "in need of revision or lacking clarity"}.`,
      rating: val === "positive" ? 5 : 2,
      article_slug: articleSlug,
      article_title: articleTitle,
      page_url: typeof window !== "undefined" ? window.location.href : undefined,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const res = await submitFeedback({
      name: name || undefined,
      email: email.trim(),
      category: category,
      subject: `Article Feedback [${category.toUpperCase()}]: ${articleTitle}`,
      message: message.trim(),
      article_slug: articleSlug,
      article_title: articleTitle,
      page_url: typeof window !== "undefined" ? window.location.href : undefined,
    });

    setIsSubmitting(false);

    if (res.success) {
      setFormSubmitted(true);
      setMessage("");
    } else {
      setErrorMessage(res.error || "Failed to submit feedback. Please try again.");
    }
  };

  return (
    <section
      aria-label="Article Feedback & Reader Engagement"
      className="my-10 border border-[#e2e8f0] bg-[#fafbfc] p-5 sm:p-6 text-[#111111]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e2e8f0] pb-4">
        <div>
          <h4 className="font-serif text-[16px] sm:text-[18px] font-bold text-[#0f172a]">
            Reader Feedback &amp; Editorial Standards
          </h4>
          <p className="text-[12.5px] text-[#64748b] mt-0.5">
            Was this reporting insightful and accurate? Help us maintain rigorous coverage.
          </p>
        </div>

        {/* Sentiment Action Buttons */}
        <div className="flex items-center gap-2">
          {sentimentSubmitted ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-[12px] font-medium border border-emerald-200">
              <Check size={13} className="text-emerald-600" />
              <span>Feedback recorded</span>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleSentimentClick("positive")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#cbd5e1] text-[12px] font-semibold text-[#334155] hover:bg-[#f1f5f9] hover:border-[#94a3b8] transition-colors"
                title="Helpful and well-sourced"
              >
                <ThumbsUp size={13} className="text-emerald-600" />
                <span>Helpful</span>
              </button>
              <button
                type="button"
                onClick={() => handleSentimentClick("negative")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#cbd5e1] text-[12px] font-semibold text-[#334155] hover:bg-[#f1f5f9] hover:border-[#94a3b8] transition-colors"
                title="Needs revision or clarification"
              >
                <ThumbsDown size={13} className="text-rose-600" />
                <span>Needs revision</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0f172a] text-white text-[12px] font-bold uppercase tracking-[0.06em] hover:bg-[#e31b23] transition-colors ml-1"
          >
            <MessageSquare size={13} />
            <span>Send Note</span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${isFormOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Expandable Correction & Notes Form */}
      {isFormOpen && (
        <div className="mt-5 pt-2">
          {formSubmitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-center">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white mb-2">
                <Check size={16} />
              </div>
              <h5 className="font-bold text-[14px] text-emerald-900">Note Routed to Desk</h5>
              <p className="text-[12.5px] text-emerald-700 mt-1 max-w-[460px] mx-auto">
                Thank you for contributing to editorial accuracy. Our verification team reviews all incoming tips and corrections.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormSubmitted(false);
                  setIsFormOpen(false);
                }}
                className="mt-3 text-[11.5px] font-bold uppercase tracking-wider text-emerald-800 hover:underline"
              >
                Close Panel
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-[12px] flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-[#475569] mb-1">
                    Nature of Note
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-9 px-2.5 bg-white border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:border-[#0f172a]"
                  >
                    <option value="correction">Factual Correction</option>
                    <option value="editorial_tip">Follow-Up Tip</option>
                    <option value="typo">Typo or Grammar</option>
                    <option value="compliment">General / Compliment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-[#475569] mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full h-9 px-2.5 bg-white border border-[#cbd5e1] text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#0f172a]"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-[#475569] mb-1">
                    Your Email <span className="text-[#e31b23]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="reader@domain.com"
                    className="w-full h-9 px-2.5 bg-white border border-[#cbd5e1] text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#0f172a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-wider text-[#475569] mb-1">
                  Details / Specific Reference <span className="text-[#e31b23]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cite specific paragraph, figure, or supplementary source..."
                  className="w-full p-2.5 bg-white border border-[#cbd5e1] text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#0f172a] resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#64748b]">
                  Reviewed in confidence by The Pride Times standards editor.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#e31b23] text-white text-[11.5px] font-bold uppercase tracking-[0.08em] hover:bg-[#c9151c] transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send size={12} />
                      <span>Transmit Note</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </section>
  );
}
