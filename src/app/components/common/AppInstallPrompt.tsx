import { useEffect, useState } from "react";
import { Download, Monitor, Smartphone, X, Check } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function AppInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if app is already running standalone
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-ignore
      window.navigator.standalone === true;
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isAppleDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowModal(false);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  if (isInstalled) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        aria-label="Install The Pride Times App"
        title="Install The Pride Times App for Desktop & Mobile"
        className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50/80 px-2.5 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-100 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <Download size={13} className="animate-pulse" />
        <span className="hidden sm:inline">Install App</span>
        <span className="sm:hidden">App</span>
      </button>

      {/* Instructional modal for iOS or manual browsers */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white font-serif font-black text-xl shadow-md shadow-red-200">
                PT
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  The Pride Times
                </h3>
                <p className="text-xs text-slate-500">
                  Official Web &amp; Mobile Desktop App
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p className="font-medium text-slate-800">
                Install The Pride Times on your device for lightning-fast news, offline access, and instant market updates:
              </p>

              {isIOS ? (
                <div className="rounded-xl bg-slate-50 p-3 text-xs space-y-2 border border-slate-200">
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <Smartphone size={16} className="text-red-600" />
                    iOS (iPhone / iPad) Installation:
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600">
                    <li>Tap the <strong>Share</strong> button at the bottom of Safari.</li>
                    <li>Scroll down and select <strong>Add to Home Screen</strong>.</li>
                    <li>Tap <strong>Add</strong> in the top-right corner.</li>
                  </ol>
                </div>
              ) : (
                <div className="rounded-xl bg-slate-50 p-3 text-xs space-y-2 border border-slate-200">
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <Monitor size={16} className="text-red-600" />
                    Chrome / Edge / Android Installation:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Click the <strong>Install</strong> icon in the address bar (right side).</li>
                    <li>Or click browser menu (three dots) &rarr; <strong>Install The Pride Times</strong>.</li>
                    <li>Instant desktop shortcut &amp; native taskbar access.</li>
                  </ul>
                </div>
              )}

              <div className="mt-2 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                <Check size={14} className="shrink-0" />
                <span>Zero download wait &bull; Real-time executive alerts &bull; No app store needed</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
