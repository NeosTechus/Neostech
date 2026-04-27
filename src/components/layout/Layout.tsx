import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SideRail } from "./SideRail";
import { ChatBot } from "@/components/chat/ChatBot";
import { BackToTop } from "@/components/ui/BackToTop";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="skip-to-content"
      >
        Skip to main content
      </a>
      <Navbar />
      <SideRail />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <ChatBot />
      <BackToTop />
    </div>
  );
}
