import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X, Settings } from "lucide-react";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const handleDecline = () => {
    saveConsent({ essential: true, analytics: false, marketing: false });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-fade-in-up">
      <div className="glass rounded-2xl p-6 border border-border/50 shadow-2xl">
        {!showPreferences ? (
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">We use cookies</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We use cookies to enhance your browsing experience and analyze site traffic.
                By clicking "Accept All", you consent to our use of cookies.
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="hero"
                  size="sm"
                  onClick={handleAcceptAll}
                  className="text-sm"
                >
                  Accept All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreferences(true)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  <Settings className="w-3.5 h-3.5 mr-1" />
                  Manage
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDecline}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Decline
                </Button>
              </div>
            </div>
            <button
              onClick={handleDecline}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Cookie Preferences</h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close preferences"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Essential</p>
                  <p className="text-xs text-muted-foreground">Required for the site to work</p>
                </div>
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="h-4 w-4 rounded accent-primary"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-medium">Analytics</p>
                  <p className="text-xs text-muted-foreground">Help us improve the site</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="h-4 w-4 rounded accent-primary"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-medium">Marketing</p>
                  <p className="text-xs text-muted-foreground">Personalized ads and content</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="h-4 w-4 rounded accent-primary"
                />
              </label>
            </div>

            <div className="flex gap-2">
              <Button variant="hero" size="sm" onClick={handleSavePreferences} className="text-sm flex-1">
                Save Preferences
              </Button>
              <Button variant="ghost" size="sm" onClick={handleAcceptAll} className="text-sm">
                Accept All
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
