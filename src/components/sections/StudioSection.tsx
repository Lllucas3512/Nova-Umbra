"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/content";

interface StudioSectionProps {
  onOpenQuote: () => void;
}

export function StudioSection({ onOpenQuote }: StudioSectionProps) {
  return (
    <section id="estudio" className="editorial section veil">
      <p className="eyebrow">02 — Uma nova perspectiva</p>
      <div className="editorial-grid">
        <h2>
          <span className="reveal-line">
            <span>Seu negócio</span>
          </span>
          <span className="reveal-line">
            <span>já funciona.</span>
          </span>
          <span className="reveal-line blue">
            <span>Seu site precisa</span>
          </span>
          <span className="reveal-line blue">
            <span>acompanhar.</span>
          </span>
        </h2>
        <div className="editorial-copy">
          <span className="small-rule" />
          <p>
            Seu próximo cliente precisa entender o que torna sua empresa
            diferente. A experiência digital deve tornar isso evidente.
          </p>
          <p>
            Unimos estratégia, design e desenvolvimento para criar sites claros,
            ágeis e feitos para a realidade do seu negócio.
          </p>
          <button type="button" className="text-link" onClick={onOpenQuote}>
            Encontre a direção do seu projeto{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="services">
        {SERVICES.map((service) => (
          <div key={service.number}>
            <span>{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

