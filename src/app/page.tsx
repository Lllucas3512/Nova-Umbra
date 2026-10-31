"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DeepSpace } from "@/components/background/DeepSpace";
import { EclipseOrb } from "@/components/background/EclipseOrb";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppPill } from "@/components/layout/WhatsAppPill";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsOrbitalSection } from "@/components/sections/ProjectsOrbitalSection";
import { StudioSection } from "@/components/sections/StudioSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StudioNoteSection } from "@/components/sections/StudioNoteSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { QuoteModal } from "@/components/modals/QuoteModal";
import { PROJECTS } from "@/data/content";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const eclipseRef = useRef<HTMLDivElement | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteStep, setQuoteStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedObjective, setSelectedObjective] = useState("");
  const [projectDetails, setProjectDetails] = useState("");

  const handleOpenQuote = () => {
    setQuoteStep(1);
    setQuoteOpen(true);
    setMenuOpen(false);
  };

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const computeEclipseLayout = () => {
      const rootEl = rootRef.current;
      const eclipseEl = eclipseRef.current;
      if (!rootEl || !eclipseEl) return null;

      const vw = document.documentElement.clientWidth;
      const vh = window.innerHeight;
      const orbSize = eclipseEl.offsetWidth || (vw < 768 ? 260 : 440);

      const getSectionTop = (selector: string) => {
        const el = rootEl.querySelector<HTMLElement>(selector);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      };

      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - vh
      );

      const computePosition = (
        normX: number,
        normY: number,
        scale: number,
        opacity: number
      ) => {
        const halfScaled = (orbSize * scale) / 2;
        const clampCoord = (val: number, maxDim: number) =>
          gsap.utils.clamp(halfScaled + 16, maxDim - halfScaled - 16, val);
        return {
          x: clampCoord(vw * normX, vw) - vw / 2,
          y: clampCoord(vh * normY, vh) - vh / 2,
          scale,
          opacity,
        };
      };

      const getOffsetTopFromRoot = (el: HTMLElement | null) => {
        let top = 0;
        for (
          let curr: HTMLElement | null = el;
          curr;
          curr = curr.offsetParent as HTMLElement | null
        ) {
          top += curr.offsetTop;
        }
        return top;
      };

      const alignWithHeading = (
        selector: string,
        desktopScale: number,
        scrollOffset: number
      ) => {
        const el = rootEl.querySelector<HTMLElement>(selector);
        const sidePad = Math.max(vw * 0.06, 24);
        const isMobile = vw < 768;
        const scale = isMobile ? 0.45 : desktopScale;
        const elTop = getOffsetTopFromRoot(el);
        const elHeight = el?.offsetHeight ?? 0;
        const targetY = isMobile
          ? elTop - 100 - scrollOffset
          : elTop + elHeight / 2 - scrollOffset;
        return computePosition(
          (vw - sidePad - (orbSize * scale) / 2) / vw,
          targetY / vh,
          scale,
          1
        );
      };

      const heroState = alignWithHeading(".hero h1", 1, 0);
      const projectsState = computePosition(0.5, 0.5, 1.05, 1);
      const editorialState = computePosition(0.84, 0.72, 0.5, 0.35);
      const processState = computePosition(0.15, 0.62, 0.4, 0.3);
      const footerState = alignWithHeading("footer h2", 0.95, maxScroll);

      const projectsTop = getSectionTop(".projects");
      const editorialTop = getSectionTop(".editorial");
      const processTop = getSectionTop(".process");
      const footerTrigger = Math.max(
        processTop,
        getSectionTop("footer") - vh * 0.75
      );

      return {
        eclipseEl,
        maxScroll,
        heroState,
        keyframes: [
          { at: projectsTop, state: projectsState },
          { at: editorialTop - vh, state: projectsState },
          { at: editorialTop, state: editorialState },
          { at: processTop, state: processState },
          { at: footerTrigger, state: processState },
          { at: maxScroll, state: footerState },
        ],
      };
    };

    // Position the Eclipse synchronously before first browser paint
    const initialLayout = computeEclipseLayout();
    if (initialLayout) {
      gsap.set(initialLayout.eclipseEl, {
        ...initialLayout.heroState,
        xPercent: -50,
        yPercent: -50,
        force3D: true,
      });
    }

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const layout = computeEclipseLayout();
        if (layout) {
          gsap.set(layout.eclipseEl, {
            ...layout.heroState,
            xPercent: -50,
            yPercent: -50,
            force3D: true,
          });
        }
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ paused: true });

        const buildEclipseTimeline = () => {
          const layout = computeEclipseLayout();
          if (!layout) return;
          const { eclipseEl, maxScroll, heroState, keyframes } = layout;

          tl.clear();
          tl.set(
            eclipseEl,
            {
              ...heroState,
              xPercent: -50,
              yPercent: -50,
              force3D: true,
            },
            0
          );

          let cursor = 0;
          let prevState = heroState;

          for (const kf of keyframes) {
            const clampedAt = Math.max(cursor, Math.min(maxScroll, kf.at));
            const duration = Math.max(0.001, clampedAt - cursor);
            tl.fromTo(
              eclipseEl,
              {
                ...prevState,
                xPercent: -50,
                yPercent: -50,
                force3D: true,
              },
              {
                ...kf.state,
                xPercent: -50,
                yPercent: -50,
                duration,
                ease: "none",
                force3D: true,
                immediateRender: false,
              },
              cursor
            );
            cursor = clampedAt;
            prevState = kf.state;
          }

          // Synchronize timeline to current scroll position immediately
          const currentScroll = gsap.utils.clamp(0, maxScroll, window.scrollY);
          tl.time(currentScroll);
        };

        buildEclipseTimeline();

        ScrollTrigger.create({
          animation: tl,
          start: 0,
          end: () => ScrollTrigger.maxScroll(window),
          scrub: 1,
          fastScrollEnd: true,
          onRefreshInit: buildEclipseTimeline,
          invalidateOnRefresh: true,
        });

        gsap.from(".hero-copy > *", {
          y: 20,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power2.out",
        });

        gsap.from(".eclipse-light", {
          opacity: 0,
          duration: 1.6,
          ease: "power2.out",
        });

        gsap.utils.toArray<HTMLElement>(".reveal-line span").forEach((el) => {
          gsap.from(el, {
            yPercent: 110,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          });
        });
      });

      // Desktop horizontal process bar progress
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            ".process-progress",
            { scaleX: 0, scaleY: 1, transformOrigin: "0% 50%" },
            {
              scaleX: 1,
              scaleY: 1,
              force3D: true,
              ease: "none",
              scrollTrigger: {
                trigger: ".process",
                start: "top 75%",
                end: "bottom 65%",
                scrub: 1,
                fastScrollEnd: true,
              },
            }
          );
        }
      );

      // Mobile vertical process bar progress (origin at top)
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            ".process-progress",
            { scaleY: 0, scaleX: 1, transformOrigin: "50% 0%" },
            {
              scaleY: 1,
              scaleX: 1,
              force3D: true,
              ease: "none",
              scrollTrigger: {
                trigger: ".process",
                start: "top 75%",
                end: "bottom 65%",
                scrub: 1,
                fastScrollEnd: true,
              },
            }
          );
        }
      );
    }, rootRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <DeepSpace />
      <EclipseOrb ref={eclipseRef} />

      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onCloseMenu={() => setMenuOpen(false)}
        onOpenQuote={handleOpenQuote}
      />

      <main id="conteudo">
        <HeroSection onOpenQuote={handleOpenQuote} />
        <ProjectsOrbitalSection projects={PROJECTS} />
        <StudioSection onOpenQuote={handleOpenQuote} />
        <ProcessSection />
        <StudioNoteSection />
        <FaqSection />
        <Footer onOpenQuote={handleOpenQuote} />
      </main>

      <WhatsAppPill />

      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        step={quoteStep}
        onStepChange={setQuoteStep}
        service={selectedService}
        onServiceChange={setSelectedService}
        objective={selectedObjective}
        onObjectiveChange={setSelectedObjective}
        details={projectDetails}
        onDetailsChange={setProjectDetails}
      />
    </div>
  );
}

