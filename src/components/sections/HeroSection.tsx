"use client";

import React from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

interface HeroSectionProps {
  onOpenQuote: () => void;
}

export function HeroSection({ onOpenQuote }: HeroSectionProps) {
  return (
    <section id="inicio" className="hero section">
      <div className="hero-copy">
        <p className="eyebrow">— Estratégia · Design · Tecnologia</p>
        <h1>
          IDEIAS GANHAM{" "}
          <br />
          <em>FORMA DIGITAL.</em>
        </h1>
        <p className="hero-description">
          Design com intenção. Tecnologia com propósito.{" "}
          <br />
          Sites sob medida para negócios que estão prontos para ir além.
        </p>
        <div className="actions">
          <button
            type="button"
            className="button primary"
            onClick={onOpenQuote}
          >
            Solicitar orçamento <ArrowUpRight size={18} aria-hidden="true" />
          </button>
          <a href="#projetos" className="text-link">
            Ver projetos <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="hero-bottom">
        <span>UM ESTÚDIO. INFINITAS POSSIBILIDADES.</span>
        <a href="#projetos">
          Explore a próxima órbita <ArrowDown size={16} aria-hidden="true" />
        </a>
        <span className="coordinate">ESTRATÉGIA → EXPERIÊNCIA</span>
      </div>
    </section>
  );
}

