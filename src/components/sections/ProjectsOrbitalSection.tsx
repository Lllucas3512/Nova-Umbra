"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "@/data/content";

interface ProjectsOrbitalSectionProps {
  projects: ProjectItem[];
}

export function ProjectsOrbitalSection({
  projects,
}: ProjectsOrbitalSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const stepHandlerRef = useRef<((delta: number, isDrag?: boolean) => void) | null>(
    null
  );
  const pointerStateRef = useRef<{
    x: number;
    y: number;
    lastX: number;
    moved: boolean;
  } | null>(null);
  const activeIndexRef = useRef(0);
  const suppressClickRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const stepOrbit = useCallback((delta: number, isDrag = false) => {
    stepHandlerRef.current?.(delta, isDrag);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const count = projects.length;
    const stepAngle = 360 / count; // 90° for 4 projects
    const maxScrollSweep = (count - 1) * stepAngle; // 270° for 4 projects

    const scrollAngle = { angle: 0 };
    const manualAngle = { angle: 0 };
    let radiusX = 430;
    let isMobile = false;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let snapTween: gsap.core.Tween | undefined;
    let tweenState: { angle: number } | null = null;

    const cardElements = cardsRef.current.filter(
      (el): el is HTMLElement => el !== null
    );

    const setters = cardElements.map((el) => ({
      x: gsap.quickSetter(el, "x", "px"),
      z: gsap.quickSetter(el, "z", "px"),
      rotation: gsap.quickSetter(el, "rotationY", "deg"),
      opacity: gsap.quickSetter(el, "opacity"),
    }));

    const renderOrbit = () => {
      const currentAngle =
        tweenState?.angle ?? scrollAngle.angle + manualAngle.angle;
      const nextActive =
        ((Math.round(currentAngle / stepAngle) % count) + count) % count;

      setters.forEach((setter, index) => {
        const rad = ((index * stepAngle - currentAngle) * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        setter.x(sin * radiusX);
        setter.z(cos * (isMobile ? 55 : 170));
        setter.rotation(sin * (isMobile ? 14 : 36));

        const sideBaseOpacity = isMobile ? 0.38 : 0.64;
        let cardOpacity = 0;
        if (cos >= 0) {
          cardOpacity =
            sideBaseOpacity + (1 - sideBaseOpacity) * Math.pow(cos, 0.75);
        } else if (cos > -0.35) {
          cardOpacity = sideBaseOpacity * ((cos + 0.35) / 0.35);
        }

        setter.opacity(cardOpacity);

        const isVisible = cardOpacity > 0.02;
        const cardEl = cardsRef.current[index];
        if (cardEl) {
          cardEl.style.zIndex = isVisible
            ? String(Math.round((cos + 1) * 15))
            : "0";
          cardEl.style.pointerEvents = isVisible ? "auto" : "none";
          cardEl.inert = !isVisible;
          cardEl.setAttribute("aria-hidden", String(!isVisible));
        }
      });

      if (activeIndexRef.current !== nextActive) {
        activeIndexRef.current = nextActive;
        setActiveIndex(nextActive);
      }
    };

    const updateMetrics = () => {
      isMobile = window.innerWidth < 768;
      radiusX = isMobile
        ? window.innerWidth * 0.92
        : Math.min(470, window.innerWidth * 0.34);
      renderOrbit();
    };

    const ctx = gsap.context(() => {
      gsap.set(cardElements, { force3D: true });
      updateMetrics();

      if (!prefersReducedMotion) {
        gsap.to(scrollAngle, {
          angle: maxScrollSweep,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            fastScrollEnd: true,
            onRefresh: updateMetrics,
            invalidateOnRefresh: true,
          },
          onUpdate: renderOrbit,
        });
      }
    }, sectionRef);

    stepHandlerRef.current = (delta: number, isDrag = false) => {
      snapTween?.kill();
      const startAngle =
        tweenState?.angle ?? scrollAngle.angle + manualAngle.angle;
      const targetAngle = isDrag
        ? startAngle + delta
        : (Math.round(startAngle / stepAngle) + delta) * stepAngle;

      if (prefersReducedMotion || isDrag) {
        tweenState = null;
        manualAngle.angle = targetAngle - scrollAngle.angle;
        renderOrbit();
      } else {
        tweenState = { angle: startAngle };
        snapTween = gsap.to(tweenState, {
          angle: targetAngle,
          duration: 0.8,
          ease: "power2.inOut",
          onUpdate: renderOrbit,
          onComplete: () => {
            manualAngle.angle = targetAngle - scrollAngle.angle;
            tweenState = null;
            renderOrbit();
          },
        });
      }
    };

    const resizeObserver = new ResizeObserver(updateMetrics);
    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      snapTween?.kill();
      stepHandlerRef.current = null;
      ctx.revert();
    };
  }, [projects.length]);

  const totalFormatted = String(projects.length).padStart(2, "0");
  const currentFormatted = String(activeIndex + 1).padStart(2, "0");

  return (
    <section id="projetos" className="projects" ref={sectionRef}>
      <div className="project-stage">
        <div className="section-top">
          <p className="eyebrow">01 — Projetos em destaque</p>
          <span className="minor">Quatro identidades. Novas perspectivas.</span>
        </div>

        <div className="project-heading">
          <h2>
            Projetos em
            <br />
            <span>outra órbita.</span>
          </h2>
          <p>
            Arraste para explorar.
            <br />
            Cada negócio, um universo próprio.
          </p>
        </div>

        <div
          className="orbital-scene"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Projetos selecionados"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
              e.preventDefault();
              stepOrbit(e.key === "ArrowRight" ? 1 : -1);
            }
          }}
          onPointerDown={(e) => {
            if (e.button === 0) {
              pointerStateRef.current = {
                x: e.clientX,
                y: e.clientY,
                lastX: e.clientX,
                moved: false,
              };
              suppressClickRef.current = false;
            }
          }}
          onPointerMove={(e) => {
            const state = pointerStateRef.current;
            if (!state) return;
            const dx = e.clientX - state.x;
            const dy = e.clientY - state.y;
            if (!state.moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
              state.moved = true;
              e.currentTarget.setPointerCapture(e.pointerId);
            }
            if (state.moved) {
              stepOrbit((state.lastX - e.clientX) * 0.32, true);
              state.lastX = e.clientX;
              suppressClickRef.current = true;
            }
          }}
          onPointerUp={() => {
            if (pointerStateRef.current?.moved) {
              stepOrbit(0);
              setTimeout(() => {
                suppressClickRef.current = false;
              }, 50);
            }
            pointerStateRef.current = null;
          }}
          onPointerCancel={() => {
            if (pointerStateRef.current?.moved) {
              stepOrbit(0);
              setTimeout(() => {
                suppressClickRef.current = false;
              }, 50);
            }
            pointerStateRef.current = null;
          }}
          onClickCapture={(e) => {
            if (suppressClickRef.current) {
              e.preventDefault();
              e.stopPropagation();
              suppressClickRef.current = false;
            }
          }}
        >
          <div className="orbital-ring">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="satellite-card"
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                data-active={activeIndex === index}
              >
                <div className="satellite-card-media" aria-hidden="true">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 767px) 340px, 440px"
                    className="satellite-card-img"
                  />
                </div>
                <div className="satellite-card-content">
                  <span className="case-label">
                    {project.indexLabel} / {project.caseType}
                  </span>
                  <div className="satellite-card-bottom">
                    <div className="satellite-card-info">
                      <h3>{project.name}</h3>
                      <p className="case-category">{project.field}</p>
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-link"
                      aria-label={`Visitar projeto ${project.name} (abre em nova aba)`}
                    >
                      <span>VISITAR PROJETO</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="orbital-controls">
          <button
            type="button"
            aria-label="Projeto anterior"
            onClick={() => stepOrbit(-1)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>

          <div className="orbital-selectors">
            {projects.map((project, targetIdx) => (
              <button
                key={project.id}
                type="button"
                aria-label={`Selecionar ${project.name}`}
                aria-pressed={activeIndex === targetIdx}
                onClick={() => {
                  const count = projects.length;
                  let diff = (targetIdx - activeIndex + count) % count;
                  if (diff > count / 2) diff -= count;
                  stepOrbit(diff);
                }}
              >
                <span />
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Próximo projeto"
            onClick={() => stepOrbit(1)}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>

          <p className="orbit-status" aria-live="polite">
            {currentFormatted} / {totalFormatted} — {projects[activeIndex]?.name}
          </p>
        </div>
      </div>
    </section>
  );
}

