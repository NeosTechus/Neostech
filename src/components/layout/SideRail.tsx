import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const RAIL_BODY_CLASS = "has-side-rail";

const sections = [
  { id: "hero", label: "Top" },
  { id: "capabilities", label: "Capabilities" },
  { id: "industries", label: "Industries" },
  { id: "process", label: "How we work" },
  { id: "outcomes", label: "Outcomes" },
  { id: "work", label: "Selected work" },
  { id: "outlook", label: "Outlook" },
  { id: "faq", label: "FAQ" },
];

export function SideRail() {
  const location = useLocation();
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  // Toggle a body class so global CSS can pad page containers to clear the rail
  useEffect(() => {
    const onHome = location.pathname === "/";
    document.body.classList.toggle(RAIL_BODY_CLASS, onHome);
    return () => {
      document.body.classList.remove(RAIL_BODY_CLASS);
    };
  }, [location.pathname]);

  if (location.pathname !== "/") return null;

  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside
      aria-label="Section navigation"
      className="hidden lg:flex fixed top-28 xl:top-32 left-6 z-40 flex-col items-start"
      style={{ mixBlendMode: "difference" }}
    >
      {/* Section markers — top-anchored with consistent spacing */}
      <ul className="flex flex-col">
        {sections.map((s) => {
          const isActive = active === s.id;
          const isHover = hovered === s.id;
          const showLabel = isActive || isHover;
          return (
            <li
              key={s.id}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered((h) => (h === s.id ? null : h))}
            >
              <button
                type="button"
                onClick={() => handleJump(s.id)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Jump to ${s.label}`}
                className="group/rail flex w-full flex-col items-start py-[22px] focus-visible:outline-none cursor-pointer"
              >
                <span
                  className={
                    "block transition-all duration-300 ease-out " +
                    (isActive
                      ? "h-[2px] w-16 bg-white"
                      : isHover
                        ? "h-[2px] w-12 bg-white/80"
                        : "h-px w-9 bg-white/45")
                  }
                />
                <div
                  className={
                    "overflow-hidden transition-all duration-300 ease-out w-full text-left " +
                    (showLabel ? "max-h-12 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0")
                  }
                  aria-hidden={!showLabel}
                >
                  <span className="block text-[12px] leading-tight text-white tracking-tight whitespace-nowrap">
                    {s.label}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
