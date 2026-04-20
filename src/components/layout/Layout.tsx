import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import CursorLight from "@/components/ui/CursorLight";
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
      <CursorLight />
      <Navbar />
      <main id="main-content" className="flex-1 pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
      <ChatBot />
      <BackToTop />
    </div>
  );
}
